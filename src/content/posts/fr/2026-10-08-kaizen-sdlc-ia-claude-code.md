---
title: "Kaizen : un SDLC complet pour Claude Code, du besoin à la production"
subtitle: "Un agent de code accélère tout, y compris les erreurs. Kaizen donne à Claude Code un cycle de développement entier, dont les règles critiques sont appliquées par du code."
description: "Kaizen est un SDLC pour Claude Code (plugin MIT) : besoin, plan, code, revue, déploiement, monitoring et apprentissage, avec des hooks qui bloquent."
date: 2026-10-08T00:00:00.000Z
lang: fr
translationKey: "kaizen-ai-sdlc-claude-code"
slug: "kaizen-sdlc-ia-claude-code"
tags:
  - "IA"
  - "Développement"
  - "Claude Code"
author: "Angelo Lima"
thumbnail: "/assets/img/kaizen-sdlc-claude-code.webp"
shareImg: "/assets/img/kaizen-sdlc-claude-code.webp"
aliases:
  - "/2026-10-08-kaizen-sdlc-ia-claude-code/"
faq:
  - q: "Qu'est-ce que Kaizen pour Claude Code ?"
    a: "Kaizen est un plugin open source (licence MIT) qui donne à Claude Code un SDLC complet : cadrage du besoin, plan, code test-first, revue multi-agents, pull request, déploiement surveillé, incidents et apprentissages. Il compte 23 skills, 21 agents en lecture seule et une CLI Node.js sans dépendance. La version 3.2.1 date du 7 octobre 2026."
  - q: "Qu'est-ce qu'un SDLC IA ?"
    a: "Un SDLC (Software Development Life Cycle) est l'ensemble des phases qui mènent un logiciel du besoin à la production : cadrage, conception, code, vérification, livraison, déploiement, exploitation et amélioration. Un SDLC IA outille ces phases pour un agent de code, avec des contrôles adaptés à un exécutant rapide qui peut oublier une consigne."
  - q: "Quelle différence entre Kaizen et Compound Engineering ?"
    a: "Kaizen dérive du plugin Compound Engineering d'Every (MIT), dont il reprend la boucle d'apprentissage. Il y ajoute des contrôles appliqués par des hooks, la constitution de Spec Kit, le déploiement, le monitoring et les métriques DORA. En contrepartie, Kaizen ne fonctionne qu'avec Claude Code, alors que Compound Engineering cible 14 environnements d'agents."
  - q: "Comment installer Kaizen ?"
    a: "Dans Claude Code, ajouter la marketplace avec /plugin marketplace add Lingelo/dojo, puis installer le plugin avec /plugin install kaizen@dojo. Kaizen demande Node.js 18 ou plus et git, plus gh pour les pull requests. Dans un dépôt, on commence par /kaizen:setup."
  - q: "Kaizen peut-il déployer en production tout seul ?"
    a: "Non. Kaizen déploie uniquement avec les commandes déclarées par l'équipe, et pour un environnement protégé l'utilisateur doit taper lui-même un code d'approbation valable 30 minutes. Le mode autopilot s'arrête à une pull request prête et ne merge ni ne déploie jamais."
---
Un agent de code écrit vite. Il lui arrive aussi d'oublier les tests ou de pousser une branche que personne n'a relue. Le rapport [DORA 2025](https://dora.dev/research/) l'a mesuré : l'IA augmente le débit des équipes, et leur instabilité avec, sauf chez celles qui gardent des principes clairs, des petits lots et du feedback réel.

**Kaizen** est le plugin que j'ai écrit pour outiller ces disciplines dans Claude Code, sur tout le SDLC, du besoin jusqu'à la production. Il répond aussi à la question que je laissais ouverte en avril dans [ma cartographie SDD, Compound Engineering et BMAD](/fr/sdd-compound-engineering-bmad-philosophies-ia/) : peut-on combiner la rigueur d'une spec et une boucle d'apprentissage ?

> **L'essentiel**
>
> - **Quoi** : Kaizen est un plugin Claude Code open source (MIT) qui couvre tout le cycle de développement : besoin, plan, code, revue, PR, déploiement, monitoring, post-mortem.
> - **Chiffres clés** : 23 skills, 21 agents en lecture seule, 6 hooks, une CLI Node.js sans dépendance npm. Version 3.2.1 du 7 octobre 2026.
> - **Ce qui le distingue** : les règles critiques sont des hooks. Claude ne peut pas finir sur des tests rouges, pousser sans revue réelle, ni déployer en production sans un code que vous tapez.
> - **D'où il vient** : la boucle du [Compound Engineering](https://github.com/EveryInc/compound-engineering-plugin) d'Every, la constitution de [Spec Kit](https://github.com/github/spec-kit), les pratiques de DORA et du NIST SSDF.
> - **La limite** : Claude Code uniquement, un seul mainteneur.

## Le SDLC, phase par phase

Chaque phase classique du cycle a sa commande. La dernière colonne indique si un contrôle en code l'impose.

| Phase | Commande `/kaizen:…` | Imposé par du code |
|---|---|---|
| Principes | `constitution` : 5 à 9 règles, chacune avec un contrôle | en partie |
| Besoin | `brainstorm` : exigences R1…, exemples d'acceptation AE1… | en partie |
| Conception | `plan` (menaces STRIDE, rollback, tranches de la taille d'une PR), puis `doc-review` | en partie : `plan check` vérifie que chaque exigence est couverte |
| Code | `work` (test d'abord), `debug` | oui : pas de fin de tour sur des tests rouges |
| Vérification | `review`, reviewers choisis selon le diff | oui : push refusé sans revue réelle |
| Livraison | `ship`, `watch-pr`, `release` | oui : taille de PR et SemVer vérifiées |
| Déploiement | `deploy` avec vos commandes, rollback | oui : code d'approbation pour la production |
| Exploitation | `monitor` : seuils du plan, incidents datés | en partie |
| Amélioration | `learn`, `postmortem`, `metrics` (DORA) | en partie |

Perdu en route ? `/kaizen:help` regarde où en est le dépôt et donne la prochaine commande.

## Les règles critiques sont des hooks

Écrire « lance les tests avant de terminer » dans `CLAUDE.md` marche neuf fois sur dix. La dixième, la session est longue, le contexte compacté, et Claude annonce que tout va bien sur une suite rouge. Kaizen place donc ces règles dans des [hooks](/fr/claude-code-hooks-fr/), que Claude Code exécute à chaque appel d'outil.

- **Avant un commit**, un scan refuse une trentaine de types de clés et de jetons.
- **Avant un push**, la branche est refusée tant qu'une revue n'a pas été enregistrée, avec la preuve que les agents reviewers ont vraiment tourné.
- **En fin de tour**, tests, lint et typage doivent passer.
- **Pour la production**, seul un code que vous tapez débloque le déploiement.

Ces contrôles rattrapent les oublis. Un agent décidé à les contourner y arriverait avec un script intermédiaire, et la documentation le dit.

## Une boucle qui apprend

[![La boucle Kaizen : la constitution encadre tout. Construire (brainstorm, plan, doc-review, work, review, ship). Exploiter (vous mergez, deploy, monitor, incident, rollback, post-mortem). La mémoire du projet est relue au cycle suivant](/assets/img/kaizen-boucle-fr.svg)](/assets/img/kaizen-boucle-fr.svg)

C'est l'apport du Compound Engineering. Ce qu'un cycle apprend (learnings, ADR, post-mortems) est écrit dans le dépôt, et un agent le relit avant chaque plan, revue ou debug. Les déploiements, rollbacks et incidents deviennent des tags git datés, d'où des métriques DORA calculées sur des événements réels. `/kaizen:metrics` distingue aussi les learnings lus de ceux appliqués dans un commit. Un learning que personne ne réutilise signale une boucle qui ne tourne pas.

La cérémonie se règle par profil : `lean` pour un prototype, `standard` pour un produit en production, `full` pour un domaine réglementé. Les contrôles en code restent actifs dans les trois.

## Les limites

Kaizen n'est ni une méthode d'équipe (pas de sprints, pas d'estimation) ni une plateforme d'observabilité : il lit vos signaux sans les stocker. Il ne tourne que sur Claude Code, et sa 1.0 date du 2 octobre 2026. Pour une équipe qui mélange Cursor, Codex et Claude Code, ou qui veut démarrer léger, je recommande plutôt Compound Engineering, plus mûr et disponible sur 14 environnements.

## L'essayer

```
/plugin marketplace add Lingelo/dojo
/plugin install kaizen@dojo
```

Il faut Node.js 18 ou plus, git, et `gh` pour les PR. Dans votre dépôt, lancez `/kaizen:setup audit` : il note la maturité SDLC du projet sur cinq axes et propose d'ajouter ce qui manque. Le code et la doc sont sur [GitHub](https://github.com/Lingelo/dojo/tree/main/plugins/kaizen). Pour le fonctionnement des plugins, voir [mon article sur les marketplaces Claude Code](/fr/claude-code-plugins-marketplace-fr/).
