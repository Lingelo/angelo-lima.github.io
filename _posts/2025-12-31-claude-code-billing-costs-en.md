---
layout: post
title: "Claude Code Billing and Cost Optimization"
subtitle: "Day 16 - Understanding and mastering your consumption"
description: "Master Claude Code billing: pricing model, /cost command, Max subscriptions, token optimization, and budget best practices."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code-series.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-day-16
categories: en
---

Claude Code is powerful, but it consumes tokens. Understanding billing helps optimize your costs. Let's see how to monitor and master your budget.

## The Pricing Model

### Rates by Model (December 2024)

| Model | Input (1M tokens) | Output (1M tokens) |
|-------|-------------------|-------------------|
| Claude Sonnet 4 | $3.00 | $15.00 |
| Claude Opus 4 | $15.00 | $75.00 |
| Claude Haiku 3.5 | $0.80 | $4.00 |

### What Consumes Tokens

| Action | Tokens consumed |
|--------|-----------------|
| Your prompt | Input tokens |
| Claude's response | Output tokens |
| Files read | Input tokens |
| CLAUDE.md context | Input tokens |
| Conversation history | Input tokens (cumulative) |

## The /cost Command

### View Session Cost

```
/cost
```

Displays:
```
Session cost: $0.45
Input tokens: 45,000
Output tokens: 5,000
Duration: 45 minutes
```

### Detailed Analysis

The cost breaks down as:
- **Base context**: CLAUDE.md, rules, configuration (~1,000-5,000 tokens)
- **Files read**: Variable by size (~100-10,000 tokens per file)
- **Conversation**: Cumulative (grows with session)
- **Responses**: Variable by complexity

## Claude Subscriptions

### Claude Pro ($20/month)

- Access to Claude.ai
- **Claude Code not included** (uses API)
- Priority usage on web

### Claude Max ($100/month or $200/month)

Includes Claude Code with:

| Tier | Price | Tokens/day | Ideal for |
|------|-------|------------|-----------|
| Max 5x | $100/month | ~5M tokens | Moderate usage |
| Max 20x | $200/month | ~20M tokens | Heavy usage |

### API Pay-as-you-go

Without Max subscription, you pay via API:
- No fixed limit
- Billed on actual usage
- Requires API key

## Typical Consumption

### Per Task

| Task | Estimated tokens | Sonnet 4 cost |
|------|------------------|---------------|
| Simple question | 1,000-2,000 | ~$0.01 |
| Read + analyze file | 5,000-10,000 | ~$0.03 |
| Feature implementation | 20,000-50,000 | ~$0.15 |
| Complete refactoring | 50,000-100,000 | ~$0.35 |
| Long session (2h) | 100,000-200,000 | ~$0.70 |

### Per Day (Average Developer)

```
Morning: Exploration + planning     ~30,000 tokens
Afternoon: Implementation           ~80,000 tokens
Evening: Tests + fixes              ~40,000 tokens
─────────────────────────────────────────────────
Daily total                        ~150,000 tokens
Estimated cost (Sonnet 4)          ~$0.50-1.00
```

### Anthropic Statistic

> "The average developer uses ~$5-6 per day with Claude Code Max"

## Optimizing Your Costs

### 1. Use /compact Regularly

```
/compact
```

Reduces conversation history and thus input tokens per prompt.

**Rule**: `/compact` every 30-45 minutes of active session.

### 2. Be Precise in Prompts

```
❌ Expensive (broad exploration)
> Look at the code and suggest improvements

✅ Economical (targeted)
> In @src/api/auth.ts, the validateToken function lines 45-60
  can be optimized to avoid redundant DB calls
```

### 3. Use the Right Commands

| Situation | Economical command |
|-----------|-------------------|
| Find a file | `@file.ts` instead of exploring |
| Limited context | Mention specific files |
| New task | `/clear` then new prompt |

### 4. Choose the Right Model

```bash
# For simple tasks → Haiku (8x cheaper)
claude --model haiku

# For complex tasks → Sonnet (default)
claude

# For critical tasks → Opus (5x more expensive)
claude --model opus
```

### 5. Limit File Reads

```
❌ Expensive
> Read all files in src/ folder and summarize

✅ Economical
> Summarize the architecture based on @src/index.ts and @CLAUDE.md
```

## Monitoring Your Consumption

### During Session

```
/cost
```

### Cost History

```bash
# View recent usage
claude usage

# Detailed usage
claude usage --detailed
```

### Budget Alerts

Configure alerts on the Anthropic console:
1. Go to console.anthropic.com
2. Settings → Billing → Alerts
3. Set a threshold (e.g., $50/month)

## Budget Strategies

### For Freelancers

```
Recommended monthly budget: $30-50
├── Daily sessions: ~$1-2
├── Occasional peaks: ~$5
└── Safety margin: 20%
```

### For Teams

```
Budget per developer: $100-150/month
├── Claude Max usage ($100-200)
└── OR API with cap
```

### For Enterprises

Available options:
- **Claude for Enterprise**: Negotiated rates
- **AWS Bedrock**: Billed through AWS
- **GCP Vertex AI**: Billed through GCP

## Access Mode Comparison

| Mode | Monthly cost | Advantages | Disadvantages |
|------|--------------|------------|---------------|
| API only | Variable | Pay-as-you-go | No cap |
| Max 5x | $100 | Predictable | Token limit |
| Max 20x | $200 | Heavy usage | More expensive |
| Enterprise | Negotiated | Support, SLA | Commitment |

## Budget Tracking Template

### Daily Journal

```markdown
## 2024-12-31

### Sessions
- 09:00-11:00: Auth feature ($0.45)
- 14:00-16:00: Tests ($0.30)
- 16:30-17:00: Bugfix ($0.10)

### Day total: $0.85
### Week total: $4.20
### Remaining budget: $25.80
```

### Tracking Script

```bash
#!/bin/bash
# track-claude-cost.sh

DATE=$(date +%Y-%m-%d)
COST=$(claude usage --today --json | jq '.cost')

echo "$DATE,$COST" >> ~/claude-costs.csv
```

## Reduce Costs Without Losing Productivity

### 1. Prepare Before Asking

```
# Before Claude session
1. Identify relevant files
2. Formulate a precise prompt
3. Gather necessary context

# During session
→ Targeted prompt = fewer tokens = cheaper
```

### 2. Use Smart Caching

Claude caches certain elements:
- CLAUDE.md (reloaded once per session)
- Recently read files
- Conversation context

**Tip**: Keep a session open rather than opening several.

### 3. Task Batching

```
❌ Expensive (context reloaded each time)
> Add a log here
> And also there
> And here too

✅ Economical (single request)
> Add logs in:
  - @src/api/auth.ts line 45
  - @src/api/users.ts line 30
  - @src/middleware/error.ts line 15
```

## What's Coming Tomorrow

In **Day 17**, we'll cover **troubleshooting** - solving common problems with Claude Code.

---

*This article is part of the "Master Claude Code in 20 Days" series. [Day 15: CI/CD and headless mode](/en/claude-code-cicd-headless/)*
