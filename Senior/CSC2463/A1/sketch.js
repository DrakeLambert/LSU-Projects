function setup() {
    createCanvas(windowWidth, windowHeight);

    let effects = [
        [new Tone.BitCrusher(4), 'Bit Crusher'],
        [new Tone.PitchShift(.5), 'Pitch Shift'],
        [new Tone.Vibrato(50, 10), 'Vibrato'],
        [new Tone.Distortion(10), 'Distortion']
    ];

    let songs = [1, 2, 3, 4].map((i) => {
        return new Tone.Player(`/assets/song${i}.mp3`);
    });
    // [
    //     new Tone.Player('/assets/song1.mp3'),
    //     new Tone.Player('/assets/song2.mp3'),
    //     new Tone.Player('/assets/song3.mp3'),
    //     new Tone.Player('/assets/song4.mp3'),
    // ];

    fill('black');
    textAlign(LEFT, TOP);
    textSize(20);

    songs.forEach((song, i) => {

        let effect = effects[i][0];
        let effectName = effects[i][1];

        effect.toMaster();
        effect.wet.value = .5;

        song.connect(effect);

        text('Song ' + i + ': ' + effectName, 10, i * 100 + 10);

        let slider = createSlider(0, 100, 50);
        slider.position(10, i * 100 + 40);
        slider.style('width', '80px');
        slider.elt.addEventListener('input', () => {
            effect.wet.value = slider.value() / 100;
        });

        let startButton = createButton('Play / Pause');
        startButton.position(10, i * 100 + 70);
        startButton.mousePressed(() => {
            if (song.state === 'stopped') {
                song.start();
            } else {
                song.stop();
            }
        });;
    });
}