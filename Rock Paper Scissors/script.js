// DOM elements
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const resultText = document.getElementById("result");

let playerScore = 0;
let computerScore = 0;

const playerScoreDisplay = document.getElementById("playerScore");
const computerScoreDisplay = document.getElementById("computerScore");

const playerChoiceDisplay = document.getElementById("playerChoice");
const computerChoiceDisplay = document.getElementById("computerChoice");

const winSound = new Audio("sounds/victorymale-version-230553.mp3");
const loseSound = new Audio("sounds/you-lose-game-sound-230514.mp3");
const tieSound = new Audio("sounds/game-bonus-144751.mp3");

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function decideWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    tieSound.play();
    return "It's a tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    playerScore++; // Increment player score
    playerScoreDisplay.textContent = playerScore; // Update player score in UI
    winSound.play();
    return "You win!";
  } else {
    computerScore++; // Increment computer score
    computerScoreDisplay.textContent = computerScore; // Update computer score in UI
    loseSound.play();
    return "Computer wins!";
  }
}

function animateSelection(button) {
  button.style.transform = "scale(1.2)";
  button.style.transition = "transform 0.2s ease-in-out";
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 200);
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();

  // Animate button selection
  const selectedButton = {
    rock: rockButton,
    paper: paperButton,
    scissors: scissorsButton,
  }[playerChoice];
  animateSelection(selectedButton);

  // Update the displayed choices
  playerChoiceDisplay.textContent = `Your Choice: ${playerChoice}`;
  computerChoiceDisplay.textContent = `Computer's Choice: ${computerChoice}`;

  const result = decideWinner(playerChoice, computerChoice);
  resultText.textContent = `${result} (You: ${playerChoice}, Computer: ${computerChoice})`;
}

// Add event listeners with animations
rockButton.addEventListener("click", () => playRound("rock"));
paperButton.addEventListener("click", () => playRound("paper"));
scissorsButton.addEventListener("click", () => playRound("scissors"));

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
  resultText.textContent = "Make your move!";

  // Reset the choices display
  playerChoiceDisplay.textContent = "Your Choice: ";
  computerChoiceDisplay.textContent = "Computer's Choice: ";
}

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetGame);
