class BugCounter {
    /**
     * @param {Trigger} bugSquishedTrigger 
     */
    constructor(bugSquishedTrigger, drawTrigger) {
        this.count = 0;

        bugSquishedTrigger.subscribe(() => { this.count++ });
        drawTrigger.subscribe(this.draw.bind(this));
    }

    draw() {
        push();
        strokeWeight(3);
        fill(15, 15, 15);
        rect(10, 10, 70, 70, 10);

        textSize(50);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        fill('forestgreen');
        text(this.count, 45, 47.5);
        pop();
    }
}

