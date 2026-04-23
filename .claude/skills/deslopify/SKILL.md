---
name: deslopify
description: Détecte et élimine les marqueurs d'écriture IA ("AI slop") dans les articles de blog rédigés en français ou en anglais. À invoquer quand l'utilisateur demande de relire, réécrire, "déslopifier", humaniser, naturaliser, ou retirer les tics d'IA d'un brouillon, d'un article, d'un post de blog, d'un README, ou de tout texte rédactionnel. Cible les formules génériques ("dans le paysage en constante évolution", "il est crucial de", "delve", "tapestry"), les structures clichés ("Il ne s'agit pas de X, mais de Y"), l'abus de tirets cadratins et de points-virgules, le rythme ternaire systématique, le participe présent après virgule, les conclusions qui « zoom out », et les introductions pompeuses. Restaure une voix authentique, spécifique et incarnée.
---

# Deslopify

Cette skill relit un texte, croise son contenu avec la liste de marqueurs IA documentée dans `references/marqueurs-ia.md`, et propose une version naturalisée qui conserve le sens, la structure éditoriale et la voix de l'auteur.

## Quand l'activer

- L'utilisateur fournit un brouillon d'article et demande une relecture, une réécriture, un "deslopify", une naturalisation.
- L'utilisateur rédige un nouvel article depuis zéro : appliquer les règles de `references/marqueurs-ia.md` en amont (prévention) plutôt qu'en aval (correction).
- L'utilisateur pointe un fichier dans `_posts/` et demande de vérifier qu'il ne sonne pas IA.
- L'utilisateur colle un texte ou une URL et demande une version « plus humaine ».

## Procédure

1. **Lire le texte cible** (fichier, texte collé, ou URL fetchée).
2. **Charger `references/marqueurs-ia.md`** pour avoir la liste exhaustive des marqueurs à éliminer.
3. **Identifier les marqueurs** en listant par catégorie : lexique, structures, ponctuation, ton. Cite les occurrences avec leur ligne quand c'est un fichier.
4. **Proposer une réécriture** qui :
   - Conserve le sens technique et les informations vérifiables (chiffres, noms propres, citations).
   - Préserve la voix de l'auteur (Angelo Lima : ton direct, franco-portugais, technique avec touches personnelles ; voir anciens articles dans `_posts/` pour référence).
   - Remplace les formules génériques par du contenu spécifique (exemples concrets, anecdotes, chiffres).
   - Réduit la longueur quand le texte tourne en rond.
5. **Présenter les changements** sous forme de diff ou d'avant/après pour les passages significatifs, pas ligne par ligne pour les retouches mineures.
6. **Ne pas toucher** : les extraits de code, les citations directes, les termes techniques précis même s'ils figurent dans la liste (ex. « crucial » peut être légitime dans un contexte sécurité, « explorer » en contexte scientifique).

## Principes de réécriture

- **Du concret, pas du générique.** Remplacer « dans le paysage en constante évolution du développement web » par un fait daté et chiffré.
- **Une voix, pas un ton neutre.** Garder les « je », les anecdotes, les opinions tranchées.
- **Test du concurrent.** Si un concurrent de l'auteur pouvait signer le paragraphe sans changer un mot, il est trop générique — le réécrire.
- **Couper, ne pas reformuler.** Beaucoup de slop disparaît en supprimant des phrases entières plutôt qu'en les adoucissant.
- **Refuser le rythme ternaire systématique.** Les IA alignent trois exemples par réflexe ; deux ou quatre sont souvent plus justes.
- **Tirets cadratins (—).** Les remplacer par virgules, points, ou parenthèses sauf si l'auteur les utilise déjà volontairement ailleurs.
- **Participe présent après virgule.** Casser en deux phrases ou introduire une conjonction explicite.

## Ambiguïtés

Si un pattern peut être soit légitime soit du slop selon le contexte, **demander** à l'utilisateur avant de réécrire. Exemples : un article sur la cybersécurité peut légitimement employer « crucial » ou « sensible » ; un article scientifique peut légitimement « explorer » un sujet.

## Sortie attendue

- Un résumé des marqueurs trouvés, groupés par catégorie.
- Une version réécrite, prête à coller dans le fichier Markdown du blog.
- Pour les articles longs, proposer la réécriture par sections (intro, développement, conclusion) pour garder le contexte maîtrisable.

## Contexte spécifique au blog

Ce blog est bilingue (FR primaire, EN secondaire) et publie sur des sujets IA / dev / sécurité. Les marqueurs sont donc particulièrement traîtres : un article sur les LLM qui parle de « plonger dans les entrailles de l'IA » est une ironie involontaire. Être vigilant sur les articles méta (IA écrivant sur l'IA) : c'est là que le slop est le plus indétectable par l'auteur lui-même.
