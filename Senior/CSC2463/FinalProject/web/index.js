///<reference path="./p5_types/index.d.ts"/>

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background('white');
    const w = 1000;
    const h = 500;
    const piano = new Piano(windowWidth / 2 - w / 2, windowHeight / 2 - h / 2, w, h, [{ key: 'h', note: 'c' },{ key: 'h', note: 'c' },{ key: 'h', note: 'c' },{ key: 'h', note: 'c' }]);
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

        const keyWidth = this.width / this.keyNotes.length;
        const rightEdge = this.x + this.width;
        for (let i = 0; i < this.keyNotes.length; i++) {
            rect(this.x + i * keyWidth, this.y, keyWidth, this.height, 5);
            push();
            fill('black');
            text(this.keyNotes[i].key, this.x + i * keyWidth + keyWidth / 2, this.y + this.height / 2);
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