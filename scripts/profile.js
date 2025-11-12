import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"
import { collection, addDoc, Timestamp, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"
import { auth, db } from "./firebaseconfig.js";

const fullName = document.querySelector("#name");
const profile = document.querySelector(".profile-avatar");
const email = document.querySelector("#email");
const userId = document.querySelector("#uid");

onAuthStateChanged(auth, (user) => {
  if (user) {
    
    const uid = user.uid;
    
  } else {
    // User is signed out
    // ...
  }
});

