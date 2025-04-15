window.addEventListener('scroll', () => {
    const scrollText = document.getElementById('scroll-text');
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 50
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