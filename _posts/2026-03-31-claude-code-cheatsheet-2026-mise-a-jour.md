---
layout: post
title: "Claude Code Cheat Sheet 2026 : Chaque commande, raccourci & feature en un seul endroit"
subtitle: "Une référence exhaustive et à jour pour Claude Code v2.x — Mars 2026"
description: "La cheatsheet Claude Code la plus complète pour mars 2026 : 55+ commandes slash, 55+ flags CLI, 25 événements hooks, 6 modes de permission, MCP Computer Use, et un guide complet de création d'extensions. Disponible en FR et EN."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement, Claude Code]
author: "Angelo Lima"
lang: fr
ref: claude-code-cheatsheet-2026
categories: fr
---

Claude Code évolue vite. La plupart des cheatsheets disponibles en ligne sont déjà incomplètes par rapport aux features sorties début 2026. J'ai construit une **référence exhaustive et visuelle** couvrant tout ce qui existe dans Claude Code v2.x en mars 2026 — et je la partage gratuitement.

## La Cheatsheet

Disponible en français et en anglais :

- **[Français — HTML interactif](/assets/data/claude-code-cheatsheet-2026.html)**
- **[English — Interactive HTML](/assets/data/claude-code-cheatsheet-2026-en.html)**

Vous pouvez aussi télécharger les PNG haute résolution : [Français](/assets/img/claude-code-cheatsheet-2026.png) | [English](/assets/img/claude-code-cheatsheet-2026-en.png) (~4 Mo chacun, 2800px de large).

Les éléments marqués d'un badge vert **NEW** sont des features ajoutées depuis fin 2025.

## Ce qui est couvert

Ce n'est pas un résumé "top 20 commandes". C'est la référence complète :

| Section | Couverture |
|---------|-----------|
| Raccourcis Clavier | ~30 raccourcis + préfixes + dialogues de confirmation |
| Commandes Slash | **55+ commandes** en 7 catégories |
| CLI Flags | **55+ flags** en 8 catégories + sous-commandes |
| The Big 5 (Système d'Extension) | CLAUDE.md, Rules, Commands, Skills, Subagents, MCP, Plugins |
| Modes de Permission | Les **6 modes** avec la syntaxe de permissions |
| Hooks | Les **25 événements** du cycle de vie + 4 types de handlers + champ `if` |
| Input Superpowers | @mentions, !shell, images, pipes, worktrees, background |
| Configuration | Hiérarchie 5 niveaux, commandes config, variables d'env clés |
| File Structure Map | Arborescence projet + globale complète |
| Rewind & Checkpoints | Toutes les options + stratégies de gestion du contexte |
| Pro Workflow | Boucle Plan→Execute, techniques de prompting, patterns avancés |
| Personnaliser Claude Code | **Comment créer chaque type d'extension** avec frontmatter complet |
| Quick Reference | Combos les plus utilisés, modèles & effort levels |

## Ajouts récents à connaître

### MCP Computer Use

Lancé le 23 mars 2026. Claude peut maintenant **voir et contrôler votre bureau** : prendre des screenshots, cliquer, taper, scroller et faire du drag & drop sur les applications macOS.

- **27 outils** dont `screenshot`, `left_click`, `type`, `key`, `scroll`, `zoom`, `computer_batch`
- **Sécurité** : `request_access` obligatoire. Filtrage au niveau du compositing — seules les apps autorisées sont visibles dans les screenshots
- **Performance** : `computer_batch` exécute une séquence d'actions en un seul appel
- Disponible sur les plans **Pro et Max**, macOS uniquement pour le moment

### Nouvelles commandes Slash

| Commande | Ce qu'elle fait |
|----------|----------------|
| `/schedule` | Planifier des agents distants en cron |
| `/desktop` | Transférer la session vers l'app Desktop |
| `/voice` | Saisie par dictée vocale |
| `/diff` | Viewer de diff interactif |
| `/security-review` | Scanner les changements pour les vulnérabilités |

### Nouveaux flags CLI

| Flag | Ce qu'il fait |
|------|--------------|
| `--tmux` | Worktree dans un panneau tmux dédié |
| `--from-pr 42` | Reprendre depuis une PR GitHub |
| `--fork-session` | Forker la session en gardant le contexte |

### Hooks : 25 événements, 4 types de handlers

Le système de hooks supporte maintenant **25 événements** du cycle de vie (contre ~8 auparavant) et **4 types de handlers** : `command`, `http`, `prompt`, `agent`. Nouveaux événements : `SubagentStart/Stop`, `TaskCreated/Completed`, `TeammateIdle`, `PostCompact`, `ConfigChange`, `FileChanged`, et d'autres.

### Frontmatter Skills & Subagents

Les Skills ont gagné les options `context: fork`, `paths:`, et `effort:`. Les Subagents ont gagné `isolation: worktree` et `memory: project/user/local` pour la connaissance persistante.

### Card "Personnaliser Claude Code"

Une des sections les plus utiles : un guide complet montrant comment créer **chaque type d'extension** — commandes slash, skills, sous-agents, rules, hooks et serveurs MCP — chacun avec un exemple de frontmatter complet et un guide de décision "où placer quoi ?".

## Comment j'ai construit ça

Fichier HTML unique + CSS standalone dark theme, exporté en PNG via Playwright :

```bash
git clone https://github.com/angelolima/claude-code-cheatsheet
npm install
npm run build:reddit    # build les versions EN et FR
```

Le script utilise `page.screenshot({ fullPage: true })` avec un viewport de 1400px à 2x DPR.

---

*Cette cheatsheet fait partie d'un projet plus large qui produit aussi un [Guide Complet en PDF](https://github.com/angelolima/claude-code-cheatsheet) couvrant les 16 features de Claude Code en profondeur.*
