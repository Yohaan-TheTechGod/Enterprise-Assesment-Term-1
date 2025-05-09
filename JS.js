// This JS Function is to set the page to the very top when the page is loading in
if ('scrollRestoration' in history) { // Check if the browser supports the scrollRestoration feature
    history.scrollRestoration = 'manual'; // Set the scroll restoration feature to manual to avoid unwanted behavior when reloading the page
  }
  
  // Scroll to top when DOM content is loaded
  document.addEventListener('DOMContentLoaded', function() {
      window.scrollTo(0, 0);
  });  

//-----------------------------------------------------------------------------------------------------------------------------------------------------//

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
      //setTimeout(() => {
          // Scroll the window to the bottom of the page, using the smooth scrolling effect
        //  window.scrollTo({
            //  top: window.innerHeight, // Set the scroll position to the height of the view window
            //  behavior: 'smooth' // Use the smooth scrolling effect
          //});
      //}, 500); // End of setTimeout function 
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

// This JS Function is for the audio toggle button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Select the video element with the id 'background-video'
    const video = document.getElementById('background-video');
    // Select the button element with the id 'audio-toggle-btn'
    const audioBtn = document.getElementById('audio-toggle-btn');

    // Add a 'click' event listener to the audio toggle button
    audioBtn.addEventListener('click', function() {
        // If the video is currently muted, unmute it and change the button text to 'Mute'
        if (video.muted) {
            video.muted = false;
            audioBtn.textContent = 'Mute'; // Change text to 'Mute' when the video is unmuted
        } 
        // If the video is currently unmuted, mute it and change the button text to 'Unmute'
        else {
            video.muted = true;
            audioBtn.textContent = 'Unmute'; // Change text to 'Unmute' when the video is muted
        }
    });
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------//

// This JS Function is for the contact page popup with email verification
document.addEventListener('DOMContentLoaded', function() { // Wait until the DOM content is fully loaded before running the script
  // Get the contact form element by its ID
  const form = document.getElementById('contact-form');
  if (!form) return; // Exit if the form is not found on the page

  // Add an event listener for the form submission event
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission (page reload)

    // Clear any previous warning messages from the form
    const warnings = form.querySelectorAll('.warning-message');
    warnings.forEach(warning => warning.remove());

    // Remove the 'invalid' class from all input and textarea elements to reset styles
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => input.classList.remove('invalid'));

    // Flag to track if the form is valid; assume valid initially
    let isValid = true;

    /**
     * Helper function to add a warning message next to an input/textarea element
     * @param {HTMLElement} input - The input or textarea element to mark invalid
     * @param {string} message - The warning message to display
     */
    function addWarning(input, message) {
      // Add 'invalid' class to highlight the input/textarea with red border and background
      input.classList.add('invalid');

      // Create a div element to hold the warning message
      const warning = document.createElement('div');

      // Assign CSS class for styling the warning message
      warning.className = 'warning-message';

      // Set the warning text content
      warning.textContent = message;

      // Insert the warning message immediately after the input/textarea element
      input.parentNode.insertBefore(warning, input.nextSibling);

      // Mark the form as invalid
      isValid = false;
    }

    // Validate Name field (required, letters, spaces, apostrophes, hyphens only)
    const name = form['full-name'];
    // Regex pattern allowing letters, spaces, apostrophes, and hyphens
    const namePattern = /^[a-zA-Z\s'-]+$/;
    if (!name.value.trim()) {
      addWarning(name, 'Name is required.');
    } else if (!namePattern.test(name.value.trim())) {
      addWarning(name, 'Name can only contain letters, spaces, apostrophes, and hyphens.');
    }

    // Validate Email field (required, basic format)
    const email = form.email;
    // Simple regex pattern to check basic email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      addWarning(email, 'Email is required.');
    } else if (!emailPattern.test(email.value.trim())) {
      addWarning(email, 'Please enter a valid email address.');
    }

    // If all validations pass, show success alert and reset the form
    if (isValid) {
      alert('Form has been SUCCESFULLY submitted! We will get back to you shortly.');
      form.reset();
    }
  });
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------//

// This JS Fucntion is for the membership form validation and submission

document.addEventListener('DOMContentLoaded', function() {
  // Get the membership form element by its ID
  const form = document.getElementById('membership-form');
  if (!form) return; // If form is not found, exit early

  // Add an event listener for the form submission event
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)

    // Clear any previous warning messages from the form
    const warnings = form.querySelectorAll('.warning-message');
    warnings.forEach(warning => warning.remove());

    // Remove the 'invalid' class from all input and select elements to reset styles
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => input.classList.remove('invalid'));

    // Flag to track if the form is valid; assume valid initially
    let isValid = true;

    /**
     * Helper function to add a warning message next to an input/select element
     * @param {HTMLElement} input - The input or select element to mark invalid
     * @param {string} message - The warning message to display
     */
    function addWarning(input, message) {
      // Add 'invalid' class to highlight the input/select with red border and background
      input.classList.add('invalid');

      // Create a div element to hold the warning message
      const warning = document.createElement('div');

      // Assign CSS class for styling the warning message
      warning.className = 'warning-message';

      // Set the warning text content
      warning.textContent = message;

      // Insert the warning message immediately after the input/select element
      input.parentNode.insertBefore(warning, input.nextSibling);

      // Mark the form as invalid
      isValid = false;
    }

    // Validate First & Last Name (required)
    const fullName = form.fullName;
    if (!fullName.value.trim()) {
      addWarning(fullName, 'First & Last Name is required.');
    }

    // Validate Email (required, basic format)
    const email = form.email;
    // Simple regex pattern to check basic email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      addWarning(email, 'Email is required.');
    } else if (!emailPattern.test(email.value.trim())) {
      addWarning(email, 'Please enter a valid email address.');
    }

    // Validate Phone Number (required, digits only, minimum 8 digits)
    const phone = form.phone;
    // Regex pattern to check for at least 8 digits
    const phonePattern = /^\d{8,}$/;
    if (!phone.value.trim()) {
      addWarning(phone, 'Phone Number is required.');
    } else if (!phonePattern.test(phone.value.trim())) {
      addWarning(phone, 'Please enter a valid phone number (at least 8 digits).');
    }

    // Validate Address 1 (required)
    const address1 = form.address1;
    if (!address1.value.trim()) {
      addWarning(address1, 'Address 1 is required.');
    }

    // Address 2 is optional, so no validation needed

    // Validate State/Territory (required)
    const state = form.state;
    if (!state.value) {
      addWarning(state, 'Please select your state/territory.');
    }

    // Validate Password (required, minimum 8 characters, at least 1 special character)
    const password = form.password;
    // Regex pattern to check for at least one special character
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (!password.value) {
      addWarning(password, 'Password is required.');
    } else if (password.value.length < 8) {
      addWarning(password, 'Password must be at least 8 characters.');
    } else if (!specialCharPattern.test(password.value)) {
      addWarning(password, 'Password must contain at least one special character.');
    }

    // Validate Credit/Debit Card Number (required, digits only, 13 to 19 digits)
    const cardNumber = form.cardNumber;
    // Regex pattern for 13 to 19 digits
    const cardPattern = /^\d{13,19}$/;
    if (!cardNumber.value.trim()) {
      addWarning(cardNumber, 'Card Number is required.');
    } else if (!cardPattern.test(cardNumber.value.trim())) {
      addWarning(cardNumber, 'Please enter a valid card number (13 to 19 digits).');
    }

    // Validate CVV/CVC (required, 3 or 4 digits)
    const cvv = form.cvv;
    // Regex pattern for 3 or 4 digits
    const cvvPattern = /^\d{3,4}$/;
    if (!cvv.value.trim()) {
      addWarning(cvv, 'CVV/CVC is required.');
    } else if (!cvvPattern.test(cvv.value.trim())) {
      addWarning(cvv, 'Please enter a valid CVV (3 or 4 digits).');
    }

    // Validate Security Question (required)
    const securityQuestion = form.securityQuestion;
    if (!securityQuestion.value) {
      addWarning(securityQuestion, 'Please select a security question.');
    }

    // Validate Security Question Answer (required)
    const securityAnswer = form.securityAnswer;
    if (!securityAnswer.value.trim()) {
      addWarning(securityAnswer, 'Security question answer is required.');
    }

    // If all validations pass, show success alert and reset the form
    if (isValid) {
      alert('Form has been SUCCESFULLY submitted! We will get back to you shortly.');
      form.reset();
    }
  });
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------//

// This JS function is for the donation form validation and submission
document.addEventListener('DOMContentLoaded', function() { // Wait until the DOM content is fully loaded before running the script
  // Get the donation form element by its ID
  const form = document.getElementById('donation-form');
  // Get the gratitude message div element by its ID
  const gratitudeMessage = document.getElementById('gratitudeMessage');
  // Exit if either element is not found on the page
  if (!form || !gratitudeMessage) return;

  // Add an event listener for the form submission event
  form.addEventListener('submit', function(event) {
    // Prevent the default form submission (page reload)
    event.preventDefault();

    // Clear any previous warning messages from the form
    const warnings = form.querySelectorAll('.warning-message');
    warnings.forEach(warning => warning.remove());

    // Remove the 'invalid' class from all input, select, and textarea elements to reset styles
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => input.classList.remove('invalid'));

    // Flag to track if the form is valid; assume valid initially
    let isValid = true;

    /**
     * Helper function to add a warning message next to an input/select/textarea element
     * @param {HTMLElement} input - The input/select/textarea element to mark invalid
     * @param {string} message - The warning message to display
     */
    function addWarning(input, message) {
      // Add 'invalid' class to highlight the element with red border and background
      input.classList.add('invalid');

      // Create a div element to hold the warning message
      const warning = document.createElement('div');

      // Assign CSS class for styling the warning message
      warning.className = 'warning-message';

      // Set the warning text content
      warning.textContent = message;

      // Insert the warning message immediately after the input/select/textarea element
      input.parentNode.insertBefore(warning, input.nextSibling);

      // Mark the form as invalid
      isValid = false;
    }

    // Validate First Name (required)
    const firstName = form.firstName;
    if (!firstName.value.trim()) {
      addWarning(firstName, 'First Name is required.');
    }

    // Validate Last Name (required)
    const lastName = form.lastName;
    if (!lastName.value.trim()) {
      addWarning(lastName, 'Last Name is required.');
    }

    // Validate Email (required, basic format)
    const email = form.email;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      addWarning(email, 'Email is required.');
    } else if (!emailPattern.test(email.value.trim())) {
      addWarning(email, 'Please enter a valid email address.');
    }

    // Validate Address (required)
    const address = form.address;
    if (!address.value.trim()) {
      addWarning(address, 'Address is required.');
    }

    // Validate Country (required)
    const country = form.country;
    if (!country.value) {
      addWarning(country, 'Please select your country.');
    }

    // Validate City (required)
    const city = form.city;
    if (!city.value.trim()) {
      addWarning(city, 'City is required.');
    }

    // Validate Phone Number (required, digits only, minimum 8 digits)
    const phone = form.phone;
    const phonePattern = /^\d{8,}$/;
    if (!phone.value.trim()) {
      addWarning(phone, 'Phone Number is required.');
    } else if (!phonePattern.test(phone.value.trim())) {
      addWarning(phone, 'Please enter a valid phone number (at least 8 digits).');
    }

    // Validate Donation Type (required radio button)
    const donationType = form.querySelector('input[name="donationType"]:checked');
    if (!donationType) {
      // Select the donation type group container to attach warning
      const donationTypeGroup = form.querySelector('.donation-group');
      addWarning(donationTypeGroup, 'Please select a donation type.');
    }

    // Validate Donation Amount (required radio button)
    const donationAmount = form.querySelector('input[name="donationAmount"]:checked');
    if (!donationAmount) {
      // Select the donation amount group container to attach warning
      const donationAmountGroup = form.querySelectorAll('.donation-group')[1];
      addWarning(donationAmountGroup, 'Please select a donation amount.');
    }

    // Validate Name On Card (required)
    const cardName = form.cardName;
    if (!cardName.value.trim()) {
      addWarning(cardName, 'Name On Card is required.');
    }

    // Validate Card Number (required, digits only, 13 to 19 digits)
    const cardNumber = form.cardNumber;
    const cardPattern = /^\d{13,19}$/;
    if (!cardNumber.value.trim()) {
      addWarning(cardNumber, 'Card Number is required.');
    } else if (!cardPattern.test(cardNumber.value.trim())) {
      addWarning(cardNumber, 'Please enter a valid card number (13 to 19 digits).');
    }

    // Validate Expiration Date (required, mm/yyyy format)
    const expiryDate = form.expiryDate;
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!expiryDate.value.trim()) {
      addWarning(expiryDate, 'Expiration Date is required.');
    } else if (!expiryPattern.test(expiryDate.value.trim())) {
      addWarning(expiryDate, 'Expiration Date must be in mm/yyyy format.');
    }

    // Validate CVV (required, 3 or 4 digits)
    const cvv = form.cvv;
    const cvvPattern = /^\d{3,4}$/;
    if (!cvv.value.trim()) {
      addWarning(cvv, 'CVV is required.');
    } else if (!cvvPattern.test(cvv.value.trim())) {
      addWarning(cvv, 'Please enter a valid CVV (3 or 4 digits).');
    }

    // If all validations pass, hide the form and show the gratitude message
    if (isValid) {
      form.style.display = 'none';
      gratitudeMessage.style.display = 'block';
    }
  });
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------//