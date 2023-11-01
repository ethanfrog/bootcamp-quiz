// The timer display at the top of the page
var timer = document.querySelector("#timer");
var secondsLeft = 100;

// The quiz elements that are initially shown when the page is loaded
var initialElements = document.querySelector("#initial");
var startButton = document.querySelector("#start-button");
// Start the quiz upon clicking the start button
startButton.addEventListener("click", takeQuiz);

// The elements that make up the actual quiz, only created once a quiz is started
var quizElements = document.querySelector("#quiz");
// The test takers score value
var score = 0;
// The current question's text display
var questionText = document.createElement("p");
// The answers to the current question
var answerButtons = document.createElement("div");
var answer1 = document.createElement("button");
var answer2 = document.createElement("button");
var answer3 = document.createElement("button");
var answer4 = document.createElement("button");
// Text describing the result of the previous question (correct/wrong)
var questionResult = document.createElement("p");

// An array of quiz questions. Each contains the text of each question, the
// text of its possible answers, and data on which answer is correct
var questions = [
  {
    qText: "How do you write comments in HTML?",
    a1: "<!--Comment-->",
    a2: "//Comment",
    a3: "/*Comment*/",
    a4: "<Comment>",
    correct: 1
  },
  {
    qText: "What is the command for changing text color to blue in CSS?",
    a1: "text-color: blue",
    a2: "color: blue",
    a3: "color -> blue",
    a4: "tc: blue",
    correct: 2
  },
  {
    qText: "What is the keyword for declaring a variable in JavaScript?",
    a1: "variable",
    a2: "data",
    a3: "var",
    a4: "declare",
    correct: 3
  }
]
// The current question being displayed
var currentQuestionIndex = 0;

// The elements that make up quiz results, only created once a quiz is finished
var resultElements = document.querySelector("#results");
// A text display for the quiz taker's final score
var scoreText = document.createElement("p");
// Elements for inputting initials and sending them to local storage
var initialsPrompt = document.createElement("p");
var initialsInput = document.createElement("input");
var submitButton = document.createElement("button");

// An object for storing quiz results, to be placed into local storage
var studentResults = {
  stuName: "",
  stuScore: 0
}



// Starts the quiz by enabling the timer, displaying quiz elements and injecting the first question's content
function takeQuiz() {
  startTimer();
  renderQuiz();

  setNextQuestion(questions[currentQuestionIndex]);
}

function startTimer() {
  // Initialize the timer display
  timer.textContent = "Time remaining: " + secondsLeft;

  var timerInterval = setInterval(function() {
    // Update the timer display every second
    secondsLeft--;
    timer.textContent = "Time remaining: " + secondsLeft;

    // End quiz when time runs out
    if(secondsLeft <= 0) {
      timer.textContent = "Time remaining: 0";
      clearInterval(timerInterval);
      showResults();
    }
  }, 1000); //1000 milliseconds = 1 second
}

function renderQuiz() {
  // Remove all child elements from the "initial" div of the HTML
  while (initialElements.firstChild) {
    initialElements.removeChild(initialElements.firstChild);
  }

  // Render quiz elements
  quizElements.appendChild(questionText);

  quizElements.appendChild(answerButtons);
  answerButtons.appendChild(answer1);
  answerButtons.appendChild(answer2);
  answerButtons.appendChild(answer3);
  answerButtons.appendChild(answer4);

  quizElements.appendChild(questionResult);
}

function setNextQuestion(question) {
  // Clear the correct status from all answers
  answer1.classList.remove("correct");
  answer2.classList.remove("correct");
  answer3.classList.remove("correct");
  answer4.classList.remove("correct");

  // Give one answer the correct status based on question data
  if (question.correct === 1) {
    answer1.setAttribute("class", "correct");
  }
  else if (question.correct === 2) {
    answer2.setAttribute("class", "correct");
  }
  else if (question.correct === 3) {
    answer3.setAttribute("class", "correct");
  }
  else {
    answer4.setAttribute("class", "correct");
  }

  // Fill out quiz elements with the content of the question parameter
  questionText.textContent = question.qText;
  answer1.textContent = question.a1;
  answer2.textContent = question.a2;
  answer3.textContent = question.a3;
  answer4.textContent = question.a4;
  // Process the user's answer when an answer button is clicked
  answerButtons.addEventListener("click", checkAnswer)
}

function checkAnswer(event) {
  // Get the selected button
  var selectedButton = event.target;
  // If the selected button has the correct status, increase score
  if (selectedButton.classList.contains("correct")) {
    questionResult.textContent = "Correct!";
    score++;
  }
  // Otherwise, decrement time remaining
  else {
    questionResult.textContent = "Wrong!";
    if (secondsLeft < 10) {
      secondsLeft = 0;
    }
    else {
      secondsLeft = secondsLeft - 10;
    }
  }

  // Move on to next question, or end the quiz if there are no questions remaining
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    setNextQuestion(questions[currentQuestionIndex]);
  }
  else {
    showResults();
  }
}

function showResults() {
  secondsLeft = 0;

  // Remove quiz elements
  while (quizElements.firstChild) {
    quizElements.removeChild(quizElements.firstChild);
  }

  // Render score elements
  resultElements.appendChild(scoreText);
  resultElements.appendChild(initialsPrompt);
  resultElements.appendChild(initialsInput);
  resultElements.appendChild(submitButton);

  scoreText.textContent = "Your final score is: " + score;
  initialsPrompt.textContent = "Enter initials:";
  submitButton.textContent = "Submit";

  // Upload results to local storage when the submit button is clicked
  submitButton.addEventListener("click", function(){
    // Update student results object, only if initials were put in
    if (initialsInput.value !== "") {
      studentResults.stuName = initialsInput.value;
      studentResults.stuScore = score;

      // Save results to local storage, using initials as a key
      localStorage.setItem(studentResults.stuName, JSON.stringify(studentResults.stuScore));

      // Clear the input bar after submission
      initialsInput.value = "";
    }
  })
}