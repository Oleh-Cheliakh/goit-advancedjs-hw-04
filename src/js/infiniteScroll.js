//Invokes callback when viewport reaches top of the target
export default function infiniteScroll(target, callback, stop) {
  let observer = new IntersectionObserver(callback, {
    // Set up how far from target viewport shold be
    rootMargin: '0px',
  });
  if (stop) {
    observer.unobserve(target);
    return;
  }
  observer.observe(target);
}
