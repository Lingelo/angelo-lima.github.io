---
layout: post
title: "AI Ecological Impact: Training vs Inference Environmental Costs"
subtitle: "Deciphering artificial intelligence's carbon footprint and exploring sustainable paths"
cover-img: /assets/img/ia-impact-ecologique.webp
share-img: /assets/img/ia-impact-ecologique.webp
tags: [AI, Tech]
author: Angelo Lima
lang: en
ref: ai-ecological-impact
categories: en
---

# AI Ecological Impact: Analysis of Training vs Inference Energy Costs

Artificial intelligence (AI) today plays a major role in numerous domains: online recommendations 🎥, virtual assistants 📱, scientific research 🔬, and many others. But at a time when ecological transition becomes a global priority, it's crucial to question the environmental cost of these technologies. Behind each interaction with a chatbot or AI query lies a power-hungry electrical infrastructure, not always aligned with climate objectives.

This article examines two major stages in an AI model's lifecycle: **training** and **usage**. We'll take the example of open-source models like **LLaMA 3**, comparing their respective environmental footprints while exploring ways to minimize their impact.

---

## 🔄 AI Model Usage: A Moderate Footprint

Once an AI model is trained, it can be used to produce results – a process called **inference**. This phase, much lighter than initial training, primarily mobilizes processor (CPU) or graphics card (GPU) power, as well as RAM.

### 💡 What Energy Consumption for a Local Model?

If you run an open-source model like **LLaMA 3** on a personal machine equipped with a modern GPU (for example Nvidia RTX 3080), here's what you can expect:

- ⚡ **Electrical consumption**: About **250 to 350 watts/hour**, depending on the task.
- 💨 With one hour of daily usage, this represents an annual consumption of **90 to 120 kWh**, equivalent to about **40 to 60 kg of CO2 emitted** in a country where energy comes mainly from fossil fuels ([source: Ademe](https://www.ademe.fr)).
- 🌱 If the electricity used is from renewable sources (wind, solar, etc.), the carbon impact can be largely reduced.

For comparison, this footprint is similar to a video game session on a power-hungry GPU. It therefore remains modest for individual usage. However, when such systems are deployed at large scale (in the cloud), the cumulative impact can become more consequent – particularly if servers run permanently.

---

## 🏋️‍♂️ AI Model Training: An Energy Abyss

Where things take on a completely different dimension is during the **training** phase. Unlike using an already trained model, training a model involves intensive calculations on enormous datasets, mobilizing clusters of **thousands of GPUs or TPUs** for weeks.

### 📊 The Dizzying Figures of a Foundation Model

Let's take the example of **GPT-3**, a model comparable to LLaMA in terms of size and complexity. Here's what we know about its impact:

- 🔌 Total training: **1,287 MWh of electricity**, equivalent to the annual consumption of **more than 500 European households** ([source: Patterson et al.](https://arxiv.org/abs/2104.10350)).
- 🌎 Carbon footprint: about **284 tons of CO2**, equivalent to **56 Paris-New York round trips by plane** or **700,000 km traveled in a thermal vehicle**.
- ❄️ Cooling needs: Each data center must maintain its machines at low temperatures. For example, **more than 700,000 liters of water** were used in 2022 in the United States to cool AI servers ([source: Intelligence Artificielle School](https://www.intelligence-artificielle-school.com/)).

### 🛑 A Question of Ecological Viability

Training represents the majority of AI models' environmental footprint: about **90% of their total energy consumption** occurs during this stage ([source: Bommasani et al., 2021](https://arxiv.org/abs/2108.07258)). In comparison, the inference phase (usage) is much more modest, even if it repeats massively in commercial usage scenarios (for example, to fuel the billions of daily queries of a search engine).

---

## ⚖️ Training vs. Usage: What Lessons?

On one side, training is a one-time but extremely costly process; on the other, usage distributes this impact among thousands or millions of users. In other words:

- 💻 **Individual usage**: Relatively accessible energy-wise, especially when energy comes from renewable sources.
- 🏭 **Massive training**: Represents a major ecological challenge, due to scale and necessary material power.

Increasingly sophisticated and voluminous models (for example GPT-4 or LLaMA 3) pose an obvious question: how to continue innovating while reducing ecological footprint?

---

## 🌱 Solutions for More Sustainable AI

Despite these findings, the AI industry explores several paths to reduce its environmental impact:

### 🔄 Reusing Existing Models
Pre-trained models, like **LLaMA 3** or GPT-3, can be adapted to specific cases via techniques like **fine-tuning**. This process consists of adjusting the model on small datasets, consuming significantly less energy than initial training.

### 🧠 Smaller and More Efficient Models
Techniques like **model distillation** allow condensing a voluminous (and expensive) model into a lighter version, while maintaining similar performance on specific tasks. This reduces both energy needed to train and run them.

### ⚡ Greener Infrastructures
Technology companies invest in data centers powered by renewable energies. For example, Google plans to achieve carbon neutrality on its infrastructures by 2030 ([source: Google Sustainability](https://sustainability.google/)).

### 🛠️ Hardware Progress
New chip generations, like Nvidia H100 GPUs or Google TPUs, are designed to offer superior performance with lower energy consumption. These hardware innovations gradually make AI infrastructure more efficient.

---

## 🤔 Conclusion: What Should We Prioritize?

Artificial intelligence continues to transform our lives, but its environmental impacts cannot be ignored. If using already trained models remains relatively accessible for individuals, the model training phase poses a major ecological challenge.

It's therefore imperative to find the right balance: companies must optimize their models, exploit more renewable energies, and avoid giving in to the race for ever more voluminous models when it's not necessary. In parallel, researchers and policy makers must work to establish best practices for more sustainable AI.

And you, do you think it's possible to reconcile the quest for innovation and climate challenges? What would be, in your opinion, the best path to make AI more environmentally respectful while maintaining its potential? 💡