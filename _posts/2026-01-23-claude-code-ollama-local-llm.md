---
layout: post
title: "Ollama supporte maintenant Claude Code"
subtitle: "Utilisez Claude Code avec des modèles locaux grâce à la nouvelle API Anthropic d'Ollama"
description: "Ollama v0.14 ajoute le support de l'API Anthropic Messages. Découvrez comment configurer Claude Code pour utiliser des LLMs locaux comme qwen3-coder ou gpt-oss, sans dépendre du cloud."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-ollama
categories: fr
---

Grande nouvelle pour les utilisateurs de Claude Code : **Ollama supporte désormais l'API Anthropic Messages**, ce qui permet d'utiliser Claude Code avec des modèles open-source locaux. Fini la dépendance exclusive au cloud Anthropic !

## Pourquoi Cette Intégration Change la Donne

Jusqu'à présent, Claude Code nécessitait obligatoirement une connexion aux serveurs d'Anthropic. Avec cette intégration Ollama, vous pouvez maintenant :

| Avantage | Description |
|----------|-------------|
| **Confidentialité** | Votre code reste sur votre machine |
| **Coûts** | Pas de frais API, juste votre électricité |
| **Indépendance** | Pas de dépendance à un fournisseur unique |
| **Offline** | Travaillez sans connexion internet |
| **Personnalisation** | Choisissez le modèle adapté à vos besoins |

## Prérequis

### 1. Ollama v0.14.0+

L'intégration nécessite **Ollama version 0.14.0 ou supérieure**. Vérifiez votre version :

```bash
ollama --version
```

Si besoin, mettez à jour Ollama depuis [ollama.com](https://ollama.com).

### 2. Modèle avec Grand Contexte

Claude Code nécessite une **grande fenêtre de contexte** pour fonctionner correctement. La recommandation officielle est **64k tokens minimum**.

Configurez le contexte dans Ollama :

```bash
# Créer un Modelfile avec contexte étendu
cat > Modelfile << 'EOF'
FROM qwen3-coder
PARAMETER num_ctx 65536
EOF

ollama create qwen3-coder-64k -f Modelfile
```

### 3. Claude Code Installé

Si ce n'est pas encore fait :

```bash
# macOS/Linux
curl -fsSL https://claude.ai/install.sh | bash

# Windows
irm https://claude.ai/install.ps1 | iex
```

## Configuration

### Méthode 1 : Lancement Rapide (Recommandé)

Ollama fournit une commande simplifiée :

```bash
ollama launch claude
```

Pour le mode configuration interactive :

```bash
ollama launch claude --config
```

Cette méthode configure automatiquement les variables d'environnement nécessaires.

### Méthode 2 : Configuration Manuelle

Définissez les trois variables d'environnement requises :

```bash
export ANTHROPIC_AUTH_TOKEN=ollama
export ANTHROPIC_API_KEY=""
export ANTHROPIC_BASE_URL=http://localhost:11434
```

Puis lancez Claude Code avec le modèle de votre choix :

```bash
claude --model qwen3-coder-64k
```

### Méthode 3 : Ligne Unique

Pour un lancement ponctuel sans modifier votre environnement :

```bash
ANTHROPIC_AUTH_TOKEN=ollama \
ANTHROPIC_BASE_URL=http://localhost:11434 \
ANTHROPIC_API_KEY="" \
claude --model qwen3-coder
```

### Configuration Persistante

Ajoutez ces lignes à votre `~/.bashrc` ou `~/.zshrc` :

```bash
# Claude Code avec Ollama
export ANTHROPIC_AUTH_TOKEN=ollama
export ANTHROPIC_API_KEY=""
export ANTHROPIC_BASE_URL=http://localhost:11434
alias claude-local='claude --model qwen3-coder-64k'
```

Puis rechargez :

```bash
source ~/.bashrc  # ou source ~/.zshrc
```

## Modèles Recommandés

### Pour le Développement

| Modèle | Taille | Points Forts |
|--------|--------|--------------|
| **qwen3-coder** | ~14B | Spécialisé code, excellent rapport qualité/taille |
| **glm-4.7** | ~9B | Bon équilibre, multilingue |
| **codestral** | ~22B | Performant sur code complexe |

### Pour les Machines Puissantes

| Modèle | Taille | Points Forts |
|--------|--------|--------------|
| **gpt-oss:20b** | 20B | Généraliste performant |
| **gpt-oss:120b** | 120B | Proche des modèles propriétaires |
| **deepseek-coder:33b** | 33B | Excellent sur le code |

### Télécharger un Modèle

```bash
# Télécharger le modèle
ollama pull qwen3-coder

# Vérifier les modèles disponibles
ollama list
```

## Exemple de Session

```bash
# 1. Démarrer Ollama (si pas en service)
ollama serve &

# 2. Lancer Claude Code
ANTHROPIC_AUTH_TOKEN=ollama \
ANTHROPIC_BASE_URL=http://localhost:11434 \
ANTHROPIC_API_KEY="" \
claude --model qwen3-coder

# 3. Utiliser normalement
> Analyse le fichier @src/api/users.ts et suggère des améliorations
```

## Limitations à Connaître

### Performance

Les modèles locaux sont généralement **moins performants** que Claude Sonnet ou Opus sur les tâches complexes. Attendez-vous à :

- Réponses parfois moins précises
- Temps de réflexion plus long sur du matériel modeste
- Moins de capacité de raisonnement avancé

### Consommation Ressources

| Taille Modèle | RAM Minimum | GPU Recommandé |
|---------------|-------------|----------------|
| 7-14B | 16 Go | 8 Go VRAM |
| 20-33B | 32 Go | 16 Go VRAM |
| 70B+ | 64 Go+ | 24 Go+ VRAM |

### Fonctionnalités

Certaines fonctionnalités avancées peuvent ne pas fonctionner parfaitement :
- Vision (analyse d'images)
- Tool use complexe
- Subagents

## Cas d'Usage Idéaux

### Quand Utiliser Ollama

- **Code propriétaire sensible** : Le code ne quitte jamais votre machine
- **Développement offline** : Travail en avion, zones sans internet
- **Prototypage rapide** : Pas de souci de coûts API
- **Apprentissage** : Expérimentez sans limite

### Quand Rester sur Anthropic

- **Tâches complexes** : Refactoring majeur, architecture
- **Code reviews approfondies** : Analyse de sécurité
- **Production** : Quand la qualité est critique

## Basculer Entre Local et Cloud

Créez des alias pour switcher facilement :

```bash
# Dans ~/.bashrc ou ~/.zshrc

# Mode Ollama (local)
alias claude-local='ANTHROPIC_AUTH_TOKEN=ollama \
  ANTHROPIC_BASE_URL=http://localhost:11434 \
  ANTHROPIC_API_KEY="" \
  claude --model qwen3-coder-64k'

# Mode Anthropic (cloud) - nécessite ANTHROPIC_API_KEY configuré
alias claude-cloud='claude'
```

Usage :

```bash
claude-local   # Pour le travail sensible ou offline
claude-cloud   # Pour les tâches complexes
```

## Troubleshooting

### Erreur "Connection Refused"

Ollama n'est pas démarré :

```bash
ollama serve
```

### Erreur "Context Too Long"

Le modèle n'a pas assez de contexte. Créez une version étendue :

```bash
cat > Modelfile << 'EOF'
FROM votre-modele
PARAMETER num_ctx 65536
EOF

ollama create votre-modele-64k -f Modelfile
```

### Réponses Lentes

- Vérifiez que le GPU est utilisé : `nvidia-smi` ou `ollama ps`
- Utilisez un modèle plus petit
- Fermez les applications gourmandes en VRAM

### Qualité Insuffisante

Essayez un modèle plus grand ou repassez sur Claude Cloud pour cette tâche spécifique.

## Conclusion

L'intégration Ollama ouvre de nouvelles possibilités pour Claude Code :

- **Confidentialité** pour le code sensible
- **Économies** sur les coûts API
- **Flexibilité** dans le choix des modèles
- **Travail offline** possible

Pour la plupart des tâches quotidiennes, un bon modèle local comme qwen3-coder fait très bien le travail. Gardez l'accès au cloud Anthropic pour les cas où vous avez besoin de la puissance maximale.

---

*Pour aller plus loin avec Claude Code, consultez mes autres [articles sur l'IA et le développement](/tag/ia/).*
