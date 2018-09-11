# Homework 1

Drake Lambert

1. Trellis Plot
    - Multimodal
        - Alcohol
        - Total phenols
        - Flavanoids
        - Nonflavanoid phenols
        - OD280/OD315 of diluted wines
    - Unimodal
        - Malic acid
        - Ash
        - Alcalinity of ash
        - Magnesium
        - Proanthocyanins
        - Color intensity
        - Hue
        - Proline
    - Positive correlation of:
        - Total phenols and Flavanoids
        - Alcohol and Proline
        - Total phenols and Proanthocyanins
        - Flavanoids and Proanthocyanins
        - Flavanoids and OD280/OD315 of diluted wines
    - No Negative Correlations
    - All others uncorrelated
    - Substantially different values based on A
        - Alcohol
        - Malic Acid (Only A=3)
        - Proline
        - OD280/OD315 of diluted wines
        - Hue (Only A=3)
        - Color Intensity
        - Proanthocyanins (Only A=3)
        - Nonflavanoid phenols (Only A=3)
        - Flavanoids
        - Total phenols
        - Alcalinity of ash
    - Mathematical criterion: (Difference between medians) / (Overall visible spread)
2. Linear Regression
    - The learned value of theta was:
    ```matlab
        theta =
        340403.61774
        106903.96686
        theta_normal =
        71270.49245
        134.52529
     ```
     - Calculate price of house with 1750 sqft: `71270.49245 + 134.52529 * 1750 ~= 306689.75`
     - Learning rates of 0.05, 0.1, and 1 were able to learn correctly. The other values were either not able to learn fast enough or would not converge.