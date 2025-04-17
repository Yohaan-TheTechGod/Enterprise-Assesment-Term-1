// you have reached the bottom of the page script
let timeoutId;
window.addEventListener('scroll', () => {
    const scrollText = document.getElementById('scroll-text');
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      scrollText.classList.add('visible');
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        scrollText.classList.remove('visible');
      }, 3000);
    } else {
      scrollText.classList.remove('visible');
      clearTimeout(timeoutId);
    }
  });