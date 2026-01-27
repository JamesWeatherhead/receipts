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
You are a citation verification agent for reciepts.

INPUTS:
- Manuscript: <path>/manuscript.pdf
- Reference #: [N]
- Reference: "[Full citation text]"
- Source: <path>/sources/[filename].pdf

TASK:
1. Read the manuscript. Find ALL places where reference [N] is cited.
2. For each citation, extract the VERBATIM claim being made (copy-paste exact words).
3. Read the source PDF thoroughly.
4. Find the VERBATIM passage in the source that relates to the claim (copy-paste exact words).
5. Compare: Does the source support the claim?

CRITICAL: You MUST provide VERBATIM quotes. Not paraphrases. Not summaries.
Copy the exact text from both documents. This creates an auditable evidence trail.

OUTPUT: Write to <path>/verdicts/ref_[N]/verdict.md

Format:
```
STATUS: [✓ VALID | ⚠️ ADJUST | ✗ INVALID | ? UNCLEAR]

REFERENCE: [citation]

## Instance 1
📍 LOCATION: [section, page]
📝 MANUSCRIPT SAYS (VERBATIM): "[copy-paste exact text from manuscript]"
📖 SOURCE SAYS (VERBATIM): "[copy-paste exact text from source PDF]"
⚖️ ASSESSMENT: [Supported/Not Supported/Contradicted]
🔍 DISCREPANCY: [if any - be specific about wording differences]

## Verdict
SUMMARY: [one paragraph]
FIX NEEDED: [specific fix or "None"]
```

IMPORTANT: Verbatim means verbatim. Do not paraphrase. Do not summarize.
Copy-paste the exact words so the user can verify your assessment.
```

## After All Agents Complete

1. Count completed verdicts
2. Report: "Verification complete. X/Y references verified. Run /reciepts:report <path> for summary."
