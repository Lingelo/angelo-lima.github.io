# Articles de référence : cheat sheets, états des lieux, articles « exhaustifs »

À charger quand l'article prétend couvrir un sujet **en entier** : cheat sheet Claude Code, état des lieux d'un outil, comparatif complet. Promettre l'exhaustivité engage : un oubli devient une erreur. Ce fichier décrit comment tenir la promesse, et comment le prouver.

## 1. Partir de la source primaire, téléchargée

- Récupérer la documentation officielle **en Markdown brut** plutôt que par résumés de pages. Pour Claude Code : `https://code.claude.com/docs/llms.txt` liste toutes les pages, et chaque page existe en `.md` (`https://code.claude.com/docs/en/<page>.md`).
- Tout télécharger dans le scratchpad, puis travailler par `grep` / scripts. Un résumé par un modèle (WebFetch) tronque et paraphrase : pas assez fiable pour un inventaire.
- ⚠️ Conserver l'arborescence des URL : plusieurs pages partagent un même nom de fichier (`hooks.md` existe pour la CLI **et** pour l'Agent SDK, idem `overview.md`, `skills.md`, `mcp.md`, `permissions.md`…). Un `basename` écrase l'une par l'autre, en silence.
- Pour « ce qui a changé depuis l'édition précédente » : le changelog (`changelog.md`) et les pages « What's new » hebdomadaires. Noter la version et la date exactes couvertes.

## 2. Une seule source pour les deux langues

Pour une page HTML FR + EN (cheat sheet dans `public/assets/data/`), écrire un **générateur** (script Python dans le scratchpad) qui produit les deux fichiers à partir d'une même structure de données `(clé, texte FR, texte EN)`. Avantages : les deux versions ne divergent jamais, et une correction se fait une fois.

Pièges vus en pratique :
- **Clés en français dans la version EN** : les placeholders des commandes (`/clear [nom]`, `<chemin>`, `n:texte`) doivent être traduits aussi, pas seulement les descriptions. Vérifier par `grep` qu'aucun mot français ne reste dans le fichier EN.
- **Double échappement HTML** : si les clés contiennent `&lt;`, les dé-échapper avant de les ré-échapper dans `<code>`.
- Les anciennes cheat sheets utilisent `public/assets/data/cheatsheet-site-theme.css`, qui fixe `body { width: 1400px }`. Une nouvelle page doit surcharger cette largeur (`width: auto; max-width: …`) et ajouter ses media queries (768 px, 480 px), sinon elle est illisible sur mobile.

## 3. Auditer la couverture par script (obligatoire)

L'exhaustivité se **prouve** : pour chaque liste de référence de la doc, extraire les éléments par regex et vérifier leur présence dans la page générée.

```python
import re, html
H = html.unescape(open('public/assets/data/<cheatsheet>.html').read())
def manquants(label, items):
    m = [i for i in items if i not in H]
    print(f"{label}: {len(items)} documentés, {len(m)} manquants", m)
doc = open('docs/commands.md').read()
manquants('commandes', sorted(set(re.findall(r'^\| *`(/[a-z0-9-]+)', doc, re.M))))
manquants('alias', sorted(set(re.findall(r'(?:Alias(?:es)?:|Also available as)[^|]*?`(/[a-z-]+)`', doc))))
```

Listes à auditer au minimum pour Claude Code : commandes slash **et leurs alias**, flags CLI, sous-commandes (`claude plugin …`, `claude mcp …` et leurs options), outils intégrés, événements de hooks, raccourcis clavier, actions de keybindings, clés de settings, variables d'environnement. Lancer l'audit sur **les deux langues**.

Lire les écarts un par un : une notation compacte (`--system-prompt[-file]`, `add|list|remove`) ou un titre de section capturé par la regex donnent des faux positifs. Pour une cheat sheet, préférer écrire les variantes en toutes lettres : le lecteur cherche `--system-prompt-file`, pas `[-file]`.

## 4. Comparer avec l'édition précédente

Une nouvelle édition ne doit rien perdre qui soit encore valable. Extraire tous les `<code>` de l'ancienne page, lister ceux absents de la nouvelle, puis vérifier dans la doc actuelle si chacun existe toujours :
- encore documenté → le réintégrer (ex. mot-clé `ultrathink`, variables des hooks, champs de sortie JSON) ;
- retiré → le mentionner avec un badge « RETIRÉ » ;
- simple exemple ou variante de syntaxe → ignorer.

## 5. Compter juste

- Compter les éléments **uniques** : un même élément peut apparaître dans deux tables de la doc (ex. `WebSearch` figure dans la table des outils et dans celle des règles de permission : 46 outils, pas 47).
- Reporter le même chiffre partout : titre, sous-titre, « L'essentiel », FAQ, tableau de couverture, page HTML. Après une correction, `grep` l'ancien chiffre dans tous les fichiers.

## 6. Vérifier le rendu

- Capture desktop : `/opt/pw-browsers/chromium-*/chrome-linux/chrome --headless=new --no-sandbox --window-size=1600,3200 --screenshot=out.png file://…`.
- ⚠️ Chromium headless impose une largeur de fenêtre minimale d'environ **500 px** : `--window-size=390,…` ne simule pas un mobile et fait croire à un débordement. Pour tester 375 px, charger la page dans une `<iframe style="width:375px">` d'une page temporaire, puis supprimer ce fichier temporaire de `public/`.
- Ouvrir les `<details>` (annexes) pour la capture : `sed 's/<details>/<details open>/g'` dans une copie temporaire.

## 7. Ce que l'article dit de la couverture

Annoncer précisément ce qui est couvert (tableau section → contenu) et, honnêtement, ce qui ne l'est pas en détail (ex. « les champs du manifeste de plugin et l'API des mods sont résumés, pas recensés un à un »). Dater l'état des lieux : version et date de la doc consultée.
