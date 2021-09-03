import { useState, useEffect } from 'react';
import { getRandomInt } from './Generator';

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


function useEmojis(gen, count) {
    const [emojis, setEmojis] = useState([]);

    useEffect(() => {
        if (!gen || !gen.tags || gen.tags.length === 0) return;
        if (emojis.length === 0) {
            var codes = gen.tags.map(t => t.split('-').map(p => parseInt(p, 16)));
            while (codes.length > count) {
                const indexToRemove = getRandomInt(codes.length);
                codes = codes.filter((_, i) => i !== indexToRemove);
            }
            setEmojis(shuffle(codes));
        }
    });

    return emojis.map(e => String.fromCodePoint(...e));
}




export default useEmojis;
export { shuffle }