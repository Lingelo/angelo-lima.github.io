---
title: "Claude Code Cheat Sheet — June 2026: Fable 5, Opus 4.8, Agent View, and Dynamic Workflows"
subtitle: "Exhaustive up-to-date reference for Claude Code v2.1.170 — June 2026"
description: "Exhaustive June 2026 Claude Code cheatsheet: 65+ slash commands, 70+ CLI flags and env vars, 27 hook events, Fable 5, Opus 4.8, Agent View, Dynamic Workflows, ultracode, security-guidance plugin, --safe-mode, fallback chains. Available in EN and FR."
date: 2026-06-15T12:00:00.000Z
lang: en
translationKey: "claude-code-cheatsheet-juin-2026"
slug: "claude-code-cheatsheet-june-2026-update"
tags:
  - "IA"
  - "Development"
  - "Claude Code"
author: "Angelo Lima"
cover: "/assets/img/claude-code.webp"
thumbnail: "/assets/img/claude-code.webp"
aliases:
  - "/en/2026-06-15-claude-code-cheatsheet-june-2026-update/"
---
I republished a Claude Code cheatsheet at the end of April. Seven weeks later it has aged a lot: between v2.1.101 and v2.1.170, Anthropic shipped roughly sixty releases. **Two new models** landed (Opus 4.8 on May 28, then Fable 5 on June 9), the **Agent View** arrived, **dynamic workflows** now orchestrate hundreds of subagents, and a handful of new commands (`/goal`, `/cd`, `/workflows`, `/ultrareview`, `/reload-skills`…) showed up.

So I republished a June 2026 edition — **same visual architecture** as the March and April versions, rewritten to match every addition, using **the blog palette** (dark background, gold accent).

## The cheat sheet

- **[English — Interactive HTML](/assets/data/claude-code-cheatsheet-june-2026-en.html)**
- **[French — Interactive HTML](/assets/data/claude-code-cheatsheet-juin-2026.html)**

The previous editions stay available: April [EN](/assets/data/claude-code-cheatsheet-april-2026-en.html) · [FR](/assets/data/claude-code-cheatsheet-avril-2026.html), March [EN](/assets/data/claude-code-cheatsheet-2026-en.html) · [FR](/assets/data/claude-code-cheatsheet-2026.html).

Items with a gold **NEW** badge shipped since the April 2026 edition.

## What's covered

16 sections (two new cards: Agent View, and Dynamic Workflows & Security):

| Section | Coverage |
|---------|----------|
| Keyboard Shortcuts | ~30 shortcuts, transcript navigation, Vim mode |
| Slash Commands | **65+ commands** in 6 categories |
| CLI Flags & Subcommands | 70+ flags in 9 categories, `claude agents` |
| The Big 5 (Extension System) | CLAUDE.md, Rules, Commands, Skills, Subagents, MCP, Plugins |
| Permission Modes | 6 modes + June hardening (startup files, build configs) |
| Hooks | **27 events**, 5 handlers, `MessageDisplay`, `args[]` |
| Input Superpowers | @mentions, !shell, pipes, worktrees, `--bg --exec` |
| Configuration | 5-level hierarchy, env vars, settings.json |
| File Structure Map | Project + global tree |
| Rewind & Checkpoints | Rewind options + "Summarize up to here" |
| Auto Mode | Classifier, GA on Pro, hard deny, Bedrock/Vertex/Foundry |
| **Models & Effort Levels** | Fable 5, Opus 4.8/4.7, Sonnet 4.6, Haiku 4.5 + `ultracode` |
| Platforms | CLI (Windows without Git Bash), Desktop, Web (Routines), IDE |
| **Agent View** | `claude agents`, pinned sessions, background exec |
| **Dynamic Workflows & Security** | `/workflows`, security-guidance plugin, `/ultrareview` |
| Pro Workflow | Plan → Execute, `/goal`, fallback chains, safe mode |
| Customize Claude Code | Full frontmatter + plugin scaffolding |
| Quick Reference | Combos refreshed with June additions |

## Additions and changes since April 2026

### Claude Opus 4.8 (May 28)

The new default model on Max, Team Premium, Enterprise pay-as-you-go, and the Anthropic API (requires v2.1.154+). Default `high` effort, `xhigh` for the hardest tasks, native 1M context. **Fast mode** now runs on Opus 4.8 at $10/$50 per MTok (2x the standard rate for ~2.5x the speed); Opus 4.6 fast mode is deprecated.

### Claude Fable 5 (June 9)

The **Mythos-class** model, the most capable available in Claude Code: 1M context, up to 128K output tokens, $10/$50 per MTok. Built for tasks larger than a single sitting — it sustains long autonomous sessions, investigates before acting, and verifies its own work. It is **not** the default model: `/model fable` (or the `best` alias). Thinking is always on there and can't be disabled.

One important quirk: Fable 5 runs with **safety classifiers** (cybersecurity, biology). A flagged request automatically reroutes to Opus (4.8 on the API, 4.7 on AWS) with a notice in the transcript. To check whether a customization (CLAUDE.md, a security repo…) trips the fallback on the very first request, launch `claude --safe-mode`.

### Agent View (`claude agents`, May 11)

The big UX feature: a **single screen for all your sessions** — what's running, what's blocked on you, what's done. `claude agents` or `←←` from a session. "Pinned" background sessions stay alive when idle, `/resume` lists them with their elapsed duration, and `claude --bg --exec "pytest -x"` launches an attachable shell job.

### Dynamic workflows & ultracode (May 28)

A **workflow** is an orchestration script Claude writes for your task and runs across dozens to hundreds of subagents in the background — ideal for a codebase-wide audit or a large migration. Manage them with `/workflows`, and trigger them via the `ultracode` effort level (xhigh + auto orchestration) or the `ultracode` keyword (the former `workflow`, renamed early June).

### The security-guidance plugin (May 28)

An official plugin that reviews Claude's changes for vulnerabilities and fixes them in the same session: a fast pattern check on each edit, a model review at the end of each turn, a deeper agentic review on commit/push. `/plugin install security-guidance@claude-plugins-official` then `/reload-plugins`. Project rules in `.claude/claude-security-guidance.md`.

### New slash commands

`/goal` (set a completion condition, Claude iterates until it holds), `/cd` (change cwd without breaking the prompt cache), `/scroll-speed`, `/workflows`, `/reload-skills`, `/ultrareview` (fleet of cloud bug-hunting agents), `/web-setup`. The `/code-review` (correctness bugs, `--comment`/`--fix`) and `/simplify` (cleanup-only review that applies fixes) pair was re-split.

### Auto Mode GA on Pro

The permission classifier now runs on **Pro** (with Sonnet 4.6 or Opus) and no longer requires opt-in consent. New: `autoMode.hard_deny` for rules that block unconditionally, and availability on Bedrock/Vertex/Foundry via `CLAUDE_CODE_ENABLE_AUTO_MODE=1`.

### 27th hook event + refinements

New `MessageDisplay` event (transform/hide displayed text). Plus: `Stop`/`SubagentStop` can return `additionalContext`, `command` hooks accept an exec form `args: string[]` (no more quote escaping), `PostToolUse` gains `continueOnBlock`, `SessionStart` can return `reloadSkills: true`, and `$CLAUDE_EFFORT` / `effort.level` are visible to hooks.

### Fallback chains, safe mode & version gating

`--fallback-model` now accepts a **chain** (up to 3 models, comma-separated) and applies in interactive sessions too; persist it via `fallbackModel` (array) in settings. `--safe-mode` (and `CLAUDE_CODE_SAFE_MODE`) disables all customizations for debugging. Admins can enforce `requiredMinimumVersion` / `requiredMaximumVersion`, `availableModels` + `enforceAvailableModels`, and `modelOverrides`.

### Platforms

**Windows without Git Bash** (PowerShell becomes the default shell when Bash is absent). **Routines** on Claude Code on the web (templated cloud agents fired by schedule, GitHub event, or API), mobile push notifications, custom themes, session recap. On the IDE side, Windsurf was renamed **Devin Desktop**.

### Defaults that flipped

- **Opus 4.8** default on Max / Team Premium / Enterprise pay-as-you-go / API
- **Sonnet 4.6** on Pro / Team Standard / Enterprise subscription seats
- **Opus 4.7** on Claude Platform on AWS (xhigh by default)
- **Fable 5** never default (`/model fable`)
- **Lean system prompt** by default for all models except Haiku / Sonnet / Opus 4.7 and earlier
- **Auto mode** with no opt-in

---

Official sources: [Claude Code Changelog](https://code.claude.com/docs/en/changelog), [What's New](https://code.claude.com/docs/en/whats-new), [Model configuration](https://code.claude.com/docs/en/model-config), [Dynamic workflows](https://code.claude.com/docs/en/workflows), [Security guidance](https://code.claude.com/docs/en/security-guidance), [Introducing Fable 5 & Mythos 5](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5).

If you spot an error or a missing feature, please reach out. I'll keep this cheatsheet updated as Claude Code evolves.
