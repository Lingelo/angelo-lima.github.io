---
title: "SDD, Compound Engineering, BMAD: Which AI Development Philosophy Should You Choose?"
subtitle: "Mapping structured approaches for AI-assisted development — and why combining them is probably the right answer"
date: 2026-04-04T12:00:00.000Z
lang: en
translationKey: "ai-development-philosophies"
slug: "sdd-compound-engineering-bmad-philosophies-en"
tags:
  - "IA"
  - "Development"
  - "Claude Code"
author: "Angelo Lima"
thumbnail: "/assets/img/sdd-compound-engineering.webp"
shareImg: "/assets/img/sdd-compound-engineering.webp"
aliases:
  - "/en/2026-04-04-sdd-compound-engineering-bmad-philosophies-en/"
---
Vibe coding democratized AI-assisted development. But by 2026, the verdict is unanimous: **it doesn't scale**. Serious projects demand more structure. Three families of approaches have emerged to fill that gap — each tackling the problem from a different angle.

This article maps these approaches comparatively, with concrete guidance on how to choose — or combine — them.

## The problem: why vibe coding hits a wall

The term [vibe coding](https://en.wikipedia.org/wiki/Vibe_coding), popularized by Andrej Karpathy in early 2025, describes a workflow where the developer delegates code generation to an AI via natural language, without formally structuring requirements.

The problem is documented and measurable. According to an [Augment Code analysis](https://www.augmentcode.com/tools/best-spec-driven-development-tools) of teams using AI-assisted development, vibe coding hits a documented wall around the three-month mark, when technical debt accumulates significantly. A [GitClear study](https://qubittool.com/blog/spec-coding-complete-guide) analyzing 211 million lines of code found that since AI tools became widespread, copy-pasted code increased by 48% while refactoring activity dropped by 60%.

When the context window fills up, the AI loses the thread: forgotten requirements, logic regressions, architectural hallucinations. Code review becomes impossible without a reference specification.

Three families of solutions have emerged.

---

## 1. Spec-Driven Development (SDD): framing the input

### The concept

SDD starts from a simple observation: **the quality of AI output directly depends on the quality of the input**. If you sufficiently frame what you're asking for — through a formal specification — the result becomes predictable and traceable.

According to [Wikipedia](https://en.wikipedia.org/wiki/Spec-driven_development), SDD is a methodology where the formal specification serves as the primary source of truth, from which implementation, tests, and documentation are derived. Its roots trace back to NASA's workflows of the 1960s and the earliest formal methods.

In practice, the SDD lifecycle follows four phases: **Specify → Plan → Implement → Validate**.

### The tools

| Tool | Maker | Philosophy | Best for |
|------|-------|------------|----------|
| **[OpenSpec](https://openspec.pro/)** | Fission-AI | Lightweight, 3 phases (propose → apply → archive), delta markers | Brownfield, iteration on existing code |
| **[Spec Kit](https://speckit.org/)** | GitHub | Strict, 4 sequential phases with gates | Greenfield, structured projects |
| **[Kiro](https://kiro.dev/)** | AWS | Powerful, integrated into their IDE | AWS ecosystem, locked-in teams |
| **[AI DevKit](https://ai-devkit.com/)** | codeaholicguy | Scaffolding + persistent memory via MCP | Multi-session workflows |

**OpenSpec** stands out for its change isolation mechanism. Each feature lives in an independent `changes/` folder with delta markers (`ADDED`/`MODIFIED`/`REMOVED`), merged into the main specs only at archival time. It's the most suited to brownfield work — which represents the majority of real-world projects.

**Spec Kit** (GitHub) is more structured and prescriptive. The `/specify` → `/plan` → `/tasks` → `/implement` workflow enforces explicit checkpoints. Better suited for greenfield, though the overhead can outweigh the benefit on small features.

**AI DevKit** brings an interesting layer the others lack: a [persistent memory system](https://ai-devkit.com/faq/ai-devkit-vs-spec-kit/) with storage and retrieval via MCP or CLI. The two aren't mutually exclusive either — AI DevKit can provide the workflow foundation while Spec Kit brings spec-first discipline.

### SDD: strengths and limitations

**Strengths:**
- Traceability from spec → code → tests
- Measurable reduction in hallucinations (constrained scope reduces ambiguity)
- Compatible with existing code review practices
- Specs are versioned and auditable

**Limitations:**
- **Spec drift** is inherent — the gap between spec and implementation is [hard to avoid](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices) according to Thoughtworks
- Writing specs adds overhead for small features
- **Doesn't capture accumulated learning** — specs describe *what you want*, not *what you learned while building it*

That last point is critical. It's the structural blind spot of pure SDD.

---

## 2. Compound Engineering: capitalizing on accumulation

### The concept

[Compound Engineering](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents), developed by Every, Inc. (Dan Shipper & Kieran Klaassen, December 2025), starts from the opposite observation: in traditional development, each feature makes the next one harder (technical debt, edge cases, interdependencies). Compound engineering inverts this dynamic — **each unit of work should make the next ones easier**.

How? By creating a learning loop where every bug, failed test, or resolution insight is documented and reused by future agents and team members.

### The loop

The workflow has four phases:

1. **Plan** — Understand the requirement, research approaches, synthesize a detailed implementation plan
2. **Work** — Agents write code and tests according to the plan
3. **Review** — Human validation of the result
4. **Compound** — *(This is where everything happens)* — Document learnings, discovered patterns, mistakes to avoid repeating

It's the fourth step that sets compound engineering apart. Without it, you're just doing traditional AI-assisted development. With it, your knowledge base grows with every cycle.

The methodology allocates [80% of developer time to planning and review](https://reading.torqsoftware.com/notes/software/ai-ml/agentic-coding/2026-01-19-compound-engineering-claude-code/), leaving 20% for work and compounding. The developer becomes an orchestrator and quality arbiter.

### Battle-tested

What gives this approach credibility: Every runs five internal products, each built and maintained primarily by a single person, used by thousands of daily users. The [Claude Code plugin](https://github.com/every-engineering/compound-engineering) has surpassed 7,000 stars on GitHub.

### Strengths and limitations

**Strengths:**
- Directly addresses technical debt
- Knowledge accumulates in the repo (not just in someone's head)
- Well-suited to solo devs or small teams
- Natural compatibility with `CLAUDE.md`, `learnings/`, ADRs

**Limitations:**
- No formal upstream specification process
- Relies on developer discipline during the "Compound" phase
- Less suited to regulated environments requiring a formal audit trail

---

## 3. BMAD: simulating a full agile team

### The concept

[BMAD](https://docs.bmad-method.org/) (Breakthrough Method for Agile AI-Driven Development) pushes the cursor even further than SDD. Instead of structuring interaction with a single agent, BMAD orchestrates **12+ specialized agents** that simulate a full agile team: Analyst, Product Manager, Architect, Scrum Master, Developer, QA, UX Designer…

The founding concept is **Agent-as-Code**: each agent is defined in a versioned Markdown file, with its responsibilities, constraints, and expected outputs. Portable, reusable, diff-able in PRs.

### The workflow

The BMAD pipeline follows agile logic:

1. **Analyst** → Creates a project brief
2. **PM** → Produces a PRD (Product Requirements Document) based on the brief
3. **Architect** → Designs the architecture based on the PRD
4. **Scrum Master** → Generates detailed stories for development
5. **Developer** → Implements story by story
6. **QA** → Validates against acceptance criteria

Quality gates at each transition prevent issues from accumulating across sprints. Each agent produces a verifiable artifact — not just a chat response.

### Strengths and limitations

**Strengths:**
- Full SDLC coverage
- Exhaustive audit trail (every artifact is versioned)
- "Party Mode" enables multi-agent collaboration within a single session
- Extensible (Expansion Packs for game dev, DevOps, etc.)

**Limitations:**
- **Considerable overhead** — the multi-agent ceremony is heavy for a solo dev
- Better suited to complex greenfield or enterprise contexts
- Quality depends heavily on the underlying model (some LLMs struggle to [correctly parse structured Markdown files](https://medium.com/@visrow/what-is-bmad-method-a-simple-guide-to-the-future-of-ai-driven-development-412274f91419))
- **Same blind spot as SDD**: artifacts are specs, not learnings

---

## Summary comparison

| Criterion | SDD (OpenSpec) | Compound Engineering | BMAD |
|-----------|----------------|---------------------|------|
| **Problem solved** | Frame AI input | Capture learnings | Simulate an agile team |
| **Philosophy** | Contract / specification | Learning loop | Multi-agent orchestration |
| **Overhead** | Low to moderate | Low | High |
| **Solo dev friendly** | ✅ | ✅✅ | ⚠️ |
| **Enterprise ready** | ✅ | ✅ | ✅✅ |
| **Brownfield** | ✅✅ (OpenSpec) | ✅✅ | ⚠️ |
| **Greenfield** | ✅✅ (Spec Kit) | ✅ | ✅✅ |
| **Learning accumulation** | ❌ | ✅✅ | ❌ |
| **Audit trail** | ✅✅ | ✅ | ✅✅✅ |
| **Spec drift management** | ⚠️ Inherent | ✅ (learnings capture divergence) | ⚠️ Inherent |

---

## My thesis: these approaches combine

Here's the point I haven't seen addressed anywhere: **SDD and Compound Engineering don't solve the same problem**. One bets on input (framing what you ask the AI), the other on accumulation (capitalizing on what you learn while doing it). Treating them as alternatives misses the point entirely.

SDD alone doesn't address the accumulation problem — which, to my mind, was a concern long before AI, back when we were documenting Architecture Decision Records (ADRs), post-mortems, and runbooks.

Compound Engineering alone lacks the contractual rigor of SDD for projects that exceed a certain complexity threshold.

### A possible combined workflow

```
Spec (OpenSpec)          Compound (Every)
┌─────────────┐          ┌─────────────────┐
│ /opsx:propose │ ──────▶ │ Plan            │
│ proposal.md  │          │ (enriched by     │
│ specs/       │          │  learnings)      │
│ design.md    │          ├─────────────────┤
│ tasks.md     │          │ Work            │
└─────────────┘          │ (guided by       │
                         │  specs)          │
                         ├─────────────────┤
                         │ Review           │
                         ├─────────────────┤
                         │ Compound         │
                         │ → learnings.md   │
                         │ → CLAUDE.md      │
                         │ → patterns/      │
                         └────────┬────────┘
                                  │
                         ┌────────▼────────┐
                         │ /opsx:archive    │
                         │ specs → main     │
                         │ learnings        │
                         │ persistent       │
                         └─────────────────┘
```

The idea:
1. **Specify** with OpenSpec when the complexity warrants it (significant new feature, architectural change)
2. **Execute** within the compound loop (Plan → Work → Review → Compound)
3. **Capture** learnings in persistent files (`CLAUDE.md`, `learnings/`, ADRs) that future specs can reference
4. **Archive** the OpenSpec spec and learnings together

Learnings enrich future specs. Specs frame execution. The loop is virtuous.

---

## Practical decision tree

To choose your approach, start from your context:

**Working solo or in a pair on an existing product?**
→ Compound Engineering as the base philosophy, OpenSpec when a change justifies it.

**Starting a structured greenfield project?**
→ Spec Kit or OpenSpec for the initial phase, then transition to the compound loop once the foundation is in place.

**Operating in a regulated or enterprise environment with audit trail requirements?**
→ BMAD or Spec Kit for formal coverage, complemented by compound patterns for knowledge accumulation.

**Experimenting or prototyping quickly?**
→ Vibe coding is still relevant for the first 48 hours. Switch to compound engineering as soon as the prototype needs to evolve.

**Working with Claude Code?**
→ Compound engineering integrates naturally via `CLAUDE.md` and learnings files. OpenSpec works through its slash commands. The two coexist without friction.

---

## Conclusion

2025 was the year of vibe coding. 2026 is the year we add structure. But adding structure doesn't mean picking a side — SDD *or* compound engineering. These are two complementary answers to two distinct problems.

SDD answers: **"how do you make sure AI builds what you actually want?"**
Compound engineering answers: **"how do you make sure each work cycle enriches the next one?"**

The more interesting question might be this: are there solutions that natively combine both philosophies? I haven't found one yet. That might be a space worth inventing.

---

*This article is part of my ongoing thoughts on AI-augmented development. For a deeper dive into concrete tooling, see my [series on Claude Code](/en/claude-code-installation-first-steps/) and my article on [human-machine entropy](/en/entropy-human-machine/).*

### Sources and further reading

- [OpenSpec — Official documentation](https://openspec.pro/)
- [Spec Kit — GitHub Blog](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
- [Compound Engineering — Every.to](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents)
- [BMAD-METHOD — Documentation](https://docs.bmad-method.org/)
- [AI DevKit — Official site](https://ai-devkit.com/)
- [Spec-Driven Development — Wikipedia](https://en.wikipedia.org/wiki/Spec-driven_development)
- [From Vibe Coding to SDD — AI Monks (Medium)](https://medium.com/aimonks/from-vibe-coding-to-spec-driven-development-where-does-compound-engineering-actually-fit-fcb27dbd2bf1)
- [SDD: When Architecture Becomes Executable — InfoQ](https://www.infoq.com/articles/spec-driven-development/)
- [Spec-driven development — Thoughtworks](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices)
- [Complete Guide to Spec Coding — QubitTool](https://qubittool.com/blog/spec-coding-complete-guide)
