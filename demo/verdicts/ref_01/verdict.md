---
reference: 1
status: ADJUST
citation: "Srivastava, N., Hinton, G., Krizhevsky, A., Sutskever, I., & Salakhutdinov, R. (2014). Dropout: A Simple Way to Prevent Neural Networks from Overfitting. Journal of Machine Learning Research, 15(56), 1929-1958."
instances: 4
---

# Verdict: Reference 1

## Summary

Reference 1 is cited four times in the manuscript. Two citations are accurate: the general description of dropout and the direct quote about co-adaptations. However, two citations contain errors that require correction. First, the manuscript incorrectly claims "p=0.5 for all layers" when the source explicitly states different dropout rates for hidden units (p=0.5) versus input units (p=0.8). Second, the manuscript claims a 0.89% MNIST error rate, but the source document shows 0.94%.

## Citation Instances

### Instance 1

**Location:** Section "Dropout Regularization", paragraph 1

**Manuscript claims:**
> Dropout, introduced by Srivastava et al. (2014) [1], is one of the most widely used regularization techniques. The key idea is simple: during training, randomly drop units from the network to prevent co-adaptation.

**Source states:**
> Dropout is a technique for addressing this problem. The key idea is to randomly drop units (along with their connections) from the neural network during training. This prevents units from co-adapting too much.

**Assessment:** SUPPORTED

**Discrepancy:** None significant. The manuscript accurately paraphrases the core concept.

---

### Instance 2

**Location:** Section "Dropout Regularization", paragraph 2

**Manuscript claims:**
> According to Srivastava et al., the optimal dropout probability is **p=0.5 for all layers**, which they found to work well across a wide range of networks and tasks [1].

**Source states:**
> In the simplest case, each unit is retained with a fixed probability p independent of other units, where p can be chosen using a validation set or can simply be set at 0.5, which seems to be close to optimal for a wide range of networks and tasks.

**Source also states:**
> **All dropout nets use p=0.5 for hidden units and p=0.8 for input units.**

**Assessment:** NOT SUPPORTED

**Discrepancy:** The manuscript claims "p=0.5 for all layers" but the source explicitly states p=0.5 for HIDDEN units and p=0.8 for INPUT units. The source does NOT recommend p=0.5 for all layers.

---

### Instance 3

**Location:** Section "Dropout Regularization", paragraph 2

**Manuscript claims:**
> Using this approach, they achieved an error rate of **0.89% on MNIST** [1], demonstrating state-of-the-art performance at the time.

**Source states:**
> Error rates can be further improved to **0.94%** by replacing ReLU units with maxout units.

**Assessment:** NOT SUPPORTED

**Discrepancy:** The manuscript claims 0.89% error rate on MNIST, but the source document states 0.94% error rate. The figure 0.89% does not appear in the provided source material.

---

### Instance 4

**Location:** Section "Dropout Regularization", paragraph 3

**Manuscript claims:**
> The authors showed that dropout "prevents complex co-adaptations in which a feature detector is only helpful in the context of several other specific feature detectors" [1].

**Source states:**
> This prevents complex co-adaptations in which a feature detector is only helpful in the context of several other specific feature detectors.

**Assessment:** SUPPORTED

**Discrepancy:** None. This is a direct, accurate quotation from the source.

---

## Required Corrections

1. Change "p=0.5 for all layers" to "p=0.5 for hidden units and p=0.8 for input units"
2. Change "0.89%" to "0.94%"
