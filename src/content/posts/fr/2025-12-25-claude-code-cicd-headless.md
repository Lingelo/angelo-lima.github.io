---
title: "CI/CD et mode headless avec Claude Code"
subtitle: "Jour 15 - Automatiser vos pipelines avec l'IA"
description: "Intégrez Claude Code dans vos pipelines CI/CD : mode headless, GitHub Actions, génération automatique de code et bonnes pratiques de production."
date: 2025-12-25T12:00:00.000Z
lang: fr
translationKey: "claude-code-day-15"
slug: "claude-code-cicd-headless"
tags:
  - "IA"
  - "Développement"
author: "Angelo Lima"
cover: "/assets/img/claude-code.webp"
thumbnail: "/assets/img/claude-code.webp"
aliases:
  - "/2025-12-25-claude-code-cicd-headless/"
---
Claude Code n'est pas limité à l'usage interactif. Avec le **mode headless**, vous pouvez l'intégrer dans vos pipelines CI/CD. Voyons comment automatiser intelligemment.

## Le mode headless : -p

Le flag `-p` (ou `--print`) permet d'exécuter Claude Code sans interaction :

```bash
claude -p "Explique ce que fait ce code" < fichier.js
```

Claude lit le prompt, exécute la tâche, et retourne le résultat sur stdout.

### Syntaxe de base

```bash
# Prompt simple
claude -p "Génère un fichier .gitignore pour Node.js"

# Avec entrée stdin
cat src/utils.ts | claude -p "Trouve les bugs potentiels"

# Avec fichiers en contexte
claude -p "Refactorise @src/api/auth.ts pour utiliser async/await"
```

### Options du mode headless

| Option | Description |
|--------|-------------|
| `-p "prompt"` | Exécuter avec ce prompt |
| `--output-format json` | Sortie JSON structurée |
| `--output-format text` | Sortie texte (défaut) |
| `--max-turns N` | Limiter les itérations |
| `--allowedTools` | Restreindre les outils |

## Intégration GitHub Actions

### Workflow de code review automatique

```yaml
# .github/workflows/claude-review.yml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Get changed files
        id: changed
        run: |
          echo "files=$(git diff --name-only origin/main...HEAD | tr '\n' ' ')" >> $GITHUB_OUTPUT

      - name: Claude Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p "Review ces fichiers modifiés et identifie les problèmes potentiels : ${{ steps.changed.outputs.files }}" \
            --output-format json > review.json

      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = JSON.parse(fs.readFileSync('review.json', 'utf8'));
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 🤖 Claude Code Review\n\n${review.result}`
            });
```

### Workflow de génération de tests

```yaml
# .github/workflows/claude-tests.yml
name: Generate Missing Tests

on:
  workflow_dispatch:
    inputs:
      file:
        description: 'File to generate tests for'
        required: true

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Generate Tests
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p "Génère des tests complets pour @${{ github.event.inputs.file }}" \
            --allowedTools Read,Write

      - name: Create PR
        uses: peter-evans/create-pull-request@v6
        with:
          title: "test: add tests for ${{ github.event.inputs.file }}"
          body: "Tests générés automatiquement par Claude Code"
          branch: claude/tests-${{ github.run_id }}
```

## Intégration GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - review
  - generate

claude-review:
  stage: review
  image: node:20
  before_script:
    - npm install -g @anthropic-ai/claude-code
  script:
    - |
      claude -p "Review le code de cette MR et liste les problèmes" \
        --output-format json > review.json
    - cat review.json
  artifacts:
    paths:
      - review.json
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"

generate-docs:
  stage: generate
  image: node:20
  before_script:
    - npm install -g @anthropic-ai/claude-code
  script:
    - claude -p "Génère la documentation JSDoc pour tous les fichiers src/**/*.ts sans documentation"
  when: manual
```

## Cas d'usage en production

### 1. Code review automatique

```bash
#!/bin/bash
# scripts/review-pr.sh

PR_FILES=$(git diff --name-only origin/main...HEAD)

claude -p "
Tu es un reviewer senior. Analyse ces fichiers modifiés :
$PR_FILES

Cherche :
1. Bugs potentiels
2. Problèmes de performance
3. Failles de sécurité
4. Violations de conventions

Format : JSON avec severity (high/medium/low)
" --output-format json
```

### 2. Génération de changelogs

```bash
#!/bin/bash
# scripts/generate-changelog.sh

LAST_TAG=$(git describe --tags --abbrev=0)
COMMITS=$(git log $LAST_TAG..HEAD --pretty=format:"%s")

claude -p "
Génère un changelog à partir de ces commits :
$COMMITS

Format Keep a Changelog avec sections :
- Added
- Changed
- Fixed
- Removed
"
```

### 3. Migration de code automatique

```bash
#!/bin/bash
# scripts/migrate-to-ts.sh

for file in src/**/*.js; do
  claude -p "Convertis ce fichier JavaScript en TypeScript avec des types stricts : @$file" \
    --allowedTools Read,Write
done
```

### 4. Audit de sécurité

```yaml
# .github/workflows/security-audit.yml
name: Security Audit

on:
  schedule:
    - cron: '0 2 * * 1'  # Chaque lundi à 2h

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Security Audit
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p "
            Effectue un audit de sécurité complet :
            1. Scan les dépendances pour les vulnérabilités connues
            2. Vérifie les patterns de code dangereux
            3. Identifie les secrets potentiellement exposés

            Génère un rapport avec priorités.
          " --output-format json > security-report.json

      - name: Upload Report
        uses: actions/upload-artifact@v4
        with:
          name: security-report
          path: security-report.json
```

## Contrôle des permissions en CI

### Mode strict recommandé

```bash
claude -p "Génère des tests" \
  --allowedTools Read,Grep,Glob \
  --dangerously-skip-permissions
```

⚠️ `--dangerously-skip-permissions` ne doit être utilisé que dans des environnements isolés (containers CI).

### Restriction des outils

```bash
# Lecture seule
claude -p "Analyse ce code" --allowedTools Read,Grep,Glob

# Avec écriture limitée
claude -p "Corrige les bugs" --allowedTools Read,Write,Edit

# Complet (dangereux)
claude -p "Setup le projet" --allowedTools "*"
```

## Gestion des coûts en CI

### Limiter les tokens

```bash
# Limiter les tours d'exécution
claude -p "Quick review" --max-turns 3

# Pour des tâches simples
claude -p "Explique cette fonction" --max-turns 1
```

### Estimation des coûts

| Tâche | Tokens estimés | Coût approximatif |
|-------|----------------|-------------------|
| Code review simple | ~5,000 | ~$0.02 |
| Génération de tests | ~15,000 | ~$0.05 |
| Refactoring complet | ~50,000 | ~$0.15 |
| Audit de sécurité | ~30,000 | ~$0.10 |

### Budget journalier

```yaml
# Exemple : limiter les runs par jour
jobs:
  review:
    if: github.event.pull_request.draft == false
    # Évite de reviewer les drafts
```

## Format de sortie JSON

### Structure de la réponse

```bash
claude -p "Analyse ce code" --output-format json
```

```json
{
  "result": "Analyse du code...",
  "cost": {
    "input_tokens": 1234,
    "output_tokens": 567,
    "total_cost": 0.01
  },
  "session_id": "abc123",
  "duration_ms": 5432
}
```

### Parsing dans les scripts

```bash
#!/bin/bash

RESULT=$(claude -p "Check for bugs" --output-format json)

BUGS=$(echo $RESULT | jq '.result')
COST=$(echo $RESULT | jq '.cost.total_cost')

echo "Bugs trouvés : $BUGS"
echo "Coût : $COST"
```

## Bonnes pratiques CI/CD

### 1. Cacher les artefacts Claude

```yaml
- name: Cache Claude artifacts
  uses: actions/cache@v4
  with:
    path: ~/.claude
    key: claude-${{ runner.os }}-${{ hashFiles('**/CLAUDE.md') }}
```

### 2. Environnement reproductible

```yaml
- name: Setup Claude environment
  run: |
    npm install -g @anthropic-ai/claude-code@latest
    echo "CLAUDE_CODE_USE_BEDROCK=0" >> $GITHUB_ENV
```

### 3. Gestion des erreurs

```bash
#!/bin/bash
set -e

if ! claude -p "Task" --output-format json > result.json; then
  echo "Claude failed, falling back to manual review"
  exit 0  # Ne pas bloquer le pipeline
fi
```

### 4. Logging détaillé

```yaml
- name: Claude with logging
  run: |
    claude -p "Task" 2>&1 | tee claude-output.log
  env:
    CLAUDE_CODE_DEBUG: "1"
```

## Ce qui vous attend demain

Dans le **Jour 16**, nous parlerons **facturation et optimisation des coûts** - comprendre et maîtriser votre consommation Claude Code.

---

*Cet article fait partie de la série "Maîtriser Claude Code en 20 jours". [Jour 14 : VS Code et JetBrains](/fr/claude-code-vscode-jetbrains/)*
