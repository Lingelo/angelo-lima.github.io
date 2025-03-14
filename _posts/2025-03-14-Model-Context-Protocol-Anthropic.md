---
layout: post
title: "Model Context Protocol (MCP) : Optimisation avancée du contexte pour les IA conversationnelles"
subtitle: "Comment MCP améliore la gestion du contexte dans les modèles de langage et leur intégration avec JIRA et Confluence"
cover-img: /assets/img/mcp-cover.png
share-img: /assets/img/mcp-cover.png
tags: [IA, LLM, Open Source, Anthropic, Claude, JIRA, Confluence, MCP]
author: "Angelo LIMA"
---
# **Le Model Context Protocol (MCP) d’Anthropic : Une Révolution dans la Gestion du Contexte et des Intégrations en Entreprise**

## **Introduction**

Les **modèles de langage de grande taille (LLMs)** comme **Claude (Anthropic)**, **ChatGPT (OpenAI)** ou **Gemini (Google DeepMind)** transforment les interactions humaines avec l’intelligence artificielle. Toutefois, leur efficacité reste limitée par la manière dont ils gèrent le **contexte des conversations**, en particulier sur des **échanges prolongés ou des applications professionnelles complexes**.

Les défis les plus courants des LLMs incluent :

- **Une mémoire contextuelle limitée** entraînant des pertes d’informations au fil de l’échange.
- **Un manque d’organisation du contexte** qui empêche un suivi optimal des discussions.
- **Une charge computationnelle excessive** lorsqu’un grand nombre de tokens doivent être traités simultanément.
- **Un défaut d’intégration avec les outils professionnels** comme **JIRA, Confluence, ERP et CRM**, empêchant une exploitation optimale dans des environnements d’entreprise.

Pour répondre à ces enjeux, **Anthropic a développé le Model Context Protocol (MCP)**, une approche modulaire permettant aux modèles de langage de **structurer et récupérer intelligemment leurs informations contextuelles**.

Dans cet article, nous approfondirons :
- Les **problèmes actuels de gestion du contexte** dans les LLMs.
- Le **fonctionnement détaillé du MCP**.
- Son **intégration dans JIRA et Confluence via MCP-Atlassian**.
- Les **perspectives à venir pour les applications professionnelles de MCP**.

---

## **1. Problèmes Actuels des Modèles de Langage en Matière de Gestion du Contexte**

Les **modèles de langage modernes** disposent d’un **window context** défini, c’est-à-dire une capacité maximale de traitement en tokens (ex : 100k tokens pour Claude 3, 128k pour GPT-4-turbo). **Une fois la limite atteinte, les anciennes informations sont progressivement effacées.**

Cela pose plusieurs **problèmes majeurs** :

### 🔹 **1.1. Oubli progressif des informations essentielles**
Lors de conversations longues, **les connaissances les plus anciennes sont perdues** car le modèle privilégie les éléments récents.

**Exemple :**
- Un utilisateur demande à Claude d’écrire un document en plusieurs étapes sur une session prolongée.
- Après un certain nombre d’échanges, les premières instructions disparaissent du contexte.
- L’IA commence à produire des recommandations incohérentes avec celles de départ.

### 🔹 **1.2. Absence de hiérarchisation des données**
Les LLMs traitent **tous les tokens de manière identique**, sans distinction entre :
- **Des informations critiques à retenir** (règles métier, décisions importantes).
- **Des éléments redondants ou secondaires**.

Cela génère un problème où **certaines informations clés sont noyées et oubliées**, alors qu’elles devraient être prioritaires.

### 🔹 **1.3. Charge computationnelle excessive**
Les modèles doivent analyser **toute leur fenêtre contextuelle** à chaque interaction, ce qui :
- Accroît considérablement le **coût en ressources computationnelles**.
- Ralentit la réponse du modèle.
- Augmente la difficulté d’intégration dans des **flux de travail en entreprise** où la gestion efficace de l’information est capitale.

---

## **2. Présentation et Fonctionnalités du Model Context Protocol (MCP)**

Le **Model Context Protocol (MCP)** est une **surcouche fonctionnelle** qui optimise la gestion du contexte en introduisant **une approche modulaire, priorisée et dynamique**.

### 🔹 **2.1. Objectifs du MCP**
1. **Assurer une mémoire contextuelle optimisée** : Conserver les éléments pertinents tout en filtrant les informations inutiles.
2. **Hiérarchiser et segmenter le contexte** : Répartir les tokens en catégories de priorité pour **optimiser la rétention et la récupération**.
3. **Optimiser les ressources** : Réduire la consommation excessive de mémoire et de calcul en ne traitant que l’essentiel.
4. **Permettre l’interopérabilité** : Intégrer efficacement MCP avec **des outils tiers comme JIRA et Confluence**.

### 🔹 **2.2. Les Principaux Composants de MCP**

#### **☑ 1. Context Prioritization (Priorisation et Segmentation du Contexte)**
MCP **classifie et hiérarchise les éléments du contexte** à l’aide de critères tels que :
- **La fréquence d’apparition d’une donnée**.
- **Sa pertinence vis-à-vis de la tâche en cours**.
- **Son importance pour la session en cours et les sessions futures**.

#### **☑ 2. Dynamic Context Fetching (Récupération Dynamique du Contexte)**
- MCP permet **d’extraire uniquement les informations pertinentes** sans recharger toute la donnée.
- Un moteur d’indexation analyse les **correspondances sémantiques** entre le **nouveau message** et les **données stockées**.

#### **☑ 3. Modular Context Storage (Stockage Modulaire du Contexte)**
- Contrairement aux modèles classiques qui gèrent **un contexte linéaire**, MCP organise les informations en **sous-ensembles modulaires** qui peuvent être activés ou désactivés à la demande.
- Résultat : La mémoire contextuelle est **plus efficace et évolutive**.

---

## **3. Intégration avec JIRA et Confluence : Le Projet MCP-Atlassian**

Les modèles de langage deviennent particulièrement pertinents dans des **environnements d’entreprise** lorsqu’ils sont directement intégrés aux outils existants.

Un excellent exemple est le projet **[MCP-Atlassian](https://github.com/sooperset/mcp-atlassian)**, qui permet d’incorporer MCP dans **JIRA et Confluence**.

### 🔹 **3.1 Objectifs de MCP-Atlassian**
1. **Permettre aux assistants IA d’accéder aux tickets JIRA actifs**, en conservant du contexte intelligent sur une longue période.
2. **Automatiser la récupération des notes et documents Confluence** pertinents pour une session IA.
3. **Améliorer la continuité des discussions en entreprise**, sans avoir à répéter les informations à chaque interaction.

### 🔹 **3.2 Fonctionnalités du projet MCP-Atlassian**

#### **Intégration avec JIRA :**
- Récupération des **tickets ouverts**, des attributs de projet et des discussions associées.
- Permet aux agents conversants (Claude, GPT-4…) de référencer **les tâches et mises à jour précédentes**.
- Suivi intelligent des **changements effectués par l’équipe**.

#### **Intégration avec Confluence :**
- Analyse et extraction des **pages nécessaires à une conversation donnée**.
- Génération de **résumés dynamiques** basés sur les informations Confluence.
- Capacité à créer **des suggestions et réponses IA basées sur la documentation existante**.

---

## **4. Perspectives d’Évolution et Développements Futurs du Model Context Protocol**

MCP n’en est qu’à ses débuts et pourrait évoluer vers **différentes applications avancées**, notamment :

- 💡 **Stabilisation des contextes longue durée en entreprise** (via stockage externe des contextes MCP dans des bases de données dédiées).
- 🔍 **Connexion avec d'autres systèmes d'information** (ERP, CRM, gestion documentaire…).
- 🚀 **Interopérabilité entre plusieurs LLMs** (éviter qu’un modèle redémarre de zéro en changeant de plateforme).

---

## **Conclusion**

Le **Model Context Protocol (MCP)** est une avancée majeure pour les **LLMs**, leur permettant de mieux structurer, prioriser et exploiter leur mémoire contextuelle. Son **intégration dans JIRA et Confluence via MCP-Atlassian** démontre son potentiel pour optimiser la productivité dans un cadre professionnel.

📌 *Comment voyez-vous l’intégration d’un assistant IA intelligent dans votre environnement de travail ?*  
