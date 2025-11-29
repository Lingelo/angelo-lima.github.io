---
layout: post
title: "Prelude of the Chambered Reborn : réécrire un classique en TypeScript"
subtitle: "Ressusciter le jeu de Notch pour le web moderne avec Vite et le software rendering"
description: "Comment j'ai porté le jeu culte de Markus Persson (Notch) de Java vers TypeScript/Vite pour le rendre jouable dans n'importe quel navigateur web, sans WebGL."
thumbnail-img: "/assets/img/prelude-of-chambered.webp"
cover-img: "/assets/img/prelude-of-chambered.webp"
tags: [Développement, Web, Tech]
author: "Angelo Lima"
lang: fr
ref: prelude-of-the-chambered-reborn
categories: fr
---

En 2011, **Markus Persson** (Notch), le créateur de Minecraft, participait à la **Ludum Dare 21** avec un petit jeu de dungeon-crawler rétro : **Prelude of the Chambered**. Un moteur de raycasting à la Wolfenstein 3D, des graphismes pixelisés, des puzzles et des boss. Un bijou technique compressé en 48 heures de game jam.

Le problème ? C'était du **Java**. Et en 2025, qui lance encore une JVM pour jouer à un petit jeu indé ?

## Le projet : porter Java vers TypeScript

**Prelude of the Chambered Reborn** est ma réécriture complète du code original en **TypeScript**, buildé avec **Vite**, jouable directement dans le navigateur. Pas de plugins, pas de téléchargement, juste une URL.

👉 **[Jouer maintenant](https://lingelo.github.io/prelude-of-the-chambered-reborn/)**

### Pourquoi ce projet ?

Trois raisons :

1. **Nostalgie** : J'ai découvert ce jeu à l'époque et j'ai toujours voulu le revisiter
2. **Défi technique** : Traduire du Java orienté objet vers du TypeScript moderne sans perdre l'essence du code original
3. **Accessibilité** : Rendre ce morceau d'histoire du jeu vidéo indé accessible à tous, sur n'importe quel appareil

## Architecture technique

### Software Rendering pur

Le choix le plus important : **pas de WebGL**. Le jeu utilise exclusivement le **Canvas 2D API** avec du raycasting software, exactement comme l'original.

```typescript
// Rendu pixel par pixel sur un Canvas
class Bitmap {
  pixels: number[];
  width: number;
  height: number;

  draw(bitmap: Bitmap, x: number, y: number): void {
    // Copie directe des pixels, pas de GPU
  }
}
```

Cette approche garantit une compatibilité maximale : le jeu tourne sur n'importe quel navigateur, même les plus anciens.

### Organisation modulaire

Le code est découpé en modules spécialisés :

```
src/
├── rendering/     # Bitmap, Bitmap3D, Screen, Sprite
├── entities/      # Player, EnemyEntity, bosses
├── levels/        # Level base, blocks, 6 niveaux
├── menus/         # TitleMenu, WinMenu, GameOverMenu
└── core/          # Game loop, input handling
```

Chaque module est indépendant et testable. La structure permet de comprendre et modifier facilement n'importe quelle partie du jeu.

### Stack moderne

- **TypeScript** : Typage strict pour éviter les bugs runtime
- **Vite** : Build ultra-rapide avec HMR pour le développement
- **GitHub Actions** : Déploiement automatique à chaque push
- **Canvas API** : Rendering software sans dépendance WebGL

### Le système de cartes bitmap : l'idée géniale de Notch

L'une des architectures les plus élégantes du jeu original, que j'ai conservée, c'est le **système de level design par bitmap**. Chaque niveau est littéralement une **image PNG** où chaque pixel définit un élément du jeu.

```typescript
// Chargement du niveau depuis une image
const response = await fetch(`res/level/${name}.png`);
const pixels = getPixelsFromImage(image);

// Chaque couleur = un type de bloc
switch (color) {
  case 0xffffff: return new SolidBlock();  // Blanc = mur
  case 0x0000ff: return new WaterBlock();  // Bleu = eau
  case 0xff66ff: return new LadderBlock(); // Magenta = échelle
  case 0xffff64: return new ChestBlock();  // Jaune = coffre
}
```

**Pourquoi c'est brillant ?**

1. **Level design visuel** : Ouvre Paint, dessine des pixels, tu as un niveau jouable
2. **Pas de format propriétaire** : Un PNG standard, modifiable par n'importe quel outil
3. **Version control friendly** : Les diffs Git montrent les changements visuellement
4. **Extensibilité triviale** : Ajouter un nouveau type de bloc = une nouvelle couleur

Le système va plus loin avec le **canal alpha** pour encoder les IDs de mécanismes :

```typescript
// L'alpha encode l'ID pour lier switches et portes
const id = 255 - ((pixels[x + y * w] >>> 24) & 0xff);
// Un switch avec alpha=250 déclenche la porte avec alpha=250
```

Et les entités ? Même principe :

| Couleur | Entité |
|---------|--------|
| `#ff0000` (rouge) | Bat |
| `#ff0001` | Bat Boss |
| `#ff0002` | Ogre |
| `#ff0003` | Ogre Boss |
| `#ffff00` (jaune vif) | Spawn du joueur |

Cette approche "data-driven" permet à n'importe qui de créer des niveaux sans toucher au code. Un game designer peut itérer en modifiant juste des images.

## Le jeu en détail

### Six niveaux interconnectés

1. **Prison** : Le point de départ, tutoriel implicite
2. **Dungeons** : Premiers ennemis et mécaniques
3. **Overworld** : Zone ouverte avec exploration
4. **Crypt** : Ambiance sombre, nouveaux défis
5. **Temple** : Puzzles plus complexes
6. **Ice Cave** : Le niveau final

### Système de combat

Des ennemis variés avec leurs patterns :
- **Bats** : Rapides mais fragiles
- **Ogres** : Lents mais puissants
- **Eyes** : Attaques à distance
- **Ghosts** : Traversent les murs

Plus des variantes boss pour chaque type.

### Collectibles et progression

- **Power Glove** : Casser des blocs
- **Pistol** : Combat à distance
- **Flippers** : Nager
- **Cutters** : Couper des obstacles
- **Skates** : Glisser sur la glace
- **Potions** : Soins

L'objectif : collecter les **quatre clés** pour s'échapper.

## Défis de la conversion

### Gestion des types

Java et TypeScript ont des systèmes de types différents. Les classes Java avec héritage complexe ont nécessité une refactorisation :

```typescript
// Pattern Entity avec composition
abstract class Entity {
  x: number;
  y: number;
  level: Level;

  abstract tick(): void;
  abstract render(screen: Screen): void;
}
```

### Boucle de jeu

Le passage du `Thread.sleep()` Java vers `requestAnimationFrame` a demandé de repenser le timing :

```typescript
class Game {
  private lastTime = 0;

  gameLoop(currentTime: number): void {
    const deltaTime = currentTime - this.lastTime;
    this.update(deltaTime);
    this.render();
    this.lastTime = currentTime;
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}
```

### Input handling

Du Java AWT vers les événements DOM natifs, avec support clavier et gamepad prévu.

## Contribuer

Le projet est **open source** et les contributions sont les bienvenues :

- 🐛 **Bug fixes** : Comportements différents de l'original
- 🎨 **Assets** : Optimisation des sprites
- 📱 **Mobile** : Support tactile
- 🎮 **Gamepad** : Support manette

```bash
# Installation locale
git clone https://github.com/Lingelo/prelude-of-the-chambered-reborn
cd prelude-of-the-chambered-reborn
npm install
npm run dev
```

Le serveur de développement démarre sur `http://localhost:5173`.

## Conclusion

**Prelude of the Chambered Reborn** n'est pas qu'un exercice de nostalgie. C'est une démonstration que les techniques de rendu "old school" restent pertinentes et que TypeScript peut gérer du code orienté performances.

Le projet prouve aussi qu'avec les outils modernes (Vite, GitHub Actions), déployer un jeu web devient trivial. Une simple commande `git push` et le jeu est en ligne.

Si tu as grandi avec les jeux de Notch ou si tu es curieux de voir comment fonctionne un moteur de raycasting, **[essaie le jeu](https://lingelo.github.io/prelude-of-the-chambered-reborn/)**. Et si tu trouves des bugs ou as des idées d'amélioration, le [repo GitHub](https://github.com/Lingelo/prelude-of-the-chambered-reborn) t'attend.

---

*Prelude of the Chambered original : Copyright (c) 2011 Mojang. Cette réécriture est un projet éducatif et de préservation.*
