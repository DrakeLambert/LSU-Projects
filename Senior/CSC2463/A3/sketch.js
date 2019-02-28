function setup() {
    createCanvas(windowWidth, windowHeight);
}

const heartBeatSynth = (note) => {
    const options = { pitchDecay: 0.05, octaves: 10, oscillator: { type: 'sine' }, envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: .1, attackCurve: 'exponential' } };
    const heartBeat = new Tone.MembraneSynth(options).toMaster()
    return () => {
        heartBeat.triggerAttackRelease(note, "10n");
    };
};

const heartBeatLow = heartBeatSynth(40);
const heartBeatHigh = heartBeatSynth(50);



Tone.Transport.scheduleRepeat(heartBeatLow, "2n");
Tone.Transport.scheduleRepeat(heartBeatHigh, "2n", "8n");

function mousePressed() {
    if (Tone.Transport.state !== 'started') {
        Tone.Transport.start();
    } else {
        Tone.Transport.stop();
    }
}