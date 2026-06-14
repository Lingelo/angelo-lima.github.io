---
title: "Claude Code Cheat Sheet — April 2026: Opus 4.7, Auto Mode, and Computer Use in the CLI"
subtitle: "Exhaustive up-to-date reference for Claude Code v2.1.101 — April 2026"
description: "Exhaustive April 2026 Claude Code cheatsheet: 60+ slash commands, 70+ CLI flags and env vars, 26 hook events, Opus 4.7, xhigh effort level, Auto Mode, Computer Use in the CLI, Monitor tool, redesigned Desktop app. Available in EN and FR."
date: 2026-04-24T12:00:00.000Z
lang: en
translationKey: "claude-code-cheatsheet-avril-2026"
slug: "claude-code-cheatsheet-april-2026-update"
tags:
  - "IA"
  - "Development"
  - "Claude Code"
author: "Angelo Lima"
cover: "/assets/img/claude-code.webp"
thumbnail: "/assets/img/claude-code.webp"
aliases:
  - "/en/2026-04-24-claude-code-cheatsheet-april-2026-update/"
---
I published a Claude Code cheatsheet at the end of March. Less than four weeks later it is already incomplete: Opus 4.7 shipped on April 16, Computer Use landed in the CLI, Auto Mode went GA on Max, seven new slash commands appeared (and two were removed), five hook updates arrived, and the Desktop app was redesigned on April 14. Between v2.1.83 and v2.1.101, Anthropic shipped roughly thirty releases in five weeks.

So I republished an April 2026 edition — **same visual architecture** as the March version, rewritten to match every recent addition, and using **the blog palette** (dark background, gold accent) instead of the original Reddit theme.

## The cheat sheet

- **[English — Interactive HTML](/assets/data/claude-code-cheatsheet-april-2026-en.html)**
- **[French — Interactive HTML](/assets/data/claude-code-cheatsheet-avril-2026.html)**

The March version stays available for reference: [EN](/assets/data/claude-code-cheatsheet-2026-en.html) · [FR](/assets/data/claude-code-cheatsheet-2026.html).

Items with a gold **NEW** badge shipped since late March 2026. Items tagged **REMOVED** are commands that were retired.

## What's covered

14 sections instead of 13 in the March version (the new row groups Auto Mode, Models & Effort, and Platforms):

| Section | Coverage |
|---------|----------|
| Keyboard Shortcuts | ~30 shortcuts, 17 contexts, Vim visual mode |
| Slash Commands | **60+ commands** in 6 categories, /vim removed |
| CLI Flags & Subcommands | 60+ flags in 8 categories, Bedrock/Vertex wizards |
| The Big 5 (Extension System) | CLAUDE.md, Rules, Commands, Skills, Subagents, MCP, Plugins |
| MCP Computer Use & Monitor | 27 desktop tools, background watchers |
| Permission Modes | 6 modes + April hardening (Bash, PowerShell, sandbox) |
| Hooks | **26 events**, 5 handler types, `if` field, `duration_ms` |
| Input Superpowers | @mentions, !shell, images, pipes, worktrees, background |
| Configuration | 5-level hierarchy, 24 env vars, 12 settings.json fields |
| File Structure Map | Project + global tree (now with `themes/` and `plans/`) |
| Rewind & Checkpoints | Rewind options + 1h prompt caching |
| **Auto Mode** | Permission classifier, fast+thinking paths, `PermissionDenied` hook |
| **Models & Effort Levels** | Opus 4.7, Sonnet 4.6, Haiku 4.5 + `xhigh` effort |
| **Platforms** | CLI (Linux/macOS/Windows native), redesigned Desktop, Web, IDE |
| Pro Workflow | Plan → Execute, Focus View, Monitor tool, adaptive thinking |
| Customize Claude Code | Full frontmatter for every extension type |
| Quick Reference | Combos refreshed with April additions |

## Additions and changes since March 2026

### Claude Opus 4.7 (April 16)

Native 1M context, 64K to 128K output tokens, and above all **adaptive thinking**: no more manual `budget_tokens`, the model itself decides when to think longer. Visible through inline indicators (*"still thinking"*, *"thinking more"*). Default effort shifts to a new `xhigh` level (100K tokens, 71% on MRCR v2), positioned between `high` and `max`.

### Auto Mode GA for Max subscribers

The Auto mode (permission classifier) left research preview for Max subscribers with Opus 4.7. The classifier runs two paths: a *fast path* on Haiku that tags each tool call as safe/risky/uncertain, and a *thinking path* on Opus/Sonnet that handles ambiguous cases. The new `PermissionDenied` hook fires on denials (useful to request an explicit grant via a script) and can return `{"retry": true}` to rerun the tool.

### Computer Use in the CLI

Computer Use was Desktop-app-only in the March release. Since v2.1.86 it is available in the CLI on **macOS and Windows Desktop** (Linux not supported), with multi-monitor support. The 27 tools (screenshot, clicks, typing, `computer_batch`, etc.) are unchanged. Still a research preview, Pro/Max only.

### Monitor tool (v2.1.98)

A built-in tool that spawns background watchers: tail logs, watch CI, auto-fix crashes. Each stdout line becomes a notification in the conversation. Replaces `while sleep; do ... done` Bash loops. Pairs with `/loop` in self-pacing mode (omit the interval; Claude picks the next tick or uses Monitor).

### 7 new slash commands, 2 removed

Added: `/ultraplan` (draft in the cloud, review in the browser, execute locally), `/autofix-pr` (fix a PR from the terminal or web), `/team-onboarding` (generate a teammate ramp-up guide from your usage), `/powerup` (animated lessons to learn features), `/tui` (flicker-free fullscreen rendering), `/focus` (condensed view), `/effort` (interactive slider with ↑↓).

Removed: `/vim` (use `/config` → Editor mode) and `/tag` (replaced by AI-generated session titles).

### Hook system updates

The listed total moves from 25 to 26 events, plus several refinements: `PermissionDenied` for Auto Mode refusals, `PostUserPromptSubmit` that can override `sessionTitle`, `PostToolUse` now receives `duration_ms` in its input, `PreCompact` can block compaction (exit 2), the `if` field accepts `mcp__server__tool`, and a new handler type `mcp_tool` calls an MCP tool directly.

### Roughly twenty new environment variables

Among others: `CLAUDE_CODE_NO_FLICKER` (alt-screen rendering on by default since v2.1.89), `CLAUDE_CODE_HIDE_CWD`, `CLAUDE_CODE_USE_MANTLE` (Bedrock via Mantle), `CLAUDE_CODE_CERT_STORE`, `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` (Linux PID namespace isolation), `CLAUDE_CODE_SCRIPT_CAPS`, `CLAUDE_CODE_PERFORCE_MODE`, `ENABLE_PROMPT_CACHING_1H`, `FORCE_PROMPT_CACHING_5M`, `ENABLE_TOOL_SEARCH`, `OTEL_LOG_TOOL_DETAILS`, `DISABLE_UPDATES`. Seven new `settings.json` fields too: `prUrlTemplate`, `sandbox.failIfUnavailable`, `disableSkillShellExecution`, `showThinkingSummaries` (off in interactive mode since v2.1.86), `statusLine.refreshInterval`.

### Redesigned Desktop app (April 14)

Multi-session sidebar, drag-and-drop pane layout, integrated terminal, file editor with HTML/PDF preview, rebuilt diff viewer. `/desktop` transfers a session from the CLI to the app. Computer Use also works from the Desktop app on macOS and Windows.

### Claude Code on the web

`claude.ai/code` in research preview for Pro and Max subscribers: cloud infrastructure, persistent sessions from mobile, `/teleport` to resume locally.

### Defaults that flipped

- Flicker-free rendering (alt-screen) **on** by default (v2.1.89)
- OS CA certificate store **trusted** by default (v2.1.101), no more manual setup for enterprise TLS proxies
- Thinking summaries **off** by default in interactive mode (v2.1.86)
- Default effort: `high` on API-key / Bedrock / Vertex / Team / Enterprise, `xhigh` for Opus 4.7 users

---

Official sources: [Claude Code Changelog](https://code.claude.com/docs/en/changelog), [What's New](https://code.claude.com/docs/en/whats-new) (weeks [W13](https://code.claude.com/docs/en/whats-new/2026-w13), [W14](https://code.claude.com/docs/en/whats-new/2026-w14), [W15](https://code.claude.com/docs/en/whats-new/2026-w15)), [Opus 4.7 notes](https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7), [Computer Use](https://code.claude.com/docs/en/computer-use), [Auto Mode](https://www.anthropic.com/engineering/claude-code-auto-mode).

If you spot an error or a missing feature, please reach out. I'll keep this cheatsheet updated as Claude Code evolves.
