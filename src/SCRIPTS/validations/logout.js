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
    } else {
        // Show Register and Login links
        navLinks.style.display = "block";
        // Hide Logout button
        logoutContainer.style.display = "none";
    }

    // Logout functionality
    logoutButton.addEventListener("click", function () {
        sessionStorage.removeItem("loggedInUser");
        window.location.reload(); // Reload the page to update the UI
    });
});