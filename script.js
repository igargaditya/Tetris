let canvas = document.querySelector("#tetris");
let scoreboard = document.getElementById("scoreb");
let ctx = canvas.getContext("2d");
ctx.scale(30, 30);

const SHAPES = [
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
];

const COLORS = [
  "#fff",
  "#9b5fe0",
  "#16a4d8",
  "#60dbe8",
  "#8bd346",
  "#efdf48",
  "#f9a52c",
  "#e24ee7",
];

const ROWS = 20;
const COLS = 10;

let grid = generateGrid();

let fallingPieceObj = null;
let score = 0;
let gameInterval;

setInterval(newGameState, 500);

document.querySelector("#start-button").addEventListener("click", startGame);

function startGame() {
  if (gameInterval) clearInterval(gameInterval);
  grid = generateGrid();
  fallingPieceObj = null;
  score = 0;
  scoreboard.innerHTML = "Score: " + score;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameInterval = setInterval(newGameState, 500);
}

document.addEventListener("keydown", function (e) {
  let key = e.key;
  if (key == "ArrowDown") {
    moveDown();
  } else if (key == "ArrowLeft") {
    moveLeft();
  } else if (key == "ArrowRight") {
    moveRight();
  } else if (key == "ArrowUp") {
    rotate();
  }
});
