var initialElements = document.querySelector("#initial");
var quizElements = document.querySelector("#quiz");

var startButton = document.querySelector("#start-button");
startButton = addEventListener("click", initializeQuiz);

function initializeQuiz() {
  // Remove all child elements from the "initial" div of the HTML
  console.log("Removing children");
  while (initialElements.firstChild) {
    initialElements.removeChild(initialElements.firstChild);
  }

  // Create question elements
}