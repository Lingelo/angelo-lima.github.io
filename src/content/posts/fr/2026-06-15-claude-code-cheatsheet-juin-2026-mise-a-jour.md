---
title: "Claude Code Cheat Sheet — Juin 2026 : Fable 5, Opus 4.8, Agent View et Dynamic Workflows"
subtitle: "Référence exhaustive à jour pour Claude Code v2.1.170 — Juin 2026"
description: "Cheatsheet Claude Code juin 2026 exhaustive : 65+ commandes slash, 70+ flags et variables d'environnement, 27 événements hooks, Fable 5, Opus 4.8, Agent View, Dynamic Workflows, ultracode, security-guidance plugin, --safe-mode, fallback chains. Disponible en FR et EN."
date: 2026-06-15T12:00:00.000Z
lang: fr
translationKey: "claude-code-cheatsheet-juin-2026"
slug: "claude-code-cheatsheet-juin-2026-mise-a-jour"
tags:
  - "IA"
  - "Développement"
  - "Claude Code"
author: "Angelo Lima"
cover: "/assets/img/claude-code.webp"
thumbnail: "/assets/img/claude-code.webp"
aliases:
  - "/2026-06-15-claude-code-cheatsheet-juin-2026-mise-a-jour/"
---
J'avais republié une cheatsheet Claude Code fin avril. Sept semaines plus tard, elle a pris un sacré coup de vieux : entre v2.1.101 et v2.1.170, Anthropic a poussé une bonne soixantaine de releases. **Deux nouveaux modèles** sont sortis (Opus 4.8 le 28 mai, puis Fable 5 le 9 juin), l'**Agent View** est arrivée, les **dynamic workflows** orchestrent maintenant des centaines de sous-agents, et une poignée de nouvelles commandes (`/goal`, `/cd`, `/workflows`, `/ultrareview`, `/reload-skills`…) se sont ajoutées.

J'ai donc republié une version juin 2026 — la **même architecture visuelle** que mars et avril, réécrite pour coller à chaque ajout, avec la **palette du blog** (fond sombre, accent doré).

## La cheat sheet

- **[Français — HTML interactif](/assets/data/claude-code-cheatsheet-juin-2026.html)**
- **[English — Interactive HTML](/assets/data/claude-code-cheatsheet-june-2026-en.html)**

Les versions précédentes restent accessibles : avril [FR](/assets/data/claude-code-cheatsheet-avril-2026.html) · [EN](/assets/data/claude-code-cheatsheet-april-2026-en.html), mars [FR](/assets/data/claude-code-cheatsheet-2026.html) · [EN](/assets/data/claude-code-cheatsheet-2026-en.html).

Les éléments marqués d'un badge doré **NEW** sont des features ajoutées depuis l'édition avril 2026.

## Ce qui est couvert

16 sections (deux nouvelles cartes : Agent View, et Dynamic Workflows & Sécurité) :

| Section | Couverture |
|---------|-----------|
| Raccourcis Clavier | ~30 raccourcis, navigation transcript, mode Vim |
| Commandes Slash | **65+ commandes** en 6 catégories |
| CLI Flags & Sous-commandes | 70+ flags en 9 catégories, `claude agents` |
| The Big 5 (Extension System) | CLAUDE.md, Rules, Commands, Skills, Subagents, MCP, Plugins |
| Modes de Permission | 6 modes + hardening juin (fichiers de démarrage, configs build) |
| Hooks | **27 événements**, 5 handlers, `MessageDisplay`, `args[]` |
| Input Superpowers | @mentions, !shell, pipes, worktrees, `--bg --exec` |
| Configuration | Hiérarchie 5 niveaux, env vars, settings.json |
| File Structure Map | Arborescence projet + globale |
| Rewind & Checkpoints | Options rewind + « Summarize up to here » |
| Auto Mode | Classifier, GA Pro, hard deny, Bedrock/Vertex/Foundry |
| **Modèles & Effort Levels** | Fable 5, Opus 4.8/4.7, Sonnet 4.6, Haiku 4.5 + `ultracode` |
| Plateformes | CLI (Windows sans Git Bash), Desktop, Web (Routines), IDE |
| **Agent View** | `claude agents`, sessions pinned, background exec |
| **Dynamic Workflows & Sécurité** | `/workflows`, security-guidance plugin, `/ultrareview` |
| Pro Workflow | Plan → Execute, `/goal`, fallback chains, safe mode |
| Personnaliser Claude Code | Frontmatter complet + scaffolding plugin |
| Quick Reference | Combos à jour avec les nouveautés de juin |

## Ajouts et changements depuis avril 2026

### Claude Opus 4.8 (28 mai)

Nouveau modèle par défaut sur Max, Team Premium, Enterprise pay-as-you-go et l'API Anthropic (requiert v2.1.154+). Effort `high` par défaut, `xhigh` pour les tâches les plus dures, contexte 1M natif. Le **fast mode** tourne désormais sur Opus 4.8 à 10/50 $ par MTok (2× le tarif standard pour ~2,5× la vitesse) ; Opus 4.6 fast mode est déprécié.

### Claude Fable 5 (9 juin)

Le modèle **Mythos-class**, le plus capable disponible dans Claude Code : 1M de contexte, jusqu'à 128K de tokens en sortie, 10/50 $ par MTok. Pensé pour les tâches plus grosses qu'une seule session — il tient de longues sessions autonomes, investigue avant d'agir et vérifie son travail. Il n'est **pas** le modèle par défaut : `/model fable` (ou l'alias `best`). Le thinking y est toujours actif, non désactivable.

Particularité importante : Fable 5 tourne avec des **classifiers de sécurité** (cybersécurité, biologie). Une requête flaggée bascule automatiquement sur Opus (4.8 sur l'API, 4.7 sur AWS) avec une notice dans le transcript. Pour vérifier si c'est une customisation (CLAUDE.md, repo de sécurité…) qui déclenche le fallback dès la première requête, lancez `claude --safe-mode`.

### Agent View (`claude agents`, 11 mai)

La grosse feature UX : un **seul écran pour toutes vos sessions** Claude Code — ce qui tourne, ce qui attend une réponse de vous, ce qui est terminé. `claude agents` ou `←←` depuis une session. Les sessions background « pinned » restent vivantes au repos, `/resume` les liste avec leur durée écoulée, et `claude --bg --exec "pytest -x"` lance un job shell attachable.

### Dynamic workflows & ultracode (28 mai)

Un **workflow** est un script d'orchestration que Claude écrit pour votre tâche et exécute sur des dizaines à des centaines de sous-agents en arrière-plan — idéal pour un audit codebase-wide ou une grosse migration. On les gère avec `/workflows`, et on les déclenche via le niveau d'effort `ultracode` (xhigh + orchestration auto) ou le mot-clé `ultracode` (l'ancien `workflow`, renommé début juin).

### Le plugin security-guidance (28 mai)

Un plugin officiel qui review les changements de Claude pour des vulnérabilités et les corrige dans la même session : check rapide par pattern sur chaque édition, review modèle en fin de tour, review agentique approfondie au commit/push. `/plugin install security-guidance@claude-plugins-official` puis `/reload-plugins`. Règles projet dans `.claude/claude-security-guidance.md`.

### Nouvelles commandes slash

`/goal` (fixer une condition de fin, Claude itère jusqu'à l'atteindre), `/cd` (changer de cwd sans casser le prompt cache), `/scroll-speed`, `/workflows`, `/reload-skills`, `/ultrareview` (flotte d'agents chasseurs de bugs dans le cloud), `/web-setup`. La paire `/code-review` (bugs de correction, `--comment`/`--fix`) et `/simplify` (review cleanup-only qui applique les fixes) a été redécoupée.

### Auto Mode en GA sur Pro

Le classifier de permissions tourne désormais sur **Pro** (avec Sonnet 4.6 ou Opus) et ne demande plus de consentement opt-in. Nouveau : `autoMode.hard_deny` pour des règles qui bloquent inconditionnellement, et la disponibilité sur Bedrock/Vertex/Foundry via `CLAUDE_CODE_ENABLE_AUTO_MODE=1`.

### 27e événement hook + nouveautés

Nouvel événement `MessageDisplay` (transformer/masquer le texte affiché). Plus : `Stop`/`SubagentStop` peuvent renvoyer `additionalContext`, les hooks `command` acceptent une forme exec `args: string[]` (plus d'échappement de quotes), `PostToolUse` gagne `continueOnBlock`, `SessionStart` peut renvoyer `reloadSkills: true`, et `$CLAUDE_EFFORT` / `effort.level` sont visibles aux hooks.

### Fallback chains, safe mode & version gating

`--fallback-model` accepte maintenant une **chaîne** (jusqu'à 3 modèles, virgule) et s'applique aussi en interactif ; persistable via `fallbackModel` (array) dans les settings. `--safe-mode` (et `CLAUDE_CODE_SAFE_MODE`) désactive toutes les customisations pour le debug. Les admins peuvent imposer `requiredMinimumVersion` / `requiredMaximumVersion`, `availableModels` + `enforceAvailableModels`, et `modelOverrides`.

### Plateformes

**Windows sans Git Bash** (PowerShell devient le shell par défaut quand Bash est absent). **Routines** sur Claude Code on the web (agents cloud templatés déclenchés par schedule, event GitHub ou API), push notifications mobiles, thèmes custom, session recap. Côté IDE, Windsurf a été renommé **Devin Desktop**.

### Defaults qui ont basculé

- **Opus 4.8** par défaut sur Max / Team Premium / Enterprise pay-as-you-go / API
- **Sonnet 4.6** sur Pro / Team Standard / Enterprise subscription seats
- **Opus 4.7** sur Claude Platform on AWS (xhigh par défaut)
- **Fable 5** jamais par défaut (`/model fable`)
- **Lean system prompt** par défaut pour tous les modèles sauf Haiku / Sonnet / Opus 4.7 et antérieurs
- **Auto mode** sans opt-in

---

Sources officielles : [Claude Code Changelog](https://code.claude.com/docs/en/changelog), [What's New](https://code.claude.com/docs/en/whats-new), [Model configuration](https://code.claude.com/docs/en/model-config), [Dynamic workflows](https://code.claude.com/docs/en/workflows), [Security guidance](https://code.claude.com/docs/en/security-guidance), [Introducing Fable 5 & Mythos 5](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5).

Si vous repérez une erreur ou une feature manquante, dites-le moi, je garderai cette cheatsheet à jour au fil des évolutions.
