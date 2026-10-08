---
title: "Kaizen : j'ai fini par écrire le SDLC que je cherchais pour Claude Code"
subtitle: "En avril, je me demandais si quelqu'un combinait spécification et Compound Engineering. Six mois plus tard, la réponse tient dans un plugin : une constitution vérifiable et des garde-fous écrits en code, du plan jusqu'à la production."
description: "Kaizen, plugin Claude Code open source : constitution, plan, revue multi-agents, déploiement surveillé et DORA, avec des hooks qui bloquent."
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
    a: "Kaizen est un plugin open source (licence MIT) pour Claude Code qui outille tout le cycle de développement logiciel : constitution du projet, brainstorm, plan, code test-first, revue multi-agents, pull request, déploiement surveillé, incidents et apprentissages. Il compte 23 skills, 21 agents en lecture seule et une CLI Node.js sans dépendance. La version 3.2.1 date du 7 octobre 2026."
  - q: "Quelle différence entre Kaizen et Compound Engineering ?"
    a: "Kaizen dérive du plugin Compound Engineering d'Every (MIT), dont il reprend la boucle, le schéma des learnings et les reviewers. Il y ajoute des garde-fous appliqués par des hooks (tests verts avant la fin du travail, push refusé sans revue réelle), la constitution de Spec Kit, le déploiement, le monitoring et les métriques DORA. En contrepartie, Kaizen ne fonctionne qu'avec Claude Code, alors que Compound Engineering cible 14 environnements d'agents."
  - q: "Comment installer Kaizen ?"
    a: "Dans Claude Code, ajouter la marketplace avec /plugin marketplace add Lingelo/dojo, puis installer le plugin avec /plugin install kaizen@dojo. Kaizen demande Node.js 18 ou plus et git, plus gh pour les pull requests. Dans un dépôt, on commence par /kaizen:setup puis /kaizen:constitution."
  - q: "Kaizen peut-il déployer en production tout seul ?"
    a: "Non. Kaizen déploie uniquement avec les commandes déclarées par l'équipe dans .kaizen/config.json. Pour un environnement protégé, l'utilisateur doit taper lui-même un code d'approbation de six caractères, valable 30 minutes, et un hook refuse la commande brute. Le mode autopilot s'arrête à une pull request prête et ne merge ni ne déploie jamais."
  - q: "Kaizen est-il adapté à un petit projet ?"
    a: "Oui, avec le profil lean, prévu pour un prototype ou un outil interne : moins de cérémonie, moins de reviewers. Le profil standard vise un produit en production et le profil full les domaines réglementés ou critiques. Le profil change la cérémonie, jamais les contrôles déterministes comme le scan de secrets ou la revue obligatoire avant push."
---
En avril, j'ai publié une [cartographie des philosophies de travail avec l'IA](/fr/sdd-compound-engineering-bmad-philosophies-ia/) : Spec-Driven Development, Compound Engineering, BMAD. Ma conclusion tenait en une question. Existe-t-il un outil qui combine nativement la rigueur d'une spécification et la boucle d'apprentissage du Compound Engineering ? Je n'en avais pas trouvé. J'avais écrit « c'est peut-être un espace à inventer ».

Je l'ai écrit. Il s'appelle **Kaizen**, c'est un plugin pour Claude Code, il est open source, et il vient de passer en version 3.2.1.

> **L'essentiel**
>
> - **Quoi** : Kaizen est un plugin Claude Code (licence MIT) qui outille le cycle de développement complet, de la constitution du projet jusqu'au déploiement surveillé et au post-mortem.
> - **Chiffres clés** : 23 skills (`/kaizen:plan`, `/kaizen:review`, `/kaizen:deploy`…), 21 agents en lecture seule, 6 hooks, une CLI Node.js sans aucune dépendance npm. Version 3.2.1 du 7 octobre 2026.
> - **D'où il vient** : la boucle et les learnings du [Compound Engineering](https://github.com/EveryInc/compound-engineering-plugin) d'Every, la constitution de [Spec Kit](https://github.com/github/spec-kit) (GitHub), les pratiques de livraison de DORA et du NIST SSDF.
> - **Ce qui le distingue** : les règles importantes sont appliquées par du code. Claude ne peut pas finir son travail avec des tests rouges, ni pousser une branche sans revue réellement exécutée, ni déployer en production sans un code que vous tapez.
> - **La limite** : il ne tourne que sur Claude Code, et il a un seul mainteneur.

## Pourquoi une instruction ne suffit pas

Si vous utilisez Claude Code depuis quelques mois, vous connaissez la scène. On écrit dans `CLAUDE.md` « lance les tests avant de terminer ». Claude les lance neuf fois sur dix. La dixième, la session est longue, le contexte a été compacté, et il annonce fièrement que « tout est en place » sur une suite rouge.

Kaizen part de là. Une règle que je veux voir respectée à chaque fois, je la mets dans un [hook](/fr/claude-code-hooks-fr/) : Claude Code exécute ce code à chaque appel d'outil, et le hook peut refuser l'action. Kaizen en déclare six :

- un hook `Stop` qui, pendant `/kaizen:work` et `/kaizen:autopilot`, relance tests, lint et typage avant de laisser Claude terminer son tour. Si c'est rouge, il bloque. Au bout de trois blocages il laisse passer, à condition que l'échec soit signalé.
- un hook `PreToolUse` sur `git commit` qui scanne ce qui part (une trentaine de types de clés et de jetons) et refuse aussi `--no-verify`.
- un hook `PreToolUse` sur `git push` qui refuse la branche tant que `/kaizen:review` n'a pas enregistré l'arbre poussé.
- deux hooks `PostToolUse` qui observent, dont un qui note chaque reviewer réellement lancé.
- un hook `UserPromptSubmit` qui reconnaît les codes de confirmation que vous tapez.

Le hook de push demande un mot de plus. L'enregistrement de la revue exige une preuve : le journal des agents reviewers effectivement exécutés, écrit par un autre hook. Claude ne peut donc pas déclarer une revue qui n'a pas eu lieu. S'il faut vraiment passer outre, seule une personne peut le faire, en tapant `kaizen waive <code>` dans la conversation, et la dérogation apparaît dans la description de la PR.

## La boucle, du principe à la production

![La boucle Kaizen : la constitution en bande, la ligne de construction de ideate à learn, la ligne d'exploitation du merge au post-mortem, et la mémoire du projet relue au cycle suivant](/assets/img/kaizen-loop.svg)

Le cycle se lit en deux lignes.

**Construire.** `/kaizen:brainstorm` fixe le *quoi* par un dialogue, une question à la fois, et numérote les exigences (R1, R2…) et les exemples d'acceptation (AE1…). Ce qui reste flou est marqué `[NEEDS CLARIFICATION]` au lieu d'être deviné. `/kaizen:plan` décide le *comment* : décisions justifiées, menaces STRIDE, plan de rollout et de rollback, unités regroupées en tranches de la taille d'une PR. Un `plan check` déterministe vérifie que chaque exigence est couverte par une unité, puis `/kaizen:doc-review` envoie de deux à six reviewers sur le plan avant la première ligne de code. `/kaizen:work` exécute unité par unité, test d'abord, un commit par unité.

**Exploiter.** `/kaizen:review` choisit ses reviewers selon le diff (sécurité, performance, migrations de données, contrat d'API…). `/kaizen:ship` ouvre une PR avec un guide de lecture pour le relecteur, `/kaizen:watch-pr` la mène jusqu'à « prête » en traitant les commentaires et la CI, sans jamais merger. Ensuite viennent `/kaizen:deploy` et `/kaizen:monitor`. Spec Kit, Kiro, BMAD et Compound Engineering s'arrêtent avant.

Et tout ce qui a été appris retourne dans le dépôt : `docs/learnings/`, `docs/adr/`, `docs/postmortems/`. Un agent, `learnings-researcher`, les relit à chaque plan, chaque revue et chaque session de debug. C'est l'idée centrale du Compound Engineering : chaque cycle rend le suivant plus facile.

## Une constitution qu'on peut vérifier

J'ai pris à Spec Kit l'idée d'une constitution, avec une contrainte en plus. Chaque article de `CONSTITUTION.md` porte une ligne **Check:** qui dit comment on vérifie qu'il est respecté. Un principe comme « le code doit être maintenable » est refusé par l'entretien de `/kaizen:constitution`. « Toute route publique a un test d'intégration » passe, parce qu'on sait le contrôler.

La constitution est ensuite appliquée trois fois : `plan check` vérifie que le plan évalue chaque article, `doc-review` la confronte au plan, `standards-reviewer` la confronte au diff. La hiérarchie est explicite : constitution, puis règles d'équipe partagées (les *packs*), puis learnings, puis préférences.

## Le déploiement, avec vos commandes

Kaizen ne connaît pas votre infrastructure et ne prétend pas la deviner. `deploy detect` reconnaît la plateforme (Vercel, Netlify, Fly.io, Heroku, Kamal, Helm, Terraform, une quinzaine en tout) et propose une configuration. C'est vous qui déclarez la commande de déploiement et celle de rollback dans `.kaizen/config.json`.

Pour un environnement protégé, `deploy request` génère un code de six caractères valable 30 minutes. Tant que vous ne tapez pas `kaizen deploy 7C1E0B` vous-même, rien ne part, et le hook refuse la commande brute si Claude essaie de la lancer directement. Après le déploiement, `monitor watch` surveille les signaux que le plan a déclarés, avec leurs seuils (un taux d'erreur au-dessus de 1 %, par exemple). Deux mesures rouges consécutives, et c'est l'incident puis le rollback.

Chaque déploiement, rollback, incident et résolution devient un tag git annoté et daté. `/kaizen:metrics` calcule les métriques DORA (fréquence, délai jusqu'à la production, taux d'échec, temps de restauration) à partir de ces tags. Et `/kaizen:postmortem` construit sa chronologie à partir des mêmes tags.

La version 3.2.1 corrige un défaut de ce mécanisme. Quand la commande qui mesure une métrique plante, c'est l'outil de mesure qui est cassé, et le service va peut-être très bien. Kaizen classe désormais ce signal comme **aveugle** : pas de rollback, pas d'incident, donc pas de faux échec dans les chiffres DORA. Un health-check HTTP injoignable, lui, reste une panne.

## Proportionner la cérémonie

Le reproche classique fait à ce genre d'outil, c'est la lourdeur. Pour un script interne, six reviewers sur un plan, c'est absurde. Kaizen a trois profils :

- `lean` pour un prototype ou un outil interne,
- `standard` pour un produit en production,
- `full` pour les domaines réglementés ou critiques.

Le profil règle la taille du plan, le nombre de reviewers et les modèles utilisés. Il ne touche jamais aux contrôles déterministes : le scan de secrets et la revue avant push restent actifs en `lean`. Chaque agent a aussi un rôle, et chaque rôle un modèle selon le profil : la recherche tourne sur un modèle économe, les reviewers critiques (sécurité, migrations, adversarial) sur le plus puissant.

Pour savoir si tout ça vaut son coût, `/kaizen:metrics` mesure aussi le prix de chaque cycle (durée, tokens, blocages du hook) et distingue les learnings **lus** de ceux réellement **appliqués** dans un commit. Un learning que personne ne cite jamais, c'est le signe d'une boucle qui ne se referme pas.

## Ce que Kaizen ne fait pas

La page de positionnement du dépôt liste quatre limites, et je préfère les répéter ici.

- **Ce n'est pas une méthode d'équipe.** Ni sprints, ni estimation, ni coordination entre équipes.
- **Ce n'est pas une plateforme d'observabilité.** Kaizen lit vos signaux et reçoit vos alertes (Alertmanager, PagerDuty, Datadog), il ne stocke rien et ne fait pas d'astreinte.
- **Les garde-fous se contournent.** Ils rattrapent les oublis d'un agent. Un agent qui voudrait passer outre y arriverait avec un script intermédiaire.
- **Claude Code uniquement.** Les garanties reposent sur ses hooks. Un autre agent recevrait les instructions des skills sans les contrôles.

Et il est jeune : la 1.0 date du 2 octobre 2026. Le Compound Engineering d'Every compte environ 25 000 étoiles, et tourne sur 14 environnements d'agents. Si votre équipe mélange Cursor, Codex et Claude Code, ou veut démarrer léger, c'est lui que je recommande. Kaizen s'adresse à une équipe déjà sur Claude Code qui veut des garanties jusqu'à la production.

## Comment c'est testé

Un outil qui prétend imposer des tests verts se devait d'en avoir. La suite (`node --test`) compte 118 tests : unitaires, CLI, hooks, flux de PR contre un faux `gh`, et des tests de contrat sur la documentation elle-même, qui échouent si une commande n'est pas documentée ou si un lien relatif est cassé. Elle tourne en CI sur Linux, macOS et Windows. À côté, 33 évaluations de bout en bout pilotent les skills dans une vraie session `claude -p`, du setup jusqu'au rollback et au post-mortem.

## L'essayer

```
/plugin marketplace add Lingelo/dojo
/plugin install kaizen@dojo
```

Il faut Node.js 18 ou plus, git, et `gh` pour les pull requests. Dans votre dépôt, `/kaizen:setup` détecte la stack et écrit la configuration, `/kaizen:setup audit` note la maturité SDLC du projet sur cinq axes et propose d'ajouter ce qui manque (CI, template de PR, Dependabot, CODEOWNERS). Ensuite `/kaizen:constitution`. Si vous êtes perdu à un moment, `/kaizen:help` regarde où en est le dépôt et vous dit quelle commande lancer.

Le code est sur [GitHub, dans le dépôt dojo](https://github.com/Lingelo/dojo/tree/main/plugins/kaizen), avec une documentation par skill et une [vidéo de présentation de 80 secondes](https://github.com/Lingelo/dojo/blob/main/media/kaizen/kaizen-presentation.mp4). Si vous débutez avec les plugins, mon article sur [les plugins et marketplaces Claude Code](/fr/claude-code-plugins-marketplace-fr/) explique le mécanisme.

*Kaizen* veut dire amélioration continue, et le nom engage. Si, après quelques semaines, `/kaizen:metrics` affiche zéro learning appliqué sur votre dépôt, le plugin ne tient pas sa promesse. Dans ce cas, ouvrez une issue : ça m'intéresse.
