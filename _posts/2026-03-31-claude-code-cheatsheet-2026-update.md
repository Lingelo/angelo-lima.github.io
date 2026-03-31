---
layout: post
title: "Claude Code Cheat Sheet 2026: What Changed Since the Reddit Original"
subtitle: "A visual diff of every feature added since the popular December 2025 cheatsheet"
description: "Updated Claude Code cheatsheet for March 2026 with all new features: MCP Computer Use, /schedule, /voice, hook handlers, dontAsk mode, skill frontmatter, and more. Free downloadable PNG."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Development, Claude Code]
author: "Angelo Lima"
lang: en
ref: claude-code-cheatsheet-2026
categories: en
---

In December 2025, a Claude Code cheat sheet went viral on [r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/). It was well-structured, visually clean, and covered the essentials. But Claude Code has evolved significantly since then. After a careful visual comparison, I found the original covers roughly **65-70% of current features**.

This article documents every meaningful addition since that cheatsheet, and provides an **updated version** you can use as a reference.

## The Updated Cheatsheet

**[View the interactive HTML version](/assets/data/claude-code-cheatsheet-2026.html)** (dark theme, same visual style as the original).

You can also download the [full-resolution PNG](/assets/img/claude-code-cheatsheet-2026.png) (2800px wide, ~4MB).

Items marked with a green **NEW** badge are additions since the December 2025 original.

## What's Actually New

I compared every section against the original image. Here's the precise diff.

### New Slash Commands

| Command | What it does |
|---------|-------------|
| `/schedule` | Schedule remote agents on a cron. Claude runs tasks on claude.ai while you sleep |
| `/desktop` | Hand off the current session to the Claude Desktop app |
| `/voice` | Voice dictation input |
| `/diff` | Interactive diff viewer for changes made during the session |
| `/security-review` | Scan recent changes for vulnerabilities |

Commands like `/insights`, `/teleport`, `/btw`, `/fast`, and `/loop` were **already in the original** (some with a NEW badge at the time).

### New CLI Flags

| Flag | What it does |
|------|-------------|
| `--tmux` | Open a worktree in a dedicated tmux pane |
| `--from-pr 42` | Resume work from a GitHub pull request |
| `--fork-session` | Fork the current session while keeping full context |

Flags like `--effort`, `--remote`, `--bare`, `--max-budget-usd`, `--json-schema`, and `--fallback-model` were already documented in the original.

### New Keyboard Shortcuts

| Shortcut | What it does |
|----------|-------------|
| `Option+P` / `Alt+P` | Quick model switch (sonnet/opus/haiku) |
| `Option+T` / `Alt+T` | Toggle extended thinking on/off |
| `?` | Show all available shortcuts |

### Hooks: From 1 Handler Type to 4

The original cheatsheet listed hook events (PreToolUse, PostToolUse, etc.) and showed the `command` handler type. Since then, three new handler types have been added:

| Handler | Use case |
|---------|----------|
| `command` | Execute a shell command (original) |
| `http` | Call a webhook URL |
| `prompt` | Inject text into Claude's context |
| `agent` | Delegate to a subagent |

There's also a new event: `SubagentStop`, which fires when a subagent completes its task.

### Permission Mode: dontAsk

The original showed Default, Auto-Accept, and Plan modes. The `dontAsk` mode is new: it **denies everything** except tools explicitly pre-approved in your settings. Useful for strict CI/CD environments.

### Skills Frontmatter Expansion

Skills (`.claude/skills/name/SKILL.md`) gained three new frontmatter options:

| Field | Effect |
|-------|--------|
| `context: fork` | Run the skill in an isolated subagent context |
| `paths: "*.ts"` | Only activate for matching file types |
| `effort: high` | Force extended thinking for this skill |

### Subagent Enhancements

| Feature | What it enables |
|---------|----------------|
| `isolation: worktree` | Run the agent in a separate git worktree |
| `memory: project` | Persistent memory scoped to user/project/local |

### MCP Computer Use

The biggest addition, launched March 23, 2026. Claude can now **see and control your desktop**: take screenshots, click, type, scroll, and drag across macOS applications.

Key facts:
- **27 tools** including `screenshot`, `left_click`, `type`, `key`, `scroll`, `zoom`, `computer_batch`
- **Security model**: `request_access` must be called first. Only apps in the allowlist are visible in screenshots (compositor-level filtering)
- **Performance**: `computer_batch` executes a sequence of actions in a single tool call
- Available on **Pro and Max plans**, macOS only for now

This is an MCP server built into Claude Code/Cowork, not a separate installation. Enable it in Settings > General > Computer Use.

### "Customize Claude Code" Section

The original cheatsheet had a "Create Custom Commands" card covering only slash commands. The updated version replaces it with a comprehensive **"Customize Claude Code"** card that shows how to create **every type of extension**, each with a complete frontmatter example:

- **Slash command** (`.claude/commands/`) — you invoke it
- **Skill** (`.claude/skills/`) — Claude invokes it automatically
- **Subagent** (`.claude/agents/`) — parallel specialist with its own context
- **Rule** (`.claude/rules/`) — conditional instructions scoped by file glob
- **Hook** (`settings.json`) — deterministic automation on lifecycle events
- **MCP Server** (`.mcp.json`) — external tool integration

Plus a decision guide: "where should this go?" for each use case.

## What Was Already There

For accuracy, here's what was **already in the December 2025 original** that I initially miscategorized as new:

- `/insights` (had its own NEW badge in the original)
- `/teleport`, `/btw`, `/fast`, `/loop`
- `Ctrl+B` (background tasks), `Ctrl+V` (paste images)
- `--effort`, `--remote`, `--bare`, `--max-budget-usd`
- Mode `auto` (AI permission classifier)
- Agent Teams, worktrees, multi-directory support
- All 8 hook events (PreToolUse through Notification)

## How I Built This

The cheatsheet is a single HTML file with standalone CSS (dark theme), exported to PNG via Playwright:

```bash
# Clone and build
git clone https://github.com/angelolima/claude-code-cheatsheet
npm install
npm run build:reddit-fr
```

The build script uses `page.screenshot({ fullPage: true })` with a 1400px viewport at 2x DPR, producing a 2800px-wide retina PNG.

## Get the Cheatsheet

- **[Interactive HTML](/assets/data/claude-code-cheatsheet-2026.html)** - best for browsing
- **[High-res PNG](/assets/img/claude-code-cheatsheet-2026.png)** - best for sharing or printing

The content is in French, but all technical terms remain in English.

---

*This cheatsheet was built as part of a larger project that also produces a [Complete Guide PDF](https://github.com/angelolima/claude-code-cheatsheet) covering all 16 Claude Code features in depth.*
