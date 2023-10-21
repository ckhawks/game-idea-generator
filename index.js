const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const options = loadJSON('./options.json');

// import options from './options.json' // assert { type: "json" };
import fs from 'fs';

// generate weighted random number from each category to use. maybe random number determines if the category evne shows up

// categories:
// ===================
// genres 40%, 1-2 
// theme 70%, 1-2
// features 40%, 1-3 
// objects 40%, 1-3 
// verbs 40%, 1-2 
// places 40%, 1-2 
// format 30%, 1  
// style 40%, 1-2  
// color 30%, 1

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function useChance(percentageToSucceed) {
    let random = getRandomInt(100); // returns 0-99
    let percentageNumber = percentageToSucceed * 100;

    return random < percentageNumber;
}

// take array of items and max number of items to add and return them
function randomItemsFromSource(items, max) {
    let random = getRandomInt(max) + 1

    let randomItems = []
    for(let i = 0; i < random; i++) {
        let itemToAddIndex = getRandomInt(items.length);

        randomItems.push(items[itemToAddIndex].replace("\n", "").replace("\r", ""))
    }
    return randomItems;
}

function maybeAddS(items, word) {
    if (items.length > 1) {
        return word + "s: ";
    }
    return word + ": ";
}

let output = []

// THEME
if (useChance(0.7)) {
    let themes = randomItemsFromSource(options.theme, 2)

    output.push(maybeAddS(themes, "Theme") + themes.join(', '))
}

// GENRE
if (useChance(0.4)) {
    let genres = randomItemsFromSource(options.genre, 2)
    output.push(maybeAddS(genres, "Genre") + genres.join(', '))
}

// FEATURES
if (useChance(0.4)) {
    let features = randomItemsFromSource(options.feature, 3)
    output.push(maybeAddS(features, "Feature") + features.join(', '))
}



// OBJECTS
if (useChance(0.4)) {
    var objectsList = fs.readFileSync('objects.txt').toString().split("\n");

    let objects = randomItemsFromSource(objectsList, 3) 
    output.push(maybeAddS(objects, "Object") + objects.join(', ')) 
}

// VERBS
if (useChance(0.4)) {
    var verbsList = fs.readFileSync('verbs.txt').toString().split("\n");

    let verbs = randomItemsFromSource(verbsList, 2) 
    console.log("verbs", verbs)
    let out = "Where you: " + verbs.join(', ')
    console.log("verbout", out)
    output.push(out)
}

// PLACES
if (useChance(0.4)) {
    var placesList = fs.readFileSync('places.txt').toString().split("\r");

    let places = randomItemsFromSource(placesList, 2)
    console.log("places", places) 
    let placeout = "At: " + places.join(', ')
    console.log("placeout", placeout)
    output.push(placeout)
}

// FORMATS
if (useChance(0.3)) {
    let formats = randomItemsFromSource(options.format, 1)
    output.push(maybeAddS(formats, "Format") + formats.join(', '))
}

// STYLES
if (useChance(0.4)) {
    let styles = randomItemsFromSource(options.style, 2)
    output.push(maybeAddS(styles, "Style") + styles.join(', '))
}

// COLORS
if (useChance(0.3)) {
    let colors = randomItemsFromSource(options.color, 1)
    output.push(maybeAddS(colors, "Color") + colors.join(', '))
}

console.log("")
console.log("-===THE-NEXT-BIG-GAME===-")
console.log("")

// print out the result
for (let line in output) {
    console.log(output[line])
}
console.log("")