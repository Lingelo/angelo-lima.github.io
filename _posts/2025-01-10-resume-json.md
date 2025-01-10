---
layout: post
title: "JSON Resume : Transformez votre CV comme un développeur 🚀"
subtitle: "Un format open source élégant et flexible pour gérer votre carrière"
cover-img: /assets/img/json-resume.png
share-img: /assets/img/json-resume.png
tags: [JSON, développeur, outils]
author: Angelo Lima
---
# JSON Resume : L’avenir du CV pour les développeurs 🚀

Créer un CV peut vite devenir un casse-tête. Entre les outils limités, les mises en page qui ne tiennent pas la route et les heures passées à ajuster des marges, on aimerait parfois une solution plus simple et plus efficace, surtout quand on est développeur et qu’on aime les outils pratiques. Si vous vous reconnaissez là-dedans, laissez-moi vous présenter **JSON Resume** — une manière moderne, ouverte et flexible de gérer votre CV.

Imaginez un CV formaté comme un fichier JSON, que vous pouvez manipuler avec vos outils de développeur habituels. Ça vous intrigue ? On plonge dedans. 🌟

---

## JSON Resume, c’est quoi exactement ? 🤔

En une phrase, JSON Resume est un **format open source** qui vous permet de créer votre CV sous la forme d’un fichier JSON. Ce dernier contient toutes les informations de votre parcours professionnel dans une structure bien définie, que vous pouvez ensuite utiliser pour générer un CV au design moderne ou même pour l'intégrer dans des outils et projets.

Le principe est simple :
- **Rédigez** votre CV une fois en format JSON.
- **Transformez-le** ensuite en différents designs ou formats (PDF, site web, etc.).
- **Automatisez** ou mettez-le à jour très facilement grâce à des outils pour développeurs.

En d’autres termes, JSON Resume sépare totalement le contenu de son design. Vous écrivez vos expériences, compétences, formations… dans un fichier JSON brut, puis vous choisissez (ou créez !) un modèle qui affiche ces données de façon esthétique.

---

## Pourquoi choisir JSON Resume pour son CV ? 🛠️

Vous vous demandez pourquoi adopter ce format et abandonner votre éditeur préféré ? Voici quelques bonnes raisons :

### 1. Un CV réutilisable et flexible
Avec JSON Resume, vous rédigez une seule fois votre CV, et ensuite vous pouvez :
- Générer plusieurs versions avec des designs différents (moderne, classique, créatif).
- Créer des versions adaptées en fonction du poste ou du public (ex. résumé simplifié, CV complet).
- Exporter sans jamais avoir à reformater ou tout recommencer.

### 2. Un outil taillé pour les développeurs 👨‍💻
Si vous êtes déjà familier avec des éditeurs comme VS Code, travailler avec un fichier JSON sera un jeu d’enfant. Et le fait que tout soit un simple fichier texte permet de :
- Versionner le fichier avec Git (vous savez toujours ce qui a changé et quand).
- Collaborer facilement (besoin d’un coup de pouce ou d’une relecture ? c’est comme bosser sur du code).
- L’automatiser via des scripts ou des outils CI/CD (imaginez, votre CV mis à jour et exporté en PDF après chaque commit !).

### 3. Séparation nette du contenu et du design 🎨
L’avantage principal du format JSON est qu’il ne dépend d’aucun outil de mise en page. Vous travaillez sur **le contenu uniquement**, et vous appliquez un design par-dessus grâce à des templates. Besoin de quelque chose de sobre pour une candidature ? Vous utilisez un modèle. Plutôt envie d’un design créatif pour un portfolio ? Changez de template en deux clics.

### 4. Ouvert et extensible
JSON Resume est open source, ce qui signifie que :
- Vous pouvez contribuer au projet ou personnaliser les outils existants.
- Vous avez accès à une communauté active qui propose des templates et des outils.
- Vous pouvez facilement intégrer ce format dans d’autres projets personnels (site web, APIs, automatisations).

---

## Comment ça fonctionne ? 🚀

### Étape 1 : Installer l’outil JSON Resume
Pour commencer, vous avez besoin de l’outil CLI (Command Line Interface) de JSON Resume. Assurez-vous d’avoir Node.js installé sur votre ordinateur, puis tapez :

```bash
npm install -g resume-cli
```

### Étape 2 : Créer un fichier JSON

Initialisez un CV au format JSON en exécutant la commande suivante :

```bash
resume init
```

Cela génère un fichier de base (`resume.json`) avec une structure préformatée pour commencer. Vous n’avez plus qu’à remplir vos informations, comme vos expériences, votre éducation ou vos compétences.

### Étape 3 : Générez votre CV avec un template
Une fois votre fichier JSON rédigé, vous pouvez appliquer un modèle pour transformer votre CV en un superbe document :

```bash
resume export my-cv.html --theme elegant
```

Vous pouvez explorer les nombreux thèmes disponibles sur le **[site officiel JSON Resume](https://jsonresume.org/themes)**. Si vous savez coder, rien ne vous empêche de créer votre propre thème ou de personnaliser l’un des modèles existants.

### Étape 4 : Partagez ou hébergez votre CV
Avec JSON Resume, vous avez des tonnes de possibilités de partage :
- Exportez-le en PDF, Markdown ou autre.
- Publiez votre CV en ligne (sur GitHub Pages ou Netlify, par exemple).
- Intégrez-le directement sur votre site personnel.

---

### Exemple de structure JSON
Les données dans JSON Resume sont organisées sous forme de sections, comme dans un CV classique :

```json

{
  "basics": {
    "name": "John Doe",
    "label": "Développeur Backend",
    "email": "john.doe@example.com",
    "location": {
      "city": "Paris",
      "countryCode": "FR"
    },
    "profiles": [
      {
        "network": "LinkedIn",
        "username": "john-doe",
        "url": "https://linkedin.com/in/john-doe"
      }
    ]
  },
  "work": [
    {
      "company": "Tech Corp",
      "position": "Développeur Node.js",
      "startDate": "2019-06",
      "endDate": "2023-01",
      "highlights": [
        "Développement d'une API pour gérer 1M de requêtes par jour.",
        "Implémentation de tests automatisés avec Jest."
      ]
    }
  ],
  "skills": [
    {
      "name": "JavaScript",
      "level": "Avancé"
    },
    {
      "name": "Docker",
      "level": "Intermédiaire"
    }
  ]
}

```

Ce format est non seulement uniforme, mais aussi facilement exploitable par d’autres outils ou frameworks.

---

### Créez vos propres templates 🎨

Si les modèles existants ne vous suffisent pas, vous pouvez **créer votre propre template**. JSON Resume utilise des technologies standard comme **HTML**, **CSS**, et **JavaScript** (utilisation de la lib **[Handlebars](https://handlebarsjs.com/)**) pour personnaliser l'apparence de votre CV. 

1. **Téléchargez un template existant** pour l'explorer, ou partez de zéro.
2. **Modifiez la structure** pour qu'elle corresponde à vos besoins.
3. **Testez votre modèle** à l'aide de l'outil CLI avec cette commande :

   ```bash
   resume export my-cv.html --theme your-template
   ```

## Un outil fait par des développeurs pour ceux qui veulent l'utiliser 🛠️✨

JSON Resume va bien au-delà de la simple rédaction. 💡 Ce format structuré rend la maintenance de votre CV beaucoup plus simple et rapide. Plus besoin de tout reprendre à zéro à chaque mise à jour ou modification : adaptez et générez facilement différentes versions selon vos besoins. 🖥️⚡

Prêt à adopter un format plus efficace, plus personnalisable et mieux adapté à vos ambitions professionnelles ? 🚀 Que pensez-vous de ce concept ? Envisagez-vous de l’utiliser pour vos futures candidatures ? Partagez vos retours ! 💬  
