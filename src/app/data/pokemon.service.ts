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

// List of Pokemon in internal game order and in array form which is zero
// based
export const indToName: Array<string> = ["MISSINGNO_00",
    "RHYDON",
    "KANGASKHAN",
    "NIDORAN_M",
    "CLEFAIRY",
    "SPEAROW",
    "VOLTORB",
    "NIDOKING",
    "SLOWBRO",
    "IVYSAUR",
    "EXEGGUTOR",
    "LICKITUNG",
    "EXEGGCUTE",
    "GRIMER",
    "GENGAR",
    "NIDORAN_F",
    "NIDOQUEEN",
    "CUBONE",
    "RHYHORN",
    "LAPRAS",
    "ARCANINE",
    "MEW",
    "GYARADOS",
    "SHELLDER",
    "TENTACOOL",
    "GASTLY",
    "SCYTHER",
    "STARYU",
    "BLASTOISE",
    "PINSIR",
    "TANGELA",
    "MISSINGNO_1F",
    "MISSINGNO_20",
    "GROWLITHE",
    "ONIX",
    "FEAROW",
    "PIDGEY",
    "SLOWPOKE",
    "KADABRA",
    "GRAVELER",
    "CHANSEY",
    "MACHOKE",
    "MR_MIME",
    "HITMONLEE",
    "HITMONCHAN",
    "ARBOK",
    "PARASECT",
    "PSYDUCK",
    "DROWZEE",
    "GOLEM",
    "MISSINGNO_32",
    "MAGMAR",
    "MISSINGNO_34",
    "ELECTABUZZ",
    "MAGNETON",
    "KOFFING",
    "MISSINGNO_38",
    "MANKEY",
    "SEEL",
    "DIGLETT",
    "TAUROS",
    "MISSINGNO_3D",
    "MISSINGNO_3E",
    "MISSINGNO_3F",
    "FARFETCHD",
    "VENONAT",
    "DRAGONITE",
    "MISSINGNO_43",
    "MISSINGNO_44",
    "MISSINGNO_45",
    "DODUO",
    "POLIWAG",
    "JYNX",
    "MOLTRES",
    "ARTICUNO",
    "ZAPDOS",
    "DITTO",
    "MEOWTH",
    "KRABBY",
    "MISSINGNO_4F",
    "MISSINGNO_50",
    "MISSINGNO_51",
    "VULPIX",
    "NINETALES",
    "PIKACHU",
    "RAICHU",
    "MISSINGNO_56",
    "MISSINGNO_57",
    "DRATINI",
    "DRAGONAIR",
    "KABUTO",
    "KABUTOPS",
    "HORSEA",
    "SEADRA",
    "MISSINGNO_5E",
    "MISSINGNO_5F",
    "SANDSHREW",
    "SANDSLASH",
    "OMANYTE",
    "OMASTAR",
    "JIGGLYPUFF",
    "WIGGLYTUFF",
    "EEVEE",
    "FLAREON",
    "JOLTEON",
    "VAPOREON",
    "MACHOP",
    "ZUBAT",
    "EKANS",
    "PARAS",
    "POLIWHIRL",
    "POLIWRATH",
    "WEEDLE",
    "KAKUNA",
    "BEEDRILL",
    "MISSINGNO_73",
    "DODRIO",
    "PRIMEAPE",
    "DUGTRIO",
    "VENOMOTH",
    "DEWGONG",
    "MISSINGNO_79",
    "MISSINGNO_7A",
    "CATERPIE",
    "METAPOD",
    "BUTTERFREE",
    "MACHAMP",
    "MISSINGNO_7F",
    "GOLDUCK",
    "HYPNO",
    "GOLBAT",
    "MEWTWO",
    "SNORLAX",
    "MAGIKARP",
    "MISSINGNO_86",
    "MISSINGNO_87",
    "MUK",
    "MISSINGNO_89",
    "KINGLER",
    "CLOYSTER",
    "MISSINGNO_8C",
    "ELECTRODE",
    "CLEFABLE",
    "WEEZING",
    "PERSIAN",
    "MAROWAK",
    "MISSINGNO_92",
    "HAUNTER",
    "ABRA",
    "ALAKAZAM",
    "PIDGEOTTO",
    "PIDGEOT",
    "STARMIE",
    "BULBASAUR",
    "VENUSAUR",
    "TENTACRUEL",
    "MISSINGNO_9C",
    "GOLDEEN",
    "SEAKING",
    "MISSINGNO_9F",
    "MISSINGNO_A0",
    "MISSINGNO_A1",
    "MISSINGNO_A2",
    "PONYTA",
    "RAPIDASH",
    "RATTATA",
    "RATICATE",
    "NIDORINO",
    "NIDORINA",
    "GEODUDE",
    "PORYGON",
    "AERODACTYL",
    "MISSINGNO_AC",
    "MAGNEMITE",
    "MISSINGNO_AE",
    "MISSINGNO_AF",
    "CHARMANDER",
    "SQUIRTLE",
    "CHARMELEON",
    "WARTORTLE",
    "CHARIZARD",
    "MISSINGNO_B5",
    "FOSSIL_KABUTOPS",
    "FOSSIL_AERODACTYL",
    "MON_GHOST",
    "ODDISH",
    "GLOOM",
    "VILEPLUME",
    "BELLSPROUT",
    "WEEPINBELL",
    "VICTREEBEL",
];

@Injectable({
    providedIn: 'root'
})
export class PokemonService {

    constructor() {
        for (var i = 0; i < indToName.length; i++) {
            const ind = i;
            const name = indToName[i];
            this.nameToInd[name] = ind;

            this.namePairs[name] = { name, ind, num: ind + 1 };
        };
    }

    // Generated list of Pokemon in same order as above but lookup index by name
    public nameToInd: {
        [key: string]: number
    } = {};

    // Generated list of Pokemon in same order as above but lookup name by index
    public indToName = indToName;

    // A pair of both
    public namePairs: {
        [key: string]: {
            name: string,
            ind: number,
            num: number
        }
    } = {};
}
