export default function createMarkup(data, container) {
  //Create photo card with API response data
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

  //Insert elements in the end of the gallery container in order to provide pagination
  container.insertAdjacentHTML('beforeend', markup);
}
