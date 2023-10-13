// Initialize isLoggedIn with the stored value or default to false
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;

// Getter function
export function getIsLoggedIn() {
  return isLoggedIn;
}

// Setter function
export function setIsLoggedIn(value) {
  isLoggedIn = value;
  localStorage.setItem('isLoggedIn', value);
}