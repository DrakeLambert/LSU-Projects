const heartBeatSynth = (note) => {
    const options = { pitchDecay: 0.05, octaves: 10, oscillator: { type: 'sine' }, envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: .1, attackCurve: 'exponential' } };
    const heartBeat = new Tone.MembraneSynth(options).toMaster()
    return () => {
        heartBeat.triggerAttackRelease(note, "10n");
    };
};

const heartBeatLow = heartBeatSynth(10);
const heartBeatHigh = heartBeatSynth(25);

const gunShotSynth = () => {
    const pitchShift = new Tone.PitchShift(0).toMaster();

    const options = { noise: { type: 'white' }, envelope: { attack: 0.005, decay: 0.1, sustain: 0 } };
    const gunShot = new Tone.NoiseSynth(options).connect(pitchShift);
    const options2 = { noise: { type: 'brown' }, envelope: { attack: 0.05, decay: 0.5, sustain: 0, release: .01 } };
    const gunShot2 = new Tone.NoiseSynth(options2).connect(pitchShift);
    return () => {
        if (Math.random() <= .3) {
            pitchShift.pitch = Math.random() * .1 - .1;
            gunShot.triggerAttackRelease("2n");
            gunShot2.triggerAttackRelease("2n");
        }
    };
}

Tone.Transport.scheduleRepeat(heartBeatLow, "2n");
Tone.Transport.scheduleRepeat(heartBeatHigh, "2n", "8n");
Tone.Transport.scheduleRepeat(gunShotSynth(), "16n");

const image = [...document.getElementsByTagName('img')][0];
document.body.addEventListener('click', () => {
    if (Tone.Transport.state !== 'started') {
        Tone.Transport.start();
    } else {
        Tone.Transport.stop();
    }
    image.hidden = !image.hidden;
});