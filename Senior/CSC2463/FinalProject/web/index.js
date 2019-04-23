let piano;

function setup() {
    createCanvas(windowWidth, windowHeight);

    const w = 1000;
    const h = 500;
    piano = new Piano(windowWidth / 2 - w / 2, windowHeight / 2 - h / 2, w, h, [
        { key: 'a', note: 'c4' },
        { key: 's', note: 'd4' },
        { key: 'd', note: 'e4' },
        { key: 'f', note: 'f4' },
        { key: 'g', note: 'g4' }
    ]);
}


function draw() {
    background('white');
    piano.draw();
}