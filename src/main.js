import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import getPhotos from './js/pixabayApi';
import createMarkup from './js/createMarkup';
import slowScroll from './js/slowScroll';
import showMessage from './js/showMessage';

// Pick search form, gallery and pagination element
const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

// Set variables to store query, current page and total pages available
let currentPage = 0;
let totalPages = 0;
let currentQuery;

// Uses ligtbox for slider component
let lightbox = new SimpleLightbox('.photo-card a');

// Set intersaction observer for the element at the end of the galery
let observer = new IntersectionObserver(loadMore, {
  // Set up how far from target viewport shold be
  rootMargin: '0px',
});

// Clear gallery, gets input value, sends get request and create gallery
async function handleSubmit(event, contentContainer) {
  // Prevent page refreshing
  event.preventDefault();

  // Delete any observers and clear gallery
  observer.unobserve(buttonLoadMore);
  contentContainer.innerHTML = '';

  // Get search query from form
  const formValue = new FormData(event.currentTarget);
  let { searchQuery } = Object.fromEntries(formValue.entries());

  // Clear side spaces and make query lowercase for the proper string comparison
  searchQuery = searchQuery.trim().toLowerCase();

  // Show notification if user hasn't type anything
  if (!searchQuery) {
    showMessage('You have to write a search query', 'yellow');
    event.currentTarget.reset();
    return;
  }

  // If query is new, then starts from the 1 page
  if (currentQuery !== searchQuery) {
    currentQuery = searchQuery;
    currentPage = 0;
  }

  // Change page number after each search
  currentPage += 1;

  try {
    // Sends get request to receive 40 photos
    const { totalHits, hits } = await getPhotos(currentQuery, currentPage);

    // If doesn't find photos, then shows error message
    if (hits.length === 0) {
      showMessage(
        'Sorry, there are no images matching your search query. Please try again.',
        'red'
      );
      return;
    }

    // Calculates total pages and shows number of photos available (only if it is first search)
    if (currentPage == 1) {
      totalPages = Math.ceil(totalHits / 40);
      showMessage(`Hooray! We found ${totalHits} images.`, 'green');
    }

    // Adds photos cards to DOM
    createMarkup(hits, galleryContainer);

    // If total pages available bigger than current page, then ads infinite scroll
    if (totalPages > currentPage) {
      observer.observe(buttonLoadMore);
    } else {
      // If no more pages available then shows message
      showMessage(
        'Sorry, there are no more images matching your search query',
        'yellow'
      );

      // Prevent next page loading if no more pages available
      currentPage = 0;
    }

    // Refresh slider component content
    lightbox.refresh();
  } catch (error) {
    // Catch any errors in order to prevent full stop of application
    console.log(error.message);
  }
}

// Invokes handleSubmit after search button click
searchForm.addEventListener('submit', event => {
  handleSubmit(event, galleryContainer, buttonLoadMore);
});

// Load next page with images after viewport reached bottom of the gallery
function loadMore(entries) {
  entries.forEach(async entry => {
    // Checks if viewport reached observable element
    if (entry.isIntersecting) {
      // Increase page number for the get request
      currentPage += 1;

      // Sends get request to receive 40 photos
      try {
        const { hits } = await getPhotos(currentQuery, currentPage);

        // Adds photos cards to the end of gallery
        createMarkup(hits, galleryContainer);

        // Refresh slider component in order to add new photos
        lightbox.refresh();

        // Scrolls two rows further
        slowScroll(galleryContainer);

        // If user reaches the end, shows error message and stops intersection observer
        if (totalPages <= currentPage) {
          showMessage(
            "We're sorry, but you've reached the end of search results.",
            'red'
          );
          observer.unobserve(buttonLoadMore);
          return;
        }
      } catch (error) {
        // Catch any errors in order to prevent full stop of application
        console.log(error.message);
      }
    }
  });
}
