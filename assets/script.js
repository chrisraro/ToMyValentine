// List of questionnaire questions
const questions = [
  "Am I interacting with Jewel Maxine Fortuna right now?",
  "Hello, I'm Christian. Do you recognize me?",
  "Thank you for recognizing a beautiful lady. Are you available on Friday, February 14?",
  "Awesome! Will you be my Valentine?"
];

let responses = [];
let currentQuestion = 0;
const contentDiv = document.getElementById("content");

// Function to display a question with Yes/No buttons.
function displayQuestion() {
  let questionHTML = `<p class="question">${questions[currentQuestion]}</p>`;
  
  // For the second question (index 1), include the image.
  if (currentQuestion === 1) {
    questionHTML += `<img src="assets/christian.jpg" alt="Christian" width="100" height="100" class="centered">`;
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
  
  document.getElementById("noBtn").addEventListener("click", askWhyNo);
}

// Function to handle a "No" response by prompting the user repeatedly.
function askWhyNo() {
  contentDiv.innerHTML = `
    <p class="question">Why are you saying "No"?</p>
    <div class="btn-group">
      <button id="changeMindBtn">Yes, I'll change my mind</button>
      <button id="stayNoBtn">No</button>
    </div>
  `;
  
  document.getElementById("changeMindBtn").addEventListener("click", () => {
    responses.push({ question: questions[currentQuestion], answer: "Yes (after rethinking)" });
    currentQuestion++;
    nextStep();
  });
  
  document.getElementById("stayNoBtn").addEventListener("click", askWhyNo);
}

// Function to determine the next step: next question or contact form.
function nextStep() {
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    displayContactForm();
  }
}

// Function to display the contact form.
function displayContactForm() {
  contentDiv.innerHTML = `
    <p>Please enter your name and email:</p>
    <form id="contactForm">
      <input type="text" name="userName" id="userName" placeholder="Your Name" required><br>
      <input type="email" name="userEmail" id="userEmail" placeholder="your.email@example.com" required><br>
      <!-- Using a hidden textarea to store the invitation letter -->
      <textarea name="letter" id="letter" style="display:none;"></textarea>
      <input type="submit" value="Submit">
    </form>
  `;
  
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Retrieve form values.
    const name = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;
    
    // Compose the invitation letter.
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const letterContent = `
Dear ${name},

I hope this message finds you well. My name is Christian, and with Valentine’s Day just around the corner, I would be honored to have you join me in celebrating this special occasion. Today is ${dateStr}, and I can’t help but imagine how delightful it would be to spend this day with you.
Your charm and kindness have truly captured my attention, and I sincerely hope you will accept my invitation to be my Valentine. I promise an evening filled with engaging conversation, laughter, and memorable moments.
Please let me know if you can join me on this wonderful day.

With heartfelt anticipation,

Christian
    `;
    
    // Set the composed letter into the hidden textarea.
    document.getElementById("letter").value = letterContent;
    
    // Send the email using EmailJS.
    // Ensure that your EmailJS template is configured to use:
    // - userEmail (for the recipient's email address),
    // - userName, and
    // - letter (for the message body).
    emailjs.sendForm('service_86b7qvi', 'template_8wtm1d4', this)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert("Your invitation has been sent successfully to " + userEmail + "!");
      }, function(error) {
        console.log('FAILED...', error);
        alert("Failed to send invitation. Please try again later.");
      });
  });
}

// Start the questionnaire.
displayQuestion();
