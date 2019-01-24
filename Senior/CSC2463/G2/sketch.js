class ColorOptionBox {
	constructor(color, x, y, size) {
		this.color = color;
		this.x = x;
		this.y = y;
		this.size = size
	}

	draw() {
		push();
		stroke('whitesmoke');
		strokeWeight(2);
		fill(this.color);
		rect(this.x, this.y, this.size, this.size);
		pop();
	}

	containsPoint(x, y) {
		return x <= this.x + this.size && x >= this.x && y <= this.y + this.size && y >= this.y;
	}
}

const possibleCursorColors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'brown', 'white', 'black']
const colorOptionBoxes = possibleCursorColors.map((color, i) => new ColorOptionBox(color, 2, 2 + 2 * i + i * 20, 20));
let cursorColor = possibleCursorColors[0];

function setup() {
	document.body.style.margin = 0;
	createCanvas(windowWidth - 10, windowHeight - 10);
	background('whitesmoke');
}

function draw() {
	colorOptionBoxes.forEach((box, i) => {
		box.draw();
	});
}

function mouseClicked() {
	for (box of colorOptionBoxes) {
		if (box.containsPoint(mouseX, mouseY)) {
			cursorColor = box.color;
			break;
		}
	}
}

function mouseDragged() {
	push();
	stroke(cursorColor);
	strokeWeight(10);
	line(pmouseX, pmouseY, mouseX, mouseY);
	pop();
}
