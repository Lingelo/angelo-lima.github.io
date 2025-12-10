---
layout: post
title: "Claude Code: Installation and First Steps"
subtitle: "Day 1 - Discover the AI assistant that will transform your coding"
description: "Complete guide to installing Claude Code, configuring your environment, and mastering essential commands. First article in a 20-day series to become an expert."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code-series.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-1
categories: en
---

Welcome to this 20-article series to master Claude Code! Each day, we'll explore a feature that will make you a more efficient developer. Today: installation and first steps.

## What is Claude Code?

Claude Code is Anthropic's official command-line interface for interacting with Claude. Unlike traditional web chatbots, Claude Code integrates directly into your terminal and understands your codebase.

**What sets it apart:**
- Direct access to your files and terminal
- Understanding of your project context
- Ability to read, write, and execute code
- Native Git integration

## Installation

### Prerequisites

- Node.js 18+ installed (or [Bun](/en/bun-2025-critical-evaluation-javascript-runtime-alternative/) as an alternative)
- An Anthropic account (API or claude.ai)

### Installation via npm

```bash
npm install -g @anthropic-ai/claude-code
```

### First Authentication

```bash
claude
```

On first run, Claude Code will guide you through the login process. Two options:
1. **claude.ai account**: Billing based on your subscription
2. **Anthropic API**: Token-based billing (~$6/day on average)

Your credentials are stored locally—no need to reconnect each session.

## The CLAUDE.md File: Your Contract with the AI

The first thing to do after installation: create a `CLAUDE.md` file at your project root.

```markdown
# CLAUDE.md

## Project Context
E-commerce application in Next.js 14 with strict TypeScript.

## Conventions
- Use Server Components by default
- Tests with Vitest
- [Conventional commits](/en/conventional-commits-standardize-git-messages-optimized-collaboration/) (feat:, fix:, etc.)

## Useful Commands
- `npm run dev`: Development server
- `npm run test`: Run tests
- `npm run lint`: Code verification
```

Claude automatically reads this file and adapts its responses to your context. It's your **contract** with the AI: the more precise it is, the more relevant Claude will be.

## Essential Commands

### Navigation Commands

| Command | Action |
|---------|--------|
| `/help` | Display complete help |
| `/clear` | Clear conversation history |
| `/exit` or `Ctrl+D` | Exit Claude Code |

### Diagnostic Commands

| Command | Action |
|---------|--------|
| `/doctor` | Check system health |
| `/config` | View/modify configuration |
| `/model` | Change model (Haiku/Sonnet/Opus) |

### Session Commands

| Command | Action |
|---------|--------|
| `/cost` | View current session cost |
| `/compact` | Reduce context size |

### Example Session

```bash
$ claude
╭─────────────────────────────────────╮
│ Claude Code                         │
│ Model: claude-sonnet-4-5-20250929   │
╰─────────────────────────────────────╯

> Explain this project's structure

I'll analyze your project structure...

[Claude reads files and responds with context]
```

## Essential Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Cancel current operation |
| `Ctrl+L` | Clear terminal screen |
| `Ctrl+D` | Exit Claude Code |
| `Tab` | Toggle extended thinking |
| `Esc Esc` | Go back (rewind) |
| `Ctrl+R` | Search history |

## Choosing the Right Model

Claude Code offers three models with different trade-offs:

| Model | Strength | Cost | Recommended Use |
|-------|----------|------|-----------------|
| **Haiku** | Fast, economical | $ | Simple questions, quick exploration |
| **Sonnet** | Balanced | $$ | Daily use, most tasks |
| **Opus** | Maximum capability | $$$ | Complex problems, architecture |

To change models:
```bash
/model haiku
/model sonnet
/model opus
```

## First Practical Exercise

Try these commands in one of your projects:

```bash
# 1. Launch Claude Code
claude

# 2. Request an analysis
> Describe this project's structure and identify the technologies used

# 3. Check the cost
/cost

# 4. Switch to a lighter model for a simple question
/model haiku
> What is the application's entry point?

# 5. Switch back to Sonnet
/model sonnet
```

## Best Practices from the Start

1. **Always create a CLAUDE.md**: Even minimal, it drastically improves responses
2. **Use `/clear` between tasks**: Avoids context pollution
3. **Start with Sonnet**: Best quality/cost ratio for beginners
4. **Check `/cost` regularly**: Get into the habit of monitoring your consumption

## What's Coming Tomorrow

In **[Day 2](/en/claude-code-secret-syntax/)**, we'll discover **Claude Code's secret syntax**: the `#@/!` shortcuts that make the difference between a basic user and a power user.

---

*This article is part of the "Master Claude Code in 20 Days" series. Find all articles on [my blog](/en/).*
