const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let xDirection = -2;
let yDirection = 2;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let timerId;
let score = 0;
let powerUps = [];
let balls = [ballCurrentPosition];

// Sound effects
const sounds = {
  hit: new Audio("sounds/game-bonus-144751.mp3"),
  destroy: new Audio("sounds/game-bonus-144751.mp3ō"), 
  powerUp: new Audio("sounds/game-bonus-144751.mp3"),
  win: new Audio("sounds/victorymale-version-230553.mp3"), 
  lose: new Audio("sounds/you-lose-game-sound-230514.mp3"), 
};

// Block class
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    this.topLeft = [xAxis, yAxis + blockHeight];
  }
}

const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

// Add blocks to the grid
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}
addBlocks();

const user = document.createElement("div");
user.classList.add("user");
grid.appendChild(user);
drawUser();

const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);
drawBall();

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}
document.addEventListener("keydown", moveUser);

function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

function drawBall() {
  balls.forEach((ballPos, index) => {
    const ballEl = document.querySelectorAll(".ball")[index];
    ballEl.style.left = ballPos[0] + "px";
    ballEl.style.bottom = ballPos[1] + "px";
  });
}

function moveBall() {
  balls.forEach((ballPos, index) => {
    ballPos[0] += xDirection;
    ballPos[1] += yDirection;
    checkForCollisions(index);
  });
  drawBall();
}
timerId = setInterval(moveBall, 30);

function checkForCollisions(ballIndex) {
  const ballPos = balls[ballIndex];
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballPos[0] > blocks[i].bottomLeft[0] &&
      ballPos[0] < blocks[i].bottomRight[0] &&
      ballPos[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballPos[1] < blocks[i].topLeft[1]
    ) {
      sounds.destroy.play(); // Play block destruction sound
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;

      if (Math.random() > 0.7) spawnPowerUp(blocks[i].bottomLeft);
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = "You Win!";
        sounds.win.play(); // Play win sound
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }

  if (
    ballPos[0] >= boardWidth - ballDiameter ||
    ballPos[0] <= 0 ||
    ballPos[1] >= boardHeight - ballDiameter
  ) {
    sounds.hit.play(); // Play wall hit sound
    changeDirection();
  }

  // Paddle collision detection
  if (
    ballPos[0] > currentPosition[0] &&
    ballPos[0] < currentPosition[0] + blockWidth &&
    ballPos[1] > currentPosition[1] &&
    ballPos[1] < currentPosition[1] + blockHeight
  ) {
    sounds.hit.play();
    changeDirection();
  }

  // Check for game over
  if (ballPos[1] <= 0) {
    sounds.lose.play();
    balls.splice(ballIndex, 1);
    if (balls.length === 0) {
      scoreDisplay.innerHTML = "You lose!";
      clearInterval(timerId);
      document.removeEventListener("keydown", moveUser);
    }
  }
}

function changeDirection() {
  xDirection = -xDirection;
  yDirection = -yDirection;
}

function spawnPowerUp(position) {
  const powerUp = document.createElement("div");
  powerUp.classList.add("powerup");
  powerUp.style.left = position[0] + "px";
  powerUp.style.bottom = position[1] + "px";
  grid.appendChild(powerUp);
  powerUps.push(powerUp);

  setTimeout(() => {
    if (powerUps.includes(powerUp)) {
      grid.removeChild(powerUp);
      powerUps.splice(powerUps.indexOf(powerUp), 1);
    }
  }, 5000);
}