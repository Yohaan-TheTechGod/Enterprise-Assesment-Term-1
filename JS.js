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
        setTimeout(showNextLine, 250); // delay between lines being displayed by 250 Milliseconds
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

//--------------------------------------------------------------------------------------------------------------------------------------------//

//Java script to allow the form details to be sent to a google sheet
document.getElementById("membershipForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // code that makes sure the data is sent correctly to the Google Sheets
  const form = e.target;
  const formData = new FormData(form); 
  const data = new URLSearchParams();
  formData.forEach((value, key) => {
    data.append(key, value.trim()); // trims white space from each field
  });

  const errorMsg = document.getElementById("errorMsg"); // error message
  const statusMsg = document.getElementById("statusMsg"); // status message

  // Clear previous error messages
  errorMsg.innerText = "";
  statusMsg.innerText = "";

  // Form values
  const firstName = formData.get("firstName").trim();
  const lastName = formData.get("lastName").trim();
  const email = formData.get("email").trim();
  const phone = formData.get("phone").trim();
  const address1 = formData.get("address1").trim();
  const password = formData.get("password").trim();
  const question = formData.get("securityQuestion");
  const answer = formData.get("securityAnswer").trim();

  if (!answer) {
    errorMsg.innerText = "Please provide an answer to the selected security question."; // validates an answer has been inputted for the security question
    return;
  }

  // validation for email fields and for name field
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ensures correct email address, in format such as helloimbob@gmail.com

  if (!firstName || !lastName || !email || !phone || !address1 || !password || !question) { 
    errorMsg.innerText = "Please fill in all compulsory fields."; // displays error message if all the fields are NOT filled in
    return;
  }

  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    errorMsg.innerText = "Names cannot contain numbers or special characters."; // if numbers or any special characters (:/'.!@#$%^&*) in name, error message appears
    return;
  }

  if (!emailRegex.test(email)) {
    errorMsg.innerText = "Please enter a valid email address."; // error message if email is not correct and doesn't operate
    return;
  }

  // Submit to Google Sheets
  fetch("https://script.google.com/macros/s/AKfycbxlyuH5EK5zMrAvrPJ5FlycMCHhHZQHLRtmM8jc2RCi6lb6LuY_-rEz1E20jNholke9/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded" // send as URL encoded string
    },
    body: data.toString() // convert URLSearchParams to proper encoded string format
  })
  
  .then(res => res.text())
  .then(msg => {
    statusMsg.innerText = "Form submitted successfully!"; // successful message
    form.reset(); // reset form after submission
  })
  .catch(err => {
    errorMsg.innerText = "Submission failed. Please try again later."; // not successful message (if something went wrong)
    console.error(err); // logs error to console
  });
});