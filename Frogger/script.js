const timeLeftDisplay = document.getElementById("time-left");
const resultDisplay = document.getElementById("result");
const livesDisplay = document.getElementById("lives");
const scoreDisplay = document.getElementById("score");
const startPauseButton = document.getElementById("start-pause-button");
const bgMusic = document.getElementById("bg-music");
const jumpSound = document.getElementById("jump-sound");
const collideSound = document.getElementById("collide-sound");
const winSound = document.getElementById("win-sound");
const powerupSound = document.getElementById("powerup-sound");
const squares = document.querySelectorAll(".grid div");

let currentIndex = 76;
const width = 9;
let timerId;
let outcomeTimerId;
let currentTime = 20;
let lives = 3;
let score = 0;

function moveFrog(e) {
  squares[currentIndex].classList.remove("frog");
  jumpSound.play();

  switch (e.key) {
    case "ArrowLeft":
      if (currentIndex % width !== 0) currentIndex -= 1;
      break;
    case "ArrowRight":
      if (currentIndex % width < width - 1) currentIndex += 1;
      break;
    case "ArrowUp":
      if (currentIndex - width >= 0) currentIndex -= width;
      break;
    case "ArrowDown":
      if (currentIndex + width < width * width) currentIndex += width;
      break;
  }
  squares[currentIndex].classList.add("frog");
}

function autoMoveElements() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;
  // Move logs, cars, and other elements here...
}

function checkOutcomes() {
  lose();
  win();
}

function lose() {
  if (
    squares[currentIndex].classList.contains("car-left") ||
    squares[currentIndex].classList.contains("log-right") ||
    currentTime <= 0
  ) {
    collideSound.play();
    lives--;
    livesDisplay.textContent = lives;

    if (lives === 0) {
      resultDisplay.textContent = "Game Over!";
      clearInterval(timerId);
      clearInterval(outcomeTimerId);
    } else {
      resetFrogPosition();
    }
  }
}

function win() {
  if (squares[currentIndex].classList.contains("ending-block")) {
    winSound.play();
    score += 10;
    scoreDisplay.textContent = score;
    resetFrogPosition();
  }
}

function resetFrogPosition() {
  squares[currentIndex].classList.remove("frog");
  currentIndex = 76;
  squares[currentIndex].classList.add("frog");
}

function spawnPowerUps() {
  const randomIndex = Math.floor(Math.random() * squares.length);
  squares[randomIndex].classList.add("power-up");

  setTimeout(() => {
    squares[randomIndex].classList.remove("power-up");
  }, 5000);
}

startPauseButton.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    bgMusic.pause();
    timerId = null;
  } else {
    timerId = setInterval(autoMoveElements, 1000);
    outcomeTimerId = setInterval(checkOutcomes, 50);
    bgMusic.play();
  }
  document.addEventListener("keyup", moveFrog);
});

setInterval(spawnPowerUps, 10000);
