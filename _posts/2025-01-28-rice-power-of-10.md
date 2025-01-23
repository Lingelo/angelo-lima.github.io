---
layout: post
title: "Comprendre le théorème de Rice et le Power of 10 🚀"
subtitle: "Entre limitations théoriques et rigueur pratique, plongeons dans l'univers du logiciel fiable"
cover-img: /assets/img/rice-nasa.png
share-img: /assets/img/rice-nasa.png
tags: [Théorie, Calculabilité, NASA, Qualité Logicielle, Tech]
author: "Angelo LIMA"
---

# Comprendre le théorème de Rice et le Power of 10 : la NASA et la quête du logiciel sans bug 🛰️

## Introduction : Les défis d’un code impeccable
On le sait tous, l’idée d’un **programme sans bug** relève, dans bien des cas, d’une quête utopique. Entre les contraintes de temps, la complexité croissante des logiciels, et les limites humaines, chaque développeur doit jongler avec des compromis pour créer un code fonctionnel. En revanche, quand on parle d’enjeux critiques comme ceux des systèmes embarqués de la NASA où une erreur peut coûter une sonde de plusieurs milliards de dollars ou des vies humaines, les standards changent complètement.

Dans cet article, nous allons explorer deux concepts liés à cette quête de perfection logicielle. D’un côté, le **théorème de Rice**, qui expose une vérité fondamentale (et un peu déprimante) sur ce qu’il est possible d’automatiser en vérification logicielle. De l’autre, le fameux **Power of 10 rules** de la NASA, une méthodologie pragmatique qui vise à améliorer la qualité du code en suivant des règles strictes.

Prêts ? Plongeons dans ces idées qui allient théories informatiques profondes et schémas pratiques.

---

## Le théorème de Rice : Un rappel (douloureux) des limites théoriques 📜

### Le théorème expliqué simplement

<div align="center">
  <img src="/assets/img/henry-rice.png" alt="Henry Gordon Rice" />
</div>

Le **théorème de Rice**, énoncé par Henry Rice en 1953, est l’un de ces piliers de la théorie de la calculabilité. Il affirme grosso modo :

> **Pour toute propriété non triviale d’un langage, il est indécidable de déterminer si un programme possède cette propriété.**

OK, dit comme ça, ça reste très abstrait. Expliquons-le avec un exemple concret :

Disons que tu veux écrire un outil qui vérifie quelque chose sur un programme informatique, comme « ce programme s’arrête toujours » ou « ce programme fera toujours exactement ce que je veux, ni plus ni moins ». Le théorème de Rice nous dit que dès que cette propriété dépend de l’exécution du code (ce qui est souvent le cas), il est **impossible** de garantir, de manière automatique et générale, que ton outil va pouvoir donner la bonne réponse dans tous les cas.

Un exemple célèbre ? Le problème de l’arrêt (*Halting Problem*), qui nous dit qu’on ne peut pas écrire un programme capable de déterminer de façon générale si un autre programme va terminer ou non (sans simplement tenter de l’exécuter jusqu’au bout).

### Pourquoi c’est important pour les développeurs
Cela signifie qu’il existe une limite fondamentale à ce que les outils d’analyse statique, les vérificateurs automatiques et même les tests logiciels peuvent accomplir. En bref, **aucun système ne peut garantir à 100 % qu’un programme complexe est exempt de bugs**.

Ça peut sembler démotivant, mais c’est en fait un rappel crucial que la perfection logicielle ne peut pas reposer uniquement sur des outils automatiques. Elle doit combiner des méthodologies (comme le Power of 10) et de l’intuition humaine.

**Sources recommandées pour creuser** :
- [Halting Problem sur Wikipedia](https://fr.wikipedia.org/wiki/Probl%C3%A8me_de_l%27arr%C3%AAt)
- [Rice's Theorem en détails sur Brilliant.org](https://brilliant.org/wiki/rices-theorem/)

---

## Les règles Power of 10 de la NASA : Des principes pour des logiciels critiques 🚀

### Pourquoi la NASA a besoin de méthodologies rigoureuses

<div align="center">
  <img src="/assets/img/nasa.png" alt="nasa" />
</div>

Quand tu envoies un robot sur Mars, tu n’as pas le luxe d’utiliser la méthode du « lance et corrige avec des mises à jour ». Les logiciels de la NASA doivent atteindre des niveaux de fiabilité exceptionnels parce qu’un bug peut entraîner des échecs catastrophiques. Dans les années 80, après des milliards de dollars investis dans des systèmes critiques, il était clair qu’une approche rigoureuse était nécessaire pour réduire **le risque de bugs au strict minimum**.

C’est là qu’est né le **Power of 10**, un ensemble de règles pragmatiques pour écrire du code ultra-fiable. Ces règles se concentrent sur la simplicité, la clarté et la réduction des complexités inutiles. Voici les principes clés (simplifiés pour nos besoins) :

---

### Les règles Power of 10 🛠️

1. **Pas de boucles infinies/mal terminées.**  
   Chaque boucle doit avoir une condition explicite et être garantie de terminer. Ça semble évident, mais combien de temps passes-tu à débuguer des « off-by-one errors » sur des boucles mal maîtrisées ?

2. **Limiter la taille des fonctions.**  
   Une seule fonction ne doit jamais dépasser **60 lignes de code**, car un code trop long devient rapidement ingérable.

3. **Limiter la profondeur de l’imbrication.**  
   Pas plus de deux ou trois niveaux de *if* imbriqués. Au-delà, ton code devient un enfer de lecture et de maintenance.

4. **Pas de récursivité non justifiée.**  
   Oui, les fonctions récursives sont élégantes, mais elles peuvent être risquées, notamment dans des systèmes embarqués où chaque octet de mémoire compte.

5. **Pas d’allocation dynamique après l’initialisation.**  
   La mémoire doit être allouée de manière statique pour réduire les bugs de type "memory leak" ou fragmentation. Adieu les `malloc` en plein milieu du code embarqué.

6. **Limiter l’utilisation des pointeurs.**  
   Les pointeurs sont une source infinie de problèmes si mal gérés. Moins on en a, mieux c’est.

7. **Éviter les structures de données complexes.**  
   Pas de structures imbriquées comme des poupées russes. Keep it simple.

8. **Faire des vérifications constantes.**  
   Toute opération douteuse (accès à une variable, divisibilité, etc.) doit être partout vérifiée.

9. **Toujours coupler le code avec des tests unitaires.**  
   Chaque brique doit être testée isolément, régulièrement et rigoureusement.

10. **Valider chaque interaction avec l’environnement.**  
    Les entrées/sorties ne doivent jamais être supposées correctes par défaut. Déconnecter une sonde ou planter un robot à cause d’une mauvaise entrée reste une des erreurs les plus fréquentes.

---

### Pourquoi ça marche ?
Le Power of 10 repose sur une philosophie simple : **Réduire la complexité au strict minimum** pour minimiser les possibilités de bugs. Ces règles paraissent peut-être extrêmes, mais elles garantissent la lisibilité, favorisent la détection des erreurs en phase de revue et réduisent les risques imprévus au moment de l’exécution.

**Sources recommandées** :
- [“The Power of 10 – Rules for Developing Safety-Critical Code”](https://shemesh.larc.nasa.gov/people/hill/pow10.pdf)
- [NASA Coding Standards](https://ntrs.nasa.gov/citations/20080039948)
- [Video "Comment la NASA code sans bug" de V2F](https://www.youtube.com/watch?v=wTZcGN4N334)

---

## Alors, parfait ou humain ?

La combinaison du théorème de Rice et des Power of 10 montre bien comment théorie et pratique s’entremêlent dans le développement logiciel. Oui, les limites théoriques signifient qu’il est impossible de développer des programmes parfaitement sûrs par automatisation pure. Mais des méthodologies comme les règles de la NASA sont là pour nous rappeler que, avec pragmatisme et discipline, on peut tout de même s’en approcher.

Alors, la question est : Comment intégrez-vous la **simplicité** et la **rigueur** dans votre propre manière d’écrire du code ?

Partagez vos méthodes ou vos inspirations dans les commentaires ! 🚀
