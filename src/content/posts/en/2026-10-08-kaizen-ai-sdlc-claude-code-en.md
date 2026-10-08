---
title: "Kaizen: a complete SDLC for Claude Code, from requirement to production"
subtitle: "A coding agent speeds everything up, mistakes included. Kaizen gives Claude Code a whole development lifecycle, with its critical rules enforced by code."
description: "Kaizen is an SDLC for Claude Code (MIT plugin): requirements, plan, code, review, deployment, monitoring and learning, with hooks that actually block."
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
    a: "Kaizen is an open source (MIT) plugin that gives Claude Code a complete SDLC: requirements, plan, test-first code, multi-agent review, pull request, watched deployment, incidents and learnings. It ships 23 skills, 21 read-only agents and a zero-dependency Node.js CLI. Version 3.2.1 was released on October 7, 2026."
  - q: "What is an AI SDLC?"
    a: "An SDLC (Software Development Life Cycle) is the set of phases that take software from a requirement to production: framing, design, code, verification, delivery, deployment, operations and improvement. An AI SDLC tools those phases for a coding agent, with checks suited to a fast executor that can forget an instruction."
  - q: "How is Kaizen different from Compound Engineering?"
    a: "Kaizen is derived from Every's Compound Engineering plugin (MIT) and keeps its learning loop. It adds checks enforced by hooks, Spec Kit's constitution, deployment, monitoring and DORA metrics. Kaizen is built for Claude Code and relies on its hooks."
  - q: "How do I install Kaizen?"
    a: "In Claude Code, add the marketplace with /plugin marketplace add Lingelo/dojo, then install the plugin with /plugin install kaizen@dojo. Kaizen needs Node.js 18 or later and git, plus gh for pull requests. In a repository, start with /kaizen:setup."
  - q: "Can Kaizen deploy to production on its own?"
    a: "No. Kaizen only deploys with the commands the team declared, and for a protected environment the user must type an approval code, valid for 30 minutes. Autopilot mode stops at a ready pull request and never merges or deploys."
---
A coding agent writes fast. It also sometimes forgets the tests, or pushes a branch nobody reviewed. The [DORA 2025](https://dora.dev/research/) report measured it: AI raises team throughput, and instability along with it, except in teams that keep clear principles, small batches and real feedback.

**Kaizen** is the plugin I wrote to tool those disciplines in Claude Code, across the whole SDLC, from the requirement to production. It also answers the question I left open in April in [my map of SDD, Compound Engineering and BMAD](/en/sdd-compound-engineering-bmad-philosophies-en/): can you combine the rigor of a spec with a learning loop?

> **In brief**
>
> - **What:** Kaizen is an open source (MIT) Claude Code plugin covering the whole development lifecycle: requirements, plan, code, review, PR, deployment, monitoring, postmortem.
> - **Key numbers:** 23 skills, 21 read-only agents, 6 hooks, a Node.js CLI with no npm dependency. Version 3.2.1, October 7, 2026.
> - **What sets it apart:** the critical rules are hooks. Claude cannot finish on red tests, push without a real review, or deploy to production without a code you type.
> - **Where it comes from:** the loop of Every's [Compound Engineering](https://github.com/EveryInc/compound-engineering-plugin), the constitution from [Spec Kit](https://github.com/github/spec-kit), practices from DORA and the NIST SSDF.
> - **Who it's for:** teams on Claude Code that want quality guarantees all the way to production.

## The SDLC, phase by phase

Each classic phase of the cycle has its command. The last column says whether a check in code enforces it.

| Phase | Command `/kaizen:…` | Enforced by code |
|---|---|---|
| Principles | `constitution`: 5 to 9 rules, each with a check | partly |
| Requirements | `brainstorm`: requirements R1…, acceptance examples AE1… | partly |
| Design | `plan` (STRIDE threats, rollback, PR-sized slices), then `doc-review` | partly: `plan check` verifies every requirement is covered |
| Code | `work` (test first), `debug` | yes: no end of turn on red tests |
| Verification | `review`, reviewers picked from the diff | yes: push refused without a real review |
| Delivery | `ship`, `watch-pr`, `release` | yes: PR size and SemVer checked |
| Deployment | `deploy` with your commands, rollback | yes: approval code for production |
| Operations | `monitor`: plan thresholds, dated incidents | partly |
| Improvement | `learn`, `postmortem`, `metrics` (DORA) | partly |

Lost along the way? `/kaizen:help` looks at where the repository stands and gives the next command.

## The critical rules are hooks

Writing "run the tests before finishing" in `CLAUDE.md` works nine times out of ten. The tenth time the session is long, the context compacted, and Claude reports that all is well over a red suite. So Kaizen puts those rules in [hooks](/en/claude-code-hooks/), which Claude Code runs on every tool call.

- **Before a commit**, a scan refuses about thirty kinds of keys and tokens.
- **Before a push**, the branch is refused until a review has been recorded, with proof that the reviewer agents really ran.
- **At the end of a turn**, tests, lint and type checks must pass.
- **For production**, only a code you type unlocks the deployment.

## A loop that learns

[![The Kaizen loop: the constitution frames everything. Build (brainstorm, plan, doc-review, work, review, ship). Operate (you merge, deploy, monitor, incident, rollback, postmortem). The project memory is read back by the next cycle](/assets/img/kaizen-loop-en.svg)](/assets/img/kaizen-loop-en.svg)

This is what Compound Engineering brings. What a cycle learns (learnings, ADRs, postmortems) is written in the repository, and an agent reads it back before every plan, review or debugging session. Deployments, rollbacks and incidents become dated git tags, so the DORA metrics are computed from real events. `/kaizen:metrics` also separates learnings that were read from those applied in a commit. A learning nobody reuses signals a loop that isn't turning.

Ceremony is set by profile: `lean` for a prototype, `standard` for a product in production, `full` for a regulated domain. The checks in code stay on in all three.

## Try it

```
/plugin marketplace add Lingelo/dojo
/plugin install kaizen@dojo
```

Kaizen is built for Claude Code and relies on its hooks. You need Node.js 18 or later, git, and `gh` for PRs. In your repository, run `/kaizen:setup audit`: it scores the project's SDLC maturity in five areas and offers to add what's missing. Code and docs are on [GitHub](https://github.com/Lingelo/dojo/tree/main/plugins/kaizen). For how plugins work, see [my article on Claude Code marketplaces](/en/claude-code-plugins-marketplace/).
