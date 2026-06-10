---
layout: post
title: "Le second cerveau selon Karpathy : un wiki que l'IA écrit à votre place"
subtitle: "Comment transformer Obsidian + Claude en base de connaissances qui se compile, se relie et se corrige toute seule, sans RAG, sans base vectorielle"
description: "Le concept de LLM wiki d'Andrej Karpathy expliqué et mis en pratique avec Obsidian et Claude Code. Compilation plutôt que résumé, zéro RAG, et comment l'implémenter vous-même avec trois dossiers et quatre commandes."
thumbnail-img: "/assets/img/second-cerveau-obsidian.png"
share-img: "/assets/img/second-cerveau-obsidian.png"
tags: [IA, Claude Code, Développement]
author: "Angelo Lima"
lang: fr
ref: second-brain-karpathy
categories: fr
---

On a tous une version dégradée du même rêve : un endroit unique où vivrait tout ce qu'on a lu, écouté, appris. Un cerveau de secours. En pratique, on accumule des notes Notion abandonnées, des marque-pages qu'on ne rouvre jamais, des PDF surlignés qui dorment dans un dossier `Téléchargements`. Le problème n'a jamais été de **collecter** l'information. C'est de l'**organiser** : c'est précisément là que l'effort humain s'effondre.

Début 2026, Andrej Karpathy (cofondateur d'OpenAI, ex-directeur IA de Tesla) a partagé sur X une idée simple et redoutablement efficace pour résoudre ce problème : et si on arrêtait d'écrire la base de connaissances soi-même, pour la laisser **entièrement** à un LLM ?

C'est ce qu'il appelle le **LLM wiki**, ou *second cerveau*. Cet article décortique le concept, explique pourquoi il enterre l'approche RAG pour un usage personnel, et montre comment l'implémenter avec Obsidian et Claude Code.

---

## L'idée de Karpathy : compiler, pas résumer

La phrase qui résume tout, c'est la sienne :

> *"You rarely ever write or edit the wiki manually, it's the domain of the LLM."*
> *(Vous n'écrivez ou ne modifiez quasiment jamais le wiki à la main, c'est le domaine du LLM.)*

Le retournement est total. Dans la vision classique du « second cerveau » (celle popularisée par Tiago Forte et sa méthode [PARA](https://fortelabs.com/blog/para/)), **c'est vous** qui prenez les notes, qui les rangez, qui les reliez. L'IA n'intervient qu'à la fin, pour répondre à des questions sur un corpus que vous avez patiemment construit.

Karpathy inverse la chaîne. Vous ne faites plus qu'une chose : **collecter de la matière brute**. Des articles, des papiers de recherche, des notes de lecture, des transcriptions de podcasts, des bouts de conversation : tout ce qui vous traverse. Vous jetez ça dans un dossier, et vous dites au LLM : *« compile »*.

### Compilation ≠ résumé

C'est la distinction centrale, et elle est plus subtile qu'elle n'en a l'air.

Un **résumé** compresse : il jette du détail pour produire une version plus courte. Vous perdez de l'information à chaque passage.

Une **compilation**, au sens de Karpathy, *restructure* sans appauvrir. Le LLM lit chaque source, en extrait les concepts, les personnes, les idées clés, puis les réécrit dans un format homogène : des articles façon encyclopédie, reliés entre eux par des backlinks, dédupliqués, et débarrassés des contradictions entre sources. Le détail est préservé : c'est la **forme** qui devient cohérente.

La métaphore du compilateur est volontaire. De même qu'un compilateur transforme du code source hétérogène en un binaire structuré et exécutable, le LLM transforme un fouillis de sources en une ontologie navigable.

### Ce que ça donne à l'échelle

Karpathy avance un chiffre : sur un seul de ses sujets de recherche, son wiki avait atteint **~100 articles et 400 000 mots** (plus long que la plupart des thèses de doctorat) **sans qu'il en écrive une seule ligne directement**. Le LLM rédige, relie, catégorise, et vérifie la cohérence. L'humain ne fait qu'alimenter et interroger.

Sa propre conclusion, lâchée sur X : *« I think there is room here for an incredible new product. »*

Ce qu'il ne dit pas explicitement, mais qui découle directement du raisonnement : si le wiki compilé est un artefact propre et lisible, pourquoi aurait-on besoin d'une infrastructure de retrieval pour l'interroger ? La question mène directement au sujet qui fâche.

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

L'intuition profonde : le RAG fait le **même travail de tri à chaque question**, sur de la donnée brute jamais nettoyée. Le LLM wiki fait ce travail **une seule fois**, au moment de la compilation, et produit un artefact propre, condensé, qui tient dans la fenêtre de contexte des modèles longs modernes. Pour une base de connaissances à l'échelle personnelle (quelques centaines d'articles), le RAG devient une usine à gaz dont on n'a tout simplement plus besoin.

> ⚠️ **Nuance importante** : ce raisonnement vaut pour un usage *personnel*. À l'échelle entreprise (des millions de documents, du contrôle d'accès granulaire, des contraintes de fraîcheur en temps réel), le RAG garde toute sa pertinence. Le LLM wiki n'est pas une religion, c'est le bon outil pour la bonne échelle.

Le concept est posé. Reste la question qui dérange toujours : si c'est si simple, pourquoi est-ce que personne ne l'a empaqueté proprement ? Karpathy lui-même tourne sur des scripts maison. Voici comment remplacer ces scripts par quelque chose de plus solide.

---

## De l'idée au système : Obsidian + Claude Code

L'idée de Karpathy est un *pattern*, pas un produit. Lui-même reconnaît tourner avec des *« scripts Python un peu hacky »* pour orchestrer le LLM, plus Obsidian comme couche de visualisation. La bonne nouvelle : avec Claude Code, on n'a pas besoin de scripts. Les slash commands personnalisées suffisent à tout orchestrer depuis le terminal, directement dans le dossier du wiki.

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
        ├── ingest.md
        ├── lint.md
        ├── query.md
        └── save.md
```

- Le dossier **`raw/`** est votre boîte de dépôt. Vous y jetez tout, sans organisation.
- Le dossier **`wiki/`** est la sortie du LLM : des articles encyclopédiques reliés entre eux, plus un `index.md` qui résume l'ensemble d'un coup d'œil.
- Le fichier **`CLAUDE.md`** joue le rôle de schéma. Il décrit comment le cerveau doit être structuré : conventions de nommage, format des pages, règles de liaison. C'est le contrat que l'agent suit.
- **Obsidian** vient se brancher par-dessus le dossier `wiki/` : il transforme les backlinks markdown en un graphe de connaissances navigable visuellement.

### Le prompt d'initialisation : `CLAUDE.md`

Sans lui, l'agent n'a aucun contrat à suivre et compilera n'importe comment. C'est ce fichier qui fixe la forme du cerveau.

```markdown
# Mon Second Cerveau

## Rôle
Tu es l'agent responsable de la construction et de la maintenance de ce wiki
personnel. Tu lis des sources brutes et les compiles en articles structurés.
Tu n'inventes pas : tout ce que tu écris doit être traçable à une source.

## Structure des dossiers
- `raw/` : sources brutes à ingérer (ne jamais les modifier)
- `wiki/` : articles que tu écris et maintiens
- `wiki/index.md` : sommaire de tout le wiki (toujours à jour)
- `log.md` : historique daté de toutes tes opérations

## Format des articles wiki
Chaque article dans `wiki/` doit :
- Commencer par un titre H1 et un paragraphe de définition (2-3 phrases max)
- Utiliser des backlinks [[NomDePage]] vers les concepts liés
- Lister ses sources en bas de page (titre, auteur, date si disponible)
- Être encyclopédique : conserver le détail, restructurer la forme

## Règles d'écriture
- Compiler, pas résumer : reformuler pour la cohérence, pas pour raccourcir
- Résoudre les contradictions entre sources explicitement dans le texte
- Créer une page dédiée pour chaque concept, personne ou outil significatif
- Maintenir `index.md` à jour après chaque ingestion
- Logger chaque opération dans `log.md` avec la date et un résumé
```

### Les quatre commandes : contenu complet

Les slash commands de Claude Code sont de simples fichiers markdown dans `.claude/commands/`. Leur contenu devient le prompt exécuté quand vous tapez la commande.

**`.claude/commands/ingest.md`** (la compilation) :

```markdown
Lis tous les fichiers présents dans le dossier `raw/` (ignore `raw/processed/`).

Pour chaque source :
1. Identifie les concepts, personnes, outils et idées clés
2. Pour chaque élément significatif : crée ou enrichis la page correspondante dans `wiki/`
3. Tisse les backlinks [[NomDePage]] entre pages liées
4. Si deux sources se contredisent, note la contradiction dans l'article concerné
5. Déplace les fichiers traités dans `raw/processed/`

Une fois toutes les sources traitées :
- Mets à jour `wiki/index.md` avec les nouvelles pages et les pages modifiées
- Ajoute une entrée dans `log.md` : date, nombre de fichiers ingérés, pages créées/modifiées
```

**`.claude/commands/lint.md`** (le contrôle santé) :

```markdown
Passe en revue l'intégralité du dossier `wiki/` et produis un rapport structuré.

Vérifie :
1. **Contradictions** : passages qui se contredisent entre deux articles différents
2. **Pages orphelines** : articles sans aucun backlink entrant depuis une autre page
3. **Liens cassés** : backlinks [[NomDePage]] qui pointent vers une page inexistante
4. **Index périmé** : entrées dans `index.md` manquantes ou pointant vers des pages supprimées
5. **Concepts sans page** : termes récurrents dans plusieurs articles qui mériteraient leur propre page

Pour chaque problème : indique le fichier concerné, décris le problème, propose une correction.
Demande confirmation avant d'appliquer les corrections.
```

**`.claude/commands/query.md`** (l'interrogation) :

```markdown
$ARGUMENTS

Réponds à la question ci-dessus en t'appuyant sur le contenu du dossier `wiki/`.
Cite les pages sources entre parenthèses pour chaque information.
Si la réponse n'est pas dans le wiki, dis-le clairement : ne complète pas avec tes
connaissances générales sans le signaler explicitement.
```

**`.claude/commands/save.md`** (la capitalisation) :

```markdown
$ARGUMENTS

Transforme le contenu ci-dessus en une nouvelle page du wiki :
1. Détermine un titre court et précis
2. Écris la page au format encyclopédique (H1, résumé, sections, backlinks [[]])
3. Crée le fichier dans `wiki/` avec les backlinks vers les pages existantes pertinentes
4. Mets à jour `wiki/index.md`
5. Ajoute une entrée dans `log.md`
```

Le `$ARGUMENTS` dans `query.md` et `save.md` est la syntaxe Claude Code pour capturer ce que vous tapez après la commande. `/query pourquoi le RAG ne scale pas pour un usage perso ?` injecte la question dans le prompt.

Cette séparation `/ingest` / `/lint` est délibérée : l'ingestion fait grossir le cerveau, le linting le maintient en bonne santé. Les deux tournent indépendamment. Karpathy lui-même insiste sur cette passe de validation périodique comme un *« health check »* : sans elle, un wiki qui grossit finit par accumuler des incohérences silencieuses.

Voilà pour la mécanique. Ce qui est moins évident à voir dans les fichiers de commandes, c'est comment ce système s'intègre dans un rythme de travail réel, et ce qu'il change concrètement à votre rapport à l'information.

---

## Le rythme réel : une semaine avec ce système

La vraie différence avec n'importe quel autre outil de notes, c'est que **vous arrêtez de penser à l'organisation en temps réel**. L'effort mental de « où est-ce que je range ça ? » disparaît complètement. Ce n'est pas anodin : c'est précisément cet effort qui fait qu'on abandonne tous les systèmes de notes au bout de trois semaines.

En pratique, le rythme s'installe naturellement en deux temps.

**En continu** : vous collectez sans filtrer. Un article intéressant → copié dans `raw/`. Une transcription de conférence → déposée dans `raw/`. Des notes griffonnées après une réunion → dans `raw/`. Le dossier est un bac à sable, pas une bibliothèque. Rien n'a besoin d'être propre pour y atterrir.

**En batch** : une fois par semaine (ou quand le dossier `raw/` commence à peser), vous lancez `/ingest`. Ce qui prenait une heure de rangement manuel (lire, catégoriser, relier, déduper) se passe sans vous. Vous relisez le résultat, vous corrigez ce qui cloche, et c'est fait. `/lint` tourne en parallèle quand le wiki a grossi : il vous rend un rapport des incohérences, vous les arbitrez en cinq minutes.

Ce que ça change dans la durée : au bout de quelques mois, vous avez un corpus dense qui répond à vos questions avec vos propres sources. `/query` ne cherche pas dans des vecteurs : il raisonne sur du texte que *vous* avez collecté, compilé dans *votre* ontologie. La différence avec un ChatGPT généraliste est réelle et se sent.

Le tout est versionnable avec git. Votre second cerveau devient un dépôt : auditable, diffable, restaurable. Loin du trou noir qu'est un espace Notion.

---

## Où ça coince vraiment

Ça tient sur le papier. Mais quelques mois avec ce système font apparaître des frictions que les commandes ne documentent pas.

**Ce qui est vraiment fort :**
- **L'effort d'organisation tombe à zéro.** C'est *le* point. Le frein historique de tout système de notes (le rangement) disparaît.
- **Format ouvert, zéro lock-in.** Du markdown, des dossiers, du git. Pas de SaaS qui ferme boutique avec vos données dedans.
- **Lisible et auditable.** Contrairement à une base vectorielle, vous pouvez *lire* votre cerveau. Vous voyez ce que le LLM a écrit, et le corriger si besoin.
- **Le coût computationnel est payé une fois**, à la compilation, pas à chaque requête.

**Les limites, qu'il faut regarder en face :**
- **Vous déléguez la rédaction à un LLM.** Qui dit LLM dit risque d'hallucination ou de reformulation maladroite. La passe `/lint` aide, mais ne remplace pas une relecture critique. (J'en ai parlé plus en détail dans mon article sur [les hallucinations des LLM](/fr/hallucinations-llm-devoxx-2026/).)
- **Ça tient grâce à la fenêtre de contexte.** Le modèle élégant « tout le wiki tient dans le contexte » s'effrite quand le cerveau dépasse une certaine taille. À très grande échelle, on revient vers des stratégies de retrieval, et le RAG reprend du sens.
- **La discipline reste nécessaire.** Pas pour organiser, mais pour *alimenter* régulièrement et *linter*. Un cerveau qu'on ne nourrit plus reste un cerveau mort.
- **Le reality check entreprise.** Contrôle d'accès, conformité, fraîcheur temps réel, volumétrie massive : à ce niveau, le LLM wiki seul ne suffit pas. C'est un outil d'usage personnel et d'équipe restreinte, pas une plateforme de knowledge management d'entreprise.

Et une fois ce périmètre accepté, ce qui m'intéresse davantage que l'outil lui-même, c'est ce que ce pattern révèle sur la façon dont on travaille avec l'IA.

---

## Ce que ça révèle sur le travail augmenté

Ce qui me frappe, c'est que ce pattern n'est pas isolé. C'est la même idée que celle que je creusais dans mon article sur [les philosophies de travail avec l'IA](/fr/sdd-compound-engineering-bmad-philosophies-ia/) : **capitaliser sur l'accumulation**.

Le *compound engineering* dit que chaque cycle de développement doit enrichir le suivant, via une boucle d'apprentissage documentée. Le LLM wiki de Karpathy dit exactement la même chose, mais pour la connaissance personnelle : chaque source ingérée, chaque réponse sauvegardée rend le cerveau plus dense, et donc la prochaine requête plus riche. C'est une boucle vertueuse où l'IA ne fait pas que *consommer* votre savoir, elle le *construit*.

Il y a aussi un écho à l'[entropie](/fr/entropie-homme-machine/) dont je parlais ailleurs. Un système de notes laissé à lui-même dérive vers le désordre. C'est la pente naturelle. Ce qu'apporte le LLM wiki, c'est une dépense d'énergie *déléguée* : c'est le LLM qui lutte contre l'entropie de votre information, qui range, déduplique, relie. Vous ne payez plus le coût de l'ordre. Vous le sous-traitez.

Karpathy a peut-être raison : *there is room for an incredible new product*. Mais en attendant ce produit, le combo Obsidian + Claude Code permet de toucher l'idée dès maintenant, avec trois dossiers et quatre commandes.

---

## Créer le cerveau : deux éléments, pas un gros prompt

La section précédente montre le contenu de chaque fichier. Mais on ne les crée pas à la main : on donne à Claude Code le texte source de Karpathy, et un court prompt de délégation. C'est là que le principe se referme : l'outil qui fera tourner le cerveau en construit aussi les fondations.

**Prérequis** : [Claude Code](/fr/claude-code-installation-premiers-pas/) installé, un dossier vide.

**1. Créez le dossier et ouvrez Claude Code dedans :**

```bash
mkdir mon-second-cerveau && cd mon-second-cerveau
claude
```

**2. Copiez le gist original de Karpathy**

Allez sur le gist qu'il a publié en avril 2026 et copiez le contenu intégral :

👉 **[gist.github.com/karpathy/442a6bf555914893e9891c11519de94f](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)**

Ce texte décrit le pattern complet : structure raw/wiki/schema, les workflows ingest/lint/query, le rôle du log et de l'index. C'est le contrat conceptuel que Claude va implémenter.

**3. Collez le gist dans Claude Code, suivi de ce prompt de délégation :**

```
Sur la base du concept décrit ci-dessus, initialise un second cerveau
dans le dossier courant.

Crée :
- raw/ (vide, pour les sources brutes)
- wiki/ avec un index.md vide
- log.md vide
- CLAUDE.md qui capture ce contrat comme règles pour l'agent
- .claude/commands/ avec les quatre commandes /ingest, /lint, /query
  et /save, dont le contenu implémente fidèlement le concept décrit

Confirme la création de chaque fichier.
```

Claude Code lit le concept de Karpathy, comprend la structure attendue, et crée les fichiers. Vous n'avez rien spécifié à la main : vous avez délégué l'interprétation.

**4. Ouvrez `wiki/` comme vault dans [Obsidian](https://obsidian.md/).**

**5. Déposez un fichier dans `raw/` et lancez `/ingest`.**

Le plus dur ne sera pas technique. Ce sera de résister à l'envie de tout réorganiser à la main. C'est précisément ce que Karpathy vous demande d'arrêter de faire.
---

*Cet article prolonge mes réflexions sur le travail augmenté par l'IA. Voir aussi ma [série sur Claude Code](/fr/claude-code-installation-premiers-pas/) et mon article sur [l'entropie homme-machine](/fr/entropie-homme-machine/).*

### Sources et lectures complémentaires

- [Karpathy's Instructions for Building an AI-Driven Second Brain — Techstrong.ai](https://techstrong.ai/features/karpathys-instructions-for-building-an-ai-driven-second-brain/)
- [Karpathy shares 'LLM Knowledge Base' architecture that bypasses RAG — VentureBeat](https://venturebeat.com/data/karpathy-shares-llm-knowledge-base-architecture-that-bypasses-rag-with-an)
- [What Is Andrej Karpathy's LLM Wiki? — MindStudio](https://www.mindstudio.ai/blog/andrej-karpathy-llm-wiki-knowledge-base-claude-code)
- [How I Took Karpathy's LLM Wiki and Built an AI-Powered Second Brain in Obsidian — AI Maker](https://aimaker.substack.com/p/llm-wiki-obsidian-knowledge-base-andrej-karphaty)
- [Building a Second Brain — Tiago Forte (méthode PARA)](https://fortelabs.com/blog/para/)
