// Import the Firebase functions for database and initialization
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Reference to your Firebase database
const database = getDatabase();

// Get the review form element
const reviewForm = document.getElementById("reviewForm");

// Listen for the form submission
reviewForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Get form data
  const name = reviewForm.name.value;
  const phone = reviewForm.phone.value;
  const email = reviewForm.email.value;
  const message = reviewForm.message.value;

  // Create a new review object
  const newReview = {
    name,
    phone,
    email,
    message,
  };

  // Push the new review to the "reviews" node in Firebase
  push(ref(database, "reviews"), newReview)
    .then((newReviewRef) => {
      console.log("Review submitted with ID: ", newReviewRef.key);
      // Clear the form after successful submission
      reviewForm.reset();
    })
    .catch((error) => {
      console.error("Error submitting review: ", error);
    });
});
