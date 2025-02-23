---
layout: post
title: "SQL Assistant : Convertissez du texte en requêtes SQL exécutables 🚀"
subtitle: "Un outil open-source pour générer des requêtes SQL en langage naturel et interagir avec votre base de données"
cover-img: /assets/img/sql-assistant-cover.png
share-img: /assets/img/sql-assistant-cover.png
tags: [SQL, IA, Open Source, PostgreSQL, Développement]
author: "Angelo LIMA"
---

# 🏆 SQL Assistant – Transformez du texte en requêtes SQL exécutables

SQL Assistant est un outil open-source permettant de **convertir du langage naturel en requêtes SQL** et de les **exécuter directement sur une base de données**.

Que vous soyez développeur, data analyste, ou que vous manipuliez des bases de données occasionnellement, **cet assistant vous permet d’interagir avec votre base de manière simple et efficace**.

🔗 **Lien vers le projet :** [GitHub – SQL Assistant](https://github.com/Lingelo/sql-assistant)

---

## 🚀 Fonctionnalités

✔ **Génération de requêtes SQL à partir d’un langage naturel**  
✔ **Deux modes d’utilisation : "basic" (chat interactif) et "tools" (exécution directe)**  
✔ **Compatible avec plusieurs modèles d'IA (ex. OpenAI, Mistral, etc.)**  
✔ **Connexion simple avec une base PostgreSQL via Sequelize**  
✔ **Fichier de configuration pour adapter l’outil à votre environnement**

---

## 🛠 Installation et configuration

### **1️⃣ Cloner le projet et installer les dépendances**

```bash
git clone https://github.com/Lingelo/sql-assistant.git
cd sql-assistant
yarn install
```
### **2️⃣ Configurer le fichier `.env`**

Avant d’exécuter SQL Assistant, créez un fichier `.env` à la racine du projet et ajoutez la configuration adaptée :

```ìni
# Configuration AI
IA_HOST=http://localhost:11434/v1
IA_KEY=cle-api
IA_MODEL_NAME=model-name

# Configuration des logs
LOG_LEVEL=info

# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=nom_utilisateur
DB_PASSWORD=mot_de_passe
DB_DATABASE=nom_base
MODEL_PATH=./structure.sql
DIALECT=postgres  

# Mode d’exécution
MODE=tools  # "tools" pour exécuter les requêtes, "basic" pour le mode chat
```

### **3️⃣ Lancer l’assistant**

```bash
yarn start
```

L'assistant est maintenant prêt à convertir du texte en requêtes SQL et, si activé, à les exécuter sur votre base de données.

---

### 🎮 Exemples d’utilisation
#### Mode "basic" (chat interactif sans exécution de requête)

```bash
Bienvenue dans l'assistant SQL, que souhaitez-vous faire ?
> Sélectionne tous les produits avec un prix supérieur à 100.
Assistant SQL :
SELECT * FROM produits WHERE prix > 100;
```

#### Mode "tools" (avec exécution sur la base de données)

```bash
Bienvenue dans l'assistant SQL, que souhaitez-vous faire ?
> Trouve tous les utilisateurs dont l'email contient 'example.com'.
Assistant SQL :
SELECT * FROM users WHERE email LIKE '%example.com%';

Exécution de la requête… 🕒  

| id | username | email             | created_at          |
|----|----------|-------------------|---------------------|
| 1  | johndoe  | john@example.com  | 2023-01-10 12:00:00|
...
```

SQL Assistant exploite la structure de **votre base de données** (définie dans un fichier `.sql`) pour générer des requêtes adaptées.

---

### 🔄 Améliorations possibles

SQL Assistant est en constante évolution. Parmi les améliorations envisagées :

* **Support d’autres bases de données** (MySQL, SQLite, etc.)
* **Meilleure compréhension du langage naturel** pour des requêtes plus complexes
* **Développement d’une interface web conviviale**
* **Ajout d’un système de validation des requêtes** avant exécution pour éviter les erreurs

ℹ️ **Toute suggestion ou retour d’expérience est le bienvenu !** Pensez-vous que SQL Assistant pourrait vous être utile ? 🚀


