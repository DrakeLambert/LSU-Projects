function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background('white');
    const w = 1000;
    const h = 500;
    const piano = new Piano(windowWidth / 2 - w / 2, windowHeight / 2 - h / 2, w, h, [{ key: 'h', note: 'c' }, { key: 'h', note: 'c' }, { key: 'h', note: 'c' }, { key: 'h', note: 'c' }]);
    piano.draw();
}

class Piano {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @param {KeyNote[]} keyNotes
     */
    constructor(x, y, w, h, keyNotes) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.keyNotes = keyNotes;
    }
    draw() {
        stroke('black');
        strokeWeight(2);
        textSize(50);
        textAlign(CENTER, CENTER);

        const keyWidth = this.width / this.keyNotes.length;
        for (let i = 0; i < this.keyNotes.length; i++) {
            const topLeft = this.x + i * keyWidth;

            rect(topLeft, this.y, keyWidth, this.height, 5);
            push();
            fill('black');
            text(this.keyNotes[i].key, topLeft, this.y, keyWidth, this.height);
            pop();
        }
    }
}

class KeyNote {
    /**
     * @param {string} key
     * @param {string} note
     */
    constructor(key, note) {
        this.key = key;
        this.note = note;
    }
}