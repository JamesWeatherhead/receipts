---
name: help
description: Show reciepts help
---

# reciepts

Verify your citations say what you claim.

## Usage

```
/reciepts <path>
```

That's it. One command.

## Setup

```
paper/
├── manuscript.pdf    # Your paper
└── sources/
    ├── ref_01.pdf    # Source for reference 1
    ├── ref_02.pdf    # Source for reference 2
    └── ...
```

## What Happens

1. Finds your manuscript
2. Finds sources in sources/
3. Spawns one agent per reference (parallel)
4. Each agent extracts verbatim quotes
5. Writes RECIEPTS.md with all findings

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

## Verdicts

- **VALID** - Source supports your claim
- **ADJUST** - Minor fix needed
- **INVALID** - Source doesn't support claim
