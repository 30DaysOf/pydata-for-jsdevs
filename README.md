# PyData For JS Devs

This repository contains documentation and tutorials that can help a JavaScript (or any non-Python) developer get skilled up in data analysis using Python, with the help of AI assistance. 


## Mission Statement

Build content and samples to help non-Python developers navigate data science projects in a self-guided manner such that we:

 - Cultivate _consistency_ in development environments with **GitHub Codespaces**.
 - Cultivate _curiosity_ in self-guided learning journeys with **GitHub Copilot** and **Open AI**.
 - Cultivate _collaboration_ by developing content and code with **Jupyter Notebooks** and **Python**.

For some projects (e.g., USACO), the goal is to also foster a culture of contribution to open-source efforts for a new generation of devs.

## Motivation

The project is inspired by some challenges and opportunities I encountered as both a web developer and an educator. You can learn more about my story from [this talk](https://nyc2023.pydata.org/cfp/talk/D9BGVX/) at PyData NYC in November 2023. 

Here are some of the use cases I wanted to tackle:

- [USA Computing Olympiad](https://usaco.guide/general/choosing-lang) - a competitive programming contest for high-schoolers. Currently has Python as one of 3 languages supported for submissions - but its the least-supported in terms of content solutions. _Can I use Copilot and Jupyter Notebooks to build a curriculum and interactively explore competitive problem solving challenges with my high-schooler in a discussion-driven approach that cultivates curiosity?_

- [Accessibility Test Reports](https://playwright.dev/docs/accessibility-testing#exporting-scan-results-as-a-test-attachment) - Web Accessibility compliance continues to be a critical problem with [96% of top sites still showing failures.](https://webaim.org/projects/million/#wcag). Tools like Playwright help generated automated test reports - but analyzing the data in bulk reports is not easy. _Can I use Copilot to write Python code that visualizes the data - and by doing this also gain skills and understanding of key tools and techniques for data analysis with Python?_
- [Prompt Engineering Exploration](https://github.com/microsoft/generative-ai-for-beginners/tree/main/04-prompt-engineering-fundamentals) - Generative AI is becoming more popular - and prompt construction and engineering are becoming a key skill for developers. Most LLM providers provide a Python SDK and/or API that can be used to interactively explore this topic and gain intuition for usage within application domains of interest. _Can I use Jupyter Notebooks with OpenAI API key integration to explore my own intuition around prompt engineering - and document my learnings interactively to build prompt libraries for key needs?_
- [Automatic Generation of Visualiztions using LLM](https://github.com/microsoft/lida) - Projects like Microsoft LIDA now allow us to use natural language queries to generate visualizations around our data. They can visualize things based on an explicit query - but can also take the extra step of figuring out visualizations or infographics that may be of interest that you may not have thought of. _Can I use such tools interactively and build my own intuition and expertise on data analysis and visualization by learning from generated code and outcomes?_

## Consistent Environment: Dev Containers

The first challenge is to setup a development environment that I and my collaborators (e.g, my high-school son) can use
 - from anywhere (any device)
 - with a _repeatable_ runtime so setup effort is minimal
 - with a _consistent_ environment for easy debug across users

[GitHub Codespaces with Jupyter Notebooks](https://github.com/github/codespaces-jupyter) makes this easy!
 - Dev Container uses _configuration as code_ for repeatability.
 - Default container supports _universal dev_ (Python, Node.js etc.)
 - The `requirements.txt` supports auto-updates post-setup.
 - The `customizations` for VS Code extensions set consistent IDE


## Learning Resources 
The dev container can be used with either GitHub Codespaces (online, in the cloud) or with Docker Desktop (offline, in local device). It is set up for default usage with a Visual Studio Code editor frontend. With this in mind, here are some learning resources for beginners:

1. [Python Developer Roadmap](https://roadmap.sh/python) - step-by-step topics guidance for learning
1. [Get Started with Python in VS Code](https://code.visualstudio.com/docs/python/python-tutorial) - learn fundamentals.
1. [Data Science in VS Code](https://code.visualstudio.com/docs/datascience/overview) - skill up on Jupyter Notebooks!
1. [GitHub Codespaces for Machine Learning](https://docs.github.com/en/codespaces/developing-in-a-codespace/getting-started-with-github-codespaces-for-machine-learning) - build classifiers & more.
1. [OpenAI Cookbook](https://github.com/openai/openai-cookbook) - example code, guides for prompt engineering
1. [Getting Started With GitHub Copilot](https://docs.github.com/en/copilot/getting-started-with-github-copilot) - understand capabilities
1. [GitHub Copilot: Fly with Python ...](https://realpython.com/github-copilot-python/#navigate-an-unfamiliar-framework-or-library) - RealPython community article
1. [How to use GitHub Copilot: Prompts, tips, use cases](https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/) - Github blog
1. [Create Dynamic Data Viz with OpenAI & React](https://www.linkedin.com/pulse/creating-dynamic-data-visualizations-openais-gpt-3-react-leniolabs/) - OSS Dashboard
1. [Chat with your CSV..](https://dev.to/ngonidzashe/chat-with-your-csv-visualize-your-data-with-langchain-and-streamlit-ej7) - OSS Demo with Langchain/Streamlit
1. [PandasAI](https://geekflare.com/pandasai-analyze-data-natural-language/) - Analyze data using natural lang (OpenAI, HuggingFace)

