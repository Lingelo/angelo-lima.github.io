---
layout: post
title: "Conventional Commits: Standardizing Git Messages for Optimized Collaboration"
subtitle: "Making your Git readable and avoiding driving your team crazy"
cover-img: /assets/img/conventional-commits.webp
thumbnail-img: /assets/img/thumb-conventional-commits.webp
share-img: /assets/img/conventional-commits.webp
tags: [Development]
author: Angelo Lima
lang: en
ref: conventional-commits
categories: en
---

## Commit Message Standardization: A Readability Challenge

Git commit messages constitute the historical documentation of a project. However, the absence of standardized conventions often generates unreadable histories: laconic messages like "fix", vague descriptions like "update", or temporary annotations like "WIP" that persist in the definitive history.

This problem directly affects project maintainability and team collaboration. [Conventional Commits provide a structured response to this challenge by defining a specification for standardized commit message writing](https://www.conventionalcommits.org/)¹.

---

## Conventional Commits Specification: Structure and Semantics

The [Conventional Commits specification](https://www.conventionalcommits.org/)¹ defines a standardized format that brings human and machine-readable meaning to commit messages.

### Formal Structure

A commit message following the convention follows this syntax:
```
<type>(scope): <description>

[optional body]

[optional footer]
```

This structure ensures consistency and facilitates automation of versioning and documentation processes.

---

## Commit Typology and Semantic Implications

### Main Commit Types

**feat**: Introduction of a new feature in the codebase (correlated with MINOR in semantic versioning).
Example: `feat(auth): add JWT authentication`

**fix**: Bug correction in the codebase (correlated with PATCH in semantic versioning).
Example: `fix(button): fix crash on button click`

**docs**: Documentation update without impact on production code.

**style**: Formatting, spacing, or style modifications not affecting business logic.

**refactor**: Code refactoring without feature addition or bug correction.

**test**: Addition or modification of unit or integration tests.

### Scope and Context

The optional scope specifies the project part affected by the commit, improving traceability:
```
feat(auth): JWT token validation
```

This granularity facilitates history navigation and understanding of changes by functional area.

---

## Impact on Automation and Semantic Versioning

### Integration with Semantic Versioning

[Conventional Commits integrate with semantic versioning (SemVer)](https://medium.com/opensight-ch/git-semantic-versioning-and-conventional-commits-564aece418a0)² by establishing direct correlations:

- **MAJOR**: commits with BREAKING CHANGE or `!` suffix
- **MINOR**: `feat` type commits
- **PATCH**: `fix` type commits

### Process Automation

[This standardization enables automation of several processes](https://www.sei.cmu.edu/blog/versioning-with-git-tags-and-conventional-commits/)³:

- **Automatic changelog generation** based on commit history
- **Automatic version number calculation** according to integrated commit types
- **CI/CD process triggering** according to modification nature
- **Release creation** with automated documentation

### Available Tooling

[Tools like semantic-release or standard-version](https://github.com/conventional-changelog/standard-version)⁴ exploit this convention to fully automate release workflows, eliminating human errors and ensuring version consistency.

---

## Organizational and Collaborative Advantages

### Team Communication

Adopting Conventional Commits transforms each commit into a structured information vector. [This approach significantly improves communication within development teams](https://dev.to/itxshakil/commit-like-a-pro-a-beginners-guide-to-conventional-commits-34c3)⁵ by:

- Clarifying the intention behind each modification
- Facilitating code reviews through better contextualization
- Accelerating understanding when resuming existing projects

### Long-term Maintainability

Structuring commit messages constitutes an investment for future project maintainability. It allows teams to:

- Quickly identify regression origins
- Understand functional evolution without exhaustive code analysis
- Facilitate onboarding of new developers

---

## Implementation and Adoption

### Integration in Existing Workflows

[Adopting Conventional Commits requires a progressive approach](https://dessign.net/git-best-practices/)⁶:

1. **Team training** on the specification and its benefits
2. **Internal guide definition** adapting the convention to project specificities
3. **Validation tool setup** like commitlint to ensure rule compliance
4. **CI/CD process integration** to fully exploit automation benefits

### Implementation Best Practices

- **Imperative messages**: use present imperative ("add" rather than "added")
- **Concise descriptions**: limit title line to 72 characters maximum
- **Detailed body**: use commit body to explain the "why" of complex modifications
- **Team consistency**: maintain uniform terminology for scopes

---

## Conclusion: Towards Living Code Documentation

Conventional Commits go beyond simple formalism to become a structured technical communication tool. This approach transforms Git history into living documentation, facilitating maintenance, automation, and collaboration.

[The initial investment in training and tooling quickly translates into measurable productivity gains](https://medium.com/@jsilvax/automate-semantic-versioning-with-conventional-commits-d76a9f45f2fa)⁷, particularly on long-term projects where history readability becomes critical.

Adopting this convention is part of a continuous improvement approach to development practices, where each commit contributes to the project's overall quality.

---

## Sources

1. [Conventional Commits Specification](https://www.conventionalcommits.org/) - ConventionalCommits.org
2. [GIT — Semantic versioning and conventional commits](https://medium.com/opensight-ch/git-semantic-versioning-and-conventional-commits-564aece418a0) - Medium OpenSight
3. [Versioning with Git Tags and Conventional Commits](https://www.sei.cmu.edu/blog/versioning-with-git-tags-and-conventional-commits/) - Software Engineering Institute
4. [Standard Version: Automate versioning and CHANGELOG generation](https://github.com/conventional-changelog/standard-version) - GitHub
5. [Commit Like a Pro: A Beginner's Guide to Conventional Commits](https://dev.to/itxshakil/commit-like-a-pro-a-beginners-guide-to-conventional-commits-34c3) - DEV Community
6. [8 Essential Git Best Practices for Dev Teams](https://dessign.net/git-best-practices/) - Dessign
7. [Automate Semantic Versioning with Conventional Commits](https://medium.com/@jsilvax/automate-semantic-versioning-with-conventional-commits-d76a9f45f2fa) - Medium JSilvax