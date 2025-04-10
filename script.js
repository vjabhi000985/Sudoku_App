const gridElement = document.getElementById("sudoku-grid");
let isManual = false;

function generateGrid() {
  gridElement.innerHTML = "";
  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.maxLength = 1;
    input.type = "text";
    input.classList.add("cell");
    gridElement.appendChild(input);
  }
}

function generateSudoku() {
  isManual = false;
  generateGrid();
  // Bug: Sudoku doesn't fill correctly
  const easyPuzzle = [
    5, 3, 0, 0, 7, 0, 0, 0, 0,
    6, 0, 0, 1, 9, 5, 0, 0, 0,
    0, 9, 8, 0, 0, 0, 0, 6, 0,
    8, 0, 0, 0, 6, 0, 0, 0, 3,
    4, 0, 0, 8, 0, 3, 0, 0, 1,
    7, 0, 0, 0, 2, 0, 0, 0, 6,
    0, 6, 0, 0, 0, 0, 2, 8, 0,
    0, 0, 0, 4, 1, 9, 0, 0, 5,
    0, 0, 0, 0, 8, 0, 0, 7, 9,
  ];

  const inputs = gridElement.querySelectorAll("input");
  inputs.forEach((cell, i) => {
    cell.value = easyPuzzle[i] !== 0 ? easyPuzzle[i] : "";
  });
}

function enableManualEntry() {
  isManual = true;
  generateGrid();
}

function solveSudoku() {
  const cells = gridElement.querySelectorAll("input");
  const board = [];

  for (let i = 0; i < 9; i++) {
    board[i] = [];
    for (let j = 0; j < 9; j++) {
      let val = parseInt(cells[i * 9 + j].value);
      board[i][j] = isNaN(val) ? 0 : val;
    }
  }

  if (!solve(board)) {
    alert("No solution found!");  // Intentional bug: doesn't handle invalid input properly
    return;
  }

  for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    cells[i].value = board[row][col];
  }
}

function isSafe(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num || 
        board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
      return false;
    }
  }
  return true;
}

function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Intentional Bug: Auto grid not initializing
window.onload = () => {
  // generateGrid(); // Uncommenting this will fix auto grid init
};