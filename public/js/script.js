// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Find the "Enviar" button in the form
    const enviarButton = document.querySelector('input[type="submit"]');
    
    // Attach a click event listener to the button
    enviarButton.addEventListener("click", function(event) {
      // Prevent the default form submission
      event.preventDefault();
      
      // Display a message in the console
      console.log("Enviar button clicked!");
    });
  });