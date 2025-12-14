---
layout: post
title: "Hooks : Automatiser les Réactions aux Événements"
subtitle: "Jour 12 - Déclenchez des actions automatiques dans Claude Code"
description: "Maîtrisez les hooks Claude Code : 9 types d'événements, configuration, cas d'usage pour la sécurité, le formatage et l'automatisation."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-12
categories: fr
---

Les hooks permettent d'exécuter des actions automatiques en réponse aux événements Claude Code. C'est le pont entre Claude et vos outils de développement. Aujourd'hui, nous allons voir comment les utiliser et les créer.

## Qu'est-ce qu'un Hook ?

Un hook est un **gestionnaire d'événement** qui s'exécute quand Claude Code fait quelque chose de spécifique :
- Avant/après l'exécution d'un outil
- Au démarrage/fin de session
- Quand l'utilisateur soumet un prompt
- etc.

## Les 9 Types de Hooks

| Hook | Déclencheur | Peut Bloquer |
|------|-------------|--------------|
| `SessionStart` | Début de session | Non |
| `SessionEnd` | Fin de session | Non |
| `PreToolUse` | Avant exécution d'outil | **Oui** |
| `PostToolUse` | Après exécution d'outil | Non |
| `UserPromptSubmit` | Soumission de prompt | **Oui** |
| `Notification` | Notification Claude | Non |
| `Stop` | Arrêt utilisateur | Non |
| `SubagentStop` | Fin de subagent | Non |
| `PreCompact` | Avant compaction du contexte | Non |

## Configuration des Hooks

### Emplacement

Dans `.claude/settings.json` :

```json
{
  "hooks": {
    "NomDuHook": [
      {
        "matcher": "pattern-optionnel",
        "hooks": [
          {
            "type": "command",
            "command": "chemin/vers/script.sh"
          }
        ]
      }
    ]
  }
}
```

### Structure d'un Hook

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write $FILE"
          }
        ]
      }
    ]
  }
}
```

**Explication :**
- `PostToolUse` : Se déclenche après utilisation d'un outil
- `matcher: "Edit"` : Uniquement quand l'outil "Edit" est utilisé
- `command` : La commande à exécuter

## Exemples de Hooks Utiles

### Hook : Auto-format Après Édition

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write $EDITED_FILE"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write $WRITTEN_FILE"
          }
        ]
      }
    ]
  }
}
```

### Hook : Vérification Git Avant Sortie

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/git-check.sh"
          }
        ]
      }
    ]
  }
}
```

Script `git-check.sh` :

```bash
#!/bin/bash

# Vérifier les changements non commités
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  Attention : changements non commités !"
    git status --short
fi
```

### Hook : Bloquer les Patterns Dangereux

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/security-check.sh"
          }
        ]
      }
    ]
  }
}
```

Script `security-check.sh` :

```bash
#!/bin/bash

# Lire la commande depuis stdin
read -r command

# Patterns dangereux
dangerous_patterns=(
    "rm -rf /"
    "rm -rf ~"
    "sudo rm"
    "> /dev/"
    "mkfs"
    "dd if="
    "chmod 777"
)

for pattern in "${dangerous_patterns[@]}"; do
    if [[ "$command" == *"$pattern"* ]]; then
        echo "BLOQUÉ : Commande dangereuse détectée : $pattern"
        exit 1  # Exit 1 = bloquer l'action
    fi
done

exit 0  # Exit 0 = autoriser
```

### Hook : Logger les Actions

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/log-action.sh"
          }
        ]
      }
    ]
  }
}
```

Script `log-action.sh` :

```bash
#!/bin/bash

# Lire les infos de l'outil depuis stdin (JSON)
read -r json

# Extraire les infos avec jq
tool=$(echo "$json" | jq -r '.tool')
timestamp=$(date +"%Y-%m-%d %H:%M:%S")

# Logger
echo "[$timestamp] Tool: $tool" >> ~/.claude/logs/actions.log
```

### Hook : Notification de Fin de Tâche

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/notify.sh"
          }
        ]
      }
    ]
  }
}
```

Script `notify.sh` (macOS) :

```bash
#!/bin/bash
osascript -e 'display notification "Claude a terminé" with title "Claude Code"'
```

Script `notify.sh` (Linux) :

```bash
#!/bin/bash
notify-send "Claude Code" "Claude a terminé"
```

### Hook : Setup Environnement au Démarrage

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/session-start.sh"
          }
        ]
      }
    ]
  }
}
```

Script `session-start.sh` :

```bash
#!/bin/bash

# Activer l'environnement virtuel Python si présent
if [[ -f ".venv/bin/activate" ]]; then
    source .venv/bin/activate
fi

# Charger les variables d'environnement
if [[ -f ".env.development" ]]; then
    export $(grep -v '^#' .env.development | xargs)
fi

# Vérifier les prérequis
command -v node >/dev/null || echo "⚠️  Node.js non trouvé"
command -v npm >/dev/null || echo "⚠️  npm non trouvé"
```

## Patterns de Matcher

### Pas de Matcher (Tous les Événements)

```json
{
  "matcher": "",
  "hooks": [...]
}
```

### Matcher sur un Outil Spécifique

```json
{
  "matcher": "Bash",
  "hooks": [...]
}
```

### Matcher avec Regex

```json
{
  "matcher": "Bash\\(npm.*\\)",
  "hooks": [...]
}
```

## Données Disponibles

Les hooks reçoivent des données via **stdin** au format JSON :

### PreToolUse / PostToolUse

```json
{
  "tool": "Edit",
  "input": {
    "file_path": "/path/to/file.ts",
    "old_string": "...",
    "new_string": "..."
  },
  "output": "..." // Uniquement pour PostToolUse
}
```

### SessionStart

```json
{
  "cwd": "/path/to/project",
  "model": "claude-sonnet-4-5-20250929",
  "sessionId": "abc123"
}
```

## Bloquer des Actions

Un hook `PreToolUse` ou `UserPromptSubmit` peut **bloquer** l'action :

```bash
# Exit code 0 = autoriser
exit 0

# Exit code != 0 = bloquer
exit 1
```

Message de blocage :

```bash
echo "BLOQUÉ : Raison du blocage"
exit 1
```

## Sécurité des Hooks

### ⚠️ Attention

Les hooks s'exécutent avec **vos permissions utilisateur**. Un hook malveillant pourrait :
- Lire vos fichiers
- Exfiltrer des données
- Modifier votre système

### Bonnes Pratiques

1. **Vérifiez le code** avant d'ajouter un hook externe
2. **Testez en isolation** dans un environnement safe
3. **Limitez les permissions** des scripts
4. **Auditez régulièrement** les hooks installés

## Déboguer les Hooks

### Activer les Logs

```bash
CLAUDE_CODE_DEBUG=hooks claude
```

### Tester un Script Manuellement

```bash
echo '{"tool": "Edit", "input": {...}}' | ./mon-hook.sh
echo $?  # Vérifier le code de sortie
```

## Organisation Recommandée

```
~/.claude/
├── hooks/
│   ├── security-check.sh
│   ├── git-check.sh
│   ├── log-action.sh
│   ├── notify.sh
│   └── session-start.sh
├── logs/
│   └── actions.log
└── settings.json
```

## Ce qui Arrive Demain

Dans le **Jour 13**, nous verrons **MCP : Connecter Claude Code à Vos Outils** - comment intégrer GitHub, Jira, bases de données, et autres services externes.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 11 : Plugins et Marketplace](/fr/claude-code-plugins-marketplace-fr/)*
