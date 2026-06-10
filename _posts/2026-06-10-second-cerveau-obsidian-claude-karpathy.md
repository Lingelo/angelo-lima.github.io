---
layout: post
title: "Le second cerveau selon Karpathy : un wiki que l'IA écrit à votre place"
subtitle: "Comment transformer Obsidian + Claude en base de connaissances qui se compile, se relie et se corrige toute seule — sans RAG, sans base vectorielle"
description: "Le concept de LLM wiki d'Andrej Karpathy expliqué et mis en pratique avec Obsidian et Claude Code. Compilation plutôt que résumé, zéro RAG, et une solution open source concrète pour bâtir votre second cerveau."
thumbnail-img: "/assets/img/second-cerveau-obsidian.webp"
share-img: "/assets/img/second-cerveau-obsidian.webp"
tags: [IA, Claude Code, Développement]
author: "Angelo Lima"
lang: fr
ref: second-brain-karpathy
categories: fr
---

On a tous une version dégradée du même rêve : un endroit unique où vivrait tout ce qu'on a lu, écouté, appris. Un cerveau de secours. En pratique, on accumule des notes Notion abandonnées, des marque-pages qu'on ne rouvre jamais, des PDF surlignés qui dorment dans un dossier `Téléchargements`. Le problème n'a jamais été de **collecter** l'information. C'est de l'**organiser** — et c'est précisément là que l'effort humain s'effondre.

Début 2026, Andrej Karpathy — cofondateur d'OpenAI, ex-directeur IA de Tesla — a partagé sur X une idée simple et redoutablement efficace pour résoudre ce problème : et si on arrêtait d'écrire la base de connaissances soi-même, pour la laisser **entièrement** à un LLM ?

C'est ce qu'il appelle le **LLM wiki**, ou *second cerveau*. Cet article décortique le concept, explique pourquoi il enterre l'approche RAG pour un usage personnel, et le met en pratique avec une solution open source qui marie Obsidian et Claude Code.

---

## L'idée de Karpathy : compiler, pas résumer

La phrase qui résume tout, c'est la sienne :

> *"You rarely ever write or edit the wiki manually, it's the domain of the LLM."*
> *(Vous n'écrivez ou ne modifiez quasiment jamais le wiki à la main, c'est le domaine du LLM.)*

Le retournement est total. Dans la vision classique du « second cerveau » — celle popularisée par Tiago Forte et sa méthode [PARA](https://fortelabs.com/blog/para/) — **c'est vous** qui prenez les notes, qui les rangez, qui les reliez. L'IA n'intervient qu'à la fin, pour répondre à des questions sur un corpus que vous avez patiemment construit.

Karpathy inverse la chaîne. Vous ne faites plus qu'une chose : **collecter de la matière brute**. Des articles, des papiers de recherche, des notes de lecture, des transcriptions de podcasts, des bouts de conversation — tout ce qui vous traverse. Vous jetez ça dans un dossier, et vous dites au LLM : *« compile »*.

### Compilation ≠ résumé

C'est la distinction centrale, et elle est plus subtile qu'elle n'en a l'air.

Un **résumé** compresse : il jette du détail pour produire une version plus courte. Vous perdez de l'information à chaque passage.

Une **compilation**, au sens de Karpathy, *restructure* sans appauvrir. Le LLM lit chaque source, en extrait les concepts, les personnes, les idées clés, puis les réécrit dans un format homogène — des articles façon encyclopédie, reliés entre eux par des backlinks, dédupliqués, et débarrassés des contradictions entre sources. Le détail est préservé : c'est la **forme** qui devient cohérente.

La métaphore du compilateur est volontaire. De même qu'un compilateur transforme du code source hétérogène en un binaire structuré et exécutable, le LLM transforme un fouillis de sources en une ontologie navigable.

### Ce que ça donne à l'échelle

Karpathy rapporte un chiffre qui force le respect : sur un seul de ses sujets de recherche, son wiki avait atteint **~100 articles et 400 000 mots** — plus long que la plupart des thèses de doctorat — **sans qu'il en écrive une seule ligne directement**. Le LLM rédige, relie, catégorise, et vérifie la cohérence. L'humain ne fait qu'alimenter et interroger.

Sa propre conclusion, lâchée sur X : *« I think there is room here for an incredible new product. »*

---

## Pourquoi ça enterre le RAG (pour un usage personnel)

Voilà le point qui fait tiquer tous ceux qui ont déjà bricolé un assistant documentaire. Depuis trois ans, la réponse par défaut à « je veux interroger mes documents » s'appelle **RAG** (*Retrieval-Augmented Generation*) : on découpe les documents en morceaux, on les transforme en vecteurs, on les stocke dans une base vectorielle, et à chaque question on va rechercher les passages les plus proches pour les injecter dans le contexte.

Karpathy propose de **tout jeter**. Pas de base vectorielle. Pas de pipeline d'embeddings. Pas d'infrastructure de retrieval. Juste des fichiers markdown, un LLM à grande fenêtre de contexte, et c'est tout.

L'argument est solide une fois qu'on le pose à plat :

| | RAG classique | LLM wiki (Karpathy) |
|---|---|---|
| **Donnée stockée** | Chunks bruts + métadonnées + vecteurs | Markdown condensé et réécrit |
| **Quand le travail est fait** | À **chaque** requête (recherche vectorielle) | **Une fois**, à la compilation |
| **Déduplication / contradictions** | Jamais résolues, ré-injectées à chaque fois | Résolues à l'écriture du wiki |
| **Infrastructure** | Base vectorielle, embeddings, retriever | Un dossier de fichiers `.md` |
| **Lisible par un humain** | Non (vecteurs opaques) | Oui (c'est juste du texte) |
| **État entre sessions** | Stateless | Persistant et versionnable (git) |

L'intuition profonde : le RAG fait le **même travail de tri à chaque question**, sur de la donnée brute jamais nettoyée. Le LLM wiki fait ce travail **une seule fois**, au moment de la compilation, et produit un artefact propre, condensé, qui tient dans la fenêtre de contexte des modèles longs modernes. Pour une base de connaissances à l'échelle personnelle — quelques centaines d'articles — le RAG devient une usine à gaz dont on n'a tout simplement plus besoin.

> ⚠️ **Nuance importante** : ce raisonnement vaut pour un usage *personnel*. À l'échelle entreprise — des millions de documents, du contrôle d'accès granulaire, des contraintes de fraîcheur en temps réel — le RAG garde toute sa pertinence. Le LLM wiki n'est pas une religion, c'est le bon outil pour la bonne échelle.

---

## De l'idée au système : Obsidian + Claude Code

L'idée de Karpathy est un *pattern*, pas un produit. Lui-même reconnaît tourner avec des *« scripts Python un peu hacky »* pour orchestrer le LLM, plus Obsidian comme couche de visualisation. Charge à chacun de l'implémenter.

C'est là qu'intervient la solution que j'ai explorée : le dépôt open source [**Un-second-cerveau-Obsidian-Claude**](https://github.com/BenBktech/Un-second-cerveau-Obsidian-Claude) de Ben BK. Il prend le concept brut de Karpathy et le transforme en quelque chose d'immédiatement utilisable, en s'appuyant sur **Claude Code** comme moteur d'orchestration plutôt que sur des scripts maison.

### L'architecture en trois couches

Tout le système repose sur une séparation nette entre la matière brute, le savoir compilé et les règles du jeu :

```
mon-second-cerveau/
├── raw/              ← vous déposez ici vos sources brutes
├── wiki/             ← le LLM écrit ici les articles compilés
│   └── index.md      ← sommaire auto-généré de tout le wiki
├── log.md            ← historique des opérations
├── CLAUDE.md         ← le "schéma" : règles d'organisation du cerveau
└── .claude/
    └── commands/     ← les slash commands personnalisées
```

- Le dossier **`raw/`** est votre boîte de dépôt. Vous y jetez tout, sans organisation.
- Le dossier **`wiki/`** est la sortie du LLM : des articles encyclopédiques reliés entre eux, plus un `index.md` qui résume l'ensemble d'un coup d'œil.
- Le fichier **`CLAUDE.md`** joue le rôle de schéma. Il décrit comment le cerveau doit être structuré — conventions de nommage, format des pages, règles de liaison. C'est le contrat que l'agent suit.
- **Obsidian** vient se brancher par-dessus le dossier `wiki/` : il transforme les backlinks markdown en un graphe de connaissances navigable visuellement.

### Les quatre commandes qui font tourner le cerveau

Tout le workflow tient dans quatre slash commands à lancer depuis Claude Code :

| Commande | Rôle |
|---|---|
| **`/ingest`** | Lit les sources du dossier `raw/` et les **compile** dans le wiki : crée ou enrichit les articles, tisse les backlinks, met à jour l'index. C'est le cœur du système. |
| **`/lint`** | Passe le wiki au peigne fin : détecte les **contradictions** entre articles, les **pages orphelines**, les concepts cités sans page dédiée, les entrées d'index périmées. Le contrôle santé. |
| **`/query`** | Interroge le wiki en langage naturel pour répondre à une question, en s'appuyant sur le savoir déjà compilé. |
| **`/save`** | Archive une réponse intéressante comme nouvelle page synthétisée du wiki. La connaissance produite à la volée est capitalisée. |

Cette séparation `/ingest` / `/lint` est élégante : l'ingestion fait grossir le cerveau, le linting le maintient en bonne santé. Les deux tournent indépendamment. Karpathy lui-même insiste sur cette passe de validation périodique comme un *« health check »* — sans elle, un wiki qui grossit finit par accumuler des incohérences silencieuses.

---

## Le workflow, en pratique

Une session type ressemble à ça :

1. **Vous accumulez.** Pendant la semaine, vous balancez dans `raw/` tout ce qui vous intéresse : un article copié-collé, une transcription YouTube, vos notes de réunion, un thread X. Zéro effort d'organisation.

2. **Vous compilez.** Vous lancez `/ingest`. L'agent lit tout, identifie les concepts récurrents, crée les pages manquantes, enrichit les pages existantes, et relie le tout. Votre fouillis devient un wiki structuré.

3. **Vous nettoyez.** De temps en temps, `/lint`. L'agent vous signale que votre note sur « les transformers » contredit votre note sur « l'attention », ou que vous mentionnez « RLHF » dans dix articles sans jamais lui avoir dédié une page. Vous arbitrez.

4. **Vous interrogez.** Quand vous avez besoin de quelque chose, `/query`. Vous ne fouillez pas dans vos fichiers — vous demandez. Et la réponse s'appuie sur du savoir déjà digéré, pas sur du brut.

5. **Vous capitalisez.** Une réponse particulièrement bonne ? `/save`. Elle devient une page du wiki. Le cerveau apprend de ses propres réponses.

Le tout est versionnable avec git. Votre second cerveau devient un dépôt : auditable, diffable, restaurable. Loin du trou noir qu'est un espace Notion.

---

## Forces, limites et angle mort

Soyons lucides — aucune approche n'est magique.

**Ce qui est vraiment fort :**
- **L'effort d'organisation tombe à zéro.** C'est *le* point. Le frein historique de tout système de notes — le rangement — disparaît.
- **Format ouvert, zéro lock-in.** Du markdown, des dossiers, du git. Pas de SaaS qui ferme boutique avec vos données dedans.
- **Lisible et auditable.** Contrairement à une base vectorielle, vous pouvez *lire* votre cerveau. Vous voyez ce que le LLM a écrit, et le corriger si besoin.
- **Le coût computationnel est payé une fois**, à la compilation, pas à chaque requête.

**Les limites, qu'il faut regarder en face :**
- **Vous déléguez la rédaction à un LLM.** Qui dit LLM dit risque d'hallucination ou de reformulation maladroite. La passe `/lint` aide, mais ne remplace pas une relecture critique. (J'en ai parlé plus en détail dans mon article sur [les hallucinations des LLM](/fr/hallucinations-llm-devoxx-2026/).)
- **Ça tient grâce à la fenêtre de contexte.** Le modèle élégant « tout le wiki tient dans le contexte » s'effrite quand le cerveau dépasse une certaine taille. À très grande échelle, on revient vers des stratégies de retrieval — et le RAG reprend du sens.
- **La discipline reste nécessaire.** Pas pour organiser, mais pour *alimenter* régulièrement et *linter*. Un cerveau qu'on ne nourrit plus reste un cerveau mort.
- **Le reality check entreprise.** Contrôle d'accès, conformité, fraîcheur temps réel, volumétrie massive : à ce niveau, le LLM wiki seul ne suffit pas. C'est un outil d'usage personnel et d'équipe restreinte, pas une plateforme de knowledge management d'entreprise.

---

## Mon avis : c'est du compound engineering appliqué au savoir

Ce qui me frappe, c'est que ce pattern n'est pas isolé. C'est la même idée que celle que je creusais dans mon article sur [les philosophies de travail avec l'IA](/fr/sdd-compound-engineering-bmad-philosophies-ia/) : **capitaliser sur l'accumulation**.

Le *compound engineering* dit que chaque cycle de développement doit enrichir le suivant, via une boucle d'apprentissage documentée. Le LLM wiki de Karpathy dit exactement la même chose, mais pour la connaissance personnelle : chaque source ingérée, chaque réponse sauvegardée rend le cerveau plus dense, et donc la prochaine requête plus riche. C'est une boucle vertueuse où l'IA ne fait pas que *consommer* votre savoir — elle le *construit*.

Il y a aussi un écho à l'[entropie](/fr/entropie-homme-machine/) dont je parlais ailleurs. Un système de notes laissé à lui-même dérive vers le désordre — c'est la pente naturelle. Ce qu'apporte le LLM wiki, c'est une dépense d'énergie *déléguée* : c'est le LLM qui lutte contre l'entropie de votre information, qui range, déduplique, relie. Vous ne payez plus le coût de l'ordre. Vous le sous-traitez.

Karpathy a peut-être raison : *there is room for an incredible new product*. Mais en attendant ce produit, le combo Obsidian + Claude Code permet de toucher l'idée dès maintenant, avec trois dossiers et quatre commandes.

---

## Pour démarrer

Si vous voulez tester :

1. Clonez le dépôt [Un-second-cerveau-Obsidian-Claude](https://github.com/BenBktech/Un-second-cerveau-Obsidian-Claude) (ou recréez la structure `raw/` + `wiki/` + `CLAUDE.md`).
2. Installez [Claude Code](/fr/claude-code-installation-premiers-pas/) si ce n'est pas déjà fait.
3. Ouvrez le dossier `wiki/` comme vault dans [Obsidian](https://obsidian.md/).
4. Jetez quelques sources dans `raw/`, lancez `/ingest`, et regardez votre cerveau s'écrire tout seul.

Le plus dur ne sera pas technique. Ce sera de résister à l'envie de tout réorganiser à la main. C'est précisément ce que Karpathy vous demande d'arrêter de faire.

---

*Cet article prolonge mes réflexions sur le travail augmenté par l'IA. Voir aussi ma [série sur Claude Code](/fr/claude-code-installation-premiers-pas/) et mon article sur [l'entropie homme-machine](/fr/entropie-homme-machine/).*

### Sources et lectures complémentaires

- [Un-second-cerveau-Obsidian-Claude — Ben BK (GitHub)](https://github.com/BenBktech/Un-second-cerveau-Obsidian-Claude)
- [Karpathy's Instructions for Building an AI-Driven Second Brain — Techstrong.ai](https://techstrong.ai/features/karpathys-instructions-for-building-an-ai-driven-second-brain/)
- [Karpathy shares 'LLM Knowledge Base' architecture that bypasses RAG — VentureBeat](https://venturebeat.com/data/karpathy-shares-llm-knowledge-base-architecture-that-bypasses-rag-with-an)
- [What Is Andrej Karpathy's LLM Wiki? — MindStudio](https://www.mindstudio.ai/blog/andrej-karpathy-llm-wiki-knowledge-base-claude-code)
- [How I Took Karpathy's LLM Wiki and Built an AI-Powered Second Brain in Obsidian — AI Maker](https://aimaker.substack.com/p/llm-wiki-obsidian-knowledge-base-andrej-karphaty)
- [Building a Second Brain — Tiago Forte (méthode PARA)](https://fortelabs.com/blog/para/)
