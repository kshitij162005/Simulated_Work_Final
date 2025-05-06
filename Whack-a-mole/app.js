const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let countDownTimerId = null;

let moleAppearanceInterval = 500;

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
    square.classList.remove("bonus"); 
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add("mole");

  hitPosition = randomSquare.id;

  if (Math.random() < 0.1) {
    randomSquare.classList.add("bonus"); 
  }
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

function moveMole() {
  if (timerId) clearInterval(timerId); 
  timerId = setInterval(randomSquare, moleAppearanceInterval);
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert("GAME OVER! Your final score is " + result);
  }
}

countDownTimerId = setInterval(countDown, 1000);
moveMole();

function adjustDifficulty() {
  if (result >= 10 && moleAppearanceInterval !== 400) {
    moleAppearanceInterval = 400; 
    moveMole(); 
  }
  if (result >= 20 && moleAppearanceInterval !== 300) {
    moleAppearanceInterval = 300;
    moveMole(); 
  }
}

setInterval(adjustDifficulty, 1000); 
