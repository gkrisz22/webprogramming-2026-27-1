const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

// Tunable physics and display constants
const SCALE = 3;
const TILE_FRAME_SIZE = 18;
const TILE_SHEET_COLS = 20;
const TILE_SIZE = TILE_FRAME_SIZE * SCALE; // 54 px

const CHAR_FRAME_SIZE = 24;
const CHAR_SHEET_COLS = 9;
const CHAR_SIZE = CHAR_FRAME_SIZE * SCALE; // 72 px

const PLAYER_WIDTH = 36;
const PLAYER_HEIGHT = 48;
const PLAYER_SPEED = 0.3; // px/ms
const JUMP_SPEED = -0.65; // px/ms
const GRAVITY = 0.0015; // px/ms^2
const WALK_FRAME_DURATION = 150; // ms per frame

// Preload spritesheet images
const images = {
    tiles: new Image(),
    characters: new Image()
};

let loadedImagesCount = 0;
const TOTAL_IMAGES = 2;

// Level map: 54 tiles wide (~3 screens of 960 px) x 10 tiles high
// '#' = solid ground, '.' = empty space, 'P' = player start
const level = [
    "......................................................",
    "...P..................................................",
    "...###...........................####.................",
    "...............................##.....................",
    ".....####.............####...##..........######.......",
    "......................................................",
    "........###.......####............................###.",
    ".........#.....###......................##.......#....",
    "######################################################",
    "######################################################"
];

// Find player start position from 'P' in the level
function getPlayerStart() {
    for (let r = 0; r < level.length; r++) {
        for (let c = 0; c < level[r].length; c++) {
            if (level[r][c] === "P") {
                return {
                    x: c * TILE_SIZE + (TILE_SIZE - PLAYER_WIDTH) / 2,
                    y: (r + 1) * TILE_SIZE - PLAYER_HEIGHT
                };
            }
        }
    }
    return { x: 100, y: 100 };
}

const startPos = getPlayerStart();

// All game state in one object
const state = {
    player: {
        x: startPos.x,
        y: startPos.y,
        vx: 0,
        vy: 0,
        onGround: true,
        facing: "left",
        animTimer: 0
    },
    camera: {
        x: 0
    },
    keys: {}
};

// Track pressed keys
window.addEventListener("keydown", (e) => {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
    }
    state.keys[e.code] = true;
});

// Track released keys
window.addEventListener("keyup", (e) => {
    state.keys[e.code] = false;
});

// Check if a tile at (col, row) is solid
function isSolid(col, row) {
    if (row < 0 || row >= level.length || col < 0 || col >= level[row].length) {
        return false;
    }
    return level[row][col] === "#";
}

// Select tile sheet index based on surrounding neighbor tiles
function getTileIndex(c, r) {
    const above = isSolid(c, r - 1);
    const below = isSolid(c, r + 1);
    const left = isSolid(c - 1, r);
    const right = isSolid(c + 1, r);

    // One-tile-thick floating platform
    if (!above && !below) {
        if (!left && !right) return 0;
        if (!left) return 1;
        if (!right) return 3;
        return 2;
    }

    // Top surface of ground
    if (!above) {
        if (!left && !right) return 20;
        if (!left) return 21;
        if (!right) return 23;
        return 22;
    }

    // Dirt underground
    if (!left && !right) return 120;
    if (!left) return 121;
    if (!right) return 123;
    return 122;
}

// Move horizontally and resolve wall collisions
function movePlayerX(dt) {
    state.player.x += state.player.vx * dt;

    const startRow = Math.floor(state.player.y / TILE_SIZE);
    const endRow = Math.floor((state.player.y + PLAYER_HEIGHT - 0.001) / TILE_SIZE);

    if (state.player.vx > 0) {
        // Moving right: check the column where player's right edge is
        const rightCol = Math.floor((state.player.x + PLAYER_WIDTH - 0.001) / TILE_SIZE);
        for (let r = startRow; r <= endRow; r++) {
            if (isSolid(rightCol, r)) {
                state.player.x = rightCol * TILE_SIZE - PLAYER_WIDTH;
                state.player.vx = 0;
                break;
            }
        }
    } else if (state.player.vx < 0) {
        // Moving left: check the column where player's left edge is
        const leftCol = Math.floor(state.player.x / TILE_SIZE);
        for (let r = startRow; r <= endRow; r++) {
            if (isSolid(leftCol, r)) {
                state.player.x = (leftCol + 1) * TILE_SIZE;
                state.player.vx = 0;
                break;
            }
        }
    }

    // Keep player inside level horizontal borders
    const levelWidth = level[0].length * TILE_SIZE;
    if (state.player.x < 0) {
        state.player.x = 0;
    }
    if (state.player.x + PLAYER_WIDTH > levelWidth) {
        state.player.x = levelWidth - PLAYER_WIDTH;
    }
}

// Move vertically and resolve floor/ceiling collisions
function movePlayerY(dt) {
    state.player.y += state.player.vy * dt;

    const startCol = Math.floor(state.player.x / TILE_SIZE);
    const endCol = Math.floor((state.player.x + PLAYER_WIDTH - 0.001) / TILE_SIZE);

    state.player.onGround = false;

    if (state.player.vy > 0) {
        // Moving down (falling): check the row where player's feet are
        const bottomRow = Math.floor((state.player.y + PLAYER_HEIGHT - 0.001) / TILE_SIZE);
        for (let c = startCol; c <= endCol; c++) {
            if (isSolid(c, bottomRow)) {
                state.player.y = bottomRow * TILE_SIZE - PLAYER_HEIGHT;
                state.player.vy = 0;
                state.player.onGround = true;
                break;
            }
        }
    } else if (state.player.vy < 0) {
        // Moving up (jumping): check the row where player's head is
        const topRow = Math.floor(state.player.y / TILE_SIZE);
        for (let c = startCol; c <= endCol; c++) {
            if (isSolid(c, topRow)) {
                state.player.y = (topRow + 1) * TILE_SIZE;
                state.player.vy = 0;
                break;
            }
        }
    }
}

// Center camera horizontally on the player and clamp to level edges
function updateCamera() {
    const levelWidth = level[0].length * TILE_SIZE;
    const targetX = state.player.x + PLAYER_WIDTH / 2 - canvas.width / 2;
    const maxX = Math.max(0, levelWidth - canvas.width);
    state.camera.x = Math.max(0, Math.min(targetX, maxX));
}

// Update game physics, camera, animation timer, and positions
function update(dt) {
    if (dt > 100) {
        return;
    }

    // Horizontal movement and facing direction
    state.player.vx = 0;
    if (state.keys["ArrowLeft"]) {
        state.player.vx -= PLAYER_SPEED;
        state.player.facing = "left";
    }
    if (state.keys["ArrowRight"]) {
        state.player.vx += PLAYER_SPEED;
        state.player.facing = "right";
    }

    // Move horizontally and resolve wall collisions
    movePlayerX(dt);

    // Jump only if standing on solid ground
    if (state.player.onGround && (state.keys["ArrowUp"] || state.keys["Space"])) {
        state.player.vy = JUMP_SPEED;
        state.player.onGround = false;
    }

    // Apply gravity
    state.player.vy += GRAVITY * dt;

    // Move vertically and resolve floor/ceiling collisions
    movePlayerY(dt);

    // Update camera to follow player horizontally
    updateCamera();

    // Update walk animation timer while moving on the ground
    if (state.player.vx !== 0 && state.player.onGround) {
        state.player.animTimer += dt;
    } else {
        state.player.animTimer = 0;
    }
}

// Draw a single tile from tilemap_packed.png using 9-argument drawImage
function drawTile(tileIndex, col, row) {
    const sx = (tileIndex % TILE_SHEET_COLS) * TILE_FRAME_SIZE;
    const sy = Math.floor(tileIndex / TILE_SHEET_COLS) * TILE_FRAME_SIZE;
    ctx.drawImage(
        images.tiles,
        sx, sy, TILE_FRAME_SIZE, TILE_FRAME_SIZE,
        col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE
    );
}

// Draw the player character sprite with walk cycle and horizontal flip
function drawPlayer() {
    // Determine walk frame (0 = idle, 1 = step)
    let frameIndex = 0;
    if (state.player.vx !== 0 && state.player.onGround) {
        frameIndex = Math.floor(state.player.animTimer / WALK_FRAME_DURATION) % 2;
    }

    const sx = (frameIndex % CHAR_SHEET_COLS) * CHAR_FRAME_SIZE;
    const sy = Math.floor(frameIndex / CHAR_SHEET_COLS) * CHAR_FRAME_SIZE;

    // Sprite is 72x72, drawn at x - 18, y - 24 to center on 36x48 hitbox
    const drawX = Math.round(state.player.x - 18);
    const drawY = Math.round(state.player.y - 24);

    if (state.player.facing === "right") {
        ctx.save();
        ctx.translate(drawX + CHAR_SIZE, drawY);
        ctx.scale(-1, 1);
        ctx.drawImage(
            images.characters,
            sx, sy, CHAR_FRAME_SIZE, CHAR_FRAME_SIZE,
            0, 0, CHAR_SIZE, CHAR_SIZE
        );
        ctx.restore();
    } else {
        ctx.drawImage(
            images.characters,
            sx, sy, CHAR_FRAME_SIZE, CHAR_FRAME_SIZE,
            drawX, drawY, CHAR_SIZE, CHAR_SIZE
        );
    }
}

// Render game visuals
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-Math.round(state.camera.x), 0);

    // Determine which tile columns are visible on screen
    const startCol = Math.max(0, Math.floor(state.camera.x / TILE_SIZE));
    const endCol = Math.min(
        level[0].length - 1,
        Math.floor((state.camera.x + canvas.width) / TILE_SIZE)
    );

    // Only draw tiles that are currently on screen
    for (let r = 0; r < level.length; r++) {
        for (let c = startCol; c <= endCol; c++) {
            if (level[r][c] === "#") {
                const tileIndex = getTileIndex(c, r);
                drawTile(tileIndex, c, r);
            }
        }
    }

    // Draw the animated player sprite
    drawPlayer();

    ctx.restore();
}

let last = performance.now();
function gameLoop() {
    const now = performance.now();
    const dt = now - last;
    last = now;

    update(dt);
    draw();

    requestAnimationFrame(gameLoop);
}

// Start game loop only after all sprite images have finished loading
function handleImageLoad() {
    loadedImagesCount++;
    if (loadedImagesCount === TOTAL_IMAGES) {
        last = performance.now();
        requestAnimationFrame(gameLoop);
    }
}

images.tiles.onload = handleImageLoad;
images.characters.onload = handleImageLoad;

images.tiles.src = "assets/tilemap_packed.png";
images.characters.src = "assets/tilemap-characters_packed.png";

/*
[1] - List things
[2] - Add some things

while(true) {
    
    if(you wrote exit) {
        exit(0);
    }
}
*/