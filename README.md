# reciepts

**Parallel citation verification for scientific manuscripts.**

Verify that your citations actually say what you claim they say.

---

## Installation

```bash
npx reciepts
```

Installs slash commands to `~/.claude/commands/reciepts/`.

Then in Claude Code:

```
/reciepts:help      # See all commands
/reciepts:init      # Initialize a paper
/reciepts:verify    # Run verification
/reciepts:report    # Generate report
```

Uninstall:
```bash
npx reciepts --uninstall
```

---

## The Problem

GPTZero found [100+ fabricated citations](https://gptzero.me/news/neurips/) in NeurIPS 2025 papers. But those are citations that *don't exist*.

What about citations that exist but *don't support your claim*?

- You wrote: "Smith et al. showed a 40% improvement"
- Smith et al. actually wrote: "37% improvement under limited conditions"

- You wrote: "distributed under the MIT license"
- Source actually says: "distributed under the BSD license"

That's the gap reciepts fills.

---

## How It Works

```
Your manuscript (50 citations)
           |
           v
   ┌───────────────┐
   │  Parse refs   │
   └───────────────┘
           |
           v
  ┌────────┼────────┐
  v        v        v
┌─────┐  ┌─────┐  ┌─────┐
│Agent│  │Agent│  │Agent│  ... (parallel)
│ #1  │  │ #2  │  │ #50 │
└─────┘  └─────┘  └─────┘
  │        │        │
  v        v        v
verdict  verdict  verdict
           |
           v
   ┌───────────────┐
   │   Aggregate   │
   └───────────────┘
           |
           v
     RECIEPTS.md
```

1. **You provide**: manuscript + source documents
2. **System spawns**: one agent per citation (parallel)
3. **Each agent**: extracts verbatim quotes from both documents
4. **You get**: evidence-based verdicts on every citation

---

## Verdict Categories

| Status | Meaning | Action |
|--------|---------|--------|
| VALID | Source supports your claim | None |
| ADJUST | Minor discrepancy | Edit your text |
| INVALID | Source doesn't support claim | Fix or remove citation |
| UNCLEAR | Can't verify | Review manually |

---

## Example Verdict

```markdown
---
reference: 1
status: ADJUST
citation: "Srivastava et al. (2014). Dropout..."
instances: 2
---

# Verdict: Reference 1

## Summary

Two claims about the Dropout paper need correction: the dropout rate
recommendation oversimplifies the original guidance, and the MNIST
error rate is misquoted.

## Citation Instances

### Instance 1

**Location:** Section 2, paragraph 2

**Manuscript claims:**
> the optimal dropout probability is p=0.5 for all layers

**Source states:**
> All dropout nets use p=0.5 for hidden units and p=0.8 for input units.

**Assessment:** PARTIALLY SUPPORTED

**Discrepancy:** Manuscript oversimplifies - different rates for hidden (0.5) vs input (0.8) layers

---

### Instance 2

**Location:** Section 2, paragraph 2

**Manuscript claims:**
> achieved an error rate of 0.89% on MNIST

**Source states:**
> Error rates can be further improved to 0.94%

**Assessment:** NOT SUPPORTED

**Discrepancy:** Wrong number: 0.89% vs 0.94%

---

## Required Corrections

1. Change "p=0.5 for all layers" to "p=0.5 for hidden units and p=0.8 for input units"
2. Change "0.89%" to "0.94%"
```

---

## Quick Start

### 1. Install

```bash
npx reciepts
```

### 2. Setup paper folder

```bash
mkdir -p paper/sources
cp manuscript.pdf paper/
cp ref1.pdf ref2.pdf paper/sources/
```

### 3. Initialize and verify

In Claude Code:
```
/reciepts:init paper
/reciepts:verify paper
```

### 4. Get report

```
/reciepts:report paper
```

Or view directly:
```bash
cat paper/RECIEPTS.md
```

---

## Comparison with GPTZero

| | GPTZero | reciepts |
|-|---------|----------|
| Question | Does this citation exist? | Does this citation support the claim? |
| Method | Bibliographic verification | Semantic verification |
| Catches | Fabricated references | Misrepresented references |

They're complementary. Run both.

---

## FAQ

**Q: Do I need to provide the source documents?**

Yes. Download them, put them in `sources/`. The agents read them.

**Q: What formats are supported?**

PDF, DOCX, and Markdown for both manuscript and sources.

**Q: How long does it take?**

Depends on document length, but agents run in parallel. A 50-citation paper typically completes in 2-3 minutes.

**Q: Can this check my paper before submission?**

Yes. That's the point. Run it before you submit.

---

## Commands

| Command | Description |
|---------|-------------|
| `/reciepts` | Overview and quick start |
| `/reciepts:init <path>` | Parse manuscript, create checklist |
| `/reciepts:verify <path>` | Spawn parallel verification agents |
| `/reciepts:report <path>` | Generate final report |
| `/reciepts:help` | Show all commands |

---

## Demo

The `demo/` folder contains a working example using real JMLR papers (CC BY 4.0):

- [Srivastava et al. (2014) - Dropout](https://jmlr.org/papers/v15/srivastava14a.html)
- [Pedregosa et al. (2011) - Scikit-learn](https://jmlr.org/papers/v12/pedregosa11a.html)

The demo manuscript contains intentional errors that reciepts catches:

| Reference | Error | Manuscript | Source |
|-----------|-------|------------|--------|
| Dropout | Rate | "p=0.5 for all layers" | "p=0.5 hidden, p=0.8 input" |
| Dropout | MNIST | "0.89%" | "0.94%" |
| Sklearn | Language | "entirely in Python" | "primarily in Python" |
| Sklearn | Count | "100+ algorithms" | not specified |
| Sklearn | Authors | "12" | "16" |
| Sklearn | License | "MIT" | "BSD" |

Run it:
```
cd demo
/reciepts:init .
/reciepts:verify .
/reciepts:report .
```

---

## Legal Disclaimer

**You are responsible for ensuring you have the right to use any documents you upload.**

Before uploading any document:

- Ensure you have legal access (purchased, open access, institutional access)
- Respect copyright and licensing terms
- Check your institution's policies on AI tool usage

The authors of this tool accept no responsibility for how you obtain or use source documents.

Safe options:
- Open access papers (look for CC BY license)
- Papers you authored
- Documents explicitly licensed for reuse

---

## Citation

```bibtex
@software{reciepts2026,
  author = {Weatherhead, James},
  title = {reciepts: Parallel Citation Verification for Scientific Manuscripts},
  year = {2026},
  url = {https://github.com/JamesWeatherhead/reciepts}
}
```

---

## License

MIT
