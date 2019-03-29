const portName = 'COM5';
const serial = new p5.SerialPort();

let backgroundR = 255;

function setup() {
    createCanvas(windowWidth, windowHeight);

    serial.open(portName);
    serial.on('data', () => {
        const data = serial.read();
        console.log(data);
        backgroundR = data;

    });
}

function draw() {
    background(backgroundR, backgroundR, backgroundR);
    fill(0, 0, 0);
    text('click to change the LED', 10, 10);
}

let message = 'H';
function mouseReleased() {
    if (message === 'H') {
        message = 'L';
    } else {
        message = 'H';
    }
    serial.write(message);
}