import { useState } from 'react';
import { getRandomBool, getRandomColorRGB } from '../utils/random';

var defaultTheme = {
    main: "#16b897",
    main_dark: "#03362b",
    main_wash: "#bdf2e7",
    highlight: "#b813d1",
    highlight_dark: "#7d078f",
    main_overlay: "white",
    main_dark_overlay: "white",
    background: "white",
    background_text: "black"
};

function rgbToString(rgb) {
    return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
}
/**
 * Shifts the provided color to be darker or lighter by a factor
 * @param {{r,g,b}} rgb - the color as an object with r, g, b properties
 * @param {boolean} dark - whether to make the color darker or lighter (true=darker)
 * @param {number} factor - the factor to darken/lighten by. Should be between 0 and 1, 1 being more dark/light
 * @returns an object with r, g, b properties made darker or lighter
 */
function shiftColorTowards(rgb, dark, factor) {
    if (dark) {
        // make the color darker
        return {
            r: Math.floor(rgb.r * (1 - factor)),
            g: Math.floor(rgb.g * (1 - factor)),
            b: Math.floor(rgb.b * (1 - factor))
        };
    }
    else {
        // make the color lighter
        return {
            r: Math.floor(rgb.r + (256 - rgb.r) * factor),
            g: Math.floor(rgb.g + (256 - rgb.g) * factor),
            b: Math.floor(rgb.b + (256 - rgb.b) * factor)
        };
    }
}

export default function useTheme() {
    const generateTheme = () => {
        const dark = getRandomBool();
        const main = getRandomColorRGB(!dark); // if theme is light, get a dark color and vice-versa
        const highlight = getRandomColorRGB(!dark); // if theme is light, get a dark color and vice-versa
        return {
            main: rgbToString(main),
            main_dark: rgbToString(shiftColorTowards(main, !dark, 0.6)),
            main_light: rgbToString(shiftColorTowards(main, dark, 0.3)),
            main_wash: rgbToString(shiftColorTowards(main, dark, 0.7)),
            highlight: rgbToString(highlight),
            highlight_dark: rgbToString(shiftColorTowards(highlight, !dark, 0.6)),
            highlight_light: rgbToString(shiftColorTowards(highlight, dark, 0.3)),
            highlight_wash: rgbToString(shiftColorTowards(highlight, dark, 0.7)),
            main_overlay: dark ? "black" : "white",
            main_dark_overlay: dark ? "black" : "white",
            background: dark ? rgbToString(shiftColorTowards(main, true, 0.9)) : "white",
            background_text: dark ? "white" : "black"
        };
    }

    const [theme, setTheme] = useState(generateTheme());

    return [theme, () => {setTheme(generateTheme())}];
}