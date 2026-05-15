---
layout: post
title: "AI sovereignty, a trillion euros and 'vassal state': what Arthur Mensch told the French National Assembly"
subtitle: "A critical read of Mistral AI CEO's hearing before the inquiry commission on digital vulnerabilities"
description: "Analysis of Arthur Mensch's hearing before the French National Assembly inquiry commission on May 12, 2026. Tokens, trade deficit, AI Act, public procurement: what the Mistral AI CEO said, and what he left out."
thumbnail-img: "/assets/img/sam-altman-bulle-ia.webp"
cover-img: "/assets/img/sam-altman-bulle-ia.webp"
tags: [IA, Tech, Personal]
author: "Angelo Lima"
lang: en
ref: mensch-assemblee-nationale-2026
categories: en
---

Tuesday May 12, 2026, 4:00 PM. **Arthur Mensch**, co-founder and CEO of Mistral AI, is heard by the [French National Assembly's inquiry commission](https://www.assemblee-nationale.fr/dyn/en/actualites-accueil-hub/vulnerabilites-du-secteur-du-numerique-en-france-auditions-de-mistral-ai-de-representants-des-gafam-en-france-et-de-cedric-o) "on structural dependencies and systemic vulnerabilities in the digital sector". Next to him sits Audrey Herblin-Stoop, Mistral's head of public affairs. Across the room, MPs trying to understand where Europe stands in the global AI race.

The hearing runs for over ninety minutes. Mensch lays out a built thesis: AI is infrastructure technology, and Europe has a few months to decide whether it produces or merely consumes. As in any such exercise, what he says, what he doesn't say, and what he omits deserve to be read separately. That's what I'm doing here, by cross-checking his positions against publicly available sources (Mistral's April 2026 white paper, [LCP coverage](https://lcp.fr/actualites/intelligence-artificielle-le-patron-de-mistral-ai-arthur-mensch-n-exclut-pas-une-hausse), Bloomberg on the Mythos counter-move).

## AI as raw material: electrons become tokens

Mensch's first structuring idea is the way he redefines what AI is. Not a software product, not a web service: an **energy-transformation technology**. You feed electrons in one end, tokens come out the other. The token being the unit of a model's linguistic output, that is, in his vocabulary, the unit of machine intelligence.

This shift is more than a rhetorical effect. It places AI alongside heavy industry, with its physical externalities (electricity, cooling, land for data centers) and its massive capex cycle. And it serves a central argument: France, thanks to its nuclear capacity, holds a geographic advantage. Decarbonized electricity, relatively cheap at scale, is precisely what's needed to train and run models.

Where Mensch issues a useful warning is on the **narrow window of opportunity**. American cloud operators are signing long-term contracts with EDF and European utilities. If France doesn't channel its electricity toward its own players, those electrons will leave for the United States in token form. The question one could have asked, and that no MP really did: how much electricity does Mistral consume today, and what's the trajectory? The debate stays very macro at this stage.

A nuance Mensch could have brought himself: France's decarbonized electricity is also an asset for traditional industry, which will need it. Prioritizing it for AI may be strategically defensible, but it's not neutral.

## The "trillion euros": a memorable figure, a fragile extrapolation

The headline number. Mensch explains that AI consumption at Mistral already accounts for 10% of payroll. Extrapolated to the European scale over three to four years, you reach **a trillion euros annually**. If Europe imports that AI, it adds straight to the trade deficit.

The image works. It made the rounds in the press, [LCP](https://lcp.fr/programmes/la-seance-est-ouverte/dependance-numerique-de-la-france-audition-de-la-direction-de) included, and that was probably the point. But it doesn't hold up under scrutiny.

First issue: extrapolating the AI consumption of a company like Mistral, whose core business is producing AI, to the whole European economy. It's like estimating a country's steel consumption from a single steelworks. The cost structure of an AI company is not that of an industrial SME, a city hall, or a law firm.

Second issue: the implicit assumption that all value added by AI flows through payment to an external service. A significant share of AI-generated value is captured locally (productivity, margins, new products). What actually leaves the territory is the inference and training spend with foreign providers, not the equivalent of 10% of payroll.

Third issue: the figure assumes a linear growth trajectory that no technology cycle has ever followed. Inference costs per token have been falling by roughly an order of magnitude per year since 2023.

None of this means the risk is imaginary. It's real, and the digital commercial asymmetry between Europe and the United States has been documented for years. But by inflating the number, Mensch hands critics an easy target and weakens an argument that didn't need the boost.

## Sovereignty as "leverage", not retreat

This is the most interesting framing from Mistral's CEO. Digital sovereignty isn't an autarky project: it's **negotiating leverage**. If Europe has no sovereign production capacity in AI, it has nothing to put on the table against the United States. No credible arbitration threat, no standard to impose, no knife in the pocket.

Framing the debate this way avoids the classic pitfall of technological nationalism. Mensch isn't calling to close borders. He's calling for at least one credible European player to exist in every critical layer of the AI stack. It's the same line [Mistral pushed in April 2026 in its white paper "European AI: a playbook to own it"](https://www.maddyness.com/2026/04/07/mistral-ai-pousse-22-mesures-pour-eviter-le-decrochage-de-leurope-dans-lia/), whose 22 measures put the **European preference clause in public procurement** at the center.

There's also a cultural dimension he raises more quietly. Importing an AI model is importing its biases. Models encode representational choices, linguistic biases and political assumptions. An LLM massively trained on Anglo-Saxon content produces Anglo-Saxon analyses by default. The French [Phare benchmark](https://www.silicon.fr/data-ia-1372/llm-francais-biais-hallucinations-226679) (Giskard × Google DeepMind) documented that major LLMs are less robust in French than in English. The asymmetry is measurable.

Where I find the reasoning more debatable is the implicit conclusion: for sovereignty to exist, Mistral must exist. Is sovereignty really sovereignty if it boils down to one national champion? What European plurality is left when a single actor writes the recommendations it will then benefit from?

## AI Act: substantive critique or vested interest?

Mensch criticizes the stacking of rules head-on: GDPR, copyright legislation, AI Act. His thesis is that this stack paradoxically slows down European players and favors American giants, the only ones capable of absorbing compliance costs.

That's the standard startup argument. It has some truth to it. A 500,000-euro compliance cost is a rounding error for OpenAI or Google ; for a European scale-up, it's a quarter of runway. And [the AI Act has been the target of intense lobbying](https://www.roboto.fr/blog/ai-act-le-grand-paradoxe-europeen-qui-freine-l-innovation-en-ia-en-2025), notably by Mistral, to raise the thresholds that trigger the "systemic risk model" classification.

But there's a blind spot. The protection European regulators are trying to deliver isn't bureaucratic fussiness: it responds to real cases (algorithmic discrimination, deepfakes, political manipulation, personal data leaks). When Mensch complains about "the accumulation of regulations", he's also complaining, in the same breath, about transparency obligations on training data. And those obligations aren't trivial when you train on copyrighted content without a license.

The right debate isn't regulation versus deregulation. It's: **which regulation, at what threshold, with what proportionality**. Mensch is right that 27 different national rulebooks destroy European scale. He's wrong to present each obligation as a brake on innovation: some of them are the condition for innovation to be acceptable.

## Defense: coherent, and uncomfortable

The hearing took place a few days before [Bloomberg reported](https://www.bloomberg.com/news/articles/2026-05-13/mistral-developing-new-ai-model-for-banks-lacking-mythos-access) that Mistral is developing a cybersecurity model for European banks cut off from Mythos, Anthropic's access-restricted tool. During the hearing, Mensch said: "We can't let Mythos scan the source code of the French armed forces. That creates an irreparable dependency, we need to find a solution."

This is the strongest passage of the hearing, and also the most uncomfortable. Strong because it rests on a concrete, recent case: a foreign tool, under foreign control, more effective than its alternatives, can unilaterally redefine access to a critical capability. That's precisely what [Palo Alto Networks documents](https://finance.biggo.com/news/fb0uI54BrX5PFN7BS8B6), with frontier AI discovering vulnerabilities seven times faster, and three to five months of defensive buffer left before the trend reverses.

Uncomfortable because Mensch explicitly refuses any right of oversight on the final use of his technology by the French army. "The army is sovereign, it has democratic legitimacy that we don't have." Constitutionally that holds, but it brushes aside a debate that never really took place: what does a "sovereign AI" used for military purposes mean when the engineers who built it have no say? The subject deserves more than a deferral to electoral legitimacy.

## Business model: AI is expensive, and that's good

Mistral charges around €1 per million tokens generated on its entry-level models. Industry gross margins sit around 50%. Mensch owns it: that's what funds the massive training costs, in the hundreds of millions per frontier model cycle.

Mistral's revenue is **70% non-French**. That's consistent with its strategy as a European exporting champion. It also implicitly answers the "subsidized small player" critique: Mistral sells internationally, so its customers validate the value proposition. American capital is present (under 30%), but the founders keep strategic control and aim for a European listing.

Macroeconomically, this is exactly the kind of company Europe needs more of. Politically, it's also a player whose 11.7-billion-euro valuation and trajectory depend on very concrete public decisions: infrastructure choices, electricity allocation, public procurement. Mensch's position is sincere without being disinterested. Anyone who walks into a parliamentary hearing brings an agenda. It must be heard as such.

## Public procurement: the most interesting recommendation, and the hardest to apply

For Mensch, public procurement is the lever. **50% of European GDP flows through public spending**. If a meaningful share of that spending preferred European AI and cloud suppliers, the internal market would structure itself mechanically. That's the recipe the United States has applied since the 1940s (DARPA, NIH, NASA, Pentagon contracts) to grow its tech ecosystem.

Technically it's the right idea. Politically, it runs into European non-discrimination rules in public procurement and WTO agreements. Mistral pushes for "European preference clauses on critical public markets", notably AI and cloud. Legally feasible on national security; far more contested elsewhere.

And there's a method issue. American public procurement in tech wasn't built on declared preference, but on technical specifications that de facto disqualified players unable to meet them (clearance, certifications, integration). If Europe wants to produce the same effect, it has to build demanding technical specs on data sovereignty, auditability, hosting. Not a flag, verifiable requirements. That lever sits entirely in the hands of member states, without changing a word of European law. And it's barely used.

## What the hearing reveals, and what it leaves out

Arthur Mensch's hearing has two main merits.

It puts before national representatives questions the French political class wasn't used to framing this way: AI as industrial infrastructure, electricity as strategic raw material, European fragmentation as a structural barrier to scale.

It also forces an honest look at digital dependency. France and Europe never built a top-tier cloud player. They risk missing the same train on AI, with heavier consequences, because this time the stakes aren't merely industrial: they're cultural, military, democratic.

What the hearing leaves out is equally telling.

The role of **open-weight models** as European public infrastructure. Mensch prefers talking about Mistral rather than about the open-weights ecosystem he was long a part of. Yet if we want plural sovereignty rather than a national monopoly, that's the path.

The debate on the **environmental footprint** of the frontier-model race. French decarbonization is presented as an asset, but the ten-year energy trajectory of AI isn't neutral, and prioritizing electricity for data centers deserves a public debate, not an assumption.

The question of **bias and European linguistic diversity**. Europe doesn't speak French, it speaks 24 official languages. Defending sovereignty can't be reduced to swapping American dependency for French-speaking dependency.

And then, more prosaically, the **clarity on uses**: if AI is going to replace 10% of payroll, that's not a statistic. Those are jobs, employment basins, individual trajectories. The "vassal state" Mensch invokes in conclusion is a useful figure for raising alarm. The state that fails to support its own workers through the transition is a more immediate figure, and far less discussed in the hearing.

## Further reading

- **Full hearing**: [official National Assembly video](http://videos.assemblee-nationale.fr/video.18888392_6a0330a9d4404.vulnerabilites-systemiques-dans-le-secteur-du-numerique--m-arthur-mensch-cofondateur-et-dg-de-mis-12-mai-2026), May 12, 2026.
- **Mistral AI white paper**: *European AI: a playbook to own it*, April 2026, with the 22 detailed measures.
- **LCP coverage**: ["The Mistral AI CEO does not rule out a rise in unemployment"](https://lcp.fr/actualites/intelligence-artificielle-le-patron-de-mistral-ai-arthur-mensch-n-exclut-pas-une-hausse), May 12, 2026.
- **Bloomberg**: ["Mistral Developing New AI Model for Banks Lacking Mythos Access"](https://www.bloomberg.com/news/articles/2026-05-13/mistral-developing-new-ai-model-for-banks-lacking-mythos-access), May 13, 2026.
- **My notes on LLM hallucinations**: [Understanding, measuring and controlling LLM hallucinations](/en/llm-hallucinations-devoxx-2026/), useful background on why linguistic robustness in French is itself a sovereignty issue.

---

*Arthur Mensch (Mistral AI) hearing — French National Assembly inquiry commission on structural dependencies and systemic vulnerabilities in the digital sector, May 12, 2026.*
