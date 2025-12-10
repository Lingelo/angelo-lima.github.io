---
layout: post
title: "Créer ses propres slash commands"
subtitle: "Jour 8 - Automatiser vos workflows récurrents"
description: "Apprenez à créer des slash commands personnalisées dans Claude Code pour automatiser vos tâches répétitives et standardiser les workflows d'équipe."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code-series.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-8
categories: fr
---

Les slash commands built-in sont utiles, mais la vraie puissance vient des **commandes personnalisées**. Aujourd'hui, nous allons créer nos propres commandes pour automatiser les workflows récurrents.

## Où stocker les commandes

### Commandes projet (partagées avec l'équipe)

```
.claude/commands/
├── review.md
├── test-file.md
└── deploy.md
```

Ces commandes sont versionnées avec le projet et disponibles pour toute l'équipe.

### Commandes personnelles (cross-projet)

```
~/.claude/commands/
├── morning-standup.md
├── eod-summary.md
└── quick-fix.md
```

Ces commandes sont disponibles dans tous vos projets.

## Anatomie d'une slash command

### Structure de base

```markdown
---
description: Description courte affichée dans /help
allowed-tools: Read, Grep, Glob, Bash
---

# /nom-commande

Instructions pour Claude...
```

### Le frontmatter YAML

| Champ | Description | Obligatoire |
|-------|-------------|-------------|
| `description` | Description dans le menu d'aide | Non |
| `allowed-tools` | Outils autorisés pour cette commande | Non |

### Le corps de la commande

Tout ce qui suit le frontmatter est envoyé à Claude comme prompt.

## Variables disponibles

### Arguments

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | Tous les arguments passés |
| `$1` | Premier argument |
| `$2` | Deuxième argument |
| `$3`, `$4`... | Arguments suivants |

### Exemple avec arguments

```markdown
---
description: Lance les tests pour un fichier spécifique
---

# /test

Lance les tests pour `$1` et analyse les résultats.

Fichier à tester : $1
Options supplémentaires : $2
```

Usage :
```
/test src/utils/helpers.ts --coverage
```

## Intégrer du contexte dynamique

### Référencer des fichiers avec @

```markdown
---
description: Review de code avec les conventions du projet
---

# /review

Effectue une code review de $1 en suivant les conventions définies dans :
- @CLAUDE.md
- @.eslintrc.js
- @tsconfig.json

Fichier à reviewer : @$1
```

### Injecter des résultats bash avec !

```markdown
---
description: Analyse l'état actuel du projet
---

# /status

Analyse l'état du projet :

## Git Status
!`git status --short`

## Branches
!`git branch -a`

## Derniers commits
!`git log --oneline -10`

## Tests
!`npm test 2>&1 | tail -20`

Résume l'état et propose les prochaines actions.
```

## Exemples de commandes utiles

### /review - Code review automatique

```markdown
---
description: Code review complète d'un fichier
allowed-tools: Read, Grep, Glob
---

# /review

Effectue une code review approfondie de @$1.

## Checklist de review

### 1. Sécurité
- [ ] Pas d'injection SQL/XSS
- [ ] Validation des inputs
- [ ] Gestion des secrets

### 2. Performance
- [ ] Pas de N+1 queries
- [ ] Mémoization si nécessaire
- [ ] Pas de re-renders inutiles (React)

### 3. Maintenabilité
- [ ] Nommage clair
- [ ] Fonctions < 50 lignes
- [ ] Pas de code dupliqué

### 4. Tests
- [ ] Cas nominaux couverts
- [ ] Cas d'erreur couverts
- [ ] Edge cases identifiés

Pour chaque problème trouvé, indique :
- Ligne concernée
- Sévérité (critique/moyenne/faible)
- Suggestion de fix
```

### /fix-tests - Corriger les tests qui échouent

```markdown
---
description: Analyse et corrige les tests qui échouent
allowed-tools: Read, Bash, Edit
---

# /fix-tests

Les tests échouent. Voici le résultat :

!`npm test 2>&1`

Analyse les erreurs et propose des corrections.
Pour chaque test qui échoue :
1. Identifie la cause
2. Propose un fix
3. Implémente si tu es sûr, sinon demande confirmation
```

### /component - Créer un composant React

```markdown
---
description: Génère un nouveau composant React
allowed-tools: Read, Write
---

# /component

Crée un nouveau composant React nommé `$1`.

Structure à créer :
```
src/components/$1/
├── $1.tsx           # Composant principal
├── $1.test.tsx      # Tests
├── $1.styles.ts     # Styles (styled-components)
└── index.ts         # Export
```

Utilise les patterns de @src/components/Button/ comme référence.

Props attendues : $2

Le composant doit :
- Être typé avec TypeScript strict
- Avoir des tests de rendu basiques
- Suivre les conventions du projet
```

### /pr-description - Générer une description de PR

```markdown
---
description: Génère une description de PR à partir des commits
---

# /pr-description

Génère une description de Pull Request basée sur les changements.

## Commits depuis main
!`git log main..HEAD --oneline`

## Fichiers modifiés
!`git diff main --stat`

## Diff détaillé
!`git diff main`

Génère une description de PR avec :

## Summary
[2-3 bullet points décrivant les changements]

## Changes
[Liste des fichiers modifiés avec description]

## Test Plan
[Checklist des tests à effectuer]

## Screenshots (if applicable)
[Placeholder si UI modifiée]
```

### /morning - Standup du matin

```markdown
---
description: Prépare le standup du matin
---

# /morning

Prépare mon standup du matin.

## Ce qui a été fait hier
!`git log --oneline --since="yesterday" --author="$(git config user.email)"`

## Travail en cours
!`git status --short`
!`git stash list`

## PRs en attente de review
!`gh pr list --author @me 2>/dev/null || echo "GitHub CLI non disponible"`

Résume :
1. Ce que j'ai fait hier (basé sur les commits)
2. Ce qui est en cours (fichiers modifiés)
3. Bloqueurs potentiels
```

### /debug - Debug d'un problème

```markdown
---
description: Debug structuré d'un problème
---

# /debug

Debug du problème suivant : $ARGUMENTS

## Étape 1 : Comprendre
- Quel est le comportement attendu ?
- Quel est le comportement actuel ?
- Quand le problème apparaît-il ?

## Étape 2 : Reproduire
Propose des étapes pour reproduire le problème.

## Étape 3 : Analyser
Analyse le code concerné et identifie les causes possibles.

## Étape 4 : Résoudre
Propose une solution avec les changements nécessaires.

Ne code pas encore, commence par l'analyse.
```

## Commandes avec outils restreints

### Commande read-only

```markdown
---
description: Analyse sans modification
allowed-tools: Read, Grep, Glob
---

# /analyze

Analyse le code sans faire de modifications...
```

### Commande avec bash limité

```markdown
---
description: Exécute les tests uniquement
allowed-tools: Read, Bash(npm test:*)
---

# /run-tests

Lance les tests : !`npm test`
```

## Organisation des commandes d'équipe

### Structure recommandée

```
.claude/commands/
├── dev/
│   ├── component.md
│   ├── hook.md
│   └── service.md
├── review/
│   ├── security.md
│   ├── performance.md
│   └── full.md
├── git/
│   ├── pr-description.md
│   ├── commit-message.md
│   └── changelog.md
└── debug/
    ├── error.md
    ├── performance.md
    └── memory.md
```

### Convention de nommage

| Préfixe | Usage |
|---------|-------|
| `dev-*` | Création de code |
| `review-*` | Code review |
| `git-*` | Opérations Git |
| `debug-*` | Debugging |
| `doc-*` | Documentation |

## Tester vos commandes

### Vérifier la syntaxe

```
/help
```

Votre commande devrait apparaître avec sa description.

### Test en dry-run

Ajoutez à votre commande :
```markdown
Montre ce que tu vas faire avant de le faire.
```

### Debug des variables

```markdown
DEBUG - Arguments reçus :
- $ARGUMENTS = "$ARGUMENTS"
- $1 = "$1"
- $2 = "$2"
```

## Ce qui vous attend demain

Dans le **Jour 9**, nous verrons les **subagents** : comment créer des agents spécialisés avec leurs propres instructions et outils.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 7 : Permissions et sécurité](/fr/claude-code-permissions-securite/)*
