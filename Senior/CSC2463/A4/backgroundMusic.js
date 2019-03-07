class BackgroundMusic {
    /**
     * @param {Trigger} gameStartTrigger
     * @param {Trigger} gameOverTrigger
     * @param {Trigger} bugSquishedTrigger
     */
    constructor(gameStartTrigger, gameOverTrigger, bugSquishedTrigger) {
        const sequences = [
            new NoteSequence(['C2', null, 'C2', null, 'C2', null, 'C2', null], new Tone.Synth().toMaster()),
            new NoteSequence([null, 'C3', null, 'C3', null, 'C3', null, 'C3'], new Tone.Synth().toMaster()),
            new NoteSequence(['F2', 'F2', null, null, 'F2', 'F2', null, null], new Tone.FMSynth().toMaster()),
            new NoteSequence(['D3', ['E3', 'F3'], 'D3', ['E3', 'F3'], 'D3', ['E3', 'F3'], 'D3', ['E3', 'F3']], new Tone.Synth().toMaster()),
            new NoteSequence([null, ['C3', 'F3', ' C3'], null, ['C3', 'F3', ' C3'], null, ['C3', 'F3', ' C3'], null, ['C3', 'F3', ' C3']], new Tone.Synth().toMaster()),
        ];

        sequences[0].muted = false;

        let squishedCount = 0;
        let nextSquishMilestone = 3;
        let nextSequence = 1;
        bugSquishedTrigger.subscribe(() => {
            squishedCount++;
            if (squishedCount >= nextSquishMilestone) {
                if (sequences.length > nextSequence) {
                    sequences[nextSequence].muted = false;
                }
                nextSequence++;
                nextSquishMilestone *= 2;
            }

        });

        gameStartTrigger.subscribe(() => {
            this.ensureToneStarted();
            sequences.forEach(sequence => sequence.start());
        });

        gameOverTrigger.subscribe(() => {
            sequences.forEach(sequence => sequence.stop());
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
        this.muted = true;
        this.sequence = new Tone.Sequence(
            (time, note) => {
                if (!this.muted) {
                    synth.triggerAttackRelease(note, '10hz', time);
                }
            },
            notes,
            '4n'
        );
    }

    start() {
        this.sequence.start();
    }

    stop() {
        this.sequence.stop();
    }
}