---
layout: post
title: "Prelude of the Chambered Reborn: Rewriting a Classic in TypeScript"
subtitle: "Bringing Notch's Ludum Dare game to the modern web with Vite and software rendering"
description: "How I ported Markus Persson's (Notch) cult classic from Java to TypeScript/Vite to make it playable in any web browser, without WebGL."
thumbnail-img: "/assets/img/prelude-of-chambered.webp"
cover-img: "/assets/img/prelude-of-chambered.webp"
tags: [Développement, Web, Tech]
author: "Angelo Lima"
lang: en
ref: prelude-of-the-chambered-reborn
categories: en
---

In 2011, **Markus Persson** (Notch), the creator of Minecraft, participated in **Ludum Dare 21** with a small retro dungeon-crawler: **Prelude of the Chambered**. A raycasting engine à la Wolfenstein 3D, pixelated graphics, puzzles and bosses. A technical gem compressed into 48 hours of game jam.

The problem? It was **Java**. And in 2025, who still launches a JVM to play a small indie game?

## The Project: Porting Java to TypeScript

**Prelude of the Chambered Reborn** is my complete rewrite of the original code in **TypeScript**, built with **Vite**, playable directly in the browser. No plugins, no downloads, just a URL.

👉 **[Play now](https://lingelo.github.io/prelude-of-the-chambered-reborn/)**

### Why This Project?

Three reasons:

1. **Nostalgia**: I discovered this game back then and always wanted to revisit it
2. **Technical challenge**: Translating object-oriented Java to modern TypeScript without losing the essence of the original code
3. **Accessibility**: Making this piece of indie gaming history accessible to everyone, on any device

## Technical Architecture

### Pure Software Rendering

The most important choice: **no WebGL**. The game exclusively uses the **Canvas 2D API** with software raycasting, exactly like the original.

```typescript
// Pixel by pixel rendering on Canvas
class Bitmap {
  pixels: number[];
  width: number;
  height: number;

  draw(bitmap: Bitmap, x: number, y: number): void {
    // Direct pixel copy, no GPU
  }
}
```

This approach guarantees maximum compatibility: the game runs on any browser, even older ones.

### Modular Organization

The code is split into specialized modules:

```
src/
├── rendering/     # Bitmap, Bitmap3D, Screen, Sprite
├── entities/      # Player, EnemyEntity, bosses
├── levels/        # Level base, blocks, 6 levels
├── menus/         # TitleMenu, WinMenu, GameOverMenu
└── core/          # Game loop, input handling
```

Each module is independent and testable. The structure allows for easy understanding and modification of any part of the game.

### Modern Stack

- **TypeScript**: Strict typing to avoid runtime bugs
- **Vite**: Ultra-fast build with HMR for development
- **GitHub Actions**: Automatic deployment on every push
- **Canvas API**: Software rendering without WebGL dependency

### The Bitmap Map System: Notch's Brilliant Idea

One of the most elegant architectures from the original game, which I preserved, is the **bitmap-based level design system**. Each level is literally a **PNG image** where every pixel defines a game element.

```typescript
// Loading level from an image
const response = await fetch(`res/level/${name}.png`);
const pixels = getPixelsFromImage(image);

// Each color = a block type
switch (color) {
  case 0xffffff: return new SolidBlock();  // White = wall
  case 0x0000ff: return new WaterBlock();  // Blue = water
  case 0xff66ff: return new LadderBlock(); // Magenta = ladder
  case 0xffff64: return new ChestBlock();  // Yellow = chest
}
```

**Why is this brilliant?**

1. **Visual level design**: Open Paint, draw some pixels, you have a playable level
2. **No proprietary format**: A standard PNG, editable by any tool
3. **Version control friendly**: Git diffs show changes visually
4. **Trivial extensibility**: Adding a new block type = a new color

The system goes further with the **alpha channel** to encode mechanism IDs:

```typescript
// Alpha encodes the ID to link switches and doors
const id = 255 - ((pixels[x + y * w] >>> 24) & 0xff);
// A switch with alpha=250 triggers the door with alpha=250
```

And entities? Same principle:

| Color | Entity |
|-------|--------|
| `#ff0000` (red) | Bat |
| `#ff0001` | Bat Boss |
| `#ff0002` | Ogre |
| `#ff0003` | Ogre Boss |
| `#ffff00` (bright yellow) | Player spawn |

This "data-driven" approach allows anyone to create levels without touching the code. A game designer can iterate by just modifying images.

## The Game in Detail

### Six Interconnected Levels

1. **Prison**: The starting point, implicit tutorial
2. **Dungeons**: First enemies and mechanics
3. **Overworld**: Open area with exploration
4. **Crypt**: Dark atmosphere, new challenges
5. **Temple**: More complex puzzles
6. **Ice Cave**: The final level

### Combat System

Various enemies with their patterns:
- **Bats**: Fast but fragile
- **Ogres**: Slow but powerful
- **Eyes**: Ranged attacks
- **Ghosts**: Go through walls

Plus boss variants for each type.

### Collectibles and Progression

- **Power Glove**: Break blocks
- **Pistol**: Ranged combat
- **Flippers**: Swimming
- **Cutters**: Cut obstacles
- **Skates**: Slide on ice
- **Potions**: Healing

The goal: collect the **four keys** to escape.

## Conversion Challenges

### Type Management

Java and TypeScript have different type systems. Java classes with complex inheritance required refactoring:

```typescript
// Entity pattern with composition
abstract class Entity {
  x: number;
  y: number;
  level: Level;

  abstract tick(): void;
  abstract render(screen: Screen): void;
}
```

### Game Loop

Moving from Java's `Thread.sleep()` to `requestAnimationFrame` required rethinking the timing:

```typescript
class Game {
  private lastTime = 0;

  gameLoop(currentTime: number): void {
    const deltaTime = currentTime - this.lastTime;
    this.update(deltaTime);
    this.render();
    this.lastTime = currentTime;
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}
```

### Input Handling

From Java AWT to native DOM events, with keyboard and planned gamepad support.

## Contributing

The project is **open source** and contributions are welcome:

- 🐛 **Bug fixes**: Behaviors different from the original
- 🎨 **Assets**: Sprite optimization
- 📱 **Mobile**: Touch support
- 🎮 **Gamepad**: Controller support

```bash
# Local installation
git clone https://github.com/Lingelo/prelude-of-the-chambered-reborn
cd prelude-of-the-chambered-reborn
npm install
npm run dev
```

The development server starts at `http://localhost:5173`.

## Conclusion

**Prelude of the Chambered Reborn** is more than a nostalgia exercise. It's a demonstration that "old school" rendering techniques remain relevant and that TypeScript can handle performance-oriented code.

The project also proves that with modern tools (Vite, GitHub Actions), deploying a web game becomes trivial. A simple `git push` command and the game is online.

If you grew up with Notch's games or are curious to see how a raycasting engine works, **[try the game](https://lingelo.github.io/prelude-of-the-chambered-reborn/)**. And if you find bugs or have improvement ideas, the [GitHub repo](https://github.com/Lingelo/prelude-of-the-chambered-reborn) awaits.

---

*Original Prelude of the Chambered: Copyright (c) 2011 Mojang. This rewrite is an educational and preservation project.*
