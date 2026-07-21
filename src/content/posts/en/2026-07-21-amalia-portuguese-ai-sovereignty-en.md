---
title: "Portugal Built Its Own AI. I Wanted to Know If It Really Spoke Portuguese to Me."
subtitle: "Amália: 9 billion parameters, €5.5 million, sixty researchers. A case study for understanding what 'AI sovereignty' means once you drop the speeches and look at the actual model."
description: "Amália, the first large language model for European Portuguese, launched 1 July 2026. What's inside, what it's worth, and why it matters for all of Europe."
date: 2026-07-21T12:00:00.000Z
lang: en
translationKey: "amalia-portuguese-ai"
slug: "amalia-portuguese-ai-sovereignty-en"
tags:
  - "IA"
  - "Tech"
  - "Personal"
author: "Angelo Lima"
thumbnail: "/assets/img/amalia-ia-portugal.png"
shareImg: "/assets/img/amalia-ia-portugal.png"
aliases:
  - "/en/2026-07-21-amalia-portuguese-ai-sovereignty-en/"
faq:
  - q: "What is Amália?"
    a: "Amália is the first large language model (LLM) built for European Portuguese, unveiled on 1 July 2026 in Lisbon. It's an open-source, 9-billion-parameter foundation model derived from the European model EuroLLM, not a consumer app like ChatGPT."
  - q: "Is Amália free and open source?"
    a: "Yes. Amália is released under the Apache 2.0 license: anyone can download, modify and use it, including commercially, without asking permission. Its weights are available on Hugging Face."
  - q: "Is Amália a ChatGPT competitor?"
    a: "No. Amália is a foundation model (an 'engine'), not a conversational application. It's a building block that companies, public agencies or universities can use to build their own tools, whereas ChatGPT is a finished consumer product."
  - q: "Can you run Amália on your own computer?"
    a: "Yes. Compressed versions exist for Ollama and LM Studio. The Mac-optimized version runs at around 55 tokens per second in 6 GB of memory, which fits on an entry-level MacBook."
  - q: "Does Amália speak European or Brazilian Portuguese?"
    a: "Amália is specifically built for European Portuguese, whereas most international models answer in Brazilian Portuguese. The team even created a dedicated test to measure the model's tendency to drift toward Brazilian."
---
There's something people who grew up between two languages know well: the moment a tool makes you feel that one of the two counts for less than the other. The spell-checker that underlines your last name in red. The form that rejects accents. And, for the past three years, the chatbot you speak to in Portuguese that answers you in flawless Portuguese… from Brazil.

It's not a big deal. It's never a big deal. It's just a small reminder, repeated a thousand times, that your grandparents' language is treated as a variant of something else.

So when Portugal unveiled **Amália** on 1 July 2026 in Lisbon, its first large AI model, named after the fado singer Amália Rodrigues, I wanted to look under the hood. Not to applaud, not to tear it down. To understand what's actually inside, and what it says about the rest of Europe.

> **In brief**
>
> - **What:** Amália, the first large language model (LLM) for European Portuguese, unveiled on 1 July 2026 in Lisbon.
> - **Size & license:** 9 billion parameters, open Apache 2.0 license, weights on Hugging Face.
> - **What it actually is:** a foundation model (an "engine"), not a Portuguese ChatGPT. Derived from the European model EuroLLM.
> - **How good it is:** beats comparable models on most Portuguese benchmarks, but trails Qwen 3-8B on the toughest test.
> - **Why it matters:** a precedent for linguistic sovereignty for Europe's under-resourced languages, at €5.5 million and sixty researchers.

## First, what are we talking about

A quick vocabulary detour, because that's where all the confusion comes from.

When you use ChatGPT, you're using two things stacked together. At the bottom sits the **model**: a huge file of computations that, given some text, predicts what comes next. On top sits the **application**: the interface, the conversation memory, the guardrails, the share button. ChatGPT is the application; GPT is the model.

**Amália is only the bottom layer.** A foundation model, as the term goes. A building block that companies, public agencies or universities can download for free to build their own tools on top of. It's not a competitor to ChatGPT. It's not a website where you'll go to ask questions. It's the engine, not the car.

This distinction sounds trivial. It isn't: it's exactly what explains why so many people will find Amália disappointing. They were sold "the Portuguese AI," they understood "the Portuguese ChatGPT," and they're going to download an engine.

The people behind the project are clear on this. Paulo Dimas, of the Center for Responsible AI, said it the day before the launch: this isn't a conversational system that solves every problem, but a piece of artificial intelligence that guarantees three sovereignties (language, culture, data) that anyone can download and integrate.

## What's in the box

The numbers, quickly, in plain English.

**9 billion parameters.** That's the size of the model. For comparison, the American giants' models run into the hundreds of billions. Amália plays in the "small model" category, and that's deliberate: a model this size runs on an ordinary machine.

**€5.5 million**, funded by the European recovery plan, plus a further €1.5 million planned through 2027. That's a lot for a university research project. It's negligible on the scale of the industry: the big American labs spend that sum in a few hours of compute.

**Sixty researchers**, gathered in a consortium around NOVA, IST, the Institute of Telecommunications and the FCT, with collaborations in Beira Interior, Évora and ISEL.

**Apache 2.0 license**, meaning: anyone can download it, modify it, sell it. No permission to ask for. The weights are on Hugging Face, the platform where open models are shared.

And one technical detail that matters more than all the others: **Amália wasn't built from scratch.** It's the continuation of an existing European model, EuroLLM, which the team took and pushed toward European Portuguese. You don't start from a blank page. You take an already-trained model and keep teaching it with targeted data.

That's a perfectly reasonable decision: with €5.5 million, you don't build a model from scratch, you don't come anywhere near the cost. But it's a decision worth naming for what it is, rather than letting people say "Portugal developed its own artificial intelligence."

## The 5.5% question

Here's the number that made me pause, and it comes from a Portuguese developer, Duarte O.Carmo, who ran the math before anyone else.

To specialize the model, the team fed it 107 billion additional tokens. Within that, the only portion clearly identified as European Portuguese, the Arquivo.pt web archives, accounts for 5.8 billion.

**Roughly 5.5%.**

In the next phase, instruction tuning, the proportion rises to 17–18%. And there was already Portuguese in the base model, without anyone knowing exactly how much, or whether it was European or Brazilian.

Hence the question, which I'll ask without a clear-cut answer: at what dose does a model actually become Portuguese? Is 5.5% enough to override the reflexes of a model fed mostly on English?

The results say it helps a lot. Amália beats international models of comparable size, like Qwen 3-8B, on most Portuguese benchmarks. That's a real win, and it deserves recognition. But on the toughest test, the one the team designed itself and named ALBA, **Qwen 3-8B keeps the edge.** A general-purpose Chinese model, with no Portuguese-specific training whatsoever.

That result is the most interesting thing in the whole report, because it raises the awkward question: does a small, heavily localized model serve you better than a well-built general-purpose one? It depends on the use case. But nobody puts it that bluntly in the press releases.

## What we forgot to measure

The team created four new evaluation tests specific to European Portuguese. Grammar, syntax, general knowledge, and (nice touch) the model's tendency to drift toward Brazilian Portuguese. This is serious work, and it may be what the project leaves behind that lasts longest: models age in two years, measurement instruments stick around.

But something is missing, and it's exactly what interested me in the first place. These tests measure whether the model **speaks** Portuguese well. They don't measure whether it **knows** Portugal.

What the typical dessert of Aveiro is. Who ran the country between 1978 and 1985. How a junta de freguesia works. What *desenrascanço* means, and why it doesn't translate.

Yet that's the whole promise of a sovereign model: a small model that knows more about its country than an American giant that knows a little about everything. And that's precisely the dimension that goes unevaluated. A measurement blind spot, not a design one. And I notice that the `PT-Culture_Data` dataset keeps moving on the Hub, which suggests the team is fully aware of it.

## Portugal isn't alone

What makes Amália interesting is that it isn't an exception. All of Europe has gotten into this, at three levels.

**The European projects.** EuroLLM, the model Amália derives from, now exists in a 22-billion-parameter version, the largest open model developed entirely in Europe, covering the Union's 24 official languages. The European Commission, for its part, is quietly building its own in-house model based on Mistral, enriched with its enormous translation archives, with a goal of linguistic equality: at least one billion tokens for every under-resourced language.

**The national models.** This is Amália's family. Switzerland has **Apertus** (8 and 70 billion parameters, remarkable on Swiss German and Romansh), Italy has **Minerva**, Slovenia **GaMS**, the Netherlands **GPT-NL**, Germany **PhariaAI**.

**The private sector.** [Mistral](/en/arthur-mensch-mistral-ai-national-assembly-hearing-en/), the only European truly playing in the big leagues.

These three families aren't aiming at the same thing, and that's where the misunderstandings come from. Mistral aims for market performance. EuroLLM aims for shared infrastructure. Amália aims for the cultural survival of a language of ten million speakers in a digital world that, left to itself, doesn't see it.

Comparing Amália to GPT-5 is comparing a village school to a university. It's not the same function.

## Why it moves me, and why it should speak to you too

I'll be blunt here, because this is where my interest in the subject comes from.

Growing up between France and Portugal gives you a very concrete intuition of what people mean when they say "cultural sovereignty." It's not a seminar concept. It's a cousin who doesn't understand half of what you say to him. It's a language you speak a little less well every year. It's a heritage that exists mostly orally, that nobody has digitized, because there was never a commercial reason to.

An AI model is never neutral. It learns from what exists in quantity, online, in an exploitable format. In other words: it learns from English, and a bit from the major languages lucky enough to have had a digital industry. Everything else becomes a variant, an exception, a special case. European Portuguese is treated as a dialect of Brazilian for an entirely mechanical reason: there are twenty times more Brazilians.

This is exactly the problem that Basque, Breton, Catalan, Welsh, Slovenian and Romansh are going to run into, only worse. Amália is a useful precedent: it shows that with €5.5 million and sixty researchers, you can bring a language back up to first class. Not perfectly. But enough that it's no longer a foregone conclusion.

And to be honest all the way through: I ran the model. It speaks European Portuguese, the real thing, with the right turns of phrase. On what it *knows* about the country, it remains a 9-billion-parameter model with knowledge frozen at June 2024. That's not a disappointment. It's simply an engine, and the next step is to build the car around it.

## Concretely, today

Three things to take away for anyone building tools.

**It runs on your machine.** Compressed versions exist for consumer tools (Ollama, LM Studio). The Mac-optimized version runs at around 55 tokens per second in 6 GB of memory: that fits on an entry-level MacBook. We're a long way from the demo model that needs a server room.

**It changes the risk calculation.** Since June 2026, nobody needs to be told why depending entirely on a foreign interface is an operational risk rather than an ideological stance. A free model hosted at home doesn't replace everything. But for sorting, extracting, rephrasing, anonymizing, classifying (the vast majority of real enterprise use cases), it's more than enough.

**It asks the right question.** Not "which is the best model," but "which tasks genuinely deserve a cutting-edge model." Running a small local model for volume alongside a large remote model for the complex cases is trivial to set up today. That's probably how sovereignty will actually enter production: not by decree, but by dividing up the work.

## What I take away

Amália is solid work, and that has to be said before criticizing it: sixty researchers, a public technical report, original benchmarks, genuinely open weights, a version capable of reading images. Plenty of government AI announcements have delivered strictly less.

My reservations lie elsewhere. There's a **gap between the pitch and the object**: they announce a national AI, they ship a specialization of a European model with 5.5% targeted data. Both are defensible; only one is honest. There's an **incomplete evaluation**, which doesn't yet measure the very thing that justifies the project. And there's a question nobody is asking: what about 2028?

A model isn't a bridge. You don't inaugurate it once for thirty years. It's an asset that goes out of date in two years. €1.5 million through 2027, and then what? Sovereignty through the model has an expiration date. Sovereignty through **data, evaluations and skills** lasts. And that's ironically what the Amália project produced that's most solid, without it being the stated goal.

Europe won't win the race for the most powerful model. That's fine, as long as we stop pretending that's the goal. What it can win is the right to run its public services in its own language without depending on a decision made elsewhere.

Amália is a step in that direction. A 9-billion-parameter step, with a fado singer's name. For a project whose whole point is not to lose its voice, the choice is rather well made.

## Further reading

- **The technical report**: [arXiv 2603.26511](https://arxiv.org/html/2603.26511) — technical, but readable.
- **The models to download**: [huggingface.co/amalia-llm](https://huggingface.co/amalia-llm).
- **Duarte O.Carmo's critical analysis**: [AMÁLIA and the future of European Portuguese LLMs](https://duarteocarmo.com/blog/amalia-and-the-future-of-european-portuguese-llms), where the 5.5% figure comes from.
- **The official site**: [amaliallm.pt](https://amaliallm.pt/).
- **Sovereignty seen from France**: [what Arthur Mensch told the National Assembly](/en/arthur-mensch-mistral-ai-national-assembly-hearing-en/).
- **Running a model at home**: [Ollama in 2026](/en/ollama-2026-state-of-the-art-en/).
- **The real cost of large models**: [the ecological impact of AI, training versus inference](/en/ai-ecological-impact-training-vs-inference-environmental-costs/).

---

*Amália was unveiled on 1 July 2026 in Lisbon. A 9-billion-parameter model, Apache 2.0 license, derived from EuroLLM. Article written on 21 July 2026.*
