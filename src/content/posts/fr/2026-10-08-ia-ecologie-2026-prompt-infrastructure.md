---
title: "IA et écologie en 2026 : le prompt est léger, l'infrastructure est lourde"
subtitle: "Un prompt consomme 0,24 Wh. Les data centers, eux, pourraient consommer autant que le Japon en 2030. Les deux chiffres sont vrais, et c'est tout le problème."
description: "Un prompt consomme 0,24 Wh, mais les data centers doubleront leur électricité et leur eau d'ici 2030. Les chiffres 2026 et ce que les devs peuvent faire."
date: 2026-10-08T00:30:00.000Z
lang: fr
translationKey: "ai-ecology-2026"
slug: "ia-ecologie-2026-prompt-infrastructure"
tags:
  - "IA"
  - "Tech"
  - "Développement"
author: "Angelo Lima"
thumbnail: "/assets/img/ia-ecologie-2026.webp"
shareImg: "/assets/img/ia-ecologie-2026.webp"
aliases:
  - "/2026-10-08-ia-ecologie-2026-prompt-infrastructure/"
faq:
  - q: "Combien d'énergie consomme un prompt d'IA en 2026 ?"
    a: "Un prompt texte standard consomme entre 0,24 et 0,34 Wh en 2026. Google mesure 0,24 Wh, 0,03 g de CO₂e et 0,26 mL d'eau pour la requête médiane dans Gemini ; OpenAI annonce environ 0,34 Wh pour une requête moyenne dans ChatGPT. C'est moins qu'une ampoule LED allumée deux minutes."
  - q: "Un prompt ChatGPT consomme-t-il une bouteille d'eau ?"
    a: "Non. Cette comparaison venait d'une étude de 2023 qui estimait 10 à 50 mL d'eau par prompt pour GPT-3. La mesure publiée par Google en 2025 donne 0,26 mL par requête texte médiane dans Gemini, soit 40 à 200 fois moins."
  - q: "Combien d'électricité consomment les data centers dans le monde ?"
    a: "Les data centers ont consommé environ 448 TWh en 2025 selon l'Université des Nations unies, et devraient atteindre 945 TWh en 2030, soit à peu près la consommation du Japon. Gartner estime 565 TWh pour 2026."
  - q: "L'IA est-elle un fardeau écologique ?"
    a: "L'IA n'est pas un fardeau au niveau individuel : un prompt pèse très peu. Elle le devient au niveau collectif, avec une demande électrique des data centers qui doit doubler d'ici 2030 sur un mix encore en partie fossile, et surtout au niveau local, là où les data centers pèsent sur l'eau et les réseaux électriques."
  - q: "Comment réduire l'impact environnemental de l'IA quand on développe ?"
    a: "Le levier principal est le dimensionnement : router chaque tâche vers le plus petit modèle suffisant, mesurer les tokens consommés par tâche terminée, plafonner les boucles des agents et utiliser le cache. Choisir une région cloud décarbonée et peu exposée au stress hydrique change aussi le bilan."
---
*Un prompt consomme moins qu'une ampoule LED allumée deux minutes. Et pourtant, l'IA est en train de devenir une vraie charge pour les réseaux électriques et les ressources en eau. Les deux phrases sont vraies. C'est tout le problème.*

En 2025, j'ai écrit [un article sur le coût écologique de l'IA](/fr/IA-impact-ecologique/). La question qui structurait le débat à l'époque : qu'est-ce qui pèse le plus, entraîner un modèle ou l'utiliser ?

Un an et demi plus tard, cette question est largement tranchée. Et le débat a changé de terrain. On ne se dispute plus vraiment sur le coût d'un prompt : les géants de l'IA ont fini par publier des mesures. On se dispute sur le volume total, sur l'eau, sur le matériel, et sur ce que les agents vont faire de tout ça.

Alors, dire que l'IA est un fardeau écologique, c'est vrai ou c'est faux ? J'ai repris les chiffres disponibles en octobre 2026 pour y répondre.

> **L'essentiel**
>
> - **Un prompt** : 0,24 Wh, 0,03 g de CO₂e et 0,26 mL d'eau pour une requête texte médiane dans Gemini (Google, 2025). Environ 0,34 Wh dans ChatGPT selon OpenAI.
> - **Les data centers** : 448 TWh en 2025, 945 TWh projetés en 2030, soit à peu près le Japon (Université des Nations unies, juin 2026).
> - **Le paradoxe** : l'énergie par tâche d'IA est divisée par près de dix chaque année, mais la demande des data centers a augmenté de 17 % en 2025.
> - **L'angle mort** : l'eau (consommation doublée d'ici 2030) et la fabrication des puces, qui domine plusieurs catégories d'impact d'un GPU.
> - **Le verdict** : faux au niveau individuel, vrai au niveau collectif, surtout vrai au niveau local.

## Le prompt, un poids plume

Un prompt texte standard consomme aujourd'hui entre 0,24 et 0,34 Wh. C'est la première grande nouveauté depuis 2025 : on n'en est plus aux estimations, on a des mesures.

- **Google** a instrumenté son infrastructure pendant un an. La requête texte médiane dans Gemini consomme 0,24 Wh, émet 0,03 g de CO₂e et utilise 0,26 mL d'eau ([source](https://www.alphaxiv.org/abs/2508.15734.md)). Sur la même période, Google annonce une baisse de 33 fois de l'énergie par prompt.
- **OpenAI** annonce environ 0,34 Wh pour une requête moyenne dans ChatGPT.
- **Mistral** a publié une analyse de cycle de vie complète de Mistral Large 2, fabrication des serveurs comprise, en suivant le référentiel AFNOR de l'IA frugale et avec l'ADEME et Carbone 4 ([source](https://www.eesel.ai/blog/energy-ai)).

Ces chiffres font s'effondrer les comparaisons choc qui circulaient il y a deux ans, du type « une bouteille d'eau par requête ». Une étude de 2023 estimait 10 à 50 mL d'eau par prompt pour GPT-3, soit 40 à 200 fois plus que la mesure de Google ([source](https://www.deeplearning.ai/the-batch/google-study-directly-measures-electricity-water-use-and-greenhouse-emissions-of-its-models)).

Il faut quand même les lire avec prudence. Google donne une médiane et non une moyenne, ne précise ni la longueur ni la complexité des prompts, et son périmètre ne couvre que l'application Gemini. Les chiffres de Google et d'OpenAI ne sont pas directement comparables ([source](https://towardsdatascience.com/?p=606934)). Ils donnent un ordre de grandeur, pas une vérité à la décimale.

## Un prompt face aux objets du quotidien

Pour un usage courant, une voiture électrique ou un air fryer consomment nettement plus qu'un chatbot. Vingt minutes d'air fryer valent environ 2 000 prompts texte, un trajet de 10 km en voiture électrique compacte environ 7 000, et le même trajet en gros SUV électrique plus de 10 000.

[![Un prompt texte (0,24 Wh) consomme environ 2 000 fois moins que 20 minutes d'air fryer (500 Wh). Un long prompt de raisonnement (33 Wh) dépasse deux recharges de smartphone.](/assets/img/ia-ecologie-prompt-objets-fr.svg)](/assets/img/ia-ecologie-prompt-objets-fr.svg)

Trois réserves empêchent d'en tirer une conclusion trop rapide :

- **Tous les prompts ne se valent pas.** Un long prompt de raisonnement consomme déjà plus que deux recharges de smartphone. Une tâche agentique lourde peut valoir plusieurs kilomètres en voiture électrique.
- **Il faut regarder ce que chaque usage remplace.** La voiture électrique remplace une thermique, l'air fryer souvent un four : ils peuvent réduire l'impact global. Une bonne partie de l'usage de l'IA s'ajoute sans rien remplacer.
- **On ne compte ici que l'électricité d'usage.** La fabrication de la batterie d'une voiture ou des GPU d'un data center change le tableau, comme on va le voir.

## Le paradoxe : chaque tâche coûte moins, le total explose

En 2025, la demande électrique des data centers a augmenté de 17 %, contre 3 % pour la demande électrique mondiale. Sur la même période, l'énergie par tâche d'IA a été divisée par près de dix chaque année ([source](https://www.seforall.org/news/three-numbers-that-define-ais-energy-decade)).

C'est un paradoxe de Jevons presque parfait. Quand une ressource devient moins chère à utiliser, on l'utilise tellement plus que la consommation totale augmente. Plus d'utilisateurs, plus d'usages, et des usages plus lourds : agents, vidéo, modèles de raisonnement.

Les projections vont toutes dans le même sens, celui d'un doublement d'ici la fin de la décennie ([ONU](https://insurancejournal.com/magazines/mag-features/2026/06/22/874414.htm), [Gartner](https://www.corrierecomunicazioni.it/?p=344937)).

[![Électricité des data centers dans le monde : 448 TWh mesurés en 2025, 565 TWh projetés en 2026 (Gartner), 945 TWh projetés en 2030 (ONU), soit environ la consommation du Japon.](/assets/img/ia-ecologie-electricite-fr.svg)](/assets/img/ia-ecologie-electricite-fr.svg)

Et cette électricité n'est pas propre : selon l'AIE, environ 40 % de la consommation supplémentaire des data centers d'ici 2030 sera encore couverte par le gaz et le charbon ([source](https://ttms.com/growing-energy-demand-of-ai-data-centers-2024-2026/)).

L'impact est aussi très concentré. Les data centers représentent déjà plus de 20 % de l'électricité irlandaise, contre 2 à 3 % en moyenne dans l'UE ([source](https://www.seforall.org/news/three-numbers-that-define-ais-energy-decade)). L'IA ne fait pas tomber le réseau mondial. Elle peut saturer un réseau local.

## Au-delà du carbone : l'eau, le matériel, les déchets

Le carbone n'est qu'une partie de l'impact, et probablement pas la plus préoccupante. Kaveh Madani, auteur principal du rapport onusien de juin 2026, le résume bien : le débat traite encore l'IA comme un logiciel, alors que c'est une infrastructure physique faite de centrales, de puces, de minerais, de terres et d'eau ([source](https://insurancejournal.com/magazines/mag-features/2026/06/22/874414.htm)).

[![Data centers dans le monde : l'eau consommée passe de 4 500 à 9 300 milliards de litres entre 2025 et 2030, les émissions de CO₂ de 189 à 399 millions de tonnes.](/assets/img/ia-ecologie-eau-co2-fr.svg)](/assets/img/ia-ecologie-eau-co2-fr.svg)

**Le carbone, significatif mais pas démesuré.** Les data centers émettent déjà autant de CO₂ que l'Argentine ([source](https://www.sej.org/node/53023)). Rapporté aux quelque 37 milliards de tonnes émises chaque année dans le monde, cela représente autour de 0,5 %, et l'IA n'en pèse qu'une partie. Les hyperscalers affirment tirer 92 % de leur énergie de sources décarbonées, mais en partie via des contrats d'achat ([source](https://www.structureresearch.net/?p=106902)).

**L'eau, le vrai point chaud.** Selon l'ONU, la consommation d'eau des data centers devrait plus que doubler d'ici 2030 ([source](https://insurancejournal.com/magazines/mag-features/2026/06/22/874414.htm)). Plus de 21 % des data centers américains sont installés dans des bassins en stress hydrique moyen à élevé ([source](https://voxbooster.com/blog/data-center-water-use-statistics-2026/)). Et les chiffres déclarés sont sous-estimés : l'eau consommée par les centrales qui les alimentent serait environ 12 fois supérieure à la consommation directe ([source](https://en.fnnews.com/news/202607040406311808)).

**La fabrication, l'angle mort.** Une analyse de cycle de vie du GPU Nvidia A100 montre que la fabrication domine plusieurs catégories d'impact sur l'ensemble du cycle de vie, bien au-delà du seul carbone ([source](https://arxiv.org/html/2509.00093v1)). Cobalt, tungstène, lithium : chaque puce en contient peu, mais la demande grimpe vite.

[![Part de la fabrication dans l'impact sur tout le cycle de vie d'un GPU Nvidia A100 : 94 % pour la toxicité humaine (cancer), 81 % pour l'eutrophisation de l'eau douce, 71 % pour l'épuisement des minerais et métaux.](/assets/img/ia-ecologie-gpu-fabrication-fr.svg)](/assets/img/ia-ecologie-gpu-fabrication-fr.svg)

**Les déchets électroniques.** Un GPU haut de gamme peut être dépassé en moins de deux ans ([source](https://jointings.org/eng/?p=1436)). Or seulement 22 % des déchets électroniques sont collectés et recyclés dans le monde ([source](https://ecolecanada.gc.ca/tools/articles/ai-environmental-effects-eng.aspx)).

## Les agents font remonter le coût par tâche

Le débat entraînement contre inférence de mon article de 2025 est tranché : plus de 80 % de la consommation électrique de l'IA vient aujourd'hui de la phase d'usage ([source](https://www.arbor.eco/blog/ai-environmental-impact)). Un modèle s'entraîne une fois. Il répond des milliards de fois.

Et l'usage change de nature. Un long prompt de raisonnement avancé peut dépasser 33 Wh, soit plus de 130 fois un prompt texte standard ([source](https://www.arbor.eco/blog/ai-environmental-impact)). Un agent de code qui enchaîne des dizaines d'appels, relit des fichiers, lance des tests et recommence, c'est encore une autre échelle.

C'est là que le discours « le coût par token baisse » devient trompeur. Le coût par token baisse, oui. Mais le nombre de tokens par tâche explose. Je le vois au quotidien en travaillant sur une plateforme agentique : la question pertinente n'est plus « combien coûte un prompt », mais « combien coûte une tâche terminée ». C'est la même logique que pour [la facture de Claude Code](/fr/claude-code-facturation-couts/) : ce qui compte, c'est le total de la session.

## Alors, fardeau écologique : vrai ou faux ?

**Les deux, selon l'échelle où l'on se place.**

- **Faux au niveau individuel.** Votre prompt ne détruit pas la planète. Culpabiliser quelqu'un qui pose une question à un chatbot, pendant qu'il prend sa voiture pour aller chercher du pain, n'a pas de sens.
- **Vrai au niveau collectif.** L'IA est devenue une charge significative et croissante pour les réseaux électriques, avec un mix encore largement fossile.
- **Surtout vrai au niveau local.** L'eau, la saturation des réseaux et l'opposition des riverains se jouent là où les data centers s'installent.
- **Sous-estimé côté matériel.** La fabrication des puces et les déchets électroniques restent les grands absents des chiffres par prompt.

L'ONU résume bien la position nuancée : l'IA ne va pas épuiser l'eau ou l'électricité à l'échelle mondiale, mais une expansion mal planifiée peut entrer en collision avec des ressources déjà sous tension à certains endroits ([source](https://english.aaj.tv/news/amp/330459838)).

## Ce qu'on peut faire, côté dev et équipes

Le levier principal n'est pas l'abstinence, c'est le dimensionnement. L'analyse de Mistral montre que l'impact suit à peu près la taille du modèle : un modèle dix fois plus gros coûte environ dix fois plus pour le même nombre de tokens ([source](https://www.eesel.ai/blog/energy-ai)).

1. **Router vers le bon modèle.** Un petit modèle pour classer, résumer ou extraire, éventuellement [en local avec Ollama](/fr/ollama-2026-etat-des-lieux/). Le gros modèle de raisonnement seulement quand la tâche le justifie.
2. **Mesurer par tâche, pas par prompt.** Suivre les tokens consommés par tâche terminée, surtout pour les agents.
3. **Limiter les boucles.** Plafonner les itérations d'un agent, mettre en cache, éviter de recharger tout le contexte à chaque appel.
4. **Choisir où tourne le calcul.** Une région cloud à l'électricité décarbonée et peu exposée au stress hydrique change réellement le bilan.
5. **Se demander si l'IA est nécessaire.** C'est la première question du référentiel AFNOR de l'IA frugale ([source](https://www.banquedesterritoires.fr/12-territoires-selectionnes-pour-concevoir-lia-frugale-au-service-de-la-transition-ecologique)). Une regex reste moins chère qu'un LLM.

Un prompt ne pèse rien. Une architecture agentique mal dimensionnée, déployée à des milliers d'utilisateurs, pèse beaucoup. C'est là que se joue notre responsabilité d'ingénieurs.

## Sources

- [Google : Measuring the environmental impact of delivering AI at Google Scale](https://www.alphaxiv.org/abs/2508.15734.md)
- [Towards Data Science : Google's Gemini disclosure, progress or greenwashing?](https://towardsdatascience.com/?p=606934)
- [The Batch : Gemini's Environmental Impact Measured](https://www.deeplearning.ai/the-batch/google-study-directly-measures-electricity-water-use-and-greenhouse-emissions-of-its-models)
- [eesel : Energy and AI in 2026, what the per-prompt numbers don't tell you](https://www.eesel.ai/blog/energy-ai)
- [Arbor : AI's Environmental Impact, A Full Lifecycle Analysis](https://www.arbor.eco/blog/ai-environmental-impact)
- [SEforALL : Three Numbers That Define AI's Energy Decade](https://www.seforall.org/news/three-numbers-that-define-ais-energy-decade)
- [Corriere Comunicazioni : Gartner, consommation des data centers en 2026](https://www.corrierecomunicazioni.it/?p=344937)
- [TTMS : AI Data Centers Energy Consumption 2024-2026](https://ttms.com/growing-energy-demand-of-ai-data-centers-2024-2026/)
- [Insurance Journal / Reuters : rapport de l'Université des Nations unies, juin 2026](https://insurancejournal.com/magazines/mag-features/2026/06/22/874414.htm)
- [AP via SEJ : Energy, Water Use and Pollution of AI and Data Centers Rival Most Countries](https://www.sej.org/node/53023)
- [Structure Research : 2026 State of Environmental Impact Report](https://www.structureresearch.net/?p=106902)
- [Voxbooster : Data center water use statistics 2026](https://voxbooster.com/blog/data-center-water-use-statistics-2026/)
- [FN News : consommation d'eau réelle des data centers](https://en.fnnews.com/news/202607040406311808)
- [arXiv : More than Carbon, cradle-to-grave impacts of the Nvidia A100](https://arxiv.org/html/2509.00093v1)
- [Joint Effect : AI e-waste](https://jointings.org/eng/?p=1436)
- [École Canada : AI environmental effects](https://ecolecanada.gc.ca/tools/articles/ai-environmental-effects-eng.aspx)
- [Banque des Territoires : IA frugale et référentiel AFNOR](https://www.banquedesterritoires.fr/12-territoires-selectionnes-pour-concevoir-lia-frugale-au-service-de-la-transition-ecologique)
