class Piano {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @param {KeyNote[]} keyNotes
     */
    constructor(x, y, w, h, keyNotes, drawTrigger, keyPressedTrigger) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        const keyWidth = this.width / keyNotes.length;
        this.keys = keyNotes.map((keyNote, i) => new Key(this.x + i * keyWidth, this.y, keyWidth, this.height, keyNote.key, keyNote.note, drawTrigger, keyPressedTrigger));
    }
}
