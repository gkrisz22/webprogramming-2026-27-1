# Practice 4 — Hangman

Build a Hangman game from the supplied starter. Open `example.html` first: it shows one possible round after guessing `j`, `a`, `b`, and `d`. It is a static HTML preview, so its buttons do not play the game. Then open `index.html` and write your code below the existing constants and DOM selections in `script.js`. The game starts hidden. Keep the **Start new game** button visible so it can reset a round at any time.

Work through the checkpoints in order. After each one, run the page and check the visible result before continuing. The key pattern is **change JavaScript state, then render the page from that state**.

## Tasks

### a. Start a round

The starter already supplies the lowercase `alphabet`. Store the current word in `targetWord`, guesses in an array named `guessedLetters`, and whether the round has ended in `gameOver`.

Write `startGame()` and attach it to the Start button's `click` event. It should choose a random entry from `wordList`, clear the guesses, set `gameOver` to `false`, show `gameDiv`, and call `render()`.

**Hint:** An array index from `0` to `wordList.length - 1` is `Math.floor(Math.random() * wordList.length)`. Declare `render()` in the next step; a function declaration can appear later in the file.

**Checkpoint:** Clicking Start reveals the game. Clicking it again will eventually reset all guesses and the drawing once the next steps are complete.

### b. Render the word and alphabet

Write one `render()` function. Turn each character of `targetWord` into a `<td>`: show the letter if it is in `guessedLetters`, otherwise show `_`. Put the cells into `tr.innerHTML`.

Create 26 letter buttons in `buttonsDiv`. Buttons for guessed letters must be disabled. Keep `render()` as the one place that writes the word and buttons; later tasks will add the drawing and result there too.

**Hint:** `"cat".split("")` produces `['c', 'a', 't']`. Use `map(...)` to turn each letter into HTML and `join("")` to make one string. `guessedLetters.includes(letter)` answers whether it has been guessed. For a boolean HTML attribute, include `disabled` only when needed.

**Checkpoint:** Start shows one underscore per character and 26 enabled buttons in alphabetical order. There should be no commas between cells or buttons.

### c. Handle guesses with one listener

Attach one `click` listener to `buttonsDiv`. In `handleLetterClick(event)`, ignore clicks outside a button, clicks after `gameOver`, and a letter already in `guessedLetters`. Otherwise read the clicked button's lowercase text, add it to the array, and call `render()`.

**Hint:** `event.target` is the clicked element. `event.target.matches("button")` checks its tag. The listener stays on `buttonsDiv` even when `render()` replaces the buttons inside it.

**Checkpoint:** A correct guess reveals **every** occurrence of that letter. Its button becomes disabled. Other letter buttons still work after the page rerenders.

### d. Draw wrong guesses

Inside `render()`, derive `wrongGuesses` by counting entries of `guessedLetters` that do **not** occur in `targetWord`. Show the first `wrongGuesses` items of `visualElements` in `svg.innerHTML`. Do not store a separate wrong-guess counter.

**Hint:** `filter(...).length` counts matching array items. `visualElements.slice(0, wrongGuesses).join("")` turns the first drawing parts into SVG markup.

**Checkpoint:** A correct guess leaves the drawing unchanged. Each new wrong guess adds exactly one part. Starting a new round clears it.

### e. End the round

Still inside `render()`, determine whether **every** letter of `targetWord` occurs in `guessedLetters`. The player wins when this is true. The player loses when `wrongGuesses` reaches `visualElements.length` (nine). Set `gameOver` for either result, show a message in `resultDiv`, and disable **all** letter buttons after the round ends. On a loss, include the answer in the message. During play, the result message is empty.

**Hint:** `targetWord.split("").every((letter) => guessedLetters.includes(letter))` checks the win. Calculate the result **before** generating button HTML so the final click can disable all buttons in the same render.

**Checkpoint:** Play to a win, then start again and make nine wrong guesses. Neither finished round accepts another guess. Start clears the result and begins a fresh round.

## Requirements

- Change only `script.js`; use the supplied HTML and SVG pieces.
- Keep words and guesses lowercase so `includes` comparisons agree.
- Keep `targetWord` and `guessedLetters` as the game data. Derive the wrong-guess count when rendering.
- Use one `render()` function after starting and after every accepted guess.
- Use one delegated listener on `buttonsDiv`, not a listener on each generated button.
- The page must work without Console errors and support restart, win, and loss.
