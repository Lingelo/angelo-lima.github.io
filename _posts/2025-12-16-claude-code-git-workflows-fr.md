---
layout: post
title: "Workflows Git : Commits, PRs et Checkpoints"
subtitle: "Jour 6 - Collaborer efficacement avec Claude Code et Git"
description: "Maîtrisez les workflows Git avec Claude Code : commits automatiques avec attribution, création de PRs, checkpoints, et collaboration en équipe."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-6
categories: fr
---

Claude Code s'intègre nativement avec Git. Aujourd'hui, nous allons explorer comment utiliser cette intégration pour des workflows de développement professionnels.

## Commits Automatiques avec Attribution

### Configuration des Commits

Dans `.claude/settings.json` :

```json
{
  "commit": {
    "templates": "feat: $MESSAGE",
    "trailers": {
      "Co-authored-by": "Claude Code <claude@anthropic.com>"
    }
  }
}
```

### Demander à Claude de Commiter

```
> Commite ces changements avec un message descriptif
```

Claude va :
1. Analyser les fichiers modifiés (`git diff`)
2. Comprendre le contexte des changements
3. Générer un message de commit approprié
4. Exécuter le commit avec l'attribution configurée

### Exemple de Commit Généré

```bash
git commit -m "feat: add rate limiting middleware for auth endpoints

- Implement express-rate-limit for /api/auth/*
- Add configuration for max attempts (5) and window (15min)
- Log blocked requests for security monitoring

Co-authored-by: Claude Code <claude@anthropic.com>"
```

### Conventional Commits

Claude respecte naturellement les [Conventional Commits](/fr/conventional-commits-standardiser-messages-git-collaboration-optimisee/) (voir mon article détaillé sur le sujet) :

| Préfixe | Usage |
|---------|-------|
| `feat:` | Nouvelle fonctionnalité |
| `fix:` | Correction de bug |
| `docs:` | Documentation |
| `style:` | Formatage (pas de changement de code) |
| `refactor:` | Refactoring |
| `test:` | Ajout de tests |
| `chore:` | Maintenance |

## Création de Pull Requests

### Demander une PR à Claude

```
> Crée une PR pour ces changements vers la branche main
```

### Configuration des PRs

```json
{
  "pr": {
    "attribution": "Généré par Claude Code"
  }
}
```

### Workflow PR Complet

```bash
# 1. Créer une branche
> Crée une branche feature/rate-limiting et bascule dessus

# 2. Implémenter
> Implémente le rate limiting sur les endpoints auth

# 3. Tester
> Lance les tests : !`npm test 2>&1`

# 4. Commiter
> Commite ces changements

# 5. Créer la PR
> Push et crée une PR vers main avec un résumé des changements
```

### Structure de PR Générée

```markdown
## Résumé
- Ajout du middleware de rate limiting pour les endpoints d'authentification
- Configuration de 5 tentatives par fenêtre de 15 minutes
- Ajout de logs pour les requêtes bloquées

## Changements
- `src/middleware/rateLimit.ts` (nouveau)
- `src/routes/auth.ts` (modifié)
- `tests/middleware/rateLimit.test.ts` (nouveau)

## Plan de test
- [ ] Tests unitaires passent
- [ ] Test manuel avec curl
- [ ] Test de charge effectué

---
Généré par Claude Code
```

## Utilisation des Checkpoints avec Git

Les checkpoints ont été introduits au [Jour 5](/fr/claude-code-gestion-contexte-memoire/) - ici nous voyons comment ils s'intègrent avec Git.

### Le Duo Parfait

```
Checkpoints Claude Code  →  Changements rapides, expérimentation
           +
        Git              →  Historique permanent, collaboration
```

### Workflow Recommandé

```bash
# 1. Avant une modification majeure
git add -A && git commit -m "checkpoint: before auth refactoring"

# 2. Travailler avec Claude
> Refactorise le système d'authentification

# 3. Si satisfait → commit final
> Commite avec un message descriptif

# 4. Si pas satisfait → options
#    Option A: Claude rewind (Esc Esc)
#    Option B: Git reset
git reset --hard HEAD
```

### Comparaison Checkpoints vs Git

| Aspect | Checkpoints | Git |
|--------|-------------|-----|
| Granularité | Chaque prompt | Choix manuel |
| Persistance | Session | Permanent |
| Collaboration | Non | Oui |
| Fichiers bash | Non trackés | Trackés |
| Branches | Non | Oui |

## GitHub Actions avec Claude Code

Pour des patterns CI/CD plus avancés, voir [Jour 15 : CI/CD et Mode Headless](/fr/claude-code-cicd-headless/).

### Intégration CI/CD

```yaml
# .github/workflows/claude-review.yml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Review this PR for:
            1. Security vulnerabilities
            2. Performance issues
            3. Code style violations

            Be concise and actionable.
          max_turns: 5
```

### Mention @claude dans les PRs

Avec l'action configurée, vous pouvez mentionner Claude dans les commentaires de PR :

```
@claude Peux-tu revoir la gestion d'erreurs dans ce fichier ?
```

Claude répondra avec une analyse.

## Workflows Multi-Claude

### Le Concept

Utilisez **plusieurs instances** de Claude Code pour différentes tâches :

```
┌─────────────────┐     ┌─────────────────┐
│ Claude 1        │     │ Claude 2        │
│ (Implémentation)│     │ (Review)        │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     │
              ┌──────▼──────┐
              │   Git Repo   │
              └─────────────┘
```

### Configuration avec Git Worktrees

```bash
# Créer un worktree pour la review
git worktree add ../project-review feature-branch

# Terminal 1: Implémentation
cd project
claude
> Implémente la feature X

# Terminal 2: Review
cd ../project-review
claude
> Review les changements dans src/features/X
```

### Avantages

- Contextes séparés
- Pas d'interférence entre les tâches
- Vérification croisée du code
- Parallélisation du travail

## Bonnes Pratiques Git avec Claude

### 1. Commits Atomiques

```
> Commite uniquement les fichiers liés au rate limiting,
  pas les modifications de formatage
```

### 2. Ne Pas Commiter de Secrets

Claude refuse automatiquement de commiter des fichiers sensibles :

```
> Commite tous les fichiers

Claude: Je ne peux pas commiter .env car il contient
        des secrets. Voulez-vous l'exclure ?
```

### 3. Branches Descriptives

```
> Crée une branche pour cette feature

# Claude crée : feature/add-rate-limiting-auth-endpoints
# Pas : feature/update ou branch1
```

### 4. Review Avant Push

```
> Montre-moi le diff de ce qu'on va pusher

! git diff origin/main...HEAD
```

## Récupération d'une Erreur Git

### Annuler le Dernier Commit (Non Pushé)

```
> Annule le dernier commit mais garde les fichiers

! git reset --soft HEAD~1
```

### Modifier le Message du Dernier Commit

```
> Change le message du dernier commit pour être plus descriptif
```

### Récupérer un Fichier Supprimé

```
> Récupère le fichier src/utils/helpers.ts supprimé dans le commit précédent

! git checkout HEAD~1 -- src/utils/helpers.ts
```

## Template de Workflow Quotidien

```bash
# Matin: Début de journée
git pull origin main
claude

# 1. Voir l'état
! git status
> Résume ce qu'il reste à faire sur la feature en cours

# 2. Travailler par petits incréments
> Implémente [tâche 1]
> Commite

> Implémente [tâche 2]
> Commite

# 3. Avant pause/fin de journée
> Crée une PR draft avec un résumé de l'avancement
# OU
> Push les changements sur la branche feature

# 4. Fin de session
/cost
# Ajouter des notes dans CLAUDE.md si nécessaire
```

## Ce qui Arrive Demain

Dans le **[Jour 7](/fr/claude-code-permissions-securite/)**, nous verrons les **permissions et la sécurité dans Claude Code** : comment protéger vos fichiers sensibles et contrôler ce que Claude peut faire.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 5 : Gestion du Contexte et de la Mémoire](/fr/claude-code-gestion-contexte-memoire/)*
