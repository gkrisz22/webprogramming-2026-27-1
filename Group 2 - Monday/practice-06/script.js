const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// Physics and movement constants
const TILE_SIZE = 54;
const PLAYER_SPEED = 0.35; // px/ms
const JUMP_SPEED = 0.65;   // px/ms
const GRAVITY = 0.0018;    // px/ms^2
const WALK_FRAME_TIME = 150; // ms per walk frame

// Level map: '#' = solid tile, '.' = empty space, 'P' = player start (~3 screens wide)
const level = [
    "######################################################",
    "#....................................................#",
    "#......####..................####....................#",
    "#...................###...................####.......#",
    "#...........##.............##......##................#",
    "#.................................................##.#",
    "#......####........#####..............####...........#",
    "#................##.....##..........##.....##........#",
    "#P.###.........###.......###......###.......###......#",
    "######################################################",
];

// Active keys tracking
const keys = {};

// Find the player starting position from the level grid
function findPlayerStart() {
    for (let row = 0; row < level.length; row++) {
        for (let col = 0; col < level[row].length; col++) {
            if (level[row][col] === "P") {
                return {
                    x: col * TILE_SIZE + (TILE_SIZE - 36) / 2,
                    y: (row + 1) * TILE_SIZE - 48,
                };
            }
        }
    }
    return { x: 100, y: 100 };
}

// Single state object holding all game data
const startPos = findPlayerStart();
const state = {
    player: {
        x: startPos.x,
        y: startPos.y,
        w: 36,
        h: 48,
        vx: 0,
        vy: 0,
        onGround: true,
        facing: "left",
        frame: 0,
        animTimer: 0,
    },
    camera: {
        x: 0,
    },
};

// Check if a tile coordinate is solid ground
function isSolid(col, row) {
    if (row < 0 || row >= level.length || col < 0 || col >= level[row].length) {
        return false;
    }
    return level[row][col] === "#";
}

// Choose the tile sprite index based on neighboring solid tiles
function getTileIndex(col, row) {
    if (row === 0) {
        return 4; // Plain dirt for ceiling
    }

    const hasAbove = isSolid(col, row - 1);
    const hasLeft = isSolid(col - 1, row);
    const hasRight = isSolid(col + 1, row);

    if (!hasAbove) {
        if (!hasLeft && !hasRight) return 20;
        if (!hasLeft) return 21; // Grass top left
        if (!hasRight) return 23; // Grass top right
        return 22; // Grass top middle
    }
    if (!hasLeft) return 121; // Dirt left edge
    if (!hasRight) return 123; // Dirt right edge
    return 122; // Dirt middle
}

// Draw a tile from tilemap_packed.png using its index
function drawTile(index, x, y) {
    const cols = 20;
    const size = 18;
    const sx = (index % cols) * size;
    const sy = Math.floor(index / cols) * size;
    ctx.drawImage(tileSheet, sx, sy, size, size, x, y, TILE_SIZE, TILE_SIZE);
}

// Draw the player sprite at 3x scale, flipped when moving right
function drawPlayer() {
    const charCols = 9;
    const charSize = 24;
    const spriteSize = 72; // 24 * 3
    const sx = (state.player.frame % charCols) * charSize;
    const sy = Math.floor(state.player.frame / charCols) * charSize;
    const drawX = state.player.x - 18;
    const drawY = state.player.y - 24;

    ctx.save();
    if (state.player.facing === "right") {
        ctx.translate(drawX + spriteSize, drawY);
        ctx.scale(-1, 1);
        ctx.drawImage(characterSheet, sx, sy, charSize, charSize, 0, 0, spriteSize, spriteSize);
    } else {
        ctx.drawImage(characterSheet, sx, sy, charSize, charSize, drawX, drawY, spriteSize, spriteSize);
    }
    ctx.restore();
}

// Track key presses and releases
window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// Update game physics, movement, and camera
function update(dt) {
    if (dt > 100) {
        return;
    }

    // Horizontal movement based on arrow keys
    state.player.vx = 0;
    if (keys["ArrowLeft"]) {
        state.player.vx -= PLAYER_SPEED;
    }
    if (keys["ArrowRight"]) {
        state.player.vx += PLAYER_SPEED;
    }
    state.player.x += state.player.vx * dt;

    // Update facing direction
    if (state.player.vx > 0) {
        state.player.facing = "right";
    } else if (state.player.vx < 0) {
        state.player.facing = "left";
    }

    // Resolve horizontal tile collisions
    let startCol = Math.floor(state.player.x / TILE_SIZE);
    let endCol = Math.floor((state.player.x + state.player.w - 1) / TILE_SIZE);
    let startRow = Math.floor(state.player.y / TILE_SIZE);
    let endRow = Math.floor((state.player.y + state.player.h - 1) / TILE_SIZE);

    for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
            if (isSolid(col, row)) {
                if (state.player.vx > 0) {
                    state.player.x = col * TILE_SIZE - state.player.w;
                } else if (state.player.vx < 0) {
                    state.player.x = (col + 1) * TILE_SIZE;
                }
                state.player.vx = 0;
            }
        }
    }

    // Jump when on the ground
    if ((keys["ArrowUp"] || keys[" "]) && state.player.onGround) {
        state.player.vy = -JUMP_SPEED;
        state.player.onGround = false;
    }

    // Vertical movement with gravity
    state.player.vy += GRAVITY * dt;
    state.player.y += state.player.vy * dt;
    state.player.onGround = false;

    // Resolve vertical tile collisions
    startCol = Math.floor(state.player.x / TILE_SIZE);
    endCol = Math.floor((state.player.x + state.player.w - 1) / TILE_SIZE);
    startRow = Math.floor(state.player.y / TILE_SIZE);
    endRow = Math.floor((state.player.y + state.player.h - 1) / TILE_SIZE);

    for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
            if (isSolid(col, row)) {
                if (state.player.vy > 0) {
                    state.player.y = row * TILE_SIZE - state.player.h;
                    state.player.vy = 0;
                    state.player.onGround = true;
                } else if (state.player.vy < 0) {
                    state.player.y = (row + 1) * TILE_SIZE;
                    state.player.vy = 0;
                }
            }
        }
    }

    // Animate walk cycle while moving on the ground
    const isMovingHorizontally = keys["ArrowLeft"] || keys["ArrowRight"];
    if (isMovingHorizontally && state.player.onGround) {
        state.player.animTimer += dt;
        if (state.player.animTimer >= WALK_FRAME_TIME) {
            state.player.animTimer -= WALK_FRAME_TIME;
            state.player.frame = state.player.frame === 0 ? 1 : 0;
        }
    } else {
        state.player.animTimer = 0;
        state.player.frame = 0;
    }

    // Update camera to follow player horizontally, clamped to level bounds
    const levelWidth = level[0].length * TILE_SIZE;
    const targetCameraX = state.player.x + state.player.w / 2 - canvas.width / 2;
    state.camera.x = Math.max(0, Math.min(targetCameraX, levelWidth - canvas.width));
}

// Visualize the game state
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-Math.round(state.camera.x), 0);

    // Only draw tiles that are currently visible on screen
    const startCol = Math.max(0, Math.floor(state.camera.x / TILE_SIZE));
    const endCol = Math.min(level[0].length - 1, Math.floor((state.camera.x + canvas.width) / TILE_SIZE));

    for (let row = 0; row < level.length; row++) {
        for (let col = startCol; col <= endCol; col++) {
            if (level[row][col] === "#") {
                const tileIndex = getTileIndex(col, row);
                drawTile(tileIndex, col * TILE_SIZE, row * TILE_SIZE);
            }
        }
    }

    // Draw the player sprite
    drawPlayer();

    ctx.restore();
}

// Main game loop
let last = performance.now();
function gameLoop() {
    const now = performance.now();
    const dt = now - last;
    last = now;

    update(dt);
    draw();

    requestAnimationFrame(gameLoop);
}

// Load sprite assets before starting game loop
let loadedImages = 0;
const totalImages = 2;

function onImageLoad() {
    loadedImages++;
    if (loadedImages === totalImages) {
        last = performance.now();
        requestAnimationFrame(gameLoop);
    }
}

const tileSheet = new Image();
tileSheet.onload = onImageLoad;
tileSheet.src = "assets/tilemap_packed.png";

const characterSheet = new Image();
characterSheet.onload = onImageLoad;
characterSheet.src = "assets/tilemap-characters_packed.png";