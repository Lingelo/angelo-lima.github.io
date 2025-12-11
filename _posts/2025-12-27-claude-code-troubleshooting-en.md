---
layout: post
title: "Claude Code Troubleshooting"
subtitle: "Day 17 - Solving common problems"
description: "Complete Claude Code troubleshooting guide: common errors, connection issues, context limits, and practical solutions."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-17
categories: en
---

Claude Code is robust, but problems can occur. Here's a complete guide to diagnose and solve the most common errors.

## Connection Problems

### Error: "API Key invalid"

```
Error: Invalid API key
```

**Solutions**:

1. Verify the key:
```bash
echo $ANTHROPIC_API_KEY
```

2. Reconfigure:
```bash
claude config set apiKey sk-ant-...
```

3. Check permissions on console.anthropic.com

### Error: "Rate limit exceeded"

```
Error: Rate limit exceeded. Please retry after X seconds.
```

**Solutions**:

1. Wait for the indicated delay
2. Reduce request frequency
3. Upgrade to a higher plan (Max 20x)
4. Use `/compact` to reduce tokens

### Error: "Connection timeout"

```
Error: Request timed out
```

**Solutions**:

1. Check internet connection
2. Check status: status.anthropic.com
3. Retry with longer timeout:
```bash
claude --timeout 120000
```

## Context Problems

### Error: "Context window exceeded"

```
Error: Maximum context length exceeded
```

**Cause**: Conversation + files exceed token limit.

**Solutions**:

1. Use `/compact` immediately:
```
/compact
```

2. Start a new session:
```
/clear
```

3. Limit referenced files:
```
❌ @src/**/*.ts  (too many files)
✅ @src/api/auth.ts  (specific file)
```

### Claude "forgets" instructions

**Cause**: Context is saturated and old instructions are truncated.

**Solutions**:

1. Add instructions to CLAUDE.md:
```markdown
# CLAUDE.md
## Important rule
Always use early returns
```

2. Repeat critical instructions:
```
> Reminder: use strict TypeScript.
> Now, implement feature X.
```

3. Use `/compact` then reformulate

### File not found

```
Error: File not found: @src/missing.ts
```

**Solutions**:

1. Verify the path:
```bash
ls src/missing.ts
```

2. Use correct relative path:
```
@./src/missing.ts  (with ./)
@src/missing.ts    (without ./)
```

3. Check read permissions

## Execution Problems

### Bash command blocked

```
Claude is waiting for permission...
```

**Solutions**:

1. Accept or reject manually
2. Add to permissions:
```json
{
  "permissions": {
    "allow": ["Bash(npm run:*)"]
  }
}
```

3. Use Accept Edits mode (Shift+Tab)

### Error: "Tool not available"

```
Error: Tool 'WebFetch' is not available
```

**Cause**: Tool is disabled or unavailable.

**Solutions**:

1. Check permissions:
```
/permissions
```

2. Enable tool in settings.json

3. Verify tool exists (some are experimental)

### Infinite loop

Claude continues endlessly on a task.

**Solutions**:

1. Interrupt with `Ctrl+C`
2. Use `Esc Esc` to go back
3. Reformulate with a limit:
```
> Do this task in maximum 3 steps
```

## Performance Problems

### Very slow responses

**Possible causes**:
- Context too large
- High server load
- Slow network connection

**Solutions**:

1. Reduce context:
```
/compact
```

2. Limit files:
```
> Analyze only @src/api/auth.ts
```

3. Use a faster model:
```bash
claude --model haiku
```

### High costs

**Diagnosis**:
```
/cost
```

**Solutions**:

1. `/compact` regularly
2. Be more precise in prompts
3. Avoid massive file reads
4. Use Haiku for simple tasks

## Installation Problems

### npm install fails

```bash
npm install -g @anthropic-ai/claude-code
# Error: EACCES permission denied
```

**Solutions**:

1. Use npx:
```bash
npx @anthropic-ai/claude-code
```

2. Fix npm permissions:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

3. Use a Node version manager:
```bash
nvm use 20
npm install -g @anthropic-ai/claude-code
```

### Incompatible Node version

```
Error: Unsupported Node.js version
```

**Solution**:
```bash
nvm install 18  # or 20
nvm use 18
```

## Hook Problems

### Hook doesn't execute

**Checks**:

1. Hook syntax:
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Edit",
      "hooks": [{
        "type": "command",
        "command": "echo 'Hook triggered'"
      }]
    }]
  }
}
```

2. Debug logs:
```bash
CLAUDE_CODE_DEBUG=1 claude
```

3. Script permissions:
```bash
chmod +x ./scripts/hook.sh
```

### Hook blocks Claude

```
Hook returned: BLOCK
```

**This is intentional** if the hook detects a problem.

**Solutions**:

1. Check hook conditions
2. Modify the file to satisfy the hook
3. Temporarily disable the hook

## MCP Problems

### MCP server won't start

```
Error: Failed to connect to MCP server
```

**Solutions**:

1. Verify installation:
```bash
npx postgres-mcp-server --version
```

2. Test manually:
```bash
npx postgres-mcp-server
```

3. Check environment variables:
```bash
echo $DATABASE_URL
```

### MCP timeout

```
Error: MCP server timed out
```

**Solutions**:

1. Increase timeout:
```json
{
  "mcpServers": {
    "postgres": {
      "timeout": 30000
    }
  }
}
```

2. Check network connectivity to the service

## General Diagnosis

### Debug mode

```bash
CLAUDE_CODE_DEBUG=1 claude
```

Displays detailed logs to identify the problem.

### Check configuration

```bash
claude config list
```

### Reset configuration

```bash
rm -rf ~/.claude
claude config set apiKey sk-ant-...
```

### Check logs

```bash
cat ~/.claude/logs/claude-code.log
```

## Troubleshooting Checklist

```
□ Internet connection OK?
□ API Key valid?
□ Node.js version compatible (≥18)?
□ Claude Code up to date?
□ File permissions OK?
□ Context not saturated?
□ Hooks configured correctly?
□ MCP servers accessible?
```

## Getting Help

### Official documentation

```
/help
```

### Community

- GitHub Issues: github.com/anthropics/claude-code/issues
- Anthropic Discord
- Stack Overflow tag `claude-code`

### Anthropic Support

For Enterprise customers: support.anthropic.com

## What's Coming Tomorrow

In **Day 18**, we'll explore the **status line and terminal customization** - configure Claude Code display according to your preferences.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 16: Billing and costs](/en/claude-code-billing-costs/)*
