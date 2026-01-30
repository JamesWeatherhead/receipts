---
name: receipts
description: Verify citations in a manuscript
---

# receipts

Verify that citations say what you claim they say.

## Step 1: Ask for the manuscript

ALWAYS ask first:

"What manuscript should I verify? (provide the file path)"

Wait for the user to respond with a path to their manuscript (.pdf, .md, or .docx).

## Step 2: Ask for the sources

After receiving the manuscript path, ask:

"Where are the source PDFs you cited? (provide the folder path)"

Wait for the user to respond with a path to their sources folder.

## Step 3: Verify

Once you have both paths:

1. **Parse references** - Extract the reference list from the manuscript
2. **Verify each reference** - Spawn one agent per reference (parallel)
3. **Generate report** - Write RECEIPTS.md with all findings

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

Write `<path>/RECEIPTS.md`:

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

Display: "Done. X issues found. See RECEIPTS.md"
