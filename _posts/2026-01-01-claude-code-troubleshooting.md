---
layout: post
title: "Troubleshooting Claude Code"
subtitle: "Jour 17 - Résoudre les problèmes courants"
description: "Guide complet de dépannage Claude Code : erreurs fréquentes, problèmes de connexion, limites de contexte et solutions pratiques."
thumbnail-img: "/assets/img/claude-code-series.webp"
cover-img: "/assets/img/claude-code-series.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-17
categories: fr
---

Claude Code est robuste, mais des problèmes peuvent survenir. Voici un guide complet pour diagnostiquer et résoudre les erreurs les plus courantes.

## Problèmes de connexion

### Erreur : "API Key invalid"

```
Error: Invalid API key
```

**Solutions** :

1. Vérifier la clé :
```bash
echo $ANTHROPIC_API_KEY
```

2. Reconfigurer :
```bash
claude config set apiKey sk-ant-...
```

3. Vérifier les permissions sur console.anthropic.com

### Erreur : "Rate limit exceeded"

```
Error: Rate limit exceeded. Please retry after X seconds.
```

**Solutions** :

1. Attendre le délai indiqué
2. Réduire la fréquence des requêtes
3. Passer à un plan supérieur (Max 20x)
4. Utiliser `/compact` pour réduire les tokens

### Erreur : "Connection timeout"

```
Error: Request timed out
```

**Solutions** :

1. Vérifier la connexion internet
2. Vérifier le statut : status.anthropic.com
3. Réessayer avec un timeout plus long :
```bash
claude --timeout 120000
```

## Problèmes de contexte

### Erreur : "Context window exceeded"

```
Error: Maximum context length exceeded
```

**Cause** : La conversation + fichiers dépassent la limite de tokens.

**Solutions** :

1. Utiliser `/compact` immédiatement :
```
/compact
```

2. Démarrer une nouvelle session :
```
/clear
```

3. Limiter les fichiers référencés :
```
❌ @src/**/*.ts  (trop de fichiers)
✅ @src/api/auth.ts  (fichier spécifique)
```

### Claude "oublie" des instructions

**Cause** : Le contexte est saturé et les anciennes instructions sont tronquées.

**Solutions** :

1. Ajouter les instructions au CLAUDE.md :
```markdown
# CLAUDE.md
## Règle importante
Toujours utiliser des early returns
```

2. Répéter les instructions critiques :
```
> Rappel : utilise TypeScript strict.
> Maintenant, implémente la feature X.
```

3. Utiliser `/compact` puis reformuler

### Fichier non trouvé

```
Error: File not found: @src/missing.ts
```

**Solutions** :

1. Vérifier le chemin :
```bash
ls src/missing.ts
```

2. Utiliser le chemin relatif correct :
```
@./src/missing.ts  (avec ./)
@src/missing.ts    (sans ./)
```

3. Vérifier les permissions de lecture

## Problèmes d'exécution

### Commande bash bloquée

```
Claude is waiting for permission...
```

**Solutions** :

1. Accepter ou refuser manuellement
2. Ajouter aux permissions :
```json
{
  "permissions": {
    "allow": ["Bash(npm run:*)"]
  }
}
```

3. Utiliser le mode Accept Edits (Shift+Tab)

### Erreur : "Tool not available"

```
Error: Tool 'WebFetch' is not available
```

**Cause** : L'outil est désactivé ou non disponible.

**Solutions** :

1. Vérifier les permissions :
```
/permissions
```

2. Activer l'outil dans settings.json

3. Vérifier que l'outil existe (certains sont expérimentaux)

### Boucle infinie

Claude continue sans fin sur une tâche.

**Solutions** :

1. Interrompre avec `Ctrl+C`
2. Utiliser `Esc Esc` pour revenir en arrière
3. Reformuler avec une limite :
```
> Fais cette tâche en maximum 3 étapes
```

## Problèmes de performance

### Réponses très lentes

**Causes possibles** :
- Contexte trop large
- Charge serveur élevée
- Connexion réseau lente

**Solutions** :

1. Réduire le contexte :
```
/compact
```

2. Limiter les fichiers :
```
> Analyse uniquement @src/api/auth.ts
```

3. Utiliser un modèle plus rapide :
```bash
claude --model haiku
```

### Coûts élevés

**Diagnostic** :
```
/cost
```

**Solutions** :

1. `/compact` régulièrement
2. Être plus précis dans les prompts
3. Éviter les lectures massives de fichiers
4. Utiliser Haiku pour les tâches simples

## Problèmes d'installation

### npm install échoue

```bash
npm install -g @anthropic-ai/claude-code
# Error: EACCES permission denied
```

**Solutions** :

1. Utiliser npx :
```bash
npx @anthropic-ai/claude-code
```

2. Fixer les permissions npm :
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

3. Utiliser un gestionnaire de versions Node :
```bash
nvm use 20
npm install -g @anthropic-ai/claude-code
```

### Version Node incompatible

```
Error: Unsupported Node.js version
```

**Solution** :
```bash
nvm install 18  # ou 20
nvm use 18
```

## Problèmes avec les hooks

### Hook ne s'exécute pas

**Vérifications** :

1. Syntaxe du hook :
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Edit",
      "hooks": [{
        "type": "command",
        "command": "echo 'Hook triggered'"
      }]
    }]
  }
}
```

2. Logs de debug :
```bash
CLAUDE_CODE_DEBUG=1 claude
```

3. Permissions du script :
```bash
chmod +x ./scripts/hook.sh
```

### Hook bloque Claude

```
Hook returned: BLOCK
```

**C'est intentionnel** si le hook détecte un problème.

**Solutions** :

1. Vérifier les conditions du hook
2. Modifier le fichier concerné pour satisfaire le hook
3. Désactiver temporairement le hook

## Problèmes avec MCP

### Serveur MCP ne démarre pas

```
Error: Failed to connect to MCP server
```

**Solutions** :

1. Vérifier l'installation :
```bash
npx postgres-mcp-server --version
```

2. Tester manuellement :
```bash
npx postgres-mcp-server
```

3. Vérifier les variables d'environnement :
```bash
echo $DATABASE_URL
```

### Timeout MCP

```
Error: MCP server timed out
```

**Solutions** :

1. Augmenter le timeout :
```json
{
  "mcpServers": {
    "postgres": {
      "timeout": 30000
    }
  }
}
```

2. Vérifier la connectivité réseau vers le service

## Diagnostic général

### Mode debug

```bash
CLAUDE_CODE_DEBUG=1 claude
```

Affiche des logs détaillés pour identifier le problème.

### Vérifier la configuration

```bash
claude config list
```

### Réinitialiser la configuration

```bash
rm -rf ~/.claude
claude config set apiKey sk-ant-...
```

### Vérifier les logs

```bash
cat ~/.claude/logs/claude-code.log
```

## Checklist de dépannage

```
□ Connexion internet OK ?
□ API Key valide ?
□ Version Node.js compatible (≥18) ?
□ Claude Code à jour ?
□ Permissions fichiers OK ?
□ Contexte pas saturé ?
□ Hooks configurés correctement ?
□ MCP servers accessibles ?
```

## Obtenir de l'aide

### Documentation officielle

```
/help
```

### Communauté

- GitHub Issues : github.com/anthropics/claude-code/issues
- Discord Anthropic
- Stack Overflow tag `claude-code`

### Support Anthropic

Pour les clients Enterprise : support.anthropic.com

## Ce qui vous attend demain

Dans le **Jour 18**, nous explorerons la **status line et personnalisation du terminal** - configurez l'affichage de Claude Code selon vos préférences.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 16 : Facturation et coûts](/fr/claude-code-facturation-couts/)*
