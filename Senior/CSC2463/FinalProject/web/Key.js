/**
 * A key of a piano.
 */
class Key {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @param {string} key
     * @param {string} note
     * @param {Trigger} drawTrigger
     * @param {Trigger} keyPressedTrigger
     */
    constructor(x, y, w, h, key, note, drawTrigger, keyPressedTrigger) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.key = key;
        this.note = note;
        this.shade = 255;

        // @ts-ignore
        var synth = new Tone.Synth().toMaster();

        keyPressedTrigger.subscribe((key) => {
            if (key === this.key) {
                synth.triggerAttackRelease(this.note, "8n");
                this.shade = 200;
            }
        });

        drawTrigger.subscribe(() => {
            push();
            stroke('black');
            strokeWeight(2);
            fill(this.shade);
            if (this.shade < 255) {
                this.shade++;
            }
            rect(this.x, this.y, this.width, this.height, 5);
            textSize(50);
            textAlign(CENTER, CENTER);
            fill('black');
            text(this.key, this.x, this.y, this.width, this.height);
            pop();
        });
    }
}
