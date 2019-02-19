function setup() {
    createCanvas(windowWidth, windowHeight);

    let effects = [
        new Tone.BitCrusher(4),
        new Tone.PitchShift(.5),
        new Tone.Vibrato(50, 10),
        new Tone.Distortion(10)
    ];

    effects.reduce((previous, next) => {
        previous.connect(next);
        return next;
    });

    let notes = ['C', 'D', 'E', 'F', 'G'].map((note) => {
        note += '4';
        return new Tone.FatOscillator(note, 'sine', 'square');
    });

    fill('black');
    textAlign(LEFT, TOP);
    textSize(20);

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