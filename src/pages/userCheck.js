// General user check for all pages - Is the user authenticated?
import { isAuthenticated, logout } from '../auth';

console.log('hola!');

window.onload = function () {
  if (!isAuthenticated()) {
    console.log('User is not authenticated');
    window.location.href = '/login.html';
  } else {
    console.log('User is authenticated');
  }
};

window.logout = function () {
  logout();
  window.location.href = '/login.html';
};
