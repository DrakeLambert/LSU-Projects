const portName = 'COM3';
// @ts-ignore
const serial = new p5.SerialPort();
let piano;
let arduinoSequencer;
let gameManager;

function setup() {
    createCanvas(windowWidth, windowHeight);

    const w = 1000;
    const h = 500;
    const keyNotes = [
        { key: 'a', note: 'c4' },
        { key: 's', note: 'd4' },
        { key: 'd', note: 'e4' },
        { key: 'f', note: 'f4' },
        { key: 'g', note: 'g4' }
    ];
    piano = new Piano(windowWidth / 2 - w / 2, windowHeight / 2 - h / 2, w, h, keyNotes, drawTrigger, keyPressedTrigger);
    arduinoSequencer = new ArduinoSequencer(serial, keyNotes.length, 500);
    gameManager = new GameManager(drawTrigger, keyPressedTrigger, arduinoSequencer, keyNotes, piano);

    serial.open(portName);
    serial.on('data', () => {
        const data = serial.read();
        if (data[0] === 'P') {
            console.log(data);
        } else if (data >= 0 && data < keyNotes.length) {
            keyPressedTrigger.trigger(keyNotes[data].key);
        }
    });
}

const drawTrigger = new Trigger();
function draw() {
    background('white');
    drawTrigger.trigger();
}

const keyPressedTrigger = new Trigger();
function keyPressed() {
    keyPressedTrigger.trigger(key, keyCode);
}
