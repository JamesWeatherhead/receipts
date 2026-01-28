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

## Quick Start (5 minutes)

### 1. Install Claude Code

reciepts runs inside Claude Code. If you do not have it:

```bash
npm install -g @anthropic-ai/claude-code
```

No npm? [Get Node.js first](https://nodejs.org/).

### 2. Install reciepts

Open Terminal. Run this command:

<p align="center">
<img src="assets/screenshots/step1.png" alt="Run npx reciepts" width="500">
</p>

```bash
npx reciepts
```

You will see a receipt banner. That means it worked. This installs the `/reciepts` command into Claude Code.

**You only do this once.**

### 3. Set up your paper folder

Create a folder with your manuscript and source PDFs:

<p align="center">
<img src="assets/screenshots/step2.png" alt="Folder structure" width="380">
</p>

```
thesis/
├── my_dissertation.pdf    ← your paper (any name works)
└── sources/               ← create this folder
    ├── smith_2020.pdf     ← the PDFs you cited
    ├── jones_2021.pdf
    └── chen_2019.pdf
```

**Important:**
- Put your manuscript in the root folder
- Create a `sources/` folder inside
- Put all your cited PDFs in `sources/`
- Name them however you want (reciepts will match them)

### 4. Run reciepts

Open Claude Code. Navigate to your paper folder. Type:

<p align="center">
<img src="assets/screenshots/step3.png" alt="Run /reciepts" width="500">
</p>

```
/reciepts
```

That is it. reciepts will:
1. Read your manuscript
2. Find every citation
3. Spawn one AI agent per citation (in parallel)
4. Check each source for what it actually says
5. Write a report to `RECIEPTS.md`

50 citations = 50 agents = about 2 minutes.

---

## What You Get

A report showing every citation and whether it checks out:

```
# Citation Verification Report

| Status  | Count |
|---------|-------|
| VALID   | 47    |
| ADJUST  | 2     |
| INVALID | 1     |

## Issues Found

### [23] Smith et al. (2020)

**Your claim:** "achieved 99% accuracy on all benchmarks"
**Source says:** "achieves 73% accuracy on the standard benchmark"
**Fix:** Change "99%" to "73%", remove "all benchmarks"
```

| Status | What it means |
|--------|---------------|
| **VALID** | Your citation is accurate |
| **ADJUST** | Small fix needed (wrong number, slightly off wording) |
| **INVALID** | Source does not support your claim at all |

---

## Cost

| Paper Size | Citations | Haiku 3.5 | Sonnet 4 | Opus 4.5 |
|------------|-----------|-----------|----------|----------|
| Short | 10 | ~$0.50 | ~$2 | ~$9 |
| Medium | 25 | ~$1.30 | ~$5 | ~$24 |
| Full | 50 | ~$3 | ~$11 | ~$56 |

Use Haiku for drafts. Opus for final submission. Your career is worth $56.

---

## Who This Is For

- PhD students submitting dissertations
- Researchers publishing papers
- Graduate students writing theses
- Anyone using AI writing assistants
- Reviewers who want to spot check

---

## FAQ

**Do I need an Anthropic API key?**
Yes. Claude Code requires one. [Get it here](https://console.anthropic.com/).

**What file formats work?**
PDF, Markdown, and Word docs.

**Can I exclude certain citations?**
Yes. Create `excluded_refs.txt` and list the ones to skip.

**What if a source PDF is missing?**
reciepts will tell you which ones it could not find.

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
