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

/*
 * This is quite complicated because I need to take a regular string that
 * represents an array of bytes to convert to however each byte it converts to
 * could be 1 or more characters in length.
 *
 * I honestly don't know of any way to do this except very slow impratical uses
 * but given it's only ever 7-10 bytes long it shouldn't be too hard.
 *
 * 1. Search the start of the string for all ~255 codes, stop on the first
 *    occurence
 * 2. Convert it to a correct byte code
 * 3. Splice string
 * 4. Repeat until done
*/

// Raw translation table

export type RawTransArrEntry = {
    code: number,
    eng: string,

    shorthand?: boolean,

    normal?: boolean,
    control?: boolean,
    picture?: boolean,
    singleChar?: boolean,
    multiChar?: boolean,
    variable?: boolean,
    useTilemap?: boolean,
};

type RawTransArr = RawTransArrEntry[];

type TransIndToEng = {
    eng: string,

    shorthand?: boolean,

    normal?: boolean,
    control?: boolean,
    picture?: boolean,
    singleChar?: boolean,
    multiChar?: boolean,
    variable?: boolean,
    useTilemap?: boolean,
}[];

type TransEngToInd = {
    [key: string]: RawTransArrEntry
};

const rawTrans: RawTransArr = [
    // TESTED:
    // Works as expected
    //{ code: 0x00, eng: "<null>", shorthand: true, control: true },

    // These codes correspond to tiles 0x9000 to 0x9480
    // Which always contain a portion of the current tileset
    { code: 0x01, eng: "<pic01>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x02, eng: "<pic02>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x03, eng: "<pic03>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x04, eng: "<pic04>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x05, eng: "<pic05>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x06, eng: "<pic06>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x07, eng: "<pic07>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x08, eng: "<pic08>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x09, eng: "<pic09>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x0A, eng: "<pic0A>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x0B, eng: "<pic0B>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x0C, eng: "<pic0C>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x0D, eng: "<pic0D>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x0E, eng: "<pic0E>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x0F, eng: "<pic0F>", shorthand: true, picture: true, useTilemap: true },

    { code: 0x10, eng: "<pic10>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x11, eng: "<pic11>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x12, eng: "<pic12>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x13, eng: "<pic13>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x14, eng: "<pic14>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x15, eng: "<pic15>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x16, eng: "<pic16>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x17, eng: "<pic17>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x18, eng: "<pic18>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x19, eng: "<pic19>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x1A, eng: "<pic1A>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x1B, eng: "<pic1B>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x1C, eng: "<pic1C>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x1D, eng: "<pic1D>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x1E, eng: "<pic1E>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x1F, eng: "<pic1F>", shorthand: true, picture: true, useTilemap: true },

    { code: 0x20, eng: "<pic20>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x21, eng: "<pic21>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x22, eng: "<pic22>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x23, eng: "<pic23>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x24, eng: "<pic24>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x25, eng: "<pic25>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x26, eng: "<pic26>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x27, eng: "<pic27>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x28, eng: "<pic28>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x29, eng: "<pic29>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x2A, eng: "<pic2A>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x2B, eng: "<pic2B>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x2C, eng: "<pic2C>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x2D, eng: "<pic2D>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x2E, eng: "<pic2E>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x2F, eng: "<pic2F>", shorthand: true, picture: true, useTilemap: true },

    { code: 0x30, eng: "<pic30>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x31, eng: "<pic31>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x32, eng: "<pic32>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x33, eng: "<pic33>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x34, eng: "<pic34>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x35, eng: "<pic35>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x36, eng: "<pic36>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x37, eng: "<pic37>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x38, eng: "<pic38>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x39, eng: "<pic39>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x3A, eng: "<pic3A>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x3B, eng: "<pic3B>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x3C, eng: "<pic3C>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x3D, eng: "<pic3D>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x3E, eng: "<pic3E>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x3F, eng: "<pic3F>", shorthand: true, picture: true, useTilemap: true },

    { code: 0x40, eng: "<pic40>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x41, eng: "<pic41>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x42, eng: "<pic42>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x43, eng: "<pic43>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x44, eng: "<pic44>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x45, eng: "<pic45>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x46, eng: "<pic46>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x47, eng: "<pic47>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x48, eng: "<pic48>", shorthand: true, picture: true, useTilemap: true },

    { code: 0x49, eng: "<page>", shorthand: true, control: true },
    { code: 0x4A, eng: "<pkmn>", shorthand: true, multiChar: true },
    { code: 0x4B, eng: "<cont_>", shorthand: true, control: true },
    { code: 0x4C, eng: "<autocont>", shorthand: true, control: true },
    { code: 0x4D, eng: "<pic4D>", shorthand: true, picture: true, useTilemap: true },
    { code: 0x4E, eng: "<next>", shorthand: true, control: true },
    { code: 0x4F, eng: "<line>", shorthand: true, control: true },
    { code: 0x50, eng: "<end>", shorthand: true, control: true },
    { code: 0x51, eng: "<para>", shorthand: true, control: true },
    { code: 0x52, eng: "<player>", shorthand: true, multiChar: true, variable: true },
    { code: 0x53, eng: "<rival>", shorthand: true, multiChar: true, variable: true, },
    { code: 0x54, eng: "<poke>", shorthand: true, multiChar: true },
    { code: 0x55, eng: "<cont>", shorthand: true, control: true },
    { code: 0x56, eng: "<......>", shorthand: true, multiChar: true },
    { code: 0x57, eng: "<done>", shorthand: true, control: true },
    { code: 0x58, eng: "<prompt>", shorthand: true, control: true },
    { code: 0x59, eng: "<targ>", shorthand: true, multiChar: true, variable: true },
    { code: 0x5A, eng: "<user>", shorthand: true, multiChar: true, variable: true },
    { code: 0x5B, eng: "<pc>", shorthand: true, multiChar: true },
    { code: 0x5C, eng: "<tm>", shorthand: true, multiChar: true },
    { code: 0x5D, eng: "<trainer>", shorthand: true, multiChar: true },
    { code: 0x5E, eng: "<rocket>", shorthand: true, multiChar: true },
    { code: 0x5F, eng: "<dex>", shorthand: true, control: true },

    // These codes correspond to tiles 0x9600 to 0x97F0
    // Which contain the GUI tileset and font characters
    // Certain tiles change when the GUI tileset changes such as the
    // battle tileset or overworld menu tileset
    { code: 0x60, eng: "<A>", shorthand: true, singleChar: true },
    { code: 0x61, eng: "<B>", shorthand: true, singleChar: true },
    { code: 0x62, eng: "<C>", shorthand: true, singleChar: true },
    { code: 0x63, eng: "<D>", shorthand: true, singleChar: true },
    { code: 0x64, eng: "<E>", shorthand: true, singleChar: true },
    { code: 0x65, eng: "<F>", shorthand: true, singleChar: true },
    { code: 0x66, eng: "<G>", shorthand: true, singleChar: true },
    { code: 0x67, eng: "<H>", shorthand: true, singleChar: true },
    { code: 0x68, eng: "<I>", shorthand: true, singleChar: true },
    { code: 0x69, eng: "<V>", shorthand: true, singleChar: true },
    { code: 0x6A, eng: "<S>", shorthand: true, singleChar: true },
    { code: 0x6B, eng: "<L>", shorthand: true, singleChar: true },
    { code: 0x6C, eng: "<M>", shorthand: true, singleChar: true },
    { code: 0x6D, eng: "<:>", shorthand: true, singleChar: true },
    { code: 0x6E, eng: "<ji>", shorthand: true, singleChar: true },
    { code: 0x6F, eng: "<ju>", shorthand: true, singleChar: true },
    { code: 0x70, eng: "<o'>", shorthand: true, singleChar: true },
    { code: 0x71, eng: "<c'>", shorthand: true, singleChar: true },
    { code: 0x72, eng: `<o">`, shorthand: true, singleChar: true },
    { code: 0x73, eng: `<c">`, shorthand: true, singleChar: true },
    { code: 0x74, eng: "<mdot>", shorthand: true, singleChar: true },
    { code: 0x75, eng: "<...>", shorthand: true, singleChar: true },
    { code: 0x76, eng: "<ja>", shorthand: true, singleChar: true },
    { code: 0x77, eng: "<je>", shorthand: true, singleChar: true },
    { code: 0x78, eng: "<jo>", shorthand: true, singleChar: true },
    { code: 0x79, eng: "<ul>", shorthand: true, picture: true },
    { code: 0x7A, eng: "<horz>", shorthand: true, picture: true },
    { code: 0x7B, eng: "<ur>", shorthand: true, picture: true },
    { code: 0x7C, eng: "<vert>", shorthand: true, picture: true },
    { code: 0x7D, eng: "<bl>", shorthand: true, picture: true },
    { code: 0x7E, eng: "<br>", shorthand: true, picture: true },
    { code: 0x7F, eng: " ", normal: true, singleChar: true },

    // These codes correspond to tiles 0x8800 to 0x8BF0
    // Which Contain the main font characters when font is going
    // to be printed to the screen
    { code: 0x80, eng: "A", normal: true, singleChar: true },
    { code: 0x81, eng: "B", normal: true, singleChar: true },
    { code: 0x82, eng: "C", normal: true, singleChar: true },
    { code: 0x83, eng: "D", normal: true, singleChar: true },
    { code: 0x84, eng: "E", normal: true, singleChar: true },
    { code: 0x85, eng: "F", normal: true, singleChar: true },
    { code: 0x86, eng: "G", normal: true, singleChar: true },
    { code: 0x87, eng: "H", normal: true, singleChar: true },
    { code: 0x88, eng: "I", normal: true, singleChar: true },
    { code: 0x89, eng: "J", normal: true, singleChar: true },
    { code: 0x8A, eng: "K", normal: true, singleChar: true },
    { code: 0x8B, eng: "L", normal: true, singleChar: true },
    { code: 0x8C, eng: "M", normal: true, singleChar: true },
    { code: 0x8D, eng: "N", normal: true, singleChar: true },
    { code: 0x8E, eng: "O", normal: true, singleChar: true },
    { code: 0x8F, eng: "P", normal: true, singleChar: true },
    { code: 0x90, eng: "Q", normal: true, singleChar: true },
    { code: 0x91, eng: "R", normal: true, singleChar: true },
    { code: 0x92, eng: "S", normal: true, singleChar: true },
    { code: 0x93, eng: "T", normal: true, singleChar: true },
    { code: 0x94, eng: "U", normal: true, singleChar: true },
    { code: 0x95, eng: "V", normal: true, singleChar: true },
    { code: 0x96, eng: "W", normal: true, singleChar: true },
    { code: 0x97, eng: "X", normal: true, singleChar: true },
    { code: 0x98, eng: "Y", normal: true, singleChar: true },
    { code: 0x99, eng: "Z", normal: true, singleChar: true },
    { code: 0x9A, eng: "(", normal: true, singleChar: true },
    { code: 0x9B, eng: ")", normal: true, singleChar: true },
    { code: 0x9C, eng: ":", normal: true, singleChar: true },
    { code: 0x9D, eng: ";", normal: true, singleChar: true },
    { code: 0x9E, eng: "[", normal: true, singleChar: true },
    { code: 0x9F, eng: "]", normal: true, singleChar: true },
    { code: 0xA0, eng: "a", normal: true, singleChar: true },
    { code: 0xA1, eng: "b", normal: true, singleChar: true },
    { code: 0xA2, eng: "c", normal: true, singleChar: true },
    { code: 0xA3, eng: "d", normal: true, singleChar: true },
    { code: 0xA4, eng: "e", normal: true, singleChar: true },
    { code: 0xA5, eng: "f", normal: true, singleChar: true },
    { code: 0xA6, eng: "g", normal: true, singleChar: true },
    { code: 0xA7, eng: "h", normal: true, singleChar: true },
    { code: 0xA8, eng: "i", normal: true, singleChar: true },
    { code: 0xA9, eng: "j", normal: true, singleChar: true },
    { code: 0xAA, eng: "k", normal: true, singleChar: true },
    { code: 0xAB, eng: "l", normal: true, singleChar: true },
    { code: 0xAC, eng: "m", normal: true, singleChar: true },
    { code: 0xAD, eng: "n", normal: true, singleChar: true },
    { code: 0xAE, eng: "o", normal: true, singleChar: true },
    { code: 0xAF, eng: "p", normal: true, singleChar: true },
    { code: 0xB0, eng: "q", normal: true, singleChar: true },
    { code: 0xB1, eng: "r", normal: true, singleChar: true },
    { code: 0xB2, eng: "s", normal: true, singleChar: true },
    { code: 0xB3, eng: "t", normal: true, singleChar: true },
    { code: 0xB4, eng: "u", normal: true, singleChar: true },
    { code: 0xB5, eng: "v", normal: true, singleChar: true },
    { code: 0xB6, eng: "w", normal: true, singleChar: true },
    { code: 0xB7, eng: "x", normal: true, singleChar: true },
    { code: 0xB8, eng: "y", normal: true, singleChar: true },
    { code: 0xB9, eng: "z", normal: true, singleChar: true },
    { code: 0xBA, eng: "<e>", shorthand: true, singleChar: true },
    { code: 0xBB, eng: "<'d>", shorthand: true, singleChar: true },
    { code: 0xBC, eng: "<'l>", shorthand: true, singleChar: true },
    { code: 0xBD, eng: "<'s>", shorthand: true, singleChar: true },
    { code: 0xBE, eng: "<'t>", shorthand: true, singleChar: true },
    { code: 0xBF, eng: "<'v>", shorthand: true, singleChar: true },

    // These codes correspond to tiles 0x8C00 to 0x8DF0
    // Which are empty most of the time
    // It seems supplementary tiles go here when needed for certain UI screens
    { code: 0xC0, eng: "<picC0>", shorthand: true, picture: true },
    { code: 0xC1, eng: "<picC1>", shorthand: true, picture: true },
    { code: 0xC2, eng: "<picC2>", shorthand: true, picture: true },
    { code: 0xC3, eng: "<picC3>", shorthand: true, picture: true },
    { code: 0xC4, eng: "<picC4>", shorthand: true, picture: true },
    { code: 0xC5, eng: "<picC5>", shorthand: true, picture: true },
    { code: 0xC6, eng: "<picC6>", shorthand: true, picture: true },
    { code: 0xC7, eng: "<picC7>", shorthand: true, picture: true },
    { code: 0xC8, eng: "<picC8>", shorthand: true, picture: true },
    { code: 0xC9, eng: "<picC9>", shorthand: true, picture: true },
    { code: 0xCA, eng: "<picCA>", shorthand: true, picture: true },
    { code: 0xCB, eng: "<picCB>", shorthand: true, picture: true },
    { code: 0xCC, eng: "<picCC>", shorthand: true, picture: true },
    { code: 0xCD, eng: "<picCD>", shorthand: true, picture: true },
    { code: 0xCE, eng: "<picCE>", shorthand: true, picture: true },
    { code: 0xCF, eng: "<picCF>", shorthand: true, picture: true },

    { code: 0xD0, eng: "<picD0>", shorthand: true, picture: true },
    { code: 0xD1, eng: "<picD1>", shorthand: true, picture: true },
    { code: 0xD2, eng: "<picD2>", shorthand: true, picture: true },
    { code: 0xD3, eng: "<picD3>", shorthand: true, picture: true },
    { code: 0xD4, eng: "<picD4>", shorthand: true, picture: true },
    { code: 0xD5, eng: "<picD5>", shorthand: true, picture: true },
    { code: 0xD6, eng: "<picD6>", shorthand: true, picture: true },
    { code: 0xD7, eng: "<picD7>", shorthand: true, picture: true },
    { code: 0xD8, eng: "<picD8>", shorthand: true, picture: true },
    { code: 0xD9, eng: "<picD9>", shorthand: true, picture: true },
    { code: 0xDA, eng: "<picDA>", shorthand: true, picture: true },
    { code: 0xDB, eng: "<picDB>", shorthand: true, picture: true },
    { code: 0xDC, eng: "<picDC>", shorthand: true, picture: true },
    { code: 0xDD, eng: "<picDD>", shorthand: true, picture: true },
    { code: 0xDE, eng: "<picDE>", shorthand: true, picture: true },
    { code: 0xDF, eng: "<picDF>", shorthand: true, picture: true },

    { code: 0xE0, eng: "'", singleChar: true },
    { code: 0xE1, eng: "<pk>", shorthand: true, normal: true, singleChar: true },
    { code: 0xE2, eng: "<mn>", shorthand: true, normal: true, singleChar: true },
    { code: 0xE3, eng: "-", normal: true, singleChar: true },
    { code: 0xE4, eng: "<'r>", shorthand: true, singleChar: true },
    { code: 0xE5, eng: "<'m>", shorthand: true, singleChar: true },
    { code: 0xE6, eng: "?", normal: true, singleChar: true },
    { code: 0xE7, eng: "!", normal: true, singleChar: true },
    { code: 0xE8, eng: ".", normal: true, singleChar: true },
    { code: 0xE9, eng: "<jka>", shorthand: true, singleChar: true },
    { code: 0xEA, eng: "<jku>", shorthand: true, singleChar: true },
    { code: 0xEB, eng: "<jke>", shorthand: true, singleChar: true },
    { code: 0xEC, eng: "<arr-r2>", shorthand: true, picture: true },
    { code: 0xED, eng: "<arr-r>", shorthand: true, picture: true },
    { code: 0xEE, eng: "<arr-d>", shorthand: true, picture: true },
    { code: 0xEF, eng: "<m>", shorthand: true, normal: true, singleChar: true },
    { code: 0xF0, eng: "$", singleChar: true },
    { code: 0xF1, eng: "<x>", shorthand: true, normal: true, singleChar: true },
    { code: 0xF2, eng: "<.>", shorthand: true, singleChar: true },
    { code: 0xF3, eng: "/", normal: true, singleChar: true },
    { code: 0xF4, eng: ",", normal: true, singleChar: true },
    { code: 0xF5, eng: "<f>", shorthand: true, normal: true, singleChar: true },
    { code: 0xF6, eng: "0", singleChar: true },
    { code: 0xF7, eng: "1", singleChar: true },
    { code: 0xF8, eng: "2", singleChar: true },
    { code: 0xF9, eng: "3", singleChar: true },
    { code: 0xFA, eng: "4", singleChar: true },
    { code: 0xFB, eng: "5", singleChar: true },
    { code: 0xFC, eng: "6", singleChar: true },
    { code: 0xFD, eng: "7", singleChar: true },
    { code: 0xFE, eng: "8", singleChar: true },
    { code: 0xFF, eng: "9", singleChar: true },
];

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TextService {

    constructor() {
        for (let i = 0; i < rawTrans.length; i++) {
            // Get translate pair entry
            const transPair = rawTrans[i];

            // Cache inside direct lookup caches for easier lookup
            this.indToEng[transPair.code] = transPair;
            this.engToIndex[transPair.eng] = transPair;
        }
    }

    // Converts a string filled with english typable in-game text code
    // representations to raw in-game code
    // Only converts 10 bytes with of in-game code
    // If fed strings not in the representation list, the unknown characters will
    // be ignored thus possibly corrupting output
    // Possibly very slow
    public convertToCode = (str: string, maxLength: number = 10, autoEnd: boolean = true): Uint8Array => {

        let code = [];
        let lastCode = 0;

        while (str.length !== 0) {

            let match = false;

            for (let i = 0; i < this.rawTrans.length; i++) {

                // Find a starting match
                const transPair = this.rawTrans[i];
                if (!str.startsWith(transPair.eng))
                    continue;

                match = true;

                // Slice off match from string start
                str = str.substring(transPair.eng.length);

                // Append code to code array and set last code
                code.push(transPair.code);
                lastCode = transPair.code;

                // Break early
                break;
            }

            // If no match then strip unknown character and continue
            if (match === false)
                str = str.substring(1);

            // Stop here if code array is at 10 bytes or a stop code was manually
            // set (0x50)
            if (code.length === maxLength ||
                lastCode === 0x50)
                break;
        }

        // Append terminator
        if (autoEnd)
            code.push(0x50);

        return new Uint8Array(code);
    }

    // Much easier and faster, just expand the in-game code to it's english
    // representation directly
    public convertFromCode = (codes: Uint8Array, maxLength: number = 10): string => {
        let eng = "";

        for (let i = 0; i < codes.length; i++) {
            const code = codes[i];

            // Don't include the end terminator
            // stop here if there is one
            if (code === 0x50)
                break;

            if (this.indToEng[code] === undefined)
                continue;

            eng += this.indToEng[code].eng;

            // If we're done with the 10th character assume 11th is terminator
            //and stop here
            if (i === maxLength)
                break;
        }

        return eng;
    }

    // Converts an english format string to code represented as how it would be
    // in-game
    public convertEngToHTML(msg: string, maxChars: number, rival: string = "BLUE", player: string = "RED") {
        // Convert string to char codes
        let charCodes = Array.from(this.convertToCode(msg, maxChars, false));

        // Pre-pass
        for (let i = 0; i < charCodes.length; i++) {
            const char = charCodes[i];
            // <pkmn>
            if (char === 0x4A) {
                charCodes.splice(i, 1, 0xE1, 0xE2);
            }
            // <player>
            else if (char === 0x52) {
                const playerName = Array.from(this.convertToCode(player, 7, false));
                charCodes.splice(i, 1, ...playerName);
            }
            // <rival>
            else if (char === 0x53) {
                const rivalName = Array.from(this.convertToCode(rival, 7, false));
                charCodes.splice(i, 1, ...rivalName);
            }
            // POK<e>
            else if (char === 0x54) {
                const str = Array.from(this.convertToCode("POK<e>", 10, false));
                charCodes.splice(i, 1, ...str);
            }
            // <......>
            else if (char === 0x56) {
                const str = Array.from(this.convertToCode("<...><...>", 10, false));
                charCodes.splice(i, 1, ...str);
            }
            // <targ>
            else if (char === 0x59) {
                const str = Array.from(this.convertToCode("CHARIZARD", 100, false));
                charCodes.splice(i, 1, ...str);
            }
            // <user>
            else if (char === 0x5A) {
                const str = Array.from(this.convertToCode("Enemy BLASTOISE", 100, false));
                charCodes.splice(i, 1, ...str);
            }
            // <pc>
            else if (char === 0x5B) {
                const str = Array.from(this.convertToCode("PC", 100, false));
                charCodes.splice(i, 1, ...str);
            }
            // <tm>
            else if (char === 0x5C) {
                const str = Array.from(this.convertToCode("TM", 100, false));
                charCodes.splice(i, 1, ...str);
            }
            // <trainer>
            else if (char === 0x5D) {
                const str = Array.from(this.convertToCode("TRAINER", 100, false));
                charCodes.splice(i, 1, ...str);
            }
            // <rocket>
            else if (char === 0x5E) {
                const str = Array.from(this.convertToCode("ROCKET", 100, false));
                charCodes.splice(i, 1, ...str);
            }
        }

        const fontStr = [];
        for (let i = 0; i < charCodes.length; i++) {
            const char = charCodes[i];

            if (this.indToEng[char].useTilemap)
                fontStr.push(`<div class="pr pr-pic-overworld pr-${char.toString(16).toUpperCase().padStart(2, "0")}"></div>`);
            else
                // pr-pic-overworld
                // @ts-ignore
                fontStr.push(`<div class="pr pr-${char.toString(16).toUpperCase().padStart(2, "0")}"></div>`);
        }

        return fontStr.join('');
    }

    // Table of raw translation data
    public rawTrans: RawTransArr = rawTrans;

    // Code Index to English Representation
    // Sparse array of code indexes containing representation strings
    public indToEng: TransIndToEng = [];

    // Representation string to code points
    // Object of representation strings containing code values
    public engToIndex: TransEngToInd = {};
}
