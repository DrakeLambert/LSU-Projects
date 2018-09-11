pkg load statistics;

x = csvread("wine.data.txt");

A = x(:,1);

B = x(:,[2:end]);

figure;
plotmatrix(B);
title ("Trellis Plot");

figure;
boxplot(b(:,1),a);
title ("Alcohol");

figure;
boxplot(b(:,2),a);
title ("Malic Acid");

figure;
boxplot(b(:,3),a);
title ("Ash");

figure;
boxplot(b(:,4),a);
title ("Alcalinity of Ash");

figure;
boxplot(b(:,5),a);
title ("Magnesium");

figure;
boxplot(b(:,6),a);
title ("Total Phenol");

figure;
boxplot(b(:,7),a);
title ("Flavanoids");

figure;
boxplot(b(:,8),a);
title ("Nonflavanoid Phenols");

figure;
boxplot(b(:,9),a);
title ("Proanthocyanins");

figure;
boxplot(b(:,10),a);
title ("Color Intensity");

figure;
boxplot(b(:,11),a);
title ("Hue");

figure;
boxplot(b(:,12),a);
title ("OD280/OD315 of diluted wines");

figure;
boxplot(b(:,13),a);
title ("Proline");