# Assets

Kenney Pixel Platformer (CC0), packed sheets: frames sit next to each other with no gap. Draw everything at 3x with `ctx.imageSmoothingEnabled = false`.

| File | Frame | Grid | Image size | On screen |
| --- | --- | --- | --- | --- |
| `tilemap_packed.png` | 18x18 | 20 cols x 9 rows | 360x162 | 54x54 |
| `tilemap-characters_packed.png` | 24x24 | 9 cols x 3 rows | 216x72 | 72x72 |
| `tilemap-backgrounds_packed.png` | 24x24 | 8 cols x 3 rows | 192x72 | 72x72 |

Indices count left to right, top to bottom, from 0. For index `i` on a sheet with `cols` columns and frame size `size`: `sx = (i % cols) * size`, `sy = Math.floor(i / cols) * size`.

## Tiles (`tilemap_packed.png`)

| Index | What it is |
| --- | --- |
| 21, 22, 23 | Grass top: left end, middle, right end. Use on the top row of the ground. |
| 121, 122, 123 | Dirt: left edge, middle, right edge. Use under the grass. |
| 1, 2, 3 | One-tile-thick grass platform: left end, middle, right end. |
| 20, 120, 0 | One tile wide: grass top, dirt, floating block. |
| 4 | Plain dirt, no border. |
| 6 | Wooden crate. |
| 151 | Coin, front view. |
| 152 | Coin, side view (second frame for a spin). |
| 111, 112 | Red flag, two frames. Pole below it: 131. |
| 68 | Spikes. |
| 44, 46 | Heart full, heart empty. |
| 67 | Blue gem. |
| 107, 108 | Spring: down, up. |
| 160–169 | Digits 0–9. |

## Characters (`tilemap-characters_packed.png`)

All characters face left. Mirror them to face right.

| Index | What it is |
| --- | --- |
| 0, 1 | Player: green alien, idle and walk. |
| 18, 19 | Ground enemy: small blue crawler, two walk frames. 20 is the same enemy flattened. |
| 24, 25 | Flying enemy: bat, two wing frames. |
| 2/3, 4/5, 6/7, 9/10 | Other aliens (blue, pink, yellow, beige), idle and walk. |

The player's hitbox is 36x48 inside a 72x72 frame. To stand the sprite on the hitbox, draw it at `x - 18`, `y - 24`.

## Backgrounds (`tilemap-backgrounds_packed.png`)

| Index | What it is |
| --- | --- |
| 0 | Sky. Repeat across the top. |
| 8, 9, 10, 11 | Cloud horizon. These four join seamlessly in this order and loop back from 11 to 8. |
| 16 | Lower sky. Repeat below the horizon. |

Columns 4–5 are the same layout as a desert, columns 6–7 as a forest.
