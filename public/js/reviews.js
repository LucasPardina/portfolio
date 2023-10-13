import { getIsLoggedIn, setIsLoggedIn } from './common';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

let isLoggedIn = getIsLoggedIn();

const localUser = {
  username: 'admin',
  password: 'admin',
};

document.addEventListener('DOMContentLoaded', function() {
  // Check if the browser supports the Notification API
  if ('Notification' in window) {
    // Request permission for notifications if not already granted
    if (Notification.permission !== 'granted') {
      Notification.requestPermission()
        .then(function (permission) {
          if (permission === 'granted') {
            // Create and show the notification when permission is granted
            showNotification('Success', 'Permission granted');
          }
        });
    }
  }
  // Function to create and show the notification
  function showNotification(title, message) {
    // Create a new notification
    var notification = new Notification(title, {
      body: message
    });

    // Handle user interaction with the notification (e.g., clicking it)
    notification.onclick = function () {
      // Do something when the user clicks the notification
      window.focus(); // You can focus on the window or open a specific URL, etc.
      notification.close(); // Close the notification
    }
  }
    
  // Initialize Firebase Configuration
  const firebaseConfig = {
      apiKey: "AIzaSyDTk6YSFVUT3oDM80hof-S_c1oJZM2NFHg",
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

  // Select reviews-container element in the html in order to add/delete reviews
  const reviewsContainer = document.getElementById("reviews-container");
  // Function to create HTML elements for each review
  function createReviewElement(id, name, message) {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review"); // Add a CSS class for styling
    reviewElement.innerHTML = `
      <h4>${name}</h4>
      <p>${message}</p>
      <div class="flex">
        <input class="button w-small-100 button no_margin" type="submit" value="Eliminar" data-review-id="${id}" />
      </div>
    `;
    return reviewElement;
  }

  // Create a Firestore listener to update the reviews in real-time
  //const reviewsList = reviewsContainer;

  const unsubscribe = onSnapshot(colRef, (snapshot) => {
    reviewsContainer.innerHTML = ''; // Clear the existing reviews

    snapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      const name = data.name;
      const message = data.message;

      // Create HTML elements for each review and append them to the container
      const reviewElement = createReviewElement(id, name, message);
      reviewsContainer.appendChild(reviewElement);
    });
  });

  // Function to delete a review
  async function deleteReview(reviewID) {
    try {
      await deleteDoc(doc(colRef, reviewID));
      /* console.log(`Review with ID ${reviewID} deleted successfully.`); */
      alert("Review deleted successfully!");
    } catch (error) {
      /* console.error(`Error deleting review: ${error}`); */
      alert("Error, could not delete review");
    }
  }

  // Event listener for the admin login button
  const loginbutton = document.getElementById("authenticate");
  if(isLoggedIn){loginbutton.value = "Admin logout";}
  loginbutton.addEventListener("click", (event => {
    if (isLoggedIn) 
    {
      const confirmLogout = confirm("Are you sure you want to log out?");
      if (confirmLogout) {
        isLoggedIn = false;
        setIsLoggedIn(false);
        loginbutton.value = "Admin login";
        alert("You have been logged out.");
      }
    } else 
    {
      const username = prompt('Enter your username:');
      const password = prompt('Enter your password:');
      if (username === localUser.username && password === localUser.password) 
      {
        isLoggedIn = true; // Set login status to true
        setIsLoggedIn(true);
        let varA = getIsLoggedIn();
        console.log(`isLoggedin is ${varA}`);
        alert('Authentication successful!');
        loginbutton.value = "Admin logout";
      }
    }
  }));
  
  // Your event listener for the delete button
  reviewsContainer.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.matches("input[data-review-id]")) {
      const reviewID = target.getAttribute("data-review-id");

      if (isLoggedIn) {
        const isConfirmed = window.confirm('Are you sure you want to delete this review?');
        if (isConfirmed) { deleteReview(reviewID); }
      } else {
        const username = prompt('Enter your username:');
        let password;
        if(username != null) 
        {
          password = prompt('Enter your password:');
          if (username === localUser.username && password === localUser.password) {
            isLoggedIn = true; // Set login status to true
            setIsLoggedIn(true);
            loginbutton.value = "Admin logout";
            alert('Authentication successful!');
            deleteReview(reviewID);
          } else {
            alert('Authentication failed. Please check your username and password.');
          }
        }
        else {alert('Authentication failed. Canceled by user.');}
      }
    }
  });
});