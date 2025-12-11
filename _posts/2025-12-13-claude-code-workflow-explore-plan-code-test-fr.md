---
layout: post
title: "Le workflow Explore → Plan → Code → Test"
subtitle: "Jour 3 - La méthodologie qui distingue les développeurs seniors"
description: "Maîtrisez le workflow Explore, Plan, Code, Test de Claude Code. Extended thinking, plan mode et méthodologie pour éviter le syndrome du code 'presque correct'."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-3
categories: fr
---

Dans mon article sur [l'état de l'IA dans le développement en 2025](/fr/ia-et-developpement-entre-promesses-et-realites-un-etat-des-lieux-en-2025/), j'évoquais le syndrome du code "presque correct" : **45% des développeurs passent plus de temps à débugger le code généré par l'IA qu'à l'écrire eux-mêmes**.

La solution ? Un workflow structuré qui transforme Claude d'un générateur de code hasardeux en véritable partenaire de développement.

## Le problème : Coder sans comprendre

La plupart des développeurs utilisent Claude Code ainsi :

```
> Ajoute une fonctionnalité d'authentification
[Claude génère 200 lignes de code]
[Le développeur copie-colle]
[Bugs, incompatibilités, problèmes de sécurité...]
```

C'est le **"vibe coding"** : on décrit vaguement ce qu'on veut et on espère que ça marche.

## La solution : Le workflow E.P.C.T.

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ EXPLORE │ ──▶ │  PLAN   │ ──▶ │  CODE   │ ──▶ │  TEST   │
│ (5-10m) │     │ (think) │     │ (apply) │     │ (verify)│
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

## Phase 1 : EXPLORE

**Objectif** : Comprendre avant d'agir.

### Utiliser le subagent @explorer

```
> @explorer Comment fonctionne l'authentification actuelle dans ce projet ?
```

Le subagent `@explorer` utilise le modèle **Haiku** (rapide et économique) en mode **read-only**. Il ne peut pas modifier de fichiers, seulement lire et analyser. Pour en savoir plus sur les subagents, voir le [Jour 9](/fr/claude-code-subagents/).

### Questions typiques phase Explore

```
> @explorer Où sont définis les middlewares d'authentification ?

> @explorer Quels patterns sont utilisés pour la gestion d'erreurs ?

> @explorer Liste toutes les dépendances liées à la base de données

> @explorer Comment les tests sont-ils organisés ?
```

### Durée recommandée

**5 à 10 minutes** pour un projet que vous ne connaissez pas. Moins si vous connaissez bien le code.

### Pourquoi c'est crucial

Sans cette phase, Claude fait des **suppositions** sur votre code. Avec cette phase, Claude **sait** comment fonctionne votre code.

## Phase 2 : PLAN

**Objectif** : Obtenir un plan détaillé AVANT d'écrire du code.

### Activer le mode Plan

Deux méthodes :

**Méthode 1 : Raccourci clavier**
```
Shift+Tab (plusieurs fois jusqu'à voir "plan mode")
```

**Méthode 2 : Prompt explicite**
```
> Ne code pas encore. Propose d'abord un plan détaillé pour ajouter
  l'authentification OAuth avec Google.
```

### Les niveaux de réflexion (Extended Thinking)

Claude Code propose différents niveaux de "réflexion" :

| Commande | Profondeur | Usage |
|----------|------------|-------|
| `think` | Basique | Questions simples |
| `think hard` | Modéré | Problèmes standards |
| `think harder` | Profond | Problèmes complexes |
| `ultrathink` | Maximum | Architecture, décisions critiques |

### Exemple de prompt en mode Plan

```
> ultrathink

  Je veux ajouter l'authentification OAuth Google à mon application Next.js.

  Contexte :
  - J'utilise actuellement des JWT stockés en HttpOnly cookies
  - Base de données PostgreSQL avec Prisma
  - Les utilisateurs existants ont un email/password

  Propose un plan détaillé en tenant compte de :
  1. La migration des utilisateurs existants
  2. La coexistence des deux méthodes d'auth
  3. La sécurité et les bonnes pratiques
  4. L'impact sur les tests existants
```

### Ce qu'un bon plan contient

- **Étapes numérotées** dans l'ordre
- **Fichiers à modifier** identifiés
- **Dépendances** à installer
- **Points d'attention** (sécurité, performance)
- **Tests** à ajouter ou modifier
- **Estimation de complexité**

### Activer l'Extended Thinking par défaut

L'extended thinking consomme plus de tokens - voir le [Jour 16](/fr/claude-code-facturation-couts/) pour les conseils d'optimisation des coûts.

Variable d'environnement :
```bash
export MAX_THINKING_TOKENS=10000
```

Ou dans votre configuration :
```json
{
  "model": {
    "extendedThinking": true
  }
}
```

## Phase 3 : CODE

**Objectif** : Implémenter le plan validé.

### Valider le plan avant de coder

```
> Le plan me convient. Implémente l'étape 1 : création du schéma Prisma
  pour les comptes OAuth.
```

### Une étape à la fois

Ne demandez pas tout d'un coup. Procédez étape par étape :

```
> Implémente l'étape 1
[Claude implémente]
[Vous validez]

> Implémente l'étape 2
[Claude implémente]
[Vous validez]

...
```

### Utiliser les références de fichiers

```
> Implémente l'étape 3 en suivant le pattern de @src/auth/jwt.ts
```

### Si quelque chose ne va pas

```
Esc Esc  → Revenir en arrière (rewind)
```

Options de rewind :
1. **Conversation uniquement** : Garde le code, revient dans la conversation
2. **Code uniquement** : Garde la conversation, annule le code
3. **Les deux** : Annule tout

## Phase 4 : TEST

**Objectif** : Vérifier que l'implémentation fonctionne.

### Approche TDD inversé

Idéalement, écrivez les tests AVANT de demander l'implémentation :

```
> Voici les tests que l'implémentation doit passer :

  @tests/auth/oauth.test.ts

  Implémente le code pour faire passer ces tests.
```

### Vérification post-implémentation

```
> Lance les tests et montre-moi les résultats : !`npm test 2>&1`
```

### Demander l'analyse des tests

```
> Voici les résultats des tests : !`npm test 2>&1`

  Analyse les échecs et propose des corrections.
```

## Exemple complet : Workflow E.P.C.T.

```bash
# SESSION CLAUDE CODE

# === PHASE EXPLORE (5 min) ===
> @explorer Comment est gérée l'authentification actuellement ?

> @explorer Quels sont les endpoints API existants pour l'auth ?

# === PHASE PLAN ===
> ultrathink

  Je veux ajouter du rate limiting sur les endpoints d'authentification
  pour prévenir les attaques par force brute.

  Ne code pas. Propose d'abord un plan détaillé.

# [Claude propose un plan en 5 étapes]

> Le plan est bon, mais j'aimerais aussi logger les tentatives bloquées.
  Mets à jour le plan.

# [Claude met à jour]

> OK, le plan me convient.

# === PHASE CODE ===
> Implémente l'étape 1 : installer et configurer express-rate-limit

> Implémente l'étape 2 : créer le middleware de rate limiting

> Implémente l'étape 3 : appliquer aux routes d'auth

# === PHASE TEST ===
> Crée les tests pour vérifier que le rate limiting fonctionne

> !`npm test -- rate-limit 2>&1`

> Les tests passent. Vérifie qu'on n'a pas cassé les tests existants :
  !`npm test 2>&1`
```

## Toggle Extended Thinking avec Tab

Le raccourci `Tab` permet de basculer rapidement :

```
[Tab] → Extended Thinking ON (icône 🧠 visible)
[Tab] → Extended Thinking OFF
```

Utilisez **ON** pour :
- Problèmes complexes
- Décisions d'architecture
- Debugging difficile
- Planification

Utilisez **OFF** pour :
- Questions simples
- Commandes rapides
- Exploration basique

## Anti-patterns à éviter

| Anti-pattern | Problème | Solution |
|--------------|----------|----------|
| Demander tout d'un coup | Code incohérent | Une étape à la fois |
| Pas de phase Explore | Suppositions fausses | 5 min d'exploration |
| Pas de plan | Refactoring constant | Toujours planifier |
| Pas de tests | Bugs cachés | TDD ou tests post-implémentation |

## Ce qui vous attend demain

Dans le **[Jour 4](/fr/claude-code-prompt-engineering/)**, nous verrons les **techniques de prompt engineering spécifiques à Claude Code** pour obtenir des résultats encore meilleurs.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 2 : La syntaxe secrète #@/!](/fr/claude-code-syntaxe-secrete/)*
