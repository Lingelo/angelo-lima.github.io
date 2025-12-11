---
layout: post
title: "Permissions et sécurité dans Claude Code"
subtitle: "Jour 7 - Protéger vos fichiers sensibles et contrôler les actions"
description: "Maîtrisez le système de permissions de Claude Code : allow/ask/deny, protection des secrets, modes de permission et bonnes pratiques de sécurité."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement, Sécurité]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-7
categories: fr
---

Claude Code a accès à votre système de fichiers et peut exécuter des commandes bash. C'est puissant, mais ça nécessite des garde-fous. Aujourd'hui, nous allons voir comment sécuriser votre environnement.

## Le modèle de permissions par défaut

Par défaut, Claude Code fonctionne en mode **read-only strict** :

| Action | Permission par défaut |
|--------|----------------------|
| Lire des fichiers | ✅ Autorisé |
| Rechercher (Glob, Grep) | ✅ Autorisé |
| Écrire/Modifier des fichiers | ❌ Demande approbation |
| Exécuter des commandes bash | ❌ Demande approbation |
| Accès web (WebFetch) | ❌ Demande approbation |

## Anatomie du système de permissions

### Les trois niveaux

```json
{
  "permissions": {
    "allow": [...],   // Autorisé sans demander
    "ask": [...],     // Demande à chaque fois
    "deny": [...]     // Refusé systématiquement
  }
}
```

### Syntaxe des règles

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run:*)",           // Toutes les commandes npm run
      "Bash(git commit:*)",         // Tous les git commit
      "Read(~/.zshrc)"              // Fichier spécifique
    ],
    "ask": [
      "Bash(git push:*)"            // Demande avant push
    ],
    "deny": [
      "Read(./.env)",               // Bloquer .env
      "Read(./.env.*)",             // Bloquer .env.local, .env.prod...
      "Read(./secrets/**)",         // Bloquer tout le dossier secrets
      "WebFetch"                    // Bloquer les requêtes web
    ]
  }
}
```

## Les outils et leurs permissions

### Outils sans permission requise

| Outil | Description |
|-------|-------------|
| `Read` | Lire le contenu des fichiers |
| `Glob` | Rechercher des fichiers par pattern |
| `Grep` | Rechercher dans le contenu des fichiers |
| `AskUserQuestion` | Poser une question à l'utilisateur |

### Outils nécessitant une permission

| Outil | Description | Risque |
|-------|-------------|--------|
| `Write` | Créer/écraser des fichiers | Moyen |
| `Edit` | Modifier des fichiers existants | Moyen |
| `Bash` | Exécuter des commandes shell | **Élevé** |
| `WebFetch` | Télécharger du contenu web | Moyen |
| `WebSearch` | Effectuer des recherches web | Faible |

## Configurer les permissions

### Méthode 1 : Via la commande /permissions

```
/permissions
```

Interface interactive pour gérer les permissions.

### Méthode 2 : Dans settings.json

Fichier `.claude/settings.json` :

```json
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(yarn:*)",
      "Bash(pnpm:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./config/credentials.*)",
      "Bash(rm -rf:*)",
      "Bash(sudo:*)"
    ]
  }
}
```

### Méthode 3 : "Always allow" pendant la session

Quand Claude demande une permission, vous pouvez choisir :
- **Allow once** : Autoriser cette fois
- **Always allow** : Autoriser pour cette session et les futures

## Protection des fichiers sensibles

### Template de protection recommandé

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./**/*credentials*)",
      "Read(./**/*secret*)",
      "Read(./**/apikey*)",
      "Read(./config/production.*)",
      "Read(./.git/config)",
      "Read(~/.ssh/**)",
      "Read(~/.aws/**)",
      "Read(~/.kube/**)"
    ]
  }
}
```

### Fichiers couramment sensibles

| Type | Exemples |
|------|----------|
| Variables d'environnement | `.env`, `.env.local`, `.env.production` |
| Credentials | `credentials.json`, `serviceAccount.json` |
| Clés SSH | `~/.ssh/id_rsa`, `~/.ssh/config` |
| Cloud configs | `~/.aws/credentials`, `~/.kube/config` |
| Git secrets | `.git/config` (peut contenir des tokens) |

## Les modes de permission

### Mode 1 : Approbation individuelle (défaut)

Chaque action sensible demande confirmation :

```
Claude veut exécuter : npm install lodash
[Allow once] [Always allow] [Deny]
```

### Mode 2 : Accept Edits

Accepte automatiquement les modifications de fichiers, mais demande pour les commandes bash :

```
Shift+Tab → Accept Edits mode
```

### Mode 3 : YOLO (dangereux)

⚠️ **Non recommandé en production**

```bash
claude --dangerously-skip-permissions
```

Toutes les actions sont automatiquement approuvées. À utiliser uniquement :
- Dans des environnements isolés (containers)
- Pour des scripts automatisés contrôlés
- Jamais sur votre machine de développement principale

## Commandes bash à risque

### Blocklist recommandée

```json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(rm -r:*)",
      "Bash(sudo:*)",
      "Bash(chmod 777:*)",
      "Bash(curl|sh)",
      "Bash(wget|sh)",
      "Bash(> /dev:*)",
      "Bash(mkfs:*)",
      "Bash(dd:*)"
    ]
  }
}
```

### Détection automatique

Claude Code détecte automatiquement les patterns suspects :
- Injection de commandes
- Pipes vers des shells
- Redirections dangereuses

Même si une commande est dans `allow`, les patterns suspects déclenchent une demande.

## Permissions pour les équipes

### Fichier partagé .claude/settings.json

Commitez ce fichier dans votre repo pour des permissions cohérentes en équipe :

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run:*)",
      "Bash(npm test:*)",
      "Bash(git:*)"
    ],
    "deny": [
      "Read(./.env*)",
      "Bash(npm publish:*)"
    ]
  }
}
```

### Permissions Enterprise

Pour les organisations, des policies globales peuvent être définies :

```
Enterprise Policy (priorité max)
    │
    ├─ deny: Read(./secrets/**)
    ├─ deny: Bash(curl:*)
    └─ deny: WebFetch
```

Ces règles ne peuvent pas être outrepassées par les utilisateurs.

## Audit et monitoring

### Logs des actions

Claude Code peut logger toutes les actions pour audit :

```bash
CLAUDE_CODE_ENABLE_TELEMETRY=1 claude
```

### Métriques disponibles

- Commandes bash exécutées
- Fichiers modifiés
- Tokens consommés
- Erreurs et refus

## Bonnes pratiques de sécurité

### 1. Principe du moindre privilège

```json
{
  "permissions": {
    "allow": [
      // Seulement ce qui est nécessaire
      "Bash(npm run dev)",
      "Bash(npm run test)",
      "Bash(npm run lint)"
    ]
    // Tout le reste demande approbation
  }
}
```

### 2. Review systématique

Avant d'approuver une commande bash :
- Lisez la commande complète
- Vérifiez les arguments
- Méfiez-vous des pipes et redirections

### 3. Environnements isolés pour l'expérimentation

```bash
# Utiliser Docker pour les tests risqués
docker run -it --rm -v $(pwd):/app node:18 bash
```

### 4. Vérification des hooks

Les hooks Claude Code ont accès aux credentials de l'environnement. Avant d'ajouter un hook :
- Vérifiez le code source
- Testez dans un environnement isolé

### 5. Rotation des secrets

Si vous suspectez une exposition :
1. Révoquez immédiatement les tokens/clés
2. Auditez les logs Claude Code
3. Générez de nouveaux secrets

## Template de configuration sécurisée

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run:*)",
      "Bash(yarn:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git branch:*)",
      "Bash(git checkout:*)",
      "Bash(ls:*)",
      "Bash(cat:*)",
      "Bash(head:*)",
      "Bash(tail:*)"
    ],
    "ask": [
      "Bash(git push:*)",
      "Bash(git merge:*)",
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./**/*credential*)",
      "Read(./**/*secret*)",
      "Read(~/.ssh/**)",
      "Read(~/.aws/**)",
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(chmod 777:*)",
      "WebFetch"
    ]
  }
}
```

## Ce qui vous attend demain

Dans le **Jour 8**, nous commencerons la phase de personnalisation avec la **création de slash commands personnalisées** pour automatiser vos workflows récurrents.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 6 : Git workflows](/fr/claude-code-git-workflows/)*
