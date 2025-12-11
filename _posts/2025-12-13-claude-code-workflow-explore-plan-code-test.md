---
layout: post
title: "The Explore → Plan → Code → Test Workflow"
subtitle: "Day 3 - The methodology that distinguishes senior developers"
description: "Master Claude Code's Explore, Plan, Code, Test workflow. Extended thinking, plan mode, and methodology to avoid the 'almost correct' code syndrome."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-3
categories: en
---

In my article about [the state of AI in development in 2025](/en/ai-development-between-promises-realities-2025-state/), I mentioned the "almost correct" code syndrome: **45% of developers spend more time debugging AI code than writing it themselves**.

The solution? A structured workflow that transforms Claude from a haphazard code generator into a true development partner.

## The Problem: Coding Without Understanding

Most developers use Claude Code like this:

```
> Add an authentication feature
[Claude generates 200 lines of code]
[Developer copy-pastes]
[Bugs, incompatibilities, security issues...]
```

This is **"vibe coding"**: you vaguely describe what you want and hope it works.

## The Solution: The E.P.C.T. Workflow

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ EXPLORE │ ──▶ │  PLAN   │ ──▶ │  CODE   │ ──▶ │  TEST   │
│ (5-10m) │     │ (think) │     │ (apply) │     │ (verify)│
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

## Phase 1: EXPLORE

**Objective**: Understand before acting.

### Using the @explorer Subagent

```
> @explorer How does authentication currently work in this project?
```

The `@explorer` subagent uses the **Haiku** model (fast and economical) in **read-only** mode. It cannot modify files, only read and analyze. For more on subagents, see [Day 9](/en/claude-code-subagents/).

### Typical Explore Phase Questions

```
> @explorer Where are the authentication middlewares defined?

> @explorer What patterns are used for error handling?

> @explorer List all database-related dependencies

> @explorer How are tests organized?
```

### Recommended Duration

**5 to 10 minutes** for a project you're not familiar with. Less if you know the code well.

### Why It's Crucial

Without this phase, Claude makes **assumptions** about your code. With this phase, Claude **knows** how your code works.

## Phase 2: PLAN

**Objective**: Get a detailed plan BEFORE writing code.

### Activating Plan Mode

Two methods:

**Method 1: Keyboard shortcut**
```
Shift+Tab (several times until you see "plan mode")
```

**Method 2: Explicit prompt**
```
> Don't code yet. First propose a detailed plan for adding
  OAuth authentication with Google.
```

### Thinking Levels (Extended Thinking)

Claude Code offers different "thinking" levels:

| Command | Depth | Usage |
|---------|-------|-------|
| `think` | Basic | Simple questions |
| `think hard` | Moderate | Standard problems |
| `think harder` | Deep | Complex problems |
| `ultrathink` | Maximum | Architecture, critical decisions |

### Example Plan Mode Prompt

```
> ultrathink

  I want to add Google OAuth authentication to my Next.js application.

  Context:
  - Currently using JWTs stored in HttpOnly cookies
  - Database is PostgreSQL with Prisma
  - Existing users have email/password

  Propose a detailed plan considering:
  1. Migration of existing users
  2. Coexistence of both auth methods
  3. Security and best practices
  4. Impact on existing tests
```

### What a Good Plan Contains

- **Numbered steps** in order
- **Files to modify** identified
- **Dependencies** to install
- **Points of attention** (security, performance)
- **Tests** to add or modify
- **Complexity estimation**

### Enable Extended Thinking by Default

Extended thinking consumes more tokens - see [Day 16](/en/claude-code-billing-costs/) for cost optimization tips.

Environment variable:
```bash
export MAX_THINKING_TOKENS=10000
```

Or in your configuration:
```json
{
  "model": {
    "extendedThinking": true
  }
}
```

## Phase 3: CODE

**Objective**: Implement the validated plan.

### Validate the Plan Before Coding

```
> The plan looks good. Implement step 1: create the Prisma schema
  for OAuth accounts.
```

### One Step at a Time

Don't ask for everything at once. Proceed step by step:

```
> Implement step 1
[Claude implements]
[You validate]

> Implement step 2
[Claude implements]
[You validate]

...
```

### Use File References

```
> Implement step 3 following the pattern in @src/auth/jwt.ts
```

### If Something Goes Wrong

```
Esc Esc  → Go back (rewind)
```

Rewind options:
1. **Conversation only**: Keep code, go back in conversation
2. **Code only**: Keep conversation, undo code
3. **Both**: Undo everything

## Phase 4: TEST

**Objective**: Verify the implementation works.

### Reverse TDD Approach

Ideally, write tests BEFORE asking for implementation:

```
> Here are the tests the implementation must pass:

  @tests/auth/oauth.test.ts

  Implement the code to make these tests pass.
```

### Post-Implementation Verification

```
> Run the tests and show me the results: !`npm test 2>&1`
```

### Request Test Analysis

```
> Here are the test results: !`npm test 2>&1`

  Analyze the failures and suggest corrections.
```

## Complete Example: E.P.C.T. Workflow

```bash
# CLAUDE CODE SESSION

# === EXPLORE PHASE (5 min) ===
> @explorer How is authentication currently handled?

> @explorer What are the existing API endpoints for auth?

# === PLAN PHASE ===
> ultrathink

  I want to add rate limiting on authentication endpoints
  to prevent brute force attacks.

  Don't code. First propose a detailed plan.

# [Claude proposes a 5-step plan]

> The plan is good, but I'd also like to log blocked attempts.
  Update the plan.

# [Claude updates]

> OK, the plan works for me.

# === CODE PHASE ===
> Implement step 1: install and configure express-rate-limit

> Implement step 2: create the rate limiting middleware

> Implement step 3: apply to auth routes

# === TEST PHASE ===
> Create tests to verify rate limiting works

> !`npm test -- rate-limit 2>&1`

> Tests pass. Verify we haven't broken existing tests:
  !`npm test 2>&1`
```

## Toggle Extended Thinking with Tab

The `Tab` shortcut lets you quickly toggle:

```
[Tab] → Extended Thinking ON (🧠 icon visible)
[Tab] → Extended Thinking OFF
```

Use **ON** for:
- Complex problems
- Architecture decisions
- Difficult debugging
- Planning

Use **OFF** for:
- Simple questions
- Quick commands
- Basic exploration

## Anti-Patterns to Avoid

| Anti-pattern | Problem | Solution |
|--------------|---------|----------|
| Asking everything at once | Incoherent code | One step at a time |
| No Explore phase | False assumptions | 5 min exploration |
| No plan | Constant refactoring | Always plan |
| No tests | Hidden bugs | TDD or post-implementation tests |

## What's Coming Tomorrow

In **[Day 4](/en/claude-code-prompt-engineering/)**, we'll see **prompt engineering techniques specific to Claude Code** to get even better results.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 2: Secret Syntax #@/!](/en/claude-code-secret-syntax/)*
