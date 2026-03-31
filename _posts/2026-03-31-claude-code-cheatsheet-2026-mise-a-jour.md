---
layout: post
title: "Claude Code Cheat Sheet 2026 : Ce qui a changé depuis l'original Reddit"
subtitle: "Un diff visuel de chaque feature ajoutée depuis la cheatsheet populaire de décembre 2025"
description: "Cheatsheet Claude Code mise à jour pour mars 2026 avec toutes les nouveautés : MCP Computer Use, /schedule, /voice, handlers de hooks, mode dontAsk, frontmatter skills, et plus. PNG téléchargeable gratuitement."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement, Claude Code]
author: "Angelo Lima"
lang: fr
ref: claude-code-cheatsheet-2026
categories: fr
---

En décembre 2025, une cheat sheet Claude Code est devenue virale sur [r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/). Bien structurée, visuellement propre, elle couvrait l'essentiel. Mais Claude Code a considérablement évolué depuis. Après une comparaison visuelle précise, j'estime que l'original couvre environ **65-70% des features actuelles**.

Cet article documente chaque ajout significatif depuis cette cheatsheet, et fournit une **version mise à jour** utilisable comme référence.

## La Cheatsheet mise à jour

**[Voir la version HTML interactive](/assets/data/claude-code-cheatsheet-2026.html)** (dark theme, même style visuel que l'original).

Vous pouvez aussi télécharger le [PNG haute résolution](/assets/img/claude-code-cheatsheet-2026.png) (2800px de large, ~4 Mo).

Les éléments marqués d'un badge vert **NEW** sont des ajouts depuis l'original de décembre 2025.

## Ce qui est vraiment nouveau

J'ai comparé chaque section avec l'image originale. Voici le diff précis.

### Nouvelles commandes Slash

| Commande | Ce qu'elle fait |
|----------|----------------|
| `/schedule` | Planifier des agents distants en cron. Claude exécute des tâches sur claude.ai pendant que vous dormez |
| `/desktop` | Transférer la session vers l'application Claude Desktop |
| `/voice` | Saisie par dictée vocale |
| `/diff` | Viewer de diff interactif pour les changements de la session |
| `/security-review` | Scanner les changements récents pour détecter des vulnérabilités |

Les commandes comme `/insights`, `/teleport`, `/btw`, `/fast` et `/loop` étaient **déjà dans l'original** (certaines avec un badge NEW à l'époque).

### Nouveaux flags CLI

| Flag | Ce qu'il fait |
|------|--------------|
| `--tmux` | Ouvrir un worktree dans un panneau tmux dédié |
| `--from-pr 42` | Reprendre le travail depuis une pull request GitHub |
| `--fork-session` | Forker la session en gardant tout le contexte |

Les flags comme `--effort`, `--remote`, `--bare`, `--max-budget-usd`, `--json-schema` et `--fallback-model` étaient déjà documentés dans l'original.

### Nouveaux raccourcis clavier

| Raccourci | Ce qu'il fait |
|-----------|--------------|
| `Option+P` / `Alt+P` | Changement rapide de modèle (sonnet/opus/haiku) |
| `Option+T` / `Alt+T` | Activer/désactiver la réflexion étendue |
| `?` | Afficher tous les raccourcis disponibles |

### Hooks : de 1 type de handler à 4

La cheatsheet originale listait les événements hooks (PreToolUse, PostToolUse, etc.) et montrait le handler `command`. Depuis, trois nouveaux types ont été ajoutés :

| Handler | Cas d'usage |
|---------|------------|
| `command` | Exécuter une commande shell (original) |
| `http` | Appeler une URL webhook |
| `prompt` | Injecter du texte dans le contexte de Claude |
| `agent` | Déléguer à un sous-agent |

Il y a aussi un nouvel événement : `SubagentStop`, qui se déclenche quand un sous-agent termine sa tâche.

### Mode de permission : dontAsk

L'original montrait les modes Default, Auto-Accept et Plan. Le mode `dontAsk` est nouveau : il **refuse tout** sauf les outils explicitement pré-approuvés dans vos settings. Utile pour les environnements CI/CD stricts.

### Extension du frontmatter Skills

Les Skills (`.claude/skills/name/SKILL.md`) ont gagné trois nouvelles options de frontmatter :

| Champ | Effet |
|-------|-------|
| `context: fork` | Exécuter le skill dans un contexte de sous-agent isolé |
| `paths: "*.ts"` | N'activer que pour les types de fichiers correspondants |
| `effort: high` | Forcer la réflexion étendue pour ce skill |

### Améliorations des sous-agents

| Feature | Ce que ça permet |
|---------|-----------------|
| `isolation: worktree` | Exécuter l'agent dans un git worktree séparé |
| `memory: project` | Mémoire persistante scopée par utilisateur/projet/local |

### MCP Computer Use

Le plus gros ajout, lancé le 23 mars 2026. Claude peut maintenant **voir et contrôler votre bureau** : prendre des screenshots, cliquer, taper, scroller et faire du drag & drop sur les applications macOS.

Points clés :
- **27 outils** dont `screenshot`, `left_click`, `type`, `key`, `scroll`, `zoom`, `computer_batch`
- **Modèle de sécurité** : `request_access` doit être appelé en premier. Seules les apps dans l'allowlist sont visibles dans les screenshots (filtrage au niveau du compositing)
- **Performance** : `computer_batch` exécute une séquence d'actions en un seul appel d'outil
- Disponible sur les plans **Pro et Max**, macOS uniquement pour le moment

C'est un serveur MCP intégré à Claude Code/Cowork, pas une installation séparée. Activez-le dans Settings > General > Computer Use.

### Section "Personnaliser Claude Code"

La cheatsheet originale avait une card "Create Custom Commands" qui ne couvrait que les commandes slash. La version mise à jour la remplace par une card complète **"Personnaliser Claude Code"** qui montre comment créer **chaque type d'extension**, avec un exemple de frontmatter complet pour chacun :

- **Commande slash** (`.claude/commands/`) — vous l'invoquez
- **Skill** (`.claude/skills/`) — Claude l'invoque automatiquement
- **Sous-agent** (`.claude/agents/`) — spécialiste parallèle avec son propre contexte
- **Rule** (`.claude/rules/`) — instructions conditionnelles scopées par glob de fichiers
- **Hook** (`settings.json`) — automatisation déterministe sur les événements du cycle de vie
- **Serveur MCP** (`.mcp.json`) — intégration d'outils externes

Plus un guide de décision : "où placer quoi ?" pour chaque cas d'usage.

## Ce qui était déjà là

Par souci de précision, voici ce qui était **déjà dans l'original de décembre 2025** et que j'ai initialement mal catégorisé comme nouveau :

- `/insights` (avait déjà son propre badge NEW dans l'original)
- `/teleport`, `/btw`, `/fast`, `/loop`
- `Ctrl+B` (tâches en arrière-plan), `Ctrl+V` (coller des images)
- `--effort`, `--remote`, `--bare`, `--max-budget-usd`
- Mode `auto` (classifieur IA de permissions)
- Agent Teams, worktrees, support multi-répertoires
- Les 8 événements hooks (PreToolUse à Notification)

## Comment j'ai construit ça

La cheatsheet est un fichier HTML unique avec du CSS standalone (dark theme), exporté en PNG via Playwright :

```bash
# Cloner et builder
git clone https://github.com/angelolima/claude-code-cheatsheet
npm install
npm run build:reddit-fr
```

Le script de build utilise `page.screenshot({ fullPage: true })` avec un viewport de 1400px à 2x DPR, produisant un PNG retina de 2800px de large.

## Obtenir la Cheatsheet

- **[HTML interactif](/assets/data/claude-code-cheatsheet-2026.html)** — le mieux pour naviguer
- **[PNG haute résolution](/assets/img/claude-code-cheatsheet-2026.png)** — le mieux pour partager ou imprimer

---

*Cette cheatsheet a été construite dans le cadre d'un projet plus large qui produit aussi un [Guide Complet en PDF](https://github.com/angelolima/claude-code-cheatsheet) couvrant les 16 features de Claude Code en profondeur.*
