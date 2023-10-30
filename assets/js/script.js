var initialElements = document.querySelector("#initial");
var quizElements = document.querySelector("#quiz");
var resultElements = document.querySelector("#results");

var timer = document.querySelector("#timer");

var startButton = document.querySelector("#start-button");
startButton.addEventListener("click", takeQuiz);

var secondsLeft = 3;
var score = 0;

var studentResults = {
  stuName: "",
  stuScore: 0
}

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
  var answer1 = document.createElement("button");
  var answer2 = document.createElement("button");
  var answer3 = document.createElement("button");
  var answer4 = document.createElement("button");
  var prevResult = document.createElement("p");

  quizElements.appendChild(question);
  quizElements.appendChild(answer1);
  quizElements.appendChild(answer2);
  quizElements.appendChild(answer3);
  quizElements.appendChild(answer4);
  quizElements.appendChild(prevResult);

  question.textContent = "Question goes here";
  answer1.textContent = "Answer 1";
  answer2.textContent = "Answer 2";
  answer3.textContent = "Answer 3";
  answer4.textContent = "Answer 4";
  prevResult.textContent = "Correct!";
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
  // Remove quiz elements
  while (quizElements.firstChild) {
    quizElements.removeChild(quizElements.firstChild);
  }

  // Render score elements
  var scoreText = document.createElement("p");
  var initialsPrompt = document.createElement("p");
  var initialsInput = document.createElement("input");
  var submitButton = document.createElement("button");
  
  resultElements.appendChild(scoreText);
  resultElements.appendChild(initialsPrompt);
  resultElements.appendChild(initialsInput);
  resultElements.appendChild(submitButton);

  scoreText.textContent = "Your final score is: " + score;
  initialsPrompt.textContent = "Enter initials:";
  submitButton.textContent = "Submit";

  submitButton.addEventListener("click", function(){
    // Update student results object, only if initials were put in
    if (initialsInput.value !== "") {
      studentResults.stuName = initialsInput.value;
      studentResults.stuScore = score;

      // Save results to local storage, using initials as a key
      localStorage.setItem(studentResults.stuName, JSON.stringify(studentResults.stuScore));
    }
  })
}

// var q1 = {
//   qText: "How do you write comments in HTML?",
//   a1: "<!--Comment-->",
//   a2: "//Comment",
//   a3: "/*Comment*/",
//   a4: "<Comment>"
// };

// var q2 = {
//   qText: "What is the command for changing text color to blue in CSS?",
//   a1: "text-color: blue",
//   a2: "color: blue",
//   a3: "color -> blue",
//   a4: "tc: blue"
// };

// var q3 = {
//   qText: "What is the keyword for declaring a variable in JavaScript?",
//   a1: "variable",
//   a2: "data",
//   a3: "var",
//   a4: "declare"
// };