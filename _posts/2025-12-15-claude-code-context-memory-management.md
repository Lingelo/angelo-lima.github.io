---
layout: post
title: "Context and Memory Management in Claude Code"
subtitle: "Day 5 - Optimize long sessions and preserve your preferences"
description: "Master context management in Claude Code: hierarchical memory, /compact, checkpoints, and best practices for extended sessions."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-5
categories: en
---

A Claude Code session can last hours. But the longer the conversation, the heavier the context becomes. Today, we'll see how to effectively manage memory and context for productive sessions.

## The Hierarchical Memory System

Claude Code uses a **4-level** memory architecture, from highest to lowest priority:

```
┌─────────────────────────────────────────┐
│ 1. Enterprise Policy (highest priority)│  ← Organization IT rules
├─────────────────────────────────────────┤
│ 2. Project Memory (.claude.md)         │  ← Project instructions
├─────────────────────────────────────────┤
│ 3. Project Rules (.claude/rules/)      │  ← Modular rules
├─────────────────────────────────────────┤
│ 4. User Memory (~/.claude/CLAUDE.md)   │  ← Personal preferences
└─────────────────────────────────────────┘
```

### Level 1: Enterprise Policy

For organizations, admins can define global rules that apply to all users. These rules have maximum priority.

### Level 2: Project Memory (.claude.md or CLAUDE.md)

The `CLAUDE.md` file at the project root:

```markdown
# CLAUDE.md

## Tech Stack
- Next.js 14 with App Router
- Strict TypeScript
- Prisma + PostgreSQL
- Tailwind CSS

## Conventions
- Use Server Components by default
- Name files in kebab-case
- Tests with Vitest

## Strict Rules
- NEVER expose API keys client-side
- ALWAYS validate inputs with Zod
```

### Level 3: Project Rules (.claude/rules/)

For modular and conditional rules:

```
.claude/rules/
├── typescript.md      # TypeScript rules
├── testing.md         # Testing rules
├── api/
│   └── security.md    # API security rules
└── frontend/
    └── components.md  # Component rules
```

Example rule with **glob pattern**:

```markdown
<!-- .claude/rules/api/security.md -->
---
globs: ["src/api/**/*.ts", "src/routes/**/*.ts"]
---

# API Security Rules

- Always validate JWT tokens
- Rate limiting on all endpoints
- Log suspicious access
```

This rule only applies when working on files matching the patterns.

### Level 4: User Memory

Your personal preferences in `~/.claude/CLAUDE.md`:

```markdown
# Personal Preferences

## Code Style
- I prefer early returns
- Comments in English
- No semicolons in JS/TS

## Communication
- Concise responses
- No emojis
- Table format for comparisons
```

## Adding Instructions Live with #

During a session, use `#` to add instructions:

```
# Use date-fns instead of moment.js
```

This instruction is added to the project's `CLAUDE.md` and persists between sessions.

## Importing Context with @

You can reference other files in your CLAUDE.md:

```markdown
# CLAUDE.md

## Architecture
See @docs/architecture.md for details.

## Patterns
Follow patterns in @src/features/auth/ for new features.
```

Import supports up to **5 levels of recursion**.

## The /compact Command

When context becomes too heavy, use `/compact`:

```
/compact
```

This command:
- Summarizes the conversation
- Removes non-essential details
- Preserves important information
- Reduces token consumption

### When to Use /compact

| Situation | Action |
|-----------|--------|
| Session > 30 minutes | Consider /compact |
| Lots of code displayed | /compact recommended |
| Topic change | /compact then new task |
| "Context too long" error | /compact required |

## Checkpoints: Your Safety Net

Claude Code automatically creates a **checkpoint** at each user prompt.

### How the System Works

```
Prompt 1 → [Checkpoint 1] → Claude Response
Prompt 2 → [Checkpoint 2] → Claude Response
Prompt 3 → [Checkpoint 3] → Claude Response
          ↑
    You can return here
```

### Going Back with Esc Esc

Double-press `Esc` to open the rewind menu:

```
Rewind options:
1. Conversation only  → Keep code, go back in conversation
2. Code only          → Keep conversation, undo modifications
3. Both               → Undo everything (code + conversation)
```

### The /rewind Command

Alternative to the shortcut:

```
/rewind
```

You can also specify how far back:

```
/rewind 3  → Go back 3 prompts
```

### Important Limitations

Checkpoints **do NOT track**:

| Not Tracked | Example |
|-------------|---------|
| Files deleted by bash | `! rm -rf node_modules` |
| Files moved by bash | `! mv src/old src/new` |
| Manual modifications | Edits made in your IDE |
| Concurrent sessions | Another Claude Code instance |

**Tip**: Use Git as a complement for true history.

## Automatic Session Cleanup

Claude Code automatically cleans up old sessions.

### Cleanup Configuration

In `.claude/settings.json`:

```json
{
  "cleanupPeriodDays": 30
}
```

Sessions older than this period are deleted.

### View Existing Sessions

```
/sessions
```

### Resume a Session

```bash
claude -r <session-id>
```

Or continue the last one:

```bash
claude -c
```

## Best Practices for Long Sessions

### 1. Structure Your Tasks

```
Session 1: Exploration and planning
  └─ /compact before finishing

Session 2: Implementation feature A
  └─ /compact before finishing

Session 3: Implementation feature B
  └─ /compact before finishing
```

### 2. Use /clear Between Different Topics

```
> [Authentication task completed]

/clear

> Now, let's work on the payment system
```

### 3. Document What You Learn in CLAUDE.md

Instead of repeating the same instructions:

```
# I learned the project uses a specific pattern
```

This becomes a permanent instruction.

### 4. Combine Checkpoints and Git

```bash
# Before a risky modification
git add -A && git commit -m "checkpoint before refactoring"

# Make the modification with Claude

# If it doesn't work
git reset --hard HEAD
```

## Monitoring Context Usage

### With /cost

```
/cost

Session cost: $0.45
Tokens used: 45,000 (input) + 5,000 (output)
Context size: ~40,000 tokens
```

### Signs of Overloaded Context

| Sign | Action |
|------|--------|
| Slower responses | /compact |
| Claude "forgets" instructions | /compact + remind |
| Cost increasing fast | /compact |
| Context error | /compact required |

## Optimized Workflow Template

```bash
# Start of session
claude

# 1. Recall context if needed
> Summarize what we did yesterday on the auth feature

# 2. Define today's task
> Today, we continue with tests

# 3. Work...

# 4. At regular intervals (30-45 min)
/cost
# If > 50k tokens → /compact

# 5. Before changing major topics
/clear

# 6. At end of session
# Add learnings to CLAUDE.md
# Allows next session to benefit from context
```

## What's Coming Tomorrow

In **Day 6**, we'll see **Git workflows with Claude Code**: automatic commits, PR creation, and using checkpoints for effective collaboration.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 4: Prompt Engineering](/en/claude-code-prompt-engineering/)*
