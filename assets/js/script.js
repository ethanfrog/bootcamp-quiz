var initialElements = document.querySelector("#initial");
var quizElements = document.querySelector("#quiz");
var resultElements = document.querySelector("#results");

var timer = document.querySelector("#timer");

var startButton = document.querySelector("#start-button");
startButton.addEventListener("click", takeQuiz);

var secondsLeft = 5;
var score = 0;

function takeQuiz() {
  renderQuiz();
  startTimer();

  // Quiz logic goes here
}

function renderQuiz() {
  // Remove all child elements from the "initial" div of the HTML
  while (initialElements.firstChild) {
    initialElements.removeChild(initialElements.firstChild);
  }
  // Render quiz elements
  var question = document.createElement("p");
  quizElements.appendChild(question);

  var answer1 = document.createElement("button");
  var answer2 = document.createElement("button");
  var answer3 = document.createElement("button");
  var answer4 = document.createElement("button");
  quizElements.appendChild(answer1);
  quizElements.appendChild(answer2);
  quizElements.appendChild(answer3);
  quizElements.appendChild(answer4);

  question.textContent = "Question goes here";
  answer1.textContent = "Answer 1";
  answer2.textContent = "Answer 2";
  answer3.textContent = "Answer 3";
  answer4.textContent = "Answer 4";
}

function startTimer() {
  timer.textContent = "Time remaining: " + secondsLeft;

  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "Time remaining: " + secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);

      showResults();
    }
  }, 1000);
}

function showResults() {
  console.log("showResults is being called");

  // Remove quiz elements
  while (quizElements.firstChild) {
    quizElements.removeChild(quizElements.firstChild);
  }
  // Render score elements
}

// var q1 = "How do you write comments in HTML?";
// var q1Answers = ["<!--Comment-->", "//Comment", "/*Comment*/", "<Comment>"];

// var q2 = "What is the command for changing text color to blue in CSS?";
// var q2Answers = ["text-color: blue", "color: blue", "color -> blue", "tc: blue"];

// var q3 = "What is the keyword for declaring a variable in JavaScript?";
// var q3Answers = ["variable", "data", "var", "declare"];