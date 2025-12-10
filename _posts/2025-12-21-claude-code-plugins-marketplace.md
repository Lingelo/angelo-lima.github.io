---
layout: post
title: "Claude Code Plugins and Marketplace"
subtitle: "Day 11 - Extend Claude Code with the community ecosystem"
description: "Discover the Claude Code plugin marketplace: installation, plugin creation, publishing, and best extensions for developers."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code-series.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-11
categories: en
---

We've seen how to create slash commands, subagents, and skills individually. **Plugins** allow you to package them together and share them. Today, we explore the Claude Code plugin ecosystem.

## What is a Plugin?

A plugin is a **pack** that can contain:
- Slash commands
- Subagents
- Skills
- Hooks
- MCP servers

All in a standardized structure, easy to install and share.

## Installing Plugins

### Via the /plugin Command

```
/plugin install plugin-name
```

### From a Marketplace

```
/plugin install plugin-name@marketplace-name
```

### From a Git Repo

```
/plugin install https://github.com/user/plugin-name
```

### From a Local Folder

```
/plugin install ./my-local-plugin
```

## Managing Installed Plugins

### List Plugins

```
/plugin list
```

### View Plugin Details

```
/plugin info plugin-name
```

### Remove a Plugin

```
/plugin remove plugin-name
```

## Plugin Structure

```
my-plugin/
├── .claude-plugin/
│   ├── plugin.json         # Metadata (required)
│   └── marketplace.json    # For marketplace publishing
├── commands/               # Slash commands
│   ├── review.md
│   └── deploy.md
├── agents/                 # Subagents
│   └── security-expert.md
├── skills/                 # Skills
│   └── api-tester/
│       └── SKILL.md
├── hooks/                  # Hooks
│   └── pre-commit.json
├── .mcp.json              # MCP servers
└── README.md              # Documentation
```

## The plugin.json File

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Description of what the plugin does",
  "author": {
    "name": "Your Name",
    "email": "email@example.com",
    "url": "https://your-site.com"
  },
  "repository": "https://github.com/user/my-plugin",
  "keywords": ["security", "testing", "automation"],
  "license": "MIT",
  "components": {
    "commands": ["commands/"],
    "agents": ["agents/"],
    "skills": ["skills/"],
    "hooks": ["hooks/"],
    "mcpServers": [".mcp.json"]
  }
}
```

## Marketplaces

### Concept

A marketplace is a plugin **registry**, hosted on GitHub or elsewhere.

### Adding a Marketplace

```
/plugin marketplace add owner/repo
```

Or with a Git URL:

```
/plugin marketplace add https://gitlab.com/team/plugins.git
```

### Popular Marketplaces

| Marketplace | Description | Plugin Count |
|-------------|-------------|--------------|
| Awesome Claude Code | Community collection | 130+ agents |
| Claude Code Plugins Plus | Production-ready | 185+ skills |
| Grey Haven Studio | Dev, testing, security | 13 plugins |

### Marketplace Structure

```json
{
  "name": "my-marketplace",
  "owner": {
    "name": "My Team",
    "email": "team@example.com"
  },
  "plugins": [
    {
      "name": "security-suite",
      "source": "./plugins/security-suite",
      "description": "Security tools suite"
    },
    {
      "name": "testing-tools",
      "source": "https://github.com/team/testing-tools",
      "description": "Automated testing tools"
    }
  ]
}
```

## Creating Your First Plugin

### Step 1: Create the Structure

```bash
mkdir my-first-plugin
cd my-first-plugin
mkdir -p .claude-plugin commands agents skills
```

### Step 2: Create plugin.json

```json
{
  "name": "my-first-plugin",
  "version": "1.0.0",
  "description": "My first Claude Code plugin",
  "author": {
    "name": "Your Name"
  },
  "components": {
    "commands": ["commands/"],
    "agents": ["agents/"]
  }
}
```

### Step 3: Add a Command

```markdown
<!-- commands/hello.md -->
---
description: Welcome command
---

# /hello

Say hello to the user with their name: $1

Be friendly and offer to help with their project.
```

### Step 4: Add an Agent

```markdown
<!-- agents/helper.md -->
---
name: helper
description: General development assistant
tools: Read, Grep, Glob
---

You are a friendly and competent development assistant.

## Your Role
Help developers with their technical questions.

## Style
- Concise but complete answers
- Code examples when relevant
- Always propose alternatives
```

### Step 5: Test Locally

```
/plugin install ./my-first-plugin
/hello Angelo
> @helper How to structure a React project?
```

## Recommended Plugins

### For Security

**Security Patterns Plugin**
- 9 automatic security patterns
- XSS, injection, CSRF detection
- Pre-commit hooks for validation

```
/plugin install security-patterns
```

### For Testing

**Test Generator Plugin**
- Automatic test generation
- Vitest, Jest, Mocha support
- Edge case coverage

```
/plugin install test-generator
```

### For Deployment

**Deploy Helper Plugin**
- Deployment scripts
- CI/CD integration
- Automatic rollback

```
/plugin install deploy-helper
```

### For Documentation

**Doc Generator Plugin**
- Automatic JSDoc
- README generation
- Changelog management

```
/plugin install doc-generator
```

## Publishing Your Plugin

### Option 1: Public GitHub

1. Push your plugin to GitHub
2. Users install with:
   ```
   /plugin install https://github.com/you/your-plugin
   ```

### Option 2: Team Marketplace

1. Create a marketplace repo:

```json
{
  "name": "team-plugins",
  "plugins": [
    {
      "name": "your-plugin",
      "source": "./plugins/your-plugin"
    }
  ]
}
```

2. Share with the team:
   ```
   /plugin marketplace add team/team-plugins
   /plugin install your-plugin@team-plugins
   ```

### Option 3: Public Marketplace

Submit your plugin to community marketplaces (see their guidelines).

## Plugin Best Practices

### 1. Clear Documentation

```markdown
# My Plugin

## Installation
\`\`\`
/plugin install my-plugin
\`\`\`

## Available Commands
- `/command1` - Description
- `/command2` - Description

## Available Agents
- `@agent1` - Description

## Configuration
...
```

### 2. Semantic Versioning

```json
{
  "version": "1.2.3"
  // MAJOR.MINOR.PATCH
  // 1 = breaking changes
  // 2 = new features
  // 3 = bug fixes
}
```

### 3. Test Your Components

Before publishing:
- Test each command
- Verify agents on multiple cases
- Validate skills activate correctly

### 4. Minimal Permissions

```json
{
  "components": {
    "agents": [{
      "tools": ["Read", "Grep", "Glob"]
      // No Write or Bash if not needed
    }]
  }
}
```

## Plugins for Teams

### Private Marketplace

```
.claude/settings.json
```

```json
{
  "extraKnownMarketplaces": {
    "team-internal": {
      "source": {
        "source": "github",
        "repo": "org/internal-plugins"
      }
    }
  }
}
```

### Plugins Shared via Git

Include the plugin in your repo:

```
project/
├── .claude/
│   └── plugins/
│       └── our-plugin/
└── src/
```

## What's Coming Tomorrow

In **Day 12**, we'll start the integration phase with **Hooks**: how to automate actions in response to Claude Code events.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 10: Skills](/en/claude-code-skills/)*
