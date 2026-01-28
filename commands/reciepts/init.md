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
2. **Look for manuscript** (PDF, DOCX, or MD)
3. **Look for sources/** subfolder with reference documents
4. **Create the verification structure**:

```
<path>/
├── manuscript.pdf (or .docx, .md)
├── sources/
│   ├── ref_01_author2023.pdf
│   └── ...
├── verdicts/           <- CREATE THIS
├── excluded_refs.txt   <- CREATE THIS (empty, user fills if needed)
└── CHECKLIST.md        <- CREATE THIS
```

5. **Parse the manuscript** and extract the reference list
6. **Write CHECKLIST.md** with all references:

```markdown
# Citation Verification Checklist

**Document:** [filename]
**Total references:** [N]
**Sources available:** [X]
**Sources missing:** [Y]

## References

| # | Citation | Source | Status |
|---|----------|--------|--------|
| 1 | Author et al. (2023). Title... | [x] sources/ref_01.pdf | pending |
| 2 | Author et al. (2024). Title... | [ ] missing | skip |
| ... | ... | ... | ... |

## Missing Sources

The following references need source documents added to sources/:

- [2] Author et al. (2024) - Title
- ...

## Next Steps

1. Add missing source documents to sources/
2. Add any references to skip to excluded_refs.txt
3. Run `/reciepts:verify <path>`
```

7. **Report completion** with counts

## Notes

- If sources/ doesn't exist, create it and tell user to add documents
- Match source filenames to references as best as possible
- excluded_refs.txt is for refs to skip (one reference number per line)
