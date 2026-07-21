---
name: create-article
description: Crée un nouvel article de blog bilingue (FR + EN) pour le site Astro d'Angelo Lima en respectant toutes les règles du dépôt — frontmatter conforme au schéma, appariement des langues, tags standardisés, câblage des images, liens internes, et optimisation SEO/GEO — puis valide par un build. À invoquer quand l'utilisateur veut rédiger, créer, publier ou mettre en ligne un nouvel article, un billet, un post de blog, ou transformer un brouillon en article publié ; quand il fournit un texte source à mettre en forme pour le blog ; ou quand il demande de créer la version anglaise ou française d'un article existant. Ne PAS utiliser pour de simples retouches de style (voir le skill deslopify) ni pour la doc technique du dépôt (voir CLAUDE.md).
---

# Create Article

Ce skill décrit la **procédure de bout en bout** pour publier un article bilingue sur le blog Astro d'Angelo Lima : du brouillon fourni par l'auteur jusqu'à deux fichiers Markdown valides, optimisés SEO/GEO, déslopifiés et vérifiés par un build.

> **Principe de non-duplication.** Ce skill est *procédural*. Il ne recopie pas :
> - **CLAUDE.md** (référence d'architecture : schéma, routing, conventions) — on y **renvoie**.
> - le skill **deslopify** (qualité de prose) — on l'**invoque** comme une étape.
> - `references/seo-geo.md` (règles SEO/GEO détaillées) — à charger à l'étape 5.
>
> En cas de contradiction, **CLAUDE.md et `src/content.config.ts` font foi** (le code réel prime sur ce skill, qui peut vieillir).

## Quand l'activer

- L'auteur fournit un brouillon (en général FR) et veut le publier.
- L'auteur demande la version anglaise (ou française) d'un article existant.
- L'auteur veut créer un article « from scratch » sur un sujet donné.

**Cadrage important** : l'auteur écrit lui-même le contenu. Ce skill n'est **pas** un générateur d'articles ; c'est un assistant de **mise en production** qui prend une matière rédigée et produit des fichiers corrects, optimisés et publiables. Ne jamais gonfler artificiellement un texte ni inventer des faits, des chiffres ou des citations.

## Procédure

### 1. Vérifier le schéma réel avant d'écrire le frontmatter
Lire `src/content.config.ts` (le contrat Zod). Ne jamais écrire de frontmatter de mémoire : le site a migré de Jekyll vers Astro, et les tics Jekyll (`ref:`, `categories:`, `layout:`) sont **faux**. Champs actuels clés : `title`, `subtitle?`, `description?`, `date` (ISO), `lang`, `translationKey`, `tags[]`, `slug`, `thumbnail?`/`shareImg?`, `aliases[]`, `faq?`.

### 2. Créer les deux langues, appariées
- FR dans `src/content/posts/fr/AAAA-MM-JJ-slug.md` (`lang: fr`).
- EN dans `src/content/posts/en/AAAA-MM-JJ-slug-en.md` (`lang: en`).
- **Même `translationKey`** sur les deux → le hreflang FR ↔ EN est généré automatiquement. C'est non négociable : un `translationKey` divergent casse l'appariement.
- Slug EN suffixé `-en` (convention du dépôt) ; slug FR sans suffixe.

### 3. Tags standardisés uniquement
Réutiliser les tags existants : **IA**, **Développement** / **Development**, **Web**, **Tech**, **Personnel** / **Personal**, **Sécurité** / **Security**, **Claude Code**. Les pages de tags sont auto-générées : aucune création de page ni édition de sitemap/robots (contrairement à l'ancien process Jekyll décrit dans de vieilles docs). Ne créer un tag inédit qu'en dernier recours.

### 4. Liens internes en chemins relatifs
- Toujours `/fr/slug/` ou `/en/slug/`, jamais un nom de fichier ni une URL absolue `https://angelo-lima.fr/...`.
- Lier FR → FR et EN → EN. **Vérifier chaque slug cible** dans `src/content/posts/` avant de l'écrire (les slugs EN diffèrent des FR).
- Viser 2 à 4 liens internes vers des articles réellement connexes. Ne pas forcer un lien hors-sujet (cf. deslopify).

### 5. Optimisation SEO / GEO
**Charger `references/seo-geo.md`** et appliquer la checklist. En résumé :
- `description` ≤ 155 caractères (sinon tronquée dans les résultats de recherche).
- Un bloc **« L'essentiel » / « In brief »** (blockquote à puces) juste après l'accroche : faits clés extractibles par les moteurs génératifs.
- Un bloc **`faq:`** en frontmatter (4-5 questions réelles, réponses courtes et autoportantes) → le layout rend une section visible **et** le JSON-LD `FAQPage` automatiquement.
- Des chiffres, dates, noms propres sourcés dans le corps (les moteurs génératifs citent les faits autoportants).

### 6. Câbler les images
- `thumbnail` **et** `shareImg` pointant vers `/assets/img/nom.png`.
- Déposer le fichier réel dans `public/assets/img/`. Un thumbnail manquant ne casse pas le build (l'image est conditionnelle) mais laisse une carte sans visuel : **le signaler à l'auteur** s'il n'a pas fourni l'image.

### 7. Passe anti-slop
Invoquer le skill **deslopify** sur le corps des deux versions. Point de vigilance récurrent sur ce blog : la densité de **tirets cadratins** (viser ≤ 1-2 par article), le patron « pas X, mais Y », le rythme ternaire. Préserver la voix de l'auteur (franco-portugaise, directe, littéraire) : ne pas aplatir en prose « SEO » neutre.

### 8. Valider par un build
Lancer `npm run build` (installer d'abord si besoin : `npm ci`). Un frontmatter invalide **casse le build** via la validation du content collection. Vérifier ensuite dans `dist/` : les deux pages générées, le hreflang croisé, la section FAQ et le JSON-LD `FAQPage` présents, les liens internes pointant vers des cibles existantes.

### 9. Commit et push
Sur la branche de travail désignée. Message clair. Ne créer une pull request que si l'auteur le demande.

## Checklist finale (avant commit)

- [ ] Frontmatter conforme à `src/content.config.ts` (pas de champ Jekyll).
- [ ] FR + EN créés, **même `translationKey`**, slug EN suffixé `-en`.
- [ ] Tags dans la liste standardisée.
- [ ] `date` au format ISO (ex. `2026-07-21T12:00:00.000Z`).
- [ ] Liens internes relatifs, cibles vérifiées, FR→FR / EN→EN.
- [ ] `description` ≤ 155 caractères.
- [ ] Bloc « L'essentiel » / « In brief » présent.
- [ ] `faq:` renseigné (4-5 Q/R autoportantes).
- [ ] `thumbnail` + `shareImg` câblés ; image déposée ou manque signalé.
- [ ] Passe deslopify effectuée sur les deux versions.
- [ ] `npm run build` vert ; pages, hreflang, FAQ et JSON-LD vérifiés dans `dist/`.
