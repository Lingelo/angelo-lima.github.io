---
title: "Ollama en 2026 : d'un runner local à une plateforme IA"
subtitle: "Modèles, API, cloud, agents — état des lieux dix-huit mois après le premier article"
description: "Tour d'horizon complet d'Ollama en juin 2026 : v0.30.8, catalogue de plus de 200 modèles, compatibilité Anthropic Messages API, cloud hybride avec suffix :cloud, et la commande ollama launch qui change le workflow développeur."
date: 2026-06-17T12:00:00.000Z
lang: fr
translationKey: "ollama-2026-state-of-the-art"
slug: "ollama-2026-etat-des-lieux"
tags:
  - "IA"
  - "Développement"
  - "Tech"
author: "Angelo Lima"
thumbnail: "/assets/img/ollama_openai.webp"
shareImg: "/assets/img/ollama_openai.webp"
aliases:
  - "/2026-06-17-ollama-2026-etat-des-lieux/"
---

En janvier 2025, j'avais écrit un article sur Ollama en mode guide de déploiement : Docker, Open WebUI, les bases de la configuration. C'était déjà utile à l'époque, mais le projet était encore un runner relativement simple — téléchargement d'un modèle GGUF, serveur sur le port 11434, appels via curl. Dix-huit mois plus tard, le périmètre a substantiellement changé. Version v0.30.8 sortie le 12 juin 2026, cloud hybride, compatibilité Anthropic API, web search natif, agents. Il est temps de faire le point.

---

## Ce qu'Ollama est devenu

La description "outil pour faire tourner des LLM en local" est toujours vraie, mais de moins en moins complète. Ollama est aujourd'hui une **plateforme d'inférence hybride** : locale quand votre matériel suffit, déportée vers le cloud de façon transparente quand ce n'est plus le cas, avec dans les deux cas la même API, le même workflow, les mêmes commandes.

Ce glissement s'est fait progressivement. La v0.19 a ajouté le moteur MLX sur Apple Silicon. La v0.6 (novembre 2025) a apporté la stabilité production avec un nouveau scheduler multi-GPU qui réduit les OOM. En 2026, les grosses nouveautés sont : les modèles cloud, la compatibilité Anthropic Messages API, la web search intégrée, et la commande `ollama launch` pour les coding agents.

---

## L'écosystème de modèles : 200+ références, mais pas toutes équivalentes

La bibliothèque officielle dépasse les 200 modèles. En pratique, quelques familles dominent l'usage.

### Les incontournables locaux en mi-2026

**Qwen 3.6 27B** — le meilleur rapport qualité/ressources sur matériel consommateur. 77,2 % sur SWE-bench, tient en 24 Go VRAM à Q4. Si vous avez une 3090 ou une 4090, c'est la référence généraliste.

**Qwen2.5-Coder 32B** — le modèle de code open source le plus fort qu'on puisse faire tourner localement en juin 2026. Disponible en versions de 0,5B à 32B, avec le 32B qui dépasse les anciens modèles propriétaires sur HumanEval.

**DeepSeek R1** — toujours là, toujours pertinent pour le raisonnement. Le 8B tient sur 8 Go, le 32B demande 24 Go. Idéal pour les tâches de débogage ou de résolution de problèmes qui demandent plusieurs étapes.

**Gemma 4** (Google, avril 2026) — le plus récent des piliers. Multimodal nativement, function calling intégré, déclinaisons E2B / E4B / E12B / E27B. À partir du E4B, il tient sur une machine de base et comprend les images.

**Mistral 7B** — toujours recommandé pour le français. Le modèle comprend et génère notre langue mieux que la plupart des alternatives de même taille.

### Les modèles cloud (le suffix `:cloud`)

Depuis début 2026, certains modèles sont disponibles avec un suffix `:cloud` : `qwen3.5:cloud`, `kimi-k2.6:cloud`, `qwen3-coder-480b:cloud`. Ils ne tournent pas sur votre machine — Ollama les route via son propre cloud, mais en préservant l'interface locale identique. Même API, même commande, même tooling.

```bash
# Modèle local
ollama run qwen3.6:27b

# Modèle cloud — même syntaxe, paramètre exécuté chez Ollama
ollama run qwen3-coder-480b:cloud
```

MiniMax M2 et M3 sont également disponibles en cloud — M3 monte à un contexte de 1 million de tokens et inclut la vision native. Ces modèles sont particulièrement ciblés sur les workflows agentiques.

Deux points à noter : les modèles cloud nécessitent un compte sur ollama.com. Ollama indique ne pas conserver les données, mais ça reste du cloud — à éviter pour des données sensibles.

---

## L'API : OpenAI et maintenant Anthropic

Ollama expose une API REST OpenAI-compatible sur `localhost:11434` depuis le début. C'est ce qui permet à tous les outils qui connaissent OpenAI (LangChain, LlamaIndex, OpenHands…) de basculer vers des modèles locaux sans changer une ligne de code. Rien de nouveau là.

Ce qui est nouveau en 2026 : **la couche de compatibilité Anthropic Messages API**.

```bash
# L'API Anthropic est maintenant disponible sur Ollama
curl http://localhost:11434/api/anthropic/v1/messages \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3.6:27b",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Explique moi le GGUF"}]
  }'
```

L'implication concrète : **Claude Code peut pointer sur Ollama**. Et pas seulement Claude Code — Goose, Cline, et tout outil qui parle le format Anthropic fonctionne désormais avec des modèles locaux ou cloud Ollama. La variable d'environnement `ANTHROPIC_BASE_URL=http://localhost:11434` suffit.

Ce pont est intéressant pour deux cas d'usage distincts :

1. **Isolation et souveraineté** : vous voulez utiliser Claude Code sur un projet confidentiel sans que le code quitte votre machine. Vous pointez sur un modèle local Ollama.
2. **Coût** : vous remplacez les appels API payants par des inférences gratuites sur votre GPU pour les tâches moins exigeantes.

La qualité des modèles locaux reste inférieure à Claude Opus ou Sonnet sur des tâches complexes — mais l'écart se réduit, et pour le refactoring de code simple ou la génération de tests, Qwen 3.6 27B est souvent suffisant.

---

## La web search native

Depuis la v0.27 environ, Ollama intègre une API de web search. Le principe : quand le modèle émet un appel tool `web_search`, Ollama intercepte, exécute la recherche, et réinjecte les résultats dans le contexte avant de générer la réponse finale. Aucune configuration nécessaire côté client.

```python
import ollama

response = ollama.chat(
    model="qwen3.6:27b",
    messages=[{"role": "user", "content": "Quelle est la version actuelle de Python ?"}],
    tools=["web_search"]
)
```

La recherche est disponible avec un tier gratuit généreux pour les particuliers, et un tier payant avec des rate limits plus élevés via le cloud Ollama. Pour une utilisation personnelle, le tier gratuit couvre largement les besoins.

---

## Les intégrations qui redéfinissent l'usage

Ce qui distingue Ollama en 2026, c'est moins le runner lui-même que ce qu'il permet de connecter. Trois intégrations méritent attention.

### Claude Code sur modèle local ou cloud Ollama

Depuis le 16 janvier 2026, Ollama expose nativement la Anthropic Messages API. Conséquence directe : Claude Code peut pointer sur Ollama comme backend, et tourner sur n'importe quel modèle disponible — local ou cloud.

La configuration tient en trois lignes :

```bash
export ANTHROPIC_BASE_URL="http://localhost:11434"
export ANTHROPIC_AUTH_TOKEN="ollama"
export ANTHROPIC_API_KEY=""
```

Ou via la commande `ollama launch`, qui gère tout ça automatiquement :

```bash
ollama launch claude-code --model qwen3.6:27b
# Claude Code démarre, pointé sur votre GPU local
```

Deux cas d'usage distincts s'en dégagent :

**Confidentialité** — le code ne sort pas de la machine. Pour un projet sous NDA ou contenant des données sensibles, c'est la seule solution qui garantit que rien n'est transmis à un serveur tiers.

**Coût** — remplacer les appels API payants par de l'inférence locale pour les tâches répétitives (génération de tests, refactoring de boilerplate). Qwen3.6 27B tient sur une 3090 et couvre la majorité des cas.

Il y a des limites à ne pas ignorer. La prompt caching (qui réduit significativement la latence et le coût dans Claude Code avec les vrais modèles Anthropic) n'est pas disponible sur les modèles locaux — chaque requête retraite l'intégralité du contexte. La longueur de contexte minimale utile est 32k tokens ; en dessous, Claude Code fonctionne mal. Pensez à configurer :

```bash
export OLLAMA_CONTEXT_LENGTH=32768  # ou 65536 si votre VRAM le permet
```

Pour des tâches d'ingénierie complexes, un Claude Sonnet ou Opus reste supérieur. Mais pour du refactoring simple, de la documentation, ou de la génération de tests répétitifs, Qwen3.6 27B en local est suffisant — et gratuit.

### Hermes : l'agent longue durée de Nous Research

Hermes est un agent développé par Nous Research, intégré directement dans l'écosystème Ollama. Ce n'est pas un simple chatbot : il dispose de mémoire cross-session, d'une capacité de création automatique de compétences (skills), et de plus de 70 skills embarqués par défaut (navigation web, gestion de fichiers, exécution de code shell, appels API…).

```bash
# Démarrage direct via ollama launch
ollama launch hermes-desktop
```

**Hermes Desktop** est l'interface graphique qui l'accompagne — native Windows, macOS, Linux. Elle inclut :

- Chat avec streaming SSE, indicateurs de progression des tools, rendu Markdown et coloration syntaxique
- 22 commandes slash intégrées : `/web` pour la recherche, `/browse` pour la navigation, `/code` pour l'exécution, `/shell` pour les commandes système, `/image` pour la génération visuelle, et d'autres
- Suivi de la consommation de tokens en temps réel
- Gestion des sessions avec recherche plein texte et reprise de conversation

Ce qui distingue Hermes d'un simple agent codé maison, c'est l'auto-amélioration : après chaque tâche, il peut créer de nouvelles skills pour mieux gérer des situations similaires à l'avenir. La mémoire cross-session lui permet de se souvenir de vos préférences, de votre configuration, de vos projets actifs.

Il supporte plusieurs backends : Ollama local, OpenRouter, Anthropic, OpenAI, Google Gemini. On peut commencer avec un modèle local léger et basculer sur un modèle cloud Ollama pour les tâches plus lourdes, sans changer d'interface.

### OpenClaw : l'agent qui contrôle la machine

OpenClaw est le troisième acteur notable. Son positionnement est différent : là où Claude Code est centré sur le code et Hermes sur l'orchestration de tâches, OpenClaw est un **agent de contrôle général de la machine** — il peut gérer des fichiers, envoyer des emails, interagir avec des applications, naviguer sur le web, répondre à des messages sur WhatsApp, Telegram, Slack ou Discord.

```bash
ollama launch opencode --model qwen3-coder-480b:cloud
```

L'intégration Ollama fait tourner l'inférence localement (ou sur cloud Ollama), pendant que OpenClaw gère l'orchestration et l'interface avec le système. Le résultat est un assistant autonome entièrement self-hosted — le code Ollama sur votre GPU, OpenClaw sur votre machine, zéro donnée vers des serveurs tiers.

Il existe maintenant un dépôt communautaire de plus de 160 templates d'agents OpenClaw (`awesome-openclaw-agents` sur GitHub) couvrant 19 catégories. Les cas d'usage documentés vont du monitoring d'infra à la gestion de boîte mail, en passant par la veille concurrentielle automatisée.

La combinaison Ollama + OpenClaw est parfois décrite comme "l'option la plus radicale dans l'espace local AI" — non sans raison. Elle donne à un modèle local les mêmes capacités de computer-use que les agents Anthropic ou OpenAI, mais sans dépendance cloud.

---

## Du côté développeur : `ollama launch` et l'API

La commande `ollama launch` mérite un focus séparé des intégrations ci-dessus. Elle ne fait pas que démarrer des agents connus — elle configure automatiquement les variables d'environnement, gère le téléchargement du modèle si nécessaire, et expose les ports utiles :

```bash
# Lance OpenCode avec un modèle cloud (pour les 480B inaccessibles localement)
ollama launch opencode --model qwen3-coder-480b:cloud

# Lance Codex d'OpenAI en mode local avec Qwen
ollama launch codex --model qwen2.5-coder:32b
```

### Multi-GPU et Apple Silicon

Le scheduler multi-GPU est significativement amélioré depuis la v0.6. Sur une machine avec plusieurs GPU, Ollama répartit maintenant mieux la charge, maximise l'utilisation VRAM et réduit les erreurs OOM qui étaient fréquentes auparavant.

Sur Mac avec puce M-series, Ollama utilise MLX sous le hood depuis la v0.19. En pratique, les performances sur M2/M3/M4 sont notablement meilleures qu'avec la chaîne llama.cpp seule — le débit peut doubler sur les petits modèles.

### L'API REST pour l'intégration

Pour les développeurs qui intègrent Ollama dans leurs applications, l'API a gagné en stabilité et en fonctionnalités :

```python
import ollama

# Génération simple
response = ollama.generate(model="qwen3.6:27b", prompt="Bonjour")

# Chat avec historique
response = ollama.chat(
    model="qwen3.6:27b",
    messages=[
        {"role": "system", "content": "Tu es un assistant technique."},
        {"role": "user", "content": "Explique le garbage collection en Go"}
    ]
)

# Embeddings
embeddings = ollama.embed(model="nomic-embed-text", input="texte à vectoriser")

# Liste des modèles disponibles (locaux + cloud)
models = ollama.list()
```

Le client Python officiel supporte les modèles cloud de façon transparente — le code ne change pas selon que le modèle tourne localement ou chez Ollama.

---

## Du côté utilisateur : l'expérience s'est simplifiée

Pour quelqu'un qui veut juste utiliser un LLM sans avoir à configurer quoi que ce soit, Ollama s'est considérablement amélioré.

**Installation** : une commande sur macOS ou Linux, un installeur sur Windows. Le daemon démarre automatiquement.

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull qwen3.6:27b
ollama run qwen3.6:27b
```

**Open WebUI** reste l'interface graphique recommandée pour un usage quotidien — une interface web qui ressemble à ChatGPT, se connecte à Ollama localement, et supporte les modèles cloud d'Ollama sans configuration supplémentaire. La v0.6 d'Open WebUI a intégré la web search et la gestion de documents de façon native.

**Hermes Desktop** via `ollama launch hermes-desktop` offre une alternative orientée tâches longues et agents. Plus proche d'un assistant que d'un chatbot.

**La réalité hardware** en 2026 : avec 16 Go de RAM unifiée (M3, M4 Pro), vous pouvez faire tourner des modèles entre 7B et 14B confortablement. Avec 24 Go VRAM (RTX 3090, 4090, ou M4 Max), vous montez jusqu'au 27-32B. En dessous de 8 Go, restez sur les modèles 3B-7B quantifiés.

---

## Les limites qui n'ont pas changé

Ollama reste un outil pensé pour un utilisateur à la fois. Dès que vous avez plusieurs requêtes concurrentes, les performances chutent sévèrement.

Dans les benchmarks comparatifs de mi-2026 :
- **Utilisateur seul** : Ollama a un avantage de latence de ~18% face à vLLM
- **Charge concurrente** : vLLM atteint ~793 tokens/s vs ~41 tokens/s pour Ollama à charge maximale

La raison technique : Ollama ne fait ni PagedAttention ni continuous batching. Les requêtes s'accumulent en queue et la latence P99 explose à partir de cinq à six requêtes simultanées.

Pour un déploiement en équipe ou en production avec plusieurs utilisateurs parallèles, **vLLM** reste le meilleur choix. Ollama est optimisé pour le workflow développeur solo ou en petite équipe (2-3 personnes en accès alterné).

---

## Positionnement dans l'écosystème actuel

| Usage | Outil recommandé |
|---|---|
| Développeur solo, toutes plateformes | Ollama |
| Interface GUI sur Mac/Windows | LM Studio ou Open WebUI + Ollama |
| Production multi-utilisateurs, GPU NVIDIA/AMD | vLLM |
| Apple Silicon, performance brute | Ollama (MLX sous le hood) |
| Hardware embarqué ou atypique | llama.cpp direct |
| Grands modèles sans GPU local | Ollama cloud models |

---

## Ce qui a vraiment changé depuis janvier 2025

Il y a dix-huit mois, Ollama était un outil pour télécharger et faire tourner un LLM. Pratique, bien conçu, mais avec un périmètre limité.

Aujourd'hui, c'est devenu le point d'entrée d'un écosystème : les modèles cloud permettent d'accéder à des paramètres inaccessibles localement sans changer d'API, la compatibilité Anthropic ouvre le tooling professionnel (Claude Code, Cline) aux modèles open source, la web search enlève la principale faiblesse des LLMs en local, et `ollama launch` raccourcit considérablement le temps entre "je veux tester un coding agent" et "ça tourne".

Le projet reste open source, gratuit pour l'usage local. Le business model se dessine autour du cloud — les modèles `:cloud` et les tiers de web search payants. C'est une transition logique qui préserve ce qui fait la valeur du projet : la simplicité et la transparence de l'interface, quelle que soit l'infrastructure qui tourne derrière.
