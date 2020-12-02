const GOOGLE_API_KEY = 'AIzaSyD3vf8qA-lCeUztreges_aDi8BqmLTPyzM';

export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`);
  
  if (!response.ok) {
    throw new Error(response.status);
  }
    
  const data = await response.json();

  if (data.error_message) {
    throw new Error(data.error_message);
  }

  return data.results[0].geometry.location;
}