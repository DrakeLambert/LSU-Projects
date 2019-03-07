/** @type {RandomBugWalker[]} */
const bugs = [];
let bugImage;
const mouseClickedTrigger = new Trigger();
const drawTrigger = new Trigger();
let gameOverTrigger;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noSmooth();

    bugImage = loadImage('./assets/bug.png');
    
    new BugCounter(bugSquishedTrigger, drawTrigger);
    new BackgroundMusic(mouseClickedTrigger);
    gameOverTrigger = (new GameTimer(drawTrigger, mouseClickedTrigger)).gameOverTrigger;
    new BugSquishSound('./assets/squish.wav', bugSquishedTrigger);
    createBugs(30, 1);
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