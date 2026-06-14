---
title: "Claude Code Cheat Sheet 2026: Every Command, Shortcut & Feature in One Place"
subtitle: "An exhaustive, up-to-date reference for Claude Code v2.x — March 2026"
description: "The most complete Claude Code cheatsheet for March 2026: 55+ slash commands, 55+ CLI flags, 25 hook events, 6 permission modes, MCP Computer Use, and a full extension creation guide. Available in EN and FR."
date: 2026-03-31T12:00:00.000Z
lang: en
translationKey: "claude-code-cheatsheet-2026"
slug: "claude-code-cheatsheet-2026-update"
tags:
  - "IA"
  - "Development"
  - "Claude Code"
author: "Angelo Lima"
cover: "/assets/img/claude-code.webp"
thumbnail: "/assets/img/claude-code.webp"
aliases:
  - "/en/2026-03-31-claude-code-cheatsheet-2026-update/"
---
Claude Code evolves fast. Most cheatsheets available online are already missing features that shipped in early 2026. I built an **exhaustive, visual reference** covering everything in Claude Code v2.x as of March 2026 — and I'm sharing it for free.

## The Cheatsheet

Available in both English and French:

- **[English — Interactive HTML](/assets/data/claude-code-cheatsheet-2026-en.html)**
- **[French — Interactive HTML](/assets/data/claude-code-cheatsheet-2026.html)**

You can also download the high-res PNGs: [English](/assets/img/claude-code-cheatsheet-2026-en.png) | [French](/assets/img/claude-code-cheatsheet-2026.png) (~4MB each, 2800px wide).

Items marked with a green **NEW** badge are features added since late 2025.

## What's Covered

This isn't a "top 20 commands" summary. It's the full reference:

| Section | Coverage |
|---------|----------|
| Keyboard Shortcuts | ~30 shortcuts + prefixes + confirmation dialogs |
| Slash Commands | **55+ commands** in 7 categories |
| CLI Flags | **55+ flags** in 8 categories + subcommands |
| The Big 5 (Extension System) | CLAUDE.md, Rules, Commands, Skills, Subagents, MCP, Plugins |
| Permission Modes | All **6 modes** with permission syntax |
| Hooks | All **25 lifecycle events** + 4 handler types + `if` field |
| Input Superpowers | @mentions, !shell, images, pipes, worktrees, background |
| Configuration | 5-level hierarchy, config commands, key env vars |
| File Structure Map | Project-level + global-level complete tree |
| Rewind & Checkpoints | All options + context management strategies |
| Pro Workflow | Plan→Execute loop, prompting techniques, advanced patterns |
| Customize Claude Code | **How to create each extension type** with full frontmatter |
| Quick Reference | Most-used combos, models & effort levels |

## Recent Additions Worth Knowing

### MCP Computer Use

Launched March 23, 2026. Claude can now **see and control your desktop**: take screenshots, click, type, scroll, and drag across macOS applications.

- **27 tools** including `screenshot`, `left_click`, `type`, `key`, `scroll`, `zoom`, `computer_batch`
- **Security**: `request_access` must be called first. Compositor-level filtering — only allowed apps are visible in screenshots
- **Performance**: `computer_batch` executes a sequence of actions in a single tool call
- Available on **Pro and Max plans**, macOS only for now

### New Slash Commands

| Command | What it does |
|---------|-------------|
| `/schedule` | Schedule remote agents on a cron |
| `/desktop` | Hand off session to the Desktop app |
| `/voice` | Voice dictation input |
| `/diff` | Interactive diff viewer |
| `/security-review` | Scan changes for vulnerabilities |

### New CLI Flags

| Flag | What it does |
|------|-------------|
| `--tmux` | Worktree in a dedicated tmux pane |
| `--from-pr 42` | Resume from a GitHub PR |
| `--fork-session` | Fork session keeping full context |

### Hooks: 25 Events, 4 Handler Types

The hook system now supports **25 lifecycle events** (up from ~8) and **4 handler types**: `command`, `http`, `prompt`, `agent`. New events include `SubagentStart/Stop`, `TaskCreated/Completed`, `TeammateIdle`, `PostCompact`, `ConfigChange`, `FileChanged`, and more.

### Skills & Subagents Frontmatter

Skills gained `context: fork`, `paths:`, and `effort:` options. Subagents gained `isolation: worktree` and `memory: project/user/local` for persistent knowledge.

### "Customize Claude Code" Card

One of the most useful sections: a complete guide showing how to create **every type of extension** — slash commands, skills, subagents, rules, hooks, and MCP servers — each with a full frontmatter example and a decision guide for "where should this go?"

---

If you spot an error or a missing feature, feel free to reach out — I'll keep this cheatsheet updated as Claude Code evolves.
