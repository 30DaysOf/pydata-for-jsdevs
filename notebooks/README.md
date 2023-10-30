# Notes on Notebooks

## 1. Project LIDA

The `dataviz-lida-explore` Notebook is based on [Microsoft LIDA](https://github.com/microsoft/lida) --man open-source Python library for the _automatic generation of data visualizations and data-faithful infographics_ using Large Language Models.  Here's a little context for it's usage.

### 1.1 About LIDA

LIDA is grammar agnostic (will work with any programming language and visualization libraries e.g. matplotlib, seaborn, altair, d3 etc) and works with multiple large language model providers (OpenAI, Azure OpenAI, PaLM, Cohere, Huggingface). 
 * 🔬 | | Read [this paper](https://browse.arxiv.org/pdf/2303.02927.pdf) for more details on the research
 * 📗 | See [this notebook](https://github.com/microsoft/lida/blob/main/notebooks/tutorial.ipynb) for a sample tutorial.
 * 💻 | Check out [this website](https://microsoft.github.io/lida/) for project updates.
 * ⭐️ | Star [this repo](https://github.com/microsoft/lida) if you like the project.
 * 📽 | Watch [this video](https://vimeo.com/820968433) for a quick walkthrough of LIDA in action.

### 1.2 Quickstart: Codespaces

 * The [lida-codespaces](https://github.com/lida-project/lida-codespaces) is setup for us with a devcontainer and Jupyter Notebooks
 * It can be further customized for specific LLM providers or models. For now, it is setup for use with `openai` by default.
 * To use OpenAI - you need an OpenAI API key.
    - Make a copy of the `.env.copy` file to `.env` in the root folder.
    - Update the `OPENAI_API_KEY` environment variable in `.env` with your api key and save.
    - This approach should work on both GitHub Codespaces and Docker Desktop

### 1.3 Troubleshooting: 

When running in a dev container (vs. your own local installed environment) you may encounter this error message: `ModuleNotFoundError: No module named '_lzma'` 👉🏽 This seems to be a frequently-encountered issue. Python 3.3 and later should provide this module by default - but in some cases the _lzma-dev_ package is not installed correctly and the module does not seem to resolve for imports. 

After multiple trial-and-error runs, the [approach defined in this article](https://support.huawei.com/enterprise/en/doc/EDOC1100289998/db0db8f0/modulenotfounderror-no-module-named-_lzma-) seemed to work to fix the issue. Required steps are:
1. Install the `liblzma-dev` system dependency first | 👉🏽  `sudo apt-get install -y liblzma-dev`
2. Install the `lzma` Python module next | 👉🏽  `pip3 install backports.lzma`
3. Modify the system `lzma.py` file to handle error | 👉🏽  `vi /usr/local/python/3.10.8/lib/python3.10/lzma.py`

In that file replace the first file below with the second. Then clear Notebook inputs and `Run all` again - and issue should resolve.

```python
from _lzma import *
from _lzma import _encode_filter_properties, _decode_filter_properties
```

with:

```python
try:
    from _lzma import *
    from _lzma import _encode_filter_properties, _decode_filter_properties
except ImportError:
    from backports.lzma import *
    from backports.lzma import _encode_filter_properties, _decode_filter_properties
```

> [!WARNING]  
> 🚨 | This is not ideal (the better solution is to get the right Pyhon devcontainer with the `lzma` installation done correctly). For now, this repo has a `.devcontainer` folder and `post-create-command.sh` scripts set up to do this patch for you automatically when you start a dev container.

### 1.4 LIDA Python API

- Lida offers a manager class that exposes core functionality of the LIDA system. 
- This tutorial will show you how to use the manager class to create visualizations based on a dataset.

### 1.5 Multiple LLM Backends

- LIDA supports multiple LLM backends such as openai, cohere, palm, huggingface etc. 
- You can switch between backends by setting the text_gen parameter in the Manager class. 
- By default, LIDA uses the openai backend.  

✨ | **For a list of supported models and how to configure them, see the [llmx documentation](https://github.com/victordibia/llmx).**

```python
from lida import llm

text_gen = llm("openai") # for openai
text_gen = llm(provider="openai", api_type="azure", api_base=os.environ["AZURE_OPENAI_BASE"], api_key=os.environ["AZURE_OPENAI_API_KEY"],    api_version="2023-07-01-preview") # for azure openai
text_gen = llm("cohere") # for cohere
text_gen = llm("palm") # for palm
text_gen = llm(provider="hf", model="uukuguy/speechless-llama2-hermes-orca-platypus-13b", device_map="auto")

lida = Manager(llm=text_gen)
```

✨ | **Note that you can set llm keys as follows:**

```bash
export OPENAI_API_KEY=<your key>
export COHERE_API_KEY=<your key>
# for PaLM
export PALM_SERVICE_ACCOUNT_KEY_FILE=<path to gcp service account key file>
export PALM_PROJECT_ID=<your gcp project id>
```