---
title: "Kaizen: I ended up writing the SDLC I was looking for in Claude Code"
subtitle: "In April I wondered whether anyone combined specification with Compound Engineering. Six months later the answer fits in a plugin: a constitution, a learning loop and guardrails written as code, from the plan to production."
description: "Kaizen, an open source Claude Code plugin: constitution, plan, multi-agent review, watched deployment and DORA, with hooks that actually block."
date: 2026-10-08T00:00:00.000Z
lang: en
translationKey: "kaizen-ai-sdlc-claude-code"
slug: "kaizen-ai-sdlc-claude-code-en"
tags:
  - "IA"
  - "Development"
  - "Claude Code"
author: "Angelo Lima"
thumbnail: "/assets/img/kaizen-sdlc-claude-code.webp"
shareImg: "/assets/img/kaizen-sdlc-claude-code.webp"
aliases:
  - "/2026-10-08-kaizen-ai-sdlc-claude-code-en/"
faq:
  - q: "What is Kaizen for Claude Code?"
    a: "Kaizen is an open source (MIT) Claude Code plugin that tools the whole software development lifecycle: project constitution, brainstorm, plan, test-first code, multi-agent review, pull request, watched deployment, incidents and learnings. It ships 23 skills, 21 read-only agents and a zero-dependency Node.js CLI. Version 3.2.1 was released on October 7, 2026."
  - q: "How is Kaizen different from Compound Engineering?"
    a: "Kaizen is derived from Every's Compound Engineering plugin (MIT) and keeps its loop, learnings schema and reviewers. It adds guardrails enforced by hooks (green tests before work ends, push refused without a real review), Spec Kit's constitution, deployment, monitoring and DORA metrics. In return, Kaizen only runs on Claude Code, while Compound Engineering targets 14 agent environments."
  - q: "How do I install Kaizen?"
    a: "In Claude Code, add the marketplace with /plugin marketplace add Lingelo/dojo, then install the plugin with /plugin install kaizen@dojo. Kaizen needs Node.js 18 or later and git, plus gh for pull requests. In a repository, start with /kaizen:setup and then /kaizen:constitution."
  - q: "Can Kaizen deploy to production on its own?"
    a: "No. Kaizen only deploys with the commands the team declared in .kaizen/config.json. For a protected environment, the user must type a six-character approval code, valid for 30 minutes, and a hook refuses the raw command. Autopilot mode stops at a ready pull request and never merges or deploys."
  - q: "Is Kaizen suitable for a small project?"
    a: "Yes, with the lean profile, meant for a prototype or an internal tool: less ceremony, fewer reviewers. The standard profile targets a product in production and the full profile regulated or critical domains. The profile changes the ceremony, never the deterministic checks such as the secret scan or the review required before a push."
---
In April I published a [map of the ways of working with AI](/en/sdd-compound-engineering-bmad-philosophies-en/): Spec-Driven Development, Compound Engineering, BMAD. My conclusion was a question. Is there a tool that natively combines the rigor of a specification with the learning loop of Compound Engineering? I hadn't found one. I wrote "maybe it's a space to invent".

So I built it, for my own use first. It's called **Kaizen**, it's a Claude Code plugin, it's open source, and it just reached version 3.2.1.

> **In brief**
>
> - **What:** Kaizen is a Claude Code plugin (MIT license) that tools the full development lifecycle, from the project's constitution to the watched deployment and the postmortem.
> - **Key numbers:** 23 skills (`/kaizen:plan`, `/kaizen:review`, `/kaizen:deploy`…), 21 read-only agents, 6 hooks, a Node.js CLI with no npm dependency at all. Version 3.2.1, October 7, 2026.
> - **Where it comes from:** the loop and learnings of Every's [Compound Engineering](https://github.com/EveryInc/compound-engineering-plugin), the constitution from GitHub's [Spec Kit](https://github.com/github/spec-kit), delivery practices from DORA and the NIST SSDF.
> - **What sets it apart:** the important rules are enforced by code. Claude cannot finish its work on red tests, push a branch without a review that actually ran, or deploy to production without a code you type.
> - **The catch:** it only runs on Claude Code, and it has a single maintainer.

## Why an instruction isn't enough

Everyone has seen it. You write "run the tests before finishing" in `CLAUDE.md`. Claude runs them nine times out of ten. The tenth time the session is long, the context was compacted, and it proudly announces that "everything is in place" over a red suite.

That's where Kaizen starts. A rule you really want followed shouldn't live in a prompt. It should live in a [hook](/en/claude-code-hooks/), where Claude Code runs code on every tool call and can refuse the action. Kaizen registers six:

- a **`Stop` hook** that, during `/kaizen:work` and `/kaizen:autopilot`, runs tests, lint and type checks before letting Claude end its turn. If they're red it blocks, three times at most, then lets through while requiring the failure to be reported;
- a **`PreToolUse` hook on `git commit`** that scans what's going out (about thirty kinds of keys and tokens) and also refuses `--no-verify`;
- a **`PreToolUse` hook on `git push`** that refuses the branch until `/kaizen:review` has recorded the pushed tree;
- two `PostToolUse` hooks that observe, one of them logging every reviewer actually launched;
- a `UserPromptSubmit` hook that recognizes the confirmation codes **you** type.

The push hook is the one I'm proudest of. Recording a review requires evidence: the log of reviewer agents that really ran, written by another hook. So Claude can't declare a review that never happened. If you really must bypass it, only a person can, by typing `kaizen waive <code>` in the conversation, and the waiver shows up in the PR description.

These guardrails protect against forgetfulness. Against a malicious agent, an intermediate script is enough to get around them, and the documentation says so plainly.

## The loop, from principle to production

![The Kaizen loop: the constitution band, the build row from ideate to learn, the operate row from merge to postmortem, and the project memory read back by the next cycle](/assets/img/kaizen-loop.svg)

The cycle reads as two rows.

**Build.** `/kaizen:brainstorm` settles the *what* through a dialogue, one question at a time, and numbers the requirements (R1, R2…) and acceptance examples (AE1…). Anything unclear is marked `[NEEDS CLARIFICATION]` rather than guessed. `/kaizen:plan` decides the *how*: justified decisions, STRIDE threats, a rollout and rollback plan, units grouped into PR-sized slices. A deterministic `plan check` verifies that every requirement is covered by a unit, then `/kaizen:doc-review` sends two to six reviewers at the plan before the first line of code. `/kaizen:work` executes unit by unit, test first, one commit per unit.

**Operate.** `/kaizen:review` picks its reviewers from the diff (security, performance, data migrations, API contracts…). `/kaizen:ship` opens a PR with a reading guide for the reviewer, and `/kaizen:watch-pr` drives it to "ready" by handling comments and CI, without ever merging. Then come `/kaizen:deploy` and `/kaizen:monitor`, the part no other tool in this family covers.

Everything learned goes back into the repository: `docs/learnings/`, `docs/adr/`, `docs/postmortems/`. An agent, `learnings-researcher`, reads them back at every plan, every review and every debugging session. That's the core idea of Compound Engineering: each cycle makes the next one easier.

## A constitution you can check

I took the idea of a constitution from Spec Kit, with one extra constraint. Each article of `CONSTITUTION.md` carries a **Check:** line saying how you verify it's respected. A principle like "the code must be maintainable" gets pushed back by the `/kaizen:constitution` interview. "Every public route has an integration test" goes through, because you can check it.

The constitution is then enforced three times: `plan check` verifies the plan assesses every article, `doc-review` holds the plan against it, `standards-reviewer` holds the diff against it. The hierarchy is explicit: constitution, then shared team rules (*packs*), then learnings, then preferences.

## Deployment, with your commands

Kaizen doesn't know your infrastructure and doesn't pretend to guess it. `deploy detect` recognizes the platform (Vercel, Netlify, Fly.io, Heroku, Kamal, Helm, Terraform, about fifteen in all) and proposes a configuration. You declare the deploy command and the rollback command in `.kaizen/config.json`.

For a protected environment, `deploy request` generates a six-character code valid for 30 minutes. Until you type `kaizen deploy 7C1E0B` yourself, nothing goes out, and the hook refuses the raw command if Claude tries to run it directly. After the deployment, `monitor watch` watches the signals the plan declared, with their thresholds (an error rate above 1 %, for example). Two consecutive red samples and it's an incident, then a rollback.

Every deployment, rollback, incident and resolution becomes a dated, **annotated git tag**. The DORA metrics in `/kaizen:metrics` (frequency, lead time to production, failure rate, time to restore) are computed from real events instead of being reconstructed from memory. And `/kaizen:postmortem` builds its timeline from the same tags.

Version 3.2.1 fixes a flaw I should have spotted earlier. A metric whose command crashes doesn't prove the service is down, only that the measuring tool is broken. Kaizen now classifies it as **blind**: no rollback, no incident, so no fake failure in the DORA numbers. An unreachable HTTP health-check still counts as an outage.

## Scaling the ceremony

The usual complaint about this kind of tool is weight. Six reviewers on a plan for an internal script is absurd. Kaizen has three profiles:

- `lean` for a prototype or an internal tool;
- `standard` for a product in production;
- `full` for regulated or critical domains.

The profile sets the plan size, the number of reviewers and the models used. It never touches the deterministic checks: the secret scan and the review before push stay on in `lean`. Every agent also has a role, and every role a model per profile: research runs on a frugal model, critical reviewers (security, migrations, adversarial) on the strongest one.

To know whether all this is worth its cost, `/kaizen:metrics` also measures the price of each cycle (duration, tokens, hook blocks) and separates learnings that were **read** from those actually **applied** in a commit. A learning nobody ever cites is the sign of a loop that doesn't close.

## What Kaizen doesn't do

The repository's positioning page lists four limits, and I'd rather repeat them here.

- **It's not a team method.** No sprints, no estimation, no cross-team coordination.
- **It's not an observability platform.** Kaizen reads your signals and receives your alerts (Alertmanager, PagerDuty, Datadog); it stores nothing and does no on-call.
- **The guardrails target forgetfulness**, not malice.
- **Claude Code only.** The guarantees rest on its hooks. Another agent would get the skills' instructions without the checks.

It's also young: 1.0 is dated October 2, 2026. Every's Compound Engineering has about 25,000 stars, runs on 14 agent environments and has a community behind it. If your team mixes Cursor, Codex and Claude Code, or wants to start light, that's the one I'd recommend. Kaizen is for a team already on Claude Code that wants guarantees all the way to production.

## How it's tested

A tool that claims to enforce green tests had better have some. The suite (`node --test`) has 118 tests: unit, CLI, hooks, PR flow against a fake `gh`, and contract tests on the documentation itself, which fail if a command is undocumented or a relative link is broken. It runs in CI on Linux, macOS and Windows. Alongside, 33 end-to-end evaluations drive the skills through a real `claude -p` session, from setup to rollback and postmortem.

## Try it

```
/plugin marketplace add Lingelo/dojo
/plugin install kaizen@dojo
```

You need Node.js 18 or later, git, and `gh` for pull requests. In your repository, `/kaizen:setup` detects the stack and writes the configuration, and `/kaizen:setup audit` scores the project's SDLC maturity in five areas and offers to add what's missing (CI, PR template, Dependabot, CODEOWNERS). Then `/kaizen:constitution`. If you get lost at any point, `/kaizen:help` looks at where the repository stands and tells you which command to run.

The code is on [GitHub, in the dojo repository](https://github.com/Lingelo/dojo/tree/main/plugins/kaizen), with documentation per skill and an [80-second presentation video](https://github.com/Lingelo/dojo/blob/main/media/kaizen/kaizen-presentation.mp4). If you're new to plugins, my article on [Claude Code plugins and marketplaces](/en/claude-code-plugins-marketplace/) explains how they work.

*Kaizen* means continuous improvement. Models change every quarter. What a repository learns from one cycle to the next, its constitution, learnings and postmortems, it keeps.
