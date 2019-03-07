class GameTimer {
    /**
     * @param {Trigger} drawTrigger
     * @param {Trigger} mouseClickedTrigger
     */
    constructor(drawTrigger, mouseClickedTrigger) {
        this.gameOverSound = new Tone.Player('./assets/gameOver.wav');
        this.gameOverSound.toMaster();
        this.gameOverTrigger = new Trigger();
        this.count = 0;
        this.totalTime = 30;
        this.end = Date.now() + this.totalTime * 1000;
        this.gameOver = false;
        this.gameStarted = false;
        drawTrigger.subscribe(this.draw.bind(this));

        const mouseClickedUnSub = mouseClickedTrigger.subscribe(() => {
            this.gameStarted = true;
            mouseClickedUnSub();
        });
    }
    draw() {
        let timeLeft = Math.floor((this.end - Date.now()) / 1000);
        if (!this.gameStarted) {
            this.end = Date.now() + this.totalTime * 1000;
            timeLeft = 30;
        }
        push();
        strokeWeight(3);
        fill(15, 15, 15);
        if (timeLeft >= 0) {
            rect(width - 90 - 10, 10, 90, 70, 10);
            textSize(50);
            textAlign(CENTER, CENTER);
            textStyle(BOLD);
            fill('forestgreen');
            text(":" + timeLeft, width - 55, 47.5);
        } else {
            rect(width / 2 - 150, height / 2 - 55, 300, 100, 20);
            textSize(50);
            textAlign(CENTER, CENTER);
            textStyle(BOLD);
            fill('forestgreen');
            text("Game Over", width / 2, height / 2);
            if (!this.gameOver) {
                this.gameOverTrigger.trigger();
                this.gameOverSound.start();
            }
            this.gameOver = true;
        }
        pop();
    }
}
