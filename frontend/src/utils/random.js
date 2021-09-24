/**
 * Gets a random integer between 0 (inclusive) and max (exclusive)
 * @param {number} max - the exclusive maximum 
 * @returns a random number
 */
function getRandomInt(max) {
  	return Math.floor(Math.random() * max);
}

/**
 * Gets a random boolean
 * @returns either true or false, randomly
 */
function getRandomBool() {
	return Math.random() >= 0.5;
}

/**
 * Shuffle an array to put the items in a random order
 * @param {array} array - the array to shuffle
 * @returns the array with the items shuffled
 */
function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * Gets a random color in the form of an object like {r:100,g:100,b:100}.
 * Tries to make sure the color has enough saturation to be interesting
 * @param {boolean} dark - whether the color should be darker or lighter
 * @returns an object like {r:100,g:100,b:100}
 */
function getRandomColorRGB(dark) {
	var rgb = [];
	if (dark) {
		rgb.push(getRandomInt(140) + 40);
		rgb.push(getRandomInt(180));
		rgb.push(getRandomInt(60));
	}
	else {
		rgb.push(getRandomInt(140) + 35);
		rgb.push(getRandomInt(180) + 75);
		rgb.push(getRandomInt(80) + 175);
	}
	rgb = shuffle(rgb);
	return { r:rgb[0], g:rgb[1], b:rgb[2] };
}

export { getRandomInt, getRandomBool, getRandomColorRGB, shuffle }