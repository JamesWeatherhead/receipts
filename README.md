<h1 align="center">RECIEPTS</h1>

<p align="center">
<strong>Verify your citations actually say what you claim they say.</strong>
<br><br>
Every academic knows the fear: <em>Did I remember that paper correctly?</em> You cited 50 sources. You're not re-reading all of them. Neither is your reviewer. But what if one says the opposite of what you wrote?
</p>

<p align="center">
<a href="https://www.npmjs.com/package/reciepts"><img src="https://img.shields.io/npm/v/reciepts.svg" alt="npm version"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
</p>

```bash
npx reciepts
```

<p align="center">Works on Mac, Windows, and Linux.</p>

<p align="center">
<img src="assets/terminal.png" alt="reciepts install" width="600">
</p>

---

## The Problem

Your manuscript says:
> "Smith et al. achieved **99% accuracy** [1]"

The source actually says:
> "Our method achieves **73% accuracy**"

This happens constantly:
- You cited from memory
- You misread the abstract
- An LLM "helped" you write it
- You confused two similar papers

**GPTZero finds fake citations. reciepts finds real citations that don't say what you claim.**

---

## How It Works

```
paper/
├── manuscript.pdf      # Your paper
└── sources/
    ├── ref_01.pdf      # The papers you cited
    ├── ref_02.pdf
    └── ...
```

Run one command:

```
/reciepts paper/
```

reciepts spawns **one AI agent per citation** (parallel). Each agent:
1. Reads your manuscript - finds the claim
2. Reads the source - finds what it actually says
3. Compares them - verbatim quotes, no paraphrasing
4. Writes a verdict - VALID, ADJUST, or INVALID

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

## Cost

One agent per reference. Cost depends on paper size and model.

| Paper Size | Refs | Opus 4.5 | Sonnet 4 | Haiku 3.5 |
|------------|------|----------|----------|-----------|
| Short (3 pages) | 10 | ~$9 | ~$2 | ~$0.50 |
| Medium (5 pages) | 25 | ~$24 | ~$5 | ~$1.30 |
| Full (10 pages) | 50 | ~$56 | ~$11 | ~$3 |

**Recommendation:** Haiku for drafts. Opus for final submission.

---

## Why I Built This

I review papers. I've seen citations that say the literal opposite of what the manuscript claims. Not maliciously—just human error. Memory is unreliable. Reading is hard. Deadlines are real.

LLMs made this worse. They confidently generate citation text that sounds right but isn't. The paper exists. The author exists. The claim? Fabricated. [GPTZero found 100 hallucinated citations across 51 papers at NeurIPS 2024](https://techcrunch.com/2026/01/21/irony-alert-hallucinated-citations-found-in-papers-from-neurips-the-prestigious-ai-conference/) — and those are just the fake ones.

Existing tools catch fake citations (papers that don't exist). Nothing catches **wrong citations** (papers that exist but don't support your claim).

So I built reciepts. One command. Parallel agents. Verbatim quotes. No bullshit.

---

## Verdicts

| Status | Meaning |
|--------|---------|
| **VALID** | Source supports your claim |
| **ADJUST** | Minor correction needed (numbers, wording) |
| **INVALID** | Source contradicts or doesn't support claim |

---

## Install

```bash
npx reciepts
```

Then in Claude Code:

```
/reciepts <path-to-paper-folder>
```

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
