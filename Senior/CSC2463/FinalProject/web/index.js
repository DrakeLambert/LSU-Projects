let piano;
const portName = 'COM3';
const serial = new p5.SerialPort();

function setup() {
    createCanvas(windowWidth, windowHeight);

    const w = 1000;
    const h = 500;
    const keyNotes = [
        { key: 'a', note: 'c4' },
        { key: 's', note: 'd4' },
        { key: 'd', note: 'e4' },
        { key: 'f', note: 'f4' },
        { key: 'g', note: 'g4' }
    ];
    piano = new Piano(windowWidth / 2 - w / 2, windowHeight / 2 - h / 2, w, h, keyNotes, drawTrigger, keyPressedTrigger);
    new GameManager(drawTrigger, keyPressedTrigger);

    serial.open(portName);
    serial.on('data', () => {
        const data = serial.read();
        if (data >= 0 && data < keyNotes.length) {
            keyPressedTrigger.trigger(keyNotes[data].key);
        }
    });
}

const drawTrigger = new Trigger();
function draw() {
    background('white');
    drawTrigger.trigger();
}

const keyPressedTrigger = new Trigger();
function keyPressed() {
    keyPressedTrigger.trigger(key, keyCode);
}

class GameManager {
    /**
     * @param {Trigger} drawTrigger
     * @param {Trigger} keyPressedTrigger
     */
    constructor(drawTrigger, keyPressedTrigger) {
        let level = 1;
        let levelStarted = false;

        let arduinoSequencer = undefined;

        drawTrigger.subscribe(() => {
            push();

            textSize(50);
            textAlign(CENTER, CENTER);
            text('Level ' + level, 50, 0, 200, 200);

            if (!levelStarted) {
                text('Press space to start', windowWidth / 2 - 250, 0, 500, 200);
            }
            pop();
        });

        keyPressedTrigger.subscribe((_, keyCode) => {
            if (keyCode === 32) {
                if (!levelStarted) {
                    levelStarted = true;

                    let counter = 3;
                    const handle = window.setInterval(() => {
                        if (counter > 0) {
                            new FadingText(counter, windowWidth / 2 - 250, 0, 500, 200, 1000, drawTrigger).start();
                            counter--;
                        } else {
                            new FadingText('Listen!', windowWidth / 2 - 250, 0, 500, 200, 1000, drawTrigger).start();

                            arduinoSequencer.

                            window.clearInterval(handle);
                        }
                    }, 1000);
                }
            }
        });
    }
}

class FadingText {
    /**
     * @param {string | number} text
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @param {number} fadeTime
     * @param {Trigger} drawTrigger
     */
    constructor(text, x, y, w, h, fadeTime, drawTrigger) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fadeTime = fadeTime;
        this.drawTrigger = drawTrigger;
    }

    start() {
        let endTime = Date.now() + this.fadeTime;

        const unsubDraw = this.drawTrigger.subscribe(() => {
            push();

            fill(255 * (1 - (endTime - Date.now()) / this.fadeTime));
            textSize(50);
            textAlign(CENTER, CENTER);
            text(this.text, this.x, this.y, this.w, this.h);

            pop();

            if (Date.now() > endTime) {
                unsubDraw();
            }
        });
    }
}