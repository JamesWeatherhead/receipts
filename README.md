# reciepts

Verify your citations say what you claim.

## Install

```bash
npx reciepts
```

## Use

```
/reciepts <path>
```

One command. Done.

## Setup

```
paper/
├── manuscript.pdf
└── sources/
    ├── ref_01.pdf
    ├── ref_02.pdf
    └── ...
```

Put your manuscript in a folder. Put source PDFs in `sources/`. Run reciepts.

## Output

```
paper/
├── manuscript.pdf
├── sources/
├── verdicts/
│   ├── ref_01.md
│   └── ref_02.md
└── RECIEPTS.md      <- Your report
```

## Example

Your manuscript says:
> Smith et al. achieved 99% accuracy [1]

Source actually says:
> Our method achieves 73% accuracy

reciepts catches this:

```
**Claim:** Smith et al. achieved 99% accuracy

**Source:** Our method achieves 73% accuracy

**Assessment:** CONTRADICTED

**Fix:** Change "99%" to "73%"
```

## Verdicts

| Status | Meaning |
|--------|---------|
| VALID | Source supports claim |
| ADJUST | Minor fix needed |
| INVALID | Source doesn't support claim |

## Cost

reciepts spawns one agent per reference (parallel). Cost depends on paper size and model.

| Paper Size | References | Opus 4.5 | Sonnet 4 | Haiku 3.5 |
|------------|------------|----------|----------|-----------|
| Small (3 pages) | 10 | ~$9 | ~$2 | ~$0.50 |
| Medium (5 pages) | 25 | ~$24 | ~$5 | ~$1.30 |
| Large (10 pages) | 50 | ~$56 | ~$11 | ~$3 |

**Estimates assume:**
- Average source PDF ~10 pages
- Manuscript + source + verdict per reference
- Prices: Opus $15/$75, Sonnet $3/$15, Haiku $0.80/$4 per 1M tokens (input/output)

**Recommendation:** Use Haiku for initial passes, Opus for final verification.

## Why

GPTZero finds fake citations. reciepts finds real citations that don't say what you claim.

## Legal

You're responsible for having rights to the PDFs you upload. Use open access papers, your own work, or properly licensed documents.

## License

MIT
