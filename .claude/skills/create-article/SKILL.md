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
> - `references/articles-reference.md` (cheat sheets, états des lieux, articles « exhaustifs ») — à charger quand l'article prétend couvrir un sujet en entier.
>
> En cas de contradiction, **CLAUDE.md et `src/content.config.ts` font foi** (le code réel prime sur ce skill, qui peut vieillir).

## Quand l'activer

- L'auteur fournit un brouillon (en général FR) et veut le publier.
- L'auteur demande la version anglaise (ou française) d'un article existant.
- L'auteur veut créer un article « from scratch » sur un sujet donné.

**Cadrage important** : l'auteur écrit lui-même le contenu. Ce skill n'est **pas** un générateur d'articles ; c'est un assistant de **mise en production** qui prend une matière rédigée et produit des fichiers corrects, optimisés et publiables. Ne jamais gonfler artificiellement un texte ni inventer des faits, des chiffres ou des citations.

## Procédure

### 1. Vérifier le schéma réel avant d'écrire le frontmatter
Lire `src/content.config.ts` (le contrat Zod). Ne jamais écrire de frontmatter de mémoire : le site a migré de Jekyll vers Astro, et les tics Jekyll (`ref:`, `categories:`, `layout:`) sont **faux**. Champs actuels clés : `title`, `subtitle?`, `description?`, `date` (ISO), `lang`, `translationKey`, `tags[]`, `slug`, `thumbnail?`/`shareImg?`, `aliases[]`, `related[]`, `faq?`.

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
- Renseigner `related:` (2 à 3 `translationKey` d'articles existants et publiés) pour piloter le bloc « Articles connexes ». Une seule liste, identique sur FR et EN. Si l'article prolonge une série, ajouter aussi sa clé dans le `related:` des articles de la série (sinon le lien ne va que dans un sens).

### 5. Optimisation SEO / GEO
**Charger `references/seo-geo.md`** et appliquer la checklist. En résumé :
- `description` ≤ 155 caractères (sinon tronquée dans les résultats de recherche).
- Un bloc **« L'essentiel » / « In brief »** (blockquote à puces) juste après l'accroche : faits clés extractibles par les moteurs génératifs.
- Un bloc **`faq:`** en frontmatter (4-5 questions réelles, réponses courtes et autoportantes) → le layout rend une section visible **et** le JSON-LD `FAQPage` automatiquement.
- Des chiffres, dates, noms propres sourcés dans le corps (les moteurs génératifs citent les faits autoportants).

### 6. Câbler les images
- `thumbnail` **et** `shareImg` pointant vers `/assets/img/nom.png`.
- Déposer le fichier réel dans `public/assets/img/`. Un thumbnail manquant ne casse pas le build (l'image est conditionnelle) mais laisse une carte sans visuel : **le signaler à l'auteur** s'il n'a pas fourni l'image.

### 7. Vérifier les faits
Avant la passe de style, relire chaque affirmation vérifiable :
- **Chaque chiffre est recompté par script**, avec dédoublonnage, à partir de la source primaire. Un nombre de lignes de tableau n'est pas un nombre d'éléments (un même élément peut apparaître dans deux tables).
- **Toute référence à un ancien article de l'auteur** (« comme je l'écrivais dans… », « je signalais… ») est vérifiée en lisant cet article. Sinon, formuler le lien sans prêter de propos à l'auteur.
- **Pas d'intention prêtée à un tiers** (« Anthropic estime que… ») sans citation : écrire ce que la source dit.
- **Les opinions à la première personne** (« ce que j'en retiens ») sont signalées à l'auteur comme à relire : c'est sa voix, pas la nôtre.

### 8. Passe anti-slop (obligatoire)
**Invoquer réellement le skill deslopify** (outil Skill), sur les deux versions. Un `grep` des tirets cadratins ne remplace pas la passe. Minimum exigé :
1. lancer `python3 .claude/skills/deslopify/scripts/slop_scan.py <fichier FR> <fichier EN>` ;
2. relire avec `deslopify/references/marqueurs-ia.md` (voix, redondance, ton, que le scan ne voit pas) ;
3. corriger, puis relancer le scan jusqu'à zéro catégorie « À REVOIR » (ou alerte justifiée).

Points de vigilance récurrents sur ce blog : tirets cadratins (≤ 1-2 par article), « pas X, mais Y » (y compris dans l'encadré « L'essentiel »), rythme ternaire, points-virgules, gras sur chaque notion. Préserver la voix de l'auteur (franco-portugaise, directe, littéraire) : ne pas aplatir en prose « SEO » neutre.

### 9. Valider par un build
Lancer `npm run build` (installer d'abord si besoin : `npm ci`). Un frontmatter invalide **casse le build** via la validation du content collection. Vérifier ensuite dans `dist/` : les deux pages générées, le hreflang croisé, la section FAQ et le JSON-LD `FAQPage` présents, les liens internes pointant vers des cibles existantes.

⚠️ **Piège de la date future** : un article daté dans le futur (même de quelques heures, en **UTC**) est exclu du build de production par `isPublished()`, **sans erreur**. Le build est vert mais la page manque dans `dist/`. Si l'auteur veut publier tout de suite, mettre une heure ≤ maintenant (UTC) ; sinon, lui dire que le rebuild quotidien (04:05 / 04:30 UTC) le publiera. Toujours vérifier l'existence du fichier dans `dist/`, pas seulement le code retour du build.

Script de vérification :
```bash
for f in dist/fr/<slug-fr>/index.html dist/en/<slug-en>/index.html; do
  test -f "$f" || { echo "ABSENT: $f"; continue; }
  grep -o 'hreflang="[a-z-]*" href="[^"]*"' "$f" | sort -u
  echo "FAQPage: $(grep -c FAQPage "$f")"
  for l in $(grep -o 'href="/\(fr\|en\|assets\)/[^"#]*"' "$f" | sed 's/href="//;s/"//' | sort -u); do
    [ -e "dist$l" ] || [ -e "dist${l}index.html" ] || echo "LIEN CASSÉ: $l"; done
done
```

### 10. Commit, push et rapport
Sur la branche de travail désignée. Message clair. Ne créer une pull request que si l'auteur le demande.

Le rapport final à l'auteur dit **étape par étape ce qui a été fait, et ce qui ne l'a pas été** (ex. « deslopify : scan + relecture, 0 alerte restante » ; « image : réutilisée, pas de visuel dédié »). Une étape sautée est annoncée comme sautée, jamais présentée comme faite.

## Checklist finale (avant commit)

- [ ] Frontmatter conforme à `src/content.config.ts` (pas de champ Jekyll).
- [ ] FR + EN créés, **même `translationKey`**, slug EN suffixé `-en`.
- [ ] Tags dans la liste standardisée.
- [ ] `date` au format ISO (ex. `2026-07-21T12:00:00.000Z`).
- [ ] Liens internes relatifs, cibles vérifiées, FR→FR / EN→EN.
- [ ] `related:` renseigné (mêmes clés FR et EN, `translationKey` vérifiés).
- [ ] `description` ≤ 155 caractères.
- [ ] Bloc « L'essentiel » / « In brief » présent.
- [ ] `faq:` renseigné (4-5 Q/R autoportantes).
- [ ] `thumbnail` + `shareImg` câblés ; image déposée ou manque signalé.
- [ ] Chiffres recomptés par script, références aux anciens articles vérifiées, aucune intention prêtée sans source.
- [ ] Skill deslopify **invoqué** ; `slop_scan.py` relancé après corrections : 0 catégorie « À REVOIR » (ou alertes justifiées).
- [ ] `npm run build` vert ET les deux pages **présentes** dans `dist/` (piège de la date future) ; hreflang, FAQ, JSON-LD, liens internes vérifiés.
- [ ] Article « exhaustif » (cheat sheet, état des lieux) : audit de couverture fait selon `references/articles-reference.md`.
- [ ] Rapport final honnête : étapes faites / sautées.
