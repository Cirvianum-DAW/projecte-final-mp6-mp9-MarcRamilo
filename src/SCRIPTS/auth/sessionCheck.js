document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.getElementById("navLinks");
    const logoutContainer = document.getElementById("logoutContainer");
    const logoutButton = document.getElementById("logoutButton");
  
    // Check if user is logged in
    const loggedInUser = sessionStorage.getItem("loggedInUser");
  
    if (loggedInUser) {
      // Hide Register and Login links
      navLinks.style.display = "none";
      // Show Logout button
      logoutContainer.style.display = "block";

      //
    }
  
    // Logout functionality
    logoutButton.addEventListener("click", function () {
      sessionStorage.removeItem("loggedInUser");
      window.location.reload(); // Reload the page to update the UI
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const profileLink = document.getElementById("profile");

    // Check if user is logged in
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (loggedInUser) {
      // Set the href of the profile link based on the user's type
      if (loggedInUser.typeUser === "admin") {
        profileLink.href = "admins.html";
        // getInfo user login from api


      } else {
        profileLink.href = "dashboard.html";
      }
    }
});
