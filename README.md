<h1 align="center">RECIEPTS</h1>

<p align="center">
<strong>GPTZero finds fake citations. reciepts finds real citations that don't say what you claim.</strong>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/reciepts"><img src="https://img.shields.io/npm/v/reciepts.svg" alt="npm version"></a>
<a href="https://github.com/JamesWeatherhead/reciepts/stargazers"><img src="https://img.shields.io/github/stars/JamesWeatherhead/reciepts" alt="GitHub stars"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
</p>

<p align="center">
<img src="assets/terminal.png" alt="reciepts" width="550">
</p>

---

## Why I Built This

I review papers. I have seen citations that say the literal opposite of what the manuscript claims. Not fraud. Just human error. Memory is unreliable. Reading is hard. Deadlines are real.

LLMs made this worse. They confidently generate citation text that sounds right but is not. The paper exists. The author exists. The claim? Fabricated. [GPTZero found 100 hallucinated citations across 51 papers at NeurIPS 2024](https://techcrunch.com/2026/01/21/irony-alert-hallucinated-citations-found-in-papers-from-neurips-the-prestigious-ai-conference/). Those are the fake ones.

Nobody is counting the real papers that do not say what authors claim.

I built reciepts to fix that. One command. Parallel agents. Verbatim quotes. Done.

---

## Getting Started

### Step 1: Install Claude Code

reciepts runs inside [Claude Code](https://docs.anthropic.com/en/docs/claude-code), Anthropic's AI coding tool.

```bash
npm install -g @anthropic-ai/claude-code
```

### Step 2: Install reciepts

Run this in your terminal:

<p align="center">
<img src="assets/screenshots/step1.png" alt="Step 1: npx reciepts" width="450">
</p>

This installs the `/reciepts` command into Claude Code. You only need to do this once.

### Step 3: Set up your paper folder

Put your manuscript and source PDFs in a folder like this:

<p align="center">
<img src="assets/screenshots/step2.png" alt="Step 2: Folder structure" width="350">
</p>

- Your manuscript goes in the root
- Source PDFs go in a `sources/` subfolder
- Name sources to match your references (ref_01.pdf, ref_02.pdf, etc.)

### Step 4: Run reciepts

Open Claude Code, navigate to your paper folder, and run:

<p align="center">
<img src="assets/screenshots/step3.png" alt="Step 3: Run /reciepts" width="500">
</p>

reciepts spawns one AI agent per citation, in parallel. 50 citations = 50 agents = 2 minutes.

Each agent reads your claim, reads the source, compares them with verbatim quotes, and writes a verdict.

---

## The Problem

Your manuscript says:
> "Smith et al. achieved **99% accuracy** [1]"

The source actually says:
> "Our method achieves **73% accuracy**"

This happens constantly:
- You cited from memory (it has been six months)
- You skimmed the abstract (who reads methods?)
- An LLM "helped" you write it
- You confused two papers with similar titles

---

## Verdicts

| Status | Meaning |
|--------|---------|
| **VALID** | Source supports your claim |
| **ADJUST** | Minor correction needed (numbers, wording) |
| **INVALID** | Source contradicts or does not support claim |

---

## Cost

Cheaper than retraction. More thorough than memory.

| Paper Size | Refs | Haiku 3.5 | Sonnet 4 | Opus 4.5 |
|------------|------|-----------|----------|----------|
| Short (3 pages) | 10 | ~$0.50 | ~$2 | ~$9 |
| Medium (5 pages) | 25 | ~$1.30 | ~$5 | ~$24 |
| Full (10 pages) | 50 | ~$3 | ~$11 | ~$56 |

Use Haiku for drafts. Opus for final submission. Your career is worth $56.

---

## Who This Is For

- PhD students submitting dissertations
- Researchers publishing in peer reviewed journals
- Graduate students writing theses
- Authors using AI writing assistants
- Reviewers who want to spot check papers

---

## Legal

You need rights to the PDFs you verify. Use open access papers, your own manuscripts, or properly licensed documents.

---

## License

MIT

---

<p align="center">
<strong>Your citations are only as good as your memory. reciepts is better than your memory.</strong>
</p>
