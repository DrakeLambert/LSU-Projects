% Exercise Linear Regression one variable

clear all; close all; clc
 
x = load('hw1_linear_x.dat'); 
y = load('hw1_linear_y.dat');
m = length(y); % number of training examples

% Plot the training data
figure; % open a new figure window
plot(x, y, 'o');
ylabel('Price in dollars')
xlabel('Size in square feet')
hold off;

% Add intercept term to x
x = [ones(m, 1), x];

% Save a copy of the unscaled features for later
x_unscaled = x;
 
% Scale features and set them to zero mean
mu = mean(x);
sigma = std(x);
x(:,2) = (x(:,2) - mu(2))./ sigma(2);

% Calculate J matrix

% Grid over which we will calculate J
theta0_vals = linspace(0, 500000, 100);
theta1_vals = linspace(0, 500000, 100);

% initialize J_vals to a matrix of 0's
J_vals = zeros(length(theta0_vals), length(theta1_vals));

for i = 1:length(theta0_vals)
	  for j = 1:length(theta1_vals)
	  t = [theta0_vals(i); theta1_vals(j)];    
	  J_vals(i,j) = (0.5/m) .* (x * t - y)' * (x * t - y);
    end
end

% Because of the way meshgrids work in the surf command, we need to 
% transpose J_vals before calling surf, or else the axes will be flipped
J_vals = J_vals';
% Surface plot
figure;
surf(theta0_vals, theta1_vals, J_vals)
xlabel('\theta_0'); ylabel('\theta_1');
hold off;

% Contour plot
figure;
% Plot J_vals as 45 contours spaced logarithmically between 0.01=10^(-1) and 10^12
contour(theta0_vals, theta1_vals, J_vals, logspace(-1, 12, 45));
xlabel('\theta_0'); ylabel('\theta_1');
hold off;

% Gradient descent
theta = zeros(size(x(1,:)))'; % initialize fitting parameters
MAX_ITR = 100;
alpha = 0.1;
J = zeros(MAX_ITR, 1);

for num_iterations = 1:MAX_ITR
    % This is a vectorized version of the 
    % gradient descent update formula
    
    % Calculate the J term
    %J(num_iterations)  =?      
    
    % Here is the gradient
    %grad = ?
 
    % Here is the actual update
    %theta = ?
   
end
figure;
 % Now plot the first 50 J terms
plot(0:99, J(1:100), 'LineWidth', 2)
hold off;    
% print theta to screen
theta

figure; % open a new figure window
plot(x(:,2), y, 'o');
ylabel('Price dollars')
xlabel('Size square feet')
% Plot the linear fit
hold on; % keep previous plot visible
plot(x(:,2), x*theta, '-')
legend('Training data', 'Linear regression')
hold off % don't overlay any more plots on this figure

 
% Calculate the parameters from the normal equation directly
theta_normal = (x_unscaled' * x_unscaled)\x_unscaled' * y

 

