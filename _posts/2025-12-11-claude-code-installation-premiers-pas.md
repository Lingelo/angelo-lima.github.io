---
layout: post
title: "Claude Code : Installation et premiers pas"
subtitle: "Jour 1 - Découvrez l'assistant IA qui va transformer votre façon de coder"
description: "Guide complet pour installer Claude Code, configurer votre environnement et maîtriser les commandes essentielles. Premier article d'une série de 20 jours pour devenir expert."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-1
categories: fr
---

Bienvenue dans cette série de 20 articles pour maîtriser Claude Code ! Chaque jour, nous explorerons une fonctionnalité qui fera de vous un développeur plus efficace. Aujourd'hui : l'installation et les premiers pas.

## Qu'est-ce que Claude Code ?

Claude Code est l'interface en ligne de commande officielle d'Anthropic pour interagir avec Claude. Contrairement aux chatbots web classiques, Claude Code s'intègre directement dans votre terminal et comprend votre codebase.

**Ce qui le différencie :**
- Accès direct à vos fichiers et votre terminal
- Compréhension du contexte de votre projet
- Capacité à lire, écrire et exécuter du code
- Intégration Git native

## Installation

### Prérequis

- Node.js 18+ installé (ou [Bun](/fr/bun-sh/) comme alternative)
- Un compte Anthropic (API ou claude.ai)

### Installation via npm

```bash
npm install -g @anthropic-ai/claude-code
```

### Première authentification

```bash
claude
```

À la première exécution, Claude Code vous guidera pour vous connecter. Deux options :
1. **Compte claude.ai** : Facturation basée sur votre abonnement
2. **API Anthropic** : Facturation token-based (~$6/jour en moyenne)

Vos credentials sont stockés localement, pas besoin de se reconnecter à chaque session.

## Le fichier CLAUDE.md : votre contrat avec l'IA

Le premier réflexe après l'installation : créer un fichier `CLAUDE.md` à la racine de votre projet.

```markdown
# CLAUDE.md

## Contexte du projet
Application e-commerce en Next.js 14 avec TypeScript strict.

## Conventions
- Utiliser les Server Components par défaut
- Tests avec Vitest
- [Commits conventionnels](/fr/conventional-commits/) (feat:, fix:, etc.)

## Commandes utiles
- `npm run dev` : Serveur de développement
- `npm run test` : Lancer les tests
- `npm run lint` : Vérification du code
```

Claude lit ce fichier automatiquement et adapte ses réponses à votre contexte. C'est votre **contrat** avec l'IA : plus il est précis, plus Claude sera pertinent.

## Les commandes essentielles

### Commandes de navigation

| Commande | Action |
|----------|--------|
| `/help` | Afficher l'aide complète |
| `/clear` | Effacer l'historique de conversation |
| `/exit` ou `Ctrl+D` | Quitter Claude Code |

### Commandes de diagnostic

| Commande | Action |
|----------|--------|
| `/doctor` | Vérifier la santé du système |
| `/config` | Voir/modifier la configuration |
| `/model` | Changer de modèle (Haiku/Sonnet/Opus) |

### Commandes de session

| Commande | Action |
|----------|--------|
| `/cost` | Voir le coût de la session actuelle |
| `/compact` | Réduire la taille du contexte |

### Exemple de session

```bash
$ claude
╭─────────────────────────────────────╮
│ Claude Code                         │
│ Model: claude-sonnet-4-5-20250929   │
╰─────────────────────────────────────╯

> Explique-moi la structure de ce projet

Je vais analyser la structure de votre projet...

[Claude lit les fichiers et répond avec le contexte]
```

## Les raccourcis clavier indispensables

| Raccourci | Action |
|-----------|--------|
| `Ctrl+C` | Annuler l'opération en cours |
| `Ctrl+L` | Effacer l'écran du terminal |
| `Ctrl+D` | Quitter Claude Code |
| `Tab` | Activer/désactiver la réflexion étendue |
| `Esc Esc` | Revenir en arrière (rewind) |
| `Ctrl+R` | Rechercher dans l'historique |

## Choisir le bon modèle

Claude Code propose trois modèles avec des compromis différents :

| Modèle | Force | Coût | Usage recommandé |
|--------|-------|------|------------------|
| **Haiku** | Rapide, économique | $ | Questions simples, exploration rapide |
| **Sonnet** | Équilibré | $$ | Usage quotidien, la plupart des tâches |
| **Opus** | Maximum de capacité | $$$ | Problèmes complexes, architecture |

Pour changer de modèle :
```bash
/model haiku
/model sonnet
/model opus
```

## Premier exercice pratique

Essayez ces commandes dans un de vos projets :

```bash
# 1. Lancez Claude Code
claude

# 2. Demandez une analyse
> Décris la structure de ce projet et identifie les technologies utilisées

# 3. Vérifiez le coût
/cost

# 4. Changez de modèle pour une question simple
/model haiku
> Quel est le point d'entrée de l'application ?

# 5. Revenez à Sonnet
/model sonnet
```

## Bonnes pratiques dès le début

1. **Créez toujours un CLAUDE.md** : Même minimal, il améliore drastiquement les réponses
2. **Utilisez `/clear` entre les tâches** : Évite la pollution du contexte
3. **Commencez par Sonnet** : Le meilleur rapport qualité/coût pour débuter
4. **Vérifiez `/cost` régulièrement** : Prenez l'habitude de surveiller votre consommation

## Ce qui vous attend demain

Dans le **[Jour 2](/fr/claude-code-syntaxe-secrete/)**, nous découvrirons la **syntaxe secrète de Claude Code** : les raccourcis `#@/!` qui font la différence entre un utilisateur basique et un power user.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". Retrouvez tous les articles sur [mon blog](/fr/).*
