// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuSXStNYjam8Z93Cs5pWKOJfrMy5Ewgj0",
  authDomain: "weatherapp-851e0.firebaseapp.com",
  projectId: "weatherapp-851e0",
  storageBucket: "weatherapp-851e0.appspot.com",
  messagingSenderId: "66703119090",
  appId: "1:66703119090:web:2bc40b3ee13382c8bd766b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}