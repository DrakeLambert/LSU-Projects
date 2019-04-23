/**
 * A key of a piano.
 */
class Key {
    constructor(x, y, w, h, key, note) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.key = key;
        this.note = note;
        this.shade = 255;

        var synth = new Tone.Synth().toMaster();

        document.addEventListener('keydown', (event) => {
            if (event.key === this.key) {
                synth.triggerAttackRelease(this.note, "8n");
                this.shade = 200;
            }
        });
    }
    draw() {
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
    }
}
