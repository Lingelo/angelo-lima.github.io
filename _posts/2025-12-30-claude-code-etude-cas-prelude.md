---
layout: post
title: "Étude de cas : Prelude of the Chambered Reborn"
subtitle: "Jour 20 - Un projet complet avec Claude Code"
description: "Étude de cas complète : comment j'ai utilisé Claude Code pour recréer le jeu Prelude of the Chambered de Notch, du premier commit au déploiement."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code-series.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-20
categories: fr
---

Pour conclure cette série, quoi de mieux qu'une étude de cas concrète ? Voici comment j'ai utilisé Claude Code pour recréer **Prelude of the Chambered**, le jeu de Notch (créateur de Minecraft), avec une stack moderne.

> Pour découvrir le projet en détail, lisez mon article dédié : [Prelude of the Chambered Reborn : Renaissance d'un classique de Notch](/fr/prelude-of-the-chambered-reborn/)

> Voir aussi mon autre projet de jeu rétro en TypeScript : [GBTS - Un émulateur GameBoy](/fr/gbts-typescript-gameboy/)

## Le projet

### Contexte

**Prelude of the Chambered** est un dungeon crawler créé par Notch en 48h lors d'une game jam en 2011. Le code original est en Java, avec un moteur de rendu raycasting fait maison.

### Objectif

Recréer le jeu avec :
- TypeScript
- Three.js pour le rendu 3D
- Architecture moderne (modules ES6)
- Tests automatisés
- Documentation complète

## Phase 1 : Exploration (Jours 1-2)

### Analyser le code original

```
claude

> @java-src/**/*.java Analyse l'architecture du jeu original.
> Identifie les composants principaux et leurs responsabilités.
```

Claude a identifié :
- **Art.java** : Gestion des textures et sprites
- **Game.java** : Boucle de jeu principale
- **Level.java** : Structure du niveau
- **Entity.java** : Système d'entités (joueur, ennemis)
- **Screen.java** : Rendu raycasting

### Planifier la migration

```
> ultrathink. Propose une architecture TypeScript moderne
> pour recréer ce jeu avec Three.js
```

Claude a proposé :
```
src/
├── core/
│   ├── Game.ts         # Boucle de jeu
│   ├── Renderer.ts     # Three.js wrapper
│   └── Input.ts        # Gestion des contrôles
├── world/
│   ├── Level.ts        # Structure du niveau
│   ├── Tile.ts         # Types de tuiles
│   └── Loader.ts       # Chargement des niveaux
├── entities/
│   ├── Entity.ts       # Classe de base
│   ├── Player.ts       # Joueur
│   └── enemies/        # Différents ennemis
├── graphics/
│   ├── TextureManager.ts
│   └── SpriteSheet.ts
└── utils/
    └── Math.ts
```

## Phase 2 : Setup (Jour 3)

### Initialiser le projet

```
> Initialise un projet TypeScript avec Vite, Three.js,
> et configure ESLint + Prettier selon les conventions.
```

Claude a créé :
- `package.json` avec les dépendances
- `tsconfig.json` configuré pour le strict mode
- `vite.config.ts` avec les plugins nécessaires
- `.eslintrc.js` et `.prettierrc`

### CLAUDE.md du projet

```
> Crée un CLAUDE.md qui documente l'architecture et les conventions.
```

```markdown
# CLAUDE.md - Prelude Reborn

## Architecture
Ce projet est un remake de Prelude of the Chambered avec Three.js.

## Conventions
- TypeScript strict
- Composants ES6 modules
- Tests avec Vitest
- Naming: PascalCase classes, camelCase fonctions

## Fichiers clés
- src/core/Game.ts : Point d'entrée principal
- src/world/Level.ts : Gestion du niveau
- src/entities/Player.ts : Logique joueur
```

## Phase 3 : Core Engine (Jours 4-7)

### Système de rendu

```
> Implémente le Renderer.ts qui wraps Three.js
> pour afficher une scène first-person style dungeon crawler.
```

Claude a créé :
- Caméra perspective avec contrôles FPS
- Système de grille pour les murs
- Gestion des textures avec Three.js TextureLoader

### Boucle de jeu

```
> Implémente la boucle de jeu avec:
> - Update à 60 FPS
> - Delta time pour la physique
> - States (menu, playing, paused)
```

### Chargement des niveaux

```
> Analyse @java-src/Level.java et @java-src/Art.java
> pour comprendre le format des niveaux.
> Puis implémente le Level.ts compatible.
```

Claude a :
1. Analysé le format bitmap des niveaux originaux
2. Créé un parser pour les fichiers PNG
3. Implémenté la génération de la géométrie 3D

## Phase 4 : Gameplay (Jours 8-12)

### Système d'entités

```
> Implémente le système d'entités inspiré de @java-src/Entity.java
> avec:
> - Entity base class
> - Collision detection
> - Update/Render cycle
```

### Joueur et contrôles

```
> Implémente le Player.ts avec:
> - Mouvement WASD
> - Rotation souris
> - Interaction E
> - Santé et dégâts
```

### Ennemis

```
> Analyse les ennemis dans @java-src/entities/
> et implémente-les progressivement.
> Commence par le plus simple.
```

Claude a procédé méthodiquement :
1. **Bat** (chauve-souris) : Mouvement aléatoire
2. **Ghost** : Poursuite du joueur
3. **Ogre** : Patrouille + attaque
4. **Boss** : Combinaison de patterns

### Combat

```
> Implémente le système de combat:
> - Attaque joueur (clic gauche)
> - Dégâts aux ennemis
> - Dégâts au joueur
> - Effets visuels (flash rouge)
```

## Phase 5 : Polish (Jours 13-16)

### Audio

```
> Ajoute le système audio avec Web Audio API:
> - Musique de fond
> - Sons d'effets
> - Contrôle du volume
```

### UI

```
> Implémente l'interface utilisateur:
> - Barre de vie
> - Inventaire
> - Messages à l'écran
> - Menu pause
```

### Optimisation

```
> Profite le rendu et optimise:
> - Frustum culling
> - LOD pour les entités distantes
> - Texture atlasing
```

## Phase 6 : Tests et déploiement (Jours 17-20)

### Tests automatisés

```
> Génère des tests Vitest pour:
> - Level loading
> - Collision detection
> - Entity behavior
> - Game state management
```

Claude a généré des tests couvrant :
- Chargement correct des niveaux
- Détection de collision avec les murs
- Comportement des ennemis
- Transitions d'états du jeu

### CI/CD

```
> Configure GitHub Actions pour:
> - Lint + Type check
> - Tests
> - Build
> - Deploy sur GitHub Pages
```

### Documentation

```
> Génère la documentation du projet:
> - README complet
> - JSDoc pour les classes principales
> - Guide de contribution
```

## Résultats

### Métriques du projet

| Métrique | Valeur |
|----------|--------|
| Lignes de code | ~5,000 |
| Fichiers TypeScript | 45 |
| Couverture tests | 78% |
| Temps total | ~20 jours |
| Coût Claude Code | ~$120 |

### Ce que Claude a fait automatiquement

- ✅ Analyse du code Java original
- ✅ Proposition d'architecture
- ✅ Scaffolding du projet
- ✅ Implémentation des systèmes core
- ✅ Conversion des algorithmes Java → TypeScript
- ✅ Génération des tests
- ✅ Configuration CI/CD
- ✅ Documentation

### Ce que j'ai fait manuellement

- 🎨 Choix artistiques (couleurs, textures)
- 🔧 Fine-tuning du gameplay (vitesse, dégâts)
- 🐛 Debug de certains edge cases
- ✍️ Revue de code et validation

## Leçons apprises

### Ce qui a bien fonctionné

1. **CLAUDE.md détaillé** : Plus le contexte est riche, meilleures sont les réponses
2. **Workflow EPCT** : Explore → Plan → Code → Test à chaque feature
3. **Références @ précises** : `@java-src/Entity.java` plutôt que "le fichier Entity"
4. **ultrathink pour la conception** : Architecture solide dès le départ

### Ce qui a nécessité des ajustements

1. **Three.js spécifique** : Claude connaît Three.js mais pas toutes les subtilités
2. **Performances** : Les premières implémentations n'étaient pas optimisées
3. **Edge cases** : Les cas limites nécessitaient des prompts spécifiques

### Conseils pour vos projets

1. **Commencez par le contexte** : Un bon CLAUDE.md fait toute la différence
2. **Itérez en petites étapes** : Feature par feature, pas tout d'un coup
3. **Utilisez ultrathink** : Pour la conception et les problèmes complexes
4. **Testez souvent** : Claude peut générer les tests, utilisez-les
5. **Commitez régulièrement** : Les checkpoints Git sont votre filet de sécurité

## Conclusion de la série

En 20 jours, nous avons couvert :

1. **Installation et premiers pas**
2. **Syntaxe secrète #@/!**
3. **Workflow EPCT**
4. **Prompt engineering**
5. **Gestion du contexte**
6. **Git workflows**
7. **Permissions et sécurité**
8. **Slash commands personnalisées**
9. **Subagents**
10. **Skills**
11. **Plugins et marketplace**
12. **Hooks**
13. **MCP**
14. **IDE integration**
15. **CI/CD headless**
16. **Facturation et coûts**
17. **Troubleshooting**
18. **Status line et terminal**
19. **Comparatif des outils**
20. **Cette étude de cas**

Claude Code est un outil puissant qui, bien utilisé, transforme la façon dont nous développons. Ce n'est pas un remplacement du développeur, mais un **multiplicateur de productivité**.

Maintenant, c'est à vous de jouer !

---

*Merci d'avoir suivi cette série "Maîtriser Claude Code en 20 jours". [Découvrez le projet Prelude Reborn](/fr/prelude-of-the-chambered-reborn/)*
