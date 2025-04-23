// You have reached the bottom of the page script
window.onload = function () { // Load the Whole HTML pg
  let timeoutId;
  const scrollText = document.getElementById('scroll-text'); // Get the scroll element
  if (!scrollText) return;

  window.addEventListener('scroll', () => { // when the user scrolls, run this JS function
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) { // check if user is near bottom of the page
      scrollText.classList.add('visible'); // show message through 'visible' class
      clearTimeout(timeoutId); // cancel any previous timeout to prevent overlap
      timeoutId = setTimeout(() => { // set timeout to 2000 milliseconds (2 seconds)
        scrollText.classList.remove('visible');
      }, 2000);
    } else {
      scrollText.classList.remove('visible');// if user aint at the bottom, hide message
      clearTimeout(timeoutId); // cancel any existing timeout
    }
  });
//--------------------------------------------------------------------------------------------------------------------------------------------//

// Animate About page text lines if on About.html
  if (window.location.pathname.endsWith('About.html')) {
    const lines = document.querySelectorAll('#animated-text-container .animated-line');
    let index = 0;

    function showNextLine() {
      if (index < lines.length) { //if user scrolls down, the lines begin to appear
        lines[index].classList.add('visible');
        index++;
        setTimeout(showNextLine, 300); // delay between lines being displayed by 300 Milliseconds
      }
    }

    //start with no lines visible
    lines.forEach(line => line.classList.remove('visible'));

    //Start animation
    showNextLine();
  }
}; 
//--------------------------------------------------------------------------------------------------------------------------------------------//

// Show paper container when user starts scrolling
window.addEventListener("scroll", () => {
  const paperContainer = document.getElementById("paper-container");
  const scrollTop = window.scrollY; //The amount the page has been scrolled
  const windowHeight = window.innerHeight; //The height of the viewport
  
  const fadeStart = windowHeight * 0.1; //Start fading in at 10% of the viewport height
  const fadeEnd = windowHeight * 0.2;  //Fully visible after 20% of the viewport height (scroll down more for full opacity)

  let opacity = 0; //opacity starts at 0

  if (scrollTop > fadeStart) {
    //Calculate opacity based on how much the user has scrolled
    opacity = Math.min(1, (scrollTop - fadeStart) / (fadeEnd - fadeStart));
  }

  paperContainer.style.opacity = opacity; //Apply the opacity to the paper container
});

//--------------------------------------------------------------------------------------------------------------------------------------------//

//Audio button for background video
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video'); //gets the audio data from the video file
  const audioToggleBtn = document.getElementById('audioToggleBtn'); //generates a toggle button

  if (!video || !audioToggleBtn) return;

  audioToggleBtn.addEventListener('click', () => {
    if (video.muted) { //if the mute button is shown, make the video NOT muted
      video.muted = false;
      audioToggleBtn.textContent = 'Mute Audio'; //change button text 
    } else {
      video.muted = true; //if not shown, mute the audio
      audioToggleBtn.textContent = 'Play Audio'; //change button text
    }
  });
});