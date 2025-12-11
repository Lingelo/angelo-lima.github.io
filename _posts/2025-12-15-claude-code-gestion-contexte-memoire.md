---
layout: post
title: "Gestion du contexte et mémoire dans Claude Code"
subtitle: "Jour 5 - Optimiser les longues sessions et préserver vos préférences"
description: "Maîtrisez la gestion du contexte dans Claude Code : mémoire hiérarchique, /compact, checkpoints et bonnes pratiques pour les sessions prolongées."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-5
categories: fr
---

Une session Claude Code peut durer des heures. Mais plus la conversation s'allonge, plus le contexte devient lourd. Aujourd'hui, nous allons voir comment gérer efficacement la mémoire et le contexte pour des sessions productives.

## Le système de mémoire hiérarchique

Claude Code utilise une architecture à **4 niveaux** de mémoire, du plus prioritaire au moins prioritaire :

```
┌─────────────────────────────────────────┐
│ 1. Enterprise Policy (priorité max)    │  ← Règles IT organisation
├─────────────────────────────────────────┤
│ 2. Project Memory (.claude.md)         │  ← Instructions projet
├─────────────────────────────────────────┤
│ 3. Project Rules (.claude/rules/)      │  ← Règles modulaires
├─────────────────────────────────────────┤
│ 4. User Memory (~/.claude/CLAUDE.md)   │  ← Préférences personnelles
└─────────────────────────────────────────┘
```

### Niveau 1 : Enterprise Policy

Pour les organisations, les admins peuvent définir des règles globales qui s'appliquent à tous les utilisateurs. Ces règles ont la priorité maximale.

### Niveau 2 : Project Memory (.claude.md ou CLAUDE.md)

Le fichier `CLAUDE.md` à la racine du projet :

```markdown
# CLAUDE.md

## Stack technique
- Next.js 14 avec App Router
- TypeScript strict
- Prisma + PostgreSQL
- Tailwind CSS

## Conventions
- Utiliser les Server Components par défaut
- Nommer les fichiers en kebab-case
- Tests avec Vitest

## Règles strictes
- NE JAMAIS exposer les clés API côté client
- TOUJOURS valider les inputs avec Zod
```

### Niveau 3 : Project Rules (.claude/rules/)

Pour des règles modulaires et conditionnelles :

```
.claude/rules/
├── typescript.md      # Règles TypeScript
├── testing.md         # Règles de tests
├── api/
│   └── security.md    # Règles sécurité API
└── frontend/
    └── components.md  # Règles composants
```

Exemple de règle avec **glob pattern** :

```markdown
<!-- .claude/rules/api/security.md -->
---
globs: ["src/api/**/*.ts", "src/routes/**/*.ts"]
---

# Règles de sécurité API

- Toujours valider les tokens JWT
- Rate limiting sur tous les endpoints
- Logger les accès suspects
```

Cette règle ne s'applique que quand vous travaillez sur des fichiers correspondant aux patterns.

### Niveau 4 : User Memory

Vos préférences personnelles dans `~/.claude/CLAUDE.md` :

```markdown
# Préférences personnelles

## Style de code
- Je préfère les early returns
- Commentaires en français
- Pas de point-virgule en JS/TS

## Communication
- Réponses concises
- Pas d'émojis
- Format tableau pour les comparaisons
```

## Ajouter des instructions en live avec #

Pendant une session, utilisez `#` pour ajouter des instructions :

```
# Utiliser date-fns au lieu de moment.js
```

Cette instruction est ajoutée au `CLAUDE.md` du projet et persiste entre les sessions.

## Importer du contexte avec @

Vous pouvez référencer d'autres fichiers dans votre CLAUDE.md :

```markdown
# CLAUDE.md

## Architecture
Voir @docs/architecture.md pour les détails.

## Patterns
Suivre les patterns de @src/features/auth/ pour les nouvelles features.
```

L'import supporte jusqu'à **5 niveaux de récursion**.

## La commande /compact

Quand le contexte devient trop lourd, utilisez `/compact` :

```
/compact
```

Cette commande :
- Résume la conversation
- Supprime les détails non essentiels
- Préserve les informations importantes
- Réduit la consommation de tokens

### Quand utiliser /compact

| Situation | Action |
|-----------|--------|
| Session > 30 minutes | Envisager /compact |
| Beaucoup de code affiché | /compact recommandé |
| Changement de sujet | /compact puis nouvelle tâche |
| Erreur "context too long" | /compact obligatoire |

## Les checkpoints : votre filet de sécurité

Claude Code crée automatiquement un **checkpoint** à chaque prompt utilisateur.

### Comment fonctionne le système

```
Prompt 1 → [Checkpoint 1] → Réponse Claude
Prompt 2 → [Checkpoint 2] → Réponse Claude
Prompt 3 → [Checkpoint 3] → Réponse Claude
          ↑
    Vous pouvez revenir ici
```

### Revenir en arrière avec Esc Esc

Double-appuyez sur `Esc` pour ouvrir le menu de rewind :

```
Options de rewind :
1. Conversation only  → Garder le code, revenir dans la conversation
2. Code only          → Garder la conversation, annuler les modifications
3. Both               → Tout annuler (code + conversation)
```

### La commande /rewind

Alternative au raccourci :

```
/rewind
```

Vous pouvez aussi spécifier jusqu'où revenir :

```
/rewind 3  → Revenir de 3 prompts
```

### Limitations importantes

Les checkpoints **ne trackent PAS** :

| Non tracké | Exemple |
|------------|---------|
| Fichiers supprimés par bash | `! rm -rf node_modules` |
| Fichiers déplacés par bash | `! mv src/old src/new` |
| Modifications manuelles | Éditions faites dans votre IDE |
| Sessions concurrentes | Autre instance de Claude Code |

**Conseil** : Utilisez Git en complément pour un vrai historique.

## Nettoyage automatique des sessions

Claude Code nettoie automatiquement les anciennes sessions.

### Configuration du nettoyage

Dans `.claude/settings.json` :

```json
{
  "cleanupPeriodDays": 30
}
```

Les sessions plus anciennes que cette période sont supprimées.

### Voir les sessions existantes

```
/sessions
```

### Reprendre une session

```bash
claude -r <session-id>
```

Ou continuer la dernière :

```bash
claude -c
```

## Bonnes pratiques pour les longues sessions

### 1. Structure vos tâches

```
Session 1 : Exploration et planification
  └─ /compact avant de finir

Session 2 : Implémentation feature A
  └─ /compact avant de finir

Session 3 : Implémentation feature B
  └─ /compact avant de finir
```

### 2. Utilisez /clear entre les sujets différents

```
> [Tâche sur l'authentification terminée]

/clear

> Maintenant, travaillons sur le système de paiement
```

### 3. Documentez dans CLAUDE.md ce que vous apprenez

Au lieu de répéter les mêmes instructions :

```
# J'ai appris que le projet utilise un pattern spécifique
```

Cela devient une instruction permanente.

### 4. Combinez checkpoints et Git

```bash
# Avant une modification risquée
git add -A && git commit -m "checkpoint avant refactoring"

# Faites la modification avec Claude

# Si ça ne marche pas
git reset --hard HEAD
```

## Surveiller l'utilisation du contexte

### Avec /cost

```
/cost

Session cost: $0.45
Tokens used: 45,000 (input) + 5,000 (output)
Context size: ~40,000 tokens
```

### Signes d'un contexte surchargé

| Signe | Action |
|-------|--------|
| Réponses plus lentes | /compact |
| Claude "oublie" des instructions | /compact + rappeler |
| Coût qui augmente vite | /compact |
| Erreur de contexte | /compact obligatoire |

## Template de workflow optimisé

```bash
# Début de session
claude

# 1. Rappeler le contexte si nécessaire
> Résume ce qu'on a fait hier sur la feature auth

# 2. Définir la tâche du jour
> Aujourd'hui, on continue avec les tests

# 3. Travailler...

# 4. À intervalles réguliers (30-45 min)
/cost
# Si > 50k tokens → /compact

# 5. Avant de changer de sujet majeur
/clear

# 6. En fin de session
# Ajouter les apprentissages au CLAUDE.md
# Permet à la prochaine session de bénéficier du contexte
```

## Ce qui vous attend demain

Dans le **Jour 6**, nous verrons les **workflows Git avec Claude Code** : commits automatiques, création de PRs, et utilisation des checkpoints pour collaborer efficacement.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 4 : Prompt engineering](/fr/claude-code-prompt-engineering/)*
