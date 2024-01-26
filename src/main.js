import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

let currentPage = 0;
let currentQuery;
let totalPages = 0;
let lightbox;

function handleSubmit(event, contentContainer, buttonMore) {
  event.preventDefault();

  contentContainer.innerHTML = '';

  // buttonMore.classList.add('hidden');

  const formValue = new FormData(event.currentTarget);
  const { searchQuery } = Object.fromEntries(formValue.entries());

  currentPage += 1;

  if (currentQuery !== searchQuery.toLowerCase()) {
    currentQuery = searchQuery.toLowerCase();
    currentPage = 1;
  }

  getPhotos(currentQuery, currentPage)
    .then(data => {
      if (data.hits.length === 0) {
        showMessage(
          'Sorry, there are no images matching your search query. Please try again.',
          'red'
        );
        return;
      }
      if (currentPage === 1) {
        totalPages = Math.ceil(data.totalHits / 40);
        showMessage(`Hooray! We found ${data.totalHits} images.`, 'green');
      }

      if (totalPages > currentPage) {
        // buttonMore.classList.remove('hidden');
        infiniteScroll(buttonLoadMore);
      }

      createMarkup(data.hits, galleryContainer);

      lightbox = new SimpleLightbox('.photo-card a');
    })
    .catch(error => {
      console.log(error.message);
    });
}

searchForm.addEventListener('submit', event => {
  handleSubmit(event, galleryContainer, buttonLoadMore);
});

function createMarkup(data, container) {
  const markup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
          <a href=${largeImageURL}>
            <img src=${webformatURL} alt='${tags}' loading="lazy" width="300" height="200" />
          </a>
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
      }
    )
    .join('');

  container.insertAdjacentHTML('beforeend', markup);
}

function showMessage(message, color) {
  return iziToast.show({
    message: `${message}`,
    color: `${color}`,
    position: 'topRight',
    transitionIn: 'fadeInDown',
  });
}

function loadMore(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentPage += 1;

      getPhotos(currentQuery, currentPage)
        .then(data => {
          createMarkup(data.hits, galleryContainer);
          lightbox.refresh();
          slowScroll();
          if (totalPages <= currentPage) {
            // buttonLoadMore.classList.add('hidden');
            showMessage(
              "We're sorry, but you've reached the end of search results.",
              'red'
            );
            return;
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  });
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

  const { totalHits, hits } = await responseAPI.data;

  return {
    totalHits,
    hits,
  };
}

function slowScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function infiniteScroll(target) {
  let observer = new IntersectionObserver(loadMore, {
    rootMargin: '0px',
  });

  observer.observe(target);
}
