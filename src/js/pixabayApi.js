import axios from 'axios';

// Give 40 photos that match search query and page number from Pixabay API
export default async function getPhotos(query, page) {
  //Access key
  const API_KEY = '42008350-fb6f0dd148ae0c7c4d4cd1d49';

  //Sending get request
  const responseAPI = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: `${page}`,
    },
  });

  //Save data about total images find and photos info in variables
  const { totalHits, hits } = await responseAPI.data;

  //Return object with data
  return {
    totalHits,
    hits,
  };
}
