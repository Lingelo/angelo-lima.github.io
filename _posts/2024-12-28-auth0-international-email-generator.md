---
layout: post
title: "Auth0 International Email Generator : CLI pour templates multilingues"
subtitle: "Un outil TypeScript pour générer des emails Auth0 dans plusieurs langues"
cover-img: /assets/img/auth0-international-email.webp
share-img: /assets/img/auth0-international-email.webp
tags: [Développement, Web, Sécurité]
author: Angelo Lima
lang: fr
ref: auth0-international-email
categories: fr
---

## Le problème des emails Auth0 multilingues

Si tu as déjà dû gérer des emails Auth0 dans plusieurs langues, tu sais que c'est galère. Entre les traductions, la validation des templates HTML et la gestion des différents environnements, c'est vite le bordel.

J'ai créé [Auth0 International Email Generator](https://github.com/Lingelo/auth0-international-email)¹ pour résoudre ce problème. C'est un CLI TypeScript qui génère automatiquement tes templates d'emails multilingues avec toute la config nécessaire.

---

## Comment ça marche ?

### Installation et setup rapide

```bash
# Clone le repo
git clone https://github.com/Lingelo/auth0-international-email.git
cd auth0-international-email

# Install des dépendances
yarn install

# Setup interactif du projet
yarn init
```

### Configuration des langues

Le fichier `config.json` gère tout :

```json
{
  "supportedLanguages": ["en", "fr", "es"],
  "defaultLanguage": "en",
  "templates": {
    "welcome_email": {
      "fromAddress": "hello@monapp.com",
      "subjectKey": "welcome.subject"
    }
  }
}
```

Si une traduction manque, ça fallback automatiquement sur la langue par défaut. Fini les emails cassés !

---

## Génération et validation automatique

### Templates Liquid sécurisés

Le générateur utilise **Liquid** (comme Shopify) pour les templates. C'est sécurisé par design, pas de `eval()` ou autres trucs dangereux :

```liquid
<h1>{{ localizeMessage("welcome.title") }}</h1>
<p>{{ localizeMessage("welcome.message", user.name) }}</p>
```

### Triple validation

Avant de générer, l'outil vérifie :

1. **HTML valide** : Structure correcte, pas de tags cassés
2. **Liquid correct** : Syntaxe et variables OK  
3. **Traductions complètes** : Toutes les clés existent dans chaque langue

```bash
# Valide tout le projet
yarn validate

# Génère les templates finaux
yarn generate
```

---

## CLI interactif et dev experience

### Interface moderne avec Inquirer

L'outil pose les bonnes questions et génère la config automatiquement :

```bash
? Quelles langues supporter ? (en, fr, es)
? Email de bienvenue ? (welcome_email) 
? Adresse expéditeur ? noreply@monapp.com
? Template de base ? Sélectionner un template...
```

### Intégration dev complète

- **ESLint + Prettier** : Code propre automatique
- **Jest** : Tests unitaires pour la validation
- **TypeScript** : Typage strict, pas d'erreurs runtime
- **Build rapide** : 4 workers en parallèle

```bash
# Dev workflow complet
yarn lint     # Check le code
yarn test     # Lance les tests  
yarn build    # Compile tout
```

---

## Structure des templates générés

### Organisation des fichiers

Après génération, tu obtiens ça dans `dist/output/` :

```
dist/output/
├── welcome_email_en.html
├── welcome_email_fr.html  
├── welcome_email_es.html
├── password_reset_en.html
├── password_reset_fr.html
└── translations/
    ├── en.json
    ├── fr.json
    └── es.json
```

### Templates prêts pour Auth0

Chaque template est directement utilisable dans Auth0 :

```html
<!-- welcome_email_fr.html -->
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Bienvenue {{ user.name }} !</title>
</head>
<body>
  <h1>Salut {{ user.name }} 👋</h1>
  <p>Ton compte est créé, tu peux te connecter !</p>
</body>
</html>
```

---

## Plugins et extensibilité

### Système de plugins modulaire

Tu peux facilement étendre les fonctionnalités :

```typescript
// config.json
"plugins": [
  "html-validator",    // Valide le HTML
  "minifier",          // Minifie le code  
  "asset-optimizer",   // Optimise les images
  "analytics-tracker"  // Track l'utilisation
]
```

### Intégration CI/CD

Parfait pour GitHub Actions ou GitLab CI :

```yaml
# .github/workflows/emails.yml
- name: Générer les templates
  run: |
    yarn install
    yarn validate
    yarn generate
    
- name: Upload vers Auth0
  run: |
    # Script pour uploader les templates
    ./deploy-to-auth0.sh
```

---

## Cas d'usage concrets

### App multilingue complète

Disons que tu as une app avec utilisateurs français, anglais et espagnols :

1. **Setup initial** : `yarn init` et tu configures tes 3 langues
2. **Traductions** : Tu remplis les fichiers JSON dans `translations/`
3. **Templates** : Tu crées tes templates Liquid dans `templates/`
4. **Génération** : `yarn generate` produit tous les emails
5. **Upload Auth0** : Tu copies-colles dans ton dashboard Auth0

### Workflow équipe

```bash
# Le dev backend setup le projet
yarn init

# Le designer crée les templates HTML
vim templates/welcome_email.liquid

# Le traducteur remplit les JSON
vim translations/fr.json

# On génère et teste
yarn generate
yarn test

# On déploie en prod
git commit -am "feat: nouveaux emails multilingues"
```

---

## Pourquoi utiliser ça ?

### Gain de temps énorme

Plus de copy-paste manuel d'emails dans Auth0. Plus d'oublis de traductions. Plus d'emails cassés en prod.

**Avant** : 2-3 heures pour ajouter une langue  
**Après** : 10 minutes pour générer tous les templates

### Code maintenable

- **Version control** : Tes emails sont dans Git, pas perdus dans l'interface Auth0
- **Review process** : Les modifs passent par des PR comme le reste du code
- **Tests automatiques** : Impossible de déployer des templates cassés
- **Historique complet** : Tu vois qui a changé quoi et quand

### Équipe organisée

- **Séparation des rôles** : Dev = structure, Designer = HTML, Traducteur = contenu
- **Validation automatique** : Pas besoin de checker manuellement
- **Documentation live** : La config explique tout

---

## Conclusion

Si tu galères avec les emails Auth0 multilingues, cet outil peut te sauver la vie. C'est simple à utiliser, robuste et ça s'intègre bien dans un workflow de dev moderne.

L'approche TypeScript + CLI + templates Liquid rend le tout maintenable et évite les erreurs classiques qu'on voit souvent avec les emails d'auth.

Ça prend 10 minutes à setup et tu gagnes des heures sur chaque nouveau template ou nouvelle langue.

---

## Sources

1. [Auth0 International Email Generator - GitHub Repository](https://github.com/Lingelo/auth0-international-email) - Angelo Lima
2. [Auth0 Email Templates Documentation](https://auth0.com/docs/customize/email-templates) - Auth0 Official Documentation
3. [Liquid Template Language Documentation](https://shopify.github.io/liquid/) - Shopify
4. [TypeScript Project Configuration Best Practices](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) - TypeScript Team
5. [Node.js CLI Best Practices](https://github.com/lirantal/nodejs-cli-apps-best-practices) - Liran Tal