---
title: "Claude Code Cheat Sheet, October 2026: the complete state of play"
subtitle: "All of Claude Code v2.1.296 on one page: 120 commands, 33 hooks, 243 settings, 391 environment variables"
description: "Exhaustive Claude Code cheat sheet (v2.1.296) and October 2026 state of play: Opus 5.5, Fable 5.1, auto mode by default, mods, workflows, agent view."
date: 2026-10-13T06:00:00.000Z
lang: en
translationKey: "claude-code-cheatsheet-octobre-2026"
slug: "claude-code-cheatsheet-october-2026-state-of-play-en"
tags:
  - "IA"
  - "Development"
  - "Claude Code"
related:
  - "kaizen-ai-sdlc-claude-code"
  - "orca-ide-agentic-development"
author: "Angelo Lima"
cover: "/assets/img/claude-code.webp"
thumbnail: "/assets/img/claude-code.webp"
shareImg: "/assets/img/claude-code.webp"
aliases:
  - "/2026-10-13-claude-code-cheatsheet-october-2026-state-of-play-en/"
faq:
  - q: "What is the latest version of Claude Code in October 2026?"
    a: "As of October 13, 2026, the latest Claude Code version is v2.1.296, released on October 9, 2026. About 125 versions shipped between June 9 (v2.1.170) and October 9. Run claude --version to see the installed version and claude update to upgrade."
  - q: "Which model does Claude Code use by default in October 2026?"
    a: "Since v2.1.280 (September 22, 2026), Claude Code uses Claude Opus 5.5 by default on the Pro, Max, Team and Enterprise plans and on the Anthropic API, at medium effort. Fable 5.1, the most capable model, is never the default: select it with /model fable."
  - q: "What is Claude Code's auto mode?"
    a: "Auto mode is a Claude Code permission mode in which a classifier judges each action instead of asking the user to confirm it. By default it blocks destructive actions such as git reset --hard or terraform destroy. Since v2.1.284 it is the starting mode for every interactive session that isn't configured otherwise."
  - q: "What is a mod in Claude Code?"
    a: "A mod is a Claude Code plugin written in JavaScript or TypeScript that runs inside the tool, introduced on October 1, 2026 (v2.1.287). It can draw panes, add commands that run without a Claude turn, intercept tool calls or call a model. It runs with the user's permissions, so it should only be installed from a trusted source."
  - q: "How many commands and settings does Claude Code have?"
    a: "In October 2026, Claude Code documents about 120 built-in slash commands and skills, 33 hook events, 46 built-in tools, 243 settings.json keys and 391 environment variables. Angelo Lima's cheat sheet lists all of them, with an expandable appendix for settings and variables."
---
My fourth Claude Code cheat sheet in seven months, and the first one I didn't feel like calling an "update". Between June's v2.1.170 and October 9's v2.1.296, Anthropic shipped about 125 versions, including four new models and plugins that can redraw the interface. And the default permission mode changed its very nature. Adding badges to the June edition was no longer enough.

So this time I rebuilt the reference from scratch, from the official documentation downloaded page by page on October 13, and aimed for exhaustiveness in the strict sense: every command, every hook event, every flag, and in an appendix each of the 243 `settings.json` keys and 391 environment variables. The article that goes with it takes stock of what moved since June, and of what disappeared.

> **In brief**
>
> - **What:** an exhaustive cheat sheet for Claude Code v2.1.296 (October 9, 2026), as interactive HTML, in English and French, checked against code.claude.com.
> - **Key figures:** ~120 built-in commands and skills, 33 hook events, 46 tools, 243 settings, 391 environment variables.
> - **Models:** Opus 5.5 is the default everywhere ($4 / $20 per MTok, `medium` effort), plus Sonnet 5.5, Haiku 5.5, and Fable 5.1 as an option for big jobs.
> - **What changed in nature:** auto mode became the default mode, subagents run in the background, and mods let you change Claude Code from the inside.
> - **Why it matters:** you now steer Claude Code by goals and delegate to background agents, instead of approving each command.

## The cheat sheet

- **[English: interactive HTML](/assets/data/claude-code-cheatsheet-october-2026-en.html)**
- **[Français : HTML interactif](/assets/data/claude-code-cheatsheet-octobre-2026.html)**

Same palette as the previous ones (dark background, gold accent), with three badges: NEW for anything that wasn't in the [June edition](/en/claude-code-cheatsheet-june-2026-update/), CHANGED for anything whose behavior changed, REMOVED for anything that no longer exists. The page now renders properly on mobile, which the earlier editions didn't (they forced a fixed 1,400-pixel width).

## What's covered

| Section | Contents |
|---------|----------|
| What changed since June | Month-by-month timeline, June to October |
| Keyboard shortcuts | Essentials, navigation, readline editing, prefixes, transcript, agent view |
| Vim mode | Modes, navigation, editing, text objects |
| Models, effort and costs | The four 5.x models, aliases, effort levels, fast mode, advisor, fallbacks |
| Slash commands | Complete list in 9 categories, removed ones included |
| CLI | Subcommands (background sessions, plugins, purge, gateway…) and every flag |
| Permissions | 6 modes, rule syntax, auto mode, sandbox |
| Hooks | All 33 events, the 5 handler types, common fields |
| Memory, skills, subagents | CLAUDE.md and AGENTS.md, full frontmatter, output styles |
| Plugins, mods and MCP | Plugin components, marketplaces, mods, MCP |
| Parallelism | Subagents, fork, agent view, agent teams, workflows, projects |
| Platforms | CLI, Desktop, web, self-hosted, mobile, IDEs, Chrome, Slack, CI/CD |
| Built-in tools | All 46 tools, deprecated ones included |
| Files and configuration | `.claude/` tree, precedence, key settings, status line, artifacts |
| Admin and enterprise | Model control, policies, versions, observability |
| Appendix | All 243 settings keys, 391 environment variables and 137 keybinding actions |

## State of play: where Claude Code stands in October 2026

### Models: the 5.5 generation settles in

It was a busy summer. Sonnet 5 landed on July 2, Opus 5 on July 24, then the next generation: Fable 5.1 on September 1, Opus 5.5 on the 22nd, Sonnet 5.5 on the 28th, and Haiku 5.5 on October 7. In June I had to annotate the cheat sheet in a hurry after Fable 5 was suspended. The Fable family is back, and the `fable` alias now points to 5.1.

| Model | ID | Price (input / output, per MTok) | Status |
|-------|----|----|--------|
| Fable 5.1 | `claude-fable-5-1` | $10 / $50 | Most capable, never the default |
| Opus 5.5 | `claude-opus-5-5` | $4 / $20 | Default on every plan and the API |
| Sonnet 5.5 | `claude-sonnet-5-5` | $2 / $10 | `sonnet` alias |
| Haiku 5.5 | `claude-haiku-5-5` | $0.10 / $0.50 | `haiku` alias |

All of them have a native one-million-token context. Since v2.1.280, **Opus is the default model on every plan**, Pro and Team Standard included (they used to be on Sonnet). Default effort on the 5.5 models drops to `medium`, which the documentation recommends for well-scoped everyday work, and it is now saved per model. Finally, `ultracode` has become an independent toggle (`/effort ultracode on`) that plans a workflow for each substantive task, at any level.

On the safety side, recent models run with classifiers (cybersecurity, biology). A flagged request automatically switches to a fallback model depending on the category: Opus 4.8 for cyber, Opus 5 for bio. If you work on a security repository and see unexplained switches, `switchModelsOnFlag` makes Claude Code ask you first.

### Auto mode is no longer optional

To me this is the most structural change of the period. In June, auto mode was a feature you turned on. On August 14 it became the default mode for new Pro, Max and Team sessions, and since v2.1.284 (September 28) it is the default for every interactive session on every plan and provider, unless `permissions.defaultMode` says otherwise.

The idea: a classifier evaluates each action instead of asking you to click. It now runs server-side by default, and its calls no longer count against your usage limits. It was hardened all summer: it blocks `git reset --hard` or `git clean -fd` when you didn't ask to throw work away, refuses `terraform destroy` without an explicit request, forbids access to cloud metadata endpoints, asks before the first read outside the working directory, and now names the rule behind a denial (for example `[Data Exfiltration]`). The `/auto-mode-setup` command drafts the `autoMode.environment` section that describes your trusted repositories and domains.

As a consequence, the old "default" mode is now called **Manual**, and `bypassPermissions` can no longer be turned on from a repository's settings. I covered the old model in the [Permissions and security](/en/claude-code-permissions-security/) article. The rule syntax there still holds; what moved is the starting point.

### Parallelism became the norm

In June, agent view had just arrived. Four months later, parallelism is everywhere, and the documentation now lists five distinct ways to get several agents working:

- **Subagents** run in the background by default since July. They can nest three levels deep, twenty can run at once, and their permission requests surface in the main session. The frontmatter gains `omitClaudeMd`, `autoCompactWindow` and `effort` (see [the subagents article](/en/claude-code-subagents/) for the basics).
- **Fork** is on by default: a forked subagent inherits the whole conversation and the cache. `/subtask` starts one, and `/fork` now copies the entire session into a background session with its own worktree.
- **Agent view** (`claude agents`, or `←` on an empty prompt) gains search by name, the `n:` filter, classifier-written titles, and a link to the associated PR or GitLab MR.
- **Dynamic workflows** orchestrate tens to hundreds of agents from a JavaScript script Claude writes. Saved in `.claude/workflows/`, they become commands.
- **Projects** (Pro and Max beta) launch parallel cloud threads from a single conversation.

On top of that comes cross-session messaging (August): two Claude Code sessions on the same machine can write to each other through `SendMessage`, and `@name` in the prompt mentions another session.

### Extending Claude Code: enter mods

Skills, subagents, hooks, MCP and plugins were already there. On October 1 (v2.1.287) a new layer arrived: **mods**. A mod is a plugin written in JavaScript or TypeScript that runs *inside* Claude Code. Where a hook launches an external script, a mod can draw a pane next to the transcript, add a band above the prompt, create a command that runs without a Claude turn, hold a tool call while it asks a question, or send a request to another model. Anthropic uses the mechanism for its own features too: the `/diff` panel is a mod.

The trade-off is spelled out in the docs: a mod runs with your permissions, reads your secrets, sees every prompt and can approve a tool call on your behalf. I would only install them from a marketplace I control.

Hooks keep growing as well: we're up to 33 events (from 27 in June), including `DirectoryAdded`, `PreModelSwitch` and `PostModelSwitch`. The new `onFailure: "block"` field (v2.1.295) closes a real gap for anyone relying on [hooks](/en/claude-code-hooks/) as a safeguard: a security hook that crashes or times out now blocks the action instead of letting it through.

Other notable ecosystem additions: `claude plugin eval` to test a plugin against a run without it, `/skill-doctor` to spot skills that cost context without being used, syncing of the skills and plugins enabled on claude.ai, and AGENTS.md support when a project has no CLAUDE.md. `/import codex`, `/import gemini` and `/import cursor` bring over another agent's configuration.

### Beyond the terminal

Claude Code lives less and less in the terminal alone:

- Desktop comes to Linux in beta (Ubuntu 22.04+, Debian 12+), with a built-in browser, an iOS Simulator, background computer use on macOS, pop-out panes and automatic continuation after a usage limit. `/resume` there picks up sessions started from the CLI.
- Artifacts publish interactive pages to claude.ai from the session, and can call your MCP connectors on every view.
- Self-hosted environments run cloud sessions on the company's own infrastructure (Team and Enterprise beta).
- Remote Control is out of preview, and the mobile app shows your machines as cards you can start a session on.
- Claude in Chrome has been generally available since July.

### Review and security

Four tools now complement each other. `/code-review` hunts bugs in a background agent, at five effort levels, and can comment on the PR or apply fixes. `/simplify` handles cleanup. `/ultrareview` sends a fleet of agents into the cloud. On the security side, the security-guidance plugin reviews each edit, and the Claude Security plugin (July) runs a full multi-agent scan with a threat model, then turns the findings you pick into patches to review. Finally, `/verify` and `/run` launch the application to see that a change actually works, beyond the tests.

### On the enterprise side

Administrators got a lot of levers: `deniedModels` and `availableModelsMatch: "exact"` to block a model until it's approved, `maxEffortLevel`, `allowedProviders`, `modelPricing` to show costs at negotiated rates, `managedMcpServers` to hand out MCP servers, and the self-hosted Claude apps gateway (SSO, policies, spend limits) in front of Bedrock, Vertex or Foundry. A repository's settings can no longer turn on telemetry, Remote Control or Claude in Chrome: those now belong to the user or the admin.

### What disappeared

- Ultraplan (the `/ultraplan` command and keyword): removed in August.
- `/vim` and `/pr-comments`: removed. Vim mode is set in `/config`.
- The TodoWrite and Task\* tools are no longer provided to recent models (`CLAUDE_CODE_ENABLE_TODO_TOOLS=1` brings them back), and TaskOutput is gone.
- Glob and Grep are absent by default on macOS, Linux and WSL: Claude uses `find` and `grep`, which actually run embedded versions of `bfs` and `ugrep`.
- `/agents` no longer opens a wizard: ask Claude to create the agent, or edit `.claude/agents/`.

## My takeaway

Back in December, in my [20-article series](/en/claude-code-installation-first-steps/), Claude Code was a terminal assistant you watched command by command. In October, the tool is designed for you to hand it a goal (`/goal`), let it break the goal down, delegate to background agents, and let a classifier act as the guardrail. The user's job shifts toward defining the frame: rules, hooks, CLAUDE.md, spend limits. That is exactly the idea behind [Kaizen](/en/kaizen-ai-sdlc-claude-code-en/), the Claude Code SDLC I presented last week: when the agent speeds everything up, critical rules have to be enforced by code.

The flip side is surface area. 243 settings and 391 environment variables is a lot, and part of this cheat sheet exists so you can find the right lever without rereading 220 documentation pages. `/doctor` and `/skill-doctor` go in the right direction by helping you remove what no longer serves.

---

Official sources: [Changelog](https://code.claude.com/docs/en/changelog), [What's new](https://code.claude.com/docs/en/whats-new), [Commands](https://code.claude.com/docs/en/commands), [CLI reference](https://code.claude.com/docs/en/cli-reference), [Hooks reference](https://code.claude.com/docs/en/hooks), [Model configuration](https://code.claude.com/docs/en/model-config), [Mods overview](https://code.claude.com/docs/en/plugins/mods/overview), [All settings](https://code.claude.com/docs/en/settings-reference), [Environment variables](https://code.claude.com/docs/en/env-vars).

Previous editions are still available: June [EN](/assets/data/claude-code-cheatsheet-june-2026-en.html) · [FR](/assets/data/claude-code-cheatsheet-juin-2026.html), April [EN](/assets/data/claude-code-cheatsheet-april-2026-en.html) · [FR](/assets/data/claude-code-cheatsheet-avril-2026.html), March [EN](/assets/data/claude-code-cheatsheet-2026-en.html) · [FR](/assets/data/claude-code-cheatsheet-2026.html).

If you spot a mistake or something missing, let me know and I'll fix the cheat sheet.
