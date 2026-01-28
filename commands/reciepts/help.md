---
name: help
description: Show reciepts help and usage
---

# reciepts

Citation verification for scientific manuscripts.

## Commands

| Command | Description |
|---------|-------------|
| `/reciepts:init <path>` | Initialize paper folder, create checklist |
| `/reciepts:verify <path>` | Run parallel verification agents |
| `/reciepts:report <path>` | Generate final report |
| `/reciepts:help` | Show this help |

## Workflow

```
1. Setup folder structure:
   paper/
   ├── manuscript.pdf
   └── sources/
       ├── ref_01_smith2023.pdf
       ├── ref_02_jones2024.pdf
       └── ...

2. Initialize:
   /reciepts:init paper

3. Verify (spawns parallel agents):
   /reciepts:verify paper

4. Generate report:
   /reciepts:report paper

5. Review:
   paper/RECIEPTS.md
```

## Verdict Categories

| Status | Meaning | Action Required |
|--------|---------|-----------------|
| VALID | Source supports the claim | None |
| ADJUST | Minor discrepancy | Edit manuscript text |
| INVALID | Source does not support claim | Fix or remove citation |
| UNCLEAR | Cannot verify | Review manually |

## What This Does

GPTZero finds citations that don't exist. reciepts finds citations that exist but don't say what you claim.

| Tool | Question |
|------|----------|
| GPTZero | Does this reference exist? |
| reciepts | Does this reference support your claim? |

## Output Files

- `CHECKLIST.md` - Reference list and source availability
- `verdicts/ref_N/verdict.md` - Individual verdict per reference
- `RECIEPTS.md` - Final aggregated report
