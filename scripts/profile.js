import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"
import { collection,  getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"
import { auth, db } from "./firebaseconfig.js";

const fullName = document.querySelector("#name");
const profile = document.querySelector(".profile-avatar");
const email = document.querySelector("#email");
const userId = document.querySelector("#uid");

onAuthStateChanged(auth, async (user) => {
    if (user) {

        const uid = user.uid;
        console.log(uid)
        const userInfo = await getData(uid, "users");
        console.log(userInfo);
        profile.src = userInfo[0].profile;
        fullName.textContent = userInfo[0].fullName;
        email.textContent = userInfo[0].email
        userId.textContent = userInfo[0].uid



    } else {
        window.location = ""
    }
});

async function getData(uid, collections) {
    let data = []
    const q = query(collection(db, collections),
        where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        data.push(doc.data());
    });
    return data

}

