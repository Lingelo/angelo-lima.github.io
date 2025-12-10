---
layout: post
title: "Subagents: Delegating Intelligently"
subtitle: "Day 9 - Create specialized agents for complex tasks"
description: "Master Claude Code subagents: built-in agents, custom agent creation, context isolation, and efficient task delegation."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code-series.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-9
categories: en
---

Slash commands automate workflows. **Subagents** go further: they're specialized AI agents with their own context, instructions, and tools. Today, we'll learn to use and create them.

## What is a Subagent?

A subagent is a dedicated Claude agent that:
- Operates in a **separate context** from the main conversation
- Has its own **system instructions**
- Has access to **specific tools**
- Can be invoked for specialized tasks

### Subagent Advantages

| Advantage | Description |
|-----------|-------------|
| Isolation | No pollution of main context |
| Specialization | Instructions optimized for a task |
| Reusability | Shareable across projects |
| Control | Tools limited by need |

## Built-in Subagents

Claude Code includes three default subagents:

### @explorer

```
> @explorer Where is the calculateDiscount function defined?
```

| Characteristic | Value |
|----------------|-------|
| Model | Haiku (fast, economical) |
| Mode | Read-only |
| Usage | Search and exploration |
| Tools | Read, Grep, Glob |

Ideal for:
- Finding definitions
- Understanding architecture
- Locating patterns

### @planner

```
> @planner Propose a plan to migrate from REST to GraphQL
```

| Characteristic | Value |
|----------------|-------|
| Model | Sonnet |
| Mode | Read-only + reflection |
| Usage | Planning |
| Tools | Read, Grep, Glob |

Ideal for:
- Planning refactoring
- Architecting features
- Evaluating approaches

### @general-purpose

General-purpose agent for complex multi-step tasks.

| Characteristic | Value |
|----------------|-------|
| Model | Sonnet |
| Mode | Read/write |
| Usage | Complex tasks |
| Tools | All |

## Creating a Custom Subagent

### Method 1: Interactive Interface

```
/agents
```

This command opens an interface to:
- View existing agents
- Create new agents
- Modify parameters

### Method 2: Markdown File

Create a file in `.claude/agents/`:

```markdown
<!-- .claude/agents/security-auditor.md -->
---
name: security-auditor
description: Application security audit expert
tools: Read, Grep, Glob
model: claude-sonnet-4-5-20250929
---

You are an application security expert with 15 years of experience.

## Your Role
Analyze code to identify security vulnerabilities.

## Methodology
1. Identify entry points (user inputs)
2. Trace data flow
3. Look for dangerous patterns
4. Propose fixes

## Vulnerabilities to Look For
- SQL Injection
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- Command injection
- Path traversal
- Sensitive data exposure
- Broken authentication/authorization

## Report Format
For each vulnerability:
- **File**: file path
- **Line**: line number
- **Severity**: Critical / High / Medium / Low
- **Description**: problem explanation
- **Impact**: possible consequences
- **Fix**: corrected code
```

### Method 3: Assisted Generation

```
/agents

> Create an agent specialized in TypeScript code review
```

Claude generates a template you can customize.

## Agent File Structure

### The Frontmatter

```yaml
---
name: agent-name           # Unique identifier (required)
description: Description   # Shown during invocation
tools: Read, Grep, Glob    # Authorized tools
model: claude-sonnet-4-5-20250929  # Or "inherit" to inherit
---
```

### Model Options

| Value | Description |
|-------|-------------|
| `inherit` | Uses main session model |
| `claude-sonnet-4-5-20250929` | Specific Sonnet |
| `claude-3-5-haiku-20241022` | Haiku for light tasks |

### The Body: System Prompt

Everything after the frontmatter becomes the agent's **system prompt**.

## Useful Subagent Examples

### Code Reviewer Agent

```markdown
---
name: code-reviewer
description: In-depth code review
tools: Read, Grep, Glob
model: inherit
---

You are a senior developer with clean code expertise.

## Mission
Perform constructive and actionable code reviews.

## Points to Check
1. **Readability**: Is the code self-documenting?
2. **Maintainability**: Easy to modify?
3. **Performance**: Obvious issues?
4. **Tests**: Sufficient coverage?
5. **Security**: Vulnerabilities?

## Feedback Style
- Constructive and kind
- Always propose an alternative
- Prioritize by importance
- Explain the "why"
```

### Test Writer Agent

```markdown
---
name: test-writer
description: Generate comprehensive tests
tools: Read, Write, Bash(npm test:*)
model: inherit
---

You specialize in writing tests.

## Framework
- Vitest for unit tests
- Testing Library for components
- MSW for API mocks

## Methodology
1. Analyze the code to test
2. Identify cases: nominal, errors, edge cases
3. Write tests with AAA pattern (Arrange-Act-Assert)
4. Verify tests pass

## Conventions
- One test file per module
- Clear descriptions
- Mocks in __mocks__/
- Factories in tests/factories/
```

### Documentation Agent

```markdown
---
name: doc-writer
description: Generate technical documentation
tools: Read, Grep, Glob, Write
model: inherit
---

You are an experienced technical writer.

## Mission
Generate clear and complete documentation.

## Documentation Types
- JSDoc for functions
- README for modules
- ADR for architecture decisions
- Guides for new developers

## Style
- Concise but complete
- Working code examples
- Consistent structure
- Accessible to juniors
```

### Refactoring Agent

```markdown
---
name: refactor-expert
description: Refactoring and clean code expert
tools: Read, Write, Edit, Bash(npm test:*)
model: claude-sonnet-4-5-20250929
---

You are a refactoring expert with a cautious approach.

## Principles
- Small incremental changes
- Green tests before and after
- No behavior change
- One commit per refactoring

## Patterns to Apply
- Extract Method
- Extract Class
- Replace Conditional with Polymorphism
- Introduce Parameter Object
- Replace Magic Number with Constant

## Process
1. Understand current code
2. Identify the smell
3. Choose appropriate refactoring
4. Verify tests
5. Apply
6. Re-verify tests
```

## Invoking a Subagent

### Basic Syntax

```
> @agent-name Your request here
```

### Examples

```
> @security-auditor Analyze src/api/auth.ts for security flaws

> @test-writer Write tests for src/utils/validation.ts

> @refactor-expert The file src/services/user.ts is 500 lines, propose a split
```

## Agent Scope

### Project Agents

```
.claude/agents/
└── my-agent.md
```

Available only in this project.

### User Agents

```
~/.claude/agents/
└── my-agent.md
```

Available in all your projects.

## Best Practices

### 1. One Agent = One Responsibility

❌ **Bad**: Agent that does review + tests + documentation
✅ **Good**: Three specialized agents

### 2. Precise Instructions

The more detailed the system prompt, the better the results.

### 3. Minimal Tools

Give only the necessary tools:

```yaml
# Read-only agent
tools: Read, Grep, Glob

# Agent with controlled writing
tools: Read, Write, Bash(npm test:*)
```

### 4. Test Your Agents

Before sharing with the team, test on multiple use cases.

## What's Coming Tomorrow

In **Day 10**, we'll discover **Skills**: capabilities that Claude invokes **automatically** based on context, without you having to call them explicitly.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 8: Custom Slash Commands](/en/claude-code-custom-slash-commands/)*
