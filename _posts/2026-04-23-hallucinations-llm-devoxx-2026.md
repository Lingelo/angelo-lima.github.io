---
layout: post
title: "Comprendre, mesurer et maîtriser les hallucinations des LLMs"
subtitle: "Retour sur le talk d'Aygalic Jara à Devoxx France 2026"
description: "Compte-rendu du talk d'Aygalic Jara (SCIAM / LISN) à Devoxx France 2026 : pourquoi les LLMs hallucinent, comment mesurer le phénomène, et les stratégies concrètes pour le maîtriser en production."
thumbnail-img: "/assets/img/bon-llm.webp"
cover-img: "/assets/img/bon-llm.webp"
tags: [IA, Développement, Tech]
author: "Angelo Lima"
lang: fr
ref: llm-hallucinations-devoxx-2026
categories: fr
---

Jeudi 23 avril 2026, 15h40, Palais des Congrès. **Aygalic Jara**, consultant doctorant chez SCIAM en thèse CIFRE avec le LISN (Laboratoire Interdisciplinaire des Sciences du Numérique), a présenté un talk dont le titre résumait tout le programme : *"LLMs et hallucinations : comprendre, mesurer, maîtriser"*. Salle pleine, sujet brûlant. Le sujet est au cœur de ses travaux de thèse, dont un premier article d'état de l'art a été publié en 2025 aux journées JEP-TALN-RECITAL sous le titre *"État de l'art : évaluation, détection et mitigation des hallucinations des LLMs"*.

Les hallucinations des LLMs ne sont pas un bug ponctuel qu'une mise à jour pourrait corriger. Elles sont une conséquence structurelle du fonctionnement même de ces modèles. C'est la thèse que défendait Aygalic, et c'est le fil que je déroule ici en mélangeant ses éléments de présentation, quelques références académiques mobilisées implicitement pendant le talk, et le contexte actuel de la recherche française sur le sujet.

## Deux familles d'hallucinations

Premier réflexe utile : distinguer deux grands types d'hallucinations, qui n'ont ni les mêmes causes ni les mêmes remèdes.

- Les **hallucinations de factualité** : le modèle énonce une information fausse dans l'absolu (une date, un nom, une citation inventée, une jurisprudence qui n'existe pas).
- Les **hallucinations de prédictibilité** (ou de fidélité) : le modèle produit une sortie incohérente avec le contexte, les instructions ou les sources fournies, même si elle pourrait être factuellement correcte par ailleurs.

Cette distinction n'est pas qu'académique. Elle détermine la stratégie de défense : on ne protège pas un système RAG juridique contre une date fantaisiste comme on le protège contre une réponse qui s'écarte du contrat qu'on lui a donné à lire.

## D'où viennent les hallucinations

Deux grandes sources, bien documentées par la littérature récente ([Huang et al. 2023](https://arxiv.org/abs/2311.05232), parmi d'autres) :

**De la donnée.** Le modèle est entraîné sur un corpus figé dans le temps — sa *cut-off date*. Dès que le monde bouge (réglementation, poste, produit, dirigeant), le modèle reste sur ses positions. Plus la donnée est ancienne ou absente du corpus, plus les inventions deviennent probables.

**Du mécanisme de prédiction du prochain token.** Un LLM ne *sait* rien au sens propre. Il optimise une probabilité conditionnelle, token par token. Et ce mécanisme s'aggrave d'un biais qu'on sous-estime souvent : la **complaisance**. Le post-entraînement (RLHF et apparentés) enseigne au modèle à être serviable, à produire une réponse. Face à une question dont il ignore la réponse, il préfère encore inventer plutôt que de décevoir.

C'est ce point qui m'a le plus fait réfléchir : une part significative des hallucinations vient littéralement du fait qu'on a appris au modèle à *vouloir aider*. La complaisance est une propriété voulue au moment du RLHF, et ses effets de bord sont précisément les hallucinations qu'on voudrait lui retirer ensuite.

## Les limites fondamentales à accepter

Aucun LLM ne peut tout retenir. À mesure qu'on le nourrit, on doit compresser, oublier, hiérarchiser. De là viennent mécaniquement les erreurs de factualité sur les sujets de niche, les événements récents, ou les données fines.

Le premier réflexe, et c'est le bon, consiste à **fournir le contexte nécessaire au moment de la requête** plutôt qu'à exiger du modèle qu'il le porte dans ses poids. C'est le cœur du *context engineering*, et c'est le principe du RAG et de toutes ses variantes (RAG agentique, Self-RAG, etc.). Mais rien n'est gratuit : construire une pipeline RAG coûte cher, et un contexte qui grossit dégrade mécaniquement la performance à cause de sa taille même.

La deuxième piste consiste à apprendre au modèle à **dire "je ne sais pas"**. C'est l'idée du *R-tuning* : construire des jeux de fine-tuning où la bonne réponse est l'abstention. Sauf qu'à force, le modèle peut finir par refuser de répondre à tout. Comme pour tout compromis technique, il faut trouver le point d'équilibre, et il dépend du cas d'usage.

## La pyramide de la robustesse aux hallucinations

Aygalic a proposé une grille de lecture en cinq niveaux, chacun couvrant une famille de défenses. Les niveaux du bas sont les plus fondamentaux. Ceux du haut interviennent quand les précédents n'ont pas suffi.

**1. Techniques d'entraînement.** Qualité du corpus, RLHF, fine-tuning, R-tuning, distillation. C'est le socle sur lequel tout le reste repose.

**2. Context Engineering.** Prompt engineering, optimisation de contexte, RAG et variantes. On fournit au modèle la matière dont il a besoin pour répondre juste.

**3. Contrôle Qualité Post-Gen.** Une fois la réponse générée, on la valide : fact-checking externe, attribution des sources, auto-vérification, vérification de cohérence. C'est ici qu'interviennent les guardrails et les scores de *groundedness*.

**4. Orchestration Agentique.** On dépasse l'appel unique au modèle : function & tool calling, RAG agentique, architectures multi-agents, agents de réflexion. On répartit le travail entre plusieurs appels qui se contrôlent mutuellement.

**5. Interprétabilité.** Le sommet, et le niveau le plus technique. Il se découpe en deux :
- En **boîte grise**, on fait de la quantification d'incertitude.
- En **boîte blanche**, on fait du *probing* et du scoring d'attribution.

Le *probing* mérite qu'on s'y attarde. L'idée, popularisée notamment par [Azaria & Mitchell (2023)](https://arxiv.org/abs/2304.13734) ("The Internal State of an LLM Knows When It's Lying"), est d'exploiter le fait qu'un LLM "sait" souvent quand il invente : l'information est présente dans ses activations internes, mais pas dans la sortie générée. On récupère donc les vecteurs internes du transformer entre deux couches et on entraîne une petite régression logistique dessus pour prédire, token par token, la probabilité d'hallucination. Sur modèles ouverts, on peut aller plus loin : éteindre un neurone pour établir une causalité, repérer les circuits d'attention problématiques, etc. C'est le principal avantage des modèles open-weights sur les modèles fermés, et c'est précisément le terrain de jeu de la recherche fondamentale actuelle.

## Construire son système IA : trois axes

Au-delà de la pyramide, Aygalic proposait un cadre opérationnel en trois axes, qui recoupe d'ailleurs la structure de son article d'état de l'art (évaluation / détection / mitigation) :

- **Prévention** : comment *limiter* l'apparition des hallucinations en amont ?
- **Détection** : comment *repérer* celles qui passent quand même ?
- **Gestion résiduelle** : que fait-on des hallucinations qu'on n'a pas pu empêcher ? Gestion automatique ? Escalade intelligente vers un humain ?

Aucune de ces trois colonnes n'est optionnelle. Une stratégie qui ne traite que la prévention reste aveugle à ses propres angles morts. Une stratégie qui se repose uniquement sur la détection laisse passer trop de cas en production.

### Un exemple de stack RAG pour la prévention factuelle

Aygalic présentait une stack représentative pour une pipeline RAG d'entreprise :
- **LlamaIndex** pour l'indexation des documents
- **Qdrant** comme base vectorielle
- **Cohere** pour les embeddings
- Un LLM en bout de chaîne pour la génération

Rien de révolutionnaire, mais c'est un socle maintenant standardisé qui évite les mauvaises surprises. Alternative sur la partie vérification de *groundedness* : **Guardrails AI** pour une approche orientée règles et *safety*, et **ragas** pour un scoring quantitatif de *groundedness* mesurable dans le temps.

### Gestion résiduelle : l'escalade intelligente

Quand tout le reste a échoué (question trop complexe, interdite, ou utilisateur qui demande explicitement un humain), il faut décider automatiquement quand un opérateur doit prendre le relais. C'est une couche souvent négligée, alors qu'elle conditionne la qualité perçue de tout le système. Dans le droit, par exemple, c'est exactement ce que propose **HalluGraph**, l'outil développé par Valentin Noël et l'équipe Devoteam ([primé à AAAI 2026](https://www.devoteam.com/fr/news-and-pr/ia-droit-valentin-noel-et-lequipe-devoteam-primes-a-la-conference-aaai-2026-a-singapour-pour-leur-lutte-contre-les-hallucinations-des-llm/)) : si l'IA échoue au test de cohérence par graphe de connaissances, le système bloque la réponse et exige une intervention humaine.

## Évaluer en continu, ou ne rien évaluer du tout

Un système IA qui n'est pas évalué en continu se dégrade en silence. Aygalic distinguait plusieurs plans.

**Factualité.** Une série de benchmarks de difficulté croissante, qu'on peut utiliser comme thermomètre de génération en génération. La chronologie est parlante :

| Benchmark | Année |
|---|---|
| TriviaQA | Juillet 2017 |
| Natural Questions | Juin 2019 |
| MMLU | Septembre 2020 |
| FreshQA | Octobre 2023 |
| GPQA | Novembre 2023 |
| MMLU Pro | Juin 2024 |
| Humanity's Last Exam | Janvier 2025 |

Chaque benchmark est plus difficile que le précédent. L'évolution en dit long sur la course à la difficulté qui structure la recherche : dès qu'un benchmark est *saturé* par les modèles frontaliers, la communauté en construit un plus exigeant.

**Fidélité.**
- *IFEval* pour la fidélité aux instructions et au contexte ("écrire un résumé en 25 phrases et 2 paragraphes").
- *Comprehensive RAG Benchmark (CRAG)* pour mesurer la capacité du modèle à s'appuyer sur les sources et à dire "je ne sais pas" quand l'information n'y est pas.
- *Berkeley Function-Calling Leaderboard* pour l'appel d'outils et la vérification des paramètres.

**Cas d'usages pratiques.**
- *τ-Bench* pour des tâches métier (banking, telecom, retail, airline) avec long contexte, BDD et APIs.
- *GDPval* ([OpenAI, septembre 2025](https://openai.com/index/gdpval/)) pour 44 métiers à haute valeur économique (droit, finance, ingénierie, santé…). Benchmark orienté raisonnement et production de livrables réels (documents, slides, tableurs). Un papier marquant de cette fin d'année 2025 a montré que certains modèles frontaliers (Claude Opus 4.1, GPT-5) approchent la parité avec les experts humains sur les tâches GDPval. Signal fort pour l'évolution du marché.

**Sous-systèmes.**
- *HalluEval 2.0* pour la détection d'hallucinations spécifiquement.
- *IFEval*, *Berkeley Function Calling Leaderboard*, *FollowBench* pour le suivi d'instructions.
- *XSTest* (Exaggerated Safety) et *JailbreakBench* / *HarmBench* pour la robustesse des guardrails.

**Ressources à surveiller.**
- [artificialanalysis.ai](https://artificialanalysis.ai)
- [arena.ai/leaderboard](https://arena.ai/leaderboard)
- [llm-stats.com](https://llm-stats.com)

À titre complémentaire, le benchmark français **Phare** (Potential Harm Assessment & Risk Evaluation), développé par [Giskard en partenariat avec Google DeepMind](https://www.silicon.fr/data-ia-1372/llm-francais-biais-hallucinations-226679), évalue la robustesse des LLMs aux hallucinations, biais et jailbreaks, y compris en français. Point qui n'est pas anodin : les principaux LLMs sont souvent plus robustes en anglais qu'en français, et l'écart n'est pas négligeable.

## Le piège du "plus gros est toujours mieux" : les *inverse scaling laws*

C'est le bonus sur lequel Aygalic a fini, et c'est probablement le point le plus contre-intuitif du talk. On vit avec l'idée que plus un modèle est grand, plus il est performant, et c'est globalement vrai sur les *scaling laws* classiques (test loss qui décroît linéairement en fonction du compute, de la taille du dataset, du nombre de paramètres).

Mais un phénomène plus étrange apparaît sur certaines tâches : le **scaling inverse**. Toutes les capacités d'un modèle n'évoluent pas au même rythme quand on le fait grossir, et certaines *régressent*. Le benchmark *Memo Trap* est un cas d'école : on y voit plusieurs familles de modèles (Anthropic, Chinchilla, Gopher, GPT-2/3/4, OPT, PaLM…) dont la précision *diminue* à mesure que les FLOPs augmentent.

Une interprétation possible : plus un modèle est gros, plus il a ingéré de Twitter, de Reddit, et globalement de bruit. Il connaît les bonnes réponses *et* toutes les variantes fausses qui circulent sur le web. Il devient plus *bavard* sans être toujours plus *juste*. Les résultats du benchmark Phare cité plus haut vont dans le même sens : la taille du modèle ne prédit pas sa robustesse, et les petits modèles sont parfois plus résistants, notamment sur les attaques par encodage où leur "incapacité à décoder les protège", selon l'analyse de Giskard.

La conséquence pratique est forte : **choisir son modèle ne revient pas à prendre le plus gros**. Pour certains cas d'usage, surtout les cas sensibles où la *robustesse* compte plus que la *virtuosité*, un petit modèle spécialisé se comporte souvent mieux. Moins de surface d'erreur, moins de "culture toxique" intériorisée, et un coût d'inférence qui permet des architectures plus riches (multi-agents, vérification croisée). Le bon réflexe est de benchmarker finement sur sa tâche plutôt que de se fier au classement général.

## Ce qu'il faut retenir

Pour maîtriser les hallucinations sur un système en production, le plan est finalement assez simple à énoncer, et tout aussi difficile à exécuter :

- **Connaître les limites fondamentales des LLMs** : leur nature prédictive, leur complaisance, leur corpus figé. Ne jamais les traiter comme des oracles.
- **Évaluer son système en continu**, à plusieurs niveaux (factualité, fidélité, cas d'usage, sous-systèmes), avec une boucle permanente d'ajustement. Un système non mesuré est un système qui dérive.
- **Mettre en place les bonnes stratégies de prévention pour son cas d'usage** : context engineering, function calling, vérification des messages, guardrails. Aucune brique n'est suffisante seule, aucune n'est gratuite, mais leur composition, pensée en fonction du cas d'usage et mesurée honnêtement, reste aujourd'hui la voie la plus sérieuse pour construire des systèmes qui hallucinent moins, et qui savent quoi faire quand ils hallucinent quand même.

Le contexte réglementaire pousse d'ailleurs dans cette direction. L'AI Act européen, dont le déploiement s'étale sur 2025-2027, classifie un nombre croissant d'usages comme "à haut risque" et impose des exigences de robustesse, de précision et de supervision humaine. Les hallucinations ne sont plus seulement un problème technique : elles sont en train de devenir un problème de conformité.

---

## Pour aller plus loin

- **L'article d'état de l'art d'Aygalic Jara** : *"État de l'art : évaluation, détection et mitigation des hallucinations des LLMs"*, JEP-TALN-RECITAL 2025. [PDF sur ACL Anthology](https://aclanthology.org/2025.jeptalnrecital-recital.7.pdf).
- **Le survey de référence** : Huang et al. (2023), *A Survey on Hallucination in Large Language Models*. [arXiv:2311.05232](https://arxiv.org/abs/2311.05232).
- **Sur le probing** : Azaria & Mitchell (2023), *The Internal State of an LLM Knows When It's Lying*.
- **Sur le RAG auto-critique** : Asai et al. (2023), *Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection*. [arXiv:2310.11511](https://arxiv.org/abs/2310.11511).
- **HalluGraph** (Devoteam, AAAI 2026) : une approche par graphes de connaissances pour la vérification juridique.
- **Benchmark Phare** (Giskard × Google DeepMind) : évaluation de la robustesse des LLMs incluant le français.

---

*Devoxx France 2026 — 14ᵉ édition, Palais des Congrès de Paris, 22-24 avril 2026.*
