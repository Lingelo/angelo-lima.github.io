---
layout: post
title: "Case Study: Prelude of the Chambered Reborn"
subtitle: "Day 20 - A complete project with Claude Code"
description: "Complete case study: how I used Claude Code to recreate Notch's game Prelude of the Chambered, from first commit to deployment."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-20
categories: en
---

To conclude this series, what better than a concrete case study? Here's how I used Claude Code to recreate **Prelude of the Chambered**, Notch's game (Minecraft creator), with a modern stack.

> To discover the project in detail, read my dedicated article: [Prelude of the Chambered Reborn: Renaissance of a Notch classic](/en/prelude-of-the-chambered-reborn-typescript-web-port/)

> Also see my other retro game project in TypeScript: [GBTS - A GameBoy Emulator](/en/gbts-typescript-gameboy-development/)

## The Project

### Context

**Prelude of the Chambered** is a dungeon crawler created by Notch in 48h during a game jam in 2011. The original code is in Java, with a homemade raycasting rendering engine.

### Objective

Recreate the game with:
- TypeScript
- Three.js for 3D rendering
- Modern architecture (ES6 modules)
- Automated tests
- Complete documentation

## Phase 1: Exploration (Days 1-2)

### Analyzing the original code

```
claude

> @java-src/**/*.java Analyze the original game architecture.
> Identify the main components and their responsibilities.
```

Claude identified:
- **Art.java**: Texture and sprite management
- **Game.java**: Main game loop
- **Level.java**: Level structure
- **Entity.java**: Entity system (player, enemies)
- **Screen.java**: Raycasting rendering

### Planning the migration

```
> ultrathink. Propose a modern TypeScript architecture
> to recreate this game with Three.js
```

Claude proposed:
```
src/
├── core/
│   ├── Game.ts         # Game loop
│   ├── Renderer.ts     # Three.js wrapper
│   └── Input.ts        # Controls management
├── world/
│   ├── Level.ts        # Level structure
│   ├── Tile.ts         # Tile types
│   └── Loader.ts       # Level loading
├── entities/
│   ├── Entity.ts       # Base class
│   ├── Player.ts       # Player
│   └── enemies/        # Different enemies
├── graphics/
│   ├── TextureManager.ts
│   └── SpriteSheet.ts
└── utils/
    └── Math.ts
```

## Phase 2: Setup (Day 3)

### Initialize the project

```
> Initialize a TypeScript project with Vite, Three.js,
> and configure ESLint + Prettier according to conventions.
```

Claude created:
- `package.json` with dependencies
- `tsconfig.json` configured for strict mode
- `vite.config.ts` with necessary plugins
- `.eslintrc.js` and `.prettierrc`

### Project CLAUDE.md

```
> Create a CLAUDE.md that documents the architecture and conventions.
```

```markdown
# CLAUDE.md - Prelude Reborn

## Architecture
This project is a remake of Prelude of the Chambered with Three.js.

## Conventions
- Strict TypeScript
- ES6 modules components
- Tests with Vitest
- Naming: PascalCase classes, camelCase functions

## Key files
- src/core/Game.ts: Main entry point
- src/world/Level.ts: Level management
- src/entities/Player.ts: Player logic
```

## Phase 3: Core Engine (Days 4-7)

### Rendering system

```
> Implement the Renderer.ts that wraps Three.js
> to display a first-person dungeon crawler style scene.
```

Claude created:
- Perspective camera with FPS controls
- Grid system for walls
- Texture management with Three.js TextureLoader

### Game loop

```
> Implement the game loop with:
> - Update at 60 FPS
> - Delta time for physics
> - States (menu, playing, paused)
```

### Level loading

```
> Analyze @java-src/Level.java and @java-src/Art.java
> to understand the level format.
> Then implement compatible Level.ts.
```

Claude:
1. Analyzed the original bitmap level format
2. Created a parser for PNG files
3. Implemented 3D geometry generation

## Phase 4: Gameplay (Days 8-12)

### Entity system

```
> Implement the entity system inspired by @java-src/Entity.java
> with:
> - Entity base class
> - Collision detection
> - Update/Render cycle
```

### Player and controls

```
> Implement Player.ts with:
> - WASD movement
> - Mouse rotation
> - E interaction
> - Health and damage
```

### Enemies

```
> Analyze enemies in @java-src/entities/
> and implement them progressively.
> Start with the simplest one.
```

Claude proceeded methodically:
1. **Bat**: Random movement
2. **Ghost**: Player pursuit
3. **Ogre**: Patrol + attack
4. **Boss**: Pattern combination

### Combat

```
> Implement the combat system:
> - Player attack (left click)
> - Damage to enemies
> - Damage to player
> - Visual effects (red flash)
```

## Phase 5: Polish (Days 13-16)

### Audio

```
> Add the audio system with Web Audio API:
> - Background music
> - Sound effects
> - Volume control
```

### UI

```
> Implement the user interface:
> - Health bar
> - Inventory
> - On-screen messages
> - Pause menu
```

### Optimization

```
> Profile the rendering and optimize:
> - Frustum culling
> - LOD for distant entities
> - Texture atlasing
```

## Phase 6: Testing and deployment (Days 17-20)

### Automated tests

```
> Generate Vitest tests for:
> - Level loading
> - Collision detection
> - Entity behavior
> - Game state management
```

Claude generated tests covering:
- Correct level loading
- Wall collision detection
- Enemy behavior
- Game state transitions

### CI/CD

```
> Configure GitHub Actions for:
> - Lint + Type check
> - Tests
> - Build
> - Deploy to GitHub Pages
```

### Documentation

```
> Generate project documentation:
> - Complete README
> - JSDoc for main classes
> - Contribution guide
```

## Results

### Project metrics

| Metric | Value |
|--------|-------|
| Lines of code | ~5,000 |
| TypeScript files | 45 |
| Test coverage | 78% |
| Total time | ~20 days |
| Claude Code cost | ~$120 |

### What Claude did automatically

- ✅ Analysis of original Java code
- ✅ Architecture proposal
- ✅ Project scaffolding
- ✅ Core systems implementation
- ✅ Java → TypeScript algorithm conversion
- ✅ Test generation
- ✅ CI/CD configuration
- ✅ Documentation

### What I did manually

- 🎨 Artistic choices (colors, textures)
- 🔧 Gameplay fine-tuning (speed, damage)
- 🐛 Debugging certain edge cases
- ✍️ Code review and validation

## Lessons Learned

### What worked well

1. **Detailed CLAUDE.md**: The richer the context, the better the responses
2. **EPCT Workflow**: Explore → Plan → Code → Test for each feature
3. **Precise @ references**: `@java-src/Entity.java` rather than "the Entity file"
4. **ultrathink for design**: Solid architecture from the start

### What needed adjustments

1. **Three.js specific**: Claude knows Three.js but not all subtleties
2. **Performance**: First implementations weren't optimized
3. **Edge cases**: Edge cases required specific prompts

### Tips for your projects

1. **Start with context**: A good CLAUDE.md makes all the difference
2. **Iterate in small steps**: Feature by feature, not all at once
3. **Use ultrathink**: For design and complex problems
4. **Test often**: Claude can generate tests, use them
5. **Commit regularly**: Git checkpoints are your safety net

## Series Conclusion

In 20 days, we covered:

1. **Installation and first steps**
2. **Secret syntax #@/!**
3. **EPCT Workflow**
4. **Prompt engineering**
5. **Context management**
6. **Git workflows**
7. **Permissions and security**
8. **Custom slash commands**
9. **Subagents**
10. **Skills**
11. **Plugins and marketplace**
12. **Hooks**
13. **MCP**
14. **IDE integration**
15. **CI/CD headless**
16. **Billing and costs**
17. **Troubleshooting**
18. **Status line and terminal**
19. **Tool comparison**
20. **This case study**

Claude Code is a powerful tool that, when used well, transforms how we develop. It's not a developer replacement, but a **productivity multiplier**.

Now it's your turn!

---

*Thank you for following this "Master Claude Code in 20 Days" series. [Discover the Prelude Reborn project](/en/prelude-of-the-chambered-reborn/)*
