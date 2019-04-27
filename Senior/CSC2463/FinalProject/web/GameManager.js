class GameManager {
    /**
     * @param {Trigger} drawTrigger
     * @param {Trigger} keyPressedTrigger
     * @param {ArduinoSequencer} arduinoSequencer
     * @param {{ key: string; note: string; }[]} keyNotes
     */
    constructor(drawTrigger, keyPressedTrigger, arduinoSequencer, keyNotes) {
        this.level = 1;
        this.levelStarted = false;
        /** @type {number[]} */
        this.levelSequence = [];
        /** @type {number[]} */
        this.userLevelSequence = [];
        drawTrigger.subscribe(() => {
            push();
            textSize(50);
            textAlign(CENTER, CENTER);
            text('Level ' + this.level, 50, 0, 200, 200);
            if (!this.levelStarted) {
                text('Press space to start', windowWidth / 2 - 250, 0, 500, 200);
            }
            pop();
        });
        keyPressedTrigger.subscribe((_, keyCode) => {
            if (keyCode === 32) {
                if (!this.levelStarted) {
                    this.levelStarted = true;
                    let counter = 3;
                    const handle = window.setInterval(() => {
                        if (counter > 0) {
                            new FadingText(counter, windowWidth / 2 - 250, 0, 500, 200, 1000, drawTrigger).start();
                            counter--;
                        }
                        else {
                            new FadingText('Listen!', windowWidth / 2 - 250, 0, 500, 200, 1000, drawTrigger).start();
                            this.levelSequence = arduinoSequencer.generateSequence(this.level);
                            console.log("Level Sequence: " + this.levelSequence);
                            this.userLevelSequence = [];
                            window.setTimeout(() => { arduinoSequencer.playSequence(this.levelSequence); }, 1000);
                            window.clearInterval(handle);
                        }
                    }, 1000);
                }
            }
        });
        keyPressedTrigger.subscribe((key, _) => {
            for (let i = 0; i < keyNotes.length; i++) {
                if (keyNotes[i].key === key) {
                    this.userLevelSequence.push(i);
                    if (this.userLevelSequence.length >= this.levelSequence.length) {
                        levelOver();
                    }
                    break;
                }
            }
        });
        const levelOver = () => {
            const levelWon = this.userLevelSequence.every((userValue, i) => this.levelSequence[i] === userValue);
            console.log("Level Won: " + levelWon);
            this.levelStarted = false;
            if (levelWon) {
                new FadingText('Correct!', windowWidth / 2 - 250, windowHeight - 200, 500, 200, 3000, drawTrigger, 'green', 100).start();
                this.level++;
            }
            else {
                new FadingText('Wrong!', windowWidth / 2 - 250, windowHeight - 200, 500, 200, 3000, drawTrigger, 'red', 100).start();
                this.level = 1;
            }
        };
    }
}
