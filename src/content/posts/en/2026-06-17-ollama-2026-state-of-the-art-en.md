---
title: "Ollama in 2026: From Local Runner to AI Platform"
subtitle: "Models, API, cloud, agents — eighteen months on from the first article"
description: "A full overview of Ollama in June 2026: v0.30.8, 200+ models, Anthropic Messages API compatibility, hybrid cloud with :cloud suffix, Claude Code / Hermes / OpenClaw integrations, and the ollama launch command."
date: 2026-06-17T00:00:00.000Z
lang: en
translationKey: "ollama-2026-state-of-the-art"
slug: "ollama-2026-state-of-the-art-en"
tags:
  - "IA"
  - "Development"
  - "Tech"
author: "Angelo Lima"
thumbnail: "/assets/img/ollama-2026-cover.png"
shareImg: "/assets/img/ollama-2026-cover.png"
aliases:
  - "/en/2026-06-17-ollama-2026-state-of-the-art-en/"
---

Back in January 2025 I wrote [a deployment guide for Ollama + Open WebUI](/en/ollama-open-webui-local-llm-deployment-docker/) focused on Docker and basic configuration. The project worked well, but it was still a runner: download a GGUF, query port 11434, done. Eighteen months and a v0.30.8 release later, the scope has changed enough to make parts of that guide obsolete. Hybrid cloud, Anthropic Messages API compatibility, native web search, agents. Here's where things stand.

---

## What Ollama Has Become

The definition "tool for running LLMs locally" still holds, but covers less and less of the actual product. Since 2026, Ollama is also a cloud proxy: some models run on your GPU, others are routed to Ollama's own infrastructure. In both cases the API is strictly identical — same commands, same port.

v0.19 introduced the MLX engine on Apple Silicon. The v0.6 release in November 2025 reworked the multi-GPU scheduler and reduced OOM crashes on multi-card setups. The big addition in June 2026 is `ollama launch`: a single command that starts a full coding agent with environment variables configured and the model downloaded if missing.

---

## Install and Run Your First Model

On macOS and Linux:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

On Windows, an installer is available at [ollama.com](https://ollama.com). The daemon starts automatically at boot.

Then:

```bash
ollama pull qwen3.6:27b     # downloads the model (~17 GB at Q4)
ollama run qwen3.6:27b      # opens an interactive chat in the terminal
```

A basic session:

```
>>> Summarize in three lines how vLLM's PagedAttention works
PagedAttention splits the KV-cache into fixed-size blocks allocated
dynamically per request. This avoids memory fragmentation and allows
multiple requests to run in parallel without wasting VRAM.

>>> /bye
```

If you prefer a web interface, [Open WebUI](/en/ollama-open-webui-local-llm-deployment-docker/) connects to Ollama with a single Docker command and gives access to all local and cloud models from a browser.

---

## The Models

The library is past 200 entries. What actually matters in June 2026:

**Qwen 3.6 27B** — 77.2% on SWE-bench, 256k token context window, fits in 24 GB VRAM at Q4. The go-to general-purpose model on consumer hardware (RTX 3090/4090, M4 Max).

**Qwen2.5-Coder 32B** — the strongest open-source coding model you can run locally right now. Available from 0.5B to 32B; the 32B beats older proprietary models on HumanEval.

**DeepSeek R1** — still the best for multi-step reasoning. 8B for 8 GB VRAM, 32B for 24 GB.

**Gemma 4** (Google, April 2026) — the only natively multimodal model on the list. Built-in function calling, sizes from E2B to E27B. The E4B runs on any recent machine and understands images.

**Mistral 7B** — best size-to-quality ratio for French. Relevant if you work in French or need European language coverage.

### Cloud Models

Since early 2026, some models exist with a `:cloud` suffix: `qwen3-coder-480b:cloud`, `kimi-k2.6:cloud`, `minimax-m3:cloud`. They don't run locally; Ollama routes them to its own servers, but the interface is strictly identical:

```bash
ollama run qwen3.6:27b              # local inference
ollama run qwen3-coder-480b:cloud   # same syntax, runs on Ollama's side
```

MiniMax M3 goes up to 1 million tokens of context and includes vision. Useful for tasks that exceed your VRAM. Requires an ollama.com account. Ollama says it doesn't retain data, but this is still an external cloud — don't use it on confidential projects.

---

## The API

### OpenAI-Compatible (Unchanged)

Port 11434 still exposes an OpenAI-compatible API. Any tool that speaks OpenAI (LangChain, LlamaIndex, OpenHands, Continue…) points at it without modification. Nothing new since 2025.

### Anthropic Messages API (January 2026)

Since January 16, 2026, Ollama also exposes the Anthropic format:

```bash
curl http://localhost:11434/api/anthropic/v1/messages \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3.6:27b",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Explain GGUF"}]
  }'
```

This opens Claude Code, Goose, and Cline to any local or cloud Ollama model. The variable `ANTHROPIC_BASE_URL=http://localhost:11434` is all you need to redirect traffic.

---

## Native Web Search

Since v0.27, when a model emits a `web_search` tool call, Ollama intercepts it, executes the search, and injects results back before generating the response. No client-side configuration:

```python
import ollama

response = ollama.chat(
    model="qwen3.6:27b",
    messages=[{"role": "user", "content": "What's the current Python version?"}],
    tools=["web_search"]
)
```

Free tier for personal use, paid tier for higher rate limits.

---

## Integrations

### Claude Code

[I covered the Claude Code + Ollama setup in January 2026](/en/claude-code-ollama-local-llm-en/) in detail. The core hasn't changed; `ollama launch` has made the bootstrapping faster:

```bash
ollama launch claude-code --model qwen3.6:27b
```

Under the hood, it sets the required environment variables and starts Claude Code with Ollama as the backend:

```bash
export ANTHROPIC_BASE_URL="http://localhost:11434"
export ANTHROPIC_AUTH_TOKEN="ollama"
export ANTHROPIC_API_KEY=""
```

Prompt caching doesn't exist on local models: every request reprocesses the full context from scratch, which inflates latency on long sessions. And Claude Code performs poorly below 32k tokens of context; set it explicitly:

```bash
export OLLAMA_CONTEXT_LENGTH=32768
```

For boilerplate refactoring or repetitive test generation, Qwen3.6 27B handles the job. For complex engineering (multi-file debugging, architecture design), Claude Sonnet or Opus is still noticeably better.

### Hermes

Hermes is an agent built by Nous Research and integrated into the Ollama ecosystem. It has cross-session memory, automatic skill creation after successful tasks, and 70+ built-in skills (web browsing, shell execution, API calls, file management). It's not a chatbot with history: the agent remembers your active projects between sessions and adjusts its behavior accordingly.

```bash
ollama launch hermes-desktop
```

Hermes Desktop is the native GUI that ships with it, available on all three OS. It includes 22 slash commands (`/web`, `/browse`, `/code`, `/shell`, `/image`…), live token tracking, and session search with conversation resumption. The backend is configurable: local Ollama, Ollama cloud, OpenRouter, Anthropic, OpenAI, or Gemini — same interface throughout.

### OpenClaw

OpenClaw isn't a coding assistant in the usual sense: it's a general machine-control agent. It manages files, sends emails, interacts with applications, browses the web, and responds to messages on WhatsApp, Telegram, Slack, or Discord. Inference runs through Ollama (local or cloud); OpenClaw handles orchestration and system access.

```bash
ollama launch opencode --model qwen3-coder-480b:cloud
```

A community repository (`awesome-openclaw-agents` on GitHub) already lists 160+ templates across 19 categories: infrastructure monitoring, mailbox management, competitive intelligence. The combination gives a local model the same computer-use capabilities as Anthropic and OpenAI agents, with no external dependency.

---

## Performance and Limits

On Apple Silicon, Ollama has used MLX under the hood since v0.19. The throughput gains on M3/M4 are measurable: roughly 2x compared to bare llama.cpp on 7B models.

On multi-GPU setups, the v0.6 scheduler distributes load better and reduces OOM crashes. It's still a simple scheduler though: Ollama doesn't implement PagedAttention or continuous batching.

That becomes a problem as soon as multiple users send requests in parallel. Mid-2026 benchmarks:

| Context | Ollama | vLLM |
|---|---|---|
| Single request (latency) | ~18% advantage | – |
| Concurrent load (max throughput) | ~41 tokens/s | ~793 tokens/s |

vLLM wins 16-20x on concurrency thanks to PagedAttention. From five or six simultaneous requests, Ollama's P99 latency spikes. For team or production deployments, vLLM is the right call.

---

## Which Tool for Which Use Case

| Use case | Tool |
|---|---|
| Solo developer, any OS | Ollama |
| Daily GUI interface | Open WebUI + Ollama |
| Multi-user production | vLLM |
| Apple Silicon, raw performance | Ollama (native MLX) |
| Embedded or unusual hardware | llama.cpp direct |
| Large models without enough VRAM | Ollama cloud models |

---

## What Changed Since 2025

[The proprietary vs. open-source model comparison](/en/openai-gpt-oss-ollama-proprietary-models-open-source-transition/) I wrote in August 2025 is already partially dated: the quality gap has narrowed on everyday tasks, and Ollama cloud models give access to 480B parameters without managing any infrastructure.

What's still true: Ollama is built for the solo developer. The project has grown by adding layers (cloud, agents, web search) rather than shifting its target audience. The business model is taking shape around paid cloud and web search tiers — the local side stays free and open source. The open question is whether the community will maintain the same quality bar as the project scales.
