const GOOGLE_API_KEY = 'AIzaSyB-Jd6-4_SHNPnW9GVlPUwl2vzQu61dvPY';

export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`);
  
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const results = await response.json();
    return results.results[0].geometry.location;
  }
}