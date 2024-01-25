import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
let currentPage = 1;
let currentQuery;

const NOTIFICATION_INFO_SETTINGS = {
  message:
    'Sorry, there are no images matching your search query. Please try again.',
  color: 'yellow',
  position: 'topRight',
  transitionIn: 'fadeInDown',
};

const NOTIFICATION_ERROR_SETTINGS = {
  message: "We're sorry, but you've reached the end of search results.",
  color: 'red',
  position: 'topRight',
  transitionIn: 'fadeInDown',
};

function handleSubmit(event) {
  event.preventDefault();
  galleryContainer.innerHTML = '';

  const formValue = new FormData(event.currentTarget);
  const { searchQuery } = Object.fromEntries(formValue.entries());
  currentQuery = searchQuery;
  event.currentTarget.reset();
  currentPage = 1;
  return searchQuery;
}

searchForm.addEventListener('submit', event => {
  handleSubmit(event);
});

function createMarkup(data) {
  const markup = data
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
          <img src=${webformatURL} alt=${tags} loading="lazy" />
          <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${views}
              </p>
              <p class="info-item">
                  <b>Comments</b>
                  ${comments}
              </p>
              <p class="info-item">
                  <b>Downloads</b>
                  ${downloads}
              </p>
          </div>
        </div>`;
    })
    .join('');

  galleryContainer.insertAdjacentHTML('afterbegin', markup);
}

function showMessage(type) {
  let messageType = type.toLowerCase();
  if (messageType === 'info') {
    return iziToast.show(NOTIFICATION_INFO_SETTINGS);
  }

  return iziToast.show(NOTIFICATION_ERROR_SETTINGS);
}

function loadMore() {
  currentPage += 1;
  getPhotos(currentQuery, currentPage);
}

async function getPhotos(query, page) {
  const API_KEY = '42008350-fb6f0dd148ae0c7c4d4cd1d49';

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

  const photos = await responseAPI.data.hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      };
    }
  );
  return photos;
}
