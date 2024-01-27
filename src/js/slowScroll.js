//Scroll two rows further
export default function slowScroll(listContainer) {
  const { height: cardHeight } =
    listContainer.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
