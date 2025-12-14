---
layout: post
title: "Plugins Claude Code et Marketplace"
subtitle: "Jour 11 - Étendez Claude Code avec l'écosystème communautaire"
description: "Découvrez le marketplace de plugins Claude Code : installation, création de plugins, publication, et meilleures extensions pour développeurs."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-11
categories: fr
---

Nous avons vu comment créer des commandes slash, subagents et skills individuellement. Les **Plugins** permettent de les packager ensemble et de les partager. Aujourd'hui, nous explorons l'écosystème de plugins Claude Code.

## Qu'est-ce qu'un Plugin ?

Un plugin est un **pack** qui peut contenir :
- Commandes slash
- Subagents
- Skills
- Hooks
- Serveurs MCP

Le tout dans une structure standardisée, facile à installer et partager.

## Installer des Plugins

### Via la Commande /plugin

```
/plugin install nom-du-plugin
```

### Depuis un Marketplace

```
/plugin install nom-du-plugin@nom-du-marketplace
```

### Depuis un Repo Git

```
/plugin install https://github.com/user/nom-du-plugin
```

### Depuis un Dossier Local

```
/plugin install ./mon-plugin-local
```

## Gérer les Plugins Installés

### Lister les Plugins

```
/plugin list
```

### Voir les Détails d'un Plugin

```
/plugin info nom-du-plugin
```

### Supprimer un Plugin

```
/plugin remove nom-du-plugin
```

## Structure d'un Plugin

```
my-plugin/
├── .claude-plugin/
│   ├── plugin.json         # Métadonnées (requis)
│   └── marketplace.json    # Pour publication sur marketplace
├── commands/               # Commandes slash
│   ├── review.md
│   └── deploy.md
├── agents/                 # Subagents
│   └── security-expert.md
├── skills/                 # Skills
│   └── api-tester/
│       └── SKILL.md
├── hooks/                  # Hooks
│   └── pre-commit.json
├── .mcp.json              # Serveurs MCP
└── README.md              # Documentation
```

## Le Fichier plugin.json

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Description de ce que fait le plugin",
  "author": {
    "name": "Votre Nom",
    "email": "email@example.com",
    "url": "https://votre-site.com"
  },
  "repository": "https://github.com/user/my-plugin",
  "keywords": ["security", "testing", "automation"],
  "license": "MIT",
  "components": {
    "commands": ["commands/"],
    "agents": ["agents/"],
    "skills": ["skills/"],
    "hooks": ["hooks/"],
    "mcpServers": [".mcp.json"]
  }
}
```

## Marketplaces

### Concept

Un marketplace est un **registre** de plugins, hébergé sur GitHub ou ailleurs.

### Ajouter un Marketplace

```
/plugin marketplace add owner/repo
```

Ou avec une URL Git :

```
/plugin marketplace add https://gitlab.com/team/plugins.git
```

### Marketplaces Populaires

| Marketplace | Description | Nombre de Plugins |
|-------------|-------------|-------------------|
| Awesome Claude Code | Collection communautaire | 130+ agents |
| Claude Code Plugins Plus | Production-ready | 185+ skills |
| Grey Haven Studio | Dev, testing, sécurité | 13 plugins |

### Structure d'un Marketplace

```json
{
  "name": "my-marketplace",
  "owner": {
    "name": "My Team",
    "email": "team@example.com"
  },
  "plugins": [
    {
      "name": "security-suite",
      "source": "./plugins/security-suite",
      "description": "Suite d'outils de sécurité"
    },
    {
      "name": "testing-tools",
      "source": "https://github.com/team/testing-tools",
      "description": "Outils de test automatisé"
    }
  ]
}
```

## Créer Votre Premier Plugin

### Étape 1 : Créer la Structure

```bash
mkdir my-first-plugin
cd my-first-plugin
mkdir -p .claude-plugin commands agents skills
```

### Étape 2 : Créer plugin.json

```json
{
  "name": "my-first-plugin",
  "version": "1.0.0",
  "description": "Mon premier plugin Claude Code",
  "author": {
    "name": "Votre Nom"
  },
  "components": {
    "commands": ["commands/"],
    "agents": ["agents/"]
  }
}
```

### Étape 3 : Ajouter une Commande

```markdown
<!-- commands/hello.md -->
---
description: Commande d'accueil
---

# /hello

Dis bonjour à l'utilisateur avec son nom : $1

Sois amical et propose de l'aider avec son projet.
```

### Étape 4 : Ajouter un Agent

```markdown
<!-- agents/helper.md -->
---
name: helper
description: Assistant de développement général
tools: Read, Grep, Glob
---

Vous êtes un assistant de développement amical et compétent.

## Votre Rôle
Aider les développeurs avec leurs questions techniques.

## Style
- Réponses concises mais complètes
- Exemples de code quand pertinent
- Toujours proposer des alternatives
```

### Étape 5 : Tester Localement

```
/plugin install ./my-first-plugin
/hello Angelo
> @helper Comment structurer un projet React ?
```

## Plugins Recommandés

### Pour la Sécurité

**Security Patterns Plugin**
- 9 patterns de sécurité automatiques
- Détection XSS, injection, CSRF
- Hooks pre-commit pour validation

```
/plugin install security-patterns
```

### Pour les Tests

**Test Generator Plugin**
- Génération automatique de tests
- Support Vitest, Jest, Mocha
- Couverture des edge cases

```
/plugin install test-generator
```

### Pour le Déploiement

**Deploy Helper Plugin**
- Scripts de déploiement
- Intégration CI/CD
- Rollback automatique

```
/plugin install deploy-helper
```

### Pour la Documentation

**Doc Generator Plugin**
- JSDoc automatique
- Génération de README
- Gestion de changelog

```
/plugin install doc-generator
```

## Publier Votre Plugin

### Option 1 : GitHub Public

1. Poussez votre plugin sur GitHub
2. Les utilisateurs installent avec :
   ```
   /plugin install https://github.com/vous/votre-plugin
   ```

### Option 2 : Marketplace d'Équipe

1. Créez un repo marketplace :

```json
{
  "name": "team-plugins",
  "plugins": [
    {
      "name": "votre-plugin",
      "source": "./plugins/votre-plugin"
    }
  ]
}
```

2. Partagez avec l'équipe :
   ```
   /plugin marketplace add team/team-plugins
   /plugin install votre-plugin@team-plugins
   ```

### Option 3 : Marketplace Public

Soumettez votre plugin aux marketplaces communautaires (voir leurs guidelines).

## Bonnes Pratiques pour les Plugins

### 1. Documentation Claire

```markdown
# Mon Plugin

## Installation
\`\`\`
/plugin install mon-plugin
\`\`\`

## Commandes Disponibles
- `/commande1` - Description
- `/commande2` - Description

## Agents Disponibles
- `@agent1` - Description

## Configuration
...
```

### 2. Versioning Sémantique

```json
{
  "version": "1.2.3"
  // MAJEURE.MINEURE.PATCH
  // 1 = breaking changes
  // 2 = nouvelles features
  // 3 = bug fixes
}
```

### 3. Tester Vos Composants

Avant de publier :
- Testez chaque commande
- Vérifiez les agents sur plusieurs cas
- Validez que les skills s'activent correctement

### 4. Permissions Minimales

```json
{
  "components": {
    "agents": [{
      "tools": ["Read", "Grep", "Glob"]
      // Pas de Write ou Bash si pas nécessaire
    }]
  }
}
```

## Plugins pour les Équipes

### Marketplace Privé

```
.claude/settings.json
```

```json
{
  "extraKnownMarketplaces": {
    "team-internal": {
      "source": {
        "source": "github",
        "repo": "org/internal-plugins"
      }
    }
  }
}
```

### Plugins Partagés via Git

Incluez le plugin dans votre repo :

```
project/
├── .claude/
│   └── plugins/
│       └── notre-plugin/
└── src/
```

## Ce qui Arrive Demain

Dans le **Jour 12**, nous commencerons la phase d'intégration avec les **Hooks** : comment automatiser des actions en réponse aux événements Claude Code.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 10 : Skills](/fr/claude-code-skills-fr/)*
