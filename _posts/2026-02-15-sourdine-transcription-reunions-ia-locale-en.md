---
layout: post
title: "Sourdine: Meeting Transcription with 100% Local AI"
subtitle: "An open source macOS app to transcribe your meetings without sending your data to the cloud"
description: "Sourdine is an Electron app that transcribes your meetings in real-time and generates automatic notes with AI running entirely on your Mac. No API, no subscription, 100% privacy."
thumbnail-img: "/assets/img/sourdine-transcription-ia.webp"
cover-img: "/assets/img/sourdine-transcription-ia.webp"
tags: [IA, Développement, Projet, Open-Source]
author: "Angelo Lima"
lang: en
ref: sourdine-local-ai-transcription
categories: en
---

How many meetings do you have this week? And how many notes did you actually take? Between actively participating and taking detailed notes, you have to choose. This frustration led to **Sourdine** — with one major constraint: **everything must stay on my machine**.

## The Problem: Cloud AI vs Privacy

Transcription solutions (Otter.ai, Fireflies, Teams/Meet transcriptions) share one thing in common: **your conversations go through their servers**. Problematic for:

- Strategic business meetings
- Confidential interviews
- Medical or legal discussions
- Anything that's none of Google, Microsoft, or a startup's business

Not to mention the monthly subscriptions piling up.

## The Solution: All Local, Zero Compromise

**Sourdine** runs two AI models directly on your Mac:

| Model | Size | Role |
|-------|------|------|
| **Parakeet TDT** (NVIDIA) | 640 MB | Speech-to-text transcription |
| **Mistral 7B** | 4.4 GB | Summaries, key points, contextual chat |

No internet connection needed after initial download. Your data never leaves your machine.

## How It Works

### Smart Audio Capture

Sourdine captures two sources simultaneously:

```
Microphone (your voice)  →  ┐
                            ├→  Audio mixer  →  Transcription
System audio (Teams)     →  ┘
```

This dual capture uses **ScreenCaptureKit** (macOS 14.2+). I developed a native module in **Rust** with napi-rs to integrate it with Electron.

### Transcription Pipeline

| Step | Technology | Function |
|------|------------|----------|
| 1. Voice detection | Silero VAD | Identifies speech vs silence/noise |
| 2. Transcription | Parakeet TDT via sherpa-onnx | Converts audio to text |
| 3. AI notes | Mistral 7B via node-llama-cpp | Generates summary, actions, key points |

STT runs in a separate Node.js worker to avoid blocking the UI.

### Note Generation

Mistral 7B analyzes the transcription to extract:

- **Summary** of the discussion
- **Key points** covered
- **Action items** with assigned people
- **Title** automatically generated

You can also ask questions: *"What did Pierre say about the budget?"*

## Technical Architecture

```
┌──────────────────────────────────────────────────┐
│  Electron Main Process                           │
│  ├── NestJS Backend (dependency injection)      │
│  ├── stt-worker (sherpa-onnx, isolated process) │
│  ├── llm-worker (node-llama-cpp, isolated)      │
│  └── SQLite (local storage, FTS5 search)        │
└──────────────────────────────────────────────────┘
                       │ IPC
┌──────────────────────┴───────────────────────────┐
│  Renderer Process (Angular 21)                   │
└──────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Desktop** | Electron 34 |
| **Frontend** | Angular 21, Signals, SCSS |
| **Backend** | NestJS 11, RxJS |
| **Database** | SQLite + FTS5 (full-text search) |
| **Audio** | Rust/napi-rs + ScreenCaptureKit |
| **Build** | Nx monorepo, Vite, Electron Forge |

### Why These Choices?

- **Electron** — Native system access (audio, files), TypeScript ecosystem
- **NestJS in Electron** — Modular architecture, dependency injection
- **Separate workers** — AI model isolation (crash-safe)
- **Rust for audio** — Native performance, ScreenCaptureKit integration

## Performance on Apple Silicon

| Metric | MacBook Pro M2 |
|--------|----------------|
| Transcription | Real-time |
| LLM generation | ~20 tokens/s |
| Peak RAM | ~4 GB |
| Active CPU | 15-30% |

Apple Silicon chips with their Neural Engine are perfectly suited for this.

## What I Learned

### 1. Audio Is Complicated

- Resampling (48kHz → 16kHz)
- Format conversion (Float32 → Int16 PCM)
- Multi-source mixing
- Buffer and latency management

### 2. Local AI Has Constraints

- 16 GB RAM minimum
- Initial loading takes several seconds
- Quality depends on quantization (Q4_K_M = good compromise)

### 3. Electron Is Not Dead

Despite criticism about memory usage, still the best choice for cross-platform desktop with native access.

## Installation

### Requirements

| Component | Minimum |
|-----------|---------|
| macOS | 14.2 (Sonoma) |
| Processor | Apple Silicon (M1+) |
| RAM | 16 GB |
| Storage | 10 GB |

### Download the DMG

**[Download Sourdine v0.1.1-beta](https://github.com/Lingelo/Sourdine/releases/download/v0.1.1-beta/Sourdine.dmg)**

1. Open the DMG and drag Sourdine to Applications
2. Run this command (app is not signed):
   ```bash
   xattr -cr /Applications/Sourdine.app
   ```
3. Launch Sourdine — The wizard will download AI models (~5 GB)

> **Beta**: This version is under active development. Feedback is welcome via [GitHub Issues](https://github.com/Lingelo/Sourdine/issues).

## Roadmap

| Feature | Status |
|---------|--------|
| Speaker diarization | Planned |
| Multi-language support | Planned |
| Calendar integration | Planned |
| Cloud sync (E2E encrypted) | Under consideration |

## Conclusion

**Sourdine** was born from a personal need: keeping control over my data while benefiting from AI. The project is **open source** and contributions are welcome.

**[github.com/Lingelo/Sourdine](https://github.com/Lingelo/Sourdine)**

---

*If you share this concern for privacy, I hope this project will be useful to you.*
