# reciepts Demo

A demo using **real JMLR papers** (CC BY 4.0 licensed) with intentional citation errors.

## Papers Used

Both source papers are from JMLR and are **legally reusable** under Creative Commons Attribution 4.0:

1. **Srivastava et al. (2014)** - "Dropout: A Simple Way to Prevent Neural Networks from Overfitting"
   - https://jmlr.org/papers/v15/srivastava14a.html

2. **Pedregosa et al. (2011)** - "Scikit-learn: Machine Learning in Python"
   - https://jmlr.org/papers/v12/pedregosa11a.html

## Intentional Errors

### Reference [1] - Dropout (⚠️ ADJUST)

| Claim in Manuscript | What Source Actually Says | Error Type |
|---------------------|---------------------------|------------|
| "p=0.5 for all layers" | "p=0.5 for hidden units and p=0.8 for input units" | Oversimplification |
| "0.89% on MNIST" | "0.94%" on MNIST | Wrong number |

### Reference [2] - Scikit-learn (✗ INVALID)

| Claim in Manuscript | What Source Actually Says | Error Type |
|---------------------|---------------------------|------------|
| "over 100 algorithms" | "wide range" (no specific number) | Fabricated statistic |
| "12 authors" | 16 authors | Wrong number |
| "MIT license" | "BSD license" | Wrong license |

## Expected Verdicts

| Ref | Expected Status | Key Issues |
|-----|-----------------|------------|
| [1] | ⚠️ ADJUST | Dropout rate oversimplified, MNIST error rate wrong |
| [2] | ✗ INVALID | Multiple factual errors (algorithm count, author count, license) |

## Running the Demo

```
cd /path/to/reciepts/demo
/reciepts:init .
/reciepts:verify .
/reciepts:report .
```

## License

- Source paper excerpts used under CC BY 4.0 (JMLR)
- Demo manuscript and structure: MIT
