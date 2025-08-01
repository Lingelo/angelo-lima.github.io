---
layout: post
title: "🛠️ Configurer Ollama et Open Web UI : Mon setup IA quotidien 🤖"
subtitle: "✨ Comment j’utilise les LLMs comme GPT-4 et Llama3 pour travailler efficacement 🚀"
cover-img: /assets/img/ai-setup.png
thumbnail-img: /assets/img/ai-setup.png
share-img: /assets/img/ai-setup.png
tags: [IA, Développement]
author: Angelo Lima
---


# Comment j'utilise l’IA au quotidien : Installer Ollama (avec ou sans Docker) et configurer Open Web UI 🌐

Salut ! Aujourd’hui, je vais partager avec vous **comment j’utilise l’IA au quotidien** pour bosser sur mes projets perso ou professionnels. Depuis quelques mois, la combinaison d’Ollama et Open Web UI est devenue mon setup de prédilection pour interagir avec différents modèles de langage intelligents (LLMs).

Pourquoi ce choix ? Parce qu’il me permet de jongler entre des modèles ultra-puissants comme GPT-4 et des alternatives locales comme llama3, tout en gardant un bon équilibre entre **performance**, **coût**, et même **confidentialité des données**. Une fois configuré, c’est incroyablement pratique, et je vais vous détailler **comment tout mettre en place vous aussi**.

Que vous soyez curieux, développeur, ou que vous cherchiez juste une solution pour tester des IA efficacement, ce guide est fait pour vous. 😊

---

## 1. Pourquoi j’utilise Ollama et Open Web UI ? 🤔

Pour vous expliquer rapidement, j’ai choisi ce duo parce que :

- **Ollama**, c’est parfait pour exécuter des IA _en local_. Je peux utiliser Llama2, Llama3 (modèles de Facebook) ou d’autres modèles directement sur ma machine, sans passer par le cloud. C’est idéal pour des tâches simples, sans perdre mes données ni cramer mes crédits 🤓. Un autre énorme avantage ? Avec Ollama, je peux mettre en place du **RAG** (Retrieval-Augmented Generation), une technique qui permet d'interroger des documents spécifiques ou des bases de connaissances (parfaits pour les fichiers PDF ou les rapports trop barbants à lire intégralement). Cela transforme Ollama en un véritable assistant personnalisé au quotidien. 🗂️
- **Open Web UI**, c’est comme un tableau de bord pour AI :  je peux facilement jongler entre Ollama (en local) et OpenAI (GPT-4), mais via une seule interface. Plus besoin de coder des scripts d’API ou d’ouvrir 36 terminaux. 🖥️

Bref, c’est une solution parfaite pour **tester des choses rapidement**, économiser mes crédits OpenAI, et tout garder fluide. Une fois que vous avez goûté à cette simplicité, difficile de revenir en arrière !

---

## 2. Mon setup : Ce qu’il faut pour commencer 🛠️

### **Prérequis :**

- **Un compte OpenAI** avec des crédits préchargés. Rendez-vous ici pour en créer un : [https://platform.openai.com/docs/overview](https://platform.openai.com/docs/overview)
- **Docker Desktop** : Je privilégie souvent Docker pour son efficacité et la facilité qu’il offre pour isoler les outils.

Pas de panique si ça vous est inconnu : on l'installe ensemble ci-dessous. 🌱

---

## 3. Installer Docker Desktop 🐳

Même si je préfère utiliser Ollama sans Docker, avoir Docker Desktop installé peut être utile dans certains cas. Voici comment je l’ai configuré rapidement :

### **Sous Windows ou macOS**
1. Rendez-vous sur [le site officiel de Docker](https://www.docker.com/products/docker-desktop).
2. Téléchargez Docker Desktop et suivez l’assistant d’installation (cliquez simplement sur "Next").
3. Une fois installé, ouvrez Docker Desktop pour vérifier que tout fonctionne correctement. Une icône de baleine 🐋 devrait apparaître dans votre barre d'état système.

### **Sous Linux**
1. Installez Docker en ligne de commande :
   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```
2. Testez votre installation avec cette commande : 
   ```bash
   sudo docker run hello-world
   ```
---

## 4. Mon guide pas à pas pour installer Ollama

Maintenant qu’on est prêts, voici deux façons d’installer Ollama : **avec Docker** ou **sans Docker**. De mon côté, je préfère éviter Docker pour Ollama, mais chacun son approche !

### **Option 1 : Installer Ollama sans Docker (mon option préférée)**

1. Téléchargez Ollama directement depuis [leur site officiel](https://ollama.com).
2. Suivez l’installation selon votre système d’exploitation :

    - **Linux** :  
      Téléchargez simplement le fichier d’installation et exécutez-le :
      ```bash
      curl -O https://ollama.com/download/latest && chmod +x ./ollama
      ./ollama install
      ```

    - **Windows et macOS** : Téléchargez l’exécutable depuis leur site, lancez l’installation (c'est juste un double clic et suivant-suivant-terminal accepté) et c’est tout.

3. Vérifiez qu’Ollama fonctionne correctement :
   ```bash
   ollama status
   ```

### **Option 2 : Installer Ollama avec Docker**

Si vous préférez isoler Ollama dans un environnement Docker, voici comment le configurer :

1. Téléchargez l’image Docker d’Ollama :
   ```bash
   docker pull ollama/base
   ```
2. Lancer le serveur Ollama en utilisant Docker:

    ```bash
   docker run -p 11434:11434 ollama/base
    ```
3. Vérifiez que le serveur est bien actif : ouvrez un navigateur et allez à l'adresse suivante :

    ```bash
   http://localhost:11434
    ```
Si tout fonctionne, vous êtes prêt à utiliser Ollama avec Docker !

---

## 5. Installer Open Web UI pour centraliser tout ça

Pour une expérience utilisateur fluide, je comptais sur Open Web UI – c’est grâce à ça que je peux interagir avec tous mes modèles (OpenAI et Ollama) depuis une interface graphique simple.

### 📦 Installation d’Open Web UI

1. Dans un terminal 

```bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```
Cette commande Docker permet de lancer Open Web UI dans un conteneur : elle configure l'accès via le port 3000 🌐, assure la persistance des données avec un volume dédié 💾, attribue un nom explicite (open-webui) pour une gestion simplifiée 🛠️, et garantit un redémarrage automatique en cas de besoin ♻️.

2. Une fois la commande terminée, ouvrez votre navigateur et connectez-vous à local :
   http://localhost:3000 👈 Voici votre interface !

--- 

## 6. Configuration : OpenAI + Ollama 🚀

C’est ici que tout se connecte : grâce à Open Web UI, vous pouvez basculer facilement entre OpenAI (comme GPT-4) et Ollama (comme Llama3).

### Configurer OpenAI
1. Accédez à l’interface Open Web UI et allez dans les paramètres.
2. Collez votre clé d’API OpenAI (vous pouvez l’obtenir depuis leur dashboard API ).
3. Sauvegardez. Vous pouvez désormais interagir avec les modèles GPT-4, GPT-3.5, et d'autres services OpenAI.

### Configurer Ollama
1. Si vous utilisez Docker, indiquez dans les paramètres de Open Web UI que le serveur Ollama est accessible à cette adresse :
```bash
http://localhost:11434
```
2. Si Ollama est installé sans Docker, l’outil devrait le détecter automatiquement s’il tourne localement.

---

## 7. Pourquoi j’aime cette configuration

Depuis que j’ai mis en place ce setup, j’en tire une multitude d’avantages au quotidien. Voici pourquoi je le trouve si pratique :

- **Optimiser mes crédits OpenAI** :  
  Utiliser Ollama pour des tâches simples (comme des tests ou des prompts répétitifs) me permet de garder mes crédits OpenAI pour des besoins vraiment essentiels, comme les projets complexes ou l’utilisation de GPT-4.

- **Explorer des modèles locaux** :  
  Avec Ollama, je peux interagir avec des modèles open-source comme llama3, directement depuis ma machine, hors ligne. Cela signifie que mes données restent en local, ce qui est une excellente solution pour préserver la confidentialité et éviter de dépendre systématiquement du cloud.

- **Comparer plusieurs modèles de LLMs** :  
  Open Web UI me permet de tester un même prompt sur différents modèles en un clin d'œil. Par exemple, je peux comparer les résultats d’un GPT-4 (OpenAI) et d’un modèle local comme llama3. Super pratique pour évaluer la qualité ou affiner mes projets !

- **Un workflow centralisé et simplifié :**  
  Open Web UI me sert de "tour de contrôle". Grâce à sa simplicité, je n’ai pas à jongler entre plusieurs outils ou scripts. C’est fluide, rapide, et beaucoup moins frustrant lorsque je travaille sur plusieurs projets en parallèle.

---

## Conclusion : Et vous ?

Voilà mon **setup IA personnel**, qui combine :
- La puissance des modèles OpenAI (GPT-4, GPT-3.5).
- La flexibilité et la confidentialité des modèles locaux comme llama3 via Ollama.

Grâce à ce duo, je peux expérimenter, optimiser mes dépenses en crédits API, tout en gardant le contrôle sur les données que j’utilise. Une fois configuré, tout tourne parfaitement, et Open Web UI apporte une simplicité qui change la donne.

Et vous, **êtes-vous plutôt IA locale (comme llama3) ou IA cloud comme GPT-4 ?** Partagez vos préférences, vos astuces ou vos retours dans les commentaires ! 😊✨  
