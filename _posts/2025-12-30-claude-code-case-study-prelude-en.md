---
layout: post
title: "Case Study: Prelude of the Chambered Reborn"
subtitle: "Day 20 - How I converted a Java game to TypeScript in one evening"
description: "Real experience report: how I used Claude Code to convert Notch's game Prelude of the Chambered (Java) to TypeScript in a single evening."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-20
categories: en
---

To conclude this series, what better than a concrete experience report? Here's how I used Claude Code to convert **Prelude of the Chambered**, Notch's game (Minecraft creator), from Java to TypeScript — **in a single evening**.

> To discover the project in detail, read my dedicated article: [Prelude of the Chambered Reborn: Renaissance of a Notch classic](/en/prelude-of-the-chambered-reborn-typescript-web-port/)

> Also see my other retro game project in TypeScript: [GBTS - A GameBoy Emulator](/en/gbts-typescript-gameboy-development/)

## The Challenge

### The Original Project

**Prelude of the Chambered** is a dungeon crawler created by Notch in 48h during Ludum Dare 21 in 2011. The original code is in Java, with a homemade **software raycasting** rendering engine — about 5,000 lines of Java code spread across forty files.

### My Goal

Port the game to the modern web with:
- TypeScript instead of Java
- Canvas 2D API (software rendering, like the original)
- Vite for building
- Deployable on any browser

The challenge: preserve the original raycasting engine and its pixel-by-pixel rendering, without using WebGL or a 3D library.

**Without Claude Code**, I would have estimated this project at several weeks of work. With Claude Code, I started one evening after dinner thinking "let's see how far we get".

## One Evening, One Complete Game

### Exploring the Java Code

```
claude

> @java-src/**/*.java Analyze the original game architecture.
> Identify the main components and their responsibilities.
```

In seconds, Claude mapped out the entire project:
- **Art.java**: Texture and sprite management
- **Game.java**: Main game loop
- **Level.java**: Level loading via PNG images
- **Screen.java**: Software raycasting engine
- **Entity.java**: Entity system

### Converting the Rendering Engine

The heart of the project: adapting the Java raycasting engine to TypeScript/Canvas 2D.

```
> Analyze @java-src/Screen.java and @java-src/Bitmap.java
> Implement the equivalent in TypeScript with Canvas 2D API.
> Preserve the pixel-by-pixel software rendering.
```

Claude:
1. Understood Notch's bitmap rendering system
2. Adapted raycasting calculations for TypeScript
3. Created a Bitmap class compatible with Canvas 2D
4. Preserved software rendering without GPU

### The Bitmap Level System

Notch's brilliant architecture: each level is a PNG image where every pixel color defines a game element.

```
> Analyze how Level.java loads levels from images.
> Implement the same logic in TypeScript.
```

Claude perfectly reproduced the system:
- White = wall
- Blue = water
- Magenta = ladder
- Red = enemies (with variations based on shade)
- Alpha channel = IDs to link switches and doors

### Entities and Gameplay

```
> Analyze enemies in @java-src/entities/
> and implement them in TypeScript with the same behavior.
```

Claude methodically converted each enemy:
- **Bat**: Random movement
- **Ogre**: Patrol + attack
- **Ghost**: Goes through walls
- **Eye**: Ranged attack
- Plus boss variants

### Integration and Debug

Some adjustments were necessary:
- Collision fine-tuning
- Adapting `Thread.sleep()` to `requestAnimationFrame`
- Input handling (Java AWT → DOM events)

### Deployment

```
> Configure Vite to build the project and GitHub Actions to deploy.
```

And there you go. Project deployed, playable in the browser.

## Results

### What Was Accomplished in One Evening

| Element | Result |
|---------|--------|
| Lines of code converted | ~5,000 |
| TypeScript files created | ~40 |
| Total time | One evening |
| Working game | Yes |

### The Final Stack

- **TypeScript**: Strict typing
- **Canvas 2D API**: Software rendering, no WebGL
- **Vite**: Ultra-fast build with HMR
- **GitHub Actions**: Automatic deployment

### What Claude Did

- Complete analysis of original Java code
- Raycasting engine conversion
- Bitmap level system adaptation
- Conversion of all entities
- Build and deployment configuration
- Debugging encountered problems

### What I Did

- Project direction (what to do, in what order)
- Validating Claude's choices
- Gameplay fine-tuning
- Identifying bugs to fix
- Final code review

## Why It Worked

### 1. Complete Source Code Available

I had the original Java code. Claude could analyze the existing code rather than guess.

### 2. Precise References

`@java-src/Screen.java` rather than "the rendering file" — Claude knew exactly what to analyze.

### 3. Faithful Architecture

Rather than reinventing with a modern 3D lib, we preserved the original approach: software raycasting on Canvas 2D. Fewer decisions to make = faster conversion.

### 4. Fast Iterations

Component by component, each step validated before the next.

## What This Changes

Without Claude Code, this project would have taken **several weeks**:
- Understanding the raycasting engine: 2-3 days
- Adapting Java → TypeScript calculations: 1 week
- Debugging behavior differences: several days

With Claude Code: **one evening**.

It's not that Claude codes faster — it's that it eliminates the "understanding" and "mental translation" time between languages.

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

Claude Code is a powerful tool that, when used well, transforms how we develop. It's not a developer replacement — it's a **productivity multiplier** that can compress weeks of work into a few hours.

Now it's your turn!

---

*Thank you for following this "Master Claude Code in 20 Days" series. [Discover the Prelude Reborn project](/en/prelude-of-the-chambered-reborn-typescript-web-port/) — [Play now](https://lingelo.github.io/prelude-of-the-chambered-reborn/)*
