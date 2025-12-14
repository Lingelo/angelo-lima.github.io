---
layout: post
title: "MCP : Connecter Claude Code à Vos Outils"
subtitle: "Jour 13 - Intégrez GitHub, Jira, bases de données, et plus"
description: "Guide complet MCP dans Claude Code : installation de serveurs, configuration, authentification OAuth, et intégrations pratiques avec vos outils."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-13
categories: fr
---

J'ai déjà exploré le protocole MCP dans mon article [Model Context Protocol (MCP) : Révolution de l'Intégration des LLM](/fr/anthropic-mcp-model-context-protocol-integration-llm/). Aujourd'hui, nous allons voir comment l'utiliser concrètement dans Claude Code.

## Rappel : Qu'est-ce que MCP ?

Le **Model Context Protocol** est un standard ouvert qui permet à Claude de se connecter à des outils externes :
- Bases de données
- Trackers d'issues (Jira, GitHub Issues)
- Services cloud
- APIs internes

C'est l'**"USB-C de l'IA"** : une interface universelle.

## Les Trois Types de Transport

| Transport | Usage | Exemple |
|-----------|-------|---------|
| **HTTP** | Serveurs distants | Services cloud |
| **Stdio** | Processus locaux | Outils CLI |
| **SSE** | Legacy (déprécié) | Anciens serveurs |

## Installer un Serveur MCP

### Serveur HTTP (recommandé pour cloud)

```bash
claude mcp add --transport http github https://mcp.github.com/mcp
```

Avec authentification :

```bash
claude mcp add --transport http secure-api \
  --header "Authorization: Bearer $TOKEN" \
  https://api.example.com/mcp
```

### Serveur Stdio (processus local)

```bash
claude mcp add --transport stdio postgres \
  --env DATABASE_URL="postgres://user:pass@localhost/db" \
  -- npx postgres-mcp-server
```

### Exemple : Airtable

```bash
claude mcp add --transport stdio airtable \
  --env AIRTABLE_API_KEY=$AIRTABLE_KEY \
  -- npx -y airtable-mcp-server
```

## Les Trois Portées de Configuration

### 1. Portée Locale (perso, ce projet)

Stockée dans `~/.claude.json`, visible uniquement par vous.

```bash
claude mcp add --scope local ...
```

### 2. Portée Projet (équipe, ce repo)

Stockée dans `.mcp.json` à la racine du projet, versionnée avec Git.

```bash
claude mcp add --scope project ...
```

### 3. Portée Utilisateur (perso, tous projets)

Stockée dans `~/.claude.json`, disponible partout.

```bash
claude mcp add --scope user ...
```

## Gérer les Serveurs MCP

### Lister les Serveurs

```bash
claude mcp list
```

### Voir les Détails

```bash
claude mcp get github
```

### Supprimer un Serveur

```bash
claude mcp remove github
```

### Vérifier le Statut dans Claude Code

```
/mcp
```

## Configuration dans .mcp.json

Pour partager avec l'équipe :

```json
{
  "mcpServers": {
    "github": {
      "transport": "http",
      "url": "https://mcp.github.com/mcp"
    },
    "postgres": {
      "transport": "stdio",
      "command": "npx",
      "args": ["postgres-mcp-server"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    },
    "jira": {
      "transport": "http",
      "url": "https://mcp.atlassian.com/jira",
      "headers": {
        "Authorization": "Bearer ${JIRA_TOKEN}"
      }
    }
  }
}
```

## Authentification OAuth

Certains serveurs MCP supportent OAuth 2.0 :

```
/mcp
```

Puis sélectionnez le serveur et suivez le flux d'authentification dans le navigateur.

## Exemples d'Intégrations Pratiques

### GitHub : Issues et PRs

```bash
claude mcp add --transport http github https://mcp.github.com/mcp
```

Utilisation :
```
> Crée une issue GitHub pour le bug d'authentification
> Liste les PRs ouvertes sur ce repo
> Assigne-moi à la PR #42
```

### Jira : Gestion de Projet

```bash
claude mcp add --transport http jira \
  --header "Authorization: Bearer $JIRA_TOKEN" \
  https://mcp.atlassian.com/jira
```

Utilisation :
```
> Crée un ticket Jira pour cette feature
> Déplace le ticket PROJ-123 vers "In Review"
> Quels sont mes tickets assignés ?
```

### PostgreSQL : Base de Données

```bash
claude mcp add --transport stdio postgres \
  --env DATABASE_URL="postgres://..." \
  -- npx postgres-mcp-server
```

Utilisation :
```
> Montre-moi le schéma de la table users
> Écris une requête pour les utilisateurs inactifs depuis 30 jours
> Combien d'enregistrements dans la table orders ?
```

### Notion : Documentation

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

Utilisation :
```
> Ajoute cette documentation à la page "Architecture"
> Recherche les notes de réunion de la semaine dernière
```

## Gestion des Tokens

### Limite de Tokens MCP

Par défaut, Claude limite les réponses MCP à **25 000 tokens**.

Pour augmenter :

```bash
export MAX_MCP_OUTPUT_TOKENS=50000
```

### Avertissement à 10 000 Tokens

Claude vous avertit si une réponse MCP dépasse 10 000 tokens.

## Workflow avec MCP

### Exemple : Feature depuis un Ticket Jira

```
# 1. Lire le ticket
> Montre-moi les détails du ticket PROJ-456

# 2. Claude lit via MCP et comprend les requirements

# 3. Planifier
> ultrathink. Propose un plan d'implémentation

# 4. Implémenter
> Implémente l'étape 1

# 5. Mettre à jour Jira
> Mets à jour le ticket PROJ-456 avec le statut "In Progress"
  et ajoute un commentaire sur l'avancement
```

### Exemple : Debug avec Sentry

```bash
claude mcp add --transport http sentry \
  --header "Authorization: Bearer $SENTRY_TOKEN" \
  https://mcp.sentry.io
```

```
> Quelles sont les erreurs les plus fréquentes cette semaine ?

# Claude analyse via MCP

> Corrige l'erreur "TypeError: Cannot read property 'id' of null"
  qui apparaît dans src/api/users.ts
```

## Sécurité MCP

### Vérifier les Serveurs

Les serveurs MCP tiers peuvent avoir accès à vos données. Vérifiez :
- La source du serveur
- Les permissions demandées
- La politique de confidentialité

### Variables d'Environnement

Ne codez jamais les tokens en dur :

```json
{
  "env": {
    "API_KEY": "${MY_API_KEY}"  // ✅ Variable d'env
  }
}
```

```json
{
  "env": {
    "API_KEY": "sk-abc123..."   // ❌ Token en clair
  }
}
```

## Créer Votre Propre Serveur MCP

Pour des besoins internes, vous pouvez créer votre propre serveur MCP.

Structure de base (TypeScript) :

```typescript
import { Server } from '@modelcontextprotocol/sdk/server';

const server = new Server({
  name: 'my-server',
  version: '1.0.0'
});

// Définir les outils exposés
server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'my_tool',
    description: 'Description de mon outil',
    inputSchema: {
      type: 'object',
      properties: {
        param1: { type: 'string' }
      }
    }
  }]
}));

// Implémenter l'outil
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;
  // Logique de l'outil...
  return { result: '...' };
});

server.start();
```

## Ce qui Arrive Demain

Dans le **Jour 14**, nous verrons **Claude Code dans VS Code et JetBrains** - l'intégration IDE pour une expérience graphique.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 12 : Hooks](/fr/claude-code-hooks-fr/)*
