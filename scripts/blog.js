import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"
import { collection, addDoc, Timestamp, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"
import { auth, db } from "./firebaseconfig.js";
const navProfile = document.querySelector(".user-avatar");
const logout = document.querySelector("#logout");
const login = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const blogContainer = document.querySelector("#allBlogsGrid");
const backBtn = document.querySelector(".back-btn");
let allPosts = [];

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid
        const userInfo = await getData(uid, "users")
        let profile = userInfo[0].profile;
        navProfile.src = profile
        userName.textContent = userInfo[0].fullName;
        // console.log(userInfo);
        login.style.display = "none"
        const posts = await getData(null, "posts");
        allPosts.push(...posts)
        render(allPosts)
        // console.log(posts)

    } else {
        logout.style.display = "none"
        window.location = "login.html"
        logout.style.display = "none"
    }
});


async function getData(uid, collections) {
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

function render(arr) {
    blogContainer.innerHTML = ""
    arr.forEach((item) => {
        const postTime = item.time?.toDate
            ? item.time.toDate().toLocaleString()
            : item.time;
        blogContainer.innerHTML += ` <div class="blog-post" data-category="technology">
                <div class="post-header">
                    <img src="${item.authorProfile}" alt="Sarah Miller" class="post-avatar">
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
                    <div class="stats">
                        <div class="stat"><i class="far fa-heart"></i> 42</div>
                        <div class="stat"><i class="far fa-comment"></i> 15</div>
                    </div>
                </div>
            </div>`
    })
}