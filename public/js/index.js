import { getIsLoggedIn, setIsLoggedIn } from './common';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDTk6YSfVUT3oDM80hof-S_c1oJZM2NFHg",
  authDomain: "reviews2-6db94.firebaseapp.com",
  projectId: "reviews2-6db94",
  storageBucket: "reviews2-6db94.appspot.com",
  messagingSenderId: "211637723531",
  appId: "1:211637723531:web:2490a88fc8578d4fb04f8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, 'reviews');

// Adding documents
const reviewForm = document.getElementById("reviewForm");
reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const name = reviewForm.name.value;
  const phone = reviewForm.phone.value;
  const email = reviewForm.email.value;
  const message = reviewForm.message.value;

  if((name != '')&&(message != '')){
    const isConfirmed = window.confirm('Are you sure you want to submit this review?');
    if (isConfirmed) {
      addDoc(colRef, {
        name,
        phone,
        email,
        message
      })
      .then(() => {
        alert('Review submitted successfully!');
        reviewForm.reset();
      });
    }
  }
  else{ alert('You must fill at least the name and message fields'); }
});