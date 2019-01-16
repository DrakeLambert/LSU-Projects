function setup() {
    createCanvas(300, 700)
    background('white');
    drawEx1();
    drawEx2();
    drawEx3();
    drawEx4();
}

function drawEx1() {
    fill(0, 255, 0);
    strokeWeight(0);
    rect(0, 0, 200, 100);

    fill('white');
    strokeWeight(1);
    ellipse(50, 50, 75, 75);
    rect(112.5, 12.5, 75, 75);
}

function drawEx2() {
    noStroke();
    fill('rgba(255,0,0,0.5)')
    ellipse(100, 150, 75, 75);
    fill('rgba(0,255,0,0.5)')
    ellipse(125, 187.5, 75, 75);
    fill('rgba(0,0,255,0.5)')
    ellipse(75, 187.5, 75, 75);
}

function drawEx3() {
    let yOffset = 237.5;
    noStroke();
    fill('black');
    rect(0, yOffset, 200, 100);

    fill('yellow');
    strokeWeight(1);
    arc(50, yOffset + 50, 75, 75, PI + QUARTER_PI, PI - QUARTER_PI);

    fill('red');
    arc(150, yOffset + 50, 75, 75, PI, 2 * PI);
    rect(112.5, yOffset + 50, 75, 75 / 2);
    fill('white');
    ellipse(125 + 12.5 / 2, yOffset + 50, 25, 25);
    ellipse(150 + 12.5 * 1.5, yOffset + 50, 25, 25);
    fill('blue');
    ellipse(125 + 12.5 / 2, yOffset + 50, 15, 15);
    ellipse(150 + 12.5 * 1.5, yOffset + 50, 15, 15);
}

function drawEx4() {
    const yOffset = 350;
    fill('darkblue');
    rect(0, yOffset, 200, 200);

    strokeWeight(3);
    stroke('white');
    fill('green');
    ellipse(100, yOffset + 100, 100, 100);

    const cX = 100;
    const cY = yOffset + 100;

    const pointCount = 5;
    const startAngle = 1.5 * PI;

    const angleIncrement = 2 * PI / pointCount;
    const endAngle = 2 * PI + startAngle;
    fill('red');
    beginShape();
    for (let i = startAngle; i <= endAngle; i += angleIncrement) {
        vertex(cX + cos(i) * 50, cY + sin(i) * 50);
        vertex(cX + cos(i + angleIncrement / 2) * 20, cY + sin(i + angleIncrement / 2) * 20);
    }
    endShape();
}
