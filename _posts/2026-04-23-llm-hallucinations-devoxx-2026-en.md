---
layout: post
title: "Understanding, measuring and controlling LLM hallucinations"
subtitle: "Notes from Aygalic Jara's talk at Devoxx France 2026"
description: "A write-up of Aygalic Jara's talk (SCIAM / LISN) at Devoxx France 2026: why LLMs hallucinate, how to measure it, and practical strategies to keep it under control in production."
thumbnail-img: "/assets/img/bon-llm.webp"
cover-img: "/assets/img/bon-llm.webp"
tags: [IA, Development, Tech]
author: "Angelo Lima"
lang: en
ref: llm-hallucinations-devoxx-2026
categories: en
---

Thursday 23 April 2026, 3:40 PM, Palais des Congrès. **Aygalic Jara**, consultant and PhD candidate at SCIAM under a CIFRE agreement with LISN (Laboratoire Interdisciplinaire des Sciences du Numérique), gave a talk whose title summed up the whole programme: *"LLMs and hallucinations: understanding, measuring, controlling"*. Room packed, topic hot. It sits at the core of his PhD work, of which a first state-of-the-art paper was published in 2025 at the JEP-TALN-RECITAL conference under the title *"State of the art: evaluation, detection and mitigation of LLM hallucinations"*.

LLM hallucinations are not a one-off bug that an update could patch away. They are a structural consequence of how these models actually work. That was Aygalic's thesis, and it is the thread I pick up here by mixing parts of his presentation, a few academic references implicitly mobilised during the talk, and the current landscape of French research on the topic.

## Two families of hallucinations

A useful first reflex: distinguish two broad types of hallucinations, which neither share the same causes nor the same remedies.

- **Factuality hallucinations**: the model states information that is simply wrong (a date, a name, a made-up citation, a case law that does not exist).
- **Predictability (or faithfulness) hallucinations**: the model produces an output that is inconsistent with the context, the instructions, or the sources provided — even if it could be factually correct elsewhere.

The distinction is not only academic. It shapes the defence strategy: you don't protect a legal RAG system against a wild date the same way you protect it against a reply that drifts from the contract it was asked to read.

## Where hallucinations come from

Two big sources, well documented by recent literature ([Huang et al. 2023](https://arxiv.org/abs/2311.05232), among others):

**From data.** The model is trained on a corpus frozen in time — its *cut-off date*. As soon as the world moves (regulation, position, product, executive), the model stays put. The older or sparser the data, the more likely the fabrications.

**From the next-token prediction mechanism.** An LLM doesn't *know* anything in the strict sense. It optimises a conditional probability, one token at a time. And this mechanism is made worse by a bias we often underestimate: **sycophancy**. Post-training (RLHF and relatives) teaches the model to be helpful, to produce an answer. Faced with a question it doesn't know the answer to, it would rather invent than disappoint.

That's the point I kept thinking about: a significant share of hallucinations comes literally from the fact that we taught the model to *want to help*. Sycophancy is a property we explicitly want at RLHF time, and its side effects are precisely the hallucinations we'd like to remove afterwards.

## Fundamental limits to accept

No LLM can remember everything. As you feed it more, it has to compress, forget, prioritise. That mechanically produces factuality errors on niche topics, recent events, or fine-grained data.

The first reflex, and the right one, is to **provide the required context at query time** rather than expect the model to carry it in its weights. That's the heart of *context engineering*, and it's the principle behind RAG and all its variants (agentic RAG, Self-RAG, etc.). But nothing is free: building a RAG pipeline is expensive, and a growing context mechanically degrades performance just by its size.

The second avenue is teaching the model to **say "I don't know"**. That's the idea behind *R-tuning*: build fine-tuning datasets where the right answer is abstention. The problem is that, pushed too far, the model can end up refusing to answer anything. Like every technical trade-off, you have to find the sweet spot, and it depends on the use case.

## The pyramid of hallucination robustness

Aygalic proposed a reading grid in five levels, each covering a family of defences. The lower levels are the most fundamental. The upper ones kick in when the previous ones weren't enough.

**1. Training techniques.** Corpus quality, RLHF, fine-tuning, R-tuning, distillation. This is the foundation everything else rests on.

**2. Context Engineering.** Prompt engineering, context optimisation, RAG and variants. You hand the model the material it needs to answer correctly.

**3. Post-Gen quality control.** Once the answer is generated, you validate it: external fact-checking, source attribution, self-verification, consistency checks. This is where guardrails and *groundedness* scores come in.

**4. Agentic orchestration.** You move past the single call to the model: function & tool calling, agentic RAG, multi-agent architectures, reflection agents. You split the work across several calls that check each other.

**5. Interpretability.** The top of the pyramid, and the most technical level. It splits in two:
- In the **grey box**, you do uncertainty quantification.
- In the **white box**, you do *probing* and attribution scoring.

*Probing* deserves a closer look. The idea, popularised notably by [Azaria & Mitchell (2023)](https://arxiv.org/abs/2304.13734) ("The Internal State of an LLM Knows When It's Lying"), is to exploit the fact that an LLM often "knows" when it's making things up: the information is present in its internal activations, but not in the generated output. You extract the transformer's internal vectors between two layers and train a small logistic regression on top to predict, token by token, the probability of hallucination. On open models, you can go further: turn a neuron off to establish causation, identify problematic attention circuits, and so on. That's the main advantage of open-weight models over closed ones, and it's exactly the playground of current fundamental research.

## Building your AI system: three axes

Beyond the pyramid, Aygalic proposed an operational framework in three axes, which also maps onto the structure of his state-of-the-art paper (evaluation / detection / mitigation):

- **Prevention**: how do you *limit* hallucinations upstream?
- **Detection**: how do you *spot* the ones that slip through?
- **Residual handling**: what do you do with hallucinations you couldn't prevent? Automatic handling? Smart escalation to a human?

None of these three columns is optional. A strategy that only tackles prevention stays blind to its own blind spots. A strategy that relies only on detection lets too many cases through in production.

### An example RAG stack for factual prevention

Aygalic presented a representative stack for an enterprise RAG pipeline:
- **LlamaIndex** for document indexing
- **Qdrant** as the vector database
- **Cohere** for embeddings
- An LLM at the end of the chain for generation

Nothing revolutionary, but it is now a standardised base that avoids nasty surprises. Alternative on the *groundedness* verification side: **Guardrails AI** for a rule- and safety-oriented approach, and **ragas** for a quantitative *groundedness* score you can track over time.

### Residual handling: smart escalation

When everything else has failed (question too complex, forbidden, or a user explicitly asking for a human), you need to decide automatically when an operator should take over. It's a layer that's often neglected, even though it shapes how the whole system is perceived. In law, for example, that's exactly what **HalluGraph** does, the tool built by Valentin Noël and the Devoteam team ([awarded at AAAI 2026](https://www.devoteam.com/fr/news-and-pr/ia-droit-valentin-noel-et-lequipe-devoteam-primes-a-la-conference-aaai-2026-a-singapour-pour-leur-lutte-contre-les-hallucinations-des-llm/)): if the AI fails the knowledge graph consistency test, the system blocks the answer and requires human intervention.

## Evaluate continuously, or don't evaluate at all

An AI system that isn't evaluated continuously degrades silently. Aygalic distinguished several planes.

**Factuality.** A series of benchmarks of increasing difficulty, usable as a thermometer from one generation to the next. The timeline speaks for itself:

| Benchmark | Year |
|---|---|
| TriviaQA | July 2017 |
| Natural Questions | June 2019 |
| MMLU | September 2020 |
| FreshQA | October 2023 |
| GPQA | November 2023 |
| MMLU Pro | June 2024 |
| Humanity's Last Exam | January 2025 |

Each benchmark is harder than the previous one. The progression says a lot about the difficulty race that structures research: as soon as a benchmark is *saturated* by frontier models, the community builds a more demanding one.

**Faithfulness.**
- *IFEval* for faithfulness to instructions and context ("write a summary in 25 sentences and 2 paragraphs").
- *Comprehensive RAG Benchmark (CRAG)* to measure the model's ability to rely on sources and say "I don't know" when the information isn't there.
- *Berkeley Function-Calling Leaderboard* for tool calling and parameter validation.

**Practical use cases.**
- *τ-Bench* for business tasks (banking, telecom, retail, airline) with long context, databases and APIs.
- *GDPval* ([OpenAI, September 2025](https://openai.com/index/gdpval/)) for 44 high-value jobs (law, finance, engineering, healthcare…). A benchmark oriented towards reasoning and real deliverables (documents, slides, spreadsheets). A notable paper from late 2025 showed that some frontier models (Claude Opus 4.1, GPT-5) are approaching parity with human experts on GDPval tasks. A strong signal for where the market is heading.

**Sub-systems.**
- *HalluEval 2.0* for hallucination detection specifically.
- *IFEval*, *Berkeley Function Calling Leaderboard*, *FollowBench* for instruction following.
- *XSTest* (Exaggerated Safety) and *JailbreakBench* / *HarmBench* for guardrail robustness.

**Resources to watch.**
- [artificialanalysis.ai](https://artificialanalysis.ai)
- [arena.ai/leaderboard](https://arena.ai/leaderboard)
- [llm-stats.com](https://llm-stats.com)

As a complement, the French benchmark **Phare** (Potential Harm Assessment & Risk Evaluation), developed by [Giskard in partnership with Google DeepMind](https://www.silicon.fr/data-ia-1372/llm-francais-biais-hallucinations-226679), evaluates LLM robustness to hallucinations, biases and jailbreaks, including in French. That point matters: the main LLMs are often more robust in English than in French, and the gap is not small.

## The "bigger is always better" trap: *inverse scaling laws*

That's the bonus Aygalic ended on, and probably the most counter-intuitive point of the talk. We live with the idea that the bigger a model, the more capable it is, and that's broadly true under the classical *scaling laws* (test loss decreasing linearly as a function of compute, dataset size, parameter count).

But a stranger phenomenon shows up on some tasks: **inverse scaling**. Not all capabilities of a model evolve at the same pace as it grows, and some actually *regress*. The *Memo Trap* benchmark is a textbook case: several model families (Anthropic, Chinchilla, Gopher, GPT-2/3/4, OPT, PaLM…) see their accuracy *drop* as FLOPs go up.

One interpretation: the bigger a model, the more Twitter, Reddit and general noise it has ingested. It knows the right answers *and* every wrong variant floating around the web. It becomes more *talkative* without being more *accurate*. The Phare benchmark results point in the same direction: model size does not predict robustness, and small models sometimes resist better, in particular against encoding attacks where their "inability to decode protects them", according to Giskard's analysis.

The practical consequence is strong: **picking your model is not picking the biggest one**. For certain use cases, especially sensitive ones where *robustness* matters more than *virtuosity*, a small specialised model often behaves better. Less error surface, less "toxic culture" internalised, and an inference cost that allows richer architectures (multi-agent, cross-verification). The right reflex is to benchmark carefully on your task rather than trust the global leaderboard.

## Takeaways

To keep hallucinations under control in a production system, the plan is actually fairly simple to state, and just as hard to execute:

- **Know the fundamental limits of LLMs**: their predictive nature, their sycophancy, their frozen corpus. Never treat them as oracles.
- **Evaluate your system continuously**, at several levels (factuality, faithfulness, use cases, sub-systems), with a permanent adjustment loop. An unmeasured system is a drifting system.
- **Put in place the right prevention strategies for your use case**: context engineering, function calling, message checks, guardrails. No single brick is enough on its own, none is free, but their composition, designed around the use case and honestly measured, is currently the most serious way to build systems that hallucinate less, and that know what to do when they still do.

The regulatory context pushes in the same direction. The European AI Act, whose rollout spans 2025-2027, classifies a growing number of uses as "high-risk" and imposes robustness, accuracy and human-oversight requirements. Hallucinations are no longer only a technical problem: they're becoming a compliance problem.

---

## Further reading

- **Aygalic Jara's state-of-the-art paper**: *"État de l'art : évaluation, détection et mitigation des hallucinations des LLMs"*, JEP-TALN-RECITAL 2025. [PDF on ACL Anthology](https://aclanthology.org/2025.jeptalnrecital-recital.7.pdf).
- **The reference survey**: Huang et al. (2023), *A Survey on Hallucination in Large Language Models*. [arXiv:2311.05232](https://arxiv.org/abs/2311.05232).
- **On probing**: Azaria & Mitchell (2023), *The Internal State of an LLM Knows When It's Lying*.
- **On self-critical RAG**: Asai et al. (2023), *Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection*. [arXiv:2310.11511](https://arxiv.org/abs/2310.11511).
- **HalluGraph** (Devoteam, AAAI 2026): a knowledge-graph approach to legal verification.
- **Phare benchmark** (Giskard × Google DeepMind): LLM robustness evaluation including French.

---

*Devoxx France 2026 — 14th edition, Palais des Congrès de Paris, 22-24 April 2026.*
