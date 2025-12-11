---
layout: post
title: "La syntaxe secrète de Claude Code : #@/!"
subtitle: "Jour 2 - Les raccourcis que 95% des développeurs ignorent"
description: "Maîtrisez les raccourcis #@/! de Claude Code pour décupler votre productivité. Context activation, mentions, slash commands et shell escape expliqués."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-2
categories: fr
---

Hier, nous avons installé Claude Code et découvert les commandes de base. Aujourd'hui, nous passons au niveau supérieur avec la **syntaxe secrète** : quatre symboles qui transforment votre façon d'interagir avec Claude.

## Les quatre symboles magiques

| Symbole | Nom | Usage |
|---------|-----|-------|
| `#` | Context Activation | Ajouter au CLAUDE.md en live |
| `@` | Mentions | Référencer fichiers et agents |
| `/` | Slash Commands | Commandes built-in et custom |
| `!` | Shell Escape | Exécution bash directe |

## # - Context Activation

Le symbole `#` permet d'enrichir votre `CLAUDE.md` sans quitter Claude Code.

### Comment ça marche

Pendant une session, appuyez sur `#` et tapez une instruction :

```
# Toujours utiliser async/await plutôt que .then()
```

Cette instruction est **immédiatement ajoutée** à votre `CLAUDE.md` et persiste pour les sessions futures.

### Cas d'usage

```
# Ne jamais modifier les fichiers dans /config/
# Utiliser Zod pour la validation des formulaires
# Les tests doivent couvrir les cas d'erreur
```

**Avantage** : Vous construisez votre contexte projet **organiquement**, au fil de vos découvertes, sans interrompre votre workflow.

## @ - Mentions

Le symbole `@` est votre raccourci pour référencer des éléments.

### Référencer des fichiers

```
> Explique le fonctionnement de @src/auth/login.ts
```

Claude charge automatiquement le contenu du fichier dans le contexte.

**Tab-completion** : Tapez `@src/` puis `Tab` pour voir les suggestions !

### Référencer plusieurs fichiers

```
> Compare @src/api/v1/users.ts et @src/api/v2/users.ts
```

### Invoquer des subagents

```
> @explorer trouve tous les endpoints REST de l'application
```

Les subagents built-in (voir [Jour 9](/fr/claude-code-subagents/) pour les détails) :
- `@explorer` : Recherche rapide (modèle Haiku, read-only)
- `@planner` : Planification avant implémentation

### Exemples pratiques

```
> Refactore @src/utils/helpers.ts en utilisant les patterns de @src/utils/validators.ts

> @explorer où est définie la fonction calculateTotal ?

> Ajoute des tests pour @src/services/payment.ts
```

## / - Slash Commands

Les slash commands sont des commandes prédéfinies ou personnalisées.

### Commandes built-in essentielles

| Commande | Description |
|----------|-------------|
| `/help` | Aide complète |
| `/clear` | Effacer le contexte |
| `/cost` | Coût de la session |
| `/model` | Changer de modèle |
| `/compact` | Réduire le contexte |
| `/doctor` | Diagnostic système |
| `/config` | Configuration |
| `/permissions` | Gérer les permissions |
| `/agents` | Gérer les subagents |
| `/mcp` | Status des serveurs MCP |
| `/vim` | Mode édition vim |
| `/terminal-setup` | Configurer le terminal |

### Créer ses propres slash commands

Créez un fichier dans `.claude/commands/` (voir [Jour 8](/fr/claude-code-slash-commands-personnalisees/) pour aller plus loin) :

```markdown
<!-- .claude/commands/review.md -->
---
description: Code review du fichier spécifié
allowed-tools: Read, Grep, Glob
---

# /review

Effectue une code review complète de $ARGUMENTS en vérifiant :
1. Les bonnes pratiques TypeScript
2. La gestion des erreurs
3. La sécurité (injection, XSS)
4. La performance

Fichiers à analyser : @$1
```

Utilisation :
```
/review src/api/users.ts
```

### Arguments dans les commandes

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | Tous les arguments |
| `$1`, `$2`, `$3`... | Arguments individuels |

### Commandes avec contexte dynamique

```markdown
<!-- .claude/commands/pr-summary.md -->
---
description: Résumé des changements pour une PR
---

# /pr-summary

Résume les changements depuis main pour une pull request.

Changements actuels :
!`git diff main --stat`

Détail des modifications :
!`git diff main`
```

## ! - Shell Escape

Le symbole `!` exécute des commandes bash directement.

### Mode bash direct

Préfixez votre commande avec `!` :

```
! npm test
! git status
! docker ps
```

Claude exécute la commande **sans interprétation**, directement dans votre shell.

### Injection de résultats dans les prompts

Dans vos slash commands ou prompts, utilisez la syntaxe `` !`commande` `` :

```
> Les tests échouent. Voici le résultat : !`npm test 2>&1`
```

### Exemples dans les slash commands

```markdown
<!-- .claude/commands/debug-branch.md -->
---
description: Debug de la branche actuelle
---

# /debug-branch

Branche actuelle : !`git branch --show-current`
Derniers commits : !`git log --oneline -5`
Fichiers modifiés : !`git status --short`
Diff en cours : !`git diff --stat`

Analyse ces informations et identifie les problèmes potentiels.
```

### Combinaison puissante : @ et !

```
> Voici les erreurs TypeScript : !`npm run typecheck 2>&1`

  Corrige les erreurs dans @src/components/Button.tsx
```

## Récapitulatif : la syntaxe en action

Voici un workflow complet utilisant les quatre symboles :

```bash
# Session Claude Code

# 1. Ajouter une règle au contexte
# Toujours utiliser les imports absolus avec @/

# 2. Explorer le projet
> @explorer trouve où sont définis les hooks React custom

# 3. Vérifier l'état Git
! git status

# 4. Analyser un fichier avec contexte
> Refactore @src/hooks/useAuth.ts
  Voici les tests actuels : !`npm test -- useAuth 2>&1`

# 5. Utiliser une commande custom
/review src/hooks/useAuth.ts

# 6. Vérifier le coût
/cost
```

## Exercice pratique

Créez votre première slash command personnalisée :

1. Créez le dossier `.claude/commands/` s'il n'existe pas
2. Créez un fichier `test-file.md` :

```markdown
---
description: Lance les tests pour un fichier spécifique
---

# /test-file

Lance les tests pour le fichier $1 et analyse les résultats.

Résultat des tests :
!`npm test -- $1 2>&1`

Si des tests échouent, propose des corrections.
```

3. Testez avec `/test-file src/utils/helpers`

## Ce qui vous attend demain

Dans le **[Jour 3](/fr/claude-code-workflow-explore-plan-code-test/)**, nous découvrirons **le workflow Explore → Plan → Code → Test**, la méthodologie qui distingue les développeurs seniors des juniors quand ils utilisent Claude Code.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 1 : Installation et premiers pas](/fr/claude-code-installation-premiers-pas/)*
