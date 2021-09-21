/**
 * Convert a number to a string to be displayed. Larger numbers will be formatted to
 * remove digits such as "1.2k" instead of 1200. This also rounds the number down,
 * for example, 9999 should be printed as "9.9k" instead of rounded to "10k"
 * @param {*} n the number to format
 * @returns that number as a formatted string
 */
function formatNumber(n) {
    if (n >= 10000000) return (Math.floor(n / 1000000)).toFixed(0) + 'M';
    if (n >= 1000000) return (Math.floor(n / 100000) / 10).toFixed(1) + 'M';
    if (n >= 10000) return (Math.floor(n / 1000)).toFixed(0) + 'k';
    if (n >= 1000) return (Math.floor(n / 100) / 10).toFixed(1) + 'k';
    return n.toFixed(0);
}

export default formatNumber;