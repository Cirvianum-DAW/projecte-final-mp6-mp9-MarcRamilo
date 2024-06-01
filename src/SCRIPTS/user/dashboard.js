async function fetchUserInfo(userId) {
    try {
        const response = await fetch(`https://6644bf0bb8925626f88fc5ad.mockapi.io/api/v2/Users/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}

// Función para actualizar la tabla con los datos del usuario
async function updateUserInfo() {
    // Retrieve loggedInUser from session storage
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        console.error('Logged in user data not found in session storage');
        return;
    }

    // Get the user ID from loggedInUser
    const userId = loggedInUser.id;
    console.log(userId);
    
    // Fetch user information using the user ID
    const userInfo = await fetchUserInfo(userId);
    if (!userInfo) {
        console.error('User info not found');
        return;
    }

    // Update the HTML elements with user information
    document.getElementById('name').textContent = userInfo.name;
    document.getElementById('email').textContent = userInfo.email;
    document.getElementById('userType').textContent = userInfo.typeUser;
}

// Call the updateUserInfo function when the page loads
updateUserInfo();
