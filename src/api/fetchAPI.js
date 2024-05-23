async function fetchFromApi(endpoint, options = {}) {
  // const url = `http://localhost:3001/${endpoint}`;
  const url = `https://6644bf0bb8925626f88fc5ad.mockapi.io/api/v2/${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Default settings if none are provided
  const settings = {
    method: 'GET', // default method
    headers: { ...defaultHeaders, ...options.headers }, // merge default headers with options.headers
    ...options, // spread the rest of the options
  };

  if (options.body) {
    console.log('Body:', options.body);
    settings.body = JSON.stringify(options.body);
  }
  const response = await fetch(url, settings);
  console.log(response);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}

export default fetchFromApi;
