---
name: help
description: Show reciepts help and usage
---

# 🧾 reciepts - Citation Verification

**Show me the receipts on your citations.**

## Commands

| Command | Description |
|---------|-------------|
| `/reciepts:help` | Show this help |
| `/reciepts:init <path>` | Initialize paper for verification |
| `/reciepts:verify <path>` | Run verification swarm |
| `/reciepts:report <path>` | Generate final report |

## Quick Start

```bash
# 1. Create paper folder with manuscript + sources
mkdir -p my_paper/sources
cp manuscript.pdf my_paper/
cp ref1.pdf ref2.pdf my_paper/sources/

# 2. Initialize
/reciepts:init my_paper

# 3. Run verification
/reciepts:verify my_paper

# 4. Get report
/reciepts:report my_paper
```

## What It Does

GPTZero finds fake citations. We find real citations that don't support your claims.

| GPTZero | reciepts |
|---------|----------|
| "Does this ref exist?" | "Does this ref say what you claim?" |
| Bibliographic check | Semantic verification |

## Verdict Categories

- ✓ **VALID** - Source supports claim
- ⚠️ **ADJUST** - Minor discrepancy
- ✗ **INVALID** - Source doesn't support claim
- ? **UNCLEAR** - Can't verify

---
*"Because Reviewer 2 will find out anyway."*
