---
layout: post
title: "Conventional Comments: Improving Code Reviews through Standardization"
subtitle: "Because code reviews are better when everyone speaks the same language"
cover-img: /assets/img/conventional-comments.webp
share-img: /assets/img/conventional-comments.webp
tags: [Development]
author: Angelo Lima
lang: en
ref: conventional-comments
categories: en
---

## Review Comment Standardization: Optimizing Technical Communication

Code reviews constitute a critical process for software quality and knowledge sharing. However, the absence of standardized conventions in comments can generate misunderstandings, unproductive discussions, and notable efficiency loss.

[Conventional Comments provide a structured response by defining a standard for formatting comments in any review process](https://conventionalcomments.org/)¹. This approach significantly improves the clarity of technical exchanges and reduces ambiguities.

---

## Conventional Comments Specification: Structure and Semantics

### Standardized Format

[The Conventional Comments specification](https://conventionalcomments.org/)¹ defines a formal structure:

```
<label> [decorations]: <subject>

[discussion]
```

This syntax ensures precise communication where each element provides specific contextual information.

### Main Labels and Usage

**nitpick**: Minor improvement, non-critical for functionality.  
Example: `nitpick: The naming "userData" would be more explicit than "ud"`

**suggestion**: Concrete improvement proposal with potential impact.  
Example: `suggestion: Using a utility method could improve readability`

**question**: Request for clarification on implementation or logic.  
Example: `question: Can this nested double loop be optimized?`

**issue**: Identified problem requiring mandatory correction.  
Example: `issue: This test systematically fails in production environment`

**praise**: Recognition of a particularly elegant or efficient solution.

---

## Decorators and Advanced Contextualization

### Functional Decorators

Optional decorators provide important nuances:

- **(non-blocking)**: Indicates that a suggestion can be resolved later
- **(blocking)**: Signals that resolution is required before merge
- **(if-minor)**: Suggests modification if required effort remains minimal

### Discussion and Argumentation

[The discussion section allows explicating context, reasoning, and resolution steps](https://dev.to/jacobandrewsky/better-feedback-in-code-reviews-with-conventional-comments-2c3k)², transforming a simple comment into argued technical documentation.

---

## Impact on Team Efficiency

### Misunderstanding Reduction

[Adopting Conventional Comments generates measurable improvement in technical communication](https://dev.to/tsotsi1/enhancing-code-reviews-with-conventional-comments-2j9i)³. Teams report:

- **Significant reduction in back-and-forth** in Pull Requests
- **Immediate priority clarification** between suggestions and critical issues
- **Review process acceleration** thanks to explicit categorization

### Parsability and Automation

[The standardized format enables automation of comment analysis](https://aaronbos.dev/posts/case-for-conventional-comments)⁴, facilitating:

- **Quality metrics** for code reviews
- **Pattern identification** of recurring comments
- **Report generation** on the most frequent feedback types

---

## Integration in Existing Workflows

### Progressive Adoption

[Implementing Conventional Comments requires a methodical approach](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/)⁵:

1. **Team awareness** of standardization benefits
2. **Practical training** on different labels and their appropriate usage
3. **Validation tool integration** in existing Git workflows
4. **Continuous evaluation** of impact on review efficiency

### Implementation Best Practices

**Comment specificity**: [Avoid vague comments like "this code is bad" in favor of precise observations with improvement suggestions](https://stackoverflow.blog/2019/09/30/how-to-make-good-code-reviews-better)⁶.

**Feedback balance**: Integrate positive comments (praise) alongside improvement suggestions to maintain a constructive collaborative environment.

**Blocking/non-blocking distinction**: [Explicitly clarify which comments block the merge and which relate to continuous improvement](https://www.swarmia.com/blog/a-complete-guide-to-code-reviews/)⁷.

---

## Measurable Organizational Benefits

### Code Quality Improvement

Comment standardization facilitates identification of quality patterns and recurring improvement areas. Teams can thus:

- **Target technical training** on the most frequent issues
- **Optimize processes** by automating recurring issue checks
- **Maintain consistent quality level** regardless of team composition

### Reinforced Collaborative Culture

[Conventional Comments encourage a constructive feedback culture](https://daily.dev/blog/10-code-commenting-best-practices-for-developers)⁸ where each comment provides clear technical value. This approach transforms code reviews into efficient collaborative learning sessions.

---

## Conclusion: Towards Optimized Technical Communication

Adopting Conventional Comments goes beyond simple formal standardization to become a lever for improving technical communication. This approach structures exchanges, clarifies priorities, and transforms code reviews into an efficient continuous improvement process.

The initial investment in training and process adaptation quickly translates into measurable productivity gains and improved team satisfaction in their daily technical interactions.

---

## Sources

1. [Conventional Comments Specification](https://conventionalcomments.org/) - ConventionalComments.org
2. [Better feedback in Code Reviews with Conventional Comments](https://dev.to/jacobandrewsky/better-feedback-in-code-reviews-with-conventional-comments-2c3k) - DEV Community
3. [Enhancing Code Reviews with Conventional Comments](https://dev.to/tsotsi1/enhancing-code-reviews-with-conventional-comments-2j9i) - DEV Community
4. [My Case for Conventional Comments](https://aaronbos.dev/posts/case-for-conventional-comments) - Aaron Bos
5. [Best Practices for Code Review](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/) - SmartBear
6. [How to Make Good Code Reviews Better](https://stackoverflow.blog/2019/09/30/how-to-make-good-code-reviews-better) - Stack Overflow
7. [A complete guide to code reviews](https://www.swarmia.com/blog/a-complete-guide-to-code-reviews/) - Swarmia
8. [10 Code Commenting Best Practices for Developers](https://daily.dev/blog/10-code-commenting-best-practices-for-developers) - Daily.dev