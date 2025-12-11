---
layout: post
title: "Claude Code Secret Syntax: #@/!"
subtitle: "Day 2 - The shortcuts 95% of developers don't know"
description: "Master Claude Code's #@/! shortcuts to multiply your productivity. Context activation, mentions, slash commands, and shell escape explained."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-2
categories: en
---

Yesterday, we installed Claude Code and discovered the basic commands. Today, we level up with the **secret syntax**: four symbols that transform how you interact with Claude.

## The Four Magic Symbols

| Symbol | Name | Usage |
|--------|------|-------|
| `#` | Context Activation | Add to CLAUDE.md live |
| `@` | Mentions | Reference files and agents |
| `/` | Slash Commands | Built-in and custom commands |
| `!` | Shell Escape | Direct bash execution |

## # - Context Activation

The `#` symbol lets you enrich your `CLAUDE.md` without leaving Claude Code.

### How It Works

During a session, press `#` and type an instruction:

```
# Always use async/await rather than .then()
```

This instruction is **immediately added** to your `CLAUDE.md` and persists for future sessions.

### Use Cases

```
# Never modify files in /config/
# Use Zod for form validation
# Tests must cover error cases
```

**Advantage**: You build your project context **organically**, as you discover things, without interrupting your workflow.

## @ - Mentions

The `@` symbol is your shortcut for referencing elements.

### Referencing Files

```
> Explain how @src/auth/login.ts works
```

Claude automatically loads the file content into context.

**Tab-completion**: Type `@src/` then `Tab` to see suggestions!

### Referencing Multiple Files

```
> Compare @src/api/v1/users.ts and @src/api/v2/users.ts
```

### Invoking Subagents

```
> @explorer find all REST endpoints in the application
```

Built-in subagents (see [Day 9](/en/claude-code-subagents/) for details):
- `@explorer`: Quick search (Haiku model, read-only)
- `@planner`: Planning before implementation

### Practical Examples

```
> Refactor @src/utils/helpers.ts using patterns from @src/utils/validators.ts

> @explorer where is the calculateTotal function defined?

> Add tests for @src/services/payment.ts
```

## / - Slash Commands

Slash commands are predefined or custom commands.

### Essential Built-in Commands

| Command | Description |
|---------|-------------|
| `/help` | Complete help |
| `/clear` | Clear context |
| `/cost` | Session cost |
| `/model` | Change model |
| `/compact` | Reduce context |
| `/doctor` | System diagnostic |
| `/config` | Configuration |
| `/permissions` | Manage permissions |
| `/agents` | Manage subagents |
| `/mcp` | MCP server status |
| `/vim` | Vim editing mode |
| `/terminal-setup` | Configure terminal |

### Creating Your Own Slash Commands

Create a file in `.claude/commands/` (see [Day 8](/en/claude-code-custom-slash-commands/) for more):

```markdown
<!-- .claude/commands/review.md -->
---
description: Code review of specified file
allowed-tools: Read, Grep, Glob
---

# /review

Perform a complete code review of $ARGUMENTS checking:
1. TypeScript best practices
2. Error handling
3. Security (injection, XSS)
4. Performance

Files to analyze: @$1
```

Usage:
```
/review src/api/users.ts
```

### Arguments in Commands

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | All arguments |
| `$1`, `$2`, `$3`... | Individual arguments |

### Commands with Dynamic Context

```markdown
<!-- .claude/commands/pr-summary.md -->
---
description: Summary of changes for a PR
---

# /pr-summary

Summarize changes since main for a pull request.

Current changes:
!`git diff main --stat`

Modification details:
!`git diff main`
```

## ! - Shell Escape

The `!` symbol executes bash commands directly.

### Direct Bash Mode

Prefix your command with `!`:

```
! npm test
! git status
! docker ps
```

Claude executes the command **without interpretation**, directly in your shell.

### Injecting Results into Prompts

In your slash commands or prompts, use the `` !`command` `` syntax:

```
> Tests are failing. Here's the result: !`npm test 2>&1`
```

### Examples in Slash Commands

```markdown
<!-- .claude/commands/debug-branch.md -->
---
description: Debug current branch
---

# /debug-branch

Current branch: !`git branch --show-current`
Recent commits: !`git log --oneline -5`
Modified files: !`git status --short`
Current diff: !`git diff --stat`

Analyze this information and identify potential issues.
```

### Powerful Combination: @ and !

```
> Here are the TypeScript errors: !`npm run typecheck 2>&1`

  Fix the errors in @src/components/Button.tsx
```

## Summary: The Syntax in Action

Here's a complete workflow using all four symbols:

```bash
# Claude Code session

# 1. Add a rule to context
# Always use absolute imports with @/

# 2. Explore the project
> @explorer find where custom React hooks are defined

# 3. Check Git status
! git status

# 4. Analyze a file with context
> Refactor @src/hooks/useAuth.ts
  Here are the current tests: !`npm test -- useAuth 2>&1`

# 5. Use a custom command
/review src/hooks/useAuth.ts

# 6. Check cost
/cost
```

## Practical Exercise

Create your first custom slash command:

1. Create the `.claude/commands/` folder if it doesn't exist
2. Create a `test-file.md` file:

```markdown
---
description: Run tests for a specific file
---

# /test-file

Run tests for file $1 and analyze the results.

Test results:
!`npm test -- $1 2>&1`

If tests fail, suggest corrections.
```

3. Test with `/test-file src/utils/helpers`

## What's Coming Tomorrow

In **[Day 3](/en/claude-code-workflow-explore-plan-code-test/)**, we'll discover **the Explore → Plan → Code → Test workflow**, the methodology that distinguishes senior developers from juniors when using Claude Code.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 1: Installation and First Steps](/en/claude-code-installation-first-steps/)*
