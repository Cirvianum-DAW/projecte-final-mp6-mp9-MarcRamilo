import { isAuthenticated } from '../auth';
import fetchFromApi from '../api';

window.onload = async function() {
  if (!isAuthenticated()) {
    window.location.href = '/login.html';
    return;
  }

  const data = await fetchFromApi('some-endpoint');
  // Render data...
};