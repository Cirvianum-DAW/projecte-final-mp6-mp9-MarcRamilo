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