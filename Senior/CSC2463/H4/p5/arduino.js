class Arduino {
    /**
     * @param {any} serialPortName
     */
    constructor(serialPortName) {
        this.XPressedTrigger = new Trigger();
        this.YPressedTrigger = new Trigger();
        this.AnalogTrigger = new Trigger();
        this._serialPort = new p5.SerialPort();
        this._serialPort.open(serialPortName);
        this._serialPort.on('data', () => {
            const data = this._serialPort.readLine();
            if (!data) {
                return;
            }
            if (data === 'X') {
                this.XPressedTrigger.trigger();
            }
            else if (data === 'Y') {
                this.YPressedTrigger.trigger();
            }
            else {
                this.AnalogTrigger.trigger(data);
            }
        });
    }
    buzz() {
        this._serialPort.write('S');
    }
}


class ArduinoActions {
    /**
     * @param {Arduino} arduino
     * @param {Trigger} bugSquishTrigger
     * @param {Trigger} drawTrigger
     * @param {Trigger} mouseClickedTrigger
     */
    constructor(arduino, bugSquishTrigger, drawTrigger, mouseClickedTrigger) {
        bugSquishTrigger.subscribe(() => {
            arduino.buzz();
        });

        let x = width / 2;
        let y = height / 2;
        let xMode = true;

        const rectSize = 100;

        drawTrigger.subscribe(() => {
            push();
            noFill();
            stroke('red');
            strokeWeight(4);
            rect(x, y, rectSize, rectSize, 5);
            pop();
        });

        arduino.YPressedTrigger.subscribe(() => {
            xMode = !xMode;
        });

        arduino.XPressedTrigger.subscribe(() => {
            mouseClickedTrigger.trigger(x + rectSize / 2, y + rectSize / 2);
        });

        arduino.AnalogTrigger.subscribe((data) => {
            if (xMode) {
                x = map(data, 0, 1023, width, 0);
            } else {
                y = map(data, 0, 1023, height, 0);
            }
        });
    }
}