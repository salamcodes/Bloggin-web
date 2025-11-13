import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"

import { db } from "./firebaseconfig.js"

const profileName = document.querySelector("#name");
const profile = document.querySelector("#userProfile");
const email = document.querySelector("#email");
const container = document.querySelector(".posts-container");

let posts = []
let userId = localStorage.getItem("userId")
let userProfile;

async function getData(uid, collections) {
    let data = []
    const q = query(collection(db, collections),
        where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        data.push(doc.data())
    });
    return data;

}
async function arrivedData() {
    const userInfo = await getData(userId, "users");
    // console.log(userInfo);
    userProfile = userInfo[0].profile;
    profile.src = userProfile;
    profileName.textContent = userInfo[0].fullName;
    email.textContent = userInfo[0].email;
    const postInfo = await getData(userId, "posts");

    posts.push(...postInfo);

    render(posts)
}
arrivedData()

function render(arr) {
    container.innerHTML = "";


    arr.forEach((item) => {
        const postTime = item.time?.toDate
            ? item.time.toDate().toLocaleString()
            : item.time;
        container.innerHTML += `<div class="blog-post">
            <div class="post-header">
                <img src="${item.authorProfile}" class="post-avatar">
                <div class="post-user-info">
                    <div class="post-author">${item.authorName}</div>
                    <div class="post-time">${postTime}</div>
                </div>
            </div>

            <h3 class="post-topic">${item.topic}</h3>
            <p class="post-content">${item.content}</p>

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

document.querySelector("#home").addEventListener("click", () => {
    window.location = "index.html"
})
document.querySelector("#dashboard").addEventListener("click", () => {
    window.location = "dashboard.html"
})