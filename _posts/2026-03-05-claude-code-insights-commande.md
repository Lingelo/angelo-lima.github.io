---
layout: post
title: "/insights : La Commande qui Analyse Votre Façon de Coder avec Claude"
subtitle: "Découvrez comment Claude Code génère un rapport complet de vos habitudes de développement"
description: "La commande /insights de Claude Code analyse 30 jours de sessions pour générer un rapport HTML interactif : statistiques, frictions, suggestions CLAUDE.md et recommandations personnalisées."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-insights
categories: fr
---

Annoncée début février 2026 par Thariq Shihipar d'Anthropic, la commande `/insights` est l'une des dernières additions à Claude Code. Le principe : analyser vos 30 derniers jours de sessions et générer un rapport détaillé de vos habitudes. Patterns récurrents, points de friction, workflows inefficaces — tout y passe.

## Qu'est-ce que /insights ?

`/insights` est une commande intégrée à Claude Code qui analyse l'historique de vos sessions locales et produit un **rapport HTML interactif**. Pas besoin de configuration, pas de tracking externe : tout est basé sur les données déjà stockées sur votre machine.

```bash
# Dans Claude Code, tapez simplement :
/insights
```

Le rapport est généré dans `~/.claude/usage-data/report.html` et s'ouvre automatiquement dans votre navigateur.

## Comment ça Fonctionne Techniquement

Le système traite vos données en **6 étapes** :

```
Sessions locales (~/.claude/projects/)
    ↓
1. Collecte et filtrage des sessions
    ↓
2. Extraction des métadonnées (tokens, outils, durée, modifications)
    ↓
3. Analyse qualitative des transcriptions via LLM (Haiku)
    ↓
4. Agrégation des données sur l'ensemble des sessions
    ↓
5. Analyse multi-prompt générant des insights spécialisés
    ↓
6. Rendu HTML avec visualisations interactives
```

### Filtrage Intelligent

Toutes les sessions ne sont pas analysées. Sont exclues :

| Exclusion | Raison |
|-----------|--------|
| Sessions de subagents (`agent-*`) | Bruit dans les données |
| Sessions internes d'extraction | Données techniques internes |
| Sessions < 2 messages utilisateur | Pas assez de contexte |
| Sessions < 1 minute | Démarrages accidentels |

### Traitement des Données

- **Modèle utilisé** : Haiku (rapport coût/performance optimal)
- **Limite** : 50 nouvelles sessions analysées par exécution
- **Cache** : Les analyses sont cachées dans `~/.claude/usage-data/facets/<session-id>.json`
- **Sessions longues** : Découpées en segments de 25 000 caractères, chacun résumé séparément

## Ce que Contient le Rapport

### 1. Dashboard Statistiques

Vue d'ensemble chiffrée de votre activité :

- **Sessions et messages** : nombre total, moyenne par jour
- **Temps passé** : durée cumulée de vos sessions
- **Tokens consommés** : input et output
- **Activité Git** : commits et pushs
- **Jours actifs** : fréquence et séries d'activité
- **Heures de pointe** : quand vous êtes le plus productif

### 2. Résumé Exécutif ("At a Glance")

Quatre sections ciblées :

| Section | Contenu |
|---------|---------|
| Ce qui fonctionne | Vos workflows les plus efficaces |
| Ce qui freine | Les frictions récurrentes identifiées |
| Quick wins | Améliorations faciles à implémenter |
| Opportunités ambitieuses | Changements de workflow plus profonds |

### 3. Visualisations Interactives

- **Graphique d'activité quotidienne** avec sélecteur de fuseau horaire
- **Distribution des outils utilisés** (Read, Edit, Bash, Grep, etc.)
- **Répartition des langages** de programmation
- **Niveaux de satisfaction** par session
- **Types de sessions** : tâche unique, multi-tâches, itération, exploration, question rapide

### 4. Analyse des Frictions

C'est la section la plus actionnable. Le rapport catégorise vos points de douleur :

| Type de Friction | Exemple |
|-----------------|---------|
| Mauvaise compréhension | Claude part dans la mauvaise direction |
| Approche incorrecte | Solution techniquement fausse proposée |
| Code bugué | Le code généré ne fonctionne pas |
| Action rejetée | Vous avez refusé une action de Claude |
| Changements excessifs | Claude modifie trop de choses |
| Échecs d'outils | Erreurs d'exécution des outils |

Chaque friction est documentée avec des **exemples concrets** tirés de vos sessions.

### 5. Suggestions CLAUDE.md

La section la plus intéressante : le rapport génère des **règles prêtes à copier-coller** dans votre `CLAUDE.md`, basées sur les instructions que vous répétez souvent.

Exemple de suggestion :

```markdown
# Suggestion générée par /insights

## Testing
- Toujours exécuter les tests après modification d'un fichier source
- Utiliser vitest pour les tests unitaires, pas jest

## Conventions
- Utiliser des imports absolus avec l'alias @/
- Nommer les fichiers en kebab-case
```

Ces suggestions ciblent précisément les patterns répétitifs détectés dans vos sessions. L'idée : **dire une fois à Claude ce que vous répétez chaque jour**.

### 6. Recommandations de Features

Selon votre profil d'utilisation, le rapport suggère des fonctionnalités Claude Code que vous n'exploitez peut-être pas :

- **MCP Servers** si vous interagissez souvent avec des outils externes
- **Skills personnalisés** si vous répétez les mêmes workflows
- **Hooks** si vous faites des actions manuelles post-édition
- **Mode Headless** si vous avez des tâches CI/CD
- **Task Agents** si vous faites de l'exploration de codebase complexe

## Catégories d'Objectifs Trackés

Le rapport classifie automatiquement vos sessions par type de tâche :

```
debug/investigate     │ implement feature    │ fix bug
write script/tool     │ refactor code        │ configure system
create PR/commit      │ analyze data         │ understand codebase
write tests           │ write docs           │ deploy/infra
```

Cette classification aide à comprendre **comment vous répartissez votre temps** avec Claude Code.

## Confidentialité et Données

Point important : **tout est local**.

- L'analyse s'exécute sur votre machine via l'API Anthropic
- Aucun code source n'est uploadé
- L'analyse porte sur les **patterns d'interaction**, pas sur le contenu du code
- Le rapport HTML reste en local, partageable à votre discrétion
- Les facettes cachées ne contiennent que des métadonnées agrégées

## Bonnes Pratiques

### Fréquence d'Utilisation

Ne lancez pas `/insights` tous les jours. Le sweet spot :

- **Toutes les 2-3 semaines** pour un suivi régulier
- **Après un milestone** (fin de feature, release)
- **Après une période de friction** pour identifier les causes

### Exploiter le Rapport

1. **Commencez par les frictions** : c'est là que se cachent les gains rapides
2. **Copiez les suggestions CLAUDE.md** pertinentes dans votre projet
3. **Testez les features recommandées** que vous n'utilisez pas encore
4. **Comparez les rapports** d'un mois sur l'autre pour mesurer votre progression

### Workflow Mensuel Recommandé

```
/insights
    ↓
Lire les frictions identifiées
    ↓
Copier les suggestions CLAUDE.md pertinentes
    ↓
Tester 1-2 features recommandées
    ↓
Reprendre le travail normal
    ↓
/insights le mois suivant → mesurer l'évolution
```

## Limitations

- **50 sessions max** par analyse (les plus récentes sont priorisées)
- **Modèle Haiku** pour l'analyse (bon rapport qualité/prix, mais moins fin qu'Opus)
- **30 jours** de fenêtre d'analyse
- Le rapport peut prendre **plusieurs minutes** selon le volume (600+ messages = patience)

## Mon Avis

La feature n'a qu'un mois d'existence au moment où j'écris, mais elle m'a déjà surpris. Après mon premier `/insights`, j'ai découvert que je répétais les mêmes consignes de formatting dans plus de la moitié de mes sessions — du temps perdu que quelques lignes dans `CLAUDE.md` auraient pu éviter.

C'est un **miroir de vos habitudes** : parfois flatteur, parfois brutal. La vraie valeur est dans les suggestions `CLAUDE.md`. Au lieu de répéter les mêmes instructions session après session, vous les codifiez une bonne fois. C'est exactement le genre d'optimisation meta qui fait gagner du temps sur le long terme.

Le fait que tout reste local est un plus non négligeable, surtout pour ceux qui travaillent sur du code propriétaire. On est encore aux débuts de cette feature — il sera intéressant de voir comment Anthropic la fera évoluer dans les prochaines versions.

---

*La commande est toute fraîche — c'est le moment de l'essayer et de découvrir ce que vos sessions révèlent sur vous.*