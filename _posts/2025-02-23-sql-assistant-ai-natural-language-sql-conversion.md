---
layout: post
title: "SQL Assistant AI: Natural Language to SQL Automatic Conversion"
subtitle: "An open-source tool to generate SQL queries in natural language and interact with your database"
cover-img: /assets/img/sql-assistant-cover.webp
share-img: /assets/img/sql-assistant-cover.webp
tags: [AI, Development]
author: Angelo Lima
lang: en
ref: sql-assistant
categories: en
---

# SQL Assistant AI: Natural Language to SQL Automatic Conversion

**SQL Assistant represents a personal project I developed to address a concrete need**: simplifying database interaction through a conversational interface. This open-source tool enables **automatic natural language to SQL query conversion** with **direct database execution capability**.

The project targets developers, data analysts, and occasional database users seeking a practical solution to interact with their storage systems without perfectly mastering SQL syntax.

This personal initiative continues my ongoing explorations of AI practical applications, complementary to my analyses on [AI system vulnerabilities](/en/llm-jailbreaking-security-analysis-bypass-mechanisms/) and the [ecological impact](/en/ai-ecological-impact-training-vs-inference-environmental-costs/) of these technologies.

**Project link:** [GitHub – SQL Assistant](https://github.com/Lingelo/sql-assistant)

---

## Architecture and Technical Features

### Main Capabilities

The tool integrates the following functionalities:

**Automated SQL generation**: Natural language query conversion to standard SQL syntax  
**Dual operation modes**: "basic" mode (generation without execution) and "tools" mode (direct execution)  
**Multi-model support**: Compatibility with various AI APIs (OpenAI, Mistral, local models)  
**PostgreSQL integration**: Native connection via Sequelize ORM  
**Flexible configuration**: Environmental adaptation via configuration files

### Technical Architecture

The application relies on a modular architecture integrating:

- **Interface layer**: Interactive CLI for end user
- **Translation engine**: Natural language → SQL conversion via language models
- **Database connector**: Standardized PostgreSQL interface
- **Configuration system**: Environment and connection parameter management

---

## Installation and Configuration

### Initial Deployment

```bash
git clone https://github.com/Lingelo/sql-assistant.git
cd sql-assistant
yarn install
```

### Environmental Configuration

Configuration is performed via an `.env` file defining the following parameters:

```ini
# AI Configuration
IA_HOST=http://localhost:11434/v1
IA_KEY=api-key
IA_MODEL_NAME=model-name

# Log configuration
LOG_LEVEL=info

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=username
DB_PASSWORD=password
DB_DATABASE=database_name
MODEL_PATH=./structure.sql
DIALECT=postgres  

# Execution mode
MODE=tools  # "tools" to execute queries, "basic" for chat mode
```

### Initialization

```bash
yarn start
```

---

## Usage Mode Analysis

### "basic" Mode: Generation Without Execution

This mode provides a consultation interface for SQL query generation without data execution risk:

```bash
Welcome to SQL assistant, what would you like to do?
> Select all products with a price greater than 100.
SQL Assistant:
SELECT * FROM products WHERE price > 100;
```

**Use cases**: Training, syntax validation, template generation

### "tools" Mode: Integrated Execution

This mode enables direct execution of generated queries with result display:

```bash
Welcome to SQL assistant, what would you like to do?
> Find all users whose email contains 'example.com'.
SQL Assistant:
SELECT * FROM users WHERE email LIKE '%example.com%';

Executing query…

| id | username | email             | created_at          |
|----|----------|-------------------|---------------------|
| 1  | johndoe  | john@example.com  | 2023-01-10 12:00:00|
...
```

**Use cases**: Ad-hoc data analysis, rapid reporting, database exploration

---

## Experience Feedback and Development Analysis

### Project Motivations

SQL Assistant development arose from a concrete observation: the friction between data query intention and its SQL translation often represents an obstacle, even for experienced developers. The objective was to create a practical tool, usable daily without excessive complexity.

### Technical Challenges Encountered

**Modular architecture**: The design privileged integration flexibility with different AI models (OpenAI, Mistral, local installations) to avoid unique provider dependency.

**SQL error management**: Implementation of a validation and feedback layer enables automatic correction of common syntax errors.

**Dual operation mode**: The distinction between "basic" mode (generation only) and "tools" mode (execution) responds to different security needs according to usage environments.

### Advantages Observed in Usage

**Accessibility**: Technical barrier reduction for non-SQL specialist users  
**Productivity**: Complex query generation acceleration  
**Flexibility**: Multiple AI model and usage mode support  
**Optional security**: Basic mode allowing validation before execution

### Identified Improvement Areas

**Multi-DBMS extension**: Current support limited to PostgreSQL could be extended to MySQL, SQLite, and other systems.

**User interface**: Moving from CLI to web interface would enable broader adoption, particularly for non-technical teams.

**Advanced semantic validation**: Adding logical coherence checks for queries would reduce interpretation errors.

### Production Environment Security Considerations

Production integration requires enhanced security measures:

- **Query sandboxing**: Execution isolation in controlled environments
- **Prior validation**: Automatic query analysis before execution
- **Access controls**: Integration with existing permission systems
- **Audit and logging**: Complete traceability of generated and executed queries

---

## Future Developments and Community Feedback

### Planned Extensions

The project continues to evolve according to several priority axes identified during initial development:

**Multi-DBMS support**: Extension toward MySQL, SQLite, and other popular systems  
**Web interface**: Migration toward a more accessible graphical interface  
**Semantic validation**: Advanced logical verification integration  
**Privilege management**: Role-based access control system

### Adoption and Feedback

**User experience feedback**: Initial feedback confirms the utility of "basic" mode for SQL learning and "tools" mode for rapid data analysis.

**Open contributions**: The project welcomes community contributions, particularly on database connector extensions.

**Code evolution**: Future improvements will be guided by real needs observed in practical usage.

---

## Comparative Evaluation

### Technical Differentiators

SQL Assistant positions itself in an ecosystem including:

- **Proprietary solutions**: GitHub Copilot, ChatGPT Code Interpreter
- **Specialized tools**: DBT, DataGrip AI Assistant
- **Open-source frameworks**: LangChain SQL agents, AutoGen

### Differentiation

**Deployment simplicity**: Minimal configuration for local usage  
**Transparency**: Accessible and modifiable source code  
**Specialization**: Exclusive focus on SQL generation versus generalist tools

---

## Conclusions

SQL Assistant represents a practical solution for democratizing database access via natural language. The tool demonstrates the technical viability of integrating generative AI into data manipulation workflows.

Identified limitations (mono-DBMS support, CLI interface, limited validation) constitute obvious improvement areas but don't invalidate the approach's utility for specific use cases.

The tool's future evolution will depend on the balance between usage simplicity and technical robustness, particularly concerning security and generated query validation aspects.

This solution contributes to the AI applied to development tools ecosystem and illustrates automation possibilities in structured data manipulation.

---

## Sources

- [SQL Assistant - GitHub Repository](https://github.com/Lingelo/sql-assistant)
- [Sequelize ORM - Documentation](https://sequelize.org/)
- [Natural Language to SQL - Research Literature](https://arxiv.org/abs/2204.00498)
- [Database Security Best Practices - OWASP Guidelines](https://owasp.org/www-project-top-ten/)