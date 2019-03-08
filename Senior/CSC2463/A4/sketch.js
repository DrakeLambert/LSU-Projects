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
    const gameTimer = new GameTimer(drawTrigger, mouseClickedTrigger);
    gameOverTrigger = gameTimer.gameOverTrigger;
    new BackgroundMusic(gameTimer.gameStartTrigger, gameTimer.gameOverTrigger, bugSquishedTrigger);
    new BugSquishSound('./assets/squish.wav', bugSquishedTrigger);
    new MissedClickSound(bugSquishedTrigger, mouseClickedTrigger, './assets/fart.wav')
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