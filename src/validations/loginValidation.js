import fetchFromApi2 from "../api/fetchApi2.js";

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var loginMessage = document.getElementById("loginMessage");

    try {
        // Get all users
        const users = await fetchFromApi2("Users");
        console.log("users", users);

        // Find user with matching email and password
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Save user info in session storage
            sessionStorage.setItem("loggedInUser", JSON.stringify(user));
            console.log("User logged in successfully:", user);

            // Show login success message
            loginMessage.textContent = "Login successful!";
            loginMessage.style.color = "green";

            // Redirect based on user type
            if (user.typeUser === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "dashboard.html";
            }
        } else {
            console.error("Invalid email or password");
            loginMessage.textContent = "Invalid email or password";
            loginMessage.style.color = "red";
        }
    } catch (error) {
        console.error("Error:", error);
        loginMessage.textContent = "An error occurred. Please try again.";
        loginMessage.style.color = "red";
    }
});

async function fetchFromApi2(endpoint, options = {}) {
    const url = `https://6644bf0bb8925626f88fc5ad.mockapi.io/api/v2/${endpoint}`;
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export default fetchFromApi2;
