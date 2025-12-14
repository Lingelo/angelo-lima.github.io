---
layout: post
title: "Subagents : Déléguer Intelligemment"
subtitle: "Jour 9 - Créez des agents spécialisés pour les tâches complexes"
description: "Maîtrisez les subagents Claude Code : agents intégrés, création d'agents personnalisés, isolation du contexte, et délégation efficace des tâches."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-9
categories: fr
---

Les commandes slash automatisent des workflows. Les **subagents** vont plus loin : ce sont des agents IA spécialisés avec leur propre contexte, instructions et outils. Aujourd'hui, nous allons apprendre à les utiliser et les créer.

## Qu'est-ce qu'un Subagent ?

Un subagent est un agent Claude dédié qui :
- Opère dans un **contexte séparé** de la conversation principale
- A ses propres **instructions système**
- A accès à des **outils spécifiques**
- Peut être invoqué pour des tâches spécialisées

### Avantages des Subagents

| Avantage | Description |
|----------|-------------|
| Isolation | Pas de pollution du contexte principal |
| Spécialisation | Instructions optimisées pour une tâche |
| Réutilisabilité | Partageable entre projets |
| Contrôle | Outils limités par besoin |

## Subagents Intégrés

Claude Code inclut trois subagents par défaut :

### @explorer

```
> @explorer Où est définie la fonction calculateDiscount ?
```

| Caractéristique | Valeur |
|-----------------|--------|
| Modèle | Haiku (rapide, économique) |
| Mode | Lecture seule |
| Usage | Recherche et exploration |
| Outils | Read, Grep, Glob |

Idéal pour :
- Trouver des définitions
- Comprendre l'architecture
- Localiser des patterns

### @planner

```
> @planner Propose un plan pour migrer de REST vers GraphQL
```

| Caractéristique | Valeur |
|-----------------|--------|
| Modèle | Sonnet |
| Mode | Lecture seule + réflexion |
| Usage | Planification |
| Outils | Read, Grep, Glob |

Idéal pour :
- Planifier un refactoring
- Architecturer des features
- Évaluer des approches

### @general-purpose

Agent généraliste pour les tâches complexes multi-étapes.

| Caractéristique | Valeur |
|-----------------|--------|
| Modèle | Sonnet |
| Mode | Lecture/écriture |
| Usage | Tâches complexes |
| Outils | Tous |

## Créer un Subagent Personnalisé

### Méthode 1 : Interface Interactive

```
/agents
```

Cette commande ouvre une interface pour :
- Voir les agents existants
- Créer de nouveaux agents
- Modifier les paramètres

### Méthode 2 : Fichier Markdown

Créez un fichier dans `.claude/agents/` :

```markdown
<!-- .claude/agents/security-auditor.md -->
---
name: security-auditor
description: Expert en audit de sécurité applicative
tools: Read, Grep, Glob
model: claude-sonnet-4-5-20250929
---

Vous êtes un expert en sécurité applicative avec 15 ans d'expérience.

## Votre Rôle
Analyser le code pour identifier les vulnérabilités de sécurité.

## Méthodologie
1. Identifier les points d'entrée (inputs utilisateur)
2. Tracer le flux de données
3. Rechercher les patterns dangereux
4. Proposer des correctifs

## Vulnérabilités à Rechercher
- Injection SQL
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- Injection de commandes
- Path traversal
- Exposition de données sensibles
- Authentification/autorisation cassée

## Format de Rapport
Pour chaque vulnérabilité :
- **Fichier** : chemin du fichier
- **Ligne** : numéro de ligne
- **Sévérité** : Critique / Haute / Moyenne / Faible
- **Description** : explication du problème
- **Impact** : conséquences possibles
- **Correctif** : code corrigé
```

### Méthode 3 : Génération Assistée

```
/agents

> Crée un agent spécialisé dans la review de code TypeScript
```

Claude génère un template que vous pouvez personnaliser.

## Structure d'un Fichier Agent

### Le Frontmatter

```yaml
---
name: agent-name           # Identifiant unique (requis)
description: Description   # Affiché lors de l'invocation
tools: Read, Grep, Glob    # Outils autorisés
model: claude-sonnet-4-5-20250929  # Ou "inherit" pour hériter
---
```

### Options de Modèle

| Valeur | Description |
|--------|-------------|
| `inherit` | Utilise le modèle de la session principale |
| `claude-sonnet-4-5-20250929` | Sonnet spécifique |
| `claude-3-5-haiku-20241022` | Haiku pour tâches légères |

### Le Corps : System Prompt

Tout ce qui suit le frontmatter devient le **system prompt** de l'agent.

## Exemples de Subagents Utiles

### Agent Code Reviewer

```markdown
---
name: code-reviewer
description: Review de code approfondie
tools: Read, Grep, Glob
model: inherit
---

Vous êtes un développeur senior expert en clean code.

## Mission
Effectuer des reviews de code constructives et actionnables.

## Points à Vérifier
1. **Lisibilité** : Le code est-il auto-documenté ?
2. **Maintenabilité** : Facile à modifier ?
3. **Performance** : Problèmes évidents ?
4. **Tests** : Couverture suffisante ?
5. **Sécurité** : Vulnérabilités ?

## Style de Feedback
- Constructif et bienveillant
- Toujours proposer une alternative
- Prioriser par importance
- Expliquer le "pourquoi"
```

### Agent Test Writer

```markdown
---
name: test-writer
description: Génère des tests complets
tools: Read, Write, Bash(npm test:*)
model: inherit
---

Vous êtes spécialisé dans l'écriture de tests.

## Framework
- Vitest pour les tests unitaires
- Testing Library pour les composants
- MSW pour les mocks d'API

## Méthodologie
1. Analyser le code à tester
2. Identifier les cas : nominal, erreurs, limites
3. Écrire les tests avec le pattern AAA (Arrange-Act-Assert)
4. Vérifier que les tests passent

## Conventions
- Un fichier de test par module
- Descriptions claires
- Mocks dans __mocks__/
- Factories dans tests/factories/
```

### Agent Documentation

```markdown
---
name: doc-writer
description: Génère de la documentation technique
tools: Read, Grep, Glob, Write
model: inherit
---

Vous êtes un rédacteur technique expérimenté.

## Mission
Générer de la documentation claire et complète.

## Types de Documentation
- JSDoc pour les fonctions
- README pour les modules
- ADR pour les décisions d'architecture
- Guides pour les nouveaux développeurs

## Style
- Concis mais complet
- Exemples de code fonctionnels
- Structure cohérente
- Accessible aux juniors
```

### Agent Refactoring

```markdown
---
name: refactor-expert
description: Expert en refactoring et clean code
tools: Read, Write, Edit, Bash(npm test:*)
model: claude-sonnet-4-5-20250929
---

Vous êtes un expert en refactoring avec une approche prudente.

## Principes
- Petits changements incrémentaux
- Tests verts avant et après
- Pas de changement de comportement
- Un commit par refactoring

## Patterns à Appliquer
- Extract Method
- Extract Class
- Replace Conditional with Polymorphism
- Introduce Parameter Object
- Replace Magic Number with Constant

## Processus
1. Comprendre le code actuel
2. Identifier le smell
3. Choisir le refactoring approprié
4. Vérifier les tests
5. Appliquer
6. Re-vérifier les tests
```

## Invoquer un Subagent

### Syntaxe de Base

```
> @nom-agent Votre requête ici
```

### Exemples

```
> @security-auditor Analyse src/api/auth.ts pour les failles de sécurité

> @test-writer Écris les tests pour src/utils/validation.ts

> @refactor-expert Le fichier src/services/user.ts fait 500 lignes, propose un découpage
```

## Portée des Agents

### Agents Projet

```
.claude/agents/
└── mon-agent.md
```

Disponible uniquement dans ce projet.

### Agents Utilisateur

```
~/.claude/agents/
└── mon-agent.md
```

Disponible dans tous vos projets.

## Bonnes Pratiques

### 1. Un Agent = Une Responsabilité

❌ **Mauvais** : Agent qui fait review + tests + documentation
✅ **Bon** : Trois agents spécialisés

### 2. Instructions Précises

Plus le system prompt est détaillé, meilleurs sont les résultats.

### 3. Outils Minimaux

Ne donnez que les outils nécessaires :

```yaml
# Agent read-only
tools: Read, Grep, Glob

# Agent avec écriture contrôlée
tools: Read, Write, Bash(npm test:*)
```

### 4. Testez Vos Agents

Avant de partager avec l'équipe, testez sur plusieurs cas d'usage.

## Ce qui Arrive Demain

Dans le **Jour 10**, nous découvrirons les **Skills** : des capacités que Claude invoque **automatiquement** selon le contexte, sans que vous ayez besoin de les appeler explicitement.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 8 : Commandes Slash Personnalisées](/fr/claude-code-slash-commands-personnalisees/)*
