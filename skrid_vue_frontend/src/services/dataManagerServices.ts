/**
 * Return the sub-array corresponding to the data from page `pageNb`.
 *
 * @param {*} data - the page data ;
 * @param {number} pageNb - the number of the page to get
 * @param {number} numberPerPage - the number of items per page. '*' for all.
 *
 * @return {json[]} data for the page `pageNb`.
 */
export function getPageN(data: any[], pageNb: number, numberPerPage: number) {

    return data.slice((pageNb - 1) * numberPerPage, pageNb * numberPerPage);
}

/**
 * return true if the data is metadata of a collection ie the list of all filename of the collection (used in collectionView.vue), 
 * false otherwise ie the data is the result of a query on the database (with match notes etc. used in searchInterface.vue)
 * @param data fetched from the database
 * @returns {boolean}
 */
export function isCollectionData(data: Array<any>): boolean {
    return data[0].hasOwnProperty('s') || (data[0].hasOwnProperty('_fields') && data[0]._fields[0].hasOwnProperty('properties'));
}

/**
 * Return the color to use.
 *
 * Internally it uses three colours.
 *
 * @param {float} degree - the match degree for a given note
 * @returns {string} a color corresponding best to `degree`
 */
function getGradientColor(degree: any): string {
    const gray = {r: 100, g: 100, b: 100};
    const white = {r: 255, g: 255, b: 255};
    const red = {r: 255, g: 0, b: 0};
    const green = {r: 0, g: 255, b: 0};
    const dark_green = {r: 0, g: 179, b: 0};
    const blue = {r: 0, g: 0, b: 255};
    const yellow = {r: 255, g: 255, b: 0};
    const dark_yellow = {r: 215, g: 215, b: 0};
    const cyan = {r: 0, g: 255, b: 255};

    let a = dark_green;
    let b = dark_yellow;
    let c = red;

    if (degree > 0.5)
        return interpolateBetweenColors(a, b, 200 * (degree - 0.5)); // the degree is transformed from interval ]0.5 ; 1] to ]0 ; 100] linearly.
    else
        return interpolateBetweenColors(b, c, 200 * degree); // the degree is transformed from interval [0 ; 0.5] to [0 ; 100] linearly.

    // return interpolateBetweenColors(dark_green, red, 100 * degree);
}

/**
 * Return a color between `fromColor` and `toColor`, at `percent`%
 *
 * @param {json} fromColor - the origin color (0%). Format : {r: [nb], g: [nb], b: [nb]}, with 0 <= nb < 256 ;
 * @param {json} toColor - the destination color (100%). Format : {r: [nb], g: [nb], b: [nb]} ;
 * @param {number} percent - the percentage.
 *
 * @returns {string} an RGB string.
 */
function interpolateBetweenColors(fromColor: any, toColor: any, percent: number):string {
    const delta = percent / 100;
    const r = Math.round(toColor.r + (fromColor.r - toColor.r) * delta);
    const g = Math.round(toColor.g + (fromColor.g - toColor.g) * delta);
    const b = Math.round(toColor.b + (fromColor.b - toColor.b) * delta);

    return `rgb(${r}, ${g}, ${b})`;
};