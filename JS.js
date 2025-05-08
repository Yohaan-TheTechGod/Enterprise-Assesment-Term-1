// This JS Function is for the initial page load and transitions
document.addEventListener('DOMContentLoaded', function() { // Waits until the HTML document has been fully loaded and parsed
  // Select all elements with the class name 'word'
  const words = document.querySelectorAll('.word');

  // Iterate over each word element
  words.forEach((word, index) => {
      // Delay the execution of a function by 350 milliseconds multiplied by the index of the word
      setTimeout(() => {
          // Add the 'visible' class to the current word element, causing it to become visible
          word.classList.add('visible');
      }, index * 350); 
  });

  // Delay the execution of a function by the total duration of the word transitions plus an additional 1000 milliseconds
  setTimeout(() => {
      // Select the element with the class name 'intro'
      const intro = document.querySelector('.intro');

      // Set the CSS transition property to 'transform 2s ease-in-out'
      intro.style.transition = 'transform 2s ease-in-out';

      // Add the 'hide' class to the 'intro' element, causing it to fade out
      intro.classList.add('hide');

      // Delay the execution of the function by 500 milliseconds
      setTimeout(() => {
          // Scroll the window to the bottom of the page, using the smooth scrolling effect
          window.scrollTo({
              top: window.innerHeight, // Set the scroll position to the height of the view window
              behavior: 'smooth' // Use the smooth scrolling effect
          });
      }, 500); // End of setTimeout function 
  }, words.length * 350 + 1000); // End of setTimeout function 
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------//

// This JS Function if for the .Title-Of-The-Page transition, which start after intro animation finishes
document.addEventListener('DOMContentLoaded', function() {
  // Select all elements with the class name 'word' to calculate intro animation duration
  const words = document.querySelectorAll('.word');

  // Calculate total duration of intro animation:
  // words animation duration + 1000ms delay + 2s transition scroll delay
  const totalIntroDuration = words.length * 350 + 1000 + 2000 ;

  // Set a timeout to add the 'animate' class to the title after the intro animation finishes
  setTimeout(() => {
      // Select the element with the class name 'Title-Of-The-Page'
      const title = document.querySelector('.Title-Of-The-Page');

      // If the title element exists, add the 'animate' class to trigger CSS animation
      if (title) {
          title.classList.add('animate');
      }
  }, totalIntroDuration); // Delay based on total intro animation duration
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------//