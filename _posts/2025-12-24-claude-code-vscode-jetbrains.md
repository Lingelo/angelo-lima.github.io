---
layout: post
title: "Claude Code dans VS Code et JetBrains"
subtitle: "Jour 14 - L'expérience graphique dans vos IDE préférés"
description: "Intégrez Claude Code dans VS Code et JetBrains : installation, configuration, fonctionnalités et comparaison avec l'expérience terminal."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-14
categories: fr
---

Jusqu'ici, nous avons utilisé Claude Code en terminal. Mais il existe aussi des extensions pour **VS Code** et **JetBrains**. Voyons comment tirer parti de l'interface graphique.

## Deux approches complémentaires

| Aspect | Terminal | IDE |
|--------|----------|-----|
| Rapidité | ⭐⭐⭐ | ⭐⭐ |
| Visualisation | Texte uniquement | Diffs visuels |
| Intégration | Shell natif | Workspace IDE |
| Flexibilité | Maximale | Guidée |

## Claude Code pour VS Code

### Installation

1. Ouvrir VS Code
2. Extensions (Ctrl+Shift+X)
3. Rechercher "Claude Code"
4. Installer l'extension officielle Anthropic

Ou via le terminal :

```bash
code --install-extension anthropic.claude-code
```

### Configuration

Après installation, configurer via les settings VS Code :

```json
{
  "claude-code.apiKey": "${env:ANTHROPIC_API_KEY}",
  "claude-code.model": "claude-sonnet-4-20250514",
  "claude-code.autoApprove": false
}
```

### Fonctionnalités VS Code

#### Panel Claude Code

Accessible via l'icône dans la barre latérale ou `Ctrl+Shift+P` → "Claude Code: Open Panel".

#### Commandes disponibles

| Commande | Raccourci | Description |
|----------|-----------|-------------|
| Open Panel | `Ctrl+Shift+C` | Ouvrir le panneau Claude |
| Explain Selection | `Ctrl+Shift+E` | Expliquer le code sélectionné |
| Fix Selection | `Ctrl+Shift+F` | Corriger le code sélectionné |
| Generate Tests | `Ctrl+Shift+T` | Générer des tests |

#### Inline Suggestions

Claude peut suggérer des modifications directement dans l'éditeur :

1. Sélectionner du code
2. Clic droit → "Ask Claude"
3. Décrire la modification souhaitée
4. Voir le diff et accepter/refuser

### Workflow typique VS Code

```
1. Ouvrir le panel Claude Code
2. Décrire la tâche
3. Claude propose des modifications
4. Review le diff dans l'éditeur
5. Accepter ou demander des ajustements
```

## Claude Code pour JetBrains

### IDEs supportés

- IntelliJ IDEA
- PyCharm
- WebStorm
- PhpStorm
- GoLand
- Rider
- Et tous les autres IDE JetBrains

### Installation

1. Settings → Plugins
2. Marketplace → Rechercher "Claude Code"
3. Installer et redémarrer l'IDE

Ou via le site JetBrains Marketplace.

### Configuration

```
Settings → Tools → Claude Code
```

Options disponibles :
- API Key
- Modèle par défaut
- Niveau d'approbation automatique
- Intégration avec le VCS

### Fonctionnalités JetBrains

#### Tool Window

Accessible via View → Tool Windows → Claude Code.

#### Actions contextuelles

Clic droit sur du code :
- "Ask Claude about this"
- "Refactor with Claude"
- "Generate tests with Claude"
- "Add documentation with Claude"

#### Intégration VCS

Claude Code s'intègre avec les fonctionnalités Git de JetBrains :
- Commit messages générés
- Diff reviews assistés
- PR descriptions

### Inspections intelligentes

Claude peut s'intégrer aux inspections JetBrains :

```
Settings → Editor → Inspections → Claude Code
```

- Détection de code smell
- Suggestions de refactoring
- Avertissements de sécurité

## Comparaison des expériences

### Terminal : la puissance

```bash
claude

> Refactorise tout le module auth pour utiliser JWT
> Ensuite crée les tests
> Et mets à jour la documentation

# Claude travaille sur plusieurs fichiers en séquence
```

Avantages :
- Commandes complexes en une fois
- Workflows automatisés
- Scripts et pipes
- Performance maximale

### IDE : la visualisation

Avantages :
- Diffs visuels côte à côte
- Navigation dans le code facilitée
- Intégration avec les outils IDE
- Review plus intuitif

### Mon conseil

Utilisez **les deux** selon la tâche :

| Tâche | Meilleur choix |
|-------|----------------|
| Refactoring massif | Terminal |
| Fix rapide | IDE |
| Nouveau projet | Terminal |
| Review de code | IDE |
| Automatisation | Terminal |
| Découverte de code | IDE |

## Synchronisation entre les deux

### Le même CLAUDE.md

Les deux interfaces lisent le même `CLAUDE.md` :

```markdown
# CLAUDE.md

## Conventions
- TypeScript strict
- Tests avec Vitest
- Commits conventionnels
```

Ces règles s'appliquent que vous utilisiez le terminal ou l'IDE.

### Les mêmes permissions

Le fichier `.claude/settings.json` est partagé :

```json
{
  "permissions": {
    "allow": ["Bash(npm run:*)"],
    "deny": ["Read(./.env)"]
  }
}
```

### Sessions distinctes

Chaque interface a ses propres sessions. Un `/compact` dans le terminal n'affecte pas l'extension IDE.

## Fonctionnalités avancées IDE

### Quick Actions (VS Code)

```
Ctrl+. sur du code sélectionné
→ "Claude: Suggest improvement"
→ "Claude: Explain this"
→ "Claude: Find bugs"
```

### Live Templates (JetBrains)

Créer des templates qui invoquent Claude :

```
Settings → Editor → Live Templates → + Claude Code
```

Exemple de template :
```
Abbreviation: cdoc
Description: Generate documentation with Claude
Template text: // $SELECTION$ - TODO: Ask Claude for documentation
```

### Debugging assisté

Dans les deux IDEs, Claude peut aider au debugging :

1. Placer un breakpoint
2. Lancer le debug
3. Sur une exception : "Ask Claude why this failed"
4. Claude analyse le contexte et la stack trace

## Configuration optimale

### VS Code settings.json

```json
{
  "claude-code.model": "claude-sonnet-4-20250514",
  "claude-code.autoApprove": false,
  "claude-code.showInlineHints": true,
  "claude-code.diffViewMode": "sideBySide",
  "claude-code.contextSize": "auto",
  "editor.inlineSuggest.enabled": true
}
```

### JetBrains settings

```
Tools → Claude Code:
  ☑ Show inline suggestions
  ☑ Enable context-aware completions
  ☐ Auto-approve file modifications
  Model: claude-sonnet-4-20250514
  Context window: Auto
```

## Limitations des extensions IDE

### Par rapport au terminal

| Fonctionnalité | Terminal | IDE |
|----------------|----------|-----|
| Subagents personnalisés | ✅ | ❌ |
| Hooks | ✅ | Partiel |
| MCP servers | ✅ | Partiel |
| Skills | ✅ | ❌ |
| Plugins marketplace | ✅ | ❌ |
| Mode headless | ✅ | ❌ |

### Recommandation

Pour une utilisation **avancée**, privilégiez le terminal. Les extensions IDE sont idéales pour :
- Les quick fixes
- La review visuelle
- Les utilisateurs moins à l'aise avec le terminal

## Workflow hybride recommandé

```
1. Terminal pour les tâches complexes
   claude
   > Plan et implémente le nouveau système de cache

2. IDE pour review et ajustements
   - Ouvrir les fichiers modifiés
   - Review les diffs visuellement
   - Quick fixes avec l'extension

3. Terminal pour finaliser
   claude
   > Crée les tests et vérifie que tout passe
```

## Dépannage des extensions

### VS Code : Extension ne démarre pas

```bash
# Vérifier l'installation
code --list-extensions | grep claude

# Réinstaller
code --uninstall-extension anthropic.claude-code
code --install-extension anthropic.claude-code
```

### JetBrains : Problèmes de performance

```
Help → Diagnostic Tools → Activity Monitor
```

Si Claude Code consomme trop :
- Réduire la taille du contexte
- Désactiver les suggestions inline
- Limiter le scope aux fichiers ouverts

## Ce qui vous attend demain

Dans le **Jour 15**, nous passerons en mode production avec **CI/CD et le mode headless** - intégrer Claude Code dans vos pipelines d'automatisation.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 13 : MCP](/fr/claude-code-mcp-integration/)*
