// List of questionnaire questions
const questions = [
  "Am I interacting with Jewel Maxine Fortuna right now?",
  "Hello, I'm Christian. Do you recognize me?",
  "Thank you for noticing me, beautiful lady. Are you available on Friday, February 14th?",
  "Awesome! Will you be my Valentine?"
];

// GIF URLs for each question (place your GIF files in the assets folder)
const gifURLs = [
  "assets/images/doraemonquestionig.gif",
  "",
  "assets/images/DoraemonBlush.gif",
  "assets/images/doraemonwithrose.gif"
];

let responses = [];
let currentQuestion = 0;
const contentDiv = document.getElementById("content");

// Display a question with Yes/No buttons and a GIF.
function displayQuestion() {
  let questionHTML = `<p class="question">${questions[currentQuestion]}</p>`;
  
  // Add the GIF for this question (if available)
  if (gifURLs[currentQuestion]) {
    questionHTML += `<img src="${gifURLs[currentQuestion]}" alt="Question GIF" width="200" height="200" class="centered gif">`;
  }
  
  // For the second question (index 1), also include a static image (e.g., Christian's photo)
  if (currentQuestion === 1) {
    questionHTML += `<img src="assets/images/christian1.jpg" alt="Christian" width="250" height="200" style=border-radius:20px; class="centered">`;
  }
  
  questionHTML += `
    <div class="btn-group">
      <button id="yesBtn">Yes</button>
      <button id="noBtn">No</button>
    </div>
  `;
  
  contentDiv.innerHTML = questionHTML;
  
  document.getElementById("yesBtn").addEventListener("click", () => {
    responses.push({ question: questions[currentQuestion], answer: "Yes" });
    currentQuestion++;
    nextStep();
  });
  
  // When "No" is clicked, trigger the special effect.
  document.getElementById("noBtn").addEventListener("click", askWhyNo);
}

// Handle a "No" response with a fun animation effect.
function askWhyNo() {
  // Display the re-prompt view with two buttons.
  contentDiv.innerHTML = `
    <p class="question">Why are you saying "No"?</p>
    <img src="assets/images/DoraemonCry.gif" alt="No Response GIF" width="200" height="200" class="centered gif">
    <div class="btn-group">
      <button id="changeMindBtn">Yes, I'll change my mind</button>
      <button id="stayNoBtn">No</button>
    </div>
  `;
  
  // When the "Yes, I'll change my mind" button is clicked, proceed normally.
  document.getElementById("changeMindBtn").addEventListener("click", () => {
    responses.push({ question: questions[currentQuestion], answer: "Yes (after rethinking)" });
    currentQuestion++;
    nextStep();
  });
  
  // When the "No" button is clicked, change its text and animate the "Yes" button.
  document.getElementById("stayNoBtn").addEventListener("click", function() {
    this.textContent = "Come on, just say YES!";
    const yesButton = document.getElementById("changeMindBtn");
    yesButton.classList.add("enlarge");
    setTimeout(() => {
      yesButton.classList.remove("enlarge");
    }, 500);
  });
}

// Decide whether to display the next question or the contact form.
function nextStep() {
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    displayContactForm();
  }
}

// Display the contact form with a GIF.
function displayContactForm() {
  contentDiv.innerHTML = `
    <p>Please enter your email:</p>
    <form id="contactForm">
      <input type="email" name="userEmail" id="userEmail" placeholder="" required><br>
      <!-- Hidden textarea to store the invitation letter -->
      <textarea name="letter" id="letter" style="display:none;"></textarea>
      <input type="submit" value="Submit">
    </form>
    <img src="assets/images/DoraemonThankyou.gif" width="200" height="200" alt="Contact GIF" class="centered gif">
  `;
  
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Retrieve form values.
    const userEmail = document.getElementById("userEmail").value;
    
    // Compose the invitation letter.
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const letterContent = `
Dear Jewel,

With Valentine's Day right around the corner, I can't help but think how delightful it would be to celebrate this special day with you on Friday, February 14th.

Your charm and kindness never cease to amaze me, and I'd be thrilled to have you as my Valentine. I promise an evening filled with engaging conversation, laughter, and unforgettable moments.

Please let me know if you'll join me in making this day truly special.

With all my love,
Christian
    `;
    
    // Set the composed letter into the hidden textarea.
    document.getElementById("letter").value = letterContent;
    
    // Send the email using EmailJS.
    emailjs.sendForm('service_86b7qvi', 'template_8wtm1d4', this)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showSuccess(userEmail);
      }, function(error) {
        console.log('FAILED...', error);
        alert("Failed to send invitation. Please try again later.");
      });
  });
}

// Display the closing flow with an "Open Gmail" button.
function showSuccess(userEmail) {
  contentDiv.innerHTML = `
    <div class="success-container">
      <a href="https://mail.google.com/" target="_blank" class="btn-link">Open Gmail</a>
      <img src="assets/images/DoraemonSeeyou.gif" alt="Success GIF" width="200" height="200" class="centered gif">
    </div>
  `;
}

// Start the questionnaire.
displayQuestion();
