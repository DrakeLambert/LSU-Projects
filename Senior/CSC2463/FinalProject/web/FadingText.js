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
    constructor(text, x, y, w, h, fadeTime, drawTrigger, color = 'black', size = 50) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fadeTime = fadeTime;
        this.drawTrigger = drawTrigger;
        this.color = color;
        this.size = size;
    }
    start() {
        let endTime = Date.now() + this.fadeTime;
        const unsubDraw = this.drawTrigger.subscribe(() => {
            push();
            const c = color(this.color);
            c.setAlpha(255 * (endTime - Date.now()) / this.fadeTime);
            fill(c);
            textSize(this.size);
            textAlign(CENTER, CENTER);
            text(this.text, this.x, this.y, this.w, this.h);
            pop();
            if (Date.now() > endTime) {
                unsubDraw();
            }
        });
    }
}
