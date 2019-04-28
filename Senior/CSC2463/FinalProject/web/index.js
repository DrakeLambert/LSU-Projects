const portName = 'COM3';
// @ts-ignore
const serial = new p5.SerialPort();
let piano;
let arduinoSequencer;
let gameManager;

let backgroundColor = 0;

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
        const data = serial.readStringUntil('\n');
        const dataAsNumber = Number(data);
        if (data.length === 0) {
            return;
        }
        if (data[0] === 'P') {
            backgroundColor = Number(data.slice(1));
        } else if (dataAsNumber >= 0 && dataAsNumber < keyNotes.length) {
            keyPressedTrigger.trigger(keyNotes[dataAsNumber].key);
        } else {
            console.log(data);
        }
    });
}

const drawTrigger = new Trigger();
function draw() {
    background(backgroundColor);
    drawTrigger.trigger();
}

const keyPressedTrigger = new Trigger();
function keyPressed() {
    keyPressedTrigger.trigger(key, keyCode);
}
