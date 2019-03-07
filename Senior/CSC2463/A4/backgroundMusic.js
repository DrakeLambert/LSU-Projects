class BackgroundMusic {
    constructor(mouseClickedTrigger) {
        const sequence1 = new NoteSequence(["G2", [null, "G2"], null, "Bb2", "C3", "G2", [null, "G2"], null, "F2", "F#2"]);
        const sequence2 = new NoteSequence();

        const mouseClickedUnSub1 = mouseClickedTrigger.subscribe(() => {
            this.ensureToneStarted();
            sequence1.start();
            mouseClickedUnSub1();

            const mouseClickedUnSub2 = mouseClickedTrigger.subscribe(() => {
                sequence2.start();
                mouseClickedUnSub2();
            });
        });
    }

    ensureToneStarted() {
        if (Tone.Transport.state !== 'started') {
            Tone.Transport.start();
        }
    }
}

class NoteSequence {
    constructor(notes, synth) {
        if (!notes) {
            notes = ["C3", ["Eb3", null, "Eb3"], "G3", "Bb3"];
        }
        if (!synth) {
            synth = new Tone.MembraneSynth().toMaster();
        }
        this.sequence = new Tone.Sequence(
            (time, note) => {
                synth.triggerAttackRelease(note, "10hz", time);
            },
            notes,
            "4n"
        );
    }

    start() {
        this.sequence.start();
    }

    stop() {
        this.sequence.start();
    }
}