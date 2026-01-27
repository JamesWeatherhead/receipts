# reciepts 🧾

**Show me the receipts on your citations.**

A parallel multi-agent system that verifies your citations actually say what you claim they say.

---

## The Problem

GPTZero found [100+ fabricated citations](https://gptzero.me/news/neurips/) in NeurIPS 2025 papers. But that's just citations that *don't exist*.

What about citations that exist but *don't support your claim*?

- You wrote: "Smith et al. showed a 40% improvement"
- Smith et al. actually wrote: "37-43% in limited conditions"

- You wrote: "requires IRB waiver"
- Source actually says: "requires IRB approval"

**That's the gap `reciepts` fills.**

---

## How It Works

```
Your manuscript (50 citations)
            │
            ▼
    ┌───────────────┐
    │  Coordinator  │
    │  Parse refs   │
    └───────────────┘
            │
            ▼
   ┌────────┼────────┐
   ▼        ▼        ▼
┌─────┐  ┌─────┐  ┌─────┐
│Agent│  │Agent│  │Agent│  ... (50 parallel agents)
│ #1  │  │ #2  │  │ #50 │
└─────┘  └─────┘  └─────┘
   │        │        │
   ▼        ▼        ▼
verdict  verdict  verdict
  .md      .md      .md
            │
            ▼
    ┌───────────────┐
    │  Synthesizer  │
    │  Aggregate    │
    └───────────────┘
            │
            ▼
      RECIEPTS.md
      (full report)
```

1. **You provide**: manuscript + source PDFs
2. **System spawns**: one agent per citation (parallel)
3. **Each agent**: reads your claim + reads source + writes verdict
4. **You get**: receipts on every citation

---

## Verdict Categories

| Status | Meaning | Action |
|--------|---------|--------|
| ✓ VALID | Source supports your claim | None |
| ⚠️ ADJUST | Minor discrepancy | Edit your text |
| ✗ INVALID | Source doesn't support claim | Fix or remove citation |
| ? UNCLEAR | Can't verify | Get source, review manually |

---

## Example Verdict

```markdown
STATUS: ⚠️ ADJUST

CLAIM IN PAPER:
> "Epic SlicerDicer requires IRB waiver for cohorts of 11 or fewer patients"

WHAT SOURCE ACTUALLY SAYS:
> "cohorts of 11 or fewer require IRB approval when viewing low cohort
> numbers via Epic reporting tools"

DISCREPANCY: "waiver" ≠ "approval"

CORRECTION: Change "IRB waiver" to "IRB approval"
```

---

## Quick Start

### 1. Setup a paper for verification

```bash
mkdir -p papers/my_paper/sources
cp my_manuscript.pdf papers/my_paper/
cp ref1.pdf ref2.pdf ref3.pdf papers/my_paper/sources/
```

### 2. Tell Claude Code to run reciepts

```
Run reciepts verification on papers/my_paper/

Use the prompts in prompts/ folder.
Spawn one verification agent per reference.
Write verdicts to each reference subfolder.
```

### 3. Get your receipts

```bash
cat papers/my_paper/RECIEPTS.md
```

---

## Validation Study

We validated `reciepts` on **51 NeurIPS 2025 papers** previously flagged by GPTZero for containing fabricated citations.

**Finding**: Even among citations that *weren't* fabricated, [X]% did not accurately represent their sources.

📄 Paper (coming soon) | 📊 Data (coming soon)

---

## Why "receipts"?

Because when someone questions your citations, you better have the receipts.

This tool gives you—and Reviewer 2—the receipts.

---

## FAQ

**Q: How is this different from GPTZero?**

| GPTZero | reciepts |
|---------|----------|
| Checks if citations *exist* | Checks if citations *support your claims* |
| Bibliographic verification | Semantic verification |
| Catches fake refs | Catches real refs used wrong |

They're complementary. Run both.

**Q: Do I need to provide the source PDFs?**

Yes. You download them, put them in the `sources/` folder. The agents read them.

**Q: How long does it take?**

~2-3 minutes for a paper with 50 citations. All agents run in parallel.

**Q: Can this check my paper before I submit?**

Yes. That's the point. Run it before you submit. Sleep better.

---

## For Claude Code Users

This is a **prompt-based workflow**, not a traditional code library. The "code" is the orchestration prompts in `prompts/`.

To use:
1. Clone this repo
2. Add your paper + sources to `papers/`
3. Ask Claude Code to run verification using the prompts
4. Get your receipts

---

## Citation

If this tool saved your paper (or sank it), cite us:

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

MIT. Use it. Star it. Submit to NeurIPS with confidence.

---

*"Because Reviewer 2 will find out anyway."*
