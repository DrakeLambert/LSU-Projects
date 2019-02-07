let sprites = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    const spriteArguments = [9, 0, 0, 80, 80];
    const imagePaths = [
        'assets/SpelunkyGuy.png',
        'assets/GreenGirl.png',
        'assets/NastyGuy.png',
        'assets/AsianGuy.png'
    ];
    imagePaths.forEach(path => sprites.push(randomPositionSpriteFactory(path, ...spriteArguments)));
}

function draw() {
    background('white');
    sprites.forEach(sprite => sprite.draw());
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