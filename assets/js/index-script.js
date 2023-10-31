var initialElements = document.querySelector("#initial");
var quizElements = document.querySelector("#quiz");
var resultElements = document.querySelector("#results");

var timer = document.querySelector("#timer");

var startButton = document.querySelector("#start-button");
startButton.addEventListener("click", takeQuiz);

var secondsLeft = 100;
var score = 0;

var questionText = document.createElement("p");

var answerButtons = document.createElement("div");
var answer1 = document.createElement("button");
var answer2 = document.createElement("button");
var answer3 = document.createElement("button");
var answer4 = document.createElement("button");

var questionResult = document.createElement("p");

var scoreText = document.createElement("p");
var initialsPrompt = document.createElement("p");
var initialsInput = document.createElement("input");
var submitButton = document.createElement("button");

var studentResults = {
  stuName: "",
  stuScore: 0
}

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

var currentQuestionIndex = 0;



function takeQuiz() {
  startTimer();
  renderQuiz();

  setNextQuestion(questions[currentQuestionIndex]);
}

function setNextQuestion(question) {
  answer1.classList.remove("correct");
  answer2.classList.remove("correct");
  answer3.classList.remove("correct");
  answer4.classList.remove("correct");

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

  questionText.textContent = question.qText;
  answer1.textContent = question.a1;
  answer2.textContent = question.a2;
  answer3.textContent = question.a3;
  answer4.textContent = question.a4;

  answerButtons.addEventListener("click", checkAnswer)
}

function checkAnswer(event) {
  // Check if selected answer was right, act accordingly
  var selectedButton = event.target;

  if (selectedButton.classList.contains("correct")) {
    questionResult.textContent = "Correct!";
    score++;
  }
  else {
    questionResult.textContent = "Wrong!";
    if (secondsLeft < 10) {
      secondsLeft = 0;
    }
    else {
      secondsLeft = secondsLeft - 10;
    }
  }

  // Move to next question, or end quiz
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    setNextQuestion(questions[currentQuestionIndex]);
  }
  else {
    showResults();
  }
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

function startTimer() {
  timer.textContent = "Time remaining: " + secondsLeft;

  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "Time remaining: " + secondsLeft;

    if(secondsLeft <= 0) {
      timer.textContent = "Time remaining: 0";
      // Stops execution of action at set interval
      clearInterval(timerInterval);

      showResults();
    }
  }, 1000);
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

  submitButton.addEventListener("click", function(){
    // Update student results object, only if initials were put in
    if (initialsInput.value !== "") {
      studentResults.stuName = initialsInput.value;
      studentResults.stuScore = score;

      // Save results to local storage, using initials as a key
      localStorage.setItem(studentResults.stuName, JSON.stringify(studentResults.stuScore));

      initialsInput.value = "";
    }
  })
}