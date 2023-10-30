var scoreElements = document.querySelector("#scores");

var stuName;
var stuScore;

var newScore;

//Iterate through local storage, display saved scores
for (i = 0; i < localStorage.length; i++) {
  stuName = localStorage.key(i);
  stuScore = JSON.parse(localStorage.getItem(localStorage.key(i)));

  newScore = document.createElement("p");
  scoreElements.appendChild(newScore);

  newScore.textContent = stuName + ", " + stuScore;
}