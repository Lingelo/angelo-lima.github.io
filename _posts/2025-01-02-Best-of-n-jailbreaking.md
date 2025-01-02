---
layout: post
title: "Best-of-N Jailbreaking : Quand les IA trébuchent face à des attaques répétées 🎯🤖"
subtitle: "Comprendre comment cette méthode exploitant les variations de prompts met à mal nos intelligences artificielles"
cover-img: /assets/img/bon-llm.png
share-img: /assets/img/bon-llm.png
tags: [IA, llm]
author: Angelo Lima
---

# Best-of-N Jailbreaking : Quand les IA trébuchent sous une avalanche de prompts 🎯🤖

Les intelligences artificielles (IA) comme GPT-4 d’OpenAI ou Claude 3.5 d’Anthropic, qu’on admire tant pour leur puissance, ne sont pas aussi invincibles qu’on pourrait le croire. Une nouvelle méthode, appelée **Best-of-N Jailbreaking (BoN)**, vient de démontrer que même les IA les plus évoluées peuvent être contournées… avec un peu (beaucoup !) de persévérance et de créativité. Résultat ? Ces IA censées être sécurisées affichent des failles inquiétantes, même face à des attaques qui semblent anodines. 😨

Décryptons ensemble cette technique, ses implications, et pourquoi elle devrait sérieusement nous faire réfléchir sur l’avenir de la sécurité des IA. 🚀

---

## C'est quoi, le Best-of-N Jailbreaking ? 🤔

Le BoN Jailbreaking est une technique d'attaque dite **black-box**.  
En clair : même si tu n’as pas accès au "code source" ou aux mécanismes internes de l’IA, tu peux toujours la contourner en exploitant ses entrées (ce que tu lui demandes, aka les "prompts").  
Mais ce n’est pas aussi simple que de poser une question directe et inappropriée, du style :  
_"Comment fabriquer un truc interdit ?"_ (ça, les IA le bloquent plutôt facilement). 🙅‍♂️

Là où BoN est innovant, c’est dans l’approche par **force brute**.  
Concrètement, la méthode consiste à bombarder l’IA avec **de nombreuses variations d’un même prompt**, un peu comme si on essayait de forcer une serrure en testant clé après clé… jusqu’à ce qu’une d’entre elles fonctionne. 🗝️✨

### Quelques exemples de variations 🛠️ :

- **Changer les majuscules et les espaces** : `CoMmeNt FAbRIqueR un enGin intERDit`.
- **Modifier l’ordre ou la grammaire** : `Fabriquer interdit comment truc ?`.
- **Variations plus complexes** : Ajouter des synonymes, utiliser des erreurs de frappe ou des formulations ambiguës pour brouiller les pistes.

C’est un peu comme tester des milliers de combinaisons sur un cadenas complexe. Et avec assez de persévérance (et un script automatisé, soyons réalistes), une variation finit presque toujours par "ouvrir la porte". 🔓🤷‍♂️

---

## La technique en action : Des résultats effarants 😬

Les chercheurs à l’origine de BoN Jailbreaking ont testé cette méthode sur plusieurs modèles IA à la pointe de l’industrie, et les résultats sont… alarmants.

### Les chiffres parlent d'eux-mêmes 📊 :

- **89 % de taux de réussite** avec GPT-4 en envoyant 10 000 variations d’un même prompt.
- **78 %** de réussite sur Claude 3.5 Sonnet, produit par Anthropic.
- Même lorsqu’ils ont été testés contre des défenses avancées, comme les *circuit breakers* (mécanismes censés bloquer les réponses inappropriées), les modèles ont cédé dans la majorité des cas.

Et ce n’est pas non plus limité aux modèles textuels.  
BoN a également montré qu’il pouvait s’attaquer avec succès aux **IA multimodales**, qui travaillent avec des images, des vidéos ou de l’audio :

- **IA visuelles (Vision Language Models)** : En modifiant une image (luminosité, ordre des pixels, etc.), il est possible de tromper les filtres de façon similaire. 🖼️👀
- **IA audio (Audio Language Models)** : Ici, jouer sur des nuances dans le son (intonation, bruits de fond) permet de contourner les garde-fous. 🎶👂

Petit détail inquiétant : **plus on pousse les tests, plus le taux de réussite augmente**, grâce aux propriétés mathématiques (une progression exponentielle liée au nombre de prompts essayés).

---

## Pourquoi cela nous concerne beaucoup plus qu'on ne le croit 🌍

### 1. Des domaines critiques vulnérables 🏥💸🔒

Les IA ne sont pas uniquement utilisées pour écrire des articles ou répondre à des questions générales. Elles sont aussi présentes dans des secteurs sensibles :

- **La médecine** : pour analyser des données médicales et poser des diagnostics.
- **La cybersécurité** : pour repérer les comportements suspects et renforcer les défenses.
- **La finance** : pour détecter les fraudes et prédire les mouvements de marché.

Imagine qu’un pirate exploite BoN pour tromper une IA dans ces contextes…  
Les répercussions pourraient être désastreuses ! Cela pourrait aller de failles de sécurité massive à des décisions médicales erronées, voire à une manipulation directe des flux financiers. 😱

---

### 2. BoN expose les véritables limites des IA actuelles 📉

Les modèles d’IA (comme GPT-4) sont censés refuser des demandes douteuses ou contraires à l’éthique.  
Tu demandes quelque chose d’illégal ? L’IA te dira **non** (et poliment en plus).

Cependant, dès que tu masques subtilement ton intention, ses systèmes de protection (ou "garde-fous") s’effondrent. Cela révèle une **limite cruciale : les IA sont trop littérales**. Elles traitent les variations comme des entrées totalement distinctes, sans toujours saisir l’objectif caché de l’utilisateur.

Un gros souci pour anticiper des attaques sophistiquées. 😬

---

## Peut-on réellement protéger les modèles d’IA ? 🛡️

Pour le moment, des solutions sont envisagées, mais elles nécessitent du temps, de la recherche et une coordination entre les acteurs. Voici quelques pistes :

1. **Tester les IA en conditions réelles** 🧪  
   Les équipes doivent mener de véritables simulations d’attaques comme BoN sur leurs modèles. Cela permettrait de mieux comprendre les failles et de développer de nouvelles protections.

2. **Créer des filtres contextuels intelligents** 🧠  
   Les IA doivent être capables de détecter l’intention derrière un prompt, même si celui-ci a été légèrement modifié, au lieu de se laisser berner par des variations superficielles.

3. **Limiter les abus par un contrôle strict** ⏱️  
   Réduire le nombre de requêtes ou appliquer un temps de latence entre chaque tentative peut limiter les attaques à grande échelle.

4. **Mutualiser les connaissances entre acteurs du secteur** 🤝  
   Les systèmes propriétaires (comme GPT-4) et open source gagneraient à travailler ensemble pour renforcer leurs défenses, en partageant les résultats et les avancées techniques.

---

## À retenir 🚨

- Le **Best-of-N Jailbreaking** s’appuie sur des variations multiples pour tromper les IA.
- Avec assez de patience, il peut contourner presque tous les garde-fous, même sur des modèles top-niveaux comme GPT-4 ou Claude 3.5 Sonnet.
- Ce type d’attaque met en lumière des vulnérabilités inquiétantes qui, si elles sont exploitées à grande échelle, pourraient avoir des conséquences majeures.

---

## Et vous, qu’en pensez-vous ? 💬

Ces découvertes vous inquiètent-elles ou vous fascinent-elles ?  
Pensez-vous que les IA peuvent – et doivent – être mieux sécurisées ?  
Partagez votre avis, et continuons la discussion.

---

### 📚 Sources consultées :
- Article complet sur [Korben](https://korben.info/best-of-n-technique-piratage-llm-ia.html).
- Résumé de la recherche sur les mécanismes de BoN Jailbreaking.
