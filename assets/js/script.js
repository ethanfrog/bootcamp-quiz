var initialElements = document.querySelector("#initial");
var quizElements = document.querySelector("#quiz");

var startButton = document.querySelector("#start-button");
startButton.addEventListener("click", startQuiz);



var q1 = "How do you write comments in HTML?";
var q1Answers = ["<!--Comment-->", "//Comment", "/*Comment*/", "<Comment>"];

var q2 = "What is the command for changing text color to blue in CSS?";
var q2Answers = ["text-color: blue", "color: blue", "color -> blue", "tc: blue"];

var q3 = "What is the keyword for declaring a variable in JavaScript?";
var q3Answers = ["variable", "data", "var", "declare"];



function startQuiz() {
  // Remove all child elements from the "initial" div of the HTML
  while (initialElements.firstChild) {
    initialElements.removeChild(initialElements.firstChild);
  }

  // Append timer asset to HTML
  var timerAsset = document.createElement("p");
  var secondsLeft = 10;
  quizElements.appendChild(timerAsset);
  timerAsset.textContent = "Time remaining: " + secondsLeft;


  // Start timer
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerAsset.textContent = "Time remaining: " + secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
    }
  }, 1000);
}