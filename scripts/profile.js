import { onAuthStateChanged, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"
import { auth, db } from "./firebaseconfig.js";

const fullName = document.querySelector("#name");
const profile = document.querySelector(".profile-avatar");
const email = document.querySelector("#email");
const userId = document.querySelector("#uid");
let currentPass = document.querySelector("#currentPass")
let newPass = document.querySelector("#newPass");
let confirmPass = document.querySelector("#confirmPass");
const saveBtn = document.querySelector(".btn-save")

onAuthStateChanged(auth, async (user) => {
    if (user) {

        const uid = user.uid;
        // console.log(uid)
        const userInfo = await getData(uid, "users");
        // console.log(userInfo);
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
document.querySelector("#home").addEventListener("click", () => {
    window.location = "index.html"
})
document.querySelector("#dashboard").addEventListener("click", () => {
    window.location = "dashboard.html"
})

saveBtn.addEventListener("click", () => {
    currentPass = currentPass.value;
    newPass = newPass.value;
    confirmPass = confirmPass.value;
    // console.log(currentPass, newPass, confirmPass)

    changeUserPassword(currentPass, newPass, confirmPass);
})



async function changeUserPassword(currentPass, newPass, confirmPass) {
    const user = auth.currentUser;

    if (!user) {
        alert("No user is signed in.");
        return;
    }

    if (newPass !== confirmPass) {
        alert("New password and confirm password do not match!");
        return;
    }

    try {
        // Reauthenticate the user with their current password
        const credential = EmailAuthProvider.credential(user.email, currentPass);
        await reauthenticateWithCredential(user, credential);

        // Update the password
        await updatePassword(user, newPass);

        alert("Password updated successfully!");
    } catch (error) {
        alert(error)
    }
    window.location = "login.html"
}
