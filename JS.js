window.addEventListener('scroll', () => {
    const scrollText = document.getElementById('scroll-text');
    if (
      window.innerHeight + window.scrollY >=
      document..body.offsetHeight - 50
    ) {
      scrollText.classList.add('visible');
    } else {
      scrollText.classList.remove('visible');
    }
  });