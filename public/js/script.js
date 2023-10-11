// Import the Firebase functions for database
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Reference to your Firebase database
const database = getDatabase();

// Reference to the "reviews" node in Firebase
const reviewsRef = ref(database, "reviews");

// Function to display reviews on the "reviews.html" page
function displayReviews(reviews) {
  const reviewsContainer = document.getElementById("reviews-container");
  reviewsContainer.innerHTML = ""; // Clear the container before adding reviews

  for (const key in reviews) {
    const review = reviews[key];
    const reviewElement = document.createElement("div");
    reviewElement.innerHTML = `
      <h4>${review.name}</h4>
      <p>${review.message}</p>
    `;
    reviewsContainer.appendChild(reviewElement);
  }
}

// Listen for changes in the reviews data
onValue(reviewsRef, (snapshot) => {
  const reviews = snapshot.val();
  if (reviews) {
    displayReviews(reviews);
  }
});
