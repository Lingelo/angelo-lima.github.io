---
layout: post
title: "MCP: Connecting Claude Code to Your Tools"
subtitle: "Day 13 - Integrate GitHub, Jira, databases, and more"
description: "Complete MCP guide in Claude Code: server installation, configuration, OAuth authentication, and practical integrations with your tools."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-13
categories: en
---

I've already explored the MCP protocol in my article [Model Context Protocol (MCP): Revolution in LLM Integration](/en/anthropic-mcp-model-context-protocol-llm-integration/). Today, we'll see how to use it concretely in Claude Code.

## Reminder: What is MCP?

**Model Context Protocol** is an open standard that allows Claude to connect to external tools:
- Databases
- Issue trackers (Jira, GitHub Issues)
- Cloud services
- Internal APIs

It's the **"USB-C of AI"**: a universal interface.

## The Three Transport Types

| Transport | Usage | Example |
|-----------|-------|---------|
| **HTTP** | Remote servers | Cloud services |
| **Stdio** | Local processes | CLI tools |
| **SSE** | Legacy (deprecated) | Old servers |

## Installing an MCP Server

### HTTP Server (recommended for cloud)

```bash
claude mcp add --transport http github https://mcp.github.com/mcp
```

With authentication:

```bash
claude mcp add --transport http secure-api \
  --header "Authorization: Bearer $TOKEN" \
  https://api.example.com/mcp
```

### Stdio Server (local process)

```bash
claude mcp add --transport stdio postgres \
  --env DATABASE_URL="postgres://user:pass@localhost/db" \
  -- npx postgres-mcp-server
```

### Example: Airtable

```bash
claude mcp add --transport stdio airtable \
  --env AIRTABLE_API_KEY=$AIRTABLE_KEY \
  -- npx -y airtable-mcp-server
```

## The Three Configuration Scopes

### 1. Local Scope (personal, this project)

Stored in `~/.claude.json`, visible only to you.

```bash
claude mcp add --scope local ...
```

### 2. Project Scope (team, this repo)

Stored in `.mcp.json` at project root, versioned with Git.

```bash
claude mcp add --scope project ...
```

### 3. User Scope (personal, all projects)

Stored in `~/.claude.json`, available everywhere.

```bash
claude mcp add --scope user ...
```

## Managing MCP Servers

### List Servers

```bash
claude mcp list
```

### View Details

```bash
claude mcp get github
```

### Remove a Server

```bash
claude mcp remove github
```

### Check Status in Claude Code

```
/mcp
```

## Configuration in .mcp.json

To share with the team:

```json
{
  "mcpServers": {
    "github": {
      "transport": "http",
      "url": "https://mcp.github.com/mcp"
    },
    "postgres": {
      "transport": "stdio",
      "command": "npx",
      "args": ["postgres-mcp-server"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    },
    "jira": {
      "transport": "http",
      "url": "https://mcp.atlassian.com/jira",
      "headers": {
        "Authorization": "Bearer ${JIRA_TOKEN}"
      }
    }
  }
}
```

## OAuth Authentication

Some MCP servers support OAuth 2.0:

```
/mcp
```

Then select the server and follow the authentication flow in the browser.

## Practical Integration Examples

### GitHub: Issues and PRs

```bash
claude mcp add --transport http github https://mcp.github.com/mcp
```

Usage:
```
> Create a GitHub issue for the authentication bug
> List open PRs on this repo
> Assign me to PR #42
```

### Jira: Project Management

```bash
claude mcp add --transport http jira \
  --header "Authorization: Bearer $JIRA_TOKEN" \
  https://mcp.atlassian.com/jira
```

Usage:
```
> Create a Jira ticket for this feature
> Move ticket PROJ-123 to "In Review"
> What are my assigned tickets?
```

### PostgreSQL: Database

```bash
claude mcp add --transport stdio postgres \
  --env DATABASE_URL="postgres://..." \
  -- npx postgres-mcp-server
```

Usage:
```
> Show me the users table schema
> Write a query for users inactive for 30 days
> How many records in the orders table?
```

### Notion: Documentation

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

Usage:
```
> Add this documentation to the "Architecture" page
> Search for last week's meeting notes
```

## Token Management

### MCP Token Limit

By default, Claude limits MCP responses to **25,000 tokens**.

To increase:

```bash
export MAX_MCP_OUTPUT_TOKENS=50000
```

### Warning at 10,000 Tokens

Claude warns you if an MCP response exceeds 10,000 tokens.

## Workflow with MCP

### Example: Feature from a Jira Ticket

```
# 1. Read the ticket
> Show me details for ticket PROJ-456

# 2. Claude reads via MCP and understands requirements

# 3. Plan
> ultrathink. Propose an implementation plan

# 4. Implement
> Implement step 1

# 5. Update Jira
> Update ticket PROJ-456 with status "In Progress"
  and add a comment on progress
```

### Example: Debug with Sentry

```bash
claude mcp add --transport http sentry \
  --header "Authorization: Bearer $SENTRY_TOKEN" \
  https://mcp.sentry.io
```

```
> What are the most frequent errors this week?

# Claude analyzes via MCP

> Fix the error "TypeError: Cannot read property 'id' of null"
  appearing in src/api/users.ts
```

## MCP Security

### Verify Servers

Third-party MCP servers may have access to your data. Check:
- Server source
- Requested permissions
- Privacy policy

### Environment Variables

Never hardcode tokens:

```json
{
  "env": {
    "API_KEY": "${MY_API_KEY}"  // ✅ Env variable
  }
}
```

```json
{
  "env": {
    "API_KEY": "sk-abc123..."   // ❌ Plain token
  }
}
```

## Creating Your Own MCP Server

For internal needs, you can create your own MCP server.

Basic structure (TypeScript):

```typescript
import { Server } from '@modelcontextprotocol/sdk/server';

const server = new Server({
  name: 'my-server',
  version: '1.0.0'
});

// Define exposed tools
server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'my_tool',
    description: 'Description of my tool',
    inputSchema: {
      type: 'object',
      properties: {
        param1: { type: 'string' }
      }
    }
  }]
}));

// Implement the tool
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;
  // Tool logic...
  return { result: '...' };
});

server.start();
```

## What's Coming Tomorrow

In **Day 14**, we'll see **Claude Code in VS Code and JetBrains** - IDE integration for a graphical experience.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 12: Hooks](/en/claude-code-hooks/)*
