---
name: verify
description: Run citation verification swarm
arguments:
  - name: path
    description: Path to paper folder
    required: true
---

# reciepts:verify

Run parallel verification agents on a paper's citations.

## Your Task

1. **Read CHECKLIST.md** to get reference list
2. **Read excluded_refs.txt** if it exists (skip these refs)
3. **For each reference with available source**, spawn a verification agent

## Spawn Agents in Parallel

Use the Task tool to spawn multiple agents simultaneously:

```
For each reference to verify:
  Task(
    subagent_type: "general-purpose",
    description: "Verify ref [N]",
    prompt: [See AGENT PROMPT below]
  )
```

**IMPORTANT**: Launch ALL agents in a SINGLE message with multiple Task calls. This runs them in parallel.

## Agent Prompt Template

```
You are a citation verification agent.

INPUTS:
- Manuscript: <path>/manuscript.pdf (or .md)
- Reference #: [N]
- Reference: "[Full citation text]"
- Source: <path>/sources/[filename].pdf (or .md)

TASK:
1. Read the manuscript. Find ALL places where reference [N] is cited.
2. For each citation, extract the VERBATIM text making the claim (copy-paste exact words).
3. Read the source document thoroughly.
4. Find the VERBATIM passage in the source that relates to each claim (copy-paste exact words).
5. Compare: Does the source support the claim as stated?

CRITICAL REQUIREMENTS:
- You MUST provide VERBATIM quotes from both documents
- No paraphrasing. No summarizing. Copy-paste exact text.
- Include page/section numbers where possible
- This creates an auditable evidence trail

OUTPUT: Write verdict to <path>/verdicts/ref_[N]/verdict.md

Use this exact format:

---
reference: [N]
status: [VALID | ADJUST | INVALID | UNCLEAR]
citation: "[Full citation]"
instances: [number of times cited]
---

# Verdict: Reference [N]

## Summary

[One paragraph summary of findings]

## Citation Instances

### Instance 1

**Location:** [Section name, page/paragraph if available]

**Manuscript claims:**
> [VERBATIM quote from manuscript - copy-paste exact text]

**Source states:**
> [VERBATIM quote from source - copy-paste exact text]

**Assessment:** [SUPPORTED | PARTIALLY SUPPORTED | NOT SUPPORTED | CONTRADICTED]

**Discrepancy:** [Specific difference, or "None"]

---

[Repeat for each instance where this reference is cited]

## Required Corrections

[Numbered list of specific fixes needed, or "None required"]

---

Remember: Verbatim means verbatim. The user must be able to verify your assessment by finding these exact quotes in the documents.
```

## After All Agents Complete

1. Count completed verdicts
2. Report: "Verification complete. X/Y references verified. Run /reciepts:report <path> for summary."
