---
title: "Claude Code Cheat Sheet, octobre 2026 : l'état des lieux complet"
subtitle: "Tout Claude Code v2.1.296 sur une page : 120 commandes, 33 hooks, 243 réglages, 391 variables d'environnement"
description: "Cheat sheet Claude Code exhaustive (v2.1.296) et état des lieux d'octobre 2026 : Opus 5.5, Fable 5.1, auto mode par défaut, mods, workflows, agent view."
date: 2026-10-13T06:00:00.000Z
lang: fr
translationKey: "claude-code-cheatsheet-octobre-2026"
slug: "claude-code-cheatsheet-octobre-2026-etat-des-lieux"
tags:
  - "IA"
  - "Développement"
  - "Claude Code"
author: "Angelo Lima"
cover: "/assets/img/claude-code.webp"
thumbnail: "/assets/img/claude-code.webp"
shareImg: "/assets/img/claude-code.webp"
aliases:
  - "/2026-10-13-claude-code-cheatsheet-octobre-2026-etat-des-lieux/"
faq:
  - q: "Quelle est la dernière version de Claude Code en octobre 2026 ?"
    a: "Au 13 octobre 2026, la dernière version de Claude Code est la v2.1.296, publiée le 9 octobre 2026. Environ 125 versions sont sorties entre le 9 juin (v2.1.170) et le 9 octobre. La commande claude --version affiche la version installée et claude update la met à jour."
  - q: "Quel modèle Claude Code utilise-t-il par défaut en octobre 2026 ?"
    a: "Depuis la v2.1.280 (22 septembre 2026), Claude Code utilise Claude Opus 5.5 par défaut sur les plans Pro, Max, Team et Enterprise ainsi que sur l'API Anthropic, avec un effort medium. Fable 5.1, le modèle le plus capable, n'est jamais le modèle par défaut : il se sélectionne avec /model fable."
  - q: "Qu'est-ce que l'auto mode de Claude Code ?"
    a: "L'auto mode est un mode de permission de Claude Code dans lequel un classifier juge chaque action au lieu de demander une confirmation à l'utilisateur. Il bloque par défaut les actions destructrices comme git reset --hard ou terraform destroy. Depuis la v2.1.284, c'est le mode de départ de toutes les sessions interactives sans configuration contraire."
  - q: "Qu'est-ce qu'un mod dans Claude Code ?"
    a: "Un mod est un plugin Claude Code écrit en JavaScript ou TypeScript qui s'exécute à l'intérieur de l'outil, introduit le 1er octobre 2026 (v2.1.287). Il peut dessiner des panneaux, ajouter des commandes qui s'exécutent sans tour de Claude, intercepter des appels d'outils ou appeler un modèle. Il tourne avec les droits de l'utilisateur, donc ne s'installe que depuis une source de confiance."
  - q: "Combien de commandes et de réglages compte Claude Code ?"
    a: "En octobre 2026, Claude Code documente environ 120 commandes slash et skills intégrés, 33 événements de hooks, 46 outils intégrés, 243 clés de settings.json et 391 variables d'environnement. La cheat sheet d'Angelo Lima les recense toutes, avec une annexe dépliable pour les réglages et les variables."
---
Quatrième cheat sheet Claude Code en sept mois, et la première que je n'ai pas eu envie d'appeler « mise à jour ». Entre la v2.1.170 de juin et la v2.1.296 du 9 octobre, Anthropic a publié environ 125 versions, dont quatre nouveaux modèles et des plugins capables de redessiner l'interface. Et le mode de permission par défaut a changé de nature. Ajouter des badges sur l'édition de juin ne suffisait plus.

Cette fois, j'ai donc repris la référence de zéro, à partir de la documentation officielle téléchargée page par page le 13 octobre, et j'ai visé l'exhaustivité au sens strict : toutes les commandes, tous les événements de hooks, tous les flags, et en annexe chacune des 243 clés de `settings.json` et des 391 variables d'environnement. L'article qui l'accompagne fait le point sur ce qui a bougé depuis juin, et sur ce qui a disparu.

> **L'essentiel**
>
> - **Quoi** : une cheat sheet exhaustive de Claude Code v2.1.296 (9 octobre 2026), en HTML interactif, FR et EN, vérifiée contre code.claude.com.
> - **Chiffres clés** : ~120 commandes et skills intégrés, 33 événements de hooks, 46 outils, 243 réglages, 391 variables d'environnement.
> - **Modèles** : Opus 5.5 par défaut partout (4 $ / 20 $ par MTok, effort `medium`), Sonnet 5.5, Haiku 5.5, et Fable 5.1 en option pour les gros chantiers.
> - **Ce qui a changé de nature** : l'auto mode est devenu le mode par défaut, les sous-agents tournent en arrière-plan, et les mods permettent de modifier Claude Code de l'intérieur.
> - **Pourquoi ça compte** : on pilote désormais Claude Code par objectifs, en déléguant à des agents en arrière-plan, au lieu de valider chaque commande.

## La cheat sheet

- **[Français : HTML interactif](/assets/data/claude-code-cheatsheet-octobre-2026.html)**
- **[English: interactive HTML](/assets/data/claude-code-cheatsheet-october-2026-en.html)**

Même palette que les précédentes (fond sombre, accent doré), avec trois badges : NEW pour ce qui n'était pas dans l'[édition de juin](/fr/claude-code-cheatsheet-juin-2026-mise-a-jour/), MODIFIÉ pour ce qui a changé de comportement, RETIRÉ pour ce qui n'existe plus. La page s'affiche désormais correctement sur mobile, ce qui n'était pas le cas des éditions précédentes (elles imposaient une largeur fixe de 1 400 pixels).

## Ce qui est couvert

| Section | Contenu |
|---------|---------|
| Ce qui a changé depuis juin | Chronologie mois par mois, de juin à octobre |
| Raccourcis clavier | Essentiels, navigation, édition readline, préfixes, transcript, agent view |
| Mode Vim | Modes, navigation, édition, objets texte |
| Modèles, effort et coûts | Les 4 modèles 5.x, alias, niveaux d'effort, fast mode, advisor, fallbacks |
| Commandes slash | Liste complète en 9 catégories, retirées incluses |
| CLI | Sous-commandes (sessions background, plugins, purge, gateway…) et tous les flags |
| Permissions | 6 modes, syntaxe des règles, auto mode, sandbox |
| Hooks | Les 33 événements, les 5 types de handlers, les champs communs |
| Mémoire, skills, sous-agents | CLAUDE.md et AGENTS.md, frontmatters complets, output styles |
| Plugins, mods et MCP | Composants d'un plugin, marketplaces, mods, MCP |
| Parallélisme | Sous-agents, fork, agent view, agent teams, workflows, projects |
| Plateformes | CLI, Desktop, web, self-hosted, mobile, IDE, Chrome, Slack, CI/CD |
| Outils intégrés | Les 46 outils, dépréciés compris |
| Fichiers et configuration | Arborescence `.claude/`, précédence, réglages clés, status line, artifacts |
| Admin et entreprise | Contrôle des modèles, politiques, versions, observabilité |
| Annexe | Les 243 clés de settings, les 391 variables d'environnement et les 137 actions de raccourcis |

## État des lieux : où en est Claude Code en octobre 2026

### Les modèles : la génération 5.5 s'installe

L'été a été chargé. Sonnet 5 est arrivé le 2 juillet, Opus 5 le 24, puis la génération suivante : Fable 5.1 le 1er septembre, Opus 5.5 le 22, Sonnet 5.5 le 28, et Haiku 5.5 le 7 octobre. En juin, j'avais dû annoter la cheat sheet à la hâte après la suspension de Fable 5. La famille Fable est de nouveau là, et l'alias `fable` pointe maintenant sur la 5.1.

| Modèle | ID | Prix (entrée / sortie, par MTok) | Statut |
|--------|----|----|--------|
| Fable 5.1 | `claude-fable-5-1` | 10 $ / 50 $ | Le plus capable, jamais par défaut |
| Opus 5.5 | `claude-opus-5-5` | 4 $ / 20 $ | Défaut sur tous les plans et l'API |
| Sonnet 5.5 | `claude-sonnet-5-5` | 2 $ / 10 $ | Alias `sonnet` |
| Haiku 5.5 | `claude-haiku-5-5` | 0,10 $ / 0,50 $ | Alias `haiku` |

Tous ont un contexte natif d'un million de tokens. Depuis la v2.1.280, **Opus est le modèle par défaut sur tous les plans**, Pro et Team Standard compris (ils étaient sur Sonnet). L'effort par défaut des modèles 5.5 descend à `medium`, que la documentation recommande pour le travail courant bien cadré, et il est maintenant mémorisé par modèle. Enfin, `ultracode` est devenu un interrupteur indépendant (`/effort ultracode on`) qui fait planifier un workflow pour chaque tâche substantielle, quel que soit le niveau.

Côté sécurité, les modèles récents tournent avec des classifiers (cybersécurité, biologie). Une requête signalée bascule automatiquement sur un modèle de repli selon la catégorie : Opus 4.8 pour la cyber, Opus 5 pour la bio. Si vous travaillez sur un dépôt de sécurité et voyez des bascules inexpliquées, `switchModelsOnFlag` vous fait confirmer avant le changement.

### L'auto mode n'est plus une option

C'est à mes yeux le changement le plus structurant de la période. En juin, l'auto mode était une fonctionnalité qu'on activait. Le 14 août, il est devenu le mode par défaut des nouvelles sessions Pro, Max et Team, et depuis la v2.1.284 (28 septembre) il l'est pour toutes les sessions interactives sur tous les plans et fournisseurs, sauf si `permissions.defaultMode` dit autre chose.

Le principe : un classifier évalue chaque action plutôt que de vous demander de cliquer. Il tourne désormais côté serveur par défaut, et ses appels ne comptent plus dans vos limites d'usage. Il a été durci tout l'été : il bloque `git reset --hard` ou `git clean -fd` quand vous n'avez pas demandé de jeter du travail, refuse `terraform destroy` sans demande explicite, interdit l'accès aux endpoints de métadonnées cloud, demande avant la première lecture hors du répertoire de travail, et nomme désormais la règle qui a déclenché un refus (par exemple `[Data Exfiltration]`). La commande `/auto-mode-setup` rédige pour vous la section `autoMode.environment` qui décrit vos dépôts et domaines de confiance.

Corollaire : l'ancien mode « default » s'appelle maintenant **Manual**, et `bypassPermissions` ne peut plus être activé depuis les settings d'un dépôt. J'avais détaillé l'ancien modèle dans l'article [Permissions et sécurité](/fr/claude-code-permissions-securite/). La syntaxe des règles y est toujours valable, c'est le point de départ qui a bougé.

### Le parallélisme est devenu la norme

En juin, l'agent view venait d'arriver. Quatre mois plus tard, le parallélisme est partout, et la documentation compte maintenant cinq manières distinctes de faire travailler plusieurs agents :

- Les **sous-agents** tournent en arrière-plan par défaut depuis juillet. Ils peuvent s'imbriquer sur trois niveaux, vingt peuvent tourner en même temps, et leurs demandes de permission remontent dans la session principale. Le frontmatter gagne `omitClaudeMd`, `autoCompactWindow` et `effort` (voir [l'article sur les sous-agents](/fr/claude-code-subagents-fr/) pour les bases).
- Le **fork** est actif par défaut : un sous-agent forké hérite de toute la conversation et du cache. `/subtask` le lance, `/fork` copie désormais la session entière dans une session background avec son propre worktree.
- L'**agent view** (`claude agents`, ou `←` sur un prompt vide) gagne la recherche par nom, le filtre `n:`, des titres rédigés par un classifier et le lien vers la PR ou la MR GitLab associée.
- Les **dynamic workflows** orchestrent des dizaines à des centaines d'agents à partir d'un script JavaScript que Claude écrit. Sauvegardés dans `.claude/workflows/`, ils deviennent des commandes.
- Les **Projects** (bêta Pro et Max) lancent des threads cloud parallèles depuis une seule conversation.

S'y ajoute la messagerie inter-sessions (août) : deux sessions Claude Code d'une même machine peuvent s'écrire via `SendMessage`, et `@nom` dans le prompt mentionne une autre session.

### Étendre Claude Code : l'arrivée des mods

Skills, sous-agents, hooks, MCP et plugins existaient déjà. Le 1er octobre (v2.1.287) est arrivé un nouvel étage : les **mods**. Un mod est un plugin écrit en JavaScript ou TypeScript qui s'exécute *dans* Claude Code. Là où un hook lance un script externe, un mod peut dessiner un panneau à côté du transcript, ajouter un bandeau au-dessus du prompt, créer une commande qui s'exécute sans tour de Claude, retenir un appel d'outil le temps de poser une question, ou envoyer une requête à un autre modèle. Anthropic utilise d'ailleurs le mécanisme pour ses propres fonctionnalités : le panneau `/diff` est un mod.

La contrepartie est écrite noir sur blanc dans la doc : un mod tourne avec vos droits, lit vos secrets, voit chaque prompt et peut approuver un appel d'outil à votre place. Je ne les installerais que depuis une marketplace que je contrôle.

Les hooks continuent aussi de grandir : on passe à 33 événements (contre 27 en juin), dont `DirectoryAdded`, `PreModelSwitch` et `PostModelSwitch`. Le nouveau champ `onFailure: "block"` (v2.1.295) comble un vrai trou pour qui s'appuie sur les [hooks](/fr/claude-code-hooks-fr/) comme garde-fou : un hook de sécurité qui plante ou dépasse son délai bloque désormais l'action au lieu de la laisser passer.

Autres nouveautés notables de l'écosystème : `claude plugin eval` pour tester un plugin contre une version sans plugin, `/skill-doctor` pour repérer les skills qui coûtent du contexte sans servir, la synchronisation des skills et plugins activés sur claude.ai, et le support d'AGENTS.md quand un projet n'a pas de CLAUDE.md. `/import codex`, `/import gemini` et `/import cursor` récupèrent la configuration d'un autre agent.

### Hors du terminal

Claude Code vit de moins en moins dans le seul terminal :

- Desktop arrive sur Linux en bêta (Ubuntu 22.04+, Debian 12+), avec un navigateur intégré, un simulateur iOS, le computer use en arrière-plan sur macOS, des panneaux détachables et la reprise automatique après une limite d'usage. `/resume` y récupère les sessions lancées en CLI.
- Les artifacts publient des pages interactives sur claude.ai depuis la session, et peuvent appeler vos connecteurs MCP à chaque affichage.
- Les environnements self-hosted font tourner les sessions cloud sur l'infrastructure de l'entreprise (bêta Team et Enterprise).
- Remote Control est sorti de la preview, et l'app mobile affiche vos machines comme des cartes pour y lancer une session.
- Claude in Chrome est en disponibilité générale depuis juillet.

### Revue et sécurité

Quatre outils se complètent maintenant. `/code-review` cherche les bugs en agent background, à cinq niveaux d'effort, et peut commenter la PR ou appliquer les correctifs. `/simplify` se charge du nettoyage. `/ultrareview` envoie une flotte d'agents dans le cloud. Côté sécurité, le plugin security-guidance relit chaque édition, et le plugin Claude Security (juillet) mène un scan multi-agents complet avec modèle de menace, puis transforme les findings choisis en patchs à relire. Enfin `/verify` et `/run` lancent l'application pour constater qu'un changement marche, au-delà des tests.

### Côté entreprise

Les administrateurs ont reçu beaucoup de leviers : `deniedModels` et `availableModelsMatch: "exact"` pour bloquer un modèle jusqu'à validation, `maxEffortLevel`, `allowedProviders`, `modelPricing` pour afficher les coûts aux tarifs négociés, `managedMcpServers` pour distribuer des serveurs MCP, et la Claude apps gateway auto-hébergée (SSO, politiques, plafonds de dépense) devant Bedrock, Vertex ou Foundry. Les settings d'un dépôt ne peuvent plus activer la télémétrie, Remote Control ou Claude in Chrome : ces réglages relèvent maintenant de l'utilisateur ou de l'admin.

### Ce qui a disparu

- Ultraplan (commande `/ultraplan` et mot-clé) : retiré en août.
- `/vim` et `/pr-comments` : retirés. Le mode Vim se règle dans `/config`.
- Les outils TodoWrite et Task\* ne sont plus fournis aux modèles récents (`CLAUDE_CODE_ENABLE_TODO_TOOLS=1` pour les récupérer), et TaskOutput a disparu.
- Glob et Grep sont absents par défaut sur macOS, Linux et WSL : Claude passe par `find` et `grep`, qui exécutent en réalité des versions embarquées de `bfs` et `ugrep`.
- `/agents` n'ouvre plus d'assistant : on demande à Claude de créer l'agent, ou on édite `.claude/agents/`.

## Ce que j'en retiens

En décembre, dans ma [série de 20 articles](/fr/claude-code-installation-premiers-pas/), Claude Code était un assistant de terminal qu'on surveillait commande par commande. En octobre, l'outil est pensé pour qu'on lui donne un objectif (`/goal`), qu'il le découpe, le confie à des agents en arrière-plan, et qu'un classifier tienne le rôle de garde-fou. Le métier de l'utilisateur se déplace vers la définition du cadre : les règles, les hooks, le CLAUDE.md, les limites de dépense. C'est précisément l'idée derrière [Kaizen](/fr/kaizen-sdlc-ia-claude-code/), le SDLC pour Claude Code présenté la semaine dernière : quand l'agent accélère tout, les règles critiques doivent être appliquées par du code.

Le revers, c'est la surface. 243 réglages et 391 variables d'environnement, c'est beaucoup, et une partie de cette cheat sheet existe pour qu'on puisse retrouver le bon levier sans relire 220 pages de documentation. `/doctor` et `/skill-doctor` vont dans le bon sens, en aidant à retirer ce qui ne sert plus.

---

Sources officielles : [Changelog](https://code.claude.com/docs/en/changelog), [What's new](https://code.claude.com/docs/en/whats-new), [Commands](https://code.claude.com/docs/en/commands), [CLI reference](https://code.claude.com/docs/en/cli-reference), [Hooks reference](https://code.claude.com/docs/en/hooks), [Model configuration](https://code.claude.com/docs/en/model-config), [Mods overview](https://code.claude.com/docs/en/plugins/mods/overview), [All settings](https://code.claude.com/docs/en/settings-reference), [Environment variables](https://code.claude.com/docs/en/env-vars).

Les éditions précédentes restent accessibles : juin [FR](/assets/data/claude-code-cheatsheet-juin-2026.html) · [EN](/assets/data/claude-code-cheatsheet-june-2026-en.html), avril [FR](/assets/data/claude-code-cheatsheet-avril-2026.html) · [EN](/assets/data/claude-code-cheatsheet-april-2026-en.html), mars [FR](/assets/data/claude-code-cheatsheet-2026.html) · [EN](/assets/data/claude-code-cheatsheet-2026-en.html).

Si vous repérez une erreur ou un oubli, écrivez-moi : je corrigerai la cheat sheet.
