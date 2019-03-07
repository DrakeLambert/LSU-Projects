/** @type {RandomBugWalker[]} */
const bugs = [];
let bugImage;
const mouseClickedTrigger = new Trigger();
const drawTrigger = new Trigger();

function setup() {
    createCanvas(windowWidth, windowHeight);
    noSmooth();

    bugImage = loadImage('assets/bug.png');
    createBugs(30, 1);
    new BugCounter(bugSquishedTrigger, drawTrigger);
    new GameTimer(drawTrigger);
    new BackgroundMusic(mouseClickedTrigger);
}

function draw() {
    background('white');
    drawTrigger.trigger();
}

function mouseClicked() {
    mouseClickedTrigger.trigger(mouseX, mouseY);
}

function createBugs(count, difficulty) {
    for (let i = 0; i < count; i++) {
        bugs.push(new RandomBugWalker(difficulty, difficulty, mouseClickedTrigger, drawTrigger, gameOverTrigger))
    }
}