/**
 * Gets a random integer between 0 (inclusive) and max (exclusive)
 * @param {number} max - the exclusive maximum 
 * @returns a random number
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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

export { getRandomInt, shuffle }