const gameOverTrigger = new Trigger();

class GameTimer {
    /**
     * @param {Trigger} bugSquishedTrigger
     */
    constructor(drawTrigger) {
        this.count = 0;
        this.totalTime = 30;
        this.end = Date.now() + this.totalTime * 1000;
        this.gameOver = false;
        drawTrigger.subscribe(this.draw.bind(this));
    }
    draw() {
        let timeLeft = Math.floor((this.end - Date.now()) / 1000);
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
            rect(width /2 - 150, height / 2 - 55, 300, 100, 20);
            textSize(50);
            textAlign(CENTER, CENTER);
            textStyle(BOLD);
            fill('forestgreen');
            text("Game Over",width /2, height / 2);
            if (!this.gameOver) {
                gameOverTrigger.trigger();
            }
            this.gameOver = true;
        }
        pop();
    }
}
