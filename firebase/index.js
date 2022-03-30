// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBEN83tlcRY2-8_OdyJ6w5aKP0x6vxw0JQ",
  authDomain: "movie-react-eff9c.firebaseapp.com",
  projectId: "movie-react-eff9c",
  storageBucket: "movie-react-eff9c.appspot.com",
  messagingSenderId: "28066282449",
  appId: "1:28066282449:web:a72780768a97c1e7ccbef0",
  measurementId: "G-TE0T92W7QM",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const storage = getStorage();

export { storage, ref, uploadBytesResumable, getDownloadURL};
