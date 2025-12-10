---
layout: post
title: "Permissions and Security in Claude Code"
subtitle: "Day 7 - Protect your sensitive files and control actions"
description: "Master Claude Code's permission system: allow/ask/deny, secret protection, permission modes, and security best practices."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code-series.webp"
tags: [IA, Développement, Sécurité]
author: "Angelo Lima"
lang: en
ref: claude-code-day-7
categories: en
---

Claude Code has access to your file system and can execute bash commands. It's powerful, but requires safeguards. Today, we'll see how to secure your environment.

> For deeper context on AI security challenges, see my articles on [LLM jailbreaking](/en/llm-jailbreaking-security-analysis-bypass-mechanisms/) and [robust development practices inspired by NASA](/en/robust-web-development-nasa-methodologies-critical-applications/).

## The Default Permission Model

By default, Claude Code operates in **strict read-only** mode:

| Action | Default Permission |
|--------|-------------------|
| Read files | ✅ Allowed |
| Search (Glob, Grep) | ✅ Allowed |
| Write/Modify files | ❌ Requires approval |
| Execute bash commands | ❌ Requires approval |
| Web access (WebFetch) | ❌ Requires approval |

## Anatomy of the Permission System

### The Three Levels

```json
{
  "permissions": {
    "allow": [...],   // Allowed without asking
    "ask": [...],     // Ask every time
    "deny": [...]     // Systematically refused
  }
}
```

### Rule Syntax

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run:*)",           // All npm run commands
      "Bash(git commit:*)",         // All git commits
      "Read(~/.zshrc)"              // Specific file
    ],
    "ask": [
      "Bash(git push:*)"            // Ask before push
    ],
    "deny": [
      "Read(./.env)",               // Block .env
      "Read(./.env.*)",             // Block .env.local, .env.prod...
      "Read(./secrets/**)",         // Block entire secrets folder
      "WebFetch"                    // Block web requests
    ]
  }
}
```

## Tools and Their Permissions

### Tools Without Required Permission

| Tool | Description |
|------|-------------|
| `Read` | Read file contents |
| `Glob` | Search files by pattern |
| `Grep` | Search within file contents |
| `AskUserQuestion` | Ask user a question |

### Tools Requiring Permission

| Tool | Description | Risk |
|------|-------------|------|
| `Write` | Create/overwrite files | Medium |
| `Edit` | Modify existing files | Medium |
| `Bash` | Execute shell commands | **High** |
| `WebFetch` | Download web content | Medium |
| `WebSearch` | Perform web searches | Low |

## Configuring Permissions

### Method 1: Via /permissions Command

```
/permissions
```

Interactive interface to manage permissions.

### Method 2: In settings.json

File `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(yarn:*)",
      "Bash(pnpm:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./config/credentials.*)",
      "Bash(rm -rf:*)",
      "Bash(sudo:*)"
    ]
  }
}
```

### Method 3: "Always Allow" During Session

When Claude requests permission, you can choose:
- **Allow once**: Allow this time
- **Always allow**: Allow for this session and future ones

## Protecting Sensitive Files

### Recommended Protection Template

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./**/*credentials*)",
      "Read(./**/*secret*)",
      "Read(./**/apikey*)",
      "Read(./config/production.*)",
      "Read(./.git/config)",
      "Read(~/.ssh/**)",
      "Read(~/.aws/**)",
      "Read(~/.kube/**)"
    ]
  }
}
```

### Commonly Sensitive Files

| Type | Examples |
|------|----------|
| Environment variables | `.env`, `.env.local`, `.env.production` |
| Credentials | `credentials.json`, `serviceAccount.json` |
| SSH keys | `~/.ssh/id_rsa`, `~/.ssh/config` |
| Cloud configs | `~/.aws/credentials`, `~/.kube/config` |
| Git secrets | `.git/config` (may contain tokens) |

## Permission Modes

### Mode 1: Individual Approval (Default)

Each sensitive action requires confirmation:

```
Claude wants to execute: npm install lodash
[Allow once] [Always allow] [Deny]
```

### Mode 2: Accept Edits

Automatically accepts file modifications but asks for bash commands:

```
Shift+Tab → Accept Edits mode
```

### Mode 3: YOLO (Dangerous)

⚠️ **Not recommended in production**

```bash
claude --dangerously-skip-permissions
```

All actions are automatically approved. Use only:
- In isolated environments (containers)
- For controlled automated scripts
- Never on your main development machine

## Risky Bash Commands

### Recommended Blocklist

```json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(rm -r:*)",
      "Bash(sudo:*)",
      "Bash(chmod 777:*)",
      "Bash(curl|sh)",
      "Bash(wget|sh)",
      "Bash(> /dev:*)",
      "Bash(mkfs:*)",
      "Bash(dd:*)"
    ]
  }
}
```

### Automatic Detection

Claude Code automatically detects suspicious patterns:
- Command injection
- Pipes to shells
- Dangerous redirections

Even if a command is in `allow`, suspicious patterns trigger a request.

## Permissions for Teams

### Shared .claude/settings.json File

Commit this file to your repo for consistent team permissions:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run:*)",
      "Bash(npm test:*)",
      "Bash(git:*)"
    ],
    "deny": [
      "Read(./.env*)",
      "Bash(npm publish:*)"
    ]
  }
}
```

### Enterprise Permissions

For organizations, global policies can be defined:

```
Enterprise Policy (highest priority)
    │
    ├─ deny: Read(./secrets/**)
    ├─ deny: Bash(curl:*)
    └─ deny: WebFetch
```

These rules cannot be overridden by users.

## Audit and Monitoring

### Action Logs

Claude Code can log all actions for audit:

```bash
CLAUDE_CODE_ENABLE_TELEMETRY=1 claude
```

### Available Metrics

- Bash commands executed
- Files modified
- Tokens consumed
- Errors and denials

## Security Best Practices

### 1. Principle of Least Privilege

```json
{
  "permissions": {
    "allow": [
      // Only what's necessary
      "Bash(npm run dev)",
      "Bash(npm run test)",
      "Bash(npm run lint)"
    ]
    // Everything else requires approval
  }
}
```

### 2. Systematic Review

Before approving a bash command:
- Read the complete command
- Check the arguments
- Be wary of pipes and redirections

### 3. Isolated Environments for Experimentation

```bash
# Use Docker for risky tests
docker run -it --rm -v $(pwd):/app node:18 bash
```

### 4. Hook Verification

Claude Code hooks have access to environment credentials. Before adding a hook:
- Check the source code
- Test in an isolated environment

### 5. Secret Rotation

If you suspect exposure:
1. Immediately revoke tokens/keys
2. Audit Claude Code logs
3. Generate new secrets

## Secure Configuration Template

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run:*)",
      "Bash(yarn:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git branch:*)",
      "Bash(git checkout:*)",
      "Bash(ls:*)",
      "Bash(cat:*)",
      "Bash(head:*)",
      "Bash(tail:*)"
    ],
    "ask": [
      "Bash(git push:*)",
      "Bash(git merge:*)",
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./**/*credential*)",
      "Read(./**/*secret*)",
      "Read(~/.ssh/**)",
      "Read(~/.aws/**)",
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(chmod 777:*)",
      "WebFetch"
    ]
  }
}
```

## What's Coming Tomorrow

In **Day 8**, we'll start the customization phase with **creating custom slash commands** to automate your recurring workflows.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 6: Git Workflows](/en/claude-code-git-workflows/)*
