---
layout: post
title: "Skills: Model-Invoked Automation"
subtitle: "Day 10 - Capabilities Claude activates automatically"
description: "Master Claude Code Skills: intelligent automation, custom skill creation, difference from slash commands, and best practices."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code-series.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-10
categories: en
---

Yesterday, we saw subagents that you explicitly invoke with `@`. Today, we discover **Skills**: capabilities that Claude activates **automatically** based on the context of your request.

## The Key Difference: Model-Invoked

| Aspect | Slash Commands | Subagents | Skills |
|--------|---------------|-----------|--------|
| Invocation | Explicit (`/command`) | Explicit (`@agent`) | **Automatic** |
| Trigger | User | User | **Claude** |
| Context | Prompt | Separate context | Enrichment |

Skills are **model-invoked**: Claude decides when to use them based on your request and the skill's description.

## How Skills Work

### The Process

```
Your request
    ↓
Claude analyzes context
    ↓
Claude reads available skill descriptions
    ↓
If a skill matches → Claude activates it automatically
    ↓
The skill enriches Claude's instructions
```

### Concrete Example

You have a `pdf-expert` skill with the description:
> "Extract text and tables from PDF files. Use when user works with PDFs."

```
> Extract data from the report.pdf file

[Claude detects "PDF" + "extract" → automatically activates pdf-expert]
```

## Skill Sources

### 1. Personal Skills

```
~/.claude/skills/
├── pdf-expert/
│   └── SKILL.md
└── api-tester/
    └── SKILL.md
```

Available in all your projects.

### 2. Project Skills

```
.claude/skills/
├── deployment/
│   └── SKILL.md
└── migration/
    └── SKILL.md
```

Shared with the team via Git.

### 3. Plugin Skills

Installed via Claude Code plugins (see Day 11).

## Anatomy of a Skill

### Minimal Structure

```
my-skill/
└── SKILL.md
```

### Complete Structure

```
my-skill/
├── SKILL.md           # Instructions (required)
├── reference.md       # Additional documentation
├── scripts/
│   └── helper.py      # Utility scripts
└── templates/
    └── template.txt   # Templates to use
```

## The SKILL.md File

### Required Frontmatter

```yaml
---
name: skill-name
description: Clear description of when to use this skill
---
```

### Optional Fields

```yaml
---
name: skill-name
description: Clear description of when to use this skill
allowed-tools: Read, Grep, Glob    # Restrict tools
---
```

### Naming Rules

| Field | Rules |
|-------|-------|
| `name` | Lowercase letters, numbers, hyphens. Max 64 characters |
| `description` | Max 1024 characters. Must explain **when** to use |

## Skill Examples

### Skill: PDF Expert

```markdown
---
name: pdf-expert
description: Extract text, tables, and metadata from PDF files.
             Use when user asks to analyze, read, or extract
             data from PDF files.
allowed-tools: Read, Bash
---

# PDF Expert

## Capabilities
- Text extraction with pdftotext
- Table extraction with tabula-py
- Metadata reading with pdfinfo

## Instructions
1. Verify file exists
2. Use pdftotext for raw text
3. Use tabula if tables are detected
4. Format result readably

## Useful Commands
```bash
# Extract text
pdftotext input.pdf -

# PDF info
pdfinfo input.pdf
```
```

### Skill: API Tester

```markdown
---
name: api-tester
description: Test and debug REST APIs. Use when user wants to test
             endpoints, verify API responses, or debug HTTP
             request problems.
allowed-tools: Read, Bash
---

# API Tester

## Capabilities
- Endpoint testing with curl
- JSON response validation
- Response time measurement
- Authentication testing

## Methodology
1. Identify endpoint to test
2. Build appropriate curl request
3. Analyze response (status, body, headers)
4. Propose fixes if error

## Curl Templates

### GET with auth
```bash
curl -X GET "URL" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json"
```

### POST with body
```bash
curl -X POST "URL" \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```
```

### Skill: Migration Helper

```markdown
---
name: migration-helper
description: Help create and manage database migrations.
             Use when user talks about migrations, schemas,
             or database structure changes.
allowed-tools: Read, Write, Bash(npx prisma:*)
---

# Migration Helper

## Supported Framework
Prisma (detected via prisma/schema.prisma)

## Migration Process
1. Analyze requested change
2. Propose schema modifications
3. Generate migration with `prisma migrate dev`
4. Verify migration is correct

## Best Practices
- Always name migrations descriptively
- Check existing data before destructive migration
- Test on local DB copy first

## Prisma Commands
```bash
# Create migration
npx prisma migrate dev --name description

# See status
npx prisma migrate status

# Reset (caution!)
npx prisma migrate reset
```
```

### Skill: Security Scanner

```markdown
---
name: security-scanner
description: Scan code for security vulnerabilities.
             Use when user asks for security audit,
             looks for flaws, or wants to secure code.
allowed-tools: Read, Grep, Glob
---

# Security Scanner

## Vulnerabilities Searched

### Injection
- SQL Injection
- NoSQL Injection
- Command Injection
- LDAP Injection

### XSS
- Reflected XSS
- Stored XSS
- DOM-based XSS

### Auth/Session
- Broken Authentication
- Session Fixation
- Insecure Direct Object Reference

### Other
- Sensitive Data Exposure
- Security Misconfiguration
- Insecure Deserialization

## Patterns to Search

```javascript
// SQL Injection
`SELECT * FROM users WHERE id = ${userId}`  // ❌ Dangerous
`SELECT * FROM users WHERE id = ?`          // ✅ Parameterized

// XSS
element.innerHTML = userInput;              // ❌ Dangerous
element.textContent = userInput;            // ✅ Safe

// Command Injection
exec(`ls ${userPath}`);                     // ❌ Dangerous
execFile('ls', [userPath]);                 // ✅ Safer
```

## Report Format
For each vulnerability found:
- File and line
- Vulnerability type
- Severity (Critical/High/Medium/Low)
- Vulnerable code
- Proposed fix
```

## Best Practices for Descriptions

### ✅ Good Description

```yaml
description: Extract text and tables from PDF files. Use when
             user asks to analyze, read, parse, or extract
             data from PDF files or documents.
```

**Why it's good:**
- Explains what the skill does
- Lists triggers (analyze, read, parse, extract)
- Mentions keywords (PDF, documents)

### ❌ Bad Description

```yaml
description: Helps with documents
```

**Why it's bad:**
- Too vague
- No clear triggers
- Claude won't know when to activate it

## Restricting Tools

For a read-only skill:

```yaml
---
name: code-analyzer
description: ...
allowed-tools: Read, Grep, Glob
---
```

Claude won't be able to modify files when this skill is active.

## Support Files

### Reference Files

```
my-skill/
├── SKILL.md
└── reference.md    # Additional documentation
```

In SKILL.md, reference with:
```markdown
See @reference.md for more details.
```

### Scripts

```
my-skill/
├── SKILL.md
└── scripts/
    └── analyze.py
```

```markdown
## Use the analysis script
```bash
python scripts/analyze.py $FILE
```
```

## Testing Automatic Activation

### Simple Test

1. Create a skill with a clear description
2. Make a request that matches
3. Verify if Claude uses the skill's instructions

### Debug

If the skill doesn't activate:
- Check that the description is specific enough
- Test with explicit keywords
- Verify SKILL.md syntax

## What's Coming Tomorrow

In **Day 11**, we'll see **Plugins and the Marketplace**: how to install, create, and share complete packs of commands, agents, skills, and hooks.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 9: Subagents](/en/claude-code-subagents/)*
