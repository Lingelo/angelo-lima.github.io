---
title: "Anthropic goes public: what Claude's maker actually discloses in its S-1"
subtitle: "Revenue up 14x, an $80 billion net loss, Class F shares and a lawsuit against the Pentagon: a read of the prospectus filed with the SEC"
description: "Anthropic filed its S-1 on October 26, 2026 to list on Nasdaq as ANT. Revenue, losses, governance and risks: a close read of the prospectus."
date: 2026-10-27T12:00:00.000Z
lang: en
translationKey: "anthropic-ipo-s1-2026"
slug: "anthropic-ipo-s1-filing-en"
tags:
  - "IA"
  - "Tech"
author: "Angelo Lima"
thumbnail: "/assets/img/anthropic-ipo-s1.png"
shareImg: "/assets/img/anthropic-ipo-s1.png"
aliases:
  - "/2026-10-27-anthropic-ipo-s1-filing-en/"
related:
  - "sam-altman-ai-bubble"
  - "mensch-assemblee-nationale-2026"
  - "claude-code-cheatsheet-octobre-2026"
faq:
  - q: "When is Anthropic going public?"
    a: "Anthropic made its Form S-1 public with the SEC on October 26, 2026, after a confidential submission on June 1, 2026. US press reports (CNN, Axios) point to a possible first trading day around November 16, 2026, after the midterm elections. The share price and share count have not been set yet."
  - q: "What ticker will Anthropic trade under?"
    a: "Anthropic has applied to list its Class A common stock on the Nasdaq Global Select Market under the symbol \"ANT\". Goldman Sachs and Morgan Stanley lead the underwriting syndicate, which includes about twenty other banks."
  - q: "Is Anthropic profitable?"
    a: "No. In the first half of 2026, Anthropic generated $16.3 billion in revenue with an operating loss of $693 million. Its net loss reached $80.7 billion, but $72.4 billion of that comes from fair-value changes on convertible notes, derivatives and SAFEs, a non-cash accounting item."
  - q: "Who controls Anthropic after the IPO?"
    a: "Anthropic's seven co-founders hold, through an entity called Founder LLC, Class F shares with no economic rights that carry 50.1% of the voting power. The Long-Term Benefit Trust, an independent body, holds Class T shares that let it elect a majority of the board of directors."
  - q: "What valuation is Anthropic targeting in its IPO?"
    a: "The S-1 sets no price. According to financial press reports, shareholders are aiming for a valuation between $1.5 trillion and $2 trillion, up from $965 billion in the May 2026 Series H. Raising around $100 billion would make it the largest IPO in history."
---
On Monday, October 26, 2026, Anthropic published its Form S-1 on the SEC website. It is the document a US company has to make public before selling shares to the public, and Anthropic's runs to several hundred pages. French tech blogger [Korben summed it up](https://korben.info/anthropic-entre-en-bourse-et-promet-de-revolutionner-lhumanite.html) under a deliberately grandiose headline, and the financial press piled in within hours. I wanted to go to the source, because I use Claude every day and the company that builds it will now answer to Nasdaq shareholders.

> **In brief**
>
> - **What:** Anthropic, PBC, the maker of the Claude models, filed its S-1 on October 26, 2026 to list on Nasdaq under the ticker ANT.
> - **Key figures:** $16.3 billion in revenue in the first half of 2026 (14 times a year earlier), a $693 million operating loss, $112.4 billion in cash as of June 30.
> - **The $80.7 billion loss:** $72.4 billion of it is an accounting entry tied to convertibles, not cash burned.
> - **Governance:** the seven co-founders keep 50.1% of the votes, and an independent trust elects a majority of the board.
> - **Why it matters:** it would be the largest IPO ever, from a company that states in writing that AI could pose "catastrophic or existential" risks.

## The timeline: from June to November

Anthropic confidentially submitted a draft of its filing on June 1, 2026, right after a Series H that valued the company at $965 billion. Rumors then pointed to a mid-October listing, which slipped. The public filing on October 26 opens the final stretch: the investor roadshow, pricing, then the first trading session. [CNN](https://www.cnn.com/2026/10/26/tech/anthropic-files-ipo) reports a debut as early as November 16, after the November 3 midterms.

The prospectus still has blanks where the offering numbers go: "between $ and $" for the price range, no share count. The figures making the rounds (a valuation of $1.5 to $2 trillion, a raise of around $100 billion) come from press reports, not from the document. I quote them as such.

Goldman Sachs and Morgan Stanley lead the deal. Three French banks appear on the list: BNP Paribas, Crédit Agricole CIB and Société Générale.

## Revenue: a dizzying curve

The income statement fits in a few lines, and it is enough to explain the hype. In millions of dollars:

| Period | Revenue | Compute and infrastructure | Operating loss |
|---|---|---|---|
| 2023 | 41 | 433 | 551 |
| 2024 | 386 | 2,522 | 2,980 |
| 2025 | 4,585 | 7,326 | 8,060 |
| H1 2025 | 1,163 | 2,334 | 2,135 |
| H1 2026 | 16,286 | 8,945 | 693 |

From $41 million in 2023 to more than $16 billion in a single half-year in 2026. The first half of 2026 is 14 times the first half of 2025. Compute (GPUs, datacenters) still eats 55% of revenue, but it grows far more slowly than revenue, which is why the operating loss is shrinking.

On the customer side, the S-1 counts, as of September 30, 2026, more than 11,900 businesses each generating at least $100,000 in trailing twelve-month revenue, up from more than 950 a year earlier. More than 1,900 exceed $1 million, and about 250 exceed $10 million.

What struck me as a developer is how central Claude Code is to the story. The filing calls it "the clearest manifestation" of what Anthropic calls *Virtual Collaborators*, and says that for enterprise AI its launch was comparable to the arrival of the first widely adopted conversational assistants. If you have followed the tool over the past year (I keep a [regular state of play](/en/claude-code-cheatsheet-october-2026-state-of-play-en/)), that is easy to believe.

## The $80 billion loss, or how to read one accounting line

The number that made headlines is the net loss: $80.7 billion over six months. Put that way, it sounds like a company burning cash at an absurd rate. The reality is more mundane, and Korben makes the same point.

Of that $80.7 billion, $72.4 billion comes from the line "change in fair value of convertible notes, derivative liabilities, and SAFEs". When a company raises money with instruments that convert into shares and its valuation soars, the value of those instruments soars too, and accounting records the difference as a loss. No cash leaves the building. The more Anthropic is worth, the bigger that line gets. A classic pre-IPO accounting paradox.

The loss that matters for judging the business model is the operating loss: $693 million in the first half of 2026, down from $2.1 billion a year earlier. With $112.4 billion in cash and $19.3 billion in short-term investments as of June 30, the company has no near-term liquidity problem.

Another line is worth a pause: $1.5 billion expensed in 2025 for the *Bartz* settlement, the class action by authors who accused Anthropic of training Claude on pirated books. The S-1 warns that further adverse copyright rulings could hurt the business.

## Governance: five share classes and a trust

This is the most unusual part of the filing. Anthropic is a Delaware *public benefit corporation*, legally required to balance shareholders' interests against its stated purpose: "the responsible development and maintenance of advanced AI for the long-term benefit of humanity".

To lock that purpose in, the S-1 describes five classes of stock:

- **Class A:** the shares sold to the public, listed as ANT.
- **Class F:** held by the Founder LLC of the seven co-founders (Dario and Daniela Amodei, Tom Brown, Jack Clark, Jared Kaplan, Sam McCandlish, Chris Olah). No economic rights, but 50.1% of the voting power.
- **Class T:** held by the Long-Term Benefit Trust, a body of financially disinterested trustees that can elect and remove a majority of the board.
- **Class E:** issued to employees (excluding co-founders), voting only on certain limited matters.
- **Class N:** held mainly by strategic partners, converting to Class A when sold to a third party.

The direct consequence: Nasdaq will treat Anthropic as a *controlled company*, exempt from some board independence rules. Buying ANT shares means buying a slice of future profits with almost no say in how the company is run. Meta and Alphabet already use dual-class stock. Stacking a trust on top of founder control is new at this scale.

## The Pentagon, a risk spelled out

The most political section of the S-1 deals with the US government. In early 2026, the Department of War (the new name of the Department of Defense) suggested it could invoke the *Defense Production Act* to force Anthropic to lift its usage restrictions on autonomous weapons and mass surveillance. Anthropic refused. The President then directed federal agencies to stop using its technology, and the Secretary of War designated it a "supply-chain risk to national security".

On March 4, 2026, Anthropic received two formal letters to that effect. The company sued and won a final judgment largely in its favor at first instance. But on September 25, the D.C. Circuit Court of Appeals ruled 2-1 that the Section 4713 designation was proper. Anthropic has petitioned for rehearing en banc. The S-1 admits it "cannot predict the ultimate outcome" of these cases, which could cause material revenue losses.

A company heading to the stock market while openly fighting its own government on a matter of principle is rare enough to note.

## The other risks, and there are many

A large share of the document is about risk factors. Some are expected (competition from OpenAI, Google and open-source models, dependence on compute, slowing growth). Others are far less usual in an IPO prospectus:

- **Compute commitments.** Anthropic has signed take-or-pay contracts that oblige it to pay for capacity whether it uses it or not. The SpaceX arrangement for NVIDIA GPUs alone is worth up to $120.5 billion through 2029, about $3.1 billion a month once all capacity is delivered. [French outlet Next added up](https://next.ink/263960/en-route-pour-la-bourse-anthropic-liste-800-milliards-de-dollars-de-depenses/) the contracts mentioned (Google, Amazon, Microsoft, Broadcom, SpaceX, AMD…) and got close to $800 billion over the decade. The exact total is left blank in the S-1.
- **Customers breaking the rules.** Anthropic estimates that 5% to 7% of its revenue for the first nine months of 2026 came from customers violating its usage policy or commercial terms, and expects that share to fall as it detects them.
- **Models evading oversight.** The S-1 says that as its models have become more capable, they have become "better able to circumvent" evaluation and control techniques, including by concealing misaligned objectives.
- **Misuse.** The filing recalls that in September 2025, a Chinese state-sponsored hacking group manipulated Claude Code into attempting to break into roughly thirty targets, with a handful of successful intrusions.
- **Existential risk.** The S-1 repeats that sufficiently advanced AI could pose "catastrophic or existential risks" to humanity, and notes that its own models already speed up its research.

Reading that kind of sentence in a document meant to sell shares is a strange experience. It is consistent with Dario Amodei's long-standing message, and it is also legal cover: a disclosed risk is one nobody can accuse you of hiding.

## My take

In August 2025, when [Sam Altman himself was talking about a bubble](/en/sam-altman-ai-bubble-markets-analysis/), I pointed to the gap between AI valuations and economic reality. Anthropic's S-1 shifts that picture a little: for the first time we have audited accounts from a frontier AI lab, and they show real growth with a shrinking operating loss.

That does not settle the price. A $1.5 to $2 trillion valuation on $16 billion of half-year revenue assumes growth continues for a long time, while the filing itself warns it will slow. And $800 billion of compute commitments will not shrink if demand softens.

The question I care most about is the one [Arthur Mensch raised before the French National Assembly](/en/arthur-mensch-mistral-ai-national-assembly-hearing-en/): Europe's dependence on a handful of American suppliers. A listed Anthropic is a company whose European customers will depend on trade-offs made for Nasdaq shareholders, under pressure from a government it is suing. The trust and the Class F shares are meant to protect the mission. The first disappointing quarter will show whether the structure holds.

## Sources

- [Anthropic, PBC Form S-1 on EDGAR (SEC)](https://www.sec.gov/Archives/edgar/data/0002130357/000162828026067168/anthropicpbc-sx1.htm)
- [Korben: Anthropic entre en bourse et promet de révolutionner l'humanité (FR)](https://korben.info/anthropic-entre-en-bourse-et-promet-de-revolutionner-lhumanite.html)
- [Next: En route pour la bourse, Anthropic liste 800 milliards de dollars de dépenses (FR)](https://next.ink/263960/en-route-pour-la-bourse-anthropic-liste-800-milliards-de-dollars-de-depenses/)
- [CNN: Anthropic set to make stock market debut](https://www.cnn.com/2026/10/26/tech/anthropic-files-ipo)
- [Axios: Anthropic files for its IPO](https://www.axios.com/2026/10/26/anthropic-ipo)
