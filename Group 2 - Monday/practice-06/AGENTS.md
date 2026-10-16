# Platformer: rules for the agent

This is a live classroom demo for first-year university students. They know
variables, functions, arrays, objects, the DOM and events. Canvas is new to
them. The code is read on a projector, so keep it simple and readable.

## Stack
- Vanilla JavaScript, HTML and CSS only. No libraries, frameworks or game
  engines (no Phaser, PixiJS, Kaboom), no npm, no bundler, no TypeScript.
- One index.html, one script.js loaded with a plain <script src="script.js">
  (no ES modules). Assets live in assets/.
- Do not download or install anything. All assets already exist in assets/;
  file names, frame sizes and tile indices are in assets/ASSETS.md.

## Code style
- Keep all game data in one `state` object.
- Logic goes in update(dt), rendering in draw(). The loop is gameLoop(),
  driven by requestAnimationFrame, with dt in milliseconds from
  performance.now(). Keep `if (dt > 100) return;` at the top of update.
- Speeds in px/ms, gravity in px/ms^2. Tunable numbers are UPPER_CASE
  constants at the top of script.js.
- The canvas is 960x540, set with HTML attributes. Never size it with CSS.
- Pixel art is drawn at 3x scale: 18x18 world tiles become 54x54 on screen,
  24x24 character and background frames become 72x72.
  Set ctx.imageSmoothingEnabled = false.
- Short functions with descriptive names and a one-line comment above each.
  Use const/let and for...of. No clever one-liners.

## Working style
- Make the smallest change that does what was asked. Don't add features
  nobody requested, and don't rewrite script.js from scratch.
- In your plan, list which functions you will add or change.
- After each change, explain the one or two key ideas in plain language a
  beginner can follow.
