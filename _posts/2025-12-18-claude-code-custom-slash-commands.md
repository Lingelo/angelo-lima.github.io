---
layout: post
title: "Creating Custom Slash Commands"
subtitle: "Day 8 - Automate your recurring workflows"
description: "Learn to create custom slash commands in Claude Code to automate repetitive tasks and standardize team workflows."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-8
categories: en
---

Built-in slash commands are useful, but the real power comes from **custom commands**. Today, we'll create our own commands to automate recurring workflows.

## Where to Store Commands

### Project Commands (Shared with Team)

```
.claude/commands/
├── review.md
├── test-file.md
└── deploy.md
```

These commands are versioned with the project and available to the entire team.

### Personal Commands (Cross-project)

```
~/.claude/commands/
├── morning-standup.md
├── eod-summary.md
└── quick-fix.md
```

These commands are available in all your projects.

## Anatomy of a Slash Command

### Basic Structure

```markdown
---
description: Short description shown in /help
allowed-tools: Read, Grep, Glob, Bash
---

# /command-name

Instructions for Claude...
```

### The YAML Frontmatter

| Field | Description | Required |
|-------|-------------|----------|
| `description` | Description in help menu | No |
| `allowed-tools` | Tools allowed for this command | No |

### The Command Body

Everything after the frontmatter is sent to Claude as a prompt.

## Available Variables

### Arguments

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | All passed arguments |
| `$1` | First argument |
| `$2` | Second argument |
| `$3`, `$4`... | Following arguments |

### Example with Arguments

```markdown
---
description: Run tests for a specific file
---

# /test

Run tests for `$1` and analyze the results.

File to test: $1
Additional options: $2
```

Usage:
```
/test src/utils/helpers.ts --coverage
```

## Integrating Dynamic Context

### Reference Files with @

```markdown
---
description: Code review with project conventions
---

# /review

Perform a code review of $1 following conventions defined in:
- @CLAUDE.md
- @.eslintrc.js
- @tsconfig.json

File to review: @$1
```

### Inject Bash Results with !

```markdown
---
description: Analyze current project state
---

# /status

Analyze project state:

## Git Status
!`git status --short`

## Branches
!`git branch -a`

## Recent Commits
!`git log --oneline -10`

## Tests
!`npm test 2>&1 | tail -20`

Summarize the state and propose next actions.
```

## Useful Command Examples

### /review - Automatic Code Review

```markdown
---
description: Complete code review of a file
allowed-tools: Read, Grep, Glob
---

# /review

Perform a thorough code review of @$1.

## Review Checklist

### 1. Security
- [ ] No SQL/XSS injection
- [ ] Input validation
- [ ] Secret handling

### 2. Performance
- [ ] No N+1 queries
- [ ] Memoization if needed
- [ ] No unnecessary re-renders (React)

### 3. Maintainability
- [ ] Clear naming
- [ ] Functions < 50 lines
- [ ] No duplicated code

### 4. Tests
- [ ] Nominal cases covered
- [ ] Error cases covered
- [ ] Edge cases identified

For each issue found, indicate:
- Line concerned
- Severity (critical/medium/low)
- Fix suggestion
```

### /fix-tests - Fix Failing Tests

```markdown
---
description: Analyze and fix failing tests
allowed-tools: Read, Bash, Edit
---

# /fix-tests

Tests are failing. Here's the result:

!`npm test 2>&1`

Analyze errors and propose fixes.
For each failing test:
1. Identify the cause
2. Propose a fix
3. Implement if certain, otherwise ask for confirmation
```

### /component - Create a React Component

```markdown
---
description: Generate a new React component
allowed-tools: Read, Write
---

# /component

Create a new React component named `$1`.

Structure to create:
```
src/components/$1/
├── $1.tsx           # Main component
├── $1.test.tsx      # Tests
├── $1.styles.ts     # Styles (styled-components)
└── index.ts         # Export
```

Use patterns from @src/components/Button/ as reference.

Expected props: $2

The component must:
- Be typed with strict TypeScript
- Have basic render tests
- Follow project conventions
```

### /pr-description - Generate PR Description

```markdown
---
description: Generate a PR description from commits
---

# /pr-description

Generate a Pull Request description based on changes.

## Commits since main
!`git log main..HEAD --oneline`

## Modified files
!`git diff main --stat`

## Detailed diff
!`git diff main`

Generate a PR description with:

## Summary
[2-3 bullet points describing changes]

## Changes
[List of modified files with description]

## Test Plan
[Checklist of tests to perform]

## Screenshots (if applicable)
[Placeholder if UI modified]
```

### /morning - Morning Standup

```markdown
---
description: Prepare morning standup
---

# /morning

Prepare my morning standup.

## Done yesterday
!`git log --oneline --since="yesterday" --author="$(git config user.email)"`

## Work in progress
!`git status --short`
!`git stash list`

## PRs awaiting review
!`gh pr list --author @me 2>/dev/null || echo "GitHub CLI not available"`

Summarize:
1. What I did yesterday (based on commits)
2. What's in progress (modified files)
3. Potential blockers
```

### /debug - Problem Debugging

```markdown
---
description: Structured problem debugging
---

# /debug

Debug the following problem: $ARGUMENTS

## Step 1: Understand
- What is the expected behavior?
- What is the current behavior?
- When does the problem appear?

## Step 2: Reproduce
Propose steps to reproduce the problem.

## Step 3: Analyze
Analyze the concerned code and identify possible causes.

## Step 4: Resolve
Propose a solution with necessary changes.

Don't code yet, start with analysis.
```

## Commands with Restricted Tools

### Read-only Command

```markdown
---
description: Analysis without modification
allowed-tools: Read, Grep, Glob
---

# /analyze

Analyze the code without making modifications...
```

### Command with Limited Bash

```markdown
---
description: Run tests only
allowed-tools: Read, Bash(npm test:*)
---

# /run-tests

Run tests: !`npm test`
```

## Team Command Organization

### Recommended Structure

```
.claude/commands/
├── dev/
│   ├── component.md
│   ├── hook.md
│   └── service.md
├── review/
│   ├── security.md
│   ├── performance.md
│   └── full.md
├── git/
│   ├── pr-description.md
│   ├── commit-message.md
│   └── changelog.md
└── debug/
    ├── error.md
    ├── performance.md
    └── memory.md
```

### Naming Convention

| Prefix | Usage |
|--------|-------|
| `dev-*` | Code creation |
| `review-*` | Code review |
| `git-*` | Git operations |
| `debug-*` | Debugging |
| `doc-*` | Documentation |

## Testing Your Commands

### Check Syntax

```
/help
```

Your command should appear with its description.

### Dry-run Test

Add to your command:
```markdown
Show what you're going to do before doing it.
```

### Variable Debugging

```markdown
DEBUG - Received arguments:
- $ARGUMENTS = "$ARGUMENTS"
- $1 = "$1"
- $2 = "$2"
```

## What's Coming Tomorrow

In **Day 9**, we'll see **subagents**: how to create specialized agents with their own instructions and tools.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 7: Permissions and Security](/en/claude-code-permissions-security/)*
