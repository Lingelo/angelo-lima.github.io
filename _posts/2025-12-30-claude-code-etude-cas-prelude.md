---
layout: post
title: "Étude de cas : Prelude of the Chambered Reborn"
subtitle: "Jour 20 - Comment j'ai converti un jeu Java en TypeScript en une soirée"
description: "Retour d'expérience réel : comment j'ai utilisé Claude Code pour convertir le jeu Prelude of the Chambered de Notch (Java) en TypeScript en une seule soirée."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-20
categories: fr
---

Pour conclure cette série, quoi de mieux qu'un retour d'expérience concret ? Voici comment j'ai utilisé Claude Code pour convertir **Prelude of the Chambered**, le jeu de Notch (créateur de Minecraft), de Java vers TypeScript — **en une seule soirée**.

> Pour découvrir le projet en détail, lisez mon article dédié : [Prelude of the Chambered Reborn : Renaissance d'un classique de Notch](/fr/prelude-of-the-chambered-reborn/)

> Voir aussi mon autre projet de jeu rétro en TypeScript : [GBTS - Un émulateur GameBoy](/fr/gbts-typescript-gameboy/)

## Le défi

### Le projet original

**Prelude of the Chambered** est un dungeon crawler créé par Notch en 48h lors de la Ludum Dare 21 en 2011. Le code original est en Java, avec un moteur de rendu **raycasting software** fait maison — environ 5 000 lignes de code Java réparties sur une quarantaine de fichiers.

### Mon objectif

Porter le jeu vers le web moderne avec :
- TypeScript au lieu de Java
- Canvas 2D API (rendu software, comme l'original)
- Vite pour le build
- Déployable sur n'importe quel navigateur

Le défi : conserver le moteur de raycasting original et son rendu pixel par pixel, sans passer par WebGL ou une bibliothèque 3D.

**Sans Claude Code**, j'aurais estimé ce projet à plusieurs semaines de travail. Avec Claude Code, je me suis lancé un soir après le dîner en me disant "on verra bien jusqu'où on va".

## Une soirée, un jeu complet

### Exploration du code Java

```
claude

> @java-src/**/*.java Analyse l'architecture du jeu original.
> Identifie les composants principaux et leurs responsabilités.
```

En quelques secondes, Claude a cartographié l'ensemble du projet :
- **Art.java** : Gestion des textures et sprites
- **Game.java** : Boucle de jeu principale
- **Level.java** : Chargement des niveaux via des images PNG
- **Screen.java** : Moteur de raycasting software
- **Entity.java** : Système d'entités

### Conversion du moteur de rendu

Le cœur du projet : adapter le moteur de raycasting Java vers TypeScript/Canvas 2D.

```
> Analyse @java-src/Screen.java et @java-src/Bitmap.java
> Implémente l'équivalent en TypeScript avec Canvas 2D API.
> Conserve le rendu software pixel par pixel.
```

Claude a :
1. Compris le système de rendu par bitmap de Notch
2. Adapté les calculs de raycasting pour TypeScript
3. Créé une classe Bitmap compatible avec le Canvas 2D
4. Préservé le rendu software sans GPU

### Le système de niveaux bitmap

L'architecture géniale de Notch : chaque niveau est une image PNG où chaque couleur de pixel définit un élément du jeu.

```
> Analyse comment Level.java charge les niveaux depuis des images.
> Implémente la même logique en TypeScript.
```

Claude a parfaitement reproduit le système :
- Blanc = mur
- Bleu = eau
- Magenta = échelle
- Rouge = ennemis (avec variations selon la nuance)
- Canal alpha = IDs pour lier switches et portes

### Les entités et le gameplay

```
> Analyse les ennemis dans @java-src/entities/
> et implémente-les en TypeScript avec le même comportement.
```

Claude a converti méthodiquement chaque ennemi :
- **Bat** : Mouvement aléatoire
- **Ogre** : Patrouille + attaque
- **Ghost** : Traverse les murs
- **Eye** : Attaque à distance
- Plus les variantes boss

### Intégration et debug

Quelques ajustements ont été nécessaires :
- Fine-tuning des collisions
- Adaptation de `Thread.sleep()` vers `requestAnimationFrame`
- Gestion des inputs (Java AWT → événements DOM)

### Déploiement

```
> Configure Vite pour builder le projet et GitHub Actions pour déployer.
```

Et voilà. Projet déployé, jouable dans le navigateur.

## Résultats

### Ce qui a été accompli en une soirée

| Élément | Résultat |
|---------|----------|
| Lignes de code converties | ~5 000 |
| Fichiers TypeScript créés | ~40 |
| Temps total | Une soirée |
| Jeu fonctionnel | Oui |

### La stack finale

- **TypeScript** : Typage strict
- **Canvas 2D API** : Rendu software, pas de WebGL
- **Vite** : Build ultra-rapide avec HMR
- **GitHub Actions** : Déploiement automatique

### Ce que Claude a fait

- Analyse complète du code Java original
- Conversion du moteur de raycasting
- Adaptation du système de niveaux bitmap
- Conversion de toutes les entités
- Configuration du build et déploiement
- Debug des problèmes rencontrés

### Ce que j'ai fait

- Direction du projet (quoi faire, dans quel ordre)
- Validation des choix de Claude
- Fine-tuning du gameplay
- Identification des bugs à corriger
- Revue finale du code

## Pourquoi ça a marché

### 1. Code source complet disponible

J'avais le code Java original. Claude pouvait analyser l'existant plutôt que deviner.

### 2. Références précises

`@java-src/Screen.java` plutôt que "le fichier de rendu" — Claude savait exactement quoi analyser.

### 3. Architecture fidèle

Plutôt que réinventer avec une lib 3D moderne, on a conservé l'approche originale : raycasting software sur Canvas 2D. Moins de décisions à prendre = conversion plus rapide.

### 4. Itérations rapides

Composant par composant, chaque étape validée avant la suivante.

## Ce que ça change

Sans Claude Code, ce projet aurait pris **plusieurs semaines** :
- Comprendre le moteur de raycasting : 2-3 jours
- Adapter les calculs Java → TypeScript : 1 semaine
- Débugger les différences de comportement : plusieurs jours

Avec Claude Code : **une soirée**.

Ce n'est pas que Claude code plus vite — c'est qu'il élimine le temps de "compréhension" et de "traduction mentale" entre les langages.

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

Claude Code est un outil puissant qui, bien utilisé, transforme la façon dont nous développons. Ce n'est pas un remplacement du développeur — c'est un **multiplicateur de productivité** qui peut comprimer des semaines de travail en quelques heures.

Maintenant, c'est à vous de jouer !

---

*Merci d'avoir suivi cette série "Maîtriser Claude Code en 20 jours". [Découvrez le projet Prelude Reborn](/fr/prelude-of-the-chambered-reborn/) — [Jouer maintenant](https://lingelo.github.io/prelude-of-the-chambered-reborn/)*
