import { useState, useEffect } from 'react';
import { getRandomInt, shuffle } from '../utils/random';

/**
 * A react hook used to choose a random selection of emoji tags to display
 * @param {object} gen - the generator information
 * @param {number} count - how many emojis to pick (if the generator doesn't have that many tags, it may have fewer)
 * @returns a string of all the emojis selected
 */
export default function useEmojis(gen, count) {
    const [emojis, setEmojis] = useState([]);

    useEffect(() => {
        if (!gen || !gen.tags || gen.tags.length === 0) return "";
        if (emojis.length === 0) {
            // the emojis are stored in the database in a unified format which is a series of hex codes
            // use parseInt to convert them to integers
            var codes = gen.tags.map(t => t.split('-').map(p => parseInt(p, 16)));
            // remove codes until you have `count` items
            while (codes.length > count) {
                const indexToRemove = getRandomInt(codes.length);
                codes = codes.filter((_, i) => i !== indexToRemove);
            }
            // shuffle the codes to randomize
            setEmojis(shuffle(codes));
        }
    });
    // you then have to convert the codes to emojis
    return emojis.map(e => String.fromCodePoint(...e));
}