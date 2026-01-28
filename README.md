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
<a href="#why-i-built-this">Why I Built This</a> ·
<a href="#the-problem">The Problem</a> ·
<a href="#how-it-works">How It Works</a> ·
<a href="#cost">Cost</a> ·
<a href="#install">Install</a>
</p>

<p align="center">
<img src="assets/demo.gif" alt="reciepts demo" width="600">
</p>

---

## Why I Built This

I review papers. I have seen citations that say the literal opposite of what the manuscript claims. Not fraud. Just human error. Memory is unreliable. Reading is hard. Deadlines are real.

LLMs made this worse. They confidently generate citation text that sounds right but is not. The paper exists. The author exists. The claim? Fabricated. [GPTZero found 100 hallucinated citations across 51 papers at NeurIPS 2024](https://techcrunch.com/2026/01/21/irony-alert-hallucinated-citations-found-in-papers-from-neurips-the-prestigious-ai-conference/). Those are the fake ones.

Nobody is counting the real papers that do not say what authors claim.

I built reciepts to fix that. One command. Parallel agents. Verbatim quotes. Done.

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

## How It Works

```
paper/
├── manuscript.pdf
└── sources/
    ├── ref_01.pdf
    ├── ref_02.pdf
    └── ...
```

Run one command:

```
/reciepts paper/
```

reciepts spawns one AI agent per citation, in parallel. 50 citations = 50 agents = 2 minutes.

Each agent:
1. Reads your manuscript, finds the claim
2. Reads the source, finds what it actually says
3. Compares them with verbatim quotes
4. Writes a verdict: VALID, ADJUST, or INVALID

You get a report:

```
# Citation Verification Report

| Status  | Count |
|---------|-------|
| VALID   | 47    |
| ADJUST  | 2     |
| INVALID | 1     |

## Issues Found

### [23] Smith et al. (2020)

**Claim:** "achieved 99% accuracy on all benchmarks"
**Source:** "achieves 73% accuracy on the standard benchmark"
**Fix:** Change "99%" to "73%", remove "all benchmarks"
```

Fix before your reviewer finds it.

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

## Install

Requires [Claude Code](https://claude.ai/code).

```bash
npx reciepts
```

Then run:

```
/reciepts <path-to-paper-folder>
```

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
