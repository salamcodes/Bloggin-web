import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"
import { auth, db } from "./firebaseconfig.js";

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const fullName = document.querySelector("#fullName");

let uploadImg;
var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dd1xxvrvk',
    uploadPreset: 'abdulsalam'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        uploadImg = result.info.secure_url;
    }
}
)

document.getElementById("upload_widget").addEventListener("click", function () {
    myWidget.open();
}, false);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            const userData = {
                fullName: fullName.value,
                email: email.value,
                profile: uploadImg,
                uid: user.uid
            }
            try {
                const docRef = await addDoc(collection(db, "users"), userData);
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            window.location = "login.html"
        })
        .catch((error) => {

            const errorMessage = error.message;
            console.log(errorMessage)
        });
})