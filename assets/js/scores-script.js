// The section of the page that will display saved scores
var scoreElements = document.querySelector("#scores");

// The name and score of a student that has taken the quiz
var stuName;
var stuScore;

// An HTML element that scores will be placed into
var newScore;

//Iterate through local storage and display its content
for (i = 0; i < localStorage.length; i++) {
  stuName = localStorage.key(i);
  stuScore = JSON.parse(localStorage.getItem(localStorage.key(i)));

  newScore = document.createElement("p");
  scoreElements.appendChild(newScore);

  newScore.textContent = stuName + ": " + stuScore;
}