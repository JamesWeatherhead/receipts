# reciepts Demo

Working example using real JMLR papers (CC BY 4.0 licensed).

## Papers Used

Both source papers are legally reusable under Creative Commons Attribution 4.0:

1. **Srivastava et al. (2014)** - "Dropout: A Simple Way to Prevent Neural Networks from Overfitting"
   - https://jmlr.org/papers/v15/srivastava14a.html

2. **Pedregosa et al. (2011)** - "Scikit-learn: Machine Learning in Python"
   - https://jmlr.org/papers/v12/pedregosa11a.html

## Intentional Errors

### Reference 1 - Dropout (ADJUST)

| Claim | Manuscript | Source | Error Type |
|-------|------------|--------|------------|
| Dropout rate | "p=0.5 for all layers" | "p=0.5 for hidden units and p=0.8 for input units" | Oversimplification |
| MNIST error | "0.89%" | "0.94%" | Wrong number |

### Reference 2 - Scikit-learn (ADJUST)

| Claim | Manuscript | Source | Error Type |
|-------|------------|--------|------------|
| Language | "written entirely in Python" | "written primarily in Python" (uses Cython) | Overstatement |
| Algorithm count | "over 100 algorithms" | "wide range" (no number given) | Fabricated statistic |
| Author count | "12 authors" | "16 contributors" | Wrong number |
| License | "MIT license" | "simplified BSD license" | Wrong license |

## Expected Verdicts

| Ref | Status | Key Issues |
|-----|--------|------------|
| 1 | ADJUST | Dropout rate oversimplified, MNIST error rate wrong |
| 2 | ADJUST | Multiple factual errors |

## Running the Demo

```
/reciepts:init .
/reciepts:verify .
/reciepts:report .
```

## License

- Source paper excerpts: CC BY 4.0 (JMLR)
- Demo manuscript and structure: MIT
