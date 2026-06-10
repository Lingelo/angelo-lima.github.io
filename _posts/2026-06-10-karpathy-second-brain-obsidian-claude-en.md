---
layout: post
title: "Karpathy's Second Brain: A Wiki the AI Writes For You"
subtitle: "How to turn Obsidian + Claude into a knowledge base that compiles, links and fixes itself — no RAG, no vector database"
description: "Andrej Karpathy's LLM wiki concept, explained and put into practice with Obsidian and Claude Code. Compilation over summarization, zero RAG, and how to implement it yourself with three folders and four commands."
thumbnail-img: "/assets/img/second-cerveau-obsidian.webp"
share-img: "/assets/img/second-cerveau-obsidian.webp"
tags: [IA, Claude Code, Development]
author: "Angelo Lima"
lang: en
ref: second-brain-karpathy
categories: en
---

We all run a degraded version of the same dream: one single place that would hold everything we've ever read, watched, or learned. A backup brain. In practice, we pile up abandoned Notion pages, bookmarks we never reopen, highlighted PDFs rotting in a `Downloads` folder. The problem was never **collecting** information. It's **organizing** it — and that's exactly where human effort collapses.

In early 2026, Andrej Karpathy — OpenAI co-founder, former Tesla AI director — shared a deceptively simple idea on X to solve this: what if we stopped writing the knowledge base ourselves, and handed it **entirely** to an LLM?

He calls it the **LLM wiki**, or *second brain*. This article breaks the concept down, explains why it buries RAG for personal use, and shows how to implement it with Obsidian and Claude Code.

---

## Karpathy's idea: compile, don't summarize

The sentence that captures it all is his own:

> *"You rarely ever write or edit the wiki manually, it's the domain of the LLM."*

The reversal is total. In the classic "second brain" vision — the one popularized by Tiago Forte and his [PARA](https://fortelabs.com/blog/para/) method — **you** take the notes, file them, link them. The AI only steps in at the end, to answer questions about a corpus you patiently built.

Karpathy flips the chain. You now do exactly one thing: **collect raw material**. Articles, research papers, reading notes, podcast transcripts, snippets of conversation — anything that crosses your path. You dump it in a folder, and tell the LLM: *"compile."*

### Compilation ≠ summarization

This is the central distinction, and it's more subtle than it sounds.

A **summary** compresses: it throws away detail to produce a shorter version. You lose information on every pass.

A **compilation**, in Karpathy's sense, *restructures* without impoverishing. The LLM reads each source, extracts the concepts, the people, the key ideas, then rewrites them into a consistent format — encyclopedia-style articles, linked by backlinks, deduplicated, and stripped of contradictions between sources. The detail is preserved; it's the **form** that becomes coherent.

The compiler metaphor is deliberate. Just as a compiler turns heterogeneous source code into a structured, executable binary, the LLM turns a mess of sources into a navigable ontology.

### What it looks like at scale

Karpathy reports a number that commands respect: on a single one of his research topics, his wiki had reached **~100 articles and 400,000 words** — longer than most PhD dissertations — **without him writing a single line directly**. The LLM does the writing, the linking, the categorizing, and the consistency checking. The human only feeds and queries.

His own conclusion, dropped on X: *"I think there is room here for an incredible new product."*

What he doesn't say explicitly, but what follows directly from the reasoning: if the compiled wiki is a clean, readable artifact, why would you need retrieval infrastructure to query it? That question leads straight to the uncomfortable comparison.

---

## Why it buries RAG (for personal use)

Here's the part that makes anyone who's ever hacked together a document assistant raise an eyebrow. For three years, the default answer to "I want to query my documents" has been **RAG** (*Retrieval-Augmented Generation*): chunk the documents, turn them into vectors, store them in a vector database, and on every question retrieve the closest passages to inject into context.

Karpathy proposes to **throw all of it out**. No vector database. No embedding pipeline. No retrieval infrastructure. Just markdown files, an LLM with a large context window, and that's it.

The argument holds up once you lay it flat:

| | Classic RAG | LLM wiki (Karpathy) |
|---|---|---|
| **Stored data** | Raw chunks + metadata + vectors | Condensed, rewritten markdown |
| **When the work is done** | On **every** query (vector search) | **Once**, at compile time |
| **Dedup / contradictions** | Never resolved, re-injected each time | Resolved when the wiki is written |
| **Infrastructure** | Vector DB, embeddings, retriever | A folder of `.md` files |
| **Human-readable** | No (opaque vectors) | Yes (it's just text) |
| **State between sessions** | Stateless | Persistent and versionable (git) |

The deep intuition: RAG does the **same sorting work on every question**, over raw data that's never cleaned. The LLM wiki does that work **once**, at compile time, and produces a clean, condensed artifact that fits inside the context window of modern long-context models. For a personal-scale knowledge base — a few hundred articles — RAG becomes an over-engineered machine you simply no longer need.

> ⚠️ **Important caveat**: this reasoning holds for *personal* use. At enterprise scale — millions of documents, granular access control, real-time freshness constraints — RAG keeps all its relevance. The LLM wiki isn't a religion; it's the right tool for the right scale.

The concept is clear. What remains is the question that always follows: if it's this simple, why hasn't anyone packaged it properly? Karpathy himself runs on homemade scripts. Here's how to replace those scripts with something more solid.

---

## From idea to system: Obsidian + Claude Code

Karpathy's idea is a *pattern*, not a product. He admits to running *"hacky Python scripts"* to orchestrate the LLM, plus Obsidian as a visualization layer. The good news: with Claude Code, no scripts needed. Custom slash commands handle all the orchestration from the terminal, directly inside the wiki folder.

### The three-layer architecture

The whole system rests on a clean split between raw material, compiled knowledge, and the rules of the game:

```
my-second-brain/
├── raw/              ← you drop your raw sources here
├── wiki/             ← the LLM writes compiled articles here
│   └── index.md      ← auto-generated table of contents
├── log.md            ← operation history
├── CLAUDE.md         ← the "schema": brain organization rules
└── .claude/
    └── commands/     ← the custom slash commands
        ├── ingest.md
        ├── lint.md
        ├── query.md
        └── save.md
```

- The **`raw/`** folder is your drop box. You throw everything in, no organization.
- The **`wiki/`** folder is the LLM's output: encyclopedia-style articles linked together, plus an `index.md` that summarizes the whole thing at a glance.
- The **`CLAUDE.md`** file acts as the schema. It describes how the brain should be structured — naming conventions, page format, linking rules. It's the contract the agent follows.
- **Obsidian** plugs in on top of the `wiki/` folder: it turns markdown backlinks into a visually navigable knowledge graph.

### The initialization prompt: `CLAUDE.md`

This is the most important file. It defines the rules the agent follows on every operation — without it, the brain has no shape.

```markdown
# My Second Brain

## Role
You are the agent responsible for building and maintaining this personal wiki.
You read raw sources and compile them into structured articles.
You do not invent: everything you write must be traceable to a source.

## Folder structure
- `raw/` : raw sources to ingest (never modify them)
- `wiki/` : articles you write and maintain
- `wiki/index.md` : table of contents for the whole wiki (always up to date)
- `log.md` : dated history of all your operations

## Wiki article format
Each article in `wiki/` must:
- Start with an H1 title and a definition paragraph (2-3 sentences max)
- Use backlinks [[PageName]] to link related concepts
- List its sources at the bottom (title, author, date if available)
- Be encyclopedic: preserve detail, restructure the form

## Writing rules
- Compile, don't summarize: rewrite for coherence, not to shorten
- Resolve contradictions between sources explicitly in the text
- Create a dedicated page for every significant concept, person or tool
- Keep `index.md` up to date after every ingestion
- Log every operation in `log.md` with the date and a short summary
```

### The four commands: full content

Claude Code slash commands are simple markdown files in `.claude/commands/`. Their content becomes the prompt executed when you type the command.

**`.claude/commands/ingest.md`** — compilation:

```markdown
Read all files in the `raw/` folder (ignore `raw/processed/`).

For each source:
1. Identify the key concepts, people, tools and ideas
2. For each significant element: create or enrich the corresponding page in `wiki/`
3. Weave [[PageName]] backlinks between related pages
4. If two sources contradict each other, note the contradiction in the relevant article
5. Move processed files to `raw/processed/`

Once all sources are processed:
- Update `wiki/index.md` with new and modified pages
- Add an entry to `log.md`: date, number of files ingested, pages created/modified
```

**`.claude/commands/lint.md`** — health check:

```markdown
Review the entire `wiki/` folder and produce a structured report.

Check for:
1. **Contradictions**: passages that conflict between two different articles
2. **Orphan pages**: articles with no incoming backlinks from any other page
3. **Broken links**: [[PageName]] backlinks pointing to a non-existent page
4. **Stale index**: entries in `index.md` that are missing or point to deleted pages
5. **Concepts without pages**: recurring terms across multiple articles that deserve their own page

For each problem: indicate the file, describe the issue, propose a fix.
Ask for confirmation before applying any corrections.
```

**`.claude/commands/query.md`** — querying:

```markdown
$ARGUMENTS

Answer the question above using the content of the `wiki/` folder.
Cite source pages in parentheses for each piece of information.
If the answer is not in the wiki, say so clearly — do not fill in from your general
knowledge without explicitly flagging it.
```

**`.claude/commands/save.md`** — capitalizing:

```markdown
$ARGUMENTS

Turn the content above into a new wiki page:
1. Determine a short, precise title
2. Write the page in encyclopedic format (H1, summary, sections, [[]] backlinks)
3. Create the file in `wiki/` with backlinks to relevant existing pages
4. Update `wiki/index.md`
5. Add an entry to `log.md`
```

The `$ARGUMENTS` in `query.md` and `save.md` is Claude Code's syntax for capturing what you type after the command. `/query why doesn't RAG scale for personal use?` injects the question into the prompt.

This `/ingest` / `/lint` split is deliberate: ingestion grows the brain, linting keeps it healthy. The two run independently. Karpathy himself insists on this periodic validation pass as a *"health check"* — without it, a growing wiki eventually accumulates silent inconsistencies.

The mechanics are clear. What's harder to see in the command files is how this system fits into a real work rhythm — and what it actually changes about your relationship to information.

---

## The real rhythm: a week with this system

The genuine difference from any other note-taking tool is that **you stop thinking about organization in real time**. The mental effort of "where do I file this?" disappears entirely. That's not a small thing — it's precisely that effort that makes us abandon every note system after three weeks.

In practice, the rhythm settles naturally into two modes.

**Continuously**: you collect without filtering. An interesting article → copied to `raw/`. A conference transcript → dropped in `raw/`. Notes scribbled after a meeting → in `raw/`. The folder is a sandbox, not a library. Nothing needs to be clean to land there.

**In batches**: once a week (or when `raw/` starts to pile up), you run `/ingest`. What used to take an hour of manual filing — reading, categorizing, linking, deduplicating — happens without you. You review the output, fix what looks off, and you're done. `/lint` runs alongside when the wiki has grown: it hands you a report of inconsistencies, you arbitrate in five minutes.

What changes over time: after a few months, you have a dense corpus that answers your questions using your own sources. `/query` doesn't search vectors — it reasons over text that *you* collected, compiled into *your* ontology. The difference from a generic ChatGPT is real and tangible.

The whole thing is git-versionable. Your second brain becomes a repository: auditable, diffable, restorable. A far cry from the black hole that a Notion workspace becomes.

---

## Strengths, limits and blind spot

Let's be clear-eyed — no approach is magic.

**What's genuinely strong:**
- **Organizing effort drops to zero.** That's *the* point. The historical drag on every note-taking system — filing — disappears.
- **Open format, zero lock-in.** Markdown, folders, git. No SaaS that shuts down with your data inside.
- **Readable and auditable.** Unlike a vector database, you can *read* your brain. You see what the LLM wrote, and fix it if needed.
- **Compute cost is paid once**, at compile time, not on every query.

**The limits, which you have to face head-on:**
- **You delegate the writing to an LLM.** Where there's an LLM, there's a risk of hallucination or clumsy rephrasing. The `/lint` pass helps, but it doesn't replace a critical read. (I covered this in more depth in my article on [LLM hallucinations](/en/llm-hallucinations-devoxx-2026-en/).)
- **It holds up thanks to the context window.** The elegant "the whole wiki fits in context" model erodes once the brain exceeds a certain size. At very large scale, you drift back toward retrieval strategies — and RAG makes sense again.
- **Discipline is still required.** Not for organizing, but for *feeding* regularly and *linting*. A brain you stop feeding stays a dead brain.
- **The enterprise reality check.** Access control, compliance, real-time freshness, massive volume: at that level, the LLM wiki alone isn't enough. It's a tool for personal and small-team use, not an enterprise knowledge management platform.

These limits don't sink the concept — they define its scope. And once that scope is accepted, what interests me more than the tool itself is what this pattern reveals about how we work with AI.

---

## What this reveals about augmented work

What strikes me is that this pattern isn't isolated. It's the same idea I was digging into in my article on [AI work philosophies](/en/sdd-compound-engineering-bmad-philosophies-en/): **capitalizing on accumulation**.

*Compound engineering* says each development cycle should enrich the next, through a documented learning loop. Karpathy's LLM wiki says exactly the same thing, but for personal knowledge: every ingested source, every saved answer makes the brain denser, and therefore the next query richer. It's a virtuous loop where the AI doesn't just *consume* your knowledge — it *builds* it.

There's also an echo of the [entropy](/en/entropy-human-machine/) I wrote about elsewhere. A note-taking system left to itself drifts toward disorder — that's the natural slope. What the LLM wiki brings is a *delegated* expenditure of energy: it's the LLM that fights the entropy of your information, that files, deduplicates, links. You no longer pay the cost of order. You outsource it.

Karpathy may be right: *there is room for an incredible new product*. But until that product arrives, the Obsidian + Claude Code combo lets you touch the idea right now, with three folders and four commands.

---

## Getting started

If you want to try it:

1. Create the `raw/` + `wiki/` + `CLAUDE.md` structure in a new folder.
2. Install [Claude Code](/en/claude-code-installation-first-steps/) if you haven't already.
3. Open the `wiki/` folder as a vault in [Obsidian](https://obsidian.md/).
4. Drop a few sources into `raw/`, run `/ingest`, and watch your brain write itself.

The hard part won't be technical. It'll be resisting the urge to reorganize everything by hand. That's precisely what Karpathy is asking you to stop doing.

---

*This article extends my reflections on AI-augmented work. See also my [Claude Code series](/en/claude-code-installation-first-steps/) and my article on [human–machine entropy](/en/entropy-human-machine/).*

### Sources and further reading

- [Karpathy's Instructions for Building an AI-Driven Second Brain — Techstrong.ai](https://techstrong.ai/features/karpathys-instructions-for-building-an-ai-driven-second-brain/)
- [Karpathy shares 'LLM Knowledge Base' architecture that bypasses RAG — VentureBeat](https://venturebeat.com/data/karpathy-shares-llm-knowledge-base-architecture-that-bypasses-rag-with-an)
- [What Is Andrej Karpathy's LLM Wiki? — MindStudio](https://www.mindstudio.ai/blog/andrej-karpathy-llm-wiki-knowledge-base-claude-code)
- [How I Took Karpathy's LLM Wiki and Built an AI-Powered Second Brain in Obsidian — AI Maker](https://aimaker.substack.com/p/llm-wiki-obsidian-knowledge-base-andrej-karphaty)
- [Building a Second Brain — Tiago Forte (PARA method)](https://fortelabs.com/blog/para/)
