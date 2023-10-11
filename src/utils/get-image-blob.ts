
import axios from 'axios';

export async function fetchImageAsBlob(url) {
  try {
    const response = await axios.get(url, {
      responseType: 'blob', // Set the response type to blob
    });

    return response.data; // Return the Blob
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
}

export default fetchImageAsBlob;
