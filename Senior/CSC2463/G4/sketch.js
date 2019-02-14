const bugs = [];
let bugImage;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noSmooth();

    bugImage = loadImage('assets/bug.png');
    bugs.push(new RandomBugWalker());
}

function draw() {
    background('white');
    bugs.forEach(bug => bug.draw());
}

class RandomBugWalker {
    constructor() {
        this.image = bugImage;
        this.x = Math.floor(Math.random() * width);
        this.y = Math.floor(Math.random() * height);

        this.speed = 5; // pixels per frame
        this.animationSpeed = 5; // frames per sprite animation update

        this.angle = this.randomAngle();
        this.nextAngle = this.randomAngle();
        this.directionChangeTimer = Math.floor(Math.random() * 60 * 10); // frames between direction changes
        this.directionChangeAnimationSpeed = 60 * 2; // frames per direction change animation
        this.angleFrameDelta = this.calculateAngleFrameDelta();

        this.currentFrame = 0;
        this.walkFramesStart = 0;
        this.walkFramesCount = 5;
        this.deathFrame = 6;
        this.frameWidth = 20;
        this.frameHeight = 20;
    }

    draw() {
        if (frameCount % this.animationSpeed === 0) {
            this.currentFrame++;
            this.currentFrame = this.walkFramesStart + this.currentFrame % (this.walkFramesCount);
        }
        if (frameCount % this.directionChangeSpeed === 0) {

        }
        this.changeDirection();
        this.moveForward();
        push();
        imageMode(CENTER);
        translate(this.x, this.y);
        rotate(this.angle + Math.PI / 2);
        const dFrameX = this.frameWidth * this.currentFrame;
        image(this.image, 0, 0, 75, 75, dFrameX, 0, 20, 20);
        pop();
    }

    moveForward() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.x > width + this.frameWidth) {
            this.x = -this.frameWidth;
        } else if (this.x < -this.frameWidth) {
            this.x = width + this.frameWidth;
        }
        if (this.y > height + this.frameHeight) {
            this.y = -this.frameHeight;
        } else if (this.y < -this.frameHeight) {
            this.y = height + this.frameHeight;
        }
    }

    changeDirection() {
        if (this.directionChangeTimer < this.directionChangeAnimationSpeed) {
            this.angle += this.angleFrameDelta;
        }
        this.directionChangeTimer--;
        if (this.directionChangeTimer < 0) {
            this.directionChangeTimer = Math.floor(Math.random() * 60 * 10);
            this.nextAngle = this.randomAngle();
        }
    }

    calculateAngleFrameDelta() {
        return (this.nextAngle - this.angle) / this.directionChangeAnimationSpeed;
    }

    randomAngle() {
        return Math.random() * 2 * Math.PI;
    }
}

class HorizontalScrollerSprite {
    constructor(image, initialX, initialY, frameCount, frameX, frameY, frameWidth, frameHeight, speed) {
        this.image = image;
        this.x = initialX;
        this.y = initialY;
        this.frameCount = frameCount;
        this.frameX = frameX;
        this.frameY = frameY;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frame = 0;
        this.direction = 1;
        this.speed = speed;
        this.animationSpeed = 10 / speed;
    }

    draw() {
        let motion = 0;
        if (keyIsDown(LEFT_ARROW)) {
            motion--;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            motion++;
        }

        if (motion === 0) {
            this.frame = 0;
        } else {
            if (motion === -1) {
                this.x -= this.speed;
            } else {
                this.x += this.speed;
            }
            this.direction = motion;
            if (frameCount % this.animationSpeed === 0) {
                this.frame = this.frame % (this.frameCount - 1);
                this.frame++;
            }
        }

        push();
        this.x = constrain(this.x, 0, width - this.frameWidth);
        this.y = constrain(this.y, 0, height - this.frameHeight);

        let dX = this.x * this.direction;
        if (this.direction === -1) {
            scale(-1, 1);
            dX -= this.frameWidth;
        }
        console.log(this.frame);
        const dFrameX = this.frameX + this.frameWidth * this.frame;
        image(this.image, dX, this.y, this.frameWidth, this.frameHeight, dFrameX, this.frameY, this.frameWidth, this.frameHeight);
        pop();
    }
}

function randomPositionSpriteFactory(imagePath, frameCount, frameX, frameY, frameWidth, frameHeight) {
    const image = loadImage(imagePath);
    const x = random(0, width - frameWidth);
    const y = random(0, height - frameHeight);
    const speed = 4;
    return new HorizontalScrollerSprite(image, x, y, frameCount, frameX, frameY, frameWidth, frameHeight, speed);
}