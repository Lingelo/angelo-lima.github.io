---
layout: post
title: "Sourdine : Transcription de réunions avec IA 100% locale"
subtitle: "Comment j'ai créé une application macOS pour transcrire mes réunions sans envoyer mes données dans le cloud"
description: "Sourdine est une application Electron open source qui transcrit vos réunions en temps réel et génère des notes automatiques avec une IA qui tourne entièrement sur votre Mac. Aucune API, aucun abonnement, 100% vie privée."
thumbnail-img: "/assets/img/sourdine-transcription-ia.webp"
cover-img: "/assets/img/sourdine-transcription-ia.webp"
tags: [IA, Développement, Projet, Open-Source]
author: "Angelo Lima"
lang: fr
ref: sourdine-local-ai-transcription
categories: fr
---

Combien de réunions avez-vous cette semaine ? Et combien de notes avez-vous réellement prises ? Si vous êtes comme moi, la réponse à la deuxième question est probablement "pas assez". Entre participer activement à la discussion et prendre des notes détaillées, il faut choisir. C'est de cette frustration qu'est né **Sourdine**, une application macOS que j'ai développée pour résoudre ce problème — avec une contrainte majeure : **tout doit rester sur ma machine**.

## Le problème : IA cloud vs vie privée

Les solutions de transcription automatique existent déjà. Otter.ai, Fireflies, et même les transcriptions intégrées de Teams ou Meet font le travail. Mais elles partagent toutes un point commun : **vos conversations transitent par leurs serveurs**.

Pour des discussions personnelles, ce n'est peut-être pas gênant. Mais dès qu'on parle de :
- Réunions stratégiques d'entreprise
- Entretiens confidentiels
- Discussions médicales ou juridiques
- Simplement... tout ce qui ne regarde pas Google, Microsoft ou une startup

La situation devient problématique. Et je ne parle même pas des abonnements mensuels qui s'accumulent.

## La solution : tout local, zéro compromis

**Sourdine** prend une approche radicalement différente. Deux modèles d'IA tournent directement sur votre Mac :

1. **Parakeet TDT** (NVIDIA) — Un modèle de transcription speech-to-text de 640 Mo, optimisé pour la rapidité
2. **Mistral 7B** — Un LLM de 4.4 Go pour la génération de résumés, points clés et réponses contextuelles

Aucune connexion internet n'est nécessaire après le téléchargement initial des modèles. Vos données ne quittent jamais votre machine.

## Comment ça marche ?

### Capture audio intelligente

Sourdine capture simultanément deux sources audio :
- **Votre micro** — Votre propre voix
- **L'audio système** — Ce que vous entendez (vos interlocuteurs sur Teams, Meet, Zoom...)

Cette double capture est rendue possible grâce à **ScreenCaptureKit**, l'API d'Apple pour la capture d'écran et audio système sur macOS. J'ai développé un module natif en **Rust** avec napi-rs pour l'intégrer à Electron.

```
Micro (votre voix)    →  ┐
                         ├→  Mixeur audio  →  Transcription
Audio système (Teams) →  ┘
```

### Transcription en temps réel

L'audio passe ensuite par deux étapes :

1. **Silero VAD** — Détection d'activité vocale. Le modèle identifie quand quelqu'un parle vs les silences/bruits de fond.
2. **Parakeet TDT** — Transcription proprement dite via sherpa-onnx, une bibliothèque C++ optimisée pour l'inférence on-device.

Le tout tourne dans un worker Node.js séparé pour ne pas bloquer l'interface.

### Génération de notes par IA

Une fois la transcription terminée (ou pendant, si vous le souhaitez), Mistral 7B analyse le texte pour extraire :
- Un **résumé** concis de la discussion
- Les **points clés** abordés
- Les **actions à suivre** avec les personnes assignées
- Un **titre** descriptif pour la session

Vous pouvez aussi poser des questions en langage naturel : "Qu'est-ce que Pierre a dit à propos du budget ?" ou "Quelles décisions ont été prises ?"

## Architecture technique

Pour les curieux, voici comment l'application est structurée :

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
│  Interface utilisateur moderne avec signals      │
└──────────────────────────────────────────────────┘
```

### Pourquoi ces choix ?

**Electron** — Parce que je voulais une vraie application desktop avec accès au système (audio, fichiers), pas une webapp limitée. Et parce que TypeScript/Angular est mon terrain de jeu favori.

**NestJS dans Electron** — Ça peut sembler surprenant, mais l'architecture modulaire de NestJS avec son injection de dépendances est parfaite pour organiser un backend complexe (audio, STT, LLM, database...).

**Workers séparés** — Les modèles IA peuvent crasher ou consommer beaucoup de mémoire. En les isolant dans des process fils, l'application principale reste stable.

**Rust pour l'audio** — ScreenCaptureKit est une API Objective-C. Le wrapper Rust via napi-rs offre des performances natives avec une intégration propre dans Node.js.

## Performance sur Apple Silicon

Sur un MacBook Pro M2, voici ce que j'observe :
- **Transcription** : Temps réel (le modèle traite l'audio plus vite qu'il n'arrive)
- **Génération LLM** : ~20 tokens/seconde pour Mistral 7B en quantification 4-bit
- **Utilisation RAM** : ~4 Go au pic (modèle LLM chargé)
- **Consommation CPU** : 15-30% pendant une transcription active

Les puces Apple Silicon avec leur Neural Engine et leur bande passante mémoire unifiée sont parfaitement adaptées à ce type de workload.

## Ce que j'ai appris

### 1. L'audio, c'est compliqué

Capturer l'audio système sur macOS n'est pas trivial. Avant ScreenCaptureKit (macOS 12.3+), il fallait installer des kernel extensions comme BlackHole ou Loopback. Maintenant c'est natif, mais il faut quand même gérer :
- Le resampling (48kHz → 16kHz pour le STT)
- La conversion de formats (Float32 → Int16 PCM)
- Le mixage de sources multiples
- Les buffers et la latence

### 2. L'IA locale a des contraintes

Faire tourner un LLM de 7B paramètres en local, c'est possible, mais :
- Il faut 16 Go de RAM minimum
- Le chargement initial prend plusieurs secondes
- La qualité dépend énormément de la quantification

J'ai opté pour le format Q4_K_M de TheBloke — un bon compromis qualité/vitesse.

### 3. Electron n'est pas mort

Malgré les critiques sur la consommation mémoire, Electron reste le meilleur choix pour une application desktop cross-platform avec accès aux APIs natives. Les alternatives (Tauri, neutralinojs) ne sont pas assez matures pour un projet de cette complexité.

## Essayer Sourdine

Le projet est **open source** et disponible sur GitHub :

**[github.com/Lingelo/Sourdine](https://github.com/Lingelo/Sourdine)**

### Prérequis

- macOS 14.2+ (Sonoma) — pour ScreenCaptureKit
- Apple Silicon (M1/M2/M3/M4) — recommandé
- 16 Go de RAM minimum
- ~10 Go d'espace disque (modèles IA)

### Installation

Téléchargez le DMG depuis la page [Releases](https://github.com/Lingelo/Sourdine/releases), ou buildez depuis les sources :

```bash
git clone https://github.com/Lingelo/Sourdine.git
cd Sourdine
npm install
npm run download-model       # Modèle STT (~640 Mo)
npm run download-llm-model   # Modèle LLM (~4.4 Go)
npm run dev
```

## Et après ?

La roadmap inclut :
- **Speaker diarization** — Identifier qui parle (Marie vs Pierre)
- **Support multi-langue** — Actuellement français/anglais
- **Intégration calendrier** — Démarrage automatique avant les réunions
- **Sync cloud optionnel** — Chiffré de bout en bout, pour ceux qui le souhaitent

Les contributions sont bienvenues ! Le projet utilise Nx, Angular 21, NestJS 11, et beaucoup d'amour pour le TypeScript.

---

*Sourdine est né d'un besoin personnel : garder le contrôle sur mes données tout en bénéficiant de l'IA. Si vous partagez cette préoccupation, j'espère que ce projet vous sera utile.*
