---
layout: post
title: "Status Line and Terminal Customization"
subtitle: "Day 18 - Configure Claude Code display"
description: "Customize Claude Code: status line, vim mode, terminal themes, keyboard shortcuts, and advanced interface configuration."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code-series.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-18
categories: en
---

Claude Code runs in your terminal. Did you know you can customize its appearance and behavior? Let's see how to adapt the interface to your preferences.

## The Status Line

### What is the status line?

The bar at the bottom of the screen that displays:
- Active model
- Tokens used
- Session cost
- Connection status

### Customize the status line

Via the `/config` command:

```
/config
```

Status line options:
- **Minimal**: Just the model
- **Standard**: Model + tokens
- **Detailed**: Everything (model, tokens, cost, latency)
- **Hidden**: No status line

### Configuration in settings

```json
{
  "statusLine": {
    "style": "detailed",
    "showCost": true,
    "showTokens": true,
    "showModel": true,
    "showLatency": false
  }
}
```

## Vim Mode

### Enable vim mode

```
/vim
```

Or at launch:

```bash
claude --vim
```

### Available vim shortcuts

| Mode | Key | Action |
|------|-----|--------|
| Normal | `i` | Insert mode |
| Normal | `v` | Visual mode |
| Normal | `dd` | Delete line |
| Normal | `yy` | Copy line |
| Normal | `p` | Paste |
| Normal | `/` | Search |
| Insert | `Esc` | Normal mode |

### Vim configuration

```json
{
  "editor": {
    "mode": "vim",
    "lineNumbers": true,
    "relativNumbers": false
  }
}
```

## Themes and Colors

### Built-in themes

Claude Code adapts to your terminal theme. To force a theme:

```bash
export CLAUDE_CODE_THEME=dark
```

Options:
- `dark`: Dark background
- `light`: Light background
- `auto`: Automatic detection

### Custom colors

In your terminal config file (.zshrc, .bashrc):

```bash
# Claude Code colors
export CLAUDE_CODE_COLOR_PRIMARY="#00ff00"
export CLAUDE_CODE_COLOR_SECONDARY="#0066ff"
export CLAUDE_CODE_COLOR_ERROR="#ff0000"
export CLAUDE_CODE_COLOR_SUCCESS="#00ff00"
```

## Keyboard Shortcuts

### Default shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift+Enter` | New line |
| `Ctrl+C` | Cancel/Interrupt |
| `Ctrl+L` | Clear screen |
| `Esc Esc` | Rewind menu |
| `Shift+Tab` | Accept Edits mode |
| `↑` / `↓` | Prompt history |
| `Tab` | Autocompletion |

### Customize shortcuts

```json
{
  "keybindings": {
    "submit": "Enter",
    "newLine": "Shift+Enter",
    "cancel": "Ctrl+C",
    "clearScreen": "Ctrl+L",
    "rewind": "Esc Esc",
    "acceptEdits": "Shift+Tab",
    "history.up": "ArrowUp",
    "history.down": "ArrowDown"
  }
}
```

## Autocompletion

### File completion

Type `@` then Tab to see available files:

```
@sr[Tab]
→ @src/
→ @src/api/
→ @src/components/
```

### Command completion

Type `/` then Tab:

```
/co[Tab]
→ /compact
→ /config
→ /cost
```

### Smart completion

Claude Code suggests completions based on:
- Current context
- Command history
- Project files

## Advanced Terminal Configuration

### History size

```json
{
  "history": {
    "maxSize": 1000,
    "saveToDisk": true
  }
}
```

### Scroll buffer

```json
{
  "terminal": {
    "scrollback": 10000,
    "wordWrap": true
  }
}
```

### Display format

```json
{
  "display": {
    "codeBlockStyle": "bordered",
    "syntaxHighlighting": true,
    "lineNumbers": true,
    "diffStyle": "unified"
  }
}
```

## Shell Integration

### Useful aliases

Add to your `.zshrc` or `.bashrc`:

```bash
# Launch Claude Code
alias cc='claude'

# Claude Code with specific model
alias ccs='claude --model sonnet'
alias cco='claude --model opus'
alias cch='claude --model haiku'

# Continue last session
alias ccr='claude -c'

# Claude Code in print mode
alias ccp='claude -p'
```

### Shell functions

```bash
# Analyze a file with Claude
analyze() {
  cat "$1" | claude -p "Analyze this file and identify potential issues"
}

# Generate tests for a file
gentest() {
  claude -p "Generate tests for @$1" --allowedTools Read,Write
}

# Quick review
review() {
  git diff | claude -p "Review these changes"
}
```

## Terminal Multiplexers

### With tmux

```bash
# Create a Claude Code session
tmux new-session -s claude

# In tmux
claude

# Detach: Ctrl+B, D
# Reattach: tmux attach -t claude
```

### Recommended tmux configuration

```bash
# ~/.tmux.conf

# Status bar for Claude Code
set -g status-right '#[fg=green]Claude #[fg=white]| #[fg=cyan]%H:%M'

# Adapted colors
set -g default-terminal "screen-256color"
```

### With screen

```bash
screen -S claude
claude
# Detach: Ctrl+A, D
# Reattach: screen -r claude
```

## Notifications

### Task completion notifications

```json
{
  "notifications": {
    "onTaskComplete": true,
    "onError": true,
    "sound": false
  }
}
```

### System notifications

With libnotify (Linux):

```bash
claude -p "Long task" && notify-send "Claude finished"
```

With osascript (macOS):

```bash
claude -p "Long task" && osascript -e 'display notification "Claude finished"'
```

## Configuration Profiles

### Create profiles

```bash
~/.claude/
├── profiles/
│   ├── work.json
│   ├── personal.json
│   └── ci.json
└── settings.json
```

### "work" profile

```json
{
  "model": "sonnet",
  "statusLine": { "style": "detailed" },
  "editor": { "mode": "vim" }
}
```

### "ci" profile

```json
{
  "model": "haiku",
  "statusLine": { "style": "hidden" },
  "notifications": { "enabled": false }
}
```

### Load a profile

```bash
claude --profile work
```

## Accessibility

### High contrast mode

```json
{
  "accessibility": {
    "highContrast": true,
    "largeText": false,
    "screenReaderFriendly": true
  }
}
```

### Disable animations

```json
{
  "display": {
    "animations": false,
    "progressIndicator": "text"
  }
}
```

## Complete Configuration Template

```json
{
  "statusLine": {
    "style": "detailed",
    "showCost": true,
    "showTokens": true,
    "showModel": true
  },
  "editor": {
    "mode": "vim",
    "lineNumbers": true
  },
  "display": {
    "codeBlockStyle": "bordered",
    "syntaxHighlighting": true,
    "diffStyle": "unified",
    "animations": true
  },
  "history": {
    "maxSize": 1000,
    "saveToDisk": true
  },
  "keybindings": {
    "submit": "Enter",
    "newLine": "Shift+Enter",
    "cancel": "Ctrl+C"
  },
  "notifications": {
    "onTaskComplete": true,
    "onError": true
  }
}
```

## What's Coming Tomorrow

In **Day 19**, we'll do a **comparison: Claude Code vs Cursor vs GitHub Copilot** - understand each tool's strengths.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 17: Troubleshooting](/en/claude-code-troubleshooting/)*
