const STORAGE_KEY = "webprog-practice-05-pixel-art";

const state = {
  gridWidth: 10,
  gridHeight: 10,
  pixels: [], // pixels[row][column] is a color string or null
  currentColor: "#ff0000",
  elapsedSeconds: 0,
};

let intervalId = null;

const widthInput = document.querySelector("#grid-width");
const heightInput = document.querySelector("#grid-height");
const generateButton = document.querySelector("#generate-btn");
const gridContainer = document.querySelector("#grid-container");
const colorPicker = document.querySelector("#color-picker");
const colorPreview = document.querySelector("#current-color-display");
const saveButton = document.querySelector("#save-btn");
const loadButton = document.querySelector("#load-btn");
const status = document.querySelector("#status");
const timerDisplay = document.querySelector("#timer-display");
const timerStartButton = document.querySelector("#timer-start");
const timerPauseButton = document.querySelector("#timer-pause");
const timerResetButton = document.querySelector("#timer-reset");

function validColor(color) {
  return typeof color === "string" && /^#[0-9a-f]{6}$/i.test(color);
}

function validDrawing(drawing) {
  if (!drawing || !validSize(drawing.gridWidth) ||
      !validSize(drawing.gridHeight) || !validColor(drawing.currentColor) ||
      !Array.isArray(drawing.pixels) ||
      drawing.pixels.length !== drawing.gridHeight) {
    return false;
  }

  return drawing.pixels.every((row) =>
    Array.isArray(row) && row.length === drawing.gridWidth &&
    row.every((pixel) => pixel === null || validColor(pixel))
  );
}

// Add the grid, painting, timer, and save/load functions during class.

function createEmptyPixels(width, height) {
  return Array.from({length: height}, () => Array(width).fill(null))
}

/*

pixels = [
[null, null, null], [], []
]

*/

function cellHtml(color, row, col) {
  // const background = color === null ? "#fff" : color;
  const background = color ?? "#fff";

  // <td data-row="0" data-col="0" style="background-color: #ffffff"></td>
  return `<td data-row="${row}" data-col="${col}" style="background-color: ${background}"></td>`;
}

function rowHtml(row, rowIndex) {
  const cells = row.map((color, colIndex) => cellHtml(color, rowIndex, colIndex)).join("");

  return `<tr>${cells}</tr>`;
}

function renderGrid() {
  const rows = state.pixels.map(rowHtml).join(""); // .map((row, rowIndex) => )

  gridContainer.innerHTML = `<table class="edit">
    <tbody>${rows}</tbody>
  </table>`
}

function renderColor() {
  colorPreview.style.backgroundColor = state.currentColor;
}

function paintCell(event) {
  console.log(event.target)

  if(!event.target.matches("td")) {
    return;
  }

  const cell = event.target;
  const row = cell.dataset.row;
  const col = cell.dataset.col;

  state.pixels[row][col] = state.currentColor;
  renderGrid();
}

function renderTimer() {
  // Math.floor(1.7) -> 1 | Math.ceil(1.2) -> 2) | Math.round()
  const minutes = String(Math.floor(state.elapsedSeconds / 60 )).padStart(2, "0");

  const seconds = String(Math.floor(state.elapsedSeconds % 60 )).padStart(2, "0");

  timerDisplay.innerHTML = `${minutes}:${seconds}`;

}

generateButton.addEventListener("click", () => {
  const width = Number(widthInput.value);
  const height = Number(heightInput.value);

  state.gridWidth = width;
  state.gridHeight = height;

  state.pixels = createEmptyPixels(width, height);

  console.log(state.pixels)

  renderGrid();
})


colorPicker.addEventListener("input", () => {
  state.currentColor = colorPicker.value;
  renderColor();
})


gridContainer.addEventListener("click", paintCell)

timerStartButton.addEventListener("click", () => {
  if(intervalId !== null) {
    return;
  }
  intervalId = setInterval(() => {
    state.elapsedSeconds++;
    renderTimer();
  }, 1000) // 1000 ms = 1 seconds

});

function pauseTimer() {
  if(intervalId === null) return;

  clearInterval(intervalId);
  intervalId = null;
}

timerPauseButton.addEventListener("click", pauseTimer);

timerResetButton.addEventListener("click", () => {
  pauseTimer();
  state.elapsedSeconds = 0;
  renderTimer();
})