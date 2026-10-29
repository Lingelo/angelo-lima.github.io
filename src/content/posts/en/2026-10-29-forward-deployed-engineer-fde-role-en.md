---
title: "Forward Deployed Engineer: the job AI borrowed from Palantir"
subtitle: "Origins, day-to-day work, pay and criticism: what we know about the FDE, the role OpenAI, Anthropic, Google and AWS are all hiring for in 2026"
description: "A Forward Deployed Engineer writes code at the customer's site to get AI into production. Palantir origins, the 2026 market, pay and criticism."
date: 2026-10-29T12:00:00.000Z
lang: en
translationKey: "forward-deployed-engineer-fde"
slug: "forward-deployed-engineer-fde-role-en"
tags:
  - "IA"
  - "Development"
  - "Tech"
author: "Angelo Lima"
cover: "/assets/img/forward-deployed-engineer.webp"
thumbnail: "/assets/img/forward-deployed-engineer.webp"
shareImg: "/assets/img/forward-deployed-engineer.webp"
aliases:
  - "/2026-10-29-forward-deployed-engineer-fde-role-en/"
related:
  - "anthropic-ipo-s1-2026"
  - "ai-replacing-developers-analysis"
  - "kaizen-ai-sdlc-claude-code"
faq:
  - q: "What is a Forward Deployed Engineer (FDE)?"
    a: "A Forward Deployed Engineer is a software engineer sent to a customer by a product vendor to build and ship production solutions on top of that product. The FDE scopes the need with business teams, writes the integrations, deploys them, and feeds back to the product team whatever could help other customers."
  - q: "Where does the Forward Deployed Engineer role come from?"
    a: "Palantir popularized the role and was using the title by 2009 to deploy its platforms at customers such as US government agencies. Internally, Palantir calls these engineers \"Deltas\", as opposed to the \"Devs\" who build the product. The phrase \"forward-deployed\" comes from US military jargon."
  - q: "Why are AI companies hiring FDEs?"
    a: "An AI model only creates value once it is wired into a company's data, APIs and processes, and that integration work is hard to standardize. In 2026, OpenAI, Anthropic, Google Cloud, AWS and Microsoft all set up dedicated organizations to send engineers to their customers."
  - q: "How much does a Forward Deployed Engineer earn?"
    a: "In the US, Anthropic's 2026 job postings for an Applied AI Forward Deployed Engineer listed a base salary of $200,000 to $300,000 a year. In France, Paris startups advertise roughly €45,000 to €70,000. Pay varies enormously by employer, level and country."
  - q: "What is the difference between an FDE and a consultant?"
    a: "A consultant works at the customer's site on behalf of a services firm, whatever tool is involved. An FDE is sent by the product vendor itself and is expected to improve that product based on what they see in the field. Critics such as former Snowflake CRO Chris Degnan see the role as professional services with a new name."
---
For a long time, this job title was a Palantir thing. In 2026, OpenAI, Anthropic, Google, AWS and Microsoft are hiring them by the hundreds, and every career site has published its own "complete guide to the Forward Deployed Engineer". I wanted to understand what sits behind the label, because a lot of the job descriptions read like what developers who spend their careers on client engagements have been doing for years.

> **In brief**
>
> - **What:** a Forward Deployed Engineer (FDE) is a software engineer sent to a customer by a product vendor, to integrate that product and get it into production inside the customer's systems.
> - **Origin:** Palantir, which has used the title since at least 2009 and calls these engineers "Deltas".
> - **Key figures:** according to data cited by the Financial Times, FDE job listings jumped more than 800% between January and September 2025. In 2026, OpenAI, Anthropic, AWS ($1 billion) and Microsoft ($2.5 billion) created dedicated organizations.
> - **What it really is:** a hybrid of developer, consultant and project lead, directly accountable for results at the customer.
> - **The catch:** travel, pressure, technical debt left behind at customers, and a less clear-cut career path than product engineering.

## First, where the word comes from

"Forward-deployed" is US military jargon: a unit positioned forward, as close to the action as possible. Palantir picked it up in the 2000s to name the engineers it placed physically at customer sites, starting with government and defense agencies. Its data analysis software was useless until it was connected to each organization's databases, formats and habits. Instead of waiting for customers to do that themselves, Palantir sent its own developers.

[Palantir's engineering blog](https://blog.palantir.com/dev-versus-delta-demystifying-engineering-roles-at-palantir-ad44c2a6e87) explains that internally, it distinguishes "Devs", who build the product, from "Deltas", who deploy it at customers. The name "Delta" is a leftover from the company's early days, when every Business Development team was named after a letter of the NATO alphabet. A telling detail: Deltas reported to business development, not engineering.

## Why AI brought the model back

Generative AI recreated Palantir's exact problem. A language model looks impressive in a demo, but before it can take orders, answer customers or process files, someone has to connect it to internal data, APIs and business rules, and evaluate its answers on real cases. That work does not come off the shelf.

In June 2025, Andreessen Horowitz partner Joe Schmidt published an essay that got passed around a lot: [Trading Margin for Moat](https://a16z.com/services-led-growth/). His argument: enterprise AI startups are wrong to chase classic software's 80% gross margin right away. He points out that ServiceNow had a 63.2% gross margin at its IPO and Workday 54.1%, because both vendors did a lot of integration work for their customers. By 2024, their margins had climbed back to 79% and 75%. Integration is expensive at first, but once the software sits at the heart of a customer's processes, it becomes very hard to rip out. When the essay came out, 22 of OpenAI's 311 open roles were forward deployed or solutions positions.

Another figure, reported by [AFP](https://macaubusiness.com/microsoft-aws-deploy-engineer-armies-to-help-make-ai-profitable/) from a McKinsey study, explains the current rush: at the end of 2025, nearly nine in ten companies had deployed AI in at least one business function, yet 94% reported no significant benefit. Vendors sell licenses, and customers don't know what to do with them. The FDE is the answer to that gap.

## 2026, the year everyone joined in

The job posting numbers are spectacular, though they deserve some caution. According to data cited by the [Financial Times](https://www.pymnts.com/artificial-intelligence-2/2026/forward-deployed-engineers-emerge-as-one-of-ais-fastest-growing-jobs/), monthly FDE listings rose more than 800% between January and September 2025. Indeed figures reported in the press show 643 postings in April 2025 and 5,330 in April 2026.

More importantly, the big players built whole organizations around the role. According to [The Pragmatic Engineer](https://blog.pragmaticengineer.com/the-pulse-forward-deployed-engineering-heats-up-again/) and the business press:

| Date (2026) | Company | Announcement |
|---|---|---|
| May 4 | Anthropic | A separate FDE consulting company, funded with Blackstone, Hellman & Friedman and Goldman Sachs, to bring Claude into mid-sized companies |
| May 11 | OpenAI | The OpenAI Deployment Company, a standalone entity funded with $4 billion from TPG, Advent and other firms, valued at $14 billion |
| May | Google Cloud | A new AI organization within the go-to-market teams, hiring FDEs directly |
| June 30 | AWS | A Forward Deployed Engineering unit backed by $1 billion |
| July 2 | Microsoft | Microsoft Frontier Company, $2.5 billion and 6,000 experts and engineers |

OpenAI also acquired Tomoro, a UK company founded in 2023 that employs 150 FDEs across the UK, Asia and Australia. Gergely Orosz points out a detail that matters to candidates: at OpenAI and Anthropic, FDEs are hired by these separate companies, so any equity they get is not equity in the lab. Google hires its FDEs directly, with Google stock.

At Anthropic, this new structure sits alongside the Applied AI team, which was already hiring FDEs who "embed directly with our most strategic customers", according to its job postings. The same logic shows up in [Anthropic's IPO filing](/en/anthropic-ipo-s1-filing-en/), where the number of large enterprise customers is one of the headline metrics.

## What an FDE's week looks like

The job descriptions all look alike. The FDE spends time with the customer's business teams to understand the real problem, which is not always the one they describe. They write prototypes, then integrations meant to last: connectors to databases, calls to internal APIs, agents, evaluation sets to measure the quality of the model's answers. They debug in environments they don't control, under the customer's security and network constraints. And they report back to the product team whatever keeps coming up from one customer to the next, so the next integration needs less custom work.

Gergely Orosz estimates that an FDE role at Google splits roughly into 25% coding, 50% integration and plumbing, and 25% meetings and customer work. It's an estimate, but it gives a good sense of the balance.

The required skills follow from that. On the technical side: a general-purpose language (Python and TypeScript come up often), APIs, data, and for AI roles, experience with LLMs in production, agents and evals. On the human side: being able to talk to a business director as easily as to a sysadmin, run a demo, and say no to a request that makes no sense. People who already practice [agentic development day to day](/en/kaizen-ai-sdlc-claude-code-en/) have an obvious head start: they know where a model goes wrong and how to keep it in check.

## What it pays

Lots of numbers are floating around, and most come from sites selling training or recruiting services. I only keep the ranges visible in actual job postings.

At Anthropic, Applied AI FDE postings published in 2026 in San Francisco and New York listed a base salary of $200,000 to $300,000 a year, not counting equity.

France is another planet. Paris startups such as Gladia advertise ranges around €45,000 to €70,000. OpenAI has posted an FDE role in Paris, but I couldn't find a verifiable salary for it.

## The on-site consultant, vendor edition

Reading all this, a developer who has worked for a French IT services firm (an ESN) will get a strong sense of déjà vu. Being placed at the customer, learning their business, integrating a product into an information system you didn't design, living with its security rules and habits: that has been the daily life of tens of thousands of consultants in France for decades.

The difference lies in who sends the engineer. The ESN consultant works for a services company, independent of the tool being integrated. The FDE is sent by the vendor itself, and part of the job is to improve the product based on what they see in the field. When that feedback loop works, every deployment makes the next one easier. When it doesn't, the FDE is doing custom services work under a flashier title.

## The criticism

That is exactly the best-known complaint. In May 2026, on the 20VC podcast, Chris Degnan, Snowflake's former chief revenue officer turned investor, called the FDE "a glorified professional services person". According to [Business Insider](https://www.businessinsider.com/snowflake-cro-forward-deployed-engineers-ai-job-2026-5), he added: "If you're a really good engineer, you do not want to be a forward-deployed engineer." His point: the best engineers want to work on the product, and FDEs leave custom code behind at customers, who then have to maintain it. "There's a lot of technical debt that forward-deployed engineers are going to leave, and there's a lot of risk."

The other complaints come up in most first-hand accounts:

- **Travel:** [LeadDev](https://leaddev.com/career-development/the-rise-of-the-forward-deployed-engineer-fde) cites an OpenAI posting that called for up to 50% travel, and sees an earlier burnout risk in it.
- **Pressure:** when the system goes down, the customer is in the same room.
- **Scattered focus:** constant context switching means you rarely master one codebase in depth, which can make it harder to move back into a pure R&D role.
- **Vagueness:** the title covers very different realities from one company to the next, from senior developer to technical salesperson.

There's also a question job descriptions don't touch. If AI writes a growing share of the code, a question raised in [Will AI replace developers?](/en/will-ai-replace-developers-critical-analysis/), the work left to humans looks a lot like the FDE's: understanding a real problem, scoping it, integrating, owning what goes to production. You can see that as a new job, or simply as the part of a developer's job that models can't do yet.

## My takeaway

The Forward Deployed Engineer is not a 2026 invention. Palantir has been doing it for more than fifteen years, and French IT services firms have known a version of it for much longer. What changed is the scale and the money: billions invested by the biggest AI players, who have understood that selling a model is not enough and that someone has to be on site to make it work.

For a developer, the role has real appeal: you see the effect of your work at the customer, and the big vendors pay above market. In return, you have to accept the travel and a less mapped-out career. Before applying, I would ask the employer one question: will what I see at customers actually make it back into the product?
