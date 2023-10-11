// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtr3Ghd-dND60hAA_WrYBMFF7QoP_2-zg",
  authDomain: "myreviews-606bb.firebaseapp.com",
  projectId: "myreviews-606bb",
  storageBucket: "myreviews-606bb.appspot.com",
  messagingSenderId: "485258969684",
  appId: "1:485258969684:web:116b9aaf3d2fd0d22f23c1",
  measurementId: "G-B9W2V7N1DY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);