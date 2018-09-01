// Map Data imported from 2 files in the PokeRed project and carefully merged
// by my own code here
// https://codepen.io/junebug12851/pen/yxewaa?editors=0012

// For a modded game or a different version, the pointers may be off so you'll
// have to recalculate with a symbol file

// 1) grep the symbol file to make it more slim
// grep -E "(Blocks|Script|TextPointers)$" <symbol file>.sym > <symbol file>.sym.mapPointers
// This assumes all map objects are labeled with the suffix Blocks, Script, and TextPointers
// Adjust for different suffixes if different and if suffixes are incosnistent then
// none of this can work

// 2) Convert it to JSON
// Find ^(..):(....).(.*)
// Replace {bank: 0x$1, address: 0x$2, name: "$3"},

// 3) Insert it into the "symbols" variable at the codepen link above

// 4) Insert the below map data into the "mapData" variable at the codepen link
//    above, adjust if needed or desired such as a different game version

// 5) Convert map constants file to json
// Find ^\tmapconst (.*?),.*?([0-9].*?),.*?([0-9].*?) ; \$(.*)
// Replace {name: "$1", ind: 0x$4, height: $2, width: $3},
// This assumes map constants are all in a file where each line looks like
// 	mapconst PALLET_TOWN,                 9, 10 ; $00
// Adjust accordingly if needed

// 6) Paste it in the "moreMapData" variable in the codepen link above

// It'll spit out a giant JSON string, here's your JSON data below

// Aliases might need to be played around with if the map name in symbols
// differs from the map name in constants, special and glitch maps need to be
// marked as so so they're not looked up in the symbol file, valid copies
// (Map names ending with "Copy" and which are in the symbol file) need to be
// marked as so
export interface Map {

    // Map Name
    name: string,

    // Map ID/Index
    ind: number,

    // A glitch map?
    glitch?: boolean,

    // A scripted / psuedo map
    special?: boolean,

    // Map Size
    height?: number,
    width?: number,

    // Map Symbol name found in the symbol file in the PokeRed project
    // Used to lookup pointer data
    symbol?: string,

    // Bank number found in the symbol file, could be useful
    bank?: number,

    // There are 2 files in the PokeRed project and sometimes the same map will
    // be listed under 2 dfferent names, alias is the name listed in the symbol
    // file for map pointers and bank # as opposed to the name in map constants
    // which is has the map width, height, and index number
    alias?: string,

    // Map pointers
    dataPtr?: number,
    scriptPtr?: number,
    textPtr?: number,

    // Map size multiplied by 2
    height2x2?: number,
    width2x2?: number,

    // Side Note: You know I must really love doing this because this is a
    // magnificent amount of work ..o.>_<.o..
}