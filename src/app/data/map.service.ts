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

import { Injectable } from '@angular/core';

export interface RawMap {

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

export const rawMaps: RawMap[] = [
    {
        "name": "Pallet Town",
        "ind": 0,
        "symbol": "PalletTown",
        "bank": 6,
        "dataPtr": 17149,
        "scriptPtr": 20059,
        "textPtr": 20360,
        "width": 10,
        "height": 9
    },
    {
        "name": "Viridian City",
        "ind": 1,
        "symbol": "ViridianCity",
        "bank": 6,
        "dataPtr": 17388,
        "scriptPtr": 20465,
        "textPtr": 20708,
        "width": 20,
        "height": 18
    },
    {
        "name": "Pewter City",
        "ind": 2,
        "symbol": "PewterCity",
        "bank": 6,
        "dataPtr": 17894,
        "scriptPtr": 21047,
        "textPtr": 21387,
        "width": 20,
        "height": 18
    },
    {
        "name": "Cerulean City",
        "ind": 3,
        "symbol": "CeruleanCity",
        "bank": 6,
        "dataPtr": 18480,
        "scriptPtr": 21632,
        "textPtr": 22061,
        "width": 20,
        "height": 18
    },
    {
        "name": "Lavender Town",
        "ind": 4,
        "symbol": "LavenderTown",
        "bank": 17,
        "dataPtr": 16517,
        "scriptPtr": 16651,
        "textPtr": 16654,
        "width": 10,
        "height": 9
    },
    {
        "name": "Vermilion City",
        "ind": 5,
        "symbol": "VermilionCity",
        "bank": 6,
        "dataPtr": 19007,
        "scriptPtr": 22433,
        "textPtr": 22639,
        "width": 20,
        "height": 18
    },
    {
        "name": "Celadon City",
        "ind": 6,
        "symbol": "CeladonCity",
        "bank": 6,
        "dataPtr": 16607,
        "scriptPtr": 22870,
        "textPtr": 22886,
        "width": 25,
        "height": 18
    },
    {
        "name": "Fuchsia City",
        "ind": 7,
        "symbol": "FuchsiaCity",
        "bank": 6,
        "dataPtr": 19590,
        "scriptPtr": 23083,
        "textPtr": 23086,
        "width": 20,
        "height": 18
    },
    {
        "name": "Cinnabar Island",
        "ind": 8,
        "symbol": "CinnabarIsland",
        "bank": 7,
        "dataPtr": 16489,
        "scriptPtr": 18969,
        "textPtr": 19073,
        "width": 10,
        "height": 9
    },
    {
        "name": "Indigo Plateau",
        "ind": 9,
        "symbol": "IndigoPlateau",
        "bank": 20,
        "dataPtr": 18762,
        "scriptPtr": 18741,
        "textPtr": 18742,
        "width": 10,
        "height": 9
    },
    {
        "name": "Saffron City",
        "ind": 10,
        "symbol": "SaffronCity",
        "bank": 20,
        "dataPtr": 19096,
        "scriptPtr": 19456,
        "textPtr": 19459,
        "width": 20,
        "height": 18
    },
    {
        "name": "Unused Map 0B",
        "ind": 11,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Route 1",
        "ind": 12,
        "symbol": "Route1",
        "bank": 7,
        "dataPtr": 16636,
        "scriptPtr": 19119,
        "textPtr": 19122,
        "width": 10,
        "height": 18
    },
    {
        "name": "Route 2",
        "ind": 13,
        "symbol": "Route2",
        "bank": 21,
        "dataPtr": 16510,
        "scriptPtr": 21731,
        "textPtr": 21734,
        "width": 10,
        "height": 36
    },
    {
        "name": "Route 3",
        "ind": 14,
        "symbol": "Route3",
        "bank": 21,
        "dataPtr": 16981,
        "scriptPtr": 21752,
        "textPtr": 21777,
        "width": 35,
        "height": 9
    },
    {
        "name": "Route 4",
        "ind": 15,
        "symbol": "Route4",
        "bank": 21,
        "dataPtr": 17388,
        "scriptPtr": 22104,
        "textPtr": 22129,
        "width": 45,
        "height": 9
    },
    {
        "name": "Route 5",
        "ind": 16,
        "symbol": "Route5",
        "bank": 21,
        "dataPtr": 17874,
        "scriptPtr": 22194,
        "textPtr": 22197,
        "width": 10,
        "height": 18
    },
    {
        "name": "Route 6",
        "ind": 17,
        "symbol": "Route6",
        "bank": 22,
        "dataPtr": 16505,
        "scriptPtr": 20656,
        "textPtr": 20681,
        "width": 10,
        "height": 18
    },
    {
        "name": "Route 7",
        "ind": 18,
        "symbol": "Route7",
        "bank": 18,
        "dataPtr": 16465,
        "scriptPtr": 16722,
        "textPtr": 16725,
        "width": 10,
        "height": 9
    },
    {
        "name": "Route 8",
        "ind": 19,
        "symbol": "Route8",
        "bank": 22,
        "dataPtr": 16838,
        "scriptPtr": 20918,
        "textPtr": 20943,
        "width": 30,
        "height": 9
    },
    {
        "name": "Route 9",
        "ind": 20,
        "symbol": "Route9",
        "bank": 21,
        "dataPtr": 18174,
        "scriptPtr": 22204,
        "textPtr": 22229,
        "width": 30,
        "height": 9
    },
    {
        "name": "Route 10",
        "ind": 21,
        "symbol": "Route10",
        "bank": 22,
        "dataPtr": 17238,
        "scriptPtr": 21302,
        "textPtr": 21327,
        "width": 10,
        "height": 36
    },
    {
        "name": "Route 11",
        "ind": 22,
        "symbol": "Route11",
        "bank": 22,
        "dataPtr": 17759,
        "scriptPtr": 21580,
        "textPtr": 21605,
        "width": 30,
        "height": 9
    },
    {
        "name": "Route 12",
        "ind": 23,
        "symbol": "Route12",
        "bank": 22,
        "dataPtr": 18192,
        "scriptPtr": 22003,
        "textPtr": 22133,
        "width": 10,
        "height": 54
    },
    {
        "name": "Route 13",
        "ind": 24,
        "symbol": "Route13",
        "bank": 21,
        "dataPtr": 18571,
        "scriptPtr": 22558,
        "textPtr": 22583,
        "width": 30,
        "height": 9
    },
    {
        "name": "Route 14",
        "ind": 25,
        "symbol": "Route14",
        "bank": 21,
        "dataPtr": 18962,
        "scriptPtr": 22995,
        "textPtr": 23020,
        "width": 10,
        "height": 27
    },
    {
        "name": "Route 15",
        "ind": 26,
        "symbol": "Route15",
        "bank": 22,
        "dataPtr": 18892,
        "scriptPtr": 22446,
        "textPtr": 22471,
        "width": 30,
        "height": 9
    },
    {
        "name": "Route 16",
        "ind": 27,
        "symbol": "Route16",
        "bank": 22,
        "dataPtr": 19332,
        "scriptPtr": 22835,
        "textPtr": 22969,
        "width": 20,
        "height": 9
    },
    {
        "name": "Route 17",
        "ind": 28,
        "symbol": "Route17",
        "bank": 21,
        "dataPtr": 19368,
        "scriptPtr": 23418,
        "textPtr": 23443,
        "width": 10,
        "height": 72
    },
    {
        "name": "Route 18",
        "ind": 29,
        "symbol": "Route18",
        "bank": 22,
        "dataPtr": 19612,
        "scriptPtr": 23239,
        "textPtr": 23264,
        "width": 25,
        "height": 9
    },
    {
        "name": "Route 19",
        "ind": 30,
        "symbol": "Route19",
        "bank": 21,
        "dataPtr": 20209,
        "scriptPtr": 23876,
        "textPtr": 23901,
        "width": 10,
        "height": 27
    },
    {
        "name": "Route 20",
        "ind": 31,
        "symbol": "Route20",
        "bank": 20,
        "dataPtr": 16765,
        "scriptPtr": 19625,
        "textPtr": 19746,
        "width": 50,
        "height": 9
    },
    {
        "name": "Route 21",
        "ind": 32,
        "symbol": "Route21",
        "bank": 21,
        "dataPtr": 20589,
        "scriptPtr": 24299,
        "textPtr": 24324,
        "width": 10,
        "height": 45
    },
    {
        "name": "Route 22",
        "ind": 33,
        "symbol": "Route22",
        "bank": 20,
        "dataPtr": 16445,
        "scriptPtr": 20146,
        "textPtr": 20853,
        "width": 20,
        "height": 9
    },
    {
        "name": "Route 23",
        "ind": 34,
        "symbol": "Route23",
        "bank": 20,
        "dataPtr": 17330,
        "scriptPtr": 20954,
        "textPtr": 21239,
        "width": 10,
        "height": 72
    },
    {
        "name": "Route 24",
        "ind": 35,
        "symbol": "Route24",
        "bank": 20,
        "dataPtr": 18151,
        "scriptPtr": 21421,
        "textPtr": 21579,
        "width": 10,
        "height": 18
    },
    {
        "name": "Route 25",
        "ind": 36,
        "symbol": "Route25",
        "bank": 20,
        "dataPtr": 18448,
        "scriptPtr": 21963,
        "textPtr": 22056,
        "width": 30,
        "height": 9
    },
    {
        "name": "Reds House 1F",
        "ind": 37,
        "symbol": "RedsHouse1F",
        "bank": 18,
        "dataPtr": 16905,
        "scriptPtr": 16744,
        "textPtr": 16747,
        "width": 4,
        "height": 4
    },
    {
        "name": "Reds House 2F",
        "ind": 38,
        "symbol": "RedsHouse2F",
        "bank": 23,
        "dataPtr": 16400,
        "scriptPtr": 16560,
        "textPtr": 16591,
        "width": 4,
        "height": 4
    },
    {
        "name": "Blues House",
        "ind": 39,
        "symbol": "BluesHouse",
        "bank": 6,
        "dataPtr": 23542,
        "scriptPtr": 23355,
        "textPtr": 23383,
        "width": 4,
        "height": 4
    },
    {
        "name": "Oaks Lab",
        "ind": 40,
        "symbol": "OaksLab",
        "bank": 7,
        "dataPtr": 16832,
        "scriptPtr": 19214,
        "textPtr": 20610,
        "width": 5,
        "height": 6
    },
    {
        "name": "Viridian Pokecenter",
        "ind": 41,
        "symbol": "ViridianPokecenter",
        "bank": 17,
        "dataPtr": 16607,
        "scriptPtr": 16989,
        "textPtr": 16995,
        "width": 7,
        "height": 4
    },
    {
        "name": "Viridian Mart",
        "ind": 42,
        "symbol": "ViridianMart",
        "bank": 7,
        "dataPtr": 21808,
        "scriptPtr": 21614,
        "textPtr": 21728,
        "width": 4,
        "height": 4
    },
    {
        "name": "Viridian School",
        "ind": 43,
        "symbol": "School",
        "bank": 7,
        "dataPtr": 16878,
        "scriptPtr": 21836,
        "textPtr": 21839,
        "alias": "School",
        "width": 4,
        "height": 4
    },
    {
        "name": "Viridian House",
        "ind": 44,
        "symbol": "ViridianHouse",
        "bank": 7,
        "dataPtr": 16862,
        "scriptPtr": 21898,
        "textPtr": 21901,
        "width": 4,
        "height": 4
    },
    {
        "name": "Viridian Gym",
        "ind": 45,
        "symbol": "ViridianGym",
        "bank": 29,
        "dataPtr": 19527,
        "scriptPtr": 18595,
        "textPtr": 18924,
        "width": 10,
        "height": 9
    },
    {
        "name": "Digletts Cave Exit",
        "ind": 46,
        "symbol": "DiglettsCaveRoute2",
        "bank": 7,
        "dataPtr": 16910,
        "scriptPtr": 24240,
        "textPtr": 24248,
        "alias": "Digletts Cave Route 2",
        "width": 4,
        "height": 4
    },
    {
        "name": "Viridian Forest Exit",
        "ind": 47,
        "symbol": "ViridianForestExit",
        "bank": 23,
        "dataPtr": 16528,
        "scriptPtr": 21895,
        "textPtr": 21898,
        "width": 5,
        "height": 4
    },
    {
        "name": "Route 2 House",
        "ind": 48,
        "symbol": "Route2House",
        "bank": 7,
        "dataPtr": 16862,
        "scriptPtr": 24301,
        "textPtr": 24304,
        "width": 4,
        "height": 4
    },
    {
        "name": "Route 2 Gate",
        "ind": 49,
        "symbol": "Route2Gate",
        "bank": 23,
        "dataPtr": 16528,
        "scriptPtr": 21972,
        "textPtr": 21975,
        "width": 5,
        "height": 4
    },
    {
        "name": "Viridian Forest Entrance",
        "ind": 50,
        "symbol": "ViridianForestEntrance",
        "bank": 23,
        "dataPtr": 16528,
        "scriptPtr": 22108,
        "textPtr": 22111,
        "width": 5,
        "height": 4
    },
    {
        "name": "Viridian Forest",
        "ind": 51,
        "symbol": "ViridianForest",
        "bank": 24,
        "dataPtr": 16384,
        "scriptPtr": 20749,
        "textPtr": 20774,
        "width": 17,
        "height": 24
    },
    {
        "name": "Museum 1F",
        "ind": 52,
        "symbol": "Museum1F",
        "bank": 23,
        "dataPtr": 16416,
        "scriptPtr": 16631,
        "textPtr": 16683,
        "width": 10,
        "height": 4
    },
    {
        "name": "Museum 2F",
        "ind": 53,
        "symbol": "Museum2F",
        "bank": 23,
        "dataPtr": 16456,
        "scriptPtr": 17175,
        "textPtr": 17178,
        "width": 7,
        "height": 4
    },
    {
        "name": "Pewter Gym",
        "ind": 54,
        "symbol": "PewterGym",
        "bank": 23,
        "dataPtr": 17752,
        "scriptPtr": 17287,
        "textPtr": 17461,
        "width": 5,
        "height": 7
    },
    {
        "name": "Pewter House 1",
        "ind": 55,
        "symbol": "PewterHouse1",
        "bank": 7,
        "dataPtr": 16862,
        "scriptPtr": 22003,
        "textPtr": 22006,
        "width": 4,
        "height": 4
    },
    {
        "name": "Pewter Mart",
        "ind": 56,
        "symbol": "PewterMart",
        "bank": 29,
        "dataPtr": 16400,
        "scriptPtr": 19629,
        "textPtr": 19638,
        "width": 4,
        "height": 4
    },
    {
        "name": "Pewter House 2",
        "ind": 57,
        "symbol": "PewterHouse2",
        "bank": 7,
        "dataPtr": 16862,
        "scriptPtr": 22088,
        "textPtr": 22091,
        "width": 4,
        "height": 4
    },
    {
        "name": "Pewter Pokecenter",
        "ind": 58,
        "symbol": "PewterPokecenter",
        "bank": 23,
        "dataPtr": 16484,
        "scriptPtr": 17799,
        "textPtr": 17805,
        "width": 7,
        "height": 4
    },
    {
        "name": "Mt. Moon 1",
        "ind": 59,
        "symbol": "MtMoon1",
        "bank": 18,
        "dataPtr": 23447,
        "scriptPtr": 22984,
        "textPtr": 23009,
        "width": 20,
        "height": 18
    },
    {
        "name": "Mt. Moon 2",
        "ind": 60,
        "symbol": "MtMoon2",
        "bank": 20,
        "dataPtr": 23185,
        "scriptPtr": 23106,
        "textPtr": 23110,
        "width": 14,
        "height": 14
    },
    {
        "name": "Mt. Moon 3",
        "ind": 61,
        "symbol": "MtMoon3",
        "bank": 18,
        "dataPtr": 24641,
        "scriptPtr": 23819,
        "textPtr": 24116,
        "width": 20,
        "height": 18
    },
    {
        "name": "Trashed House",
        "ind": 62,
        "symbol": "CeruleanHouseTrashed",
        "bank": 7,
        "dataPtr": 16894,
        "scriptPtr": 22149,
        "textPtr": 22153,
        "alias": "Cerulean House Trashed",
        "width": 4,
        "height": 4
    },
    {
        "name": "Cerulean House 1",
        "ind": 63,
        "symbol": "CeruleanHouse1",
        "bank": 7,
        "dataPtr": 16862,
        "scriptPtr": 22262,
        "textPtr": 22265,
        "width": 4,
        "height": 4
    },
    {
        "name": "Cerulean Pokecenter",
        "ind": 64,
        "symbol": "CeruleanPokecenter",
        "bank": 23,
        "dataPtr": 18059,
        "scriptPtr": 17989,
        "textPtr": 17995,
        "width": 7,
        "height": 4
    },
    {
        "name": "Cerulean Gym",
        "ind": 65,
        "symbol": "CeruleanGym",
        "bank": 23,
        "dataPtr": 18534,
        "scriptPtr": 18099,
        "textPtr": 18250,
        "width": 5,
        "height": 7
    },
    {
        "name": "Bike Shop",
        "ind": 66,
        "symbol": "BikeShop",
        "bank": 7,
        "dataPtr": 22668,
        "scriptPtr": 22332,
        "textPtr": 22335,
        "width": 4,
        "height": 4
    },
    {
        "name": "Cerulean Mart",
        "ind": 67,
        "symbol": "CeruleanMart",
        "bank": 23,
        "dataPtr": 16384,
        "scriptPtr": 18581,
        "textPtr": 18584,
        "width": 4,
        "height": 4
    },
    {
        "name": "Mt. Moon Pokecenter",
        "ind": 68,
        "symbol": "MtMoonPokecenter",
        "bank": 18,
        "dataPtr": 16555,
        "scriptPtr": 21199,
        "textPtr": 21205,
        "width": 7,
        "height": 4
    },
    {
        "name": "Trashed House Copy",
        "ind": 69,
        "symbol": "CeruleanHouseTrashed",
        "bank": 7,
        "dataPtr": 16894,
        "scriptPtr": 22149,
        "textPtr": 22153,
        "alias": "Cerulean House Trashed",
        "width": 4,
        "height": 4
    },
    {
        "name": "Route 5 Gate",
        "ind": 70,
        "symbol": "Route5Gate",
        "bank": 7,
        "dataPtr": 24613,
        "scriptPtr": 24371,
        "textPtr": 24484,
        "width": 4,
        "height": 3
    },
    {
        "name": "Path Entrance Route 5",
        "ind": 71,
        "symbol": "UndergroundPathEntranceRoute5",
        "bank": 23,
        "dataPtr": 16512,
        "scriptPtr": 22185,
        "textPtr": 22192,
        "alias": "Underground Path Entrance Route 5",
        "width": 4,
        "height": 4
    },
    {
        "name": "Daycare",
        "ind": 72,
        "symbol": "DayCareM",
        "bank": 21,
        "dataPtr": 21039,
        "scriptPtr": 25167,
        "textPtr": 25170,
        "alias": "Day Care M",
        "width": 4,
        "height": 4
    },
    {
        "name": "Route 6 Gate",
        "ind": 73,
        "symbol": "Route6Gate",
        "bank": 7,
        "dataPtr": 24808,
        "scriptPtr": 24637,
        "textPtr": 24760,
        "width": 4,
        "height": 3
    },
    {
        "name": "Path Entrance Route 6",
        "ind": 74,
        "symbol": "UndergroundPathEntranceRoute6",
        "bank": 23,
        "dataPtr": 16512,
        "scriptPtr": 22255,
        "textPtr": 22263,
        "alias": "Underground Path Entrance Route 6",
        "width": 4,
        "height": 4
    },
    {
        "name": "Path Entrance Route 6 Copy",
        "ind": 75,
        "symbol": "UndergroundPathEntranceRoute6",
        "bank": 23,
        "dataPtr": 16512,
        "scriptPtr": 22255,
        "textPtr": 22263,
        "alias": "Underground Path Entrance Route 6",
        "width": 4,
        "height": 4
    },
    {
        "name": "Route 7 Gate",
        "ind": 76,
        "symbol": "Route7Gate",
        "bank": 7,
        "dataPtr": 25007,
        "scriptPtr": 24832,
        "textPtr": 24959,
        "width": 3,
        "height": 4
    },
    {
        "name": "Path Entrance Route 7",
        "ind": 77,
        "symbol": "UndergroundPathEntranceRoute7",
        "bank": 23,
        "dataPtr": 16512,
        "scriptPtr": 22316,
        "textPtr": 22324,
        "alias": "Underground Path Entrance Route 7",
        "width": 4,
        "height": 4
    },
    {
        "name": "Path Entrance Route 7 Copy",
        "ind": 78,
        "symbol": "UndergroundPathEntranceRoute7Copy",
        "bank": 23,
        "dataPtr": 16512,
        "scriptPtr": 22377,
        "textPtr": 22383,
        "alias": "Underground Path Entrance Route 7 Copy",
        "width": 4,
        "height": 4
    },
    {
        "name": "Route 8 Gate",
        "ind": 79,
        "symbol": "Route8Gate",
        "bank": 7,
        "dataPtr": 25201,
        "scriptPtr": 25031,
        "textPtr": 25153,
        "width": 3,
        "height": 4
    },
    {
        "name": "Path Entrance Route 8",
        "ind": 80,
        "symbol": "UndergroundPathEntranceRoute8",
        "bank": 7,
        "dataPtr": 16816,
        "scriptPtr": 25225,
        "textPtr": 25233,
        "alias": "Underground Path Entrance Route 8",
        "width": 4,
        "height": 4
    },
    {
        "name": "Rock Tunnel Pokecenter",
        "ind": 81,
        "symbol": "RockTunnelPokecenter",
        "bank": 18,
        "dataPtr": 16555,
        "scriptPtr": 21434,
        "textPtr": 21440,
        "width": 7,
        "height": 4
    },
    {
        "name": "Rock Tunnel 1",
        "ind": 82,
        "symbol": "RockTunnel1",
        "bank": 17,
        "dataPtr": 18037,
        "scriptPtr": 17628,
        "textPtr": 17653,
        "width": 20,
        "height": 18
    },
    {
        "name": "Power Plant",
        "ind": 83,
        "symbol": "PowerPlant",
        "bank": 7,
        "dataPtr": 25670,
        "scriptPtr": 25286,
        "textPtr": 25311,
        "width": 20,
        "height": 18
    },
    {
        "name": "Route 11 Gate 1F",
        "ind": 84,
        "symbol": "Route11Gate",
        "bank": 18,
        "dataPtr": 16583,
        "scriptPtr": 21516,
        "textPtr": 21519,
        "alias": "Route 11 Gate",
        "width": 4,
        "height": 5
    },
    {
        "name": "Digletts Cave Entrance",
        "ind": 85,
        "symbol": "DiglettsCaveEntranceRoute11",
        "bank": 7,
        "dataPtr": 16910,
        "scriptPtr": 26042,
        "textPtr": 26051,
        "alias": "Digletts Cave Entrance Route 11",
        "width": 4,
        "height": 4
    },
    {
        "name": "Route 11 Gate 2F",
        "ind": 86,
        "symbol": "Route11GateUpstairs",
        "bank": 18,
        "dataPtr": 16603,
        "scriptPtr": 21588,
        "textPtr": 21591,
        "alias": "Route 11 Gate Upstairs",
        "width": 4,
        "height": 4
    },
    {
        "name": "Route 12 Gate 1F",
        "ind": 87,
        "symbol": "Route12Gate",
        "bank": 18,
        "dataPtr": 21824,
        "scriptPtr": 21764,
        "textPtr": 21767,
        "alias": "Route 12 Gate",
        "width": 5,
        "height": 4
    },
    {
        "name": "Bills House",
        "ind": 88,
        "symbol": "BillsHouse",
        "bank": 7,
        "dataPtr": 26885,
        "scriptPtr": 26474,
        "textPtr": 26676,
        "width": 4,
        "height": 4
    },
    {
        "name": "Vermilion Pokecenter",
        "ind": 89,
        "symbol": "VermilionPokecenter",
        "bank": 23,
        "dataPtr": 16484,
        "scriptPtr": 18831,
        "textPtr": 18837,
        "width": 7,
        "height": 4
    },
    {
        "name": "Pokemon Fan Club",
        "ind": 90,
        "symbol": "FanClub",
        "bank": 22,
        "dataPtr": 23765,
        "scriptPtr": 23408,
        "textPtr": 23428,
        "alias": "Fan Club",
        "width": 4,
        "height": 4
    },
    {
        "name": "Vermilion Mart",
        "ind": 91,
        "symbol": "VermilionMart",
        "bank": 23,
        "dataPtr": 16384,
        "scriptPtr": 18913,
        "textPtr": 18916,
        "width": 4,
        "height": 4
    },
    {
        "name": "Vermilion Gym",
        "ind": 92,
        "symbol": "VermilionGym",
        "bank": 23,
        "dataPtr": 19512,
        "scriptPtr": 18982,
        "textPtr": 19176,
        "width": 5,
        "height": 9
    },
    {
        "name": "Vermilion House 1",
        "ind": 93,
        "symbol": "VermilionHouse1",
        "bank": 7,
        "dataPtr": 16862,
        "scriptPtr": 23292,
        "textPtr": 23296,
        "width": 4,
        "height": 4
    },
    {
        "name": "Vermilion Dock",
        "ind": 94,
        "symbol": "VermilionDock",
        "bank": 7,
        "dataPtr": 23770,
        "scriptPtr": 23378,
        "textPtr": 23743,
        "width": 14,
        "height": 6
    },
    {
        "name": "S.S. Anne 1",
        "ind": 95,
        "symbol": "SSAnne1",
        "bank": 24,
        "dataPtr": 21215,
        "scriptPtr": 21093,
        "textPtr": 21097,
        "width": 20,
        "height": 9
    },
    {
        "name": "S.S. Anne 2",
        "ind": 96,
        "symbol": "SSAnne2",
        "bank": 24,
        "dataPtr": 21870,
        "scriptPtr": 21407,
        "textPtr": 21723,
        "width": 20,
        "height": 9
    },
    {
        "name": "S.S. Anne 3",
        "ind": 97,
        "symbol": "SSAnne3",
        "bank": 17,
        "dataPtr": 18774,
        "scriptPtr": 18738,
        "textPtr": 18741,
        "width": 10,
        "height": 3
    },
    {
        "name": "S.S. Anne 4",
        "ind": 98,
        "symbol": "SSAnne4",
        "bank": 24,
        "dataPtr": 22118,
        "scriptPtr": 22062,
        "textPtr": 22065,
        "width": 15,
        "height": 4
    },
    {
        "name": "S.S. Anne 5",
        "ind": 99,
        "symbol": "SSAnne5",
        "bank": 24,
        "dataPtr": 22369,
        "scriptPtr": 22190,
        "textPtr": 22215,
        "width": 10,
        "height": 7
    },
    {
        "name": "S.S. Anne 6",
        "ind": 100,
        "symbol": "SSAnne6",
        "bank": 24,
        "dataPtr": 22609,
        "scriptPtr": 22451,
        "textPtr": 22455,
        "width": 7,
        "height": 8
    },
    {
        "name": "S.S. Anne 7",
        "ind": 101,
        "symbol": "SSAnne7",
        "bank": 24,
        "dataPtr": 22878,
        "scriptPtr": 22677,
        "textPtr": 22695,
        "width": 3,
        "height": 4
    },
    {
        "name": "S.S. Anne 8",
        "ind": 102,
        "symbol": "SSAnne8",
        "bank": 24,
        "dataPtr": 23263,
        "scriptPtr": 22902,
        "textPtr": 22927,
        "width": 12,
        "height": 8
    },
    {
        "name": "S.S. Anne 9",
        "ind": 103,
        "symbol": "SSAnne9",
        "bank": 24,
        "dataPtr": 17344,
        "scriptPtr": 23371,
        "textPtr": 23402,
        "width": 12,
        "height": 8
    },
    {
        "name": "S.S. Anne 10",
        "ind": 104,
        "symbol": "SSAnne10",
        "bank": 24,
        "dataPtr": 17344,
        "scriptPtr": 23893,
        "textPtr": 23918,
        "width": 12,
        "height": 8
    },
    {
        "name": "Unused Map 69",
        "ind": 105,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Unused Map 6A",
        "ind": 106,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Unused Map 6B",
        "ind": 107,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Victory Road 1",
        "ind": 108,
        "symbol": "VictoryRoad1",
        "bank": 23,
        "dataPtr": 23300,
        "scriptPtr": 23050,
        "textPtr": 23135,
        "width": 10,
        "height": 9
    },
    {
        "name": "Unused Map 6D",
        "ind": 109,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Unused Map 6E",
        "ind": 110,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Unused Map 6F",
        "ind": 111,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Unused Map 70",
        "ind": 112,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Lances Room",
        "ind": 113,
        "symbol": "Lance",
        "bank": 22,
        "dataPtr": 25577,
        "scriptPtr": 25262,
        "textPtr": 25493,
        "alias": "Lance",
        "width": 13,
        "height": 13
    },
    {
        "name": "Unused Map 72",
        "ind": 114,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Unused Map 73",
        "ind": 115,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Unused Map 74",
        "ind": 116,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Unused Map 75",
        "ind": 117,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Hall of Fame",
        "ind": 118,
        "symbol": "HallofFameRoom",
        "bank": 22,
        "dataPtr": 25995,
        "scriptPtr": 25758,
        "textPtr": 25962,
        "alias": "Hall of Fame Room",
        "width": 5,
        "height": 4
    },
    {
        "name": "Underground Path NS",
        "ind": 119,
        "symbol": "UndergroundPathNS",
        "bank": 24,
        "dataPtr": 16792,
        "scriptPtr": 24358,
        "textPtr": 24361,
        "width": 4,
        "height": 24
    },
    {
        "name": "Champions Room",
        "ind": 120,
        "symbol": "Gary",
        "bank": 29,
        "dataPtr": 24927,
        "scriptPtr": 24349,
        "textPtr": 24790,
        "alias": "Gary",
        "width": 4,
        "height": 4
    },
    {
        "name": "Underground Path WE",
        "ind": 121,
        "symbol": "UndergroundPathWE",
        "bank": 24,
        "dataPtr": 16884,
        "scriptPtr": 24394,
        "textPtr": 24397,
        "width": 25,
        "height": 4
    },
    {
        "name": "Celadon Mart 1",
        "ind": 122,
        "symbol": "CeladonMart1",
        "bank": 24,
        "dataPtr": 20446,
        "scriptPtr": 20358,
        "textPtr": 20361,
        "width": 10,
        "height": 4
    },
    {
        "name": "Celadon Mart 2",
        "ind": 123,
        "symbol": "CeladonMart2",
        "bank": 21,
        "dataPtr": 24904,
        "scriptPtr": 24821,
        "textPtr": 24824,
        "width": 10,
        "height": 4
    },
    {
        "name": "Celadon Mart 3",
        "ind": 124,
        "symbol": "CeladonMart3",
        "bank": 18,
        "dataPtr": 17186,
        "scriptPtr": 16933,
        "textPtr": 16936,
        "width": 10,
        "height": 4
    },
    {
        "name": "Celadon Mart 4",
        "ind": 125,
        "symbol": "CeladonMart4",
        "bank": 18,
        "dataPtr": 17313,
        "scriptPtr": 17238,
        "textPtr": 17241,
        "width": 10,
        "height": 4
    },
    {
        "name": "Celadon Mart Roof",
        "ind": 126,
        "symbol": "CeladonMartRoof",
        "bank": 18,
        "dataPtr": 17868,
        "scriptPtr": 17365,
        "textPtr": 17755,
        "width": 10,
        "height": 4
    },
    {
        "name": "Celadon Mart Elevator",
        "ind": 127,
        "symbol": "CeladonMartElevator",
        "bank": 18,
        "dataPtr": 18052,
        "scriptPtr": 17920,
        "textPtr": 18012,
        "width": 2,
        "height": 2
    },
    {
        "name": "Celadon Mansion 1",
        "ind": 128,
        "symbol": "CeladonMansion1",
        "bank": 18,
        "dataPtr": 18198,
        "scriptPtr": 18068,
        "textPtr": 18071,
        "width": 4,
        "height": 6
    },
    {
        "name": "Celadon Mansion 2",
        "ind": 129,
        "symbol": "CeladonMansion2",
        "bank": 18,
        "dataPtr": 18284,
        "scriptPtr": 18234,
        "textPtr": 18238,
        "width": 4,
        "height": 6
    },
    {
        "name": "Celadon Mansion 3",
        "ind": 130,
        "symbol": "CeladonMansion3",
        "bank": 18,
        "dataPtr": 18503,
        "scriptPtr": 18320,
        "textPtr": 18323,
        "width": 4,
        "height": 6
    },
    {
        "name": "Celadon Mansion 4",
        "ind": 131,
        "symbol": "CeladonMansion4",
        "bank": 18,
        "dataPtr": 18580,
        "scriptPtr": 18539,
        "textPtr": 18542,
        "width": 4,
        "height": 6
    },
    {
        "name": "Celadon Mansion 5",
        "ind": 132,
        "symbol": "CeladonMansion5",
        "bank": 7,
        "dataPtr": 16878,
        "scriptPtr": 23866,
        "textPtr": 23869,
        "width": 4,
        "height": 4
    },
    {
        "name": "Celadon Pokecenter",
        "ind": 133,
        "symbol": "CeladonPokecenter",
        "bank": 18,
        "dataPtr": 16555,
        "scriptPtr": 18616,
        "textPtr": 18622,
        "width": 7,
        "height": 4
    },
    {
        "name": "Celadon Gym",
        "ind": 134,
        "symbol": "CeladonGym",
        "bank": 18,
        "dataPtr": 19332,
        "scriptPtr": 18698,
        "textPtr": 18854,
        "width": 5,
        "height": 9
    },
    {
        "name": "Game Corner",
        "ind": 135,
        "symbol": "CeladonGameCorner",
        "bank": 18,
        "dataPtr": 20483,
        "scriptPtr": 19389,
        "textPtr": 19594,
        "alias": "Celadon Game Corner",
        "width": 10,
        "height": 9
    },
    {
        "name": "Celadon Mart 5",
        "ind": 136,
        "symbol": "CeladonMart5",
        "bank": 18,
        "dataPtr": 20668,
        "scriptPtr": 20585,
        "textPtr": 20588,
        "width": 10,
        "height": 4
    },
    {
        "name": "Celadon Prize Room",
        "ind": 137,
        "symbol": "CeladonPrizeRoom",
        "bank": 18,
        "dataPtr": 20785,
        "scriptPtr": 20720,
        "textPtr": 20723,
        "width": 5,
        "height": 4
    },
    {
        "name": "Celadon Diner",
        "ind": 138,
        "symbol": "CeladonDiner",
        "bank": 18,
        "dataPtr": 20974,
        "scriptPtr": 20817,
        "textPtr": 20821,
        "width": 5,
        "height": 4
    },
    {
        "name": "Celadon House",
        "ind": 139,
        "symbol": "CeladonHouse",
        "bank": 18,
        "dataPtr": 21069,
        "scriptPtr": 21006,
        "textPtr": 21010,
        "width": 4,
        "height": 4
    },
    {
        "name": "Celadon Hotel",
        "ind": 140,
        "symbol": "CeladonHotel",
        "bank": 18,
        "dataPtr": 21159,
        "scriptPtr": 21097,
        "textPtr": 21100,
        "width": 7,
        "height": 4
    },
    {
        "name": "Lavender Pokecenter",
        "ind": 141,
        "symbol": "LavenderPokecenter",
        "bank": 23,
        "dataPtr": 16484,
        "scriptPtr": 18650,
        "textPtr": 18656,
        "width": 7,
        "height": 4
    },
    {
        "name": "Pokemontower 1",
        "ind": 142,
        "symbol": "PokemonTower1",
        "bank": 24,
        "dataPtr": 17548,
        "scriptPtr": 17452,
        "textPtr": 17455,
        "alias": "Pokemon Tower 1",
        "width": 10,
        "height": 9
    },
    {
        "name": "Pokemontower 2",
        "ind": 143,
        "symbol": "PokemonTower2",
        "bank": 24,
        "dataPtr": 18022,
        "scriptPtr": 17650,
        "textPtr": 17883,
        "alias": "Pokemon Tower 2",
        "width": 10,
        "height": 9
    },
    {
        "name": "Pokemontower 3",
        "ind": 144,
        "symbol": "PokemonTower3",
        "bank": 24,
        "dataPtr": 18320,
        "scriptPtr": 18124,
        "textPtr": 18149,
        "alias": "Pokemon Tower 3",
        "width": 10,
        "height": 9
    },
    {
        "name": "Pokemontower 4",
        "ind": 145,
        "symbol": "PokemonTower4",
        "bank": 24,
        "dataPtr": 18636,
        "scriptPtr": 18422,
        "textPtr": 18447,
        "alias": "Pokemon Tower 4",
        "width": 10,
        "height": 9
    },
    {
        "name": "Pokemontower 5",
        "ind": 146,
        "symbol": "PokemonTower5",
        "bank": 24,
        "dataPtr": 19081,
        "scriptPtr": 18738,
        "textPtr": 18843,
        "alias": "Pokemon Tower 5",
        "width": 10,
        "height": 9
    },
    {
        "name": "Pokemontower 6",
        "ind": 147,
        "symbol": "PokemonTower6",
        "bank": 24,
        "dataPtr": 19605,
        "scriptPtr": 19183,
        "textPtr": 19377,
        "alias": "Pokemon Tower 6",
        "width": 10,
        "height": 9
    },
    {
        "name": "Pokemontower 7",
        "ind": 148,
        "symbol": "PokemonTower7",
        "bank": 24,
        "dataPtr": 20256,
        "scriptPtr": 19717,
        "textPtr": 20031,
        "alias": "Pokemon Tower 7",
        "width": 10,
        "height": 9
    },
    {
        "name": "Lavender House 1",
        "ind": 149,
        "symbol": "LavenderHouse1",
        "bank": 7,
        "dataPtr": 16862,
        "scriptPtr": 22696,
        "textPtr": 22700,
        "width": 4,
        "height": 4
    },
    {
        "name": "Lavender Mart",
        "ind": 150,
        "symbol": "LavenderMart",
        "bank": 23,
        "dataPtr": 16384,
        "scriptPtr": 18732,
        "textPtr": 18735,
        "width": 4,
        "height": 4
    },
    {
        "name": "Lavender House 2",
        "ind": 151,
        "symbol": "LavenderHouse2",
        "bank": 7,
        "dataPtr": 16862,
        "scriptPtr": 22958,
        "textPtr": 22962,
        "width": 4,
        "height": 4
    },
    {
        "name": "Fuchsia Mart",
        "ind": 152,
        "symbol": "FuchsiaMart",
        "bank": 7,
        "dataPtr": 24001,
        "scriptPtr": 23944,
        "textPtr": 23947,
        "width": 4,
        "height": 4
    },
    {
        "name": "Fuchsia House 1",
        "ind": 153,
        "symbol": "FuchsiaHouse1",
        "bank": 29,
        "dataPtr": 16416,
        "scriptPtr": 20504,
        "textPtr": 20508,
        "width": 4,
        "height": 4
    },
    {
        "name": "Fuchsia Pokecenter",
        "ind": 154,
        "symbol": "FuchsiaPokecenter",
        "bank": 29,
        "dataPtr": 16432,
        "scriptPtr": 20579,
        "textPtr": 20585,
        "width": 7,
        "height": 4
    },
    {
        "name": "Fuchsia House 2",
        "ind": 155,
        "symbol": "FuchsiaHouse2",
        "bank": 29,
        "dataPtr": 20909,
        "scriptPtr": 20661,
        "textPtr": 20664,
        "width": 5,
        "height": 4
    },
    {
        "name": "Safari Zone Entrance",
        "ind": 156,
        "symbol": "SafariZoneEntrance",
        "bank": 29,
        "dataPtr": 21541,
        "scriptPtr": 20941,
        "textPtr": 21177,
        "width": 4,
        "height": 3
    },
    {
        "name": "Fuchsia Gym",
        "ind": 157,
        "symbol": "FuchsiaGym",
        "bank": 29,
        "dataPtr": 22186,
        "scriptPtr": 21565,
        "textPtr": 21717,
        "width": 5,
        "height": 9
    },
    {
        "name": "Fuchsia Meeting Room",
        "ind": 158,
        "symbol": "FuchsiaMeetingRoom",
        "bank": 29,
        "dataPtr": 22306,
        "scriptPtr": 22243,
        "textPtr": 22247,
        "width": 7,
        "height": 4
    },
    {
        "name": "Seafoam Islands 2",
        "ind": 159,
        "symbol": "SeafoamIslands2",
        "bank": 17,
        "dataPtr": 25534,
        "scriptPtr": 25365,
        "textPtr": 25458,
        "width": 15,
        "height": 9
    },
    {
        "name": "Seafoam Islands 3",
        "ind": 160,
        "symbol": "SeafoamIslands3",
        "bank": 17,
        "dataPtr": 25850,
        "scriptPtr": 25681,
        "textPtr": 25774,
        "width": 15,
        "height": 9
    },
    {
        "name": "Seafoam Islands 4",
        "ind": 161,
        "symbol": "SeafoamIslands4",
        "bank": 17,
        "dataPtr": 26374,
        "scriptPtr": 25997,
        "textPtr": 26266,
        "width": 15,
        "height": 9
    },
    {
        "name": "Seafoam Islands 5",
        "ind": 162,
        "symbol": "SeafoamIslands5",
        "bank": 17,
        "dataPtr": 26874,
        "scriptPtr": 26521,
        "textPtr": 26748,
        "width": 15,
        "height": 9
    },
    {
        "name": "Vermilion House 2",
        "ind": 163,
        "symbol": "VermilionHouse2",
        "bank": 21,
        "dataPtr": 21039,
        "scriptPtr": 24688,
        "textPtr": 24691,
        "width": 4,
        "height": 4
    },
    {
        "name": "Fuchsia House 3",
        "ind": 164,
        "symbol": "FuchsiaHouse3",
        "bank": 21,
        "dataPtr": 21055,
        "scriptPtr": 24956,
        "textPtr": 24959,
        "width": 4,
        "height": 4
    },
    {
        "name": "Mansion 1",
        "ind": 165,
        "symbol": "Mansion1",
        "bank": 17,
        "dataPtr": 17406,
        "scriptPtr": 17071,
        "textPtr": 17196,
        "width": 15,
        "height": 14
    },
    {
        "name": "Cinnabar Gym",
        "ind": 166,
        "symbol": "CinnabarGym",
        "bank": 29,
        "dataPtr": 23334,
        "scriptPtr": 22346,
        "textPtr": 22687,
        "width": 10,
        "height": 9
    },
    {
        "name": "Cinnabar Lab 1",
        "ind": 167,
        "symbol": "Lab1",
        "bank": 29,
        "dataPtr": 23537,
        "scriptPtr": 23436,
        "textPtr": 23440,
        "alias": "Lab 1",
        "width": 9,
        "height": 4
    },
    {
        "name": "Cinnabar Lab 2",
        "ind": 168,
        "symbol": "Lab2",
        "bank": 29,
        "dataPtr": 23659,
        "scriptPtr": 23585,
        "textPtr": 23588,
        "alias": "Lab 2",
        "width": 4,
        "height": 4
    },
    {
        "name": "Cinnabar Lab 3",
        "ind": 169,
        "symbol": "Lab3",
        "bank": 29,
        "dataPtr": 23829,
        "scriptPtr": 23687,
        "textPtr": 23690,
        "alias": "Lab 3",
        "width": 4,
        "height": 4
    },
    {
        "name": "Cinnabar Lab 4",
        "ind": 170,
        "symbol": "Lab4",
        "bank": 29,
        "dataPtr": 24080,
        "scriptPtr": 23857,
        "textPtr": 23860,
        "alias": "Lab 4",
        "width": 4,
        "height": 4
    },
    {
        "name": "Cinnabar Pokecenter",
        "ind": 171,
        "symbol": "CinnabarPokecenter",
        "bank": 29,
        "dataPtr": 16432,
        "scriptPtr": 24108,
        "textPtr": 24114,
        "width": 7,
        "height": 4
    },
    {
        "name": "Cinnabar Mart",
        "ind": 172,
        "symbol": "CinnabarMart",
        "bank": 29,
        "dataPtr": 16400,
        "scriptPtr": 24190,
        "textPtr": 24193,
        "width": 4,
        "height": 4
    },
    {
        "name": "Cinnabar Mart Copy",
        "ind": 173,
        "symbol": "CinnabarMart",
        "bank": 29,
        "dataPtr": 16400,
        "scriptPtr": 24190,
        "textPtr": 24193,
        "width": 4,
        "height": 4
    },
    {
        "name": "Indigo Plateau Lobby",
        "ind": 174,
        "symbol": "IndigoPlateauLobby",
        "bank": 6,
        "dataPtr": 23759,
        "scriptPtr": 23643,
        "textPtr": 23679,
        "width": 8,
        "height": 6
    },
    {
        "name": "Copycats House 1F",
        "ind": 175,
        "symbol": "CopycatsHouse1F",
        "bank": 29,
        "dataPtr": 16384,
        "scriptPtr": 24259,
        "textPtr": 24262,
        "width": 4,
        "height": 4
    },
    {
        "name": "Copycats House 2F",
        "ind": 176,
        "symbol": "CopycatsHouse2F",
        "bank": 23,
        "dataPtr": 16400,
        "scriptPtr": 19569,
        "textPtr": 19572,
        "width": 4,
        "height": 4
    },
    {
        "name": "Fighting Dojo",
        "ind": 177,
        "symbol": "FightingDojo",
        "bank": 23,
        "dataPtr": 20451,
        "scriptPtr": 19805,
        "textPtr": 19971,
        "width": 5,
        "height": 6
    },
    {
        "name": "Saffron Gym",
        "ind": 178,
        "symbol": "SaffronGym",
        "bank": 23,
        "dataPtr": 21411,
        "scriptPtr": 20493,
        "textPtr": 20651,
        "width": 10,
        "height": 9
    },
    {
        "name": "Saffron House 1",
        "ind": 179,
        "symbol": "SaffronHouse1",
        "bank": 7,
        "dataPtr": 16862,
        "scriptPtr": 24029,
        "textPtr": 24032,
        "width": 4,
        "height": 4
    },
    {
        "name": "Saffron Mart",
        "ind": 180,
        "symbol": "SaffronMart",
        "bank": 23,
        "dataPtr": 16384,
        "scriptPtr": 21513,
        "textPtr": 21516,
        "width": 4,
        "height": 4
    },
    {
        "name": "Silph Co 1F",
        "ind": 181,
        "symbol": "SilphCo1",
        "bank": 23,
        "dataPtr": 21666,
        "scriptPtr": 21582,
        "textPtr": 21609,
        "alias": "Silph Co 1",
        "width": 15,
        "height": 9
    },
    {
        "name": "Saffron Pokecenter",
        "ind": 182,
        "symbol": "SaffronPokecenter",
        "bank": 23,
        "dataPtr": 16484,
        "scriptPtr": 21813,
        "textPtr": 21819,
        "width": 7,
        "height": 4
    },
    {
        "name": "Saffron House 2",
        "ind": 183,
        "symbol": "SaffronHouse2",
        "bank": 7,
        "dataPtr": 16862,
        "scriptPtr": 24124,
        "textPtr": 24127,
        "width": 4,
        "height": 4
    },
    {
        "name": "Route 15 Gate 1F",
        "ind": 184,
        "symbol": "Route15Gate",
        "bank": 18,
        "dataPtr": 16583,
        "scriptPtr": 22018,
        "textPtr": 22021,
        "alias": "Route 15 Gate",
        "width": 4,
        "height": 5
    },
    {
        "name": "Route 15 Gate 2F",
        "ind": 185,
        "symbol": "Route15GateUpstairs",
        "bank": 18,
        "dataPtr": 16603,
        "scriptPtr": 22090,
        "textPtr": 22093,
        "alias": "Route 15 Gate Upstairs",
        "width": 4,
        "height": 4
    },
    {
        "name": "Route 16 Gate 1F",
        "ind": 186,
        "symbol": "Route16Gate",
        "bank": 18,
        "dataPtr": 22499,
        "scriptPtr": 22206,
        "textPtr": 22362,
        "alias": "Route 16 Gate",
        "width": 4,
        "height": 7
    },
    {
        "name": "Route 16 Gate 2F",
        "ind": 187,
        "symbol": "Route16GateUpstairs",
        "bank": 18,
        "dataPtr": 16603,
        "scriptPtr": 22539,
        "textPtr": 22542,
        "alias": "Route 16 Gate Upstairs",
        "width": 4,
        "height": 4
    },
    {
        "name": "Route 16 House",
        "ind": 188,
        "symbol": "Route16House",
        "bank": 7,
        "dataPtr": 16862,
        "scriptPtr": 26104,
        "textPtr": 26107,
        "width": 4,
        "height": 4
    },
    {
        "name": "Route 12 House",
        "ind": 189,
        "symbol": "Route12House",
        "bank": 21,
        "dataPtr": 21039,
        "scriptPtr": 25727,
        "textPtr": 25730,
        "width": 4,
        "height": 4
    },
    {
        "name": "Route 18 Gate 1F",
        "ind": 190,
        "symbol": "Route18Gate",
        "bank": 18,
        "dataPtr": 16583,
        "scriptPtr": 22646,
        "textPtr": 22797,
        "alias": "Route 18 Gate",
        "width": 4,
        "height": 5
    },
    {
        "name": "Route 18 Gate 2F",
        "ind": 191,
        "symbol": "Route18GateUpstairs",
        "bank": 18,
        "dataPtr": 16603,
        "scriptPtr": 22901,
        "textPtr": 22904,
        "alias": "Route 18 Gate Upstairs",
        "width": 4,
        "height": 4
    },
    {
        "name": "Seafoam Islands 1",
        "ind": 192,
        "symbol": "SeafoamIslands1",
        "bank": 17,
        "dataPtr": 18591,
        "scriptPtr": 18409,
        "textPtr": 18507,
        "width": 15,
        "height": 9
    },
    {
        "name": "Route 22 Gate",
        "ind": 193,
        "symbol": "Route22Gate",
        "bank": 7,
        "dataPtr": 26442,
        "scriptPtr": 26243,
        "textPtr": 26335,
        "width": 5,
        "height": 4
    },
    {
        "name": "Victory Road 2",
        "ind": 194,
        "symbol": "VictoryRoad2",
        "bank": 20,
        "dataPtr": 22959,
        "scriptPtr": 22429,
        "textPtr": 22555,
        "width": 15,
        "height": 9
    },
    {
        "name": "Route 12 Gate 2F",
        "ind": 195,
        "symbol": "Route12GateUpstairs",
        "bank": 18,
        "dataPtr": 16603,
        "scriptPtr": 21856,
        "textPtr": 21859,
        "alias": "Route 12 Gate Upstairs",
        "width": 4,
        "height": 4
    },
    {
        "name": "Vermilion House 3",
        "ind": 196,
        "symbol": "VermilionHouse3",
        "bank": 6,
        "dataPtr": 23615,
        "scriptPtr": 23570,
        "textPtr": 23573,
        "width": 4,
        "height": 4
    },
    {
        "name": "Digletts Cave",
        "ind": 197,
        "symbol": "DiglettsCave",
        "bank": 24,
        "dataPtr": 24454,
        "scriptPtr": 24430,
        "textPtr": 24433,
        "width": 20,
        "height": 18
    },
    {
        "name": "Victory Road 3",
        "ind": 198,
        "symbol": "VictoryRoad3",
        "bank": 17,
        "dataPtr": 19255,
        "scriptPtr": 18816,
        "textPtr": 18980,
        "width": 15,
        "height": 9
    },
    {
        "name": "Rocket Hideout 1",
        "ind": 199,
        "symbol": "RocketHideout1",
        "bank": 17,
        "dataPtr": 19785,
        "scriptPtr": 19402,
        "textPtr": 19476,
        "width": 15,
        "height": 14
    },
    {
        "name": "Rocket Hideout 2",
        "ind": 200,
        "symbol": "RocketHideout2",
        "bank": 17,
        "dataPtr": 20807,
        "scriptPtr": 20007,
        "textPtr": 20679,
        "width": 15,
        "height": 14
    },
    {
        "name": "Rocket Hideout 3",
        "ind": 201,
        "symbol": "RocketHideout3",
        "bank": 17,
        "dataPtr": 21375,
        "scriptPtr": 21029,
        "textPtr": 21242,
        "width": 15,
        "height": 14
    },
    {
        "name": "Rocket Hideout 4",
        "ind": 202,
        "symbol": "RocketHideout4",
        "bank": 17,
        "dataPtr": 22096,
        "scriptPtr": 21597,
        "textPtr": 21761,
        "width": 15,
        "height": 12
    },
    {
        "name": "Rocket Hideout Elevator",
        "ind": 203,
        "symbol": "RocketHideoutElevator",
        "bank": 17,
        "dataPtr": 22440,
        "scriptPtr": 22288,
        "textPtr": 22379,
        "width": 3,
        "height": 4
    },
    {
        "name": "Unused Map CC",
        "ind": 204,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Unused Map CD",
        "ind": 205,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Unused Map CE",
        "ind": 206,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Silph Co 2F",
        "ind": 207,
        "symbol": "SilphCo2",
        "bank": 22,
        "dataPtr": 24264,
        "scriptPtr": 23793,
        "textPtr": 23942,
        "alias": "Silph Co 2",
        "width": 15,
        "height": 9
    },
    {
        "name": "Silph Co 3F",
        "ind": 208,
        "symbol": "SilphCo3",
        "bank": 22,
        "dataPtr": 24742,
        "scriptPtr": 24411,
        "textPtr": 24516,
        "alias": "Silph Co 3",
        "width": 15,
        "height": 9
    },
    {
        "name": "Silph Co 4F",
        "ind": 209,
        "symbol": "SilphCo4",
        "bank": 6,
        "dataPtr": 24228,
        "scriptPtr": 23819,
        "textPtr": 23968,
        "alias": "Silph Co 4",
        "width": 15,
        "height": 9
    },
    {
        "name": "Silph Co 5F",
        "ind": 210,
        "symbol": "SilphCo5",
        "bank": 6,
        "dataPtr": 24854,
        "scriptPtr": 24375,
        "textPtr": 24508,
        "alias": "Silph Co 5",
        "width": 15,
        "height": 9
    },
    {
        "name": "Silph Co 6F",
        "ind": 211,
        "symbol": "SilphCo6",
        "bank": 6,
        "dataPtr": 25451,
        "scriptPtr": 25001,
        "textPtr": 25078,
        "alias": "Silph Co 6",
        "width": 13,
        "height": 9
    },
    {
        "name": "Silph Co 7F",
        "ind": 212,
        "symbol": "SilphCo7",
        "bank": 20,
        "dataPtr": 24407,
        "scriptPtr": 23393,
        "textPtr": 23871,
        "alias": "Silph Co 7",
        "width": 13,
        "height": 9
    },
    {
        "name": "Silph Co 8F",
        "ind": 213,
        "symbol": "SilphCo8",
        "bank": 21,
        "dataPtr": 26221,
        "scriptPtr": 25860,
        "textPtr": 25981,
        "alias": "Silph Co 8",
        "width": 13,
        "height": 9
    },
    {
        "name": "Mansion 2",
        "ind": 214,
        "symbol": "Mansion2",
        "bank": 20,
        "dataPtr": 24848,
        "scriptPtr": 24536,
        "textPtr": 24653,
        "width": 15,
        "height": 14
    },
    {
        "name": "Mansion 3",
        "ind": 215,
        "symbol": "Mansion3",
        "bank": 20,
        "dataPtr": 25382,
        "scriptPtr": 25070,
        "textPtr": 25226,
        "width": 15,
        "height": 9
    },
    {
        "name": "Mansion 4",
        "ind": 216,
        "symbol": "Mansion4",
        "bank": 20,
        "dataPtr": 25821,
        "scriptPtr": 25529,
        "textPtr": 25654,
        "width": 15,
        "height": 14
    },
    {
        "name": "Safari Zone East",
        "ind": 217,
        "symbol": "SafariZoneEast",
        "bank": 17,
        "dataPtr": 22748,
        "scriptPtr": 22635,
        "textPtr": 22638,
        "width": 15,
        "height": 13
    },
    {
        "name": "Safari Zone North",
        "ind": 218,
        "symbol": "SafariZoneNorth",
        "bank": 17,
        "dataPtr": 23102,
        "scriptPtr": 22955,
        "textPtr": 22958,
        "width": 20,
        "height": 18
    },
    {
        "name": "Safari Zone West",
        "ind": 219,
        "symbol": "SafariZoneWest",
        "bank": 18,
        "dataPtr": 25160,
        "scriptPtr": 25013,
        "textPtr": 25016,
        "width": 15,
        "height": 13
    },
    {
        "name": "Safari Zone Center",
        "ind": 220,
        "symbol": "SafariZoneCenter",
        "bank": 17,
        "dataPtr": 23582,
        "scriptPtr": 23474,
        "textPtr": 23477,
        "width": 15,
        "height": 13
    },
    {
        "name": "Safari Zone Rest House 1",
        "ind": 221,
        "symbol": "SafariZoneRestHouse1",
        "bank": 17,
        "dataPtr": 16635,
        "scriptPtr": 23789,
        "textPtr": 23792,
        "width": 4,
        "height": 4
    },
    {
        "name": "Safari Zone Secret House",
        "ind": 222,
        "symbol": "SafariZoneSecretHouse",
        "bank": 18,
        "dataPtr": 25471,
        "scriptPtr": 25367,
        "textPtr": 25370,
        "width": 4,
        "height": 4
    },
    {
        "name": "Safari Zone Rest House 2",
        "ind": 223,
        "symbol": "SafariZoneRestHouse2",
        "bank": 17,
        "dataPtr": 16635,
        "scriptPtr": 23850,
        "textPtr": 23854,
        "width": 4,
        "height": 4
    },
    {
        "name": "Safari Zone Rest House 3",
        "ind": 224,
        "symbol": "SafariZoneRestHouse3",
        "bank": 17,
        "dataPtr": 16635,
        "scriptPtr": 23925,
        "textPtr": 23929,
        "width": 4,
        "height": 4
    },
    {
        "name": "Safari Zone Rest House 4",
        "ind": 225,
        "symbol": "SafariZoneRestHouse4",
        "bank": 17,
        "dataPtr": 16635,
        "scriptPtr": 24000,
        "textPtr": 24004,
        "width": 4,
        "height": 4
    },
    {
        "name": "Unknown Dungeon 2",
        "ind": 226,
        "symbol": "UnknownDungeon2",
        "bank": 17,
        "dataPtr": 24157,
        "scriptPtr": 24075,
        "textPtr": 24078,
        "width": 15,
        "height": 9
    },
    {
        "name": "Unknown Dungeon 3",
        "ind": 227,
        "symbol": "UnknownDungeon3",
        "bank": 17,
        "dataPtr": 24408,
        "scriptPtr": 24304,
        "textPtr": 24329,
        "width": 15,
        "height": 9
    },
    {
        "name": "Unknown Dungeon 1",
        "ind": 228,
        "symbol": "UnknownDungeon1",
        "bank": 29,
        "dataPtr": 19830,
        "scriptPtr": 19724,
        "textPtr": 19727,
        "width": 15,
        "height": 9
    },
    {
        "name": "Name Raters House",
        "ind": 229,
        "symbol": "NameRater",
        "bank": 7,
        "dataPtr": 16862,
        "scriptPtr": 23058,
        "textPtr": 23124,
        "alias": "Name Rater",
        "width": 4,
        "height": 4
    },
    {
        "name": "Cerulean House 2",
        "ind": 230,
        "symbol": "CeruleanHouse2",
        "bank": 29,
        "dataPtr": 16460,
        "scriptPtr": 19977,
        "textPtr": 19987,
        "width": 4,
        "height": 4
    },
    {
        "name": "Unused Map E7",
        "ind": 231,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Rock Tunnel 2",
        "ind": 232,
        "symbol": "RockTunnel2",
        "bank": 17,
        "dataPtr": 24993,
        "scriptPtr": 24555,
        "textPtr": 24580,
        "width": 20,
        "height": 18
    },
    {
        "name": "Silph Co 9F",
        "ind": 233,
        "symbol": "SilphCo9",
        "bank": 23,
        "dataPtr": 22921,
        "scriptPtr": 22459,
        "textPtr": 22667,
        "alias": "Silph Co 9",
        "width": 13,
        "height": 9
    },
    {
        "name": "Silph Co 10F",
        "ind": 234,
        "symbol": "SilphCo10",
        "bank": 22,
        "dataPtr": 25178,
        "scriptPtr": 24889,
        "textPtr": 24966,
        "alias": "Silph Co 10",
        "width": 8,
        "height": 9
    },
    {
        "name": "Silph Co 11F",
        "ind": 235,
        "symbol": "SilphCo11",
        "bank": 24,
        "dataPtr": 25544,
        "scriptPtr": 24826,
        "textPtr": 25271,
        "alias": "Silph Co 11",
        "width": 9,
        "height": 9
    },
    {
        "name": "Silph Co Elevator",
        "ind": 236,
        "symbol": "SilphCoElevator",
        "bank": 17,
        "dataPtr": 22619,
        "scriptPtr": 22464,
        "textPtr": 22579,
        "width": 2,
        "height": 2
    },
    {
        "name": "Unused Map ED",
        "ind": 237,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Unused Map EE",
        "ind": 238,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Trade Center",
        "ind": 239,
        "symbol": "TradeCenter",
        "bank": 19,
        "dataPtr": 32093,
        "scriptPtr": 32016,
        "textPtr": 32076,
        "width": 5,
        "height": 4
    },
    {
        "name": "Colosseum",
        "ind": 240,
        "symbol": "Colosseum",
        "bank": 19,
        "dataPtr": 32145,
        "scriptPtr": 32125,
        "textPtr": 32128,
        "width": 5,
        "height": 4
    },
    {
        "name": "Unused Map F1",
        "ind": 241,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Unused Map F2",
        "ind": 242,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Unused Map F3",
        "ind": 243,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Unused Map F4",
        "ind": 244,
        "glitch": true,
        "width": 0,
        "height": 0
    },
    {
        "name": "Loreleis Room",
        "ind": 245,
        "symbol": "Lorelei",
        "bank": 29,
        "dataPtr": 25260,
        "scriptPtr": 24955,
        "textPtr": 25169,
        "alias": "Lorelei",
        "width": 5,
        "height": 6
    },
    {
        "name": "Brunos Room",
        "ind": 246,
        "symbol": "Bruno",
        "bank": 29,
        "dataPtr": 25603,
        "scriptPtr": 25302,
        "textPtr": 25512,
        "alias": "Bruno",
        "width": 5,
        "height": 6
    },
    {
        "name": "Agathas Room",
        "ind": 247,
        "symbol": "Agatha",
        "bank": 29,
        "dataPtr": 25952,
        "scriptPtr": 25645,
        "textPtr": 25861,
        "alias": "Agatha",
        "width": 5,
        "height": 6
    },
    {
        "name": "Last Map",
        "ind": 255,
        "special": true
    }
];

@Injectable({
    providedIn: 'root'
})
export class MapService {

    constructor() {

        // Prepare lots of initialization and other stuff
        for (var i = 0; i < rawMaps.length; i++) {

            // Grab the map entry
            const rawEntry = rawMaps[i];

            // Pre-calc 2x2 width and height
            if (rawEntry.height)
                rawEntry.height2x2 = rawEntry.height * 2;

            if (rawEntry.width)
                rawEntry.width2x2 = rawEntry.width * 2;

            // Normal stuff, just book-keeping and indexing
            const ind = rawEntry.ind;
            const name = rawEntry.name;

            this.nameToInd[name] = rawEntry;

            this.indToName = [];
            this.indToName[ind] = rawEntry;
        };
    }

    // Generated list of Pokemon in same order as above but lookup index by name
    public nameToInd: {
        [key: string]: RawMap
    } = {};

    // Generated list of Pokemon in same order as above but lookup name by index
    // @ts-ignore - It's clearly defined above, I don't understand what your comaplining about
    public indToName: RawMap[];

    public rawTypes = rawMaps;
}
