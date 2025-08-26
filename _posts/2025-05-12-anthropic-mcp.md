---
layout: post
title: "Protocole Model Context (MCP) : Révolution dans l'intégration des LLMs avec les systèmes tiers"
subtitle: "Découvrez comment MCP facilite l'interaction des modèles de langage avec les outils Atlassian et autres systèmes connectés"
cover-img: /assets/img/mcp-atlassian-cover.webp
share-img: /assets/img/mcp-atlassian-cover.webp
tags: [IA, Développement]
author: Angelo Lima
lang: fr
ref: anthropic-mcp
categories: fr
---

## Le protocole MCP, c'est quoi ?

### Un peu de contexte

Les large language models (LLMs) sont limités aux informations disponibles au moment de leur apprentissage. Cependant, il existe des méthodes pour enrichir ces modèles avec des connaissances plus récentes ou détaillées. Une de ces méthodes est le système RAG (Retrieval-Augmented Generation). Ce système fonctionne en deux étapes : il divise l'information en petites unités appelées vecteurs et utilise des techniques de récupération sophistiquées pour accéder rapidement et efficacement aux données nécessaires. Ainsi, les modèles peuvent fournir des réponses plus actuelles en incorporant des informations à jour issues de sources externes comme des fichiers, par exemple.

Bien que le système RAG offre des avantages considérables pour maintenir les modèles à jour, il présente également des inconvénients. La mise en œuvre de RAG peut être complexe et gourmande en ressources, car elle nécessite une infrastructure capable de traiter et stocker de grandes quantités de données sous forme de vecteurs. De plus, la qualité des réponses dépend fortement des sources d'information utilisées; si ces sources sont biaisées ou inexactes, cela peut affecter la fiabilité des réponses du modèle. Le temps de réponse peut également être allongé puisque le modèle doit traiter la requête et rechercher les informations pertinentes, ce qui peut ralentir le processus de génération des réponses. Enfin, maintenir la base de données à jour représente un effort supplémentaire en raison de la sophistication du système. Cela nécessite un suivi et une mise à jour constants des données pour garantir que les informations utilisées par le modèle restent pertinentes et précises.

En complément des systèmes RAG, l'évolution des LLMs a permis l'intégration de fonctionnalités supplémentaires, appelées "tools" ou outils, qui leur permettent d'interagir de manière dynamique avec des applications externes. Ces outils donnent aux LLMs la capacité d'exécuter du code, d'appeler des fonctions spécifiques ou d'accéder à des bases de données pour enrichir leurs réponses. Cette interaction élargit non seulement le champ d'application des LLMs, mais aussi leur efficacité et pertinence dans divers contextes.

Une innovation importante dans ce domaine est le protocole MCP (Model Context Protocol), qui bouleverse la façon dont les modèles gèrent le contexte et l'utilisation des informations. MCP permet aux LLMs de gérer plus efficacement les informations contextuelles et d'incorporer de nouvelles données pertinentes en temps réel. Ce protocole offre une architecture qui facilite une communication fluide et adaptable entre les modèles et les sources de données externes, optimisant ainsi la pertinence et la précision des informations fournies.

### Pourquoi le protocole MCP est-il important ?

Le protocole MCP ne rend pas une intelligence artificielle plus "intelligente" en soi, mais il révolutionne la façon dont elle interagit avec des systèmes externes tels que des bases de données et des APIs. Cette évolution s'inscrit dans la continuité des réflexions que j'ai partagées sur [l'impact écologique de l'IA](/fr/IA-impact-ecologique/), où l'efficacité des interactions devient cruciale pour réduire les coûts énergétiques. Ce protocole repose sur les concepts d'outils et de contexte, en mettant en œuvre des serveurs MCP qui présentent aux LLMs une liste d'outils. Cette structure simplifie considérablement la communication avec des systèmes tiers, rendant l'échange d'informations plus fluide et efficace.

Le protocole est un projet open source développé par Anthropic (le créateur de Claude). De nombreux langages de programmation, tels que Python, Java, C++, TypeScript, Kotlin et C#, sont pris en charge. L'approche proposée est simple et standard pour se connecter aux ressources tierces. Des exemples de serveurs sont disponibles sur le repository GitHub [ici](https://github.com/modelcontextprotocol/servers). Parmi ces exemples, on trouve des intégrations avec _GitHub_, _Atlassian_ (Confluence - JIRA), _Postgres_, et bien d'autres.

### Exemple de serveur MCP et son utilisation (mcp-atlassian)

Avec le développement continu du protocole MCP, des implémentations spécifiques comme MCP-Atlassian émergent, facilitant l'intégration avec des outils collaboratifs populaires tels qu'Atlassian. Voici un tutoriel pour vous guider dans l'installation de MCP-Atlassian et son intégration avec Claude Desktop.

### Installation de MCP-Atlassian via Docker

#### Installation du serveur

1. **Prérequis**  
   Assurez-vous d'avoir Docker installé sur votre machine. Si ce n'est pas le cas, téléchargez-le et installez-le depuis le [site officiel de Docker](https://www.docker.com/get-started).

2. **Cloner le repository**
   ```bash
   git clone https://github.com/sooperset/mcp-atlassian.git && cd mcp-atlassian
   ```
3. **Configurer les variables d'environnement**
   Dans le répertoire courant, on trouve un fichier `.env.example.` Copiez-le :
   ```bash
   cp .env.example .env
   ```
   Éditez ensuite ce fichier pour changer les variables d'environnement suivantes :
   * `JIRA_URL` : L'URL vers votre JIRA
   * `JIRA_USERNAME` : Votre email
   * `JIRA_API_TOKEN` : Le token API d'Atlassian, obtenable ici
   * `CONFLUENCE_URL` : L'URL vers votre Confluence
   * `CONFLUENCE_API_TOKEN` : Le même que `JIRA_API_TOKEN`
4. **Télécharger l'image docker**
   ```bash
   docker pull ghcr.io/sooperset/mcp-atlassian:latest
   ```
5. **Lancer le serveur MCP en mode SSE**
   Toujours dans le répertoire, exécutez la commande suivante :
  ```bash
  docker run --rm -p 9000:9000 \
  --env-file .env \
  ghcr.io/sooperset/mcp-atlassian:latest \
  --transport sse --port 9000 -vv  
  ```
6. **Votre serveur est démarré.**

#### Configuration dans Claude Desktop

1. **Télécharger le client**  
   Téléchargez le client Claude Desktop depuis [ici](https://claude.ai/download).

2. **Créer un fichier de configuration**
    - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
    - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

3. **Ajouter la configuration suivante**
   ```json
   {
     "mcpServers": {
       "mcp-atlassian-sse": {
         "url": "http://localhost:9000/sse"
       }
     }
   }
   ```
4. **Redémarrer Claude Desktop.**
5. **Utilisation**
   Vous pouvez désormais utiliser le serveur MCP dans Claude Desktop. Un symbole de marteau devrait apparaître sous le champ de saisie, indiquant les outils préchargés. Notez que Claude appellera le bon outil exposé par le serveur et vous demandera d'approuver la récupération des données.
 
   **Note:** Pour pouvoir enchainer les commandes dans claude Desktop il se peut que le forfait free anthropic ne suffise pas.

### Conclusion

Le protocole MCP, avec ses capacités avancées d'intégration et de gestion du contexte, représente une innovation significative dans l'utilisation des large language models. Il ne se limite pas seulement à rendre les modèles plus flexibles et adaptatifs, mais ouvre également la voie à des interactions améliorées avec les systèmes et outils tiers. Par cette approche, MCP permet une collaboration accrue entre les modèles et l'écosystème numérique environnant, facilitant une évolution continue et réactive des modèles en fonction des besoins du moment. Avec des implémentations pratiques comme MCP-Atlassian, il devient plus accessible pour les utilisateurs de tirer parti de ces avancées technologiques, transformant potentiellement la façon dont les organisations interagissent avec les données et les outils quotidiens. Ces développements laissent entrevoir un futur où les LLMs joueront un rôle encore plus central et dynamique dans divers secteurs, renforçant leur impact sur notre manière de travailler et de communiquer.