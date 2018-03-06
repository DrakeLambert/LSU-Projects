///// Problem 1

function squareNumber(n) {
	let square = n * n;
	console.log('The result of squaring the number ' + n + ' is ' + square + '.');
	return square;
}

function halfNumber(n) {
	let half = n / 2;
	console.log('Half of ' + n + ' is ' + half + '.');
	return half;
}

// Returning .5 instead of 50 because that is the right way to represent fractions
function percentOf(n, m) {
	let percent = n / m;
	console.log(n + ' is ' + percent * 100 + '% of ' + m + '.');
	return percent;
}

function precisionRound(number, precision) {
	var factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}

function areaOfCircle(r) {
	let area = Math.PI * r * r;
	console.log('The area for a circle with radius ' + r + ' is ' + precisionRound(area, 2) + '.');
	return area;
}

function compoundFunction(n) {
	let half = halfNumber(n);
	let square = squareNumber(half);
	let area = areaOfCircle(square);
	let percent = percentOf(square, area);
	return percent;
}

[squareNumber(3), halfNumber(5), percentOf(2, 4), areaOfCircle(2), compoundFunction(3)]


///// Problem 2

let word = 'Fox'.toLowerCase().split('');
let guesses = new Array(word.length);
let points = 0;

for (let i = 0; i < word.length; i++) {
	guesses[i] = '_';
}

function guessLetter(letter) {
	letter = letter.toLowerCase();
	let correctGuess = false;
	for (var i = 0; i < word.length; i++) {
		if (word[i] === letter) {
			guesses[i] = letter;
			correctGuess = true;
		}
	}
	console.log(guesses);
	if (correctGuess) {
		let addedPoints = precisionRound(Math.random() * 10 * guesses.filter(l => l != '_').length, 0);
		points += addedPoints;
		console.log('Congrats on finding a letter! You got ' + addedPoints + ' points!');
	} else {
		console.log('No ' + letter + "'s. You lost 5 points.");
		points -= 5;
	}
	if (!guesses.includes('_')) {
		console.log('You Won!');
	}
	console.log('Points: ' + points);
}

function precisionRound(number, precision) {
	var factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}