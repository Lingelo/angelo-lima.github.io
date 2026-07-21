# SEO & GEO — Référence pour les articles du blog

Ce fichier détaille les règles d'optimisation à appliquer à l'étape 5 de la procédure `create-article`. Deux objectifs distincts :

- **SEO** (Search Engine Optimization) : être bien classé et bien affiché dans les résultats de recherche classiques (Google, Bing).
- **GEO** (Generative Engine Optimization) : être **cité** par les moteurs de réponse génératifs (ChatGPT, Perplexity, Google AI Overviews, Claude). Le levier est différent : ces moteurs extraient et reformulent des **faits autoportants**, pas des pages entières.

> **Règle d'or GEO** : un fait est cité s'il se suffit à lui-même hors contexte. « Amália est un modèle open source de 9 milliards de paramètres sous licence Apache 2.0, sorti le 1er juillet 2026 » est citable. « Il est plutôt léger et récent » ne l'est pas.

---

## 1. Ce qui est déjà automatique — NE PAS refaire

Le layout Astro (`src/layouts/PostLayout.astro`, `src/components/Head.astro`, `SchemaOrg.astro`) génère déjà, pour chaque article :

- Balises meta : `title`, `description`, `robots` (`max-snippet:-1, max-image-preview:large`), canonical, `author`, `article:published_time`/`modified_time`, `article:tag`.
- **Open Graph** + **Twitter Card** (`summary_large_image` si une image est câblée).
- **JSON-LD `Article`** : `headline`, `description`, `image`, `author`, `publisher`, dates, `wordCount`, `keywords`, `articleSection`.
- **hreflang** FR ↔ EN croisé (via `translationKey`).
- **JSON-LD `FAQPage`** + section FAQ visible (si `faq:` est renseigné en frontmatter).
- Breadcrumbs (JSON-LD `BreadcrumbList`), RSS, sitemap, temps de lecture.
- **`/llms.txt`** : index machine-readable du site pour les agents/LLMs, mis à jour automatiquement.

Ne pas dupliquer ces éléments à la main dans le Markdown. Le travail d'optimisation porte uniquement sur le **contenu** décrit ci-dessous.

---

## 2. Checklist SEO (contenu de l'article)

- **`description` ≤ 155 caractères.** Au-delà, Google la tronque en plein milieu. La rendre autoportante et attractive (elle sert de résumé dans les résultats). Éviter de répéter mot pour mot le titre.
- **Titre.** Distinctif et humain avant tout. Attention : au-delà de ~60 caractères il est tronqué dans les résultats. Le schéma n'a pas de champ `seoTitle` distinct — c'est donc un arbitrage assumé entre personnalité éditoriale et affichage SERP. Privilégier la voix, mais en connaissance de cause.
- **Un seul H1** : c'est le `title`, rendu par le layout. Ne pas mettre de `#` dans le corps Markdown ; structurer avec des `##` (H2) et `###` (H3).
- **Maillage interne** : 2 à 4 liens vers des articles réellement connexes, en chemins relatifs. Au moins un **en corps de texte** (pas seulement dans « Pour aller plus loin ») : un lien contextuel a plus de valeur qu'un lien en fin de page.
- **Images** : renseigner `thumbnail` + `shareImg`. Le `alt` est fourni par le layout (= titre de l'article).
- **Longueur** : viser la complétude du sujet, pas un quota. Les articles du blog font typiquement 1500-2500 mots ; en dessous de ~800, un sujet est rarement traité complètement.

---

## 3. Checklist GEO (citabilité par les moteurs génératifs)

### a. Bloc « L'essentiel » / « In brief »
Juste **après l'accroche** et **avant le premier `##`**, insérer un encadré de faits clés, sous forme de blockquote à puces :

```markdown
> **L'essentiel**
>
> - **Quoi** : [définition en une phrase, avec le nom de l'entité].
> - **Chiffres clés** : [taille, prix, date, licence…].
> - **Ce que c'est vraiment** : [la nuance qui lève la confusion la plus fréquente].
> - **Ce que ça vaut** : [le résultat honnête, forces et limite].
> - **Pourquoi ça compte** : [l'enjeu en une phrase].
```

C'est le passage le plus souvent extrait par les AI Overviews et Perplexity. Il doit tenir seul, sans lire le reste. En anglais : `> **In brief**`, et pas d'espace avant les deux-points (`**What:**`, pas `**What** :`).

### b. Bloc `faq:` en frontmatter
4 à 5 **vraies questions** que les gens tapent (« Qu'est-ce que X ? », « X est-il gratuit / open source ? », « X vs [concurrent] ? », « Peut-on faire tourner X sur son ordinateur ? »). Réponses **courtes (2-4 phrases) et autoportantes** : chaque réponse doit être citable seule, donc y répéter le sujet (« Amália est… ») plutôt que « Il est… ». Le layout se charge du rendu visible + du JSON-LD `FAQPage`.

```yaml
faq:
  - q: "Qu'est-ce que X ?"
    a: "X est [définition autoportante avec le nom, la catégorie, la date, le chiffre clé]."
```

⚠️ Le JSON-LD `FAQPage` doit correspondre à du contenu **visible** sur la page (règle Google). Comme le layout rend les deux à partir du même `faq:`, ne jamais ajouter un JSON-LD FAQ « fantôme » à la main sans contenu visible correspondant.

### c. Clarté de l'entité, tôt
Définir explicitement ce qu'est le sujet dès l'accroche ou l'encadré (catégorie + ce que ce n'est pas). Les moteurs génératifs ont besoin d'ancrer l'entité pour la citer correctement.

### d. Faits sourcés et chiffrés
Chaque affirmation importante gagne à être chiffrée, datée, et attribuée (rapport, auteur, source primaire). Les moteurs génératifs privilégient les statistiques citées avec leur source. Lier les sources primaires (arXiv, dépôt officiel, billet original).

### e. Sous-titres (optionnel, à doser selon la voix)
Les titres en forme de question (« Amália est-il open source ? ») sont très favorables au GEO, mais peuvent heurter une écriture littéraire. **Ne pas les imposer** si l'auteur a un style éditorial de titres (comme « D'abord, de quoi on parle ») : dans ce cas, la section `faq:` couvre déjà le besoin de questions. Arbitrer au cas par cas, en préservant la voix.

---

## 4. Tension SEO/GEO ↔ voix de l'auteur

Le style de ce blog est **littéraire, personnel, franco-portugais** — pas « SEO-friendly » neutre. Les optimisations ci-dessus sont conçues pour **s'ajouter sans écraser** :

- Le bloc « L'essentiel » et la FAQ sont des **couches structurées** autour d'un corps qui, lui, reste narratif.
- Ne jamais transformer les paragraphes de fond en listes à puces pour « optimiser » : c'est un marqueur d'IA slop (cf. deslopify) et ça détruit la voix.
- Le maillage interne doit rester honnête : un lien hors-sujet inséré « pour le SEO » se voit et nuit.

En cas de doute entre un gain SEO/GEO et la préservation de la voix, **préserver la voix** — et signaler le compromis à l'auteur plutôt que de trancher seul sur un article déjà rédigé.
