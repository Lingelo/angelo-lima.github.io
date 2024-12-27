---
layout: post
title: "Conventional Commits : l’art de parler à ton code (et à tes collègues) 🧙‍♂️"
subtitle: "Rendre ton Git lisible et éviter de rendre ton équipe folle"
cover-img: /assets/img/conventional-commits.png
thumbnail-img: /assets/img/thumb-conventional-commits.png
share-img: /assets/img/conventional-commits.png
tags: [git, développeur]
author: Angelo Lima
---

## Implémente un code propre ? C'est bien. Mais explique ce que tu fais : c’est mieux ! 💡

Les commits Git, c'est un peu comme des messages qu’on laisse sur un tableau. Mais avouons-le, trop souvent, on les écrit à l’arrache : un petit **"fix"**, un vague **"update"**, voire parfois un **"WIP"** (Work In Progress)… Et là, catastrophe : deux semaines plus tard, impossible de se souvenir pourquoi on a modifié ce fichier et ce que ça faisait. (Pas toi ? Moi ça m’est arrivé. Plusieurs fois. 😅)

Alors, comment éviter cette débâcle ? C’est là que les **Conventional Commits** entrent en scène, tel un chevalier blanc du workflow Git. 🦸‍♂️✨

---

## C’est quoi les Conventional Commits, au juste ? 🤔

En gros, les **Conventional Commits**, c’est une façon **standardisée** d’écrire tes messages de commit pour que :
1. Ton historique Git soit lisible, même pour quelqu’un qui découvre le projet.
2. Tes commits soient suffisamment clairs pour qu’on sache en un coup d'œil ce qu’ils changent (sans devoir plonger dans le code).
3. Tu ne te prennes plus la tête avec la **syntaxe** (tout est balisé !).

### La recette magique 🍯 (sans spoiler, tu vas kiffer) :
Un message de commit selon **Conventional Commits**, ça ressemble à ça :  
```commandline
<type>(scope): <description>
[contenu optionnel]
[optional footer(s)]
```

> Oui, ça a l’air sérieux, mais en vrai, c’est hyper simple. Et surtout, ça te sauvera des maux de tête en équipe ou quand tu reprendras ton propre code après plusieurs mois.

---

## Les ingrédients de ton commit parfait 🛠️

### 1. **`<type>` (le type d'action que tu as fait)**
Ici, tu expliques l’intention de ton commit. Voici les types les plus courants et ce qu’ils signifient :

- **feat** : Tu viens d’ajouter une nouvelle fonctionnalité. 🎉 Genre : "feat(auth): ajout de l’authentification avec JWT".
- **fix** : Tu as corrigé un bug (et OK, tu peux enfin dormir tout(e) fier(e)). 🐞 Exemple : "fix(button): correction d’un crash au clic sur le bouton".
- **docs** : Mise à jour de la doc (parce que oui, même la doc mérite de l’amour). 📖
- **style** : Modifications de style ou de formatage (mais sans impacter le code qui tourne).
- **refactor** : Tu as réécrit une partie du code pour qu’il soit plus propre sans ajouter ni supprimer de fonctionnalités. Bravo, tu es un créatif organisé. 😉
- **test** : Tu as ajouté ou modifié des tests. (Testeurs dans l'âme, on vous aime ❤️).

---

### 2. **`(scope)` (le sujet concerné - optionnel mais pratique)**
C’est un peu comme mettre un tag sur ton message. Le **scope**, c’est la partie du projet affectée par ton commit (genre un certain module ou composant).  
Exemple : 
```commandline
feat(auth): ajout de la validation de jeton
```
Ici, on comprend que c'est lié à l'authentification. Magique, non ? ✨

---

### 3. **`<description>` (dis ce que tu as fait, simplement)**
C'est le cœur de ton commit. Pas besoin d’être Shakespeare, mais décris ce que tu as modifié avec précision. Évite les trucs du genre :
```commandline
"update file"
"fix stuff"
```
A la place soit clair : 
```commandline
fix(modal): correction de l’affichage en mobile
feat(api): ajout d’une route GET pour récupérer les utilisateurs actifs
```
---
### 4. Le bonus : des détails supplémentaires 📜
Parfois, un commit mérite une explication plus longue , soit pour fournir du contexte, soit pour intégrer une URL vers un ticket ou un bug. Exemple :

```commandline
fix(auth): résolution d’un bug sur la validation des mots de passe

Les mots de passe contenant des caractères spéciaux causaient une erreur 500.
Résolution en passant à une gestion Unicode complète.

Ticket : https://jira.monsite.com/project-123
```
---
## **Pourquoi t’y mettre dès maintenant ? 🚀**

Parce que **STANDARDISER**, c’est respecter ton **toi** du futur, mais aussi ton équipe (et éviter de recevoir des DM pas sympas genre *“C'est quoi ce commit ‘Bug fix 17’ ?”*).

Les **Conventional Commits** :
- 🗂️ **Permettent de garder un historique propre** : Plus besoin de parcourir chaque ligne pour comprendre ce qu’un certain commit a fait.
- 💡 **Te facilitent la vie en équipe** : Instaurer des règles communes et claires, c’est la paix au bout du tunnel.
- ⚙️ **Préparent ton projet pour des outils automatisés** comme **semantic-release** : ce petit bijou peut générer automatiquement des numéros de version grâce à tes commits (par exemple : `1.0.0`, `1.1.0`, etc.).

---

## **Conclusion : bien plus qu’une règle, c’est une conversation avec toi même et tes collègues 🧑‍💻️✨**

Tu l’auras compris, les **Conventional Commits**, ce n’est pas juste une question de suivre une règle parmi tant d’autres. C’est une façon :
- 🚀 **D’améliorer ta communication en tant que développeur** : Un bon message de commit, c’est comme parler à ton futur toi (ou à tes collègues) : clair, utile et transparent.
- 🛠️ **De poser des bases solides pour des projets durables** : On n’écrit pas du code comme des poèmes, mais il faut quand même que ça reste compréhensible au fil du temps et des versions.
- 🤖 **De préparer ton workflow à l’avenir** : Automatisation des numéros de version, génération de changelogs, outils de CI/CD... Cette convention est la passerelle parfaite vers un code moderne et outillé.

Les **Conventional Commits**, c’est un petit effort aujourd’hui pour des **projets plus fluides, organisés et collaboratifs demain**. Tu ne fais pas ça juste pour toi, mais pour toute ton équipe, ton projet open source préféré, et peut-être même ce fameux repo que tu reprendras dans 6 mois et où tu te diras enfin : *Merci, moi du passé !* 💭

Alors, prêt(e) à adopter cette convention ? 😎

**Prochain objectif** : ajouter un **commit légendaire** dans ton histoire Git et montrer à tout le monde que tu maîtrises la magie du workflow professionnel. 🧙‍♂️💻

Allez, courage : le bouton "commit" n’attend que toi. 😉 
