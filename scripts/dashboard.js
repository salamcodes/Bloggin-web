import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"
import { collection, addDoc, Timestamp, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"
import { auth, db } from "./firebaseconfig.js";
const userName = document.querySelector(".user-name");
const userProfile = document.querySelector(".user-avatar");
const loginBtn = document.querySelector("#login");
const logout = document.querySelector("#logout");
const topic = document.querySelector("#topic");
const content = document.querySelector("#content");
const form = document.querySelector("#form");

const postProfile = document.querySelector(".post-avatar");
const posterName = document.querySelector("#post-author");
const time = document.querySelector(".post-time");
const blogContainer = document.querySelector("#blogPosts")
let userPosts = []
let uploadedProfile;
let authorName;
onAuthStateChanged(auth, async (user) => {
    if (user) {

        loginBtn.style.display = "none"
        const uid = user.uid;
        let userInfo = await getData(uid, "users");
        uploadedProfile = userInfo[0].profile;
        userProfile.src = uploadedProfile;
        authorName = userInfo[0].fullName;

        userName.textContent = authorName;
        const postInfo = await getData(uid, "posts")
        console.log(postInfo)
        userPosts.push(...postInfo)
        render(userPosts)

    } else {
        logout.style.display = "none"
        window.location = "login.html"
    }
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let user = auth.currentUser;
    const postData = {
        topic: topic.value,
        content: content.value,
        time: Timestamp.fromDate(new Date()),
        authorProfile: uploadedProfile,
        authorName: authorName,
        uid: user.uid

    }
    console.log(uploadedProfile)

    try {
        const docRef = await addDoc(collection(db, "posts"), postData);
        userPosts.push({ ...userPosts })
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    render(userPosts)
})

async function getData(uid, collections) {
    userPosts = []
    let data = []
    const q = query(collection(db, collections),
        where("uid", "==", uid));
    const querySnapshot = uid
        ? await getDocs(q)
        : await getDocs(collection(db, collections));
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        data.push({ ...doc.data(), docId: doc.id })
    });
    render(data)
    return data;
}

logout.addEventListener("click", () => {
    console.log("clicked")
    signOut(auth).then(() => {
        window.location = "login.html"

    }).catch((error) => {

    });
})

function render(arr) {
    blogContainer.innerHTML = "";

    arr.forEach((item) => {
        const postTime = item.time?.toDate
            ? item.time.toDate().toLocaleString()
            : item.time;
        blogContainer.innerHTML += ` <div class="blog-post">
                <div class="post-header">
                    <img src="${item.authorProfile}" alt="User Avatar" class="post-avatar">
                    <div class="post-user-info">
                        <div class="post-author">${item.authorName}</div>
                        <div class="post-time">${postTime}</div>
                    </div>
                </div>
                <h3 class="post-topic">${item.topic}</h3>
                <p class="post-content">
                    ${item.content}
                </p>
                <div class="post-actions">
                    <button class="action-btn"><i class="far fa-heart"></i> Like</button>
                    <button class="action-btn"><i class="far fa-comment"></i> Comment</button>
                    <button class="action-btn"><i class="far fa-share-square"></i> Share</button>
                </div>
            </div>`
    })
}

