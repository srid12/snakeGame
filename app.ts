window.addEventListener("load", () => {
  board = document.getElementById("board");
  document.addEventListener("keydown", function (event) {
    if (!eventRun) {
      return;
    }
    switch (event.key) {
      case "ArrowLeft":
        if (snakeDirection === "up" || snakeDirection === "down")
          snakeDirection = "left";
        break;
      case "ArrowRight":
        if (snakeDirection === "up" || snakeDirection === "down")
          snakeDirection = "right";
        break;
      case "ArrowUp":
        if (snakeDirection === "left" || snakeDirection === "right")
          snakeDirection = "up";
        break;
      case "ArrowDown":
        if (snakeDirection === "left" || snakeDirection === "right")
          snakeDirection = "down";
        break;
    }
    eventRun = false;
  });
  document.getElementById("start").addEventListener("click", () => {
    if (timerId) {
      isGameOver = true;
      clearInterval(timerId);
      timerId = null;
    } else {
      isGameOver = false;
      if (food != null) {
        boardElems[food].classList.remove("food");
      }
      while (snakes.length > 0) {
        boardElems[snakes.pop()].classList.remove("snake");
      }
      for (var i = 0; i < snakeHeight; i++) {
        boardElems[i].classList.add("snake");
        snakes.push(i);
      }
      drawFood();

      timerId = setInterval(moveSnake, 100);
    }
  });
  drawGrid();
});

type direction = "up" | "down" | "left" | "right";
let board: HTMLElement;
let isGameOver = false;
const blockWidth = 20;
const blockHeight = 20;
const boardWidth = 600;
const boardHeight = 600;
let eventRun = true;
const snakeHeight = 3;
let snakeDirection: direction = "right";
const len = 10;
let food;
const snakes = [];
let boardElems = [];
let timerId = null;
const squaresNumber = ((boardWidth / blockWidth) * boardHeight) / blockHeight;

function drawGrid() {
  const totalSquares = (boardWidth / blockWidth) * (boardHeight / blockHeight);
  const el = document.createElement("div");
  el.classList.add("container");
  el.style.width = boardWidth + "px";
  el.style.height = boardHeight + "px";
  for (let i = 0; i < totalSquares; i++) {
    const child = document.createElement("div");
    child.classList.add("block");
    child.style.width = blockWidth + "px";
    child.style.height = blockHeight + "px";
    boardElems.push(child);
    el.append(child);
  }
  board.appendChild(el);
}

function moveSnake() {
  let newPart = snakes[snakes.length - 1];
  let rowSize = boardWidth / blockWidth;
  eventRun = true;
  switch (snakeDirection) {
    case "up":
      newPart = newPart - rowSize;
      if (newPart < 0) {
        isGameOver = true;
      }
      break;
    case "down":
      newPart = newPart + rowSize;
      if (newPart > squaresNumber) {
        isGameOver = true;
      }
      break;
    case "left":
      newPart = newPart - 1;
      if (newPart % rowSize === rowSize - 1) {
        isGameOver = true;
      }
      break;
    case "right":
      newPart = newPart + 1;
      if (newPart % rowSize === 0) {
        isGameOver = true;
      }
      break;
  }
  if (snakes.includes(newPart)) {
    isGameOver = true;
  }
  if (isGameOver) {
    alert("Game Over");
    clearInterval(timerId);
    timerId = null;
  } else {
    boardElems[newPart].classList.add("snake");
    if (newPart === food) {
      boardElems[food].classList.remove("food");
      drawFood();
    } else {
      boardElems[snakes.shift()].classList.remove("snake");
    }
    snakes.push(newPart);
  }
}

function drawFood() {
  while (true) {
    food = Math.floor(Math.random() * squaresNumber);
    if (!snakes.includes(food)) {
      break;
    }
  }
  boardElems[food].classList.add("food");
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
