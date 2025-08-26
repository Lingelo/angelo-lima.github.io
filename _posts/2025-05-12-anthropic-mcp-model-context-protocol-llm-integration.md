---
layout: post
title: "Model Context Protocol (MCP): Revolution in LLM Integration with Third-Party Systems"
subtitle: "Discover how MCP facilitates language model interaction with Atlassian tools and other connected systems"
cover-img: /assets/img/mcp-atlassian-cover.webp
share-img: /assets/img/mcp-atlassian-cover.webp
tags: [AI, Development]
author: Angelo Lima
lang: en
ref: anthropic-mcp
categories: en
---

## What is the MCP Protocol?

### A Bit of Context

Large language models (LLMs) are limited to information available at the time of their training. However, there are methods to enrich these models with more recent or detailed knowledge. One of these methods is the RAG (Retrieval-Augmented Generation) system. This system works in two steps: it divides information into small units called vectors and uses sophisticated retrieval techniques to quickly and efficiently access necessary data. Thus, models can provide more current responses by incorporating up-to-date information from external sources like files, for example.

While the RAG system offers considerable advantages for keeping models up-to-date, it also presents disadvantages. Implementing RAG can be complex and resource-intensive, as it requires infrastructure capable of processing and storing large amounts of data in vector form. Additionally, the quality of responses heavily depends on the information sources used; if these sources are biased or inaccurate, it can affect the reliability of the model's responses. Response time can also be lengthened since the model must process the query and search for relevant information, which can slow down the response generation process. Finally, maintaining the database up-to-date represents additional effort due to the system's sophistication. This requires constant monitoring and updating of data to ensure that information used by the model remains relevant and accurate.

In addition to RAG systems, the evolution of LLMs has enabled the integration of additional functionalities, called "tools," which allow them to dynamically interact with external applications. These tools give LLMs the ability to execute code, call specific functions, or access databases to enrich their responses. This interaction not only expands the scope of LLMs but also their efficiency and relevance in various contexts.

An important innovation in this field is the MCP (Model Context Protocol), which revolutionizes how models manage context and information usage. MCP allows LLMs to more efficiently manage contextual information and incorporate new relevant data in real-time. This protocol offers an architecture that facilitates fluid and adaptable communication between models and external data sources, thus optimizing the relevance and accuracy of provided information.

### Why is the MCP Protocol Important?

The MCP protocol doesn't make an artificial intelligence more "intelligent" per se, but it revolutionizes how it interacts with external systems such as databases and APIs. This evolution continues the reflections I've shared on [the ecological impact of AI](/en/ai-ecological-impact-training-vs-inference-environmental-costs/), where interaction efficiency becomes crucial for reducing energy costs. This protocol relies on the concepts of tools and context, implementing MCP servers that present LLMs with a list of tools. This structure considerably simplifies communication with third-party systems, making information exchange more fluid and efficient.

The protocol is an open-source project developed by Anthropic (the creator of Claude). Many programming languages, such as Python, Java, C++, TypeScript, Kotlin, and C#, are supported. The proposed approach is simple and standard for connecting to third-party resources. Examples of servers are available on the GitHub repository [here](https://github.com/modelcontextprotocol/servers). Among these examples, we find integrations with _GitHub_, _Atlassian_ (Confluence - JIRA), _Postgres_, and many others.

### Example of MCP Server and Its Usage (mcp-atlassian)

With the continuous development of the MCP protocol, specific implementations like MCP-Atlassian emerge, facilitating integration with popular collaborative tools such as Atlassian. Here's a tutorial to guide you through installing MCP-Atlassian and integrating it with Claude Desktop.

### Installing MCP-Atlassian via Docker

#### Server Installation

1. **Prerequisites**  
   Make sure you have Docker installed on your machine. If not, download and install it from the [official Docker website](https://www.docker.com/get-started).

2. **Clone the repository**
   ```bash
   git clone https://github.com/sooperset/mcp-atlassian.git && cd mcp-atlassian
   ```
3. **Configure environment variables**
   In the current directory, you'll find a `.env.example` file. Copy it:
   ```bash
   cp .env.example .env
   ```
   Then edit this file to change the following environment variables:
   * `JIRA_URL`: The URL to your JIRA
   * `JIRA_USERNAME`: Your email
   * `JIRA_API_TOKEN`: The Atlassian API token, obtainable here
   * `CONFLUENCE_URL`: The URL to your Confluence
   * `CONFLUENCE_API_TOKEN`: Same as `JIRA_API_TOKEN`
4. **Download the Docker image**
   ```bash
   docker pull ghcr.io/sooperset/mcp-atlassian:latest
   ```
5. **Launch the MCP server in SSE mode**
   Still in the directory, execute the following command:
  ```bash
  docker run --rm -p 9000:9000 \
  --env-file .env \
  ghcr.io/sooperset/mcp-atlassian:latest \
  --transport sse --port 9000 -vv  
  ```
6. **Your server is started.**

#### Configuration in Claude Desktop

1. **Download the client**  
   Download the Claude Desktop client from [here](https://claude.ai/download).

2. **Create a configuration file**
    - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
    - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

3. **Add the following configuration**
   ```json
   {
     "mcpServers": {
       "mcp-atlassian-sse": {
         "url": "http://localhost:9000/sse"
       }
     }
   }
   ```
4. **Restart Claude Desktop.**
5. **Usage**
   You can now use the MCP server in Claude Desktop. A hammer symbol should appear under the input field, indicating preloaded tools. Note that Claude will call the appropriate tool exposed by the server and ask you to approve data retrieval.
 
   **Note:** To be able to chain commands in Claude Desktop, the free Anthropic plan may not be sufficient.

### Conclusion

The MCP protocol, with its advanced integration and context management capabilities, represents a significant innovation in the use of large language models. It's not limited to just making models more flexible and adaptive, but also paves the way for improved interactions with third-party systems and tools. Through this approach, MCP enables increased collaboration between models and the surrounding digital ecosystem, facilitating continuous and reactive evolution of models according to current needs. With practical implementations like MCP-Atlassian, it becomes more accessible for users to leverage these technological advances, potentially transforming how organizations interact with data and daily tools. These developments hint at a future where LLMs will play an even more central and dynamic role in various sectors, reinforcing their impact on how we work and communicate.