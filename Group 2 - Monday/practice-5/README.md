# Practice 5 — Pixel Art Editor

Build a pixel drawing page from the supplied starter. Open `example.html` first: it shows a static 5×5 drawing, so its buttons do not work. Then open `index.html` with Live Server and add your code to `script.js`. Keep the browser Console open to spot errors.

The starter provides `state`, the DOM selections, a storage key, and the `validColor()` and `validDrawing()` helpers. Keep the drawing in `state.pixels`: change that array first, then render the page from it. Work through the checkpoints in order. **Aim to finish a–f in the 70-minute class; g is guided work for afterward.**

## Tasks

### a. Create the pixel data

Write `createEmptyPixels(width, height)`. Return an array of `height` rows, with `width` `null` values in each row. Set `state.pixels` to a new grid using the supplied 10×10 dimensions. The page will show the grid in b.

**Hint:** `Array.from({ length: height }, () => Array(width).fill(null))` creates a fresh inner array for every row. Reusing one row would make painting one cell change several rows.

**Checkpoint:** In the Console, `state.pixels` has ten rows of ten `null` values. Try `const testPixels = createEmptyPixels(3, 2)`; changing `testPixels[0][0]` leaves `testPixels[1][0]` as `null`.

### b. Render the grid

Write `cellHtml(color, row, col)` to return a `<td>` with `data-row`, `data-col`, and a background color. Use white (`#ffffff`) for `null`. Write `rowHtml(row, rowIndex)` to turn cells into one `<tr>`. Then write `renderGrid()` to put a `<table class="edit"><tbody>…</tbody></table>` in `gridContainer.innerHTML`. Call it once after creating the first grid.

**Hint:** Use `row.map(...).join("")` for cells and `state.pixels.map(...).join("")` for rows. The second `map` callback argument gives the column or row index. `color ?? "#ffffff"` selects white for an empty cell.

**Checkpoint:** A 10×10 white grid appears with no commas. The cell in the third row and fifth column has `data-row="2"` and `data-col="4"`.

### c. Generate a new grid

Write `validSize(size)` to accept whole numbers from 1 to 30. Write `generateGrid()` and attach it to **Generate grid**. Read the width and height inputs, validate both, and show a message in `status` if either is invalid. For valid sizes, update `state.gridWidth` and `state.gridHeight`, make fresh `state.pixels` with `createEmptyPixels(...)`, then render the grid and show a success message.

**Hint:** Input `.value` is text; convert it with `Number(...)`. Use `Number.isInteger(...)` and check the range. Validate both inputs before changing `state`. A new grid replaces the old drawing.

**Checkpoint:** Width 5 and height 3 create 15 blank cells. Entering 0 for either size shows an error and leaves that 5×3 grid in place.

### d. Choose a color and paint

Write `renderColor()` to show `state.currentColor` in `colorPreview`, and call it once for the initial red preview. On the color picker's `input` event, copy its value into `state.currentColor` and update the preview.

Attach one `click` listener to `gridContainer`. Ignore clicks outside a `td`. For a cell click, read its row and column, put `state.currentColor` into that entry of `state.pixels`, then call `renderGrid()`.

**Hint:** Use `event.target.matches("td")`, `event.target.dataset.row`, and `event.target.dataset.col`. Convert the dataset strings to numbers. The listener belongs on the permanent container because rendering replaces the table.

**Checkpoint:** Paint one red cell, select blue, and paint another. Both colors remain. Clicking the red cell again changes only that cell to blue.

### e. Start the drawing timer

Write `renderTimer()` to display `state.elapsedSeconds` as `mm:ss` in `timerDisplay`; call it once on page load. Write `startTimer()` and attach it to **Start**. Every second, add 1 to `state.elapsedSeconds` and update the display. Ignore Start if a timer is already running.

**Hint:** `Math.floor(seconds / 60)` gives minutes, `seconds % 60` gives remaining seconds, and `String(number).padStart(2, "0")` adds a leading zero. Store the ID returned by `setInterval(..., 1000)` in `intervalId`; it starts as `null`.

**Checkpoint:** Start advances the display about once per second. Pressing Start again does not make it run twice as fast. Painting still works while it runs.

### f. Pause and reset the timer

Write `pauseTimer()` and attach it to **Pause**. If an interval is running, stop it and set `intervalId` back to `null`. Write `resetTimer()` and attach it to **Reset**: pause, set elapsed seconds to zero, and render the timer. Also call `resetTimer()` after a valid new grid is generated.

**Hint:** `clearInterval(intervalId)` stops the repeated callback but does not change `intervalId` or `state.elapsedSeconds`. Start can resume from the paused number once the ID is `null`.

**Checkpoint:** Pause freezes the display; Start continues from the same number. Reset shows `00:00` and stops. Generating a new grid while the timer runs also stops and resets it.

### g. Save and load one drawing — after class

Write `saveDrawing()` and attach it to **Save drawing**. Save `gridWidth`, `gridHeight`, `pixels`, and `currentColor` together under `STORAGE_KEY`. Saving again replaces the previous snapshot. Do not save `elapsedSeconds` or `intervalId`.

Write `loadDrawing()` and attach it to **Load drawing**. Read and parse the snapshot, then use the supplied `validDrawing()` helper before changing `state`. On success, restore the dimensions, pixels, selected color, and matching input values; reset the timer and rerender the page. Show a message in `status` for save, load, missing data, and failures.

**Hint:** `localStorage` stores strings: use `JSON.stringify(...)` with `setItem(...)` to save, then `getItem(...)` and `JSON.parse(...)` to load. `getItem(...)` returns `null` if nothing was saved. Use `try`/`catch` for unreadable data, and validate a temporary parsed value before assigning it to `state`. `validDrawing()` calls the `validSize()` you wrote in c.

**Checkpoint:** Paint with two colors, Save, reload the same Live Server page, and Load. The drawing, dimensions, and selected color return; the timer is paused at `00:00`. Loading with no saved drawing shows a message without erasing the current grid.

## Requirements

- Change only `script.js`; use the supplied HTML, CSS, and validation helpers.
- Keep pixels in `state.pixels`, render the grid from that array with `map(...).join("")`, and paint through one listener on `gridContainer`.
- Accept only grid sizes from 1 to 30. A bad size must leave the drawing untouched.
- Run at most one timer interval. Pause and Reset must stop a running interval with `clearInterval`.
- Save one drawing with `localStorage`, without timer state. A missing or invalid snapshot must not replace the current drawing.
- The page should work without Console errors.
