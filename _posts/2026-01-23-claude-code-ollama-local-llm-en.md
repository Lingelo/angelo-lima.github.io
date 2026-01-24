---
layout: post
title: "Claude Code + Ollama: Using Local LLMs"
subtitle: "Run Claude Code on your own open-source models"
description: "Complete guide to connecting Claude Code to Ollama and using local open-source models like qwen3-coder, glm-4.7 or gpt-oss. Configuration, requirements and benefits."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: en
ref: claude-code-ollama
categories: en
---

Big news for Claude Code users: **Ollama now supports the Anthropic Messages API**, which allows you to use Claude Code with local open-source models. No more exclusive dependency on Anthropic's cloud!

## Why This Integration Is a Game Changer

Until now, Claude Code required a connection to Anthropic's servers. With this Ollama integration, you can now:

| Benefit | Description |
|---------|-------------|
| **Privacy** | Your code stays on your machine |
| **Costs** | No API fees, just your electricity |
| **Independence** | No single vendor lock-in |
| **Offline** | Work without internet connection |
| **Customization** | Choose the model that fits your needs |

## Requirements

### 1. Ollama v0.14.0+

The integration requires **Ollama version 0.14.0 or higher**. Check your version:

```bash
ollama --version
```

If needed, update Ollama from [ollama.com](https://ollama.com).

### 2. Model with Large Context

Claude Code requires a **large context window** to work properly. The official recommendation is **64k tokens minimum**.

Configure context in Ollama:

```bash
# Create a Modelfile with extended context
cat > Modelfile << 'EOF'
FROM qwen3-coder
PARAMETER num_ctx 65536
EOF

ollama create qwen3-coder-64k -f Modelfile
```

### 3. Claude Code Installed

If not already done:

```bash
# macOS/Linux
curl -fsSL https://claude.ai/install.sh | bash

# Windows
irm https://claude.ai/install.ps1 | iex
```

## Configuration

### Method 1: Quick Launch (Recommended)

Ollama provides a simplified command:

```bash
ollama launch claude
```

For interactive configuration mode:

```bash
ollama launch claude --config
```

This method automatically configures the necessary environment variables.

### Method 2: Manual Configuration

Set the three required environment variables:

```bash
export ANTHROPIC_AUTH_TOKEN=ollama
export ANTHROPIC_API_KEY=""
export ANTHROPIC_BASE_URL=http://localhost:11434
```

Then launch Claude Code with your chosen model:

```bash
claude --model qwen3-coder-64k
```

### Method 3: Single Line

For a one-time launch without modifying your environment:

```bash
ANTHROPIC_AUTH_TOKEN=ollama \
ANTHROPIC_BASE_URL=http://localhost:11434 \
ANTHROPIC_API_KEY="" \
claude --model qwen3-coder
```

### Persistent Configuration

Add these lines to your `~/.bashrc` or `~/.zshrc`:

```bash
# Claude Code with Ollama
export ANTHROPIC_AUTH_TOKEN=ollama
export ANTHROPIC_API_KEY=""
export ANTHROPIC_BASE_URL=http://localhost:11434
alias claude-local='claude --model qwen3-coder-64k'
```

Then reload:

```bash
source ~/.bashrc  # or source ~/.zshrc
```

## Recommended Models

### For Development

| Model | Size | Strengths |
|-------|------|-----------|
| **qwen3-coder** | ~14B | Code-specialized, excellent quality/size ratio |
| **glm-4.7** | ~9B | Good balance, multilingual |
| **codestral** | ~22B | Performs well on complex code |

### For Powerful Machines

| Model | Size | Strengths |
|-------|------|-----------|
| **gpt-oss:20b** | 20B | Performant generalist |
| **gpt-oss:120b** | 120B | Close to proprietary models |
| **deepseek-coder:33b** | 33B | Excellent on code |

### Download a Model

```bash
# Download the model
ollama pull qwen3-coder

# Check available models
ollama list
```

## Example Session

```bash
# 1. Start Ollama (if not running)
ollama serve &

# 2. Launch Claude Code
ANTHROPIC_AUTH_TOKEN=ollama \
ANTHROPIC_BASE_URL=http://localhost:11434 \
ANTHROPIC_API_KEY="" \
claude --model qwen3-coder

# 3. Use normally
> Analyze the file @src/api/users.ts and suggest improvements
```

## Limitations to Know

### Performance

Local models are generally **less performant** than Claude Sonnet or Opus on complex tasks. Expect:

- Sometimes less accurate responses
- Longer thinking time on modest hardware
- Less advanced reasoning capability

### Resource Consumption

| Model Size | Minimum RAM | Recommended GPU |
|------------|-------------|-----------------|
| 7-14B | 16 GB | 8 GB VRAM |
| 20-33B | 32 GB | 16 GB VRAM |
| 70B+ | 64 GB+ | 24 GB+ VRAM |

### Features

Some advanced features may not work perfectly:
- Vision (image analysis)
- Complex tool use
- Subagents

## Ideal Use Cases

### When to Use Ollama

- **Sensitive proprietary code**: Code never leaves your machine
- **Offline development**: Work on planes, areas without internet
- **Rapid prototyping**: No API cost concerns
- **Learning**: Experiment without limits

### When to Stay on Anthropic

- **Complex tasks**: Major refactoring, architecture
- **In-depth code reviews**: Security analysis
- **Production**: When quality is critical

## Switching Between Local and Cloud

Create aliases to easily switch:

```bash
# In ~/.bashrc or ~/.zshrc

# Ollama mode (local)
alias claude-local='ANTHROPIC_AUTH_TOKEN=ollama \
  ANTHROPIC_BASE_URL=http://localhost:11434 \
  ANTHROPIC_API_KEY="" \
  claude --model qwen3-coder-64k'

# Anthropic mode (cloud) - requires ANTHROPIC_API_KEY configured
alias claude-cloud='claude'
```

Usage:

```bash
claude-local   # For sensitive or offline work
claude-cloud   # For complex tasks
```

## Troubleshooting

### "Connection Refused" Error

Ollama is not started:

```bash
ollama serve
```

### "Context Too Long" Error

The model doesn't have enough context. Create an extended version:

```bash
cat > Modelfile << 'EOF'
FROM your-model
PARAMETER num_ctx 65536
EOF

ollama create your-model-64k -f Modelfile
```

### Slow Responses

- Check that GPU is being used: `nvidia-smi` or `ollama ps`
- Use a smaller model
- Close VRAM-hungry applications

### Insufficient Quality

Try a larger model or switch back to Claude Cloud for that specific task.

## Conclusion

The Ollama integration opens new possibilities for Claude Code:

- **Privacy** for sensitive code
- **Savings** on API costs
- **Flexibility** in model choice
- **Offline work** possible

For most daily tasks, a good local model like qwen3-coder does the job very well. Keep access to Anthropic's cloud for cases where you need maximum power.

---

*To go further with Claude Code, check out my other [articles on AI and development](/tag/ia/).*
