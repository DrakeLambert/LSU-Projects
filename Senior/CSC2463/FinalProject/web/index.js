///<reference path="./p5_types/index.d.ts"/>

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background('white');
    const w = 1000;
    const h = 500;
    const piano = new Piano(windowWidth / 2 - w / 2, windowHeight / 2 - h / 2, w, h, [1, 2, 3, 4, 5]);
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

        const keyWidth = this.width / this.keyNotes.length;
        const rightEdge = this.x + this.width;
        for (let i = this.x; i < rightEdge; i += keyWidth) {
            rect(i, this.y, keyWidth, this.height, 5);
        }
        for
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