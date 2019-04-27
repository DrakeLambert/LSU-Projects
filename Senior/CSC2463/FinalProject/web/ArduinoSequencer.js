class ArduinoSequencer {
    /**
     * @param {{write: (arg0: number) => void;}} serial
     * @param {number} noteCount
     * @param {number} noteTimeout
     */
    constructor(serial, noteCount, noteTimeout) {
        this.serial = serial;
        this.noteCount = noteCount;
        this.noteTimeout = noteTimeout;
    }
    generateSequence(length) {
        const sequence = [];
        for (let i = 0; i < length; i++) {
            sequence.push(Math.floor(Math.random() * this.noteCount));
        }
        return sequence;
    }
    /**
     * @param {number[]} sequence
     */
    playSequence(sequence) {
        let i = 0;
        const handle = window.setInterval(() => {
            this.serial.write(sequence[i]);
            i++;
            if (i > sequence.length) {
                window.clearInterval(handle);
            }
        }, this.noteTimeout);
    }
}
