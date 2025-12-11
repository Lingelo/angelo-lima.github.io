---
layout: post
title: "Hooks: Automating Event Reactions"
subtitle: "Day 12 - Trigger automatic actions in Claude Code"
description: "Master Claude Code hooks: 9 event types, configuration, use cases for security, formatting, and automation."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-12
categories: en
---

Hooks allow you to execute automatic actions in response to Claude Code events. They're the bridge between Claude and your development tools. Today, we'll see how to use and create them.

## What is a Hook?

A hook is an **event handler** that executes when Claude Code does something specific:
- Before/after tool execution
- At session start/end
- When user submits a prompt
- etc.

## The 9 Hook Types

| Hook | Trigger | Can Block |
|------|---------|-----------|
| `SessionStart` | Session start | No |
| `SessionEnd` | Session end | No |
| `PreToolUse` | Before tool execution | **Yes** |
| `PostToolUse` | After tool execution | No |
| `UserPromptSubmit` | Prompt submission | **Yes** |
| `Notification` | Claude notification | No |
| `Stop` | User stop | No |
| `SubagentStop` | Subagent end | No |
| `PreCompact` | Before context compaction | No |

## Hook Configuration

### Location

In `.claude/settings.json`:

```json
{
  "hooks": {
    "HookName": [
      {
        "matcher": "optional-pattern",
        "hooks": [
          {
            "type": "command",
            "command": "path/to/script.sh"
          }
        ]
      }
    ]
  }
}
```

### Hook Structure

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write $FILE"
          }
        ]
      }
    ]
  }
}
```

**Explanation:**
- `PostToolUse`: Triggers after tool use
- `matcher: "Edit"`: Only when "Edit" tool is used
- `command`: The command to execute

## Useful Hook Examples

### Hook: Auto-format After Edit

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write $EDITED_FILE"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write $WRITTEN_FILE"
          }
        ]
      }
    ]
  }
}
```

### Hook: Git Check Before Exit

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/git-check.sh"
          }
        ]
      }
    ]
  }
}
```

`git-check.sh` script:

```bash
#!/bin/bash

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  Warning: uncommitted changes!"
    git status --short
fi
```

### Hook: Block Dangerous Patterns

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/security-check.sh"
          }
        ]
      }
    ]
  }
}
```

`security-check.sh` script:

```bash
#!/bin/bash

# Read command from stdin
read -r command

# Dangerous patterns
dangerous_patterns=(
    "rm -rf /"
    "rm -rf ~"
    "sudo rm"
    "> /dev/"
    "mkfs"
    "dd if="
    "chmod 777"
)

for pattern in "${dangerous_patterns[@]}"; do
    if [[ "$command" == *"$pattern"* ]]; then
        echo "BLOCKED: Dangerous command detected: $pattern"
        exit 1  # Exit 1 = block action
    fi
done

exit 0  # Exit 0 = allow
```

### Hook: Log Actions

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/log-action.sh"
          }
        ]
      }
    ]
  }
}
```

`log-action.sh` script:

```bash
#!/bin/bash

# Read tool info from stdin (JSON)
read -r json

# Extract info with jq
tool=$(echo "$json" | jq -r '.tool')
timestamp=$(date +"%Y-%m-%d %H:%M:%S")

# Log
echo "[$timestamp] Tool: $tool" >> ~/.claude/logs/actions.log
```

### Hook: Task Completion Notification

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/notify.sh"
          }
        ]
      }
    ]
  }
}
```

`notify.sh` script (macOS):

```bash
#!/bin/bash
osascript -e 'display notification "Claude has finished" with title "Claude Code"'
```

`notify.sh` script (Linux):

```bash
#!/bin/bash
notify-send "Claude Code" "Claude has finished"
```

### Hook: Environment Setup at Start

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/session-start.sh"
          }
        ]
      }
    ]
  }
}
```

`session-start.sh` script:

```bash
#!/bin/bash

# Activate Python virtual environment if present
if [[ -f ".venv/bin/activate" ]]; then
    source .venv/bin/activate
fi

# Load environment variables
if [[ -f ".env.development" ]]; then
    export $(grep -v '^#' .env.development | xargs)
fi

# Check prerequisites
command -v node >/dev/null || echo "⚠️  Node.js not found"
command -v npm >/dev/null || echo "⚠️  npm not found"
```

## Matcher Patterns

### No Matcher (All Events)

```json
{
  "matcher": "",
  "hooks": [...]
}
```

### Match Specific Tool

```json
{
  "matcher": "Bash",
  "hooks": [...]
}
```

### Match with Regex

```json
{
  "matcher": "Bash\\(npm.*\\)",
  "hooks": [...]
}
```

## Available Data

Hooks receive data via **stdin** in JSON format:

### PreToolUse / PostToolUse

```json
{
  "tool": "Edit",
  "input": {
    "file_path": "/path/to/file.ts",
    "old_string": "...",
    "new_string": "..."
  },
  "output": "..." // Only for PostToolUse
}
```

### SessionStart

```json
{
  "cwd": "/path/to/project",
  "model": "claude-sonnet-4-5-20250929",
  "sessionId": "abc123"
}
```

## Blocking Actions

A `PreToolUse` or `UserPromptSubmit` hook can **block** the action:

```bash
# Exit code 0 = allow
exit 0

# Exit code != 0 = block
exit 1
```

Block message:

```bash
echo "BLOCKED: Reason for blocking"
exit 1
```

## Hook Security

### ⚠️ Warning

Hooks execute with **your user permissions**. A malicious hook could:
- Read your files
- Exfiltrate data
- Modify your system

### Best Practices

1. **Check the code** before adding an external hook
2. **Test in isolation** in a safe environment
3. **Limit permissions** of scripts
4. **Regularly audit** installed hooks

## Debugging Hooks

### Enable Logs

```bash
CLAUDE_CODE_DEBUG=hooks claude
```

### Test Script Manually

```bash
echo '{"tool": "Edit", "input": {...}}' | ./my-hook.sh
echo $?  # Check exit code
```

## Recommended Organization

```
~/.claude/
├── hooks/
│   ├── security-check.sh
│   ├── git-check.sh
│   ├── log-action.sh
│   ├── notify.sh
│   └── session-start.sh
├── logs/
│   └── actions.log
└── settings.json
```

## What's Coming Tomorrow

In **Day 13**, we'll see **MCP: Connecting Claude Code to Your Tools** - how to integrate GitHub, Jira, databases, and other external services.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 11: Plugins and Marketplace](/en/claude-code-plugins-marketplace/)*
