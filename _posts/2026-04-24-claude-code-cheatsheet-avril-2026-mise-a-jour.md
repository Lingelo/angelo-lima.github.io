---
layout: post
title: "Claude Code Cheat Sheet — Avril 2026 : Opus 4.7, Auto Mode et Computer Use dans le CLI"
subtitle: "Référence exhaustive à jour pour Claude Code v2.1.101 — Avril 2026"
description: "Cheatsheet Claude Code avril 2026 exhaustive : 60+ commandes slash, 70+ flags et variables d'environnement, 26 événements hooks, Opus 4.7, xhigh effort, Auto Mode, Computer Use dans le CLI, Monitor tool, refonte de la Desktop app. Disponible en FR et EN."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement, Claude Code]
author: "Angelo Lima"
lang: fr
ref: claude-code-cheatsheet-avril-2026
categories: fr
---

J'avais publié une cheatsheet Claude Code fin mars. Moins de quatre semaines plus tard, elle est déjà incomplète : Opus 4.7 est sorti le 16 avril, Computer Use est descendu dans le CLI, Auto Mode est passé en GA sur Max, sept nouvelles commandes slash sont arrivées (et deux ont été supprimées), cinq événements hooks se sont ajoutés, et la Desktop app a été refondue le 14 avril. Entre v2.1.83 et v2.1.101, Anthropic a poussé une trentaine de releases en cinq semaines.

J'ai donc republié une version avril 2026 — la **même architecture visuelle** que la version mars, réécrite pour coller à chaque ajout récent, avec la **palette du blog** (fond sombre, accent doré) plutôt que le thème Reddit d'origine.

## La cheat sheet

- **[Français — HTML interactif](/assets/data/claude-code-cheatsheet-avril-2026.html)**
- **[English — Interactive HTML](/assets/data/claude-code-cheatsheet-april-2026-en.html)**

La version de mars reste accessible pour référence : [FR](/assets/data/claude-code-cheatsheet-2026.html) · [EN](/assets/data/claude-code-cheatsheet-2026-en.html).

Les éléments marqués d'un badge doré **NEW** sont des features ajoutées depuis fin mars 2026. Les éléments barrés **REMOVED** sont des commandes retirées.

## Ce qui est couvert

14 sections au lieu de 13 dans la version mars (la nouvelle row regroupe Auto Mode, Models & Effort et Platforms) :

| Section | Couverture |
|---------|-----------|
| Raccourcis Clavier | ~30 raccourcis, 17 contextes, mode Vim visual |
| Commandes Slash | **60+ commandes** en 6 catégories, /vim supprimée |
| CLI Flags & Sous-commandes | 60+ flags en 8 catégories, wizards Bedrock/Vertex |
| The Big 5 (Extension System) | CLAUDE.md, Rules, Commands, Skills, Subagents, MCP, Plugins |
| MCP Computer Use & Monitor | 27 outils bureau, watchers background |
| Modes de Permission | 6 modes + hardening avril (Bash, PowerShell, sandbox) |
| Hooks | **26 événements**, 5 types de handlers, champ `if`, `duration_ms` |
| Input Superpowers | @mentions, !shell, images, pipes, worktrees, background |
| Configuration | Hiérarchie 5 niveaux, 24 env vars, 12 champs settings.json |
| File Structure Map | Arborescence projet + globale (avec `themes/` et `plans/`) |
| Rewind & Checkpoints | Options rewind + prompt caching 1h |
| **Auto Mode** | Permission classifier, fast+thinking paths, hook `PermissionDenied` |
| **Models & Effort Levels** | Opus 4.7, Sonnet 4.6, Haiku 4.5 + niveau `xhigh` |
| **Plateformes** | CLI (Linux/macOS/Windows natif), Desktop refondu, Web, IDE |
| Pro Workflow | Plan → Execute, Focus View, Monitor tool, adaptive thinking |
| Personnaliser Claude Code | Frontmatter complet pour chaque type d'extension |
| Quick Reference | Combos à jour avec les nouveautés d'avril |

## Ajouts et changements depuis mars 2026

### Claude Opus 4.7 (16 avril)

1M de contexte natif, 64K à 128K de tokens en sortie, et surtout un **adaptive thinking** : plus de `budget_tokens` manuel, le modèle décide lui-même quand réfléchir plus longtemps. Visible par des indicateurs inline (*"still thinking"*, *"thinking more"*). Par défaut, l'effort passe à un nouveau niveau `xhigh` (100K tokens, MRCR v2 à 71%), positionné entre `high` et `max`.

### Auto Mode en GA pour Max

Le mode Auto (classifier de permissions) est sorti de research preview pour les abonnés Max avec Opus 4.7. Le classifier a deux chemins : un *fast path* sur Haiku qui classe chaque appel d'outil en safe/risky/uncertain, et un *thinking path* sur Opus/Sonnet qui reprend les cas ambigus. Le nouvel hook `PermissionDenied` permet de réagir à un refus (par exemple demander une autorisation explicite via un script) et peut renvoyer `{"retry": true}` pour relancer l'outil.

### Computer Use dans le CLI

Computer Use était cantonné à la Desktop app dans la version mars. Depuis v2.1.86 il est disponible dans le CLI sur **macOS et Windows Desktop** (Linux non supporté), avec multi-monitor. Les 27 outils (screenshot, clicks, typing, `computer_batch`, etc.) restent identiques. Toujours en research preview, Pro/Max uniquement.

### Monitor tool (v2.1.98)

Un outil built-in qui spawn des watchers en arrière-plan : tail de logs, suivi CI, auto-fix de crashes. Chaque ligne stdout devient une notification dans la conversation. Fin des `while sleep; do ... done` dans Bash. Se combine avec `/loop` en mode self-pacing (omettre l'intervalle, Claude choisit le tick ou utilise Monitor).

### 7 nouvelles commandes slash, 2 supprimées

Ajoutées : `/ultraplan` (draft dans le cloud, revue dans le navigateur, exécution locale), `/autofix-pr` (réparer une PR depuis le terminal ou le web), `/team-onboarding` (guide ramp-up pour un co-équipier à partir de votre usage), `/powerup` (leçons animées pour apprendre les features), `/tui` (rendu fullscreen sans flicker), `/focus` (vue condensée), `/effort` (slider interactif avec ↑↓).

Supprimées : `/vim` (remplacée par `/config` → Editor mode) et `/tag` (remplacée par des titres de sessions AI-generated).

### 5 événements hooks supplémentaires

Le total passe de 25 à 26 événements listés, plus plusieurs améliorations : `PermissionDenied` pour réagir aux refus Auto Mode, `PostUserPromptSubmit` qui peut override le `sessionTitle`, `PostToolUse` reçoit maintenant `duration_ms` dans son input, `PreCompact` peut bloquer une compaction (exit 2), le champ `if` accepte `mcp__server__tool` et un nouveau type de handler `mcp_tool` appelle directement un outil MCP.

### Une vingtaine de nouvelles variables d'environnement

Entre autres : `CLAUDE_CODE_NO_FLICKER` (rendu alt-screen activé par défaut v2.1.89), `CLAUDE_CODE_HIDE_CWD`, `CLAUDE_CODE_USE_MANTLE` (Bedrock via Mantle), `CLAUDE_CODE_CERT_STORE`, `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` (isolation PID namespace Linux), `CLAUDE_CODE_SCRIPT_CAPS`, `CLAUDE_CODE_PERFORCE_MODE`, `ENABLE_PROMPT_CACHING_1H`, `FORCE_PROMPT_CACHING_5M`, `ENABLE_TOOL_SEARCH`, `OTEL_LOG_TOOL_DETAILS`, `DISABLE_UPDATES`. Sept nouveaux champs de `settings.json` également : `prUrlTemplate`, `sandbox.failIfUnavailable`, `disableSkillShellExecution`, `showThinkingSummaries` (off en interactif depuis v2.1.86), `statusLine.refreshInterval`.

### Desktop app refondue (14 avril)

Multi-session sidebar, drag-and-drop pane layout, terminal intégré, file editor avec preview HTML/PDF, diff viewer refait. `/desktop` transfère une session du CLI vers l'app. Computer Use fonctionne aussi depuis la Desktop app sur macOS et Windows.

### Claude Code sur le web

`claude.ai/code` en research preview pour les abonnés Pro et Max : infrastructure cloud, sessions persistantes depuis mobile, possibilité de reprendre en local avec `/teleport`.

### Defaults qui ont basculé

- Rendu flicker-free (alt-screen) **on** par défaut (v2.1.89)
- OS CA certificate store **trusté** par défaut (v2.1.101), plus besoin de configurer un proxy TLS d'entreprise
- Thinking summaries **off** par défaut en interactif (v2.1.86)
- Effort par défaut : `high` sur API-key / Bedrock / Vertex / Team / Enterprise, `xhigh` pour les utilisateurs Opus 4.7

---

Sources officielles : [Claude Code Changelog](https://code.claude.com/docs/en/changelog), [What's New](https://code.claude.com/docs/en/whats-new) (semaines [W13](https://code.claude.com/docs/en/whats-new/2026-w13), [W14](https://code.claude.com/docs/en/whats-new/2026-w14), [W15](https://code.claude.com/docs/en/whats-new/2026-w15)), [Opus 4.7 notes](https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7), [Computer Use](https://code.claude.com/docs/en/computer-use), [Auto Mode](https://www.anthropic.com/engineering/claude-code-auto-mode).

Si vous repérez une erreur ou une feature manquante, dites-le moi, je garderai cette cheatsheet à jour au fil des évolutions.
