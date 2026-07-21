---
title: "Le Portugal a fait son IA. J'ai voulu savoir si elle me parlait vraiment portugais."
subtitle: "Amália, 9 milliards de paramètres, 5,5 millions d'euros, soixante chercheurs. Un cas d'école pour comprendre ce que veut dire « souveraineté IA » quand on arrête les discours et qu'on regarde le modèle."
description: "Amália, premier grand modèle de langue pour le portugais du Portugal, est sorti le 1er juillet 2026. Ce qu'il y a dedans, ce que ça vaut, pourquoi ça compte."
date: 2026-07-21T12:00:00.000Z
lang: fr
translationKey: "amalia-portuguese-ai"
slug: "amalia-ia-portugaise-souverainete"
tags:
  - "IA"
  - "Tech"
  - "Personnel"
author: "Angelo Lima"
thumbnail: "/assets/img/amalia-ia-portugal.png"
shareImg: "/assets/img/amalia-ia-portugal.png"
aliases:
  - "/2026-07-21-amalia-ia-portugaise-souverainete/"
faq:
  - q: "Qu'est-ce qu'Amália ?"
    a: "Amália est le premier grand modèle de langue (LLM) conçu pour le portugais du Portugal, présenté le 1er juillet 2026 à Lisbonne. C'est un modèle de fondation open source de 9 milliards de paramètres, dérivé du modèle européen EuroLLM, et non une application grand public comme ChatGPT."
  - q: "Amália est-il gratuit et open source ?"
    a: "Oui. Amália est publié sous licence Apache 2.0 : tout le monde peut le télécharger, le modifier et l'utiliser, y compris commercialement, sans demander de permission. Ses poids sont disponibles sur Hugging Face."
  - q: "Amália est-il un concurrent de ChatGPT ?"
    a: "Non. Amália est un modèle de fondation (un « moteur »), pas une application conversationnelle. C'est une brique que des entreprises, des administrations ou des universités peuvent utiliser pour construire leurs propres outils, là où ChatGPT est un produit fini destiné au grand public."
  - q: "Peut-on faire tourner Amália sur son ordinateur ?"
    a: "Oui. Des versions compressées existent pour Ollama et LM Studio. La version optimisée pour Mac tourne à environ 55 mots par seconde dans 6 Go de mémoire, ce qui passe sur un MacBook d'entrée de gamme."
  - q: "Amália parle-t-il le portugais du Portugal ou du Brésil ?"
    a: "Amália est spécifiquement conçu pour le portugais du Portugal (portugais européen), là où la plupart des modèles internationaux répondent en portugais du Brésil. L'équipe a même créé un test dédié pour mesurer la tendance du modèle à dériver vers le brésilien."
---
Il y a une chose que les gens qui ont grandi entre deux langues connaissent bien : le moment où un outil vous fait sentir que l'une des deux compte moins que l'autre. Le correcteur orthographique qui souligne votre nom de famille en rouge. Le formulaire qui refuse les accents. Et, depuis trois ans, le chatbot à qui vous parlez en portugais et qui vous répond dans un portugais impeccable… du Brésil.

Ce n'est pas grave. Ce n'est jamais grave. C'est juste un petit rappel, mille fois répété, que la langue de vos grands-parents est traitée comme une variante d'autre chose.

Alors quand le Portugal a présenté **Amália** le 1er juillet 2026 à Lisbonne, son premier grand modèle d'intelligence artificielle, nommé d'après la fadiste Amália Rodrigues, j'ai eu envie d'aller voir sous le capot. Pas pour applaudir, pas pour démolir. Pour comprendre ce qu'il y a réellement dedans, et ce que ça dit du reste de l'Europe.

> **L'essentiel**
>
> - **Quoi** : Amália, premier grand modèle de langue (LLM) pour le portugais du Portugal, présenté le 1er juillet 2026 à Lisbonne.
> - **Taille et licence** : 9 milliards de paramètres, licence libre Apache 2.0, poids sur Hugging Face.
> - **Ce que c'est vraiment** : un modèle de fondation (un « moteur »), pas un ChatGPT portugais. Dérivé du modèle européen EuroLLM.
> - **Ce que ça vaut** : bat les modèles comparables sur la plupart des tests de portugais, mais reste derrière Qwen 3-8B sur le test le plus exigeant.
> - **Pourquoi ça compte** : un précédent de souveraineté linguistique pour les langues européennes « peu dotées », pour 5,5 millions d'euros et soixante chercheurs.

## D'abord, de quoi on parle

Un petit détour de vocabulaire, parce que toute la confusion vient de là.

Quand vous utilisez ChatGPT, vous utilisez deux choses empilées. En bas, il y a le **modèle** : un énorme fichier de calculs qui, à partir d'un texte, prédit la suite. En haut, il y a l'**application** : l'interface, la mémoire des conversations, les garde-fous, le bouton de partage. ChatGPT est l'application ; GPT est le modèle.

**Amália, c'est uniquement l'étage du bas.** Un modèle de fondation, comme on dit. Une brique que des entreprises, des administrations ou des universités peuvent télécharger gratuitement pour construire leurs propres outils par-dessus. Ce n'est pas un concurrent de ChatGPT. Ce n'est pas un site où vous allez poser des questions. C'est le moteur, pas la voiture.

Cette distinction paraît anodine. Elle ne l'est pas : c'est elle qui explique pourquoi tant de gens vont trouver Amália décevant. On leur a vendu « l'IA portugaise », ils ont compris « le ChatGPT portugais », et ils vont télécharger un moteur.

Les responsables du projet, eux, sont clairs sur ce point. Paulo Dimas, du Center for Responsible AI, l'a dit la veille de la présentation : il ne s'agit pas d'un système conversationnel qui résout tous les problèmes, mais d'une pièce d'intelligence artificielle qui garantit trois souverainetés (la langue, la culture, les données) que n'importe qui peut télécharger et intégrer.

## Ce qu'il y a dans la boîte

Les chiffres, rapidement, en français normal.

**9 milliards de paramètres.** C'est la taille du modèle. À titre de comparaison, les modèles des géants américains se comptent en centaines de milliards. Amália joue dans la catégorie « petit modèle », et c'est assumé : un modèle de cette taille tourne sur une machine ordinaire.

**5,5 millions d'euros**, financés par le plan de relance européen, plus 1,5 million supplémentaire prévu jusqu'en 2027. C'est beaucoup pour un projet de recherche universitaire. C'est dérisoire à l'échelle du secteur : les grands laboratoires américains dépensent cette somme en quelques heures de calcul.

**Soixante chercheurs**, réunis en consortium autour de la NOVA, de l'IST, de l'Institut des télécommunications et de la FCT, avec des collaborations à Beira Interior, Évora et l'ISEL.

**Licence Apache 2.0**, c'est-à-dire : tout le monde peut le télécharger, le modifier, le vendre. Pas de permission à demander. Les poids sont sur Hugging Face, la plateforme où s'échangent les modèles ouverts.

Et un détail technique qui compte plus que tous les autres : **Amália n'a pas été construit de zéro**. C'est la suite d'un modèle européen existant, EuroLLM, que l'équipe a repris et poussé vers le portugais du Portugal. On ne repart pas d'une page blanche, on prend un modèle déjà entraîné et on continue son apprentissage avec des données ciblées.

C'est une décision parfaitement raisonnable : avec 5,5 millions, on ne construit pas un modèle de zéro, on n'en approche même pas le coût. Mais c'est une décision qu'il faut nommer pour ce qu'elle est, plutôt que de laisser dire « le Portugal a développé son intelligence artificielle ».

## La question à 5,5 %

Voilà le chiffre qui m'a fait tiquer, et il vient d'un développeur portugais, Duarte O.Carmo, qui a fait le calcul avant tout le monde.

Pour spécialiser le modèle, l'équipe lui a fait avaler 107 milliards de mots-fragments supplémentaires. Là-dedans, la seule partie clairement identifiée comme du portugais du Portugal, les archives web d'Arquivo.pt, en représente 5,8 milliards.

**Soit environ 5,5 %.**

Sur la phase suivante, l'ajustement aux instructions, la proportion monte à 17-18 %. Et il y avait déjà du portugais dans le modèle de départ, sans qu'on sache exactement combien, ni s'il s'agissait de portugais européen ou brésilien.

D'où la question, que je pose sans réponse tranchée : à partir de quel dosage un modèle devient-il vraiment portugais ? Est-ce que 5,5 % suffisent à renverser les réflexes d'un modèle nourri majoritairement d'anglais ?

Les résultats disent que ça aide beaucoup. Amália bat des modèles internationaux de taille comparable, comme Qwen 3-8B, sur la plupart des tests de portugais. C'est une vraie victoire, et elle mérite d'être saluée. Mais sur le test le plus exigeant, celui que l'équipe a elle-même conçu et baptisé ALBA, **Qwen 3-8B garde l'avantage**. Un modèle chinois généraliste, qui n'a fait aucun entraînement spécifique au portugais.

Ce résultat est le plus intéressant de tout le rapport, parce qu'il pose la question qui fâche : est-ce qu'un petit modèle très localisé rend un meilleur service qu'un gros modèle généraliste bien construit ? Ça dépend du cas d'usage. Mais personne ne le formule aussi crûment dans les communiqués de presse.

## Ce qu'on a oublié de mesurer

L'équipe a créé quatre nouveaux tests d'évaluation spécifiques au portugais européen. Grammaire, syntaxe, culture générale, et (bon point) la tendance du modèle à déraper vers le portugais brésilien. C'est du travail sérieux, et c'est peut-être ce que le projet laissera de plus durable : les modèles vieillissent en deux ans, les instruments de mesure restent.

Mais il manque quelque chose, et c'est exactement ce qui m'intéressait au départ. Ces tests mesurent si le modèle **parle** bien portugais. Ils ne mesurent pas s'il **connaît** le Portugal.

Quel est le dessert typique d'Aveiro. Qui présidait le pays entre 1978 et 1985. Comment fonctionne une junta de freguesia. Ce que veut dire *desenrascanço*, et pourquoi ça ne se traduit pas.

C'est pourtant là toute la promesse d'un modèle souverain : un petit modèle qui en sait plus sur son pays qu'un géant américain qui en sait un peu sur tout. Et c'est précisément la dimension qui n'est pas évaluée. Un angle mort de mesure, pas de conception. Et je note que le jeu de données `PT-Culture_Data` continue de bouger sur le Hub, ce qui laisse penser que l'équipe en est parfaitement consciente.

## Le Portugal n'est pas seul

Ce qui rend Amália intéressant, c'est qu'il n'est pas une exception. Toute l'Europe s'y est mise, à trois niveaux.

**Les projets européens.** EuroLLM, le modèle dont dérive Amália, existe désormais en version 22 milliards de paramètres, le plus gros modèle ouvert entièrement développé en Europe, qui couvre les 24 langues officielles de l'Union. La Commission européenne, de son côté, construit discrètement son propre modèle interne à partir de Mistral, enrichi de ses immenses archives de traduction, avec un objectif d'égalité linguistique : au moins un milliard de mots-fragments pour chaque langue peu dotée.

**Les modèles nationaux.** C'est la famille d'Amália. La Suisse a **Apertus** (8 et 70 milliards de paramètres, remarquable sur le suisse allemand et le romanche), l'Italie a **Minerva**, la Slovénie **GaMS**, les Pays-Bas **GPT-NL**, l'Allemagne **PhariaAI**.

**Le privé.** [Mistral](/fr/arthur-mensch-mistral-ai-audition-assemblee-nationale/), seul Européen à jouer vraiment dans la cour des grands.

Ces trois familles ne visent pas la même chose, et c'est là que naissent les malentendus. Mistral vise la performance de marché. EuroLLM vise l'infrastructure partagée. Amália vise la survie culturelle d'une langue de dix millions de locuteurs dans un monde numérique qui, spontanément, ne la voit pas.

Comparer Amália à GPT-5, c'est comparer une école de village à une université. Ce n'est pas la même fonction.

## Pourquoi ça me touche, et pourquoi ça devrait vous parler aussi

Je vais être direct sur ce point, parce que c'est de là que vient mon intérêt pour ce sujet.

Grandir entre la France et le Portugal, c'est avoir une intuition très concrète de ce dont on parle quand on dit « souveraineté culturelle ». Ce n'est pas un concept de séminaire. C'est un cousin qui ne comprend pas la moitié de ce qu'on lui dit. C'est une langue qu'on parle un peu moins bien chaque année. C'est un patrimoine qui existe surtout à l'oral, et que personne n'a numérisé, parce qu'il n'y a jamais eu de raison commerciale de le faire.

Un modèle d'IA, ce n'est jamais neutre. Il apprend sur ce qui existe en quantité, en ligne, dans un format exploitable. Autrement dit : il apprend sur l'anglais, et un peu sur les grandes langues qui ont eu la chance d'avoir une industrie du numérique. Tout le reste devient une variante, une exception, un cas particulier. Le portugais du Portugal est traité comme un dialecte du brésilien pour une raison entièrement mécanique : il y a vingt fois plus de Brésiliens.

C'est très exactement le problème que le basque, le breton, le catalan, le gallois, le slovène et le romanche vont rencontrer, en pire. Amália est un précédent utile : il montre qu'avec 5,5 millions d'euros et soixante chercheurs, on peut faire remonter une langue au niveau de la première classe. Pas parfaitement. Mais suffisamment pour que ce ne soit plus une fatalité.

Et pour être honnête jusqu'au bout : j'ai fait tourner le modèle. Il parle un portugais du Portugal, un vrai, avec les bonnes tournures. Sur ce qu'il *sait* du pays, il reste un modèle de 9 milliards de paramètres avec des connaissances arrêtées à juin 2024. Ce n'est pas une déception. C'est simplement un moteur, et l'étape suivante consiste à construire la voiture autour.

## Concrètement, aujourd'hui

Trois choses à retenir pour qui construit des outils.

**Ça tourne chez vous.** Des versions compressées existent pour les outils grand public (Ollama, LM Studio). La version optimisée pour Mac tourne à environ 55 mots par seconde dans 6 Go de mémoire : ça passe sur un MacBook d'entrée de gamme. On est très loin du modèle de démonstration qui exige une salle serveur.

**Ça change le calcul du risque.** Depuis juin 2026, plus personne n'a besoin qu'on lui explique pourquoi dépendre entièrement d'une interface étrangère est un risque opérationnel plutôt qu'une posture idéologique. Un modèle libre hébergé chez soi ne remplace pas tout. Mais pour trier, extraire, reformuler, anonymiser, classer (l'immense majorité des usages réels en entreprise), c'est amplement suffisant.

**Ça pose la bonne question.** Pas « quel est le meilleur modèle », mais « quelles tâches méritent vraiment un modèle de pointe ». Faire cohabiter un petit modèle local pour le volume et un grand modèle distant pour les cas complexes est aujourd'hui banal à mettre en œuvre. C'est probablement comme ça que la souveraineté entrera réellement en production : pas par décret, par découpage du travail.

## Ce que j'en retiens

Amália est un travail solide, et il faut le dire avant de critiquer : soixante chercheurs, un rapport technique public, des tests originaux, des poids réellement libres, une version capable de lire des images. Beaucoup d'annonces gouvernementales sur l'IA ont produit strictement moins.

Mes réserves sont ailleurs. Il y a un **écart entre le discours et l'objet** : on annonce une IA nationale, on livre une spécialisation de modèle européen à 5,5 % de données ciblées. Les deux se défendent ; un seul est honnête. Il y a une **évaluation incomplète**, qui ne mesure pas encore la chose même qui justifie le projet. Et il y a une question que personne ne pose : et en 2028 ?

Un modèle n'est pas un pont. On ne l'inaugure pas une fois pour trente ans. C'est un actif qui se démode en deux ans. 1,5 million jusqu'en 2027, et après ? La souveraineté par le modèle a une date de péremption. La souveraineté par les **données, les évaluations et les compétences**, elle, dure. Et c'est ironiquement ce que le projet Amália a produit de plus solide, sans que ce soit son objectif affiché.

L'Europe ne gagnera pas la course au modèle le plus puissant. Ce n'est pas grave, à condition d'arrêter de faire semblant que c'est le but. Ce qu'elle peut gagner, c'est le droit de faire tourner ses services publics dans sa propre langue sans dépendre d'une décision prise ailleurs.

Amália est un pas dans cette direction. Un pas de 9 milliards de paramètres, et un nom de fadiste. Pour un projet dont l'enjeu est de ne pas perdre sa voix, le choix est plutôt bien trouvé.

## Pour aller plus loin

- **Le rapport technique** : [arXiv 2603.26511](https://arxiv.org/html/2603.26511) — technique, mais lisible.
- **Les modèles à télécharger** : [huggingface.co/amalia-llm](https://huggingface.co/amalia-llm).
- **L'analyse critique de Duarte O.Carmo** : [AMÁLIA and the future of European Portuguese LLMs](https://duarteocarmo.com/blog/amalia-and-the-future-of-european-portuguese-llms), c'est de là que vient le calcul des 5,5 %.
- **Le site officiel** : [amaliallm.pt](https://amaliallm.pt/).
- **La souveraineté vue de France** : [ce qu'a dit Arthur Mensch à l'Assemblée nationale](/fr/arthur-mensch-mistral-ai-audition-assemblee-nationale/).
- **Faire tourner un modèle chez soi** : [Ollama en 2026](/fr/ollama-2026-etat-des-lieux/).
- **Le vrai coût des grands modèles** : [l'impact écologique de l'IA, entraînement contre inférence](/fr/IA-impact-ecologique/).

---

*Amália a été présenté le 1er juillet 2026 à Lisbonne. Modèle de 9 milliards de paramètres, licence Apache 2.0, dérivé d'EuroLLM. Article rédigé le 21 juillet 2026.*
