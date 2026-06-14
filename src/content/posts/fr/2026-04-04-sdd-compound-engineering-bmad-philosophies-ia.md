---
title: "SDD, Compound Engineering, BMAD : Quelle philosophie de travail avec l'IA choisir ?"
subtitle: "Cartographie des approches structurées pour le développement assisté par IA — et pourquoi les combiner est probablement la bonne réponse"
date: 2026-04-04T12:00:00.000Z
lang: fr
translationKey: "ai-development-philosophies"
slug: "sdd-compound-engineering-bmad-philosophies-ia"
tags:
  - "IA"
  - "Développement"
  - "Claude Code"
author: "Angelo Lima"
thumbnail: "/assets/img/sdd-compound-engineering.webp"
shareImg: "/assets/img/sdd-compound-engineering.webp"
aliases:
  - "/2026-04-04-sdd-compound-engineering-bmad-philosophies-ia/"
---
Le vibe coding a démocratisé le développement assisté par IA. Mais en 2026, le constat est unanime : **ça ne scale pas**. Les projets sérieux exigent plus de structure. Trois familles d'approches ont émergé pour répondre à ce besoin — et chacune attaque le problème sous un angle différent.

Cet article propose une cartographie comparative de ces approches, avec des pistes concrètes pour choisir — ou combiner.

## Le problème : pourquoi le vibe coding atteint un mur

Le terme [vibe coding](https://en.wikipedia.org/wiki/Vibe_coding), popularisé par Andrej Karpathy début 2025, décrit un workflow où le développeur délègue la génération de code à l'IA via du langage naturel, sans structuration formelle des exigences.

Le problème est documenté et mesurable. Selon une [analyse d'Augment Code](https://www.augmentcode.com/tools/best-spec-driven-development-tools) portant sur des équipes utilisant le développement assisté par IA, le vibe coding atteint un mur documenté autour de trois mois, lorsque la dette technique s'accumule de manière significative. Une [étude de GitClear](https://qubittool.com/blog/spec-coding-complete-guide) analysant 211 millions de lignes de code révèle que depuis la généralisation des outils IA, le taux de copier-coller de code a augmenté de 48%, tandis que les activités de refactoring ont chuté de 60%.

Quand la fenêtre de contexte se remplit, l'IA perd le fil : oubli des exigences précédentes, régressions logiques, hallucinations sur l'architecture. Le code review devient impossible sans spécification de référence.

Trois familles de solutions ont émergé.

---

## 1. Spec-Driven Development (SDD) : cadrer l'input

### Le principe

Le SDD part d'un constat simple : **la qualité de l'output de l'IA dépend directement de la qualité de l'input**. Si vous cadrez suffisamment ce que vous demandez — via une spécification formelle — le résultat sera prédictible et traçable.

Selon [Wikipedia](https://en.wikipedia.org/wiki/Spec-driven_development), le SDD est une méthodologie où la spécification formelle sert de source de vérité principale, dont découlent l'implémentation, les tests et la documentation. Les racines remontent aux workflows NASA des années 1960 et aux premières méthodes formelles.

En pratique, le cycle de vie SDD suit quatre phases : **Spécifier → Planifier → Implémenter → Valider**.

### Les outils

| Outil | Éditeur | Philosophie | Adapté à |
|-------|---------|-------------|----------|
| **[OpenSpec](https://openspec.pro/)** | Fission-AI | Léger, 3 phases (propose → apply → archive), marqueurs delta | Brownfield, itération sur l'existant |
| **[Spec Kit](https://speckit.org/)** | GitHub | Strict, 4 phases séquentielles avec gates | Greenfield, projets structurés |
| **[Kiro](https://kiro.dev/)** | AWS | Puissant, intégré à leur IDE | Écosystème AWS, équipes verrouillées |
| **[AI DevKit](https://ai-devkit.com/)** | codeaholicguy | Scaffolding + mémoire persistante via MCP | Workflows multi-sessions |

**OpenSpec** se distingue par son mécanisme d'isolation des changements. Chaque feature vit dans un dossier `changes/` indépendant avec des marqueurs delta (`ADDED`/`MODIFIED`/`REMOVED`), fusionné dans les specs principales uniquement à l'archivage. C'est le plus adapté au brownfield — ce qui représente la majorité des projets réels.

**Spec Kit** (GitHub) est plus structuré et prescriptif. Le workflow `/specify` → `/plan` → `/tasks` → `/implement` impose des checkpoints explicites. Plus adapté au greenfield, mais l'overhead peut dépasser le bénéfice sur des petites features.

**AI DevKit** apporte une couche intéressante que les autres n'ont pas : un [système de mémoire persistante](https://ai-devkit.com/faq/ai-devkit-vs-spec-kit/) avec stockage et recherche via MCP ou CLI. Les deux ne sont d'ailleurs pas mutuellement exclusifs — AI DevKit peut fournir la fondation workflow tandis que Spec Kit apporte la discipline spec-first.

### Forces et limites du SDD

**Forces :**
- Traçabilité spec → code → tests
- Réduction mesurable des hallucinations (le scope contraint réduit l'ambiguïté)
- Compatible avec les pratiques de code review existantes
- Les specs sont versionnées, auditables

**Limites :**
- Le **spec drift** est inhérent — la dérive entre spec et implémentation est [difficile à éviter](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices) selon Thoughtworks
- Overhead d'écriture des specs sur les petites features
- **Ne capitalise pas sur les apprentissages** — les specs décrivent *ce qu'on veut*, pas *ce qu'on a appris en le construisant*

Ce dernier point est crucial. C'est la lacune structurelle du SDD pur.

---

## 2. Compound Engineering : capitaliser sur l'accumulation

### Le principe

Le [Compound Engineering](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents), développé par Every, Inc. (Dan Shipper & Kieran Klaassen, décembre 2025), part d'une observation inverse : dans le développement traditionnel, chaque feature rend la suivante plus difficile (dette technique, edge cases, interdépendances). Le compound engineering inverse cette dynamique — **chaque unité de travail doit rendre les suivantes plus faciles**.

Comment ? En créant une boucle d'apprentissage où chaque bug, test échoué ou insight de résolution est documenté et réutilisé par les agents et l'équipe future.

### La boucle

Le workflow est en quatre phases :

1. **Plan** — Comprendre le requirement, rechercher les approches, synthétiser un plan d'implémentation détaillé
2. **Work** — Les agents écrivent le code et les tests selon le plan
3. **Review** — Validation humaine du résultat
4. **Compound** — *(C'est ici que tout se joue)* — Documenter les learnings, les patterns découverts, les erreurs à ne pas reproduire

C'est la quatrième étape qui différencie le compound engineering. Sans elle, vous faites du développement traditionnel assisté par IA. Avec elle, votre base de connaissances s'enrichit à chaque cycle.

La méthodologie alloue [80% du temps développeur à la planification et la review](https://reading.torqsoftware.com/notes/software/ai-ml/agentic-coding/2026-01-19-compound-engineering-claude-code/), les 20% restants au work et au compound. Le développeur devient un orchestrateur et un arbitre de qualité.

### Battle-tested

Ce qui donne du poids à cette approche : Every gère cinq produits en interne, chacun principalement construit et maintenu par une seule personne, utilisés par des milliers d'utilisateurs quotidiennement. Le [plugin Claude Code](https://github.com/every-engineering/compound-engineering) a dépassé les 7 000 stars sur GitHub.

### Forces et limites

**Forces :**
- Répond frontalement à la dette technique
- La connaissance s'accumule dans le repo (pas dans la tête du dev)
- Adapté au solo dev ou petite équipe
- Compatibilité naturelle avec les `CLAUDE.md`, `learnings/`, ADR

**Limites :**
- Pas de processus formel de spécification en amont
- Dépend de la discipline du développeur pour la phase "Compound"
- Moins adapté aux environnements réglementés nécessitant un audit trail

---

## 3. BMAD : simuler une équipe agile complète

### Le principe

[BMAD](https://docs.bmad-method.org/) (Breakthrough Method for Agile AI-Driven Development) pousse le curseur encore plus loin que le SDD. Au lieu de structurer l'interaction avec un seul agent, BMAD orchestre **12+ agents spécialisés** qui simulent une équipe agile complète : Analyst, Product Manager, Architect, Scrum Master, Developer, QA, UX Designer…

Le concept fondateur est l'**Agent-as-Code** : chaque agent est défini dans un fichier Markdown versionné, avec ses responsabilités, contraintes et outputs attendus. Portable, réutilisable, diffable dans les PRs.

### Le workflow

Le pipeline BMAD suit la logique agile :

1. **Analyst** → Crée un brief projet
2. **PM** → Produit un PRD (Product Requirements Document) basé sur le brief
3. **Architect** → Conçoit l'architecture basée sur le PRD
4. **Scrum Master** → Génère des stories détaillées pour le développement
5. **Developer** → Implémente story par story
6. **QA** → Valide contre les critères d'acceptance

Des quality gates à chaque transition empêchent les problèmes de se cumuler d'un sprint à l'autre. Chaque agent produit un artefact vérifiable — pas juste une réponse dans le chat.

### Forces et limites

**Forces :**
- Couverture complète du SDLC
- Audit trail exhaustif (chaque artefact est versionné)
- Le "Party Mode" permet la collaboration entre agents dans une même session
- Extensible (Expansion Packs pour game dev, DevOps, etc.)

**Limites :**
- **Overhead considérable** — la cérémonie multi-agents est lourde pour un dev solo
- Plus adapté au greenfield complexe ou à l'entreprise
- La qualité dépend fortement du modèle sous-jacent (certains LLMs peinent à [parser correctement les fichiers Markdown structurés](https://medium.com/@visrow/what-is-bmad-method-a-simple-guide-to-the-future-of-ai-driven-development-412274f91419))
- **Même lacune que le SDD** : les artefacts sont des specs, pas des learnings

---

## Comparatif synthétique

| Critère | SDD (OpenSpec) | Compound Engineering | BMAD |
|---------|----------------|---------------------|------|
| **Problème résolu** | Cadrer l'input IA | Capitaliser les apprentissages | Simuler une équipe agile |
| **Philosophie** | Contrat / spécification | Boucle d'apprentissage | Orchestration multi-agents |
| **Overhead** | Faible à modéré | Faible | Élevé |
| **Adapté au solo dev** | ✅ | ✅✅ | ⚠️ |
| **Adapté à l'entreprise** | ✅ | ✅ | ✅✅ |
| **Brownfield** | ✅✅ (OpenSpec) | ✅✅ | ⚠️ |
| **Greenfield** | ✅✅ (Spec Kit) | ✅ | ✅✅ |
| **Capitalisation learnings** | ❌ | ✅✅ | ❌ |
| **Audit trail** | ✅✅ | ✅ | ✅✅✅ |
| **Gestion du spec drift** | ⚠️ Inhérent | ✅ (learnings capturent les écarts) | ⚠️ Inhérent |

---

## Ma thèse : ces approches se combinent

Voici le point que je ne vois abordé nulle part : **le SDD et le Compound Engineering ne répondent pas au même problème**. L'un mise sur l'input (cadrer ce qu'on demande à l'IA), l'autre sur l'accumulation (capitaliser ce qu'on apprend en le faisant). Les traiter comme des alternatives, c'est passer à côté de l'essentiel.

Le SDD seul ne répond pas à la problématique d'accumulation — qui à mon sens est un sujet qu'on se posait déjà bien avant l'IA, en documentant des Architecture Decision Records (ADR), des post-mortems, des runbooks.

Le Compound Engineering seul manque de la rigueur contractuelle du SDD pour les projets qui dépassent un certain seuil de complexité.

### Un workflow combiné possible

```
Spec (OpenSpec)          Compound (Every)
┌─────────────┐          ┌─────────────────┐
│ /opsx:propose │ ──────▶ │ Plan            │
│ proposal.md  │          │ (enrichi par     │
│ specs/       │          │  les learnings)  │
│ design.md    │          ├─────────────────┤
│ tasks.md     │          │ Work            │
└─────────────┘          │ (guidé par       │
                         │  les specs)      │
                         ├─────────────────┤
                         │ Review           │
                         ├─────────────────┤
                         │ Compound         │
                         │ → learnings.md   │
                         │ → CLAUDE.md      │
                         │ → patterns/      │
                         └────────┬────────┘
                                  │
                         ┌────────▼────────┐
                         │ /opsx:archive    │
                         │ specs → main     │
                         │ learnings        │
                         │ persistent       │
                         └─────────────────┘
```

L'idée :
1. **Spécifier** avec OpenSpec quand la complexité le justifie (nouvelle feature significative, changement architectural)
2. **Exécuter** dans la boucle compound (Plan → Work → Review → Compound)
3. **Capitaliser** les learnings dans des fichiers persistants (`CLAUDE.md`, `learnings/`, ADR) que les specs futures pourront référencer
4. **Archiver** la spec OpenSpec et les learnings ensemble

Les learnings enrichissent les futures specs. Les specs cadrent l'exécution. La boucle est vertueuse.

---

## Arbre de décision pratique

Pour choisir votre approche, partez de votre contexte :

**Vous êtes seul ou en binôme sur un produit existant ?**
→ Compound Engineering comme philosophie de base, OpenSpec quand un changement le justifie.

**Vous démarrez un projet greenfield structuré ?**
→ Spec Kit ou OpenSpec pour la phase initiale, puis transition vers la boucle compound une fois le socle posé.

**Vous êtes dans un contexte réglementé ou entreprise avec audit trail ?**
→ BMAD ou Spec Kit pour la couverture formelle, complété par les patterns compound pour la capitalisation.

**Vous expérimentez ou prototypez rapidement ?**
→ Le vibe coding reste pertinent pour les 48 premières heures. Passez au compound engineering dès que le prototype doit évoluer.

**Vous travaillez avec Claude Code ?**
→ Le compound engineering s'intègre naturellement via `CLAUDE.md` et les learnings. OpenSpec fonctionne via ses slash commands. Les deux cohabitent sans friction.

---

## Conclusion

2025 était l'année du vibe coding. 2026 est l'année où l'on structure. Mais structurer ne veut pas dire choisir un camp — SDD *ou* compound engineering. Ce sont deux réponses complémentaires à deux problèmes distincts.

Le SDD répond à : **"comment s'assurer que l'IA construit ce qu'on veut ?"**
Le compound engineering répond à : **"comment s'assurer que chaque cycle de travail enrichit le suivant ?"**

La question la plus intéressante est peut-être celle-ci : existe-t-il des solutions qui combinent nativement ces deux philosophies ? Je n'en ai pas trouvé à ce jour. C'est peut-être un espace à inventer.

---

*Cet article fait partie de mes réflexions sur le développement augmenté par l'IA. Pour aller plus loin sur les outils concrets, voir ma [série sur Claude Code](/fr/claude-code-installation-premiers-pas/) et mon article sur [l'entropie homme-machine](/fr/entropie-homme-machine/).*

### Sources et lectures complémentaires

- [OpenSpec — Documentation officielle](https://openspec.pro/)
- [Spec Kit — GitHub Blog](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
- [Compound Engineering — Every.to](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents)
- [BMAD-METHOD — Documentation](https://docs.bmad-method.org/)
- [AI DevKit — Site officiel](https://ai-devkit.com/)
- [Spec-Driven Development — Wikipedia](https://en.wikipedia.org/wiki/Spec-driven_development)
- [From Vibe Coding to SDD — AI Monks (Medium)](https://medium.com/aimonks/from-vibe-coding-to-spec-driven-development-where-does-compound-engineering-actually-fit-fcb27dbd2bf1)
- [SDD: When Architecture Becomes Executable — InfoQ](https://www.infoq.com/articles/spec-driven-development/)
- [Spec-driven development — Thoughtworks](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices)
- [Complete Guide to Spec Coding — QubitTool](https://qubittool.com/blog/spec-coding-complete-guide)
