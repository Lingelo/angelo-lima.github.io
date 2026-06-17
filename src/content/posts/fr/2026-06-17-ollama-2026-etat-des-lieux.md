---
title: "Ollama en 2026 : d'un runner local à une plateforme IA"
subtitle: "Modèles, API, cloud, agents — état des lieux dix-huit mois après le premier article"
description: "Tour d'horizon d'Ollama en juin 2026 : v0.30.8, 200+ modèles, compatibilité Anthropic Messages API, cloud hybride avec suffix :cloud, intégrations Claude Code / Hermes / OpenClaw et la commande ollama launch."
date: 2026-06-17T12:00:00.000Z
lang: fr
translationKey: "ollama-2026-state-of-the-art"
slug: "ollama-2026-etat-des-lieux"
tags:
  - "IA"
  - "Développement"
  - "Tech"
author: "Angelo Lima"
thumbnail: "/assets/img/ollama_openai.webp"
shareImg: "/assets/img/ollama_openai.webp"
aliases:
  - "/2026-06-17-ollama-2026-etat-des-lieux/"
---

En janvier 2025, j'avais écrit [un guide de déploiement Ollama + Open WebUI](/fr/ollama-open-web-ui/) centré sur Docker et la configuration de base. Le projet tournait bien, mais restait un runner : on téléchargeait un GGUF, on interrogeait le port 11434, fin de l'histoire. Dix-huit mois et une version v0.30.8 plus tard, le périmètre a changé au point de rendre ce guide en partie obsolète. Cloud hybride, compatibilité Anthropic Messages API, web search native, agents. Voici l'état actuel.

---

## Ce qu'Ollama est devenu

La définition « outil pour faire tourner des LLM en local » tient toujours, mais couvre de moins en moins le produit réel. Depuis 2026, Ollama est aussi un proxy cloud : certains modèles tournent sur vos GPU, d'autres sont routés vers l'infrastructure Ollama, et dans les deux cas l'API est identique. Même commandes, même client Python, même port.

La v0.19 avait introduit le moteur MLX sur Apple Silicon. La v0.6 de novembre 2025 a revu le scheduler multi-GPU et réduit les crashs OOM sur les configs avec plusieurs cartes. En juin 2026, le gros ajout c'est `ollama launch` : une commande unique qui démarre un coding agent complet, variables d'environnement configurées, modèle téléchargé si absent.

---

## Installer et lancer un premier modèle

Sur macOS et Linux, une commande suffit :

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Sur Windows, un installeur est disponible sur [ollama.com](https://ollama.com). Le daemon démarre automatiquement au lancement du système.

Ensuite :

```bash
ollama pull qwen3.6:27b          # télécharge le modèle (~17 Go à Q4)
ollama run qwen3.6:27b           # ouvre un chat interactif dans le terminal
```

Une session basique :

```
>>> Résume en trois lignes comment fonctionne le PagedAttention de vLLM
PagedAttention découpe la mémoire KV-cache en blocs de taille fixe,
alloués dynamiquement à chaque requête. Cela évite la fragmentation
et permet de servir plusieurs requêtes en parallèle sans gaspiller de VRAM.

>>> /bye
```

Si vous préférez une interface web, [Open WebUI](/fr/ollama-open-web-ui/) se connecte à Ollama en une ligne Docker et donne accès à tous les modèles locaux et cloud depuis un navigateur.

---

## Les modèles

La bibliothèque dépasse 200 entrées. Ce qui compte vraiment en juin 2026 :

**Qwen 3.6 27B** — 77,2 % sur SWE-bench, fenêtre de 256k tokens, tient en 24 Go VRAM à Q4. C'est la référence généraliste sur matériel consommateur (RTX 3090/4090, M4 Max).

**Qwen2.5-Coder 32B** — le modèle de code open source le plus fort en local à date. Décliné de 0,5B à 32B ; le 32B dépasse les anciens modèles propriétaires sur HumanEval.

**DeepSeek R1** — toujours pertinent pour le raisonnement en plusieurs étapes. 8B pour 8 Go de VRAM, 32B pour 24 Go.

**Gemma 4** (Google, avril 2026) — le seul multimodal de la liste. Function calling natif, déclinaisons E2B à E27B. Le E4B passe sur n'importe quelle machine récente et comprend les images.

**Mistral 7B** — reste le meilleur rapport taille/qualité pour le français.

### Les modèles cloud

Depuis début 2026, certains modèles existent avec un suffix `:cloud` : `qwen3-coder-480b:cloud`, `kimi-k2.6:cloud`, `minimax-m3:cloud`. Ils ne tournent pas en local ; Ollama les route vers ses serveurs, mais l'interface est strictement identique :

```bash
ollama run qwen3.6:27b          # inférence locale
ollama run qwen3-coder-480b:cloud  # même syntaxe, tourne chez Ollama
```

MiniMax M3 monte à 1 million de tokens de contexte et inclut la vision. Utile pour des tâches qui dépassent votre VRAM. Requiert un compte ollama.com. Ollama indique ne pas conserver les données, mais ça reste du cloud externe — à ne pas utiliser sur des projets confidentiels.

---

## L'API

### OpenAI-compatible (inchangée)

Le port 11434 expose toujours une API OpenAI-compatible. Tous les outils qui parlent OpenAI (LangChain, LlamaIndex, OpenHands, Continue…) pointent dessus sans modification. Rien de nouveau depuis 2025.

### Anthropic Messages API (janvier 2026)

Depuis le 16 janvier 2026, Ollama expose également le format Anthropic :

```bash
curl http://localhost:11434/api/anthropic/v1/messages \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3.6:27b",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Explique le GGUF"}]
  }'
```

Ça ouvre Claude Code, Goose, Cline à n'importe quel modèle local ou cloud Ollama. La variable `ANTHROPIC_BASE_URL=http://localhost:11434` suffit à rediriger le trafic.

---

## La web search native

Depuis la v0.27, quand un modèle émet un tool call `web_search`, Ollama intercepte, exécute la recherche et réinjecte les résultats avant de générer la réponse. Aucune config côté client :

```python
import ollama

response = ollama.chat(
    model="qwen3.6:27b",
    messages=[{"role": "user", "content": "Quelle est la version actuelle de Python ?"}],
    tools=["web_search"]
)
```

Tier gratuit pour usage personnel, tier payant pour les rate limits plus élevés.

---

## Les intégrations

### Claude Code

[J'avais détaillé la config Claude Code + Ollama en janvier 2026](/fr/claude-code-ollama-local-llm/). Les grandes lignes n'ont pas changé ; `ollama launch` a simplifié l'amorçage :

```bash
ollama launch claude-code --model qwen3.6:27b
```

En interne, ça pose les trois variables nécessaires et démarre Claude Code pointé sur votre GPU :

```bash
export ANTHROPIC_BASE_URL="http://localhost:11434"
export ANTHROPIC_AUTH_TOKEN="ollama"
export ANTHROPIC_API_KEY=""
```

Deux restrictions à garder en tête. La prompt caching n'existe pas sur les modèles locaux : chaque requête retraite tout le contexte depuis zéro, ce qui renchérit la latence sur les sessions longues. Et Claude Code fonctionne mal sous 32k tokens de contexte ; il faut configurer explicitement :

```bash
export OLLAMA_CONTEXT_LENGTH=32768
```

Pour du refactoring de boilerplate ou de la génération de tests répétitifs, Qwen3.6 27B en local fait le travail. Pour de l'ingénierie complexe (debug multi-fichiers, conception d'architecture), Claude Sonnet ou Opus reste nettement supérieur.

### Hermes

Hermes est un agent de Nous Research intégré à l'écosystème Ollama. Mémoire cross-session, création automatique de skills après chaque tâche réussie, 70+ skills embarqués par défaut (navigation web, shell, appels API, gestion de fichiers). Ce n'est pas un chatbot avec historique : l'agent se souvient de vos projets entre les sessions et ajuste son comportement en conséquence.

```bash
ollama launch hermes-desktop
```

Hermes Desktop est l'interface graphique qui l'accompagne, native sur les trois OS. Elle inclut 22 slash commands (`/web`, `/browse`, `/code`, `/shell`, `/image`…), un suivi de tokens en temps réel, et la reprise de session avec recherche plein texte. Le backend est configurable : Ollama local, cloud Ollama, OpenRouter, Anthropic, OpenAI ou Gemini — sans changer d'interface.

### OpenClaw

OpenClaw n'est pas un coding assistant au sens strict : c'est un agent de contrôle de la machine. Il gère des fichiers, envoie des emails, interagit avec des applications, navigue sur le web, répond à des messages sur WhatsApp, Telegram, Slack ou Discord. L'inférence tourne via Ollama (local ou cloud), OpenClaw assure l'orchestration et l'accès au système.

```bash
ollama launch opencode --model qwen3-coder-480b:cloud
```

Un dépôt communautaire (`awesome-openclaw-agents` sur GitHub) liste déjà plus de 160 templates sur 19 catégories : monitoring d'infra, gestion de boîte mail, veille concurrentielle. La combinaison donne à un modèle local les capacités de computer-use des agents Anthropic et OpenAI, sans aucune dépendance externe.

---

## Performances et limites

Sur Apple Silicon, Ollama utilise MLX sous le capot depuis la v0.19. En pratique, les gains sur M3/M4 sont mesurables : le débit sur un modèle 7B est environ deux fois supérieur à llama.cpp seul.

Sur les configs multi-GPU, le scheduler de la v0.6 répartit mieux la charge et réduit les OOM. Ça reste un scheduler simple : Ollama n'implémente pas de PagedAttention ni de continuous batching.

C'est là que le bât blesse dès que plusieurs utilisateurs envoient des requêtes en parallèle. Dans les benchmarks de mi-2026 :

| Contexte | Ollama | vLLM |
|---|---|---|
| Requête unique (latence) | avantage ~18 % | – |
| Charge concurrente (débit max) | ~41 tokens/s | ~793 tokens/s |

vLLM gagne à 16-20x sur la concurrence grâce au PagedAttention. À partir de cinq ou six requêtes simultanées, la latence P99 d'Ollama s'emballe. Pour un déploiement en équipe ou en production, vLLM reste le bon choix.

---

## Quel outil pour quel usage

| Usage | Outil |
|---|---|
| Développeur solo, toutes plateformes | Ollama |
| Interface GUI pour usage quotidien | Open WebUI + Ollama |
| Production multi-utilisateurs | vLLM |
| Apple Silicon, performance brute | Ollama (MLX natif) |
| Hardware embarqué ou atypique | llama.cpp direct |
| Grands modèles sans GPU suffisant | Ollama cloud models |

---

## Ce qui a changé depuis 2025

[La comparaison entre modèles propriétaires et open source](/fr/openai-gpt-oss-ollama-modeles-propriétaires-open-source/) que j'avais faite en août 2025 est déjà en partie datée : l'écart de qualité s'est réduit sur les tâches courantes, et les modèles cloud Ollama donnent accès à des 480B sans avoir à gérer l'infrastructure.

Ce qui reste vrai : Ollama est optimisé pour le développeur solo. Le projet a grandi en ajoutant des couches (cloud, agents, web search) plutôt qu'en changeant sa cible. Le business model se dessine autour des tiers payants cloud et web search — la partie locale reste gratuite et open source. La question ouverte est de savoir si la communauté maintiendra les mêmes standards de qualité à mesure que le projet grossit.
