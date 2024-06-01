import fetchFromApi2 from "../api/fetchApi2.js";

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;

    var nameRegex = /^[a-zA-Z ]{2,30}$/;
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    var phoneRegex = /^\d{9}$/;
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    var formIsValid = true;

    if (!name || !nameRegex.test(name)) {
      document.getElementById("nameError").classList.remove("hidden");
      formIsValid = false;
    } else {
      document.getElementById("nameError").classList.add("hidden");
    }

    if (!email || !emailRegex.test(email)) {
      document.getElementById("emailError").classList.remove("hidden");
      formIsValid = false;
    } else {
      document.getElementById("emailError").classList.add("hidden");
    }

    if (!phone || !phoneRegex.test(phone)) {
      document.getElementById("phoneError").classList.remove("hidden");
      formIsValid = false;
    } else {
      document.getElementById("phoneError").classList.add("hidden");
    }

    if (!password || !passwordRegex.test(password)) {
      document.getElementById("passwordError").classList.remove("hidden");
      formIsValid = false;
    } else {
      document.getElementById("passwordError").classList.add("hidden");
    }

    if (!formIsValid) {
      return; // Stop execution if the form is not valid
    }

    try {
      // Get all users
      const users = await fetchFromApi2("Users");
      console.log("users", users);

      let maxId = 0; // Define maxId here

      // Find the highest ID
      if (Array.isArray(users)) {
        maxId = Math.max(...users.map((user) => user.id));
      } else {
        console.error("users is not an array");
      }

      // Increase the ID by one
      const newId = maxId + 1;

      const response = await fetchFromApi2("Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: newId,
          createdAt: new Date().toISOString(),
          name: name,
          email: email,
          password: password,
          status: "disabled",
          typeUser: "registered",
        }),
      });

      console.log("response->", response);
      window.location.href = "login.html";
    } catch (error) {
      console.error("Error:", error);
    }
  });

