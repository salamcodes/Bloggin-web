import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"
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
const userPosts = []
onAuthStateChanged(auth, async (user) => {
    if (user) {

        loginBtn.style.display = "none"
        const uid = user.uid;
        let userInfo = await getData(uid, "users");
        userProfile.src = userInfo[0].profile;
        userName.textContent = userInfo[0].fullName

    } else {
        logout.style.display = "none"
    }
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const postData = {
        topic: topic.value,
        content: content.value,
        time: Timestamp.formDate(new Date()),
        authorProfile: uplodedProfle

    }

    try {
        const docRef = await addDoc(collection(db, "posts"), postData);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})

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
    return data;
}

