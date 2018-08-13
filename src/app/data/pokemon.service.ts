/**
   Copyright 2018 June Hanabi

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

import { Injectable } from '@angular/core';

export interface RawEntry {
    name: string,
    ind: number,
    glitch?: boolean,
    pokedex?: number
};

// List of Pokemon in internal game order and in array form which is zero
// based
export const rawEntries: RawEntry[] = [
    {
        name: "Rhydon",
        ind: 0x01,
        pokedex: 0x6F
    },
    {
        name: "Kangaskhan",
        ind: 0x02,
        pokedex: 0x72
    },
    {
        name: "Nidoran<GM>",
        ind: 0x03,
        pokedex: 0x1F
    },
    {
        name: "Clefairy",
        ind: 0x04,
        pokedex: 0x22
    },
    {
        name: "Spearow",
        ind: 0x05,
        pokedex: 0x14
    },
    {
        name: "Voltorb",
        ind: 0x06,
        pokedex: 0x63
    },
    {
        name: "Nidoking",
        ind: 0x07,
        pokedex: 0x21
    },
    {
        name: "Slowbro",
        ind: 0x08,
        pokedex: 0x4F
    },
    {
        name: "Ivysaur",
        ind: 0x09,
        pokedex: 0x01
    },
    {
        name: "Exeggutor",
        ind: 0x0A,
        pokedex: 0x66
    },
    {
        name: "Lickitung",
        ind: 0x0B,
        pokedex: 0x6B
    },
    {
        name: "Exeggcute",
        ind: 0x0C,
        pokedex: 0x65
    },
    {
        name: "Grimer",
        ind: 0x0D,
        pokedex: 0x57
    },
    {
        name: "Gengar",
        ind: 0x0E,
        pokedex: 0x5D
    },
    {
        name: "Nidoran<GF>",
        ind: 0x0F,
        pokedex: 0x1C
    },
    {
        name: "Nidoqueen",
        ind: 0x10,
        pokedex: 0x1E
    },
    {
        name: "Cubone",
        ind: 0x11,
        pokedex: 0x67
    },
    {
        name: "Rhyhorn",
        ind: 0x12,
        pokedex: 0x6E
    },
    {
        name: "Lapras",
        ind: 0x13,
        pokedex: 0x82
    },
    {
        name: "Arcanine",
        ind: 0x14,
        pokedex: 0x3A
    },
    {
        name: "Mew",
        ind: 0x15,
        pokedex: 0x96
    },
    {
        name: "Gyarados",
        ind: 0x16,
        pokedex: 0x81
    },
    {
        name: "Shellder",
        ind: 0x17,
        pokedex: 0x59
    },
    {
        name: "Tentacool",
        ind: 0x18,
        pokedex: 0x47
    },
    {
        name: "Gastly",
        ind: 0x19,
        pokedex: 0x5B
    },
    {
        name: "Scyther",
        ind: 0x1A,
        pokedex: 0x7A
    },
    {
        name: "Staryu",
        ind: 0x1B,
        pokedex: 0x77
    },
    {
        name: "Blastoise",
        ind: 0x1C,
        pokedex: 0x08
    },
    {
        name: "Pinsir",
        ind: 0x1D,
        pokedex: 0x7E
    },
    {
        name: "Tangela",
        ind: 0x1E,
        pokedex: 0x71
    },
    {
        name: "Missing1F",
        ind: 0x1F,
        glitch: true
    },
    {
        name: "Missing20",
        ind: 0x20,
        glitch: true
    },
    {
        name: "Growlithe",
        ind: 0x21,
        pokedex: 0x39
    },
    {
        name: "Onix",
        ind: 0x22,
        pokedex: 0x5E
    },
    {
        name: "Fearow",
        ind: 0x23,
        pokedex: 0x15
    },
    {
        name: "Pidgey",
        ind: 0x24,
        pokedex: 0x0F
    },
    {
        name: "Slowpoke",
        ind: 0x25,
        pokedex: 0x4E
    },
    {
        name: "Kadabra",
        ind: 0x26,
        pokedex: 0x3F
    },
    {
        name: "Graveler",
        ind: 0x27,
        pokedex: 0x4A
    },
    {
        name: "Chansey",
        ind: 0x28,
        pokedex: 0x70
    },
    {
        name: "Machoke",
        ind: 0x29,
        pokedex: 0x42
    },
    {
        name: "Mr.Mime",
        ind: 0x2A,
        pokedex: 0x79
    },
    {
        name: "Hitmonlee",
        ind: 0x2B,
        pokedex: 0x69
    },
    {
        name: "Hitmonchan",
        ind: 0x2C,
        pokedex: 0x6A
    },
    {
        name: "Arbok",
        ind: 0x2D,
        pokedex: 0x17
    },
    {
        name: "Parasect",
        ind: 0x2E,
        pokedex: 0x2E
    },
    {
        name: "Psyduck",
        ind: 0x2F,
        pokedex: 0x35
    },
    {
        name: "Drowzee",
        ind: 0x30,
        pokedex: 0x5F
    },
    {
        name: "Golem",
        ind: 0x31,
        pokedex: 0x4B
    },
    {
        name: "Missing32",
        ind: 0x32,
        glitch: true
    },
    {
        name: "Magmar",
        ind: 0x33,
        pokedex: 0x7D
    },
    {
        name: "Missing34",
        ind: 0x34,
        glitch: true
    },
    {
        name: "Electabuzz",
        ind: 0x35,
        pokedex: 0x7C
    },
    {
        name: "Magneton",
        ind: 0x36,
        pokedex: 0x51
    },
    {
        name: "Koffing",
        ind: 0x37,
        pokedex: 0x6C
    },
    {
        name: "Missing38",
        ind: 0x38,
        glitch: true
    },
    {
        name: "Mankey",
        ind: 0x39,
        pokedex: 0x37
    },
    {
        name: "Seel",
        ind: 0x3A,
        pokedex: 0x55
    },
    {
        name: "Diglett",
        ind: 0x3B,
        pokedex: 0x31
    },
    {
        name: "Tauros",
        ind: 0x3C,
        pokedex: 0x7F
    },
    {
        name: "Missing3D",
        ind: 0x3D,
        glitch: true
    },
    {
        name: "Missing3E",
        ind: 0x3E,
        glitch: true
    },
    {
        name: "Missing3F",
        ind: 0x3F,
        glitch: true
    },
    {
        name: "Farfetchd",
        ind: 0x40,
        pokedex: 0x52
    },
    {
        name: "Venonat",
        ind: 0x41,
        pokedex: 0x2F
    },
    {
        name: "Dragonite",
        ind: 0x42,
        pokedex: 0x94
    },
    {
        name: "Missing43",
        ind: 0x43,
        glitch: true
    },
    {
        name: "Missing44",
        ind: 0x44,
        glitch: true
    },
    {
        name: "Missing45",
        ind: 0x45,
        glitch: true
    },
    {
        name: "Doduo",
        ind: 0x46,
        pokedex: 0x53
    },
    {
        name: "Poliwag",
        ind: 0x47,
        pokedex: 0x3B
    },
    {
        name: "Jynx",
        ind: 0x48,
        pokedex: 0x7B
    },
    {
        name: "Moltres",
        ind: 0x49,
        pokedex: 0x91
    },
    {
        name: "Articuno",
        ind: 0x4A,
        pokedex: 0x8F
    },
    {
        name: "Zapdos",
        ind: 0x4B,
        pokedex: 0x90
    },
    {
        name: "Ditto",
        ind: 0x4C,
        pokedex: 0x83
    },
    {
        name: "Meowth",
        ind: 0x4D,
        pokedex: 0x33
    },
    {
        name: "Krabby",
        ind: 0x4E,
        pokedex: 0x61
    },
    {
        name: "Missing4F",
        ind: 0x4F,
        glitch: true
    },
    {
        name: "Missing50",
        ind: 0x50,
        glitch: true
    },
    {
        name: "Missing51",
        ind: 0x51,
        glitch: true
    },
    {
        name: "Vulpix",
        ind: 0x52,
        pokedex: 0x24
    },
    {
        name: "Ninetales",
        ind: 0x53,
        pokedex: 0x25
    },
    {
        name: "Pikachu",
        ind: 0x54,
        pokedex: 0x18
    },
    {
        name: "Raichu",
        ind: 0x55,
        pokedex: 0x19
    },
    {
        name: "Missing56",
        ind: 0x56,
        glitch: true
    },
    {
        name: "Missing57",
        ind: 0x57,
        glitch: true
    },
    {
        name: "Dratini",
        ind: 0x58,
        pokedex: 0x92
    },
    {
        name: "Dragonair",
        ind: 0x59,
        pokedex: 0x93
    },
    {
        name: "Kabuto",
        ind: 0x5A,
        pokedex: 0x8B
    },
    {
        name: "Kabutops",
        ind: 0x5B,
        pokedex: 0x8C
    },
    {
        name: "Horsea",
        ind: 0x5C,
        pokedex: 0x73
    },
    {
        name: "Seadra",
        ind: 0x5D,
        pokedex: 0x74
    },
    {
        name: "Missing5E",
        ind: 0x5E,
        glitch: true
    },
    {
        name: "Missing5F",
        ind: 0x5F,
        glitch: true
    },
    {
        name: "Sandshrew",
        ind: 0x60,
        pokedex: 0x1A
    },
    {
        name: "Sandslash",
        ind: 0x61,
        pokedex: 0x1B
    },
    {
        name: "Omanyte",
        ind: 0x62,
        pokedex: 0x89
    },
    {
        name: "Omastar",
        ind: 0x63,
        pokedex: 0x8A
    },
    {
        name: "Jigglypuff",
        ind: 0x64,
        pokedex: 0x26
    },
    {
        name: "Wigglytuff",
        ind: 0x65,
        pokedex: 0x27
    },
    {
        name: "Eevee",
        ind: 0x66,
        pokedex: 0x84
    },
    {
        name: "Flareon",
        ind: 0x67,
        pokedex: 0x87
    },
    {
        name: "Jolteon",
        ind: 0x68,
        pokedex: 0x86
    },
    {
        name: "Vaporeon",
        ind: 0x69,
        pokedex: 0x85
    },
    {
        name: "Machop",
        ind: 0x6A,
        pokedex: 0x41
    },
    {
        name: "Zubat",
        ind: 0x6B,
        pokedex: 0x28
    },
    {
        name: "Ekans",
        ind: 0x6C,
        pokedex: 0x16
    },
    {
        name: "Paras",
        ind: 0x6D,
        pokedex: 0x2D
    },
    {
        name: "Poliwhirl",
        ind: 0x6E,
        pokedex: 0x3C
    },
    {
        name: "Poliwrath",
        ind: 0x6F,
        pokedex: 0x3D
    },
    {
        name: "Weedle",
        ind: 0x70,
        pokedex: 0x0C
    },
    {
        name: "Kakuna",
        ind: 0x71,
        pokedex: 0x0D
    },
    {
        name: "Beedrill",
        ind: 0x72,
        pokedex: 0x0E
    },
    {
        name: "Missing73",
        ind: 0x73,
        glitch: true
    },
    {
        name: "Dodrio",
        ind: 0x74,
        pokedex: 0x54
    },
    {
        name: "Primeape",
        ind: 0x75,
        pokedex: 0x38
    },
    {
        name: "Dugtrio",
        ind: 0x76,
        pokedex: 0x32
    },
    {
        name: "Venomoth",
        ind: 0x77,
        pokedex: 0x30
    },
    {
        name: "Dewgong",
        ind: 0x78,
        pokedex: 0x56
    },
    {
        name: "Missing79",
        ind: 0x79,
        glitch: true
    },
    {
        name: "Missing7A",
        ind: 0x7A,
        glitch: true
    },
    {
        name: "Caterpie",
        ind: 0x7B,
        pokedex: 0x09
    },
    {
        name: "Metapod",
        ind: 0x7C,
        pokedex: 0x0A
    },
    {
        name: "Butterfree",
        ind: 0x7D,
        pokedex: 0x0B
    },
    {
        name: "Machamp",
        ind: 0x7E,
        pokedex: 0x43
    },
    {
        name: "Missing7F",
        ind: 0x7F,
        glitch: true
    },
    {
        name: "Golduck",
        ind: 0x80,
        pokedex: 0x36
    },
    {
        name: "Hypno",
        ind: 0x81,
        pokedex: 0x60
    },
    {
        name: "Golbat",
        ind: 0x82,
        pokedex: 0x29
    },
    {
        name: "Mewtwo",
        ind: 0x83,
        pokedex: 0x95
    },
    {
        name: "Snorlax",
        ind: 0x84,
        pokedex: 0x8E
    },
    {
        name: "Magikarp",
        ind: 0x85,
        pokedex: 0x80
    },
    {
        name: "Missing86",
        ind: 0x86,
        glitch: true
    },
    {
        name: "Missing87",
        ind: 0x87,
        glitch: true
    },
    {
        name: "Muk",
        ind: 0x88,
        pokedex: 0x58
    },
    {
        name: "Missing89",
        ind: 0x89,
        glitch: true
    },
    {
        name: "Kingler",
        ind: 0x8A,
        pokedex: 0x62
    },
    {
        name: "Cloyster",
        ind: 0x8B,
        pokedex: 0x5A
    },
    {
        name: "Missing8C",
        ind: 0x8C,
        glitch: true
    },
    {
        name: "Electrode",
        ind: 0x8D,
        pokedex: 0x64
    },
    {
        name: "Clefable",
        ind: 0x8E,
        pokedex: 0x23
    },
    {
        name: "Weezing",
        ind: 0x8F,
        pokedex: 0x6D
    },
    {
        name: "Persian",
        ind: 0x90,
        pokedex: 0x34
    },
    {
        name: "Marowak",
        ind: 0x91,
        pokedex: 0x68
    },
    {
        name: "Missing92",
        ind: 0x92,
        glitch: true
    },
    {
        name: "Haunter",
        ind: 0x93,
        pokedex: 0x5C
    },
    {
        name: "Abra",
        ind: 0x94,
        pokedex: 0x3E
    },
    {
        name: "Alakazam",
        ind: 0x95,
        pokedex: 0x40
    },
    {
        name: "Pidgeotto",
        ind: 0x96,
        pokedex: 0x10
    },
    {
        name: "Pidgeot",
        ind: 0x97,
        pokedex: 0x11
    },
    {
        name: "Starmie",
        ind: 0x98,
        pokedex: 0x78
    },
    {
        name: "Bulbasaur",
        ind: 0x99,
        pokedex: 0x00
    },
    {
        name: "Venusaur",
        ind: 0x9A,
        pokedex: 0x02
    },
    {
        name: "Tentacruel",
        ind: 0x9B,
        pokedex: 0x48
    },
    {
        name: "Missing9C",
        ind: 0x9C,
        glitch: true
    },
    {
        name: "Goldeen",
        ind: 0x9D,
        pokedex: 0x75
    },
    {
        name: "Seaking",
        ind: 0x9E,
        pokedex: 0x76
    },
    {
        name: "Missing9F",
        ind: 0x9F,
        glitch: true
    },
    {
        name: "MissingA0",
        ind: 0xA0,
        glitch: true
    },
    {
        name: "MissingA1",
        ind: 0xA1,
        glitch: true
    },
    {
        name: "MissingA2",
        ind: 0xA2,
        glitch: true
    },
    {
        name: "Ponyta",
        ind: 0xA3,
        pokedex: 0x4C
    },
    {
        name: "Rapidash",
        ind: 0xA4,
        pokedex: 0x4D
    },
    {
        name: "Rattata",
        ind: 0xA5,
        pokedex: 0x12
    },
    {
        name: "Raticate",
        ind: 0xA6,
        pokedex: 0x13
    },
    {
        name: "Nidorino",
        ind: 0xA7,
        pokedex: 0x20
    },
    {
        name: "Nidorina",
        ind: 0xA8,
        pokedex: 0x1D
    },
    {
        name: "Geodude",
        ind: 0xA9,
        pokedex: 0x49
    },
    {
        name: "Porygon",
        ind: 0xAA,
        pokedex: 0x88
    },
    {
        name: "Aerodactyl",
        ind: 0xAB,
        pokedex: 0x8D
    },
    {
        name: "MissingAC",
        ind: 0xAC,
        glitch: true
    },
    {
        name: "Magnemite",
        ind: 0xAD,
        pokedex: 0x50
    },
    {
        name: "MissingAE",
        ind: 0xAE,
        glitch: true
    },
    {
        name: "MissingAF",
        ind: 0xAF,
        glitch: true
    },
    {
        name: "Charmander",
        ind: 0xB0,
        pokedex: 0x03
    },
    {
        name: "Squirtle",
        ind: 0xB1,
        pokedex: 0x06
    },
    {
        name: "Charmeleon",
        ind: 0xB2,
        pokedex: 0x04
    },
    {
        name: "Wartortle",
        ind: 0xB3,
        pokedex: 0x07
    },
    {
        name: "Charizard",
        ind: 0xB4,
        pokedex: 0x05
    },
    {
        name: "MissingB5",
        ind: 0xB5,
        glitch: true
    },
    {
        name: "Fossil kabutops",
        ind: 0xB6,
        glitch: true
    },
    {
        name: "Fossil aerodactyl",
        ind: 0xB7,
        glitch: true
    },
    {
        name: "Mon Ghost",
        ind: 0xB8,
        glitch: true
    },
    {
        name: "Oddish",
        ind: 0xB9,
        pokedex: 0x2A
    },
    {
        name: "Gloom",
        ind: 0xBA,
        pokedex: 0x2B
    },
    {
        name: "Vileplume",
        ind: 0xBB,
        pokedex: 0x2C
    },
    {
        name: "Bellsprout",
        ind: 0xBC,
        pokedex: 0x44
    },
    {
        name: "Weepinbell",
        ind: 0xBD,
        pokedex: 0x45
    },
    {
        name: "Victreebel",
        ind: 0xBE,
        pokedex: 0x46
    }
];

@Injectable({
    providedIn: 'root'
})
export class PokemonService {

    constructor() {
        for (var i = 0; i < rawEntries.length; i++) {
            const rawEntry = rawEntries[i];
            const ind = rawEntry.ind;
            const pokedex = rawEntry.pokedex;
            const name = rawEntry.name;

            this.lookupName[name] = rawEntry;
            this.lookupIndex[ind] = rawEntry;

            if (pokedex !== undefined)
                this.lookupPokedex[pokedex] = rawEntry;
        };
    }

    // Pokemon list above but lookup by name
    public lookupName: {
        [key: string]: RawEntry
    } = {};

    // Pokemon list above but lookup by Pokemon Index
    public lookupIndex: RawEntry[] = [];

    // Pokemon list above but lookup by Pokedex Index
    public lookupPokedex: RawEntry[] = [];

    // Raw entries above
    public rawEntries = rawEntries;
}
