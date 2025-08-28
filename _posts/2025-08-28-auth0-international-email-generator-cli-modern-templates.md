---
layout: post
title: "Auth0 International Email Generator: CLI for Multilingual Templates"
subtitle: "TypeScript tool to automatically generate Auth0 email internationalization i18n templates"
description: "TypeScript CLI to create multilingual Auth0 email templates with automatic validation, language fallback, and CI/CD integration. Complete solution for authentication email internationalization."
cover-img: /assets/img/auth0-international-email.webp
share-img: /assets/img/auth0-international-email.webp
tags: [Développement, Web, Sécurité, Auth0, TypeScript, i18n]
author: Angelo Lima
lang: en
ref: auth0-international-email
categories: en
---

## Auth0 Email Internationalization: The Challenge of Multilingual Templates

**Auth0 multilingual email management** and **authentication template internationalization** represent a major challenge for developers. Between **email translation**, **HTML template validation**, **language fallback management**, and integration across different environments, i18n projects quickly become complex.

To solve these **Auth0 internationalization** challenges, I developed the [Auth0 International Email Generator](https://github.com/Lingelo/auth0-international-email)¹. This **TypeScript CLI tool** automates **multilingual email template generation** with integrated validation, fallback systems, and complete configuration for **international authentication**.

---

## How does it work?

### Quick installation and setup

```bash
# Clone the repo
git clone https://github.com/Lingelo/auth0-international-email.git
cd auth0-international-email

# Install dependencies
yarn install

# Interactive project setup
yarn init
```

### Multilingual Configuration and i18n Internationalization

The **internationalized configuration** in `config.json` handles all aspects of **i18n for Auth0**:

```json
{
  "supportedLanguages": ["en", "fr", "es", "de", "pt"],
  "defaultLanguage": "en",
  "fallbackStrategy": "cascade",
  "templates": {
    "welcome_email": {
      "fromAddress": "hello@myapp.com",
      "subjectKey": "welcome.subject",
      "i18nEnabled": true
    },
    "password_reset": {
      "fromAddress": "security@myapp.com",
      "subjectKey": "password.reset.subject"
    }
  }
}
```

If an **Auth0 email translation** is missing, the **intelligent language fallback** system automatically switches to the default language. No more **broken authentication emails** in production!

---

## Automatic generation and validation

### Secure Liquid Templates for Internationalization

The **Auth0 template generator** uses **Liquid** (Shopify's template engine) to create **secure internationalized emails**. This approach avoids vulnerabilities like `eval()`:

```liquid
<h1>{{ localizeMessage("welcome.title") }}</h1>
<p>{{ localizeMessage("welcome.message", user.name) }}</p>
<p>{{ localizeMessage("welcome.cta") }}</p>
<footer>{{ localizeMessage("footer.company") }}</footer>
```

Each **multilingual email template** benefits from **automatic internationalization** with user variable management.

### Triple validation

Before generating, the tool checks:

1. **Valid HTML**: Correct structure, no broken tags
2. **Correct Liquid**: Syntax and variables OK
3. **Complete translations**: All keys exist in every language

```bash
# Validate entire project
yarn validate

# Generate final templates
yarn generate
```

---

## Interactive CLI and developer experience

### Modern interface with Inquirer

The tool asks the right questions and generates the config automatically:

```bash
? Which languages to support? (en, fr, es)
? Welcome email? (welcome_email) 
? Sender address? noreply@myapp.com
? Base template? Select a template...
```

### Complete dev integration

- **ESLint + Prettier**: Automatic clean code
- **Jest**: Unit tests for validation
- **TypeScript**: Strict typing, no runtime errors
- **Fast build**: 4 parallel workers

```bash
# Complete dev workflow
yarn lint     # Check code
yarn test     # Run tests  
yarn build    # Compile everything
```

---

## Generated template structure

### File organization

After generation, you get this in `dist/output/`:

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

### Templates ready for Auth0

Each template is directly usable in Auth0:

```html
<!-- welcome_email_fr.html -->
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Welcome {{ user.name }}!</title>
</head>
<body>
  <h1>Hi {{ user.name }} 👋</h1>
  <p>Your account is created, you can log in!</p>
</body>
</html>
```

---

## Plugins and extensibility

### Modular plugin system

You can easily extend functionality:

```typescript
// config.json
"plugins": [
  "html-validator",    // Validate HTML
  "minifier",          // Minify code  
  "asset-optimizer",   // Optimize images
  "analytics-tracker"  // Track usage
]
```

### CI/CD integration

Perfect for GitHub Actions or GitLab CI:

```yaml
# .github/workflows/emails.yml
- name: Generate templates
  run: |
    yarn install
    yarn validate
    yarn generate
    
- name: Upload to Auth0
  run: |
    # Script to upload templates
    ./deploy-to-auth0.sh
```

---

## Real-world use cases

### Complete multilingual app

Say you have an app with French, English and Spanish users:

1. **Initial setup**: `yarn init` and configure your 3 languages
2. **Translations**: Fill JSON files in `translations/`
3. **Templates**: Create your Liquid templates in `templates/`
4. **Generation**: `yarn generate` produces all emails
5. **Auth0 upload**: Copy-paste into your Auth0 dashboard

### Team workflow

```bash
# Backend dev sets up project
yarn init

# Designer creates HTML templates
vim templates/welcome_email.liquid

# Translator fills JSON files
vim translations/fr.json

# Generate and test
yarn generate
yarn test

# Deploy to prod
git commit -am "feat: new multilingual emails"
```

---

## Why use this?

### Huge time savings

No more manual copy-pasting of emails into Auth0. No more forgotten translations. No more broken emails in prod.

**Before**: 2-3 hours to add a language  
**After**: 10 minutes to generate all templates

### Maintainable code

- **Version control**: Your emails are in Git, not lost in the Auth0 interface
- **Review process**: Changes go through PRs like the rest of your code
- **Automatic tests**: Impossible to deploy broken templates
- **Complete history**: You see who changed what and when

### Organized team

- **Role separation**: Dev = structure, Designer = HTML, Translator = content
- **Automatic validation**: No need to check manually
- **Live documentation**: The config explains everything

---

## Conclusion: Master Your Auth0 Email Internationalization

The **Auth0 International Email Generator** revolutionizes **multilingual authentication email management**. This **TypeScript + CLI + Liquid** solution dramatically simplifies **Auth0 template internationalization** while ensuring security and maintainability.

For teams facing **Auth0 i18n** challenges, this **internationalization tool** offers:

- **Automatic generation** of multilingual templates
- **Integrated validation** of translations and syntax
- **CI/CD integration** for professional workflows
- **Intelligent language fallback** to prevent errors

Investment: **10 minutes setup**  
Return: **Hours saved** on every new template or added language

An essential solution for any project requiring **robust international authentication**.

---

## Sources

1. [Auth0 International Email Generator - GitHub Repository](https://github.com/Lingelo/auth0-international-email) - Angelo Lima
2. [Auth0 Email Templates Documentation](https://auth0.com/docs/customize/email-templates) - Auth0 Official Documentation
3. [Liquid Template Language Documentation](https://shopify.github.io/liquid/) - Shopify
4. [TypeScript Project Configuration Best Practices](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) - TypeScript Team
5. [Node.js CLI Best Practices](https://github.com/lirantal/nodejs-cli-apps-best-practices) - Liran Tal