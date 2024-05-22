import { login } from '../../src/auth/auth.js';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#login-form');
  const errorMessage = document.querySelector('#error-message');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = form.username.value;
    const password = form.password.value;

    try {
      console.log('Form submitted');
      await login(username, password);
      window.location.href = '../../public/dashboard.html';
    } catch (error) {
      console.error(error);
      errorMessage.textContent = 'Login failed. Please try again.';
      errorMessage.style.display = 'block';
    }
  });
});
