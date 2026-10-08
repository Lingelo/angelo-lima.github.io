---
title: "AI and ecology in 2026: the prompt is light, the infrastructure is heavy"
subtitle: "A prompt uses 0.24 Wh. Data centers could use as much electricity as Japan by 2030. The October 2026 numbers, without doom or greenwashing."
description: "A prompt uses 0.24 Wh, yet data centers will double their electricity and water use by 2030. The October 2026 numbers, and what developers can do."
date: 2026-10-08T00:30:00.000Z
lang: en
translationKey: "ai-ecology-2026"
slug: "ai-ecology-2026-prompt-infrastructure-en"
tags:
  - "IA"
  - "Tech"
  - "Development"
author: "Angelo Lima"
thumbnail: "/assets/img/ia-ecologie-2026.webp"
shareImg: "/assets/img/ia-ecologie-2026.webp"
aliases:
  - "/2026-10-08-ai-ecology-2026-prompt-infrastructure-en/"
faq:
  - q: "How much energy does an AI prompt use in 2026?"
    a: "A standard text prompt uses between 0.24 and 0.34 Wh in 2026. Google measures 0.24 Wh, 0.03 g of CO₂e and 0.26 mL of water for the median text request in Gemini; OpenAI reports about 0.34 Wh for an average ChatGPT request. That is less than an LED bulb left on for two minutes."
  - q: "Does a ChatGPT prompt use a bottle of water?"
    a: "No. That comparison came from a 2023 study estimating 10 to 50 mL of water per prompt for GPT-3. The measurement Google published in 2025 gives 0.26 mL per median Gemini text request, 40 to 200 times less."
  - q: "How much electricity do data centers use worldwide?"
    a: "Data centers used about 448 TWh in 2025 according to United Nations University, and are projected to reach 945 TWh in 2030, roughly the consumption of Japan. Gartner estimates 565 TWh for 2026."
  - q: "Is AI an environmental burden?"
    a: "AI is not a burden at the individual level: a single prompt weighs very little. It becomes one at the collective level, with data center electricity demand set to double by 2030 on a grid mix that is still partly fossil, and above all at the local level, where data centers strain water and power grids."
  - q: "How can developers reduce the environmental impact of AI?"
    a: "The main lever is sizing: route each task to the smallest model that can handle it, measure tokens per completed task, cap agent loops and use caching. Choosing a cloud region with low-carbon electricity and low water stress also changes the footprint."
---
*A prompt uses less energy than an LED bulb left on for two minutes. And yet AI is becoming a real burden on power grids and water resources. Both sentences are true. That is the whole problem.*

In 2025 I wrote [a post on the ecological cost of AI](/en/ai-ecological-impact-training-vs-inference-environmental-costs/). The question that framed the debate back then: what weighs more, training a model or using it?

A year and a half later, that question is largely settled. The cost of a single prompt stopped being contentious once the big AI companies published measurements. The argument is now about total volume, about water, about hardware, and about what agents are going to do with all of it.

So is AI an environmental burden, true or false? I went through the numbers available in October 2026 to find out.

> **In brief**
>
> - **One prompt:** 0.24 Wh, 0.03 g of CO₂e and 0.26 mL of water for a median Gemini text request (Google, 2025). About 0.34 Wh in ChatGPT according to OpenAI.
> - **Data centers:** 448 TWh in 2025, 945 TWh projected for 2030, roughly Japan (United Nations University, June 2026).
> - **The paradox:** energy per AI task drops nearly tenfold every year, yet data center demand grew 17% in 2025.
> - **The blind spot:** water (consumption doubling by 2030) and chip manufacturing, which dominates several impact categories of a GPU.
> - **The verdict:** false at the individual level, true at the collective level, especially true at the local level.

## The prompt, a featherweight

A standard text prompt now uses between 0.24 and 0.34 Wh. That is the first big change since 2025: these figures are measured.

- **Google** instrumented its infrastructure for a year. The median text request in Gemini uses 0.24 Wh, emits 0.03 g of CO₂e and consumes 0.26 mL of water ([source](https://www.alphaxiv.org/abs/2508.15734.md)). Over the same period Google reports a 33-fold drop in energy per prompt.
- **OpenAI** reports about 0.34 Wh for an average ChatGPT request.
- **Mistral** published a full life-cycle assessment of Mistral Large 2, server manufacturing included, following the French AFNOR frugal AI framework, with ADEME and Carbone 4 ([source](https://www.eesel.ai/blog/energy-ai)).

These figures demolish the shock comparisons that were going around two years ago, like "a bottle of water per request". A 2023 study estimated 10 to 50 mL of water per prompt for GPT-3, 40 to 200 times more than Google's measurement ([source](https://www.deeplearning.ai/the-batch/google-study-directly-measures-electricity-water-use-and-greenhouse-emissions-of-its-models)).

They still need to be read carefully. Google gives a median rather than a mean, says nothing about prompt length or complexity, and only covers the Gemini app. Google's and OpenAI's numbers are not directly comparable ([source](https://towardsdatascience.com/?p=606934)). They are orders of magnitude and should be read as such.

## A prompt next to everyday objects

For everyday use, an electric car or an air fryer uses far more than a chatbot. Twenty minutes of air frying is worth about 2,000 text prompts, a 10 km drive in a compact EV about 7,000, and the same drive in a large electric SUV over 10,000.

[![A text prompt (0.24 Wh) uses about 2,000 times less energy than 20 minutes of air frying (500 Wh). A long reasoning prompt (33 Wh) exceeds two smartphone charges.](/assets/img/ai-ecology-prompt-objects-en.svg)](/assets/img/ai-ecology-prompt-objects-en.svg)

Three caveats keep this from being the end of the story:

- **Not all prompts are equal.** A long reasoning prompt already uses more than two smartphone charges. A heavy agentic task can be worth several kilometres in an EV.
- **Look at what each use replaces.** The EV replaces a petrol car, the air fryer often replaces an oven: both can lower the overall footprint. A good share of AI use is added on top without replacing anything.
- **Only usage electricity is counted here.** Manufacturing a car battery or data center GPUs changes the picture, as we will see.

## The paradox: each task costs less, the total explodes

In 2025, data center electricity demand grew by 17%, against 3% for global electricity demand. Over the same period, energy per AI task dropped nearly tenfold each year ([source](https://www.seforall.org/news/three-numbers-that-define-ais-energy-decade)).

This is an almost perfect Jevons paradox. When a resource gets cheaper to use, we use so much more of it that total consumption rises. There are more users, and each of them runs heavier tasks, like agents or reasoning models.

The projections all point the same way, towards a doubling by the end of the decade ([UN](https://insurancejournal.com/magazines/mag-features/2026/06/22/874414.htm), [Gartner](https://www.corrierecomunicazioni.it/?p=344937)).

[![Data center electricity worldwide: 448 TWh measured in 2025, 565 TWh projected for 2026 (Gartner), 945 TWh projected for 2030 (UN), roughly Japan's consumption.](/assets/img/ai-ecology-electricity-en.svg)](/assets/img/ai-ecology-electricity-en.svg)

And that electricity is not clean: according to the IEA, about 40% of the additional data center consumption through 2030 will still be met by gas and coal ([source](https://ttms.com/growing-energy-demand-of-ai-data-centers-2024-2026/)).

The impact is also highly concentrated. Data centers already account for more than 20% of Ireland's electricity, against 2 to 3% on average in the EU ([source](https://www.seforall.org/news/three-numbers-that-define-ais-energy-decade)). AI will not bring down the global grid. It can saturate a local one.

## Beyond carbon: water, hardware, waste

Carbon is only part of the impact, and probably not the most worrying part. Kaveh Madani, lead author of the June 2026 UN report, says it plainly: the debate still treats AI as software, when it is a physical infrastructure made of power plants, chips, minerals, land and water ([source](https://insurancejournal.com/magazines/mag-features/2026/06/22/874414.htm)).

[![Data centers worldwide: water consumption rises from 4,500 to 9,300 billion litres between 2025 and 2030, CO₂ emissions from 189 to 399 million tonnes.](/assets/img/ai-ecology-water-co2-en.svg)](/assets/img/ai-ecology-water-co2-en.svg)

**Carbon: significant, not outsized.** Data centers already emit as much CO₂ as Argentina ([source](https://www.sej.org/node/53023)). Against the roughly 37 billion tonnes emitted worldwide each year, that is around 0.5%, and AI is only part of it. Hyperscalers claim 92% of their energy comes from low-carbon sources, but partly through purchase agreements ([source](https://www.structureresearch.net/?p=106902)).

**Water: the real hotspot.** According to the UN, data center water consumption should more than double by 2030 ([source](https://insurancejournal.com/magazines/mag-features/2026/06/22/874414.htm)). Over 21% of US data centers sit in basins with medium to high water stress ([source](https://voxbooster.com/blog/data-center-water-use-statistics-2026/)). And the reported figures are underestimates: the water used by the power plants feeding them is reportedly about 12 times their direct consumption ([source](https://en.fnnews.com/news/202607040406311808)).

**Manufacturing: the blind spot.** A life-cycle assessment of the Nvidia A100 GPU shows that manufacturing dominates several impact categories over the whole life cycle, well beyond carbon alone ([source](https://arxiv.org/html/2509.00093v1)). Cobalt, tungsten, lithium: each chip contains little, but demand is climbing fast.

[![Share of manufacturing in the full life-cycle impact of an Nvidia A100 GPU: 94% for human toxicity (cancer), 81% for freshwater eutrophication, 71% for mineral and metal depletion.](/assets/img/ai-ecology-gpu-manufacturing-en.svg)](/assets/img/ai-ecology-gpu-manufacturing-en.svg)

**E-waste.** A high-end GPU can be outdated in under two years ([source](https://jointings.org/eng/?p=1436)). Yet only 22% of e-waste is collected and recycled worldwide ([source](https://ecolecanada.gc.ca/tools/articles/ai-environmental-effects-eng.aspx)).

## Agents push the cost per task back up

The training versus inference debate from my 2025 post is settled: more than 80% of AI's electricity use now comes from the usage phase ([source](https://www.arbor.eco/blog/ai-environmental-impact)). A model is trained once. It answers billions of times.

And usage is changing shape. A long advanced reasoning prompt can exceed 33 Wh, more than 130 times a standard text prompt ([source](https://www.arbor.eco/blog/ai-environmental-impact)). A coding agent that chains dozens of calls, rereads files, runs tests and starts over is another scale entirely.

This is where the "cost per token is falling" line becomes misleading. Cost per token is falling, yes. But the number of tokens per task is exploding. I see it every day working on an agentic platform: the number I track is the cost of a finished task. A single prompt tells you almost nothing. I reached the same conclusion with [the Claude Code bill](/en/claude-code-billing-costs-en/), where the whole session is what costs money.

## So, environmental burden: true or false?

**Both, depending on the scale you look at.**

- **False at the individual level.** Your prompt is not destroying the planet. Shaming someone for asking a chatbot a question while they drive to buy bread makes no sense.
- **True at the collective level.** AI has become a significant and growing load on power grids, with a mix that is still largely fossil.
- **Especially true at the local level.** Water, grid saturation and pushback from residents all play out where data centers are built.
- **Underestimated on the hardware side.** Chip manufacturing and e-waste remain the big absentees from per-prompt figures.

The UN's wording seems the most accurate to me: AI will not exhaust water or electricity globally, but poorly planned expansion can collide with resources that are already under strain in specific places ([source](https://english.aaj.tv/news/amp/330459838)).

## What developers and teams can do

The lever that matters most is sizing. Mistral's analysis shows that impact roughly tracks model size: a model ten times larger costs about ten times more for the same number of tokens ([source](https://www.eesel.ai/blog/energy-ai)).

1. **Route to the right model.** A small model to classify, summarise or extract, possibly [running locally with Ollama](/en/ollama-2026-state-of-the-art-en/). The big reasoning model only when the task calls for it.
2. **Measure per task, not per prompt.** Track tokens consumed per completed task, especially for agents.
3. **Limit loops.** Cap agent iterations, cache, avoid reloading the whole context on every call.
4. **Choose where the compute runs.** A cloud region with low-carbon electricity and little water stress genuinely changes the footprint.
5. **Ask whether AI is needed at all.** It is the first question in the AFNOR frugal AI framework ([source](https://www.banquedesterritoires.fr/12-territoires-selectionnes-pour-concevoir-lia-frugale-au-service-de-la-transition-ecologique)). A regex is still cheaper than an LLM.

A prompt weighs nothing. A poorly sized agentic architecture, deployed to thousands of users, weighs a lot. And that architecture is designed by teams like mine.

## Sources

- [Google: Measuring the environmental impact of delivering AI at Google Scale](https://www.alphaxiv.org/abs/2508.15734.md)
- [Towards Data Science: Google's Gemini disclosure, progress or greenwashing?](https://towardsdatascience.com/?p=606934)
- [The Batch: Gemini's Environmental Impact Measured](https://www.deeplearning.ai/the-batch/google-study-directly-measures-electricity-water-use-and-greenhouse-emissions-of-its-models)
- [eesel: Energy and AI in 2026, what the per-prompt numbers don't tell you](https://www.eesel.ai/blog/energy-ai)
- [Arbor: AI's Environmental Impact, A Full Lifecycle Analysis](https://www.arbor.eco/blog/ai-environmental-impact)
- [SEforALL: Three Numbers That Define AI's Energy Decade](https://www.seforall.org/news/three-numbers-that-define-ais-energy-decade)
- [Corriere Comunicazioni: Gartner, data center consumption in 2026](https://www.corrierecomunicazioni.it/?p=344937)
- [TTMS: AI Data Centers Energy Consumption 2024-2026](https://ttms.com/growing-energy-demand-of-ai-data-centers-2024-2026/)
- [Insurance Journal / Reuters: United Nations University report, June 2026](https://insurancejournal.com/magazines/mag-features/2026/06/22/874414.htm)
- [AP via SEJ: Energy, Water Use and Pollution of AI and Data Centers Rival Most Countries](https://www.sej.org/node/53023)
- [Structure Research: 2026 State of Environmental Impact Report](https://www.structureresearch.net/?p=106902)
- [Voxbooster: Data center water use statistics 2026](https://voxbooster.com/blog/data-center-water-use-statistics-2026/)
- [FN News: actual water consumption of data centers](https://en.fnnews.com/news/202607040406311808)
- [arXiv: More than Carbon, cradle-to-grave impacts of the Nvidia A100](https://arxiv.org/html/2509.00093v1)
- [Joint Effect: AI e-waste](https://jointings.org/eng/?p=1436)
- [École Canada: AI environmental effects](https://ecolecanada.gc.ca/tools/articles/ai-environmental-effects-eng.aspx)
- [Banque des Territoires: frugal AI and the AFNOR framework](https://www.banquedesterritoires.fr/12-territoires-selectionnes-pour-concevoir-lia-frugale-au-service-de-la-transition-ecologique)
