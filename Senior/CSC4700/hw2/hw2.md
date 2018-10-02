# Homework 2

Drake Lambert

## #1 Decision Tree

| Refund | Marital | Cheat
| ---    | ---     | ---
| Yes    | Married | No
| No     | Single  | No
| No     | Single  | Yes
| Yes    | Married | No
| No     | Married | Yes

`Entropy(Cheat) = -0.4 * log_2(0.4) - 0.6 * log_2(0.6) ~= 0.97`

`Entropy(Cheat, Refund) = 0.6 * (-1/3 * log_2(1/3) - 2/3 * log_2(2/3)) ~= 0.55`

`Entropy(Cheat, Marital) = 0.6 * (-2/3 * log_2(2/3) - 1/3 * log_2(1/3)) + 0.4 * (-0.5 * log_2(0.5) - 0.5 * log_2(0.5)) ~= 0.95`

`Gain(Cheat, Refund) = 0.97 - 0.55 = 0.42`

`Gain(Cheat, Marital) = 0.97 - 0.95 = 0.02`

Select Refund as first decision.

```text
Refund? -+- Yes - Cheat=No
         |
         \- No - Marital? -+- Married - Cheat=Yes
                           |
                           \- Single - Cheat=[Ambiguous]
```

If `Refund == No && Marital == Single` then there is a 50/50 chance of `Cheat` being either `Yes` or `No`.

## #2 Classifiers using WEKA

1. KNN: 99.3723%
1. Decision Tree: 96.5611%
1. Logistic Regression: 95.5513%

The k-nearest-neighbors algorithm was the most accurate at classifying the digits and also seemed to take the least time to train.

I tried changing the amount of considered neighbors for KNN, but adding neighbor considerations seemed to decrease accuracy. I noticed an improvement when considering 2 neighbors over 1. Changing the confidence level on the decision tree also seemed to have no effect.

## #3 K-means

The K-means is used to cluster data into groups. It is unsupervised. The groupings are computed for a given data point based on its distance from a centroid, the centroid being an estimate for the mean of all data in a group.

In the learning process, *k* centroids are either placed randomly or selected from the data set. Then, each data point is assigned to a centroid based on nearest distance. The next step is to re-compute the centroids based on the means of the grouped data points.

K-means may not work well when groups are of different densities or counts. K-means is also limited if you do not know how many clusters there are.