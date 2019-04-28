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
        this.setNewColor();

        // @ts-ignore
        var synth = new Tone.Synth().toMaster();

        keyPressedTrigger.subscribe((key) => {
            if (key === this.key) {
                synth.triggerAttackRelease(this.note, "8n");
                this.darken();
                this.setNewColor();
            }
        });

        drawTrigger.subscribe(() => {
            push();
            stroke('black');
            strokeWeight(2);
            this.color.setAlpha(255 - this.shade);
            fill(this.color);
            if (this.shade < 255) {
                this.shade += 2;
            }
            rect(this.x, this.y, this.width, this.height, 5);
            textSize(50);
            textAlign(CENTER, CENTER);
            fill('black');
            text(this.key, this.x, this.y, this.width, this.height);
            pop();
        });
    }
    setNewColor() {
        this.color = color(materialColors[Math.floor(Math.random() * materialColors.length)]);
    }
    darken() {
        this.shade = 0;
    }
}

const materialColors = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722'
];
