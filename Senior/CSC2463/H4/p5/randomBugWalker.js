/** @type {Trigger} */
const bugSquishedTrigger = new Trigger();

class RandomBugWalker {
    /**
     * @param {Number} speed 
     * @param {Number} turnRate 
     * @param {Trigger} mouseClickedTrigger 
     */
    constructor(speed, turnRate, mouseClickedTrigger, drawTrigger, gameOverTrigger) {
        this.image = bugImage;
        this.x = Math.floor(Math.random() * width);
        this.y = Math.floor(Math.random() * height);
        this.speed = speed; // pixels per frame
        this.animationSpeed = Math.floor(25 / this.speed); // frames per sprite animation update
        this.animationChangeFrame = 0;
        this.angle = this.randomAngle();
        this.directionChangeRate = turnRate;
        this.directionChangeTimer = Math.floor(Math.random() * 60 * this.directionChangeRate); // frames between direction changes
        this.directionChangeAnimationSpeed = 60 * 2; // frames per direction change animation
        this.angleFrameDelta = this.calculateAngleFrameDelta();
        this.walkFramesStart = 0;
        this.walkFramesCount = 5;
        this.currentFrame = Math.floor(Math.random() * this.walkFramesCount) + this.walkFramesStart;
        this.squishFrame = 6;
        this.frameWidth = 20;
        this.frameHeight = 20;
        this.drawWidth = 75;
        this.drawHeight = 75;
        this.squished = false;
        this.effectiveRadius = (this.drawWidth + this.drawHeight) / 4;

        this.mouseClickedTriggerUnsubscriber = mouseClickedTrigger.subscribe(this.onMouseClicked.bind(this));
        drawTrigger.subscribe(this.draw.bind(this));

        this.bugSquishedUnsubscriber = bugSquishedTrigger.subscribe(() => {
            this.speed += .25;
            this.animationSpeed = Math.floor(25 / this.speed);
        });

        gameOverTrigger.subscribe(() => {
            this.mouseClickedTriggerUnsubscriber();
        });
    }
    draw() {
        if (this.squished) {
            this.currentFrame = this.squishFrame;
        }
        else {
            if (frameCount % this.animationSpeed === this.animationChangeFrame) {
                this.currentFrame++;
                this.currentFrame = this.walkFramesStart + this.currentFrame % (this.walkFramesCount);
            }
            this.changeDirection();
            this.moveForward();
        }
        push();
        imageMode(CENTER);
        translate(this.x, this.y);
        rotate(this.angle + Math.PI / 2);
        const dFrameX = this.frameWidth * this.currentFrame;
        image(this.image, 0, 0, this.drawWidth, this.drawHeight, dFrameX, 0, this.frameWidth, this.frameHeight);
        pop();
    }
    moveForward() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.x > width + this.frameWidth) {
            this.x = -this.frameWidth;
        }
        else if (this.x < -this.frameWidth) {
            this.x = width + this.frameWidth;
        }
        if (this.y > height + this.frameHeight) {
            this.y = -this.frameHeight;
        }
        else if (this.y < -this.frameHeight) {
            this.y = height + this.frameHeight;
        }
    }
    changeDirection() {
        if (this.directionChangeTimer < this.directionChangeAnimationSpeed) {
            this.angle += this.angleFrameDelta;
        }
        this.directionChangeTimer--;
        if (this.directionChangeTimer < 0) {
            this.directionChangeTimer = Math.floor(Math.random() * 60 * this.directionChangeRate);
            ;
            this.angleFrameDelta = this.calculateAngleFrameDelta();
        }
    }
    calculateAngleFrameDelta() {
        return (this.randomAngle() - Math.PI) / this.directionChangeAnimationSpeed;
    }
    randomAngle() {
        return Math.random() * 2 * Math.PI;
    }
    onMouseClicked(x, y) {
        if (dist(x, y, this.x, this.y) <= this.effectiveRadius) {
            this.squished = true;
            this.mouseClickedTriggerUnsubscriber();
            bugSquishedTrigger.trigger();
            return true;
        }
        return false;
    }
}

class MissedClickSound {
    /**
     * @param {Trigger} bugSquishTrigger
     * @param {Trigger} clickTrigger
     * @param {string} squishSoundPath
     */
    constructor(bugSquishTrigger, clickTrigger, squishSoundPath) {
        const sound = new Tone.Player(squishSoundPath);
        sound.toMaster();

        let bugSquishedOnClick = false;

        bugSquishTrigger.subscribe(() => {
            bugSquishedOnClick = true;
        });

        clickTrigger.subscribePost(() => {
            if (!bugSquishedOnClick) {
                if (sound.state !== 'started') {
                    sound.start();
                }
            }
            bugSquishedOnClick = false;
        });
    }
}