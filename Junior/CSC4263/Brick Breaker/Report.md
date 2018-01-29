# Brick Breaker Report

Drake Lambert  
CSC 4263

## About

For my first Unity Game I decided to try to replicate a sample game from the internet. I landed on Brick Breaker.

The object of the game is to destroy all of the green bricks by bouncing the red ball against them. At the same time, the player must not let the ball fall below the paddle.

## How To Play

Use any of the below controls to move the paddle left and right respectively:

- A & D
- Left Arrow & Right Arrow
- Right & Left on most joysticks

Left click to launch the ball. The paddle can be moved before launching the ball.

Left click to restart the game after a win or loss.

## The Making Of

The paddle is moved one pixel per update when one of the keys listed above are being pressed. Its movement is clamped within the structure.

Though the ball starts off by following the movement of the paddle, after launch, kinematic mode is set to false. This allows the ball to interact with the walls and bricks using colliders.

Each brick constantly checks for collisions. When the ball collides with a brick, it will destroy itself and decrement a static variable that tracks the amount of bricks left. When the variable hits zero, the final brick will call for the Win scenario on the Game class.

A similar action happens when the ball collides with the floor. The differences are that the ball is destroyed and the Loss scenario is called.

After a win or loss, the main game script will wait for the user to left click. After this, the scene will be reloaded.

## Challenges

The most difficult part about this project was learning how collider triggers work against actually using the collider. In some cases I wanted the collision to actually occur while in others I only wanted to detect it.