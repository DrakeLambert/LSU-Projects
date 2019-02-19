function setup() {
    createCanvas(windowWidth, windowHeight);

    const namedEffects = [
        [new Tone.BitCrusher(4), 'Bit Crusher'],
        [new Tone.PitchShift(.5), 'Pitch Shift'],
        [new Tone.Vibrato(50, 10), 'Vibrato'],
        [new Tone.Distortion(10), 'Distortion']
    ];

    fill('black');
    textAlign(LEFT, TOP);
    textSize(20);

    namedEffects.forEach((namedEffect, i) => {
        let [effect, name] = namedEffect;
        text(name, 10, i * 100 + 50);

        let slider = createSlider(0, 100, 50);
        slider.position(10, i * 100 + 80);
        slider.style('width', '80px');
        slider.elt.addEventListener('input', () => {
            effect.wet.value = slider.value() / 100;
        });
    });

    const effects = namedEffects.map((namedEffect) => {
        return namedEffect[0];
    });

    effects.push(Tone.Master);

    effects.reduce((previous, next) => {
        previous.connect(next);
        return next;
    });

    const firstEffect = effects[0];

    const keys = [
        ['C', 'a'],
        ['D', 's'],
        ['E', 'd'],
        ['F', 'f'],
        ['G', 'g']
    ].map((noteKey, i) => {
        const note = noteKey[0] + '4';
        const key = noteKey[1];
        const envelope = new Tone.AmplitudeEnvelope().connect(firstEffect);
        new Tone.Oscillator(note).connect(envelope).start();

        const triggerButton = createButton(note);
        triggerButton.position(10 + i * 50, 10);
        triggerButton.mousePressed(() => { envelope.triggerAttack(); });
        triggerButton.mouseReleased(() => { envelope.triggerRelease(); });
        window.addEventListener('keydown', (event) => {
            if (event.key === key) {
                envelope.triggerAttack();
            }
        });
        window.addEventListener('keyup', (event) => {
            if (event.key === key) {
                envelope.triggerRelease();
            }
        });
        return key;
    });

    text('Use keys: ' + keys.reduce((x, xs) => { return xs + ', ' + x; }), 300, 12.5);

    // notes.forEach((song, i) => {

    //     let effect = effects[i][0];
    //     let effectName = effects[i][1];

    //     effect.toMaster();
    //     effect.wet.value = .5;

    //     song.connect(effect);

    //     text('Song ' + i + ': ' + effectName, 10, i * 100 + 10);

    //     let slider = createSlider(0, 100, 50);
    //     slider.position(10, i * 100 + 40);
    //     slider.style('width', '80px');
    //     slider.elt.addEventListener('input', () => {
    //         effect.wet.value = slider.value() / 100;
    //     });

    //     let startButton = createButton('Play / Pause');
    //     startButton.position(10, i * 100 + 70);
    //     startButton.mousePressed(() => {
    //         if (song.state === 'stopped') {
    //             song.start();
    //         } else {
    //             song.stop();
    //         }
    //     });;
    // });
}