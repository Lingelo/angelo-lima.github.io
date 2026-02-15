---
layout: post
title: "Sourdine : Transcription de réunions avec IA 100% locale"
subtitle: "Une application macOS open source pour transcrire vos réunions sans envoyer vos données dans le cloud"
description: "Sourdine est une application Electron qui transcrit vos réunions en temps réel et génère des notes automatiques avec une IA qui tourne entièrement sur votre Mac. Aucune API, aucun abonnement, 100% vie privée."
thumbnail-img: "/assets/img/sourdine-transcription-ia.webp"
cover-img: "/assets/img/sourdine-transcription-ia.webp"
tags: [IA, Développement, Projet, Open-Source]
author: "Angelo Lima"
lang: fr
ref: sourdine-local-ai-transcription
categories: fr
---

Combien de réunions avez-vous cette semaine ? Et combien de notes avez-vous réellement prises ? Entre participer activement et prendre des notes détaillées, il faut choisir. C'est de cette frustration qu'est né **Sourdine** — avec une contrainte majeure : **tout doit rester sur ma machine**.

## Le Problème : IA Cloud vs Vie Privée

Les solutions de transcription (Otter.ai, Fireflies, transcriptions Teams/Meet) partagent un point commun : **vos conversations transitent par leurs serveurs**. Problématique pour :

- Réunions stratégiques d'entreprise
- Entretiens confidentiels
- Discussions médicales ou juridiques
- Tout ce qui ne regarde pas Google, Microsoft ou une startup

Sans parler des abonnements mensuels qui s'accumulent.

## La Solution : Tout Local, Zéro Compromis

**Sourdine** fait tourner deux modèles d'IA directement sur votre Mac :

| Modèle | Taille | Rôle |
|--------|--------|------|
| **Parakeet TDT** (NVIDIA) | 640 Mo | Transcription speech-to-text |
| **Mistral 7B** | 4.4 Go | Résumés, points clés, chat contextuel |

Aucune connexion internet après le téléchargement initial. Vos données ne quittent jamais votre machine.

## Comment Ça Marche

### Capture Audio Intelligente

Sourdine capture simultanément deux sources :

```
Micro (votre voix)    →  ┐
                         ├→  Mixeur audio  →  Transcription
Audio système (Teams) →  ┘
```

Cette double capture utilise **ScreenCaptureKit** (macOS 14.2+). J'ai développé un module natif en **Rust** avec napi-rs pour l'intégrer à Electron.

### Pipeline de Transcription

| Étape | Technologie | Fonction |
|-------|-------------|----------|
| 1. Détection voix | Silero VAD | Identifie parole vs silence/bruit |
| 2. Transcription | Parakeet TDT via sherpa-onnx | Convertit audio en texte |
| 3. Notes IA | Mistral 7B via node-llama-cpp | Génère résumé, actions, points clés |

Le STT tourne dans un worker Node.js séparé pour ne pas bloquer l'interface.

### Génération de Notes

Mistral 7B analyse la transcription pour extraire :

- **Résumé** concis de la discussion
- **Points clés** abordés
- **Actions à suivre** avec personnes assignées
- **Titre** descriptif automatique

Vous pouvez aussi poser des questions : *"Qu'est-ce que Pierre a dit à propos du budget ?"*

## Architecture Technique

```
┌──────────────────────────────────────────────────┐
│  Electron Main Process                           │
│  ├── NestJS Backend (injection de dépendances)  │
│  ├── stt-worker (sherpa-onnx, process isolé)    │
│  ├── llm-worker (node-llama-cpp, process isolé) │
│  └── SQLite (stockage local, recherche FTS5)    │
└──────────────────────────────────────────────────┘
                       │ IPC
┌──────────────────────┴───────────────────────────┐
│  Renderer Process (Angular 21)                   │
└──────────────────────────────────────────────────┘
```

### Stack Technique

| Couche | Technologies |
|--------|--------------|
| **Desktop** | Electron 34 |
| **Frontend** | Angular 21, Signals, SCSS |
| **Backend** | NestJS 11, RxJS |
| **Database** | SQLite + FTS5 (recherche full-text) |
| **Audio** | Rust/napi-rs + ScreenCaptureKit |
| **Build** | Nx monorepo, Vite, Electron Forge |

### Pourquoi Ces Choix ?

- **Electron** — Accès natif au système (audio, fichiers), écosystème TypeScript
- **NestJS dans Electron** — Architecture modulaire, injection de dépendances
- **Workers séparés** — Isolation des modèles IA (crash-safe)
- **Rust pour l'audio** — Performances natives, intégration ScreenCaptureKit

## Performance sur Apple Silicon

| Métrique | MacBook Pro M2 |
|----------|----------------|
| Transcription | Temps réel |
| Génération LLM | ~20 tokens/s |
| RAM au pic | ~4 Go |
| CPU actif | 15-30% |

Les puces Apple Silicon avec leur Neural Engine sont parfaitement adaptées.

## Ce Que J'ai Appris

### 1. L'Audio, C'est Compliqué

- Resampling (48kHz → 16kHz)
- Conversion formats (Float32 → Int16 PCM)
- Mixage sources multiples
- Gestion buffers et latence

### 2. L'IA Locale a des Contraintes

- 16 Go RAM minimum
- Chargement initial de plusieurs secondes
- Qualité dépend de la quantification (Q4_K_M = bon compromis)

### 3. Electron N'est Pas Mort

Malgré les critiques sur la mémoire, reste le meilleur choix pour desktop cross-platform avec accès natif.

## Installation

### Prérequis

| Composant | Minimum |
|-----------|---------|
| macOS | 14.2 (Sonoma) |
| Processeur | Apple Silicon (M1+) |
| RAM | 16 Go |
| Stockage | 10 Go |

### Téléchargement

```bash
# Option 1 : DMG
# → github.com/Lingelo/Sourdine/releases

# Option 2 : Build depuis sources
git clone https://github.com/Lingelo/Sourdine.git
cd Sourdine
npm install
npm run download-model       # STT (~640 Mo)
npm run download-llm-model   # LLM (~4.4 Go)
npm run dev
```

> **Note** : L'app n'est pas signée. Exécutez `xattr -cr /Applications/Sourdine.app` après installation.

## Roadmap

| Fonctionnalité | Statut |
|----------------|--------|
| Speaker diarization | Prévu |
| Support multi-langue | Prévu |
| Intégration calendrier | Prévu |
| Sync cloud (chiffré E2E) | À étudier |

## Conclusion

**Sourdine** est né d'un besoin personnel : garder le contrôle sur mes données tout en bénéficiant de l'IA. Le projet est **open source** et les contributions sont bienvenues.

**[github.com/Lingelo/Sourdine](https://github.com/Lingelo/Sourdine)**

---

*Si vous partagez cette préoccupation pour la vie privée, j'espère que ce projet vous sera utile.*
