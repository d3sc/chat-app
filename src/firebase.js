import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyD9u1aQMoOBWRnb4LLIx5CAbMtOILOLgE4",
  authDomain: "chat-6d7da.firebaseapp.com",
  projectId: "chat-6d7da",
  storageBucket: "chat-6d7da.appspot.com",
  messagingSenderId: "665164974992",
  appId: "1:665164974992:web:a6dd8ebbf1a5b806538115"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
