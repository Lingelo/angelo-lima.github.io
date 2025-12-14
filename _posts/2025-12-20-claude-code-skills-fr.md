---
layout: post
title: "Skills : Automatisation Invoquée par le Modèle"
subtitle: "Jour 10 - Capacités que Claude active automatiquement"
description: "Maîtrisez les Skills Claude Code : automatisation intelligente, création de skills personnalisés, différence avec les commandes slash, et bonnes pratiques."
thumbnail-img: "/assets/img/claude-code.webp"
cover-img: "/assets/img/claude-code.webp"
tags: [IA, Développement]
author: "Angelo Lima"
lang: fr
ref: claude-code-day-10
categories: fr
---

Hier, nous avons vu les subagents que vous invoquez explicitement avec `@`. Aujourd'hui, nous découvrons les **Skills** : des capacités que Claude active **automatiquement** selon le contexte de votre requête.

## La Différence Clé : Model-Invoked

| Aspect | Commandes Slash | Subagents | Skills |
|--------|----------------|-----------|--------|
| Invocation | Explicite (`/command`) | Explicite (`@agent`) | **Automatique** |
| Déclencheur | Utilisateur | Utilisateur | **Claude** |
| Contexte | Prompt | Contexte séparé | Enrichissement |

Les Skills sont **model-invoked** : Claude décide quand les utiliser en fonction de votre requête et de la description du skill.

## Comment Fonctionnent les Skills

### Le Processus

```
Votre requête
    ↓
Claude analyse le contexte
    ↓
Claude lit les descriptions des skills disponibles
    ↓
Si un skill correspond → Claude l'active automatiquement
    ↓
Le skill enrichit les instructions de Claude
```

### Exemple Concret

Vous avez un skill `pdf-expert` avec la description :
> "Extrait le texte et les tableaux des fichiers PDF. Utiliser quand l'utilisateur travaille avec des PDFs."

```
> Extrais les données du fichier rapport.pdf

[Claude détecte "PDF" + "extrais" → active automatiquement pdf-expert]
```

## Sources des Skills

### 1. Skills Personnels

```
~/.claude/skills/
├── pdf-expert/
│   └── SKILL.md
└── api-tester/
    └── SKILL.md
```

Disponibles dans tous vos projets.

### 2. Skills Projet

```
.claude/skills/
├── deployment/
│   └── SKILL.md
└── migration/
    └── SKILL.md
```

Partagés avec l'équipe via Git.

### 3. Skills de Plugins

Installés via les plugins Claude Code (voir Jour 11).

## Anatomie d'un Skill

### Structure Minimale

```
my-skill/
└── SKILL.md
```

### Structure Complète

```
my-skill/
├── SKILL.md           # Instructions (requis)
├── reference.md       # Documentation additionnelle
├── scripts/
│   └── helper.py      # Scripts utilitaires
└── templates/
    └── template.txt   # Templates à utiliser
```

## Le Fichier SKILL.md

### Frontmatter Requis

```yaml
---
name: skill-name
description: Description claire de quand utiliser ce skill
---
```

### Champs Optionnels

```yaml
---
name: skill-name
description: Description claire de quand utiliser ce skill
allowed-tools: Read, Grep, Glob    # Restreindre les outils
---
```

### Règles de Nommage

| Champ | Règles |
|-------|--------|
| `name` | Lettres minuscules, chiffres, tirets. Max 64 caractères |
| `description` | Max 1024 caractères. Doit expliquer **quand** utiliser |

## Exemples de Skills

### Skill : Expert PDF

```markdown
---
name: pdf-expert
description: Extrait le texte, les tableaux et les métadonnées des fichiers PDF.
             Utiliser quand l'utilisateur demande d'analyser, lire ou extraire
             des données de fichiers PDF.
allowed-tools: Read, Bash
---

# Expert PDF

## Capacités
- Extraction de texte avec pdftotext
- Extraction de tableaux avec tabula-py
- Lecture des métadonnées avec pdfinfo

## Instructions
1. Vérifier que le fichier existe
2. Utiliser pdftotext pour le texte brut
3. Utiliser tabula si des tableaux sont détectés
4. Formater le résultat de manière lisible

## Commandes Utiles
```bash
# Extraire le texte
pdftotext input.pdf -

# Infos PDF
pdfinfo input.pdf
```
```

### Skill : Testeur d'API

```markdown
---
name: api-tester
description: Teste et débogue les APIs REST. Utiliser quand l'utilisateur veut
             tester des endpoints, vérifier des réponses API, ou déboguer des
             problèmes de requêtes HTTP.
allowed-tools: Read, Bash
---

# Testeur d'API

## Capacités
- Test d'endpoints avec curl
- Validation des réponses JSON
- Mesure des temps de réponse
- Test d'authentification

## Méthodologie
1. Identifier l'endpoint à tester
2. Construire la requête curl appropriée
3. Analyser la réponse (status, body, headers)
4. Proposer des correctifs si erreur

## Templates Curl

### GET avec auth
```bash
curl -X GET "URL" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json"
```

### POST avec body
```bash
curl -X POST "URL" \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```
```

### Skill : Helper de Migration

```markdown
---
name: migration-helper
description: Aide à créer et gérer les migrations de base de données.
             Utiliser quand l'utilisateur parle de migrations, schémas,
             ou changements de structure de base de données.
allowed-tools: Read, Write, Bash(npx prisma:*)
---

# Helper de Migration

## Framework Supporté
Prisma (détecté via prisma/schema.prisma)

## Processus de Migration
1. Analyser le changement demandé
2. Proposer les modifications de schéma
3. Générer la migration avec `prisma migrate dev`
4. Vérifier que la migration est correcte

## Bonnes Pratiques
- Toujours nommer les migrations de façon descriptive
- Vérifier les données existantes avant migration destructive
- Tester sur une copie de la BDD locale d'abord

## Commandes Prisma
```bash
# Créer une migration
npx prisma migrate dev --name description

# Voir le statut
npx prisma migrate status

# Reset (attention !)
npx prisma migrate reset
```
```

### Skill : Scanner de Sécurité

```markdown
---
name: security-scanner
description: Scanne le code pour les vulnérabilités de sécurité.
             Utiliser quand l'utilisateur demande un audit de sécurité,
             cherche des failles, ou veut sécuriser son code.
allowed-tools: Read, Grep, Glob
---

# Scanner de Sécurité

## Vulnérabilités Recherchées

### Injection
- Injection SQL
- Injection NoSQL
- Injection de commandes
- Injection LDAP

### XSS
- XSS Réfléchi
- XSS Stocké
- XSS basé sur le DOM

### Auth/Session
- Authentification cassée
- Fixation de session
- Référence directe non sécurisée

### Autres
- Exposition de données sensibles
- Mauvaise configuration de sécurité
- Désérialisation non sécurisée

## Patterns à Rechercher

```javascript
// Injection SQL
`SELECT * FROM users WHERE id = ${userId}`  // ❌ Dangereux
`SELECT * FROM users WHERE id = ?`          // ✅ Paramétré

// XSS
element.innerHTML = userInput;              // ❌ Dangereux
element.textContent = userInput;            // ✅ Sûr

// Injection de commande
exec(`ls ${userPath}`);                     // ❌ Dangereux
execFile('ls', [userPath]);                 // ✅ Plus sûr
```

## Format de Rapport
Pour chaque vulnérabilité trouvée :
- Fichier et ligne
- Type de vulnérabilité
- Sévérité (Critique/Haute/Moyenne/Faible)
- Code vulnérable
- Correctif proposé
```

## Bonnes Pratiques pour les Descriptions

### ✅ Bonne Description

```yaml
description: Extrait le texte et les tableaux des fichiers PDF. Utiliser quand
             l'utilisateur demande d'analyser, lire, parser, ou extraire
             des données de fichiers PDF ou documents.
```

**Pourquoi c'est bon :**
- Explique ce que fait le skill
- Liste les déclencheurs (analyser, lire, parser, extraire)
- Mentionne les mots-clés (PDF, documents)

### ❌ Mauvaise Description

```yaml
description: Aide avec les documents
```

**Pourquoi c'est mauvais :**
- Trop vague
- Pas de déclencheurs clairs
- Claude ne saura pas quand l'activer

## Restreindre les Outils

Pour un skill en lecture seule :

```yaml
---
name: code-analyzer
description: ...
allowed-tools: Read, Grep, Glob
---
```

Claude ne pourra pas modifier de fichiers quand ce skill est actif.

## Fichiers de Support

### Fichiers de Référence

```
my-skill/
├── SKILL.md
└── reference.md    # Documentation additionnelle
```

Dans SKILL.md, référencez avec :
```markdown
Voir @reference.md pour plus de détails.
```

### Scripts

```
my-skill/
├── SKILL.md
└── scripts/
    └── analyze.py
```

```markdown
## Utiliser le script d'analyse
```bash
python scripts/analyze.py $FILE
```
```

## Tester l'Activation Automatique

### Test Simple

1. Créez un skill avec une description claire
2. Faites une requête qui correspond
3. Vérifiez si Claude utilise les instructions du skill

### Debug

Si le skill ne s'active pas :
- Vérifiez que la description est assez spécifique
- Testez avec des mots-clés explicites
- Vérifiez la syntaxe du SKILL.md

## Ce qui Arrive Demain

Dans le **Jour 11**, nous verrons les **Plugins et le Marketplace** : comment installer, créer et partager des packs complets de commandes, agents, skills et hooks.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 9 : Subagents](/fr/claude-code-subagents-fr/)*
