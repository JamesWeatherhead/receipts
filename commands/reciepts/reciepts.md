---
name: reciepts
description: Citation verification - show me the receipts
---

# reciepts

Verify that your citations actually say what you claim they say.

Run `/reciepts:help` for commands.

## Quick Start

```
1. /reciepts:init <path>    # Setup and create checklist
2. /reciepts:verify <path>  # Run verification agents
3. /reciepts:report <path>  # Generate final report
```

## What This Does

Spawns one agent per reference. Each agent:
1. Reads your manuscript
2. Finds every place the reference is cited
3. Extracts the verbatim claim you make
4. Reads the source document
5. Extracts the verbatim text from the source
6. Compares claim vs source
7. Writes a verdict with evidence

## Verdict Types

- **VALID** - Source supports your claim
- **ADJUST** - Minor discrepancy needs fixing
- **INVALID** - Source does not support claim
- **UNCLEAR** - Cannot verify
