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

## Why

GPTZero finds fake citations. reciepts finds real citations that don't say what you claim.

## Legal

You're responsible for having rights to the PDFs you upload. Use open access papers, your own work, or properly licensed documents.

## License

MIT
