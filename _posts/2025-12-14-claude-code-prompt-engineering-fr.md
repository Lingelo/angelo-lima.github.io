---
layout: post
title: "Prompt Engineering pour Claude Code"
subtitle: "Jour 4 - Techniques pour obtenir exactement ce que vous voulez"
description: "Techniques avancées de prompt engineering pour Claude Code. Structurez vos requêtes, fournissez le bon contexte, et évitez les erreurs courantes."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-4
categories: fr
---

Vous maîtrisez maintenant le workflow Explore → Plan → Code → Test. Mais la qualité des résultats dépend énormément de **comment** vous formulez vos requêtes. Aujourd'hui, nous allons aborder les techniques de prompt engineering spécifiques à Claude Code.

## Le Principe Fondamental : La Spécificité

La différence entre un bon et un mauvais prompt :

| Mauvais prompt | Bon prompt |
|----------------|------------|
| "Ajoute des tests" | "Ajoute des tests unitaires pour la fonction `calculateDiscount` couvrant : prix négatif, remise > 100%, et cas nominal" |
| "Corrige le bug" | "Le bug : `TypeError: Cannot read property 'id' of undefined` à la ligne 42 de `@src/api/users.ts`. Corrige en ajoutant une vérification null." |
| "Améliore le code" | "Refactorise `@src/utils/helpers.ts` pour extraire les fonctions de validation dans un module séparé `validators.ts`" |

## Structure d'un Prompt Efficace

### Le Template CCAR

```
CONTEXTE: [Situation actuelle]
CONTRAINTES: [Limitations à respecter]
ACTION: [Ce que vous voulez]
RÉSULTAT: [Format attendu]
```

### Exemple Appliqué

```
> CONTEXTE: J'ai un composant React `UserProfile` qui fait 300 lignes.
  Il gère l'affichage, les appels API, et la validation du formulaire.

  CONTRAINTES:
  - Garder la compatibilité avec les tests existants
  - Ne pas changer les props publiques
  - Utiliser les hooks existants dans @src/hooks/

  ACTION: Diviser ce composant en suivant le pattern Container/Presenter.

  RÉSULTAT: Montre-moi le plan de découpage avant de coder.
```

## Techniques Avancées

### 1. Fournir des Exemples (Few-shot)

```
> Je veux que les fonctions utilitaires suivent ce pattern :

  /**
   * Calcule le prix TTC à partir du prix HT
   * @param prixHT - Prix hors taxes
   * @param tauxTVA - Taux de TVA (ex: 0.20 pour 20%)
   * @returns Prix TTC arrondi à 2 décimales
   * @throws {InvalidPriceError} Si le prix est négatif
   */
  export function calculerPrixTTC(prixHT: number, tauxTVA: number): number {
    if (prixHT < 0) throw new InvalidPriceError('Le prix ne peut pas être négatif');
    return Math.round((prixHT * (1 + tauxTVA)) * 100) / 100;
  }

  Crée une fonction `calculerRemise` qui suit exactement ce pattern.
```

### 2. Spécifier les Contraintes Négatives

Ce que vous **ne voulez pas** est aussi important :

```
> Refactorise ce code avec ces contraintes :

  NE PAS:
  - Ajouter de nouvelles dépendances
  - Modifier les signatures de fonctions publiques
  - Changer le comportement observable
  - Utiliser any ou as unknown

  FAIRE:
  - Extraire les fonctions dupliquées
  - Améliorer le typage
  - Ajouter des early returns
```

### 3. Demander Plusieurs Options

```
> Propose 3 approches différentes pour implémenter le cache des requêtes :

  1. Une approche simple avec Map
  2. Une approche avec TTL et invalidation
  3. Une approche avec Redis

  Pour chaque approche, indique : complexité, avantages, inconvénients.
```

### 4. Utiliser le Contexte des Fichiers

```
> En analysant @src/api/users.ts et @src/api/products.ts,
  identifie le pattern commun et crée une factory générique
  pour les endpoints CRUD.
```

### 5. Chaîner les Requêtes

Au lieu d'une grande requête, chaînez-les :

```
> Étape 1: Liste les problèmes de performance dans @src/components/DataTable.tsx

[Claude liste 5 problèmes]

> Étape 2: Pour le problème #2 (re-renders inutiles), propose une solution

[Claude propose]

> Étape 3: Implémente cette solution avec useMemo
```

## Patterns de Prompts pour Cas Courants

### Debugging

```
> BUG: [Description]
  ERREUR: [Message d'erreur exact]
  FICHIER: @path/to/file.ts:LIGNE
  REPRODUCTION: [Étapes pour reproduire]

  Analyse et propose un fix.
```

### Code Review

```
> Review @src/features/checkout/payment.ts en vérifiant :

  1. Sécurité (injection, XSS, validation)
  2. Gestion d'erreurs (try/catch, erreurs métier)
  3. Performance (N+1, mémoire)
  4. Maintenabilité (nommage, complexité)

  Format : liste les problèmes par catégorie avec sévérité (critique/moyen/faible)
```

### Refactoring

```
> Refactorise @src/legacy/oldModule.ts :

  OBJECTIF: Migrer vers le nouveau pattern utilisé dans @src/modules/newModule.ts
  GARDER: Les tests existants doivent passer
  SUPPRIMER: Le code mort identifié par ESLint
  AJOUTER: Types TypeScript stricts
```

### Documentation

```
> Génère la documentation JSDoc pour @src/lib/auth.ts :

  - Description de chaque fonction publique
  - @param avec types et descriptions
  - @returns avec type et description
  - @throws pour les erreurs possibles
  - @example avec un cas d'usage

  Style : concis, technique, sans blabla
```

### Tests

```
> Génère les tests pour @src/services/orderService.ts :

  FRAMEWORK: Vitest
  PATTERN: Arrange-Act-Assert
  COUVERTURE:
  - Cas nominal (happy path)
  - Cas d'erreur (validation, DB, réseau)
  - Cas limites (null, undefined, vide)

  MOCKS: Utilise les factories dans @tests/factories/
```

## Mots-Clés qui Changent Tout

### Pour la Réflexion

| Mot-clé | Effet |
|---------|-------|
| `think` | Réflexion basique |
| `think hard` | Réflexion approfondie |
| `think harder` | Analyse en profondeur |
| `ultrathink` | Réflexion maximale |
| `step by step` | Décomposition explicite |
| `analyze` | Focus sur l'analyse vs l'action |

### Pour le Format

| Mot-clé | Effet |
|---------|-------|
| `concise` | Réponses courtes |
| `detailed` | Explications complètes |
| `list` | Format liste à puces |
| `table` | Format tableau markdown |
| `code only` | Pas d'explications, juste du code |

### Pour l'Action

| Mot-clé | Effet |
|---------|-------|
| `don't code yet` | Force le mode plan |
| `show before applying` | Prévisualisation des changements |
| `one step at a time` | Implémentation incrémentale |
| `suggest alternatives` | Plusieurs options |

## Erreurs Courantes à Éviter

### 1. Le Prompt Vague

❌ **Mauvais** :
```
> Améliore ce code
```

✅ **Bon** :
```
> Améliore @src/utils/date.ts en :
  1. Remplaçant moment.js par date-fns
  2. Ajoutant un typage strict
  3. Ajoutant des tests pour les cas limites de timezone
```

### 2. Trop de Choses à la Fois

❌ **Mauvais** :
```
> Crée un système d'authentification complet avec OAuth, 2FA, sessions,
  rate limiting, logs d'audit, et dashboard admin
```

✅ **Bon** :
```
> Étape 1: Crée le schéma de base de données pour l'authentification
  (users, sessions, oauth_accounts)
```

### 3. Pas de Contexte

❌ **Mauvais** :
```
> Pourquoi ça ne marche pas ?
```

✅ **Bon** :
```
> Cette fonction retourne undefined au lieu de l'objet user :

  @src/api/users.ts:42-55

  Input attendu: { email: "test@example.com" }
  Output attendu: { id: 1, email: "test@example.com", name: "Test" }
  Output actuel: undefined

  Voici les logs : !`npm run debug:users 2>&1`
```

### 4. Ignorer les Contraintes du Projet

❌ **Mauvais** :
```
> Utilise Redux pour la gestion d'état
```

✅ **Bon** :
```
> En utilisant Zustand (déjà configuré dans @src/store/),
  ajoute un store pour gérer le panier d'achat
```

## Template CLAUDE.md Optimisé

Voici un template `CLAUDE.md` qui améliore drastiquement les réponses :

```markdown
# CLAUDE.md

## Contexte Projet
[Type d'application, stack technique, contraintes métier]

## Conventions de Code
- Nommage : [camelCase, PascalCase, etc.]
- Structure : [Feature-based, Layer-based, etc.]
- Patterns : [Hooks, HOC, Render Props, etc.]

## Commandes Utiles
- `npm run dev`: Développement
- `npm run test`: Tests
- `npm run lint`: Linting
- `npm run typecheck`: TypeScript

## Règles Strictes
- NE JAMAIS modifier les fichiers dans /config/
- NE JAMAIS commiter les fichiers .env
- TOUJOURS utiliser des types stricts (pas de any)
- TOUJOURS ajouter des tests pour le nouveau code

## Stack Technique
- Framework: [Next.js 14, etc.]
- État: [Zustand, etc.]
- BDD: [PostgreSQL + Prisma, etc.]
- Tests: [Vitest + Testing Library, etc.]

## Exemples de Bon Code
Voir @src/features/auth/ pour le pattern à suivre.
```

## Ce qui Arrive Demain

Dans le **Jour 5**, nous plongerons dans la **gestion du contexte et de la mémoire** : comment Claude Code se souvient de vos préférences et comment optimiser les sessions longues.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 3 : Le Workflow Explore → Plan → Code → Test](/fr/claude-code-workflow-explore-plan-code-test-fr/)*
