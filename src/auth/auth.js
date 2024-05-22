import fetchFromApi from '../api/fetchAPI.js';

async function login(username, password) {
  console.log('login');
  // Fetch all users
  const users = await fetchFromApi('users');

  // Find the user with the matching username
  const user = users.find((user) => user.username === username);

  // If the user exists and the password is correct
  if (user && user.password === password) {
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  }

  throw new Error('Login failed');
}

function logout() {
  // ...
}

function isAuthenticated() {
  return localStorage.getItem('user') !== null;
}

export { login, logout, isAuthenticated };
