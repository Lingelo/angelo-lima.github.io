---
layout: post
title: "Prompt Engineering for Claude Code"
subtitle: "Day 4 - Techniques to get exactly what you want"
description: "Advanced prompt engineering techniques for Claude Code. Structure your requests, provide the right context, and avoid common mistakes."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-4
categories: en
---

You now master the Explore → Plan → Code → Test workflow. But the quality of results depends enormously on **how** you formulate your requests. Today, we'll cover prompt engineering techniques specific to Claude Code.

## The Fundamental Principle: Specificity

The difference between a good and bad prompt:

| Bad prompt | Good prompt |
|------------|-------------|
| "Add tests" | "Add unit tests for the `calculateDiscount` function covering: negative price, discount > 100%, and nominal case" |
| "Fix the bug" | "The bug: `TypeError: Cannot read property 'id' of undefined` at line 42 of `@src/api/users.ts`. Fix by adding a null check." |
| "Improve the code" | "Refactor `@src/utils/helpers.ts` to extract validation functions into a separate `validators.ts` module" |

## Structure of an Effective Prompt

### The CCAR Template

```
CONTEXT: [Current situation]
CONSTRAINTS: [Limitations to respect]
ACTION: [What you want]
RESULT: [Expected format]
```

### Applied Example

```
> CONTEXT: I have a React component `UserProfile` that's 300 lines.
  It handles display, API calls, and form validation.

  CONSTRAINTS:
  - Keep compatibility with existing tests
  - Don't change public props
  - Use existing hooks in @src/hooks/

  ACTION: Split this component following the Container/Presenter pattern.

  RESULT: Show me the split plan before coding.
```

## Advanced Techniques

### 1. Provide Examples (Few-shot)

```
> I want utility functions to follow this pattern:

  /**
   * Calculates price including tax from price excluding tax
   * @param priceExTax - Price excluding tax
   * @param vatRate - VAT rate (e.g., 0.20 for 20%)
   * @returns Price including tax rounded to 2 decimals
   * @throws {InvalidPriceError} If price is negative
   */
  export function calculateIncTax(priceExTax: number, vatRate: number): number {
    if (priceExTax < 0) throw new InvalidPriceError('Price cannot be negative');
    return Math.round((priceExTax * (1 + vatRate)) * 100) / 100;
  }

  Create a `calculateDiscount` function that follows exactly this pattern.
```

### 2. Specify Negative Constraints

What you **don't want** is equally important:

```
> Refactor this code with these constraints:

  DO NOT:
  - Add new dependencies
  - Modify public function signatures
  - Change observable behavior
  - Use any or as unknown

  DO:
  - Extract duplicated functions
  - Improve typing
  - Add early returns
```

### 3. Ask for Multiple Options

```
> Propose 3 different approaches to implement request caching:

  1. A simple approach with Map
  2. An approach with TTL and invalidation
  3. An approach with Redis

  For each approach, indicate: complexity, advantages, disadvantages.
```

### 4. Use File Context

```
> By analyzing @src/api/users.ts and @src/api/products.ts,
  identify the common pattern and create a generic factory
  for CRUD endpoints.
```

### 5. Chain Requests

Instead of one big request, chain them:

```
> Step 1: List performance issues in @src/components/DataTable.tsx

[Claude lists 5 issues]

> Step 2: For issue #2 (unnecessary re-renders), propose a solution

[Claude proposes]

> Step 3: Implement this solution with useMemo
```

## Prompt Patterns for Common Cases

### Debugging

```
> BUG: [Description]
  ERROR: [Exact error message]
  FILE: @path/to/file.ts:LINE
  REPRODUCTION: [Steps to reproduce]

  Analyze and propose a fix.
```

### Code Review

```
> Review @src/features/checkout/payment.ts checking:

  1. Security (injection, XSS, validation)
  2. Error handling (try/catch, business errors)
  3. Performance (N+1, memory)
  4. Maintainability (naming, complexity)

  Format: list issues by category with severity (critical/medium/low)
```

### Refactoring

```
> Refactor @src/legacy/oldModule.ts:

  OBJECTIVE: Migrate to the new pattern used in @src/modules/newModule.ts
  KEEP: Existing tests must pass
  REMOVE: Dead code identified by ESLint
  ADD: Strict TypeScript types
```

### Documentation

```
> Generate JSDoc documentation for @src/lib/auth.ts:

  - Description of each public function
  - @param with types and descriptions
  - @returns with type and description
  - @throws for possible errors
  - @example with a use case

  Style: concise, technical, no fluff
```

### Tests

```
> Generate tests for @src/services/orderService.ts:

  FRAMEWORK: Vitest
  PATTERN: Arrange-Act-Assert
  COVERAGE:
  - Nominal case (happy path)
  - Error cases (validation, DB, network)
  - Edge cases (null, undefined, empty)

  MOCKS: Use factories in @tests/factories/
```

## Keywords That Change Everything

### For Thinking

| Keyword | Effect |
|---------|--------|
| `think` | Basic reflection |
| `think hard` | Deep reflection |
| `think harder` | Thorough analysis |
| `ultrathink` | Maximum reflection |
| `step by step` | Explicit decomposition |
| `analyze` | Focus on analysis vs action |

### For Format

| Keyword | Effect |
|---------|--------|
| `concise` | Short answers |
| `detailed` | Complete explanations |
| `list` | Bullet point format |
| `table` | Markdown table format |
| `code only` | No explanations, just code |

### For Action

| Keyword | Effect |
|---------|--------|
| `don't code yet` | Force plan mode |
| `show before applying` | Preview changes |
| `one step at a time` | Incremental implementation |
| `suggest alternatives` | Multiple options |

## Common Mistakes to Avoid

### 1. The Vague Prompt

❌ **Bad**:
```
> Improve this code
```

✅ **Good**:
```
> Improve @src/utils/date.ts by:
  1. Replacing moment.js with date-fns
  2. Adding strict typing
  3. Adding tests for timezone edge cases
```

### 2. Too Much at Once

❌ **Bad**:
```
> Create a complete authentication system with OAuth, 2FA, sessions,
  rate limiting, audit logs, and admin dashboard
```

✅ **Good**:
```
> Step 1: Create the database schema for authentication
  (users, sessions, oauth_accounts)
```

### 3. No Context

❌ **Bad**:
```
> Why doesn't this work?
```

✅ **Good**:
```
> This function returns undefined instead of the user object:

  @src/api/users.ts:42-55

  Expected input: { email: "test@example.com" }
  Expected output: { id: 1, email: "test@example.com", name: "Test" }
  Actual output: undefined

  Here are the logs: !`npm run debug:users 2>&1`
```

### 4. Ignoring Project Constraints

❌ **Bad**:
```
> Use Redux for state management
```

✅ **Good**:
```
> Using Zustand (already configured in @src/store/),
  add a store to manage the shopping cart
```

## Optimized CLAUDE.md Template

Here's a `CLAUDE.md` template that drastically improves responses:

```markdown
# CLAUDE.md

## Project Context
[Application type, tech stack, business constraints]

## Code Conventions
- Naming: [camelCase, PascalCase, etc.]
- Structure: [Feature-based, Layer-based, etc.]
- Patterns: [Hooks, HOC, Render Props, etc.]

## Useful Commands
- `npm run dev`: Development
- `npm run test`: Tests
- `npm run lint`: Linting
- `npm run typecheck`: TypeScript

## Strict Rules
- NEVER modify files in /config/
- NEVER commit .env files
- ALWAYS use strict types (no any)
- ALWAYS add tests for new code

## Tech Stack
- Framework: [Next.js 14, etc.]
- State: [Zustand, etc.]
- DB: [PostgreSQL + Prisma, etc.]
- Tests: [Vitest + Testing Library, etc.]

## Good Code Examples
See @src/features/auth/ for the pattern to follow.
```

## What's Coming Tomorrow

In **Day 5**, we'll dive into **context and memory management**: how Claude Code remembers your preferences and how to optimize long sessions.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 3: The Explore → Plan → Code → Test Workflow](/en/claude-code-workflow-explore-plan-code-test/)*
