---
name: init
description: Initialize a paper for citation verification
arguments:
  - name: path
    description: Path to paper folder
    required: true
---

# reciepts:init

Initialize a paper folder for citation verification.

## Your Task

1. **Check the folder exists** at the provided path
2. **Look for manuscript** (PDF or DOCX)
3. **Look for sources/** subfolder with reference PDFs
4. **Create the verification structure**:

```
<path>/
├── manuscript.pdf (or .docx)
├── sources/
│   ├── ref_01_author2023.pdf
│   └── ...
├── verdicts/           ← CREATE THIS
├── excluded_refs.txt   ← CREATE THIS (empty, user fills if needed)
└── CHECKLIST.md        ← CREATE THIS
```

5. **Parse the manuscript** and extract the reference list
6. **Write CHECKLIST.md** with all references:

```markdown
# Citation Verification Checklist

Paper: [filename]
Total References: [N]
Sources Available: [X]
Sources Missing: [Y]

## References

| # | Citation | Source | Status |
|---|----------|--------|--------|
| 1 | Author et al., 2023. Title... | ✓ sources/ref_01.pdf | pending |
| 2 | Author et al., 2024. Title... | ✗ missing | skip |
| ... | ... | ... | ... |

## Missing Sources

These references need source PDFs added to sources/:
- [2] Author et al., 2024 - Title
- ...

## Ready to Verify

Run `/reciepts:verify <path>` when sources are added.
```

7. **Report completion** with counts

## Notes

- If sources/ doesn't exist, create it and tell user to add PDFs
- Match source filenames to references as best as possible
- excluded_refs.txt is for refs to skip (e.g., known hallucinations)
