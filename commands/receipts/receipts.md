---
name: receipts
description: Verify citations in a manuscript
arguments:
  - name: path
    description: Path to folder with manuscript and sources/
    required: true
---

# receipts

Verify that citations say what you claim they say.

## Your Task

Given a path, do everything in one shot:

1. **Find the manuscript** - Look for .pdf, .md, or .docx in the folder root
2. **Find sources** - Look in `<path>/sources/` for reference documents
3. **Parse references** - Extract the reference list from the manuscript
4. **Verify each reference** - Spawn one agent per reference (parallel)
5. **Generate report** - Write RECIEPTS.md with all findings

## Spawn Verification Agents

For each reference that has a matching source file, spawn an agent:

```
Task(
  subagent_type: "general-purpose",
  description: "Verify ref [N]",
  prompt: """
You are verifying a citation.

Manuscript: <path>/[manuscript file]
Reference: [N] - "[citation text]"
Source: <path>/sources/[source file]

Instructions:
1. Read the manuscript. Find where reference [N] is cited.
2. Copy the EXACT text making the claim.
3. Read the source document.
4. Copy the EXACT text from the source.
5. Compare: Does the source support the claim?

Write to <path>/verdicts/ref_[N].md:

---
ref: [N]
status: [VALID | ADJUST | INVALID]
---

**Claim:** [verbatim from manuscript]

**Source:** [verbatim from source]

**Assessment:** [SUPPORTED | NOT SUPPORTED | CONTRADICTED]

**Fix:** [specific correction needed, or "None"]
"""
)
```

Launch ALL agents in ONE message (parallel execution).

## After Agents Complete

Write `<path>/RECIEPTS.md`:

```markdown
# Citation Verification Report

**Document:** [name]
**Checked:** [count]

## Summary

| Status | Count |
|--------|-------|
| VALID | X |
| ADJUST | Y |
| INVALID | Z |

## Issues Found

[For each non-VALID verdict, show:]

### [N]. [Short citation]

**Status:** [ADJUST/INVALID]

**Claim:** [quote]

**Source:** [quote]

**Fix:** [correction]

---

## All Clear

[List VALID citations, or "None - all citations have issues"]
```

Display: "Done. X issues found. See RECIEPTS.md"
