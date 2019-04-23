function setup() {
    createCanvas(windowWidth, windowHeight);

    const oscillatorNotes = ['C4', 'D4', 'E4', 'F4', 'G4'];
    const oscillators = oscillatorNotes.map(note => new Tone.Oscillator(note));

    // Apply lfo to half of oscillators
    oscillators.map(oscillator => {
        if (Math.random() > 0.5) {
            const lfo = new Tone.LFO("4n", 400, 4000);
            lfo.connect(oscillator.frequency);
        }
    });

    const keyboardKeys = ['a', 's', 'd', 'f', 'g'];

    // Assume oscillators.length === keyboardKeys.length
    const sources = oscillators.map((source, i) => ({ key: keyboardKeys[i], sound: source }));

    const effects = [
        () => new Tone.BitCrusher(4),
        () => new Tone.PitchShift(.5),
        () => new Tone.Vibrato(50, 10),
        () => new Tone.Chorus(4, 2.5, 0.5),
    ];

    const randomEffect = () => effects[Math.floor(Math.random() * effects.length)]();
    const randomEffectChain = (length) => {
        // Assume length > 0
        const head = randomEffect();
        let tail = head;
        for (let i = 0; i < length; i++) {
            const nextEffect = randomEffect();
            tail.connect(nextEffect);
            tail = nextEffect;
        }
        tail.toMaster();
        return head;
    };

    const effectChainLength = 3;

    sources.forEach(source => {
        const envelope = new Tone.AmplitudeEnvelope();
        envelope.connect(randomEffectChain(effectChainLength));
        const sound = source.sound;
        sound.connect(envelope);

        window.addEventListener('keydown', (event) => {
            if (sound.state === 'stopped') {
                sound.start();
            }
            if (event.key === source.key) {
                envelope.triggerAttack();
            }
        });
        window.addEventListener('keyup', (event) => {
            if (event.key === source.key) {
                envelope.triggerRelease();
            }
        });
    });
}