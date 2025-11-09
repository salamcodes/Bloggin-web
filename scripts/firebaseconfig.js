import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtA9leCP9Ci_tqd8Jf6D1IDrNG-LBrJnA",
    authDomain: "blogging-web-96c25.firebaseapp.com",
    projectId: "blogging-web-96c25",
    storageBucket: "blogging-web-96c25.firebasestorage.app",
    messagingSenderId: "897992303629",
    appId: "1:897992303629:web:fb880b6bf6166fd228a144"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)