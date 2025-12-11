---
layout: post
title: "Claude Code in VS Code and JetBrains"
subtitle: "Day 14 - The graphical experience in your favorite IDEs"
description: "Integrate Claude Code into VS Code and JetBrains: installation, configuration, features, and comparison with the terminal experience."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-14
categories: en
---

So far, we've used Claude Code in the terminal. But there are also extensions for **VS Code** and **JetBrains**. Let's see how to leverage the graphical interface.

## Two Complementary Approaches

| Aspect | Terminal | IDE |
|--------|----------|-----|
| Speed | ⭐⭐⭐ | ⭐⭐ |
| Visualization | Text only | Visual diffs |
| Integration | Native shell | IDE workspace |
| Flexibility | Maximum | Guided |

## Claude Code for VS Code

### Installation

1. Open VS Code
2. Extensions (Ctrl+Shift+X)
3. Search for "Claude Code"
4. Install the official Anthropic extension

Or via terminal:

```bash
code --install-extension anthropic.claude-code
```

### Configuration

After installation, configure via VS Code settings:

```json
{
  "claude-code.apiKey": "${env:ANTHROPIC_API_KEY}",
  "claude-code.model": "claude-sonnet-4-20250514",
  "claude-code.autoApprove": false
}
```

### VS Code Features

#### Claude Code Panel

Accessible via the icon in the sidebar or `Ctrl+Shift+P` → "Claude Code: Open Panel".

#### Available Commands

| Command | Shortcut | Description |
|---------|----------|-------------|
| Open Panel | `Ctrl+Shift+C` | Open Claude panel |
| Explain Selection | `Ctrl+Shift+E` | Explain selected code |
| Fix Selection | `Ctrl+Shift+F` | Fix selected code |
| Generate Tests | `Ctrl+Shift+T` | Generate tests |

#### Inline Suggestions

Claude can suggest modifications directly in the editor:

1. Select code
2. Right-click → "Ask Claude"
3. Describe the desired modification
4. View the diff and accept/reject

### Typical VS Code Workflow

```
1. Open Claude Code panel
2. Describe the task
3. Claude proposes modifications
4. Review the diff in the editor
5. Accept or request adjustments
```

## Claude Code for JetBrains

### Supported IDEs

- IntelliJ IDEA
- PyCharm
- WebStorm
- PhpStorm
- GoLand
- Rider
- And all other JetBrains IDEs

### Installation

1. Settings → Plugins
2. Marketplace → Search "Claude Code"
3. Install and restart IDE

Or via the JetBrains Marketplace website.

### Configuration

```
Settings → Tools → Claude Code
```

Available options:
- API Key
- Default model
- Auto-approval level
- VCS integration

### JetBrains Features

#### Tool Window

Accessible via View → Tool Windows → Claude Code.

#### Context Actions

Right-click on code:
- "Ask Claude about this"
- "Refactor with Claude"
- "Generate tests with Claude"
- "Add documentation with Claude"

#### VCS Integration

Claude Code integrates with JetBrains Git features:
- Generated commit messages
- Assisted diff reviews
- PR descriptions

### Smart Inspections

Claude can integrate with JetBrains inspections:

```
Settings → Editor → Inspections → Claude Code
```

- Code smell detection
- Refactoring suggestions
- Security warnings

## Experience Comparison

### Terminal: The Power

```bash
claude

> Refactor the entire auth module to use JWT
> Then create the tests
> And update the documentation

# Claude works on multiple files in sequence
```

Advantages:
- Complex commands at once
- Automated workflows
- Scripts and pipes
- Maximum performance

### IDE: The Visualization

Advantages:
- Side-by-side visual diffs
- Easier code navigation
- Integration with IDE tools
- More intuitive review

### My Advice

Use **both** depending on the task:

| Task | Best choice |
|------|-------------|
| Massive refactoring | Terminal |
| Quick fix | IDE |
| New project | Terminal |
| Code review | IDE |
| Automation | Terminal |
| Code discovery | IDE |

## Synchronization Between Both

### The Same CLAUDE.md

Both interfaces read the same `CLAUDE.md`:

```markdown
# CLAUDE.md

## Conventions
- Strict TypeScript
- Tests with Vitest
- Conventional commits
```

These rules apply whether you use terminal or IDE.

### The Same Permissions

The `.claude/settings.json` file is shared:

```json
{
  "permissions": {
    "allow": ["Bash(npm run:*)"],
    "deny": ["Read(./.env)"]
  }
}
```

### Separate Sessions

Each interface has its own sessions. A `/compact` in the terminal doesn't affect the IDE extension.

## Advanced IDE Features

### Quick Actions (VS Code)

```
Ctrl+. on selected code
→ "Claude: Suggest improvement"
→ "Claude: Explain this"
→ "Claude: Find bugs"
```

### Live Templates (JetBrains)

Create templates that invoke Claude:

```
Settings → Editor → Live Templates → + Claude Code
```

Template example:
```
Abbreviation: cdoc
Description: Generate documentation with Claude
Template text: // $SELECTION$ - TODO: Ask Claude for documentation
```

### Assisted Debugging

In both IDEs, Claude can help with debugging:

1. Place a breakpoint
2. Start debugging
3. On exception: "Ask Claude why this failed"
4. Claude analyzes context and stack trace

## Optimal Configuration

### VS Code settings.json

```json
{
  "claude-code.model": "claude-sonnet-4-20250514",
  "claude-code.autoApprove": false,
  "claude-code.showInlineHints": true,
  "claude-code.diffViewMode": "sideBySide",
  "claude-code.contextSize": "auto",
  "editor.inlineSuggest.enabled": true
}
```

### JetBrains settings

```
Tools → Claude Code:
  ☑ Show inline suggestions
  ☑ Enable context-aware completions
  ☐ Auto-approve file modifications
  Model: claude-sonnet-4-20250514
  Context window: Auto
```

## IDE Extension Limitations

### Compared to Terminal

| Feature | Terminal | IDE |
|---------|----------|-----|
| Custom subagents | ✅ | ❌ |
| Hooks | ✅ | Partial |
| MCP servers | ✅ | Partial |
| Skills | ✅ | ❌ |
| Plugins marketplace | ✅ | ❌ |
| Headless mode | ✅ | ❌ |

### Recommendation

For **advanced** usage, prefer the terminal. IDE extensions are ideal for:
- Quick fixes
- Visual review
- Users less comfortable with terminal

## Recommended Hybrid Workflow

```
1. Terminal for complex tasks
   claude
   > Plan and implement the new caching system

2. IDE for review and adjustments
   - Open modified files
   - Review diffs visually
   - Quick fixes with extension

3. Terminal to finalize
   claude
   > Create tests and verify everything passes
```

## Extension Troubleshooting

### VS Code: Extension Won't Start

```bash
# Verify installation
code --list-extensions | grep claude

# Reinstall
code --uninstall-extension anthropic.claude-code
code --install-extension anthropic.claude-code
```

### JetBrains: Performance Issues

```
Help → Diagnostic Tools → Activity Monitor
```

If Claude Code consumes too much:
- Reduce context size
- Disable inline suggestions
- Limit scope to open files

## What's Coming Tomorrow

In **Day 15**, we'll go into production mode with **CI/CD and headless mode** - integrating Claude Code into your automation pipelines.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 13: MCP](/en/claude-code-mcp-integration/)*
