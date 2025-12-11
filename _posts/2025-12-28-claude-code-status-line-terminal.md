---
layout: post
title: "Status line et personnalisation du terminal"
subtitle: "Jour 18 - Configurer l'affichage de Claude Code"
description: "Personnalisez Claude Code : status line, mode vim, thèmes de terminal, raccourcis clavier et configuration avancée de l'interface."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-18
categories: fr
---

Claude Code s'exécute dans votre terminal. Saviez-vous que vous pouvez personnaliser son apparence et son comportement ? Voyons comment adapter l'interface à vos préférences.

## La Status Line

### Qu'est-ce que la status line ?

La barre en bas de l'écran qui affiche :
- Le modèle actif
- Le nombre de tokens utilisés
- Le coût de la session
- Le statut de connexion

### Personnaliser la status line

Via la commande `/config` :

```
/config
```

Options de status line :
- **Minimal** : Juste le modèle
- **Standard** : Modèle + tokens
- **Detailed** : Tout (modèle, tokens, coût, latence)
- **Hidden** : Pas de status line

### Configuration dans settings

```json
{
  "statusLine": {
    "style": "detailed",
    "showCost": true,
    "showTokens": true,
    "showModel": true,
    "showLatency": false
  }
}
```

## Le Mode Vim

### Activer le mode vim

```
/vim
```

Ou au lancement :

```bash
claude --vim
```

### Raccourcis vim disponibles

| Mode | Touche | Action |
|------|--------|--------|
| Normal | `i` | Mode insertion |
| Normal | `v` | Mode visuel |
| Normal | `dd` | Supprimer la ligne |
| Normal | `yy` | Copier la ligne |
| Normal | `p` | Coller |
| Normal | `/` | Rechercher |
| Insert | `Esc` | Mode normal |

### Configuration vim

```json
{
  "editor": {
    "mode": "vim",
    "lineNumbers": true,
    "relativNumbers": false
  }
}
```

## Thèmes et couleurs

### Thèmes intégrés

Claude Code s'adapte au thème de votre terminal. Pour forcer un thème :

```bash
export CLAUDE_CODE_THEME=dark
```

Options :
- `dark` : Fond sombre
- `light` : Fond clair
- `auto` : Détection automatique

### Couleurs personnalisées

Dans votre fichier de configuration terminal (.zshrc, .bashrc) :

```bash
# Couleurs Claude Code
export CLAUDE_CODE_COLOR_PRIMARY="#00ff00"
export CLAUDE_CODE_COLOR_SECONDARY="#0066ff"
export CLAUDE_CODE_COLOR_ERROR="#ff0000"
export CLAUDE_CODE_COLOR_SUCCESS="#00ff00"
```

## Raccourcis clavier

### Raccourcis par défaut

| Raccourci | Action |
|-----------|--------|
| `Enter` | Envoyer le message |
| `Shift+Enter` | Nouvelle ligne |
| `Ctrl+C` | Annuler/Interrompre |
| `Ctrl+L` | Effacer l'écran |
| `Esc Esc` | Menu rewind |
| `Shift+Tab` | Mode Accept Edits |
| `↑` / `↓` | Historique des prompts |
| `Tab` | Autocomplétion |

### Personnaliser les raccourcis

```json
{
  "keybindings": {
    "submit": "Enter",
    "newLine": "Shift+Enter",
    "cancel": "Ctrl+C",
    "clearScreen": "Ctrl+L",
    "rewind": "Esc Esc",
    "acceptEdits": "Shift+Tab",
    "history.up": "ArrowUp",
    "history.down": "ArrowDown"
  }
}
```

## Autocomplétion

### Complétion des fichiers

Tapez `@` puis Tab pour voir les fichiers disponibles :

```
@sr[Tab]
→ @src/
→ @src/api/
→ @src/components/
```

### Complétion des commandes

Tapez `/` puis Tab :

```
/co[Tab]
→ /compact
→ /config
→ /cost
```

### Complétion intelligente

Claude Code propose des complétions basées sur :
- Le contexte actuel
- L'historique des commandes
- Les fichiers du projet

## Configuration avancée du terminal

### Taille de l'historique

```json
{
  "history": {
    "maxSize": 1000,
    "saveToDisk": true
  }
}
```

### Scroll buffer

```json
{
  "terminal": {
    "scrollback": 10000,
    "wordWrap": true
  }
}
```

### Format d'affichage

```json
{
  "display": {
    "codeBlockStyle": "bordered",
    "syntaxHighlighting": true,
    "lineNumbers": true,
    "diffStyle": "unified"
  }
}
```

## Intégration avec le shell

### Alias utiles

Ajoutez à votre `.zshrc` ou `.bashrc` :

```bash
# Lancer Claude Code
alias cc='claude'

# Claude Code avec modèle spécifique
alias ccs='claude --model sonnet'
alias cco='claude --model opus'
alias cch='claude --model haiku'

# Continuer la dernière session
alias ccr='claude -c'

# Claude Code en mode print
alias ccp='claude -p'
```

### Fonctions shell

```bash
# Analyser un fichier avec Claude
analyze() {
  cat "$1" | claude -p "Analyse ce fichier et identifie les problèmes potentiels"
}

# Générer des tests pour un fichier
gentest() {
  claude -p "Génère des tests pour @$1" --allowedTools Read,Write
}

# Review rapide
review() {
  git diff | claude -p "Review ces changements"
}
```

## Multiplexeurs de terminal

### Avec tmux

```bash
# Créer une session Claude Code
tmux new-session -s claude

# Dans tmux
claude

# Détacher : Ctrl+B, D
# Réattacher : tmux attach -t claude
```

### Configuration tmux recommandée

```bash
# ~/.tmux.conf

# Status bar pour Claude Code
set -g status-right '#[fg=green]Claude #[fg=white]| #[fg=cyan]%H:%M'

# Couleurs adaptées
set -g default-terminal "screen-256color"
```

### Avec screen

```bash
screen -S claude
claude
# Détacher : Ctrl+A, D
# Réattacher : screen -r claude
```

## Notifications

### Notifications de fin de tâche

```json
{
  "notifications": {
    "onTaskComplete": true,
    "onError": true,
    "sound": false
  }
}
```

### Notifications système

Avec libnotify (Linux) :

```bash
claude -p "Tâche longue" && notify-send "Claude terminé"
```

Avec osascript (macOS) :

```bash
claude -p "Tâche longue" && osascript -e 'display notification "Claude terminé"'
```

## Profils de configuration

### Créer des profils

```bash
~/.claude/
├── profiles/
│   ├── work.json
│   ├── personal.json
│   └── ci.json
└── settings.json
```

### Profile "work"

```json
{
  "model": "sonnet",
  "statusLine": { "style": "detailed" },
  "editor": { "mode": "vim" }
}
```

### Profile "ci"

```json
{
  "model": "haiku",
  "statusLine": { "style": "hidden" },
  "notifications": { "enabled": false }
}
```

### Charger un profil

```bash
claude --profile work
```

## Accessibilité

### Mode haut contraste

```json
{
  "accessibility": {
    "highContrast": true,
    "largeText": false,
    "screenReaderFriendly": true
  }
}
```

### Désactiver les animations

```json
{
  "display": {
    "animations": false,
    "progressIndicator": "text"
  }
}
```

## Template de configuration complète

```json
{
  "statusLine": {
    "style": "detailed",
    "showCost": true,
    "showTokens": true,
    "showModel": true
  },
  "editor": {
    "mode": "vim",
    "lineNumbers": true
  },
  "display": {
    "codeBlockStyle": "bordered",
    "syntaxHighlighting": true,
    "diffStyle": "unified",
    "animations": true
  },
  "history": {
    "maxSize": 1000,
    "saveToDisk": true
  },
  "keybindings": {
    "submit": "Enter",
    "newLine": "Shift+Enter",
    "cancel": "Ctrl+C"
  },
  "notifications": {
    "onTaskComplete": true,
    "onError": true
  }
}
```

## Ce qui vous attend demain

Dans le **Jour 19**, nous ferons un **comparatif Claude Code vs Cursor vs GitHub Copilot** - comprendre les forces de chaque outil.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 17 : Troubleshooting](/fr/claude-code-troubleshooting/)*
