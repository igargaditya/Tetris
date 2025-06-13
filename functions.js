// Generates a 20 rows and 10 column grid
function generateGrid() {
  let grid = [];
  for (let i = 0; i < ROWS; i++) {
    grid.push([]);
    for (let j = 0; j < COLS; j++) {
      grid[i].push(0);
    }
  }
  return grid;
}

function newGameState() {
  checkGrid();
  if (!fallingPieceObj) {
    fallingPieceObj = randomPieceObject();
    renderPiece();
  }
  moveDown();
}

function checkGrid() {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    let allFilled = true;
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 0) {
        allFilled = false;
      }
    }
    if (allFilled) {
      count++;
      grid.splice(i, 1);
      grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }
  if (count == 1) {
    score += 10;
  } else if (count == 2) {
    score += 30;
  } else if (count == 3) {
    score += 50;
  } else if (count > 3) {
    score += 100;
  }
  scoreb.innerHTML = "Score: " + score;
}

function randomPieceObject() {
  let ran = Math.floor(Math.random() * 7);
  let piece = SHAPES[ran];
  let colorIndex = ran + 1;
  let x = 4;
  let y = 0;
  return { piece, colorIndex, x, y };
}

function renderPiece() {
  let piece = fallingPieceObj.piece;
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] == 1) {
        ctx.fillStyle = COLORS[fallingPieceObj.colorIndex];
        ctx.fillRect(fallingPieceObj.x + j, fallingPieceObj.y + i, 1, 1);
      }
    }
  }
}

function moveDown() {
  if (!collision(fallingPieceObj.x, fallingPieceObj.y + 1))
    fallingPieceObj.y += 1;
  else {
    let piece = fallingPieceObj.piece;
    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        if (piece[i][j] == 1) {
          let p = fallingPieceObj.x + j;
          let q = fallingPieceObj.y + i;
          grid[q][p] = fallingPieceObj.colorIndex;
        }
      }
    }
    if (fallingPieceObj.y == 0) {
      alert("Gamer Over!!! Start New Game");
      grid = generateGrid();
      score = 0;
    }
    fallingPieceObj = null;
  }
  renderGame();
}
function renderGame() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      ctx.fillStyle = COLORS[grid[i][j]];
      ctx.fillRect(j, i, 1, 1);
    }
  }
  renderPiece();
}

function collision(x, y, rotatedPiece) {
  let piece = rotatedPiece || fallingPieceObj.piece;
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] == 1) {
        let p = x + j;
        let q = y + i;
        if (p >= 0 && p < COLS && q >= 0 && q < ROWS) {
          if (grid[q][p] > 0) {
            return true;
          }
        } else {
          return true;
        }
      }
    }
  }
  return false;
}

function rotate() {
  let rotatedPiece = [];
  let piece = fallingPieceObj.piece;
  rotatedPiece = piece;

  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      rotatedPiece[i][j] = piece[j][i];
    }
  }

  for (let i = 0; i < rotatedPiece.length; i++) {
    rotatedPiece[i] = rotatedPiece[i].reverse();
  }
  if (!collision(fallingPieceObj.x, fallingPieceObj.y, rotatedPiece))
    fallingPieceObj.piece = rotatedPiece;
  renderGame();
}

function moveLeft() {
  if (!collision(fallingPieceObj.x - 1, fallingPieceObj.y))
    fallingPieceObj.x -= 1;
  renderGame();
}

function moveRight() {
  if (!collision(fallingPieceObj.x + 1, fallingPieceObj.y))
    fallingPieceObj.x += 1;
  renderGame();
}
