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

type RawTransArrEntry = {
    code: number,
    eng: string,
    shorthand?: boolean,
    normal?: boolean,
};

type RawTransArr = RawTransArrEntry[];

type TransIndToEng = {
    eng: string,
    shorthand?: boolean,
    normal?: boolean,
}[];

type TransEngToInd = {
    [key: string]: RawTransArrEntry
};

const rawTrans: RawTransArr = [
    //{ code: 0x00, eng: "<error>" },
    // { code: 0x05, eng: "ガ" },
    // { code: 0x06, eng: "ギ" },
    // { code: 0x07, eng: "グ" },
    // { code: 0x08, eng: "ゲ" },
    // { code: 0x09, eng: "ゴ" },
    // { code: 0x0A, eng: "ザ" },
    // { code: 0x0B, eng: "ジ" },
    // { code: 0x0C, eng: "ズ" },
    // { code: 0x0D, eng: "ゼ" },
    // { code: 0x0E, eng: "ゾ" },
    // { code: 0x0F, eng: "ダ" },
    // { code: 0x10, eng: "ヂ" },
    // { code: 0x11, eng: "ヅ" },
    // { code: 0x12, eng: "デ" },
    // { code: 0x13, eng: "ド" },
    // { code: 0x19, eng: "バ" },
    // { code: 0x1A, eng: "ビ" },
    // { code: 0x1B, eng: "ブ" },
    // { code: 0x1C, eng: "ボ" },
    // { code: 0x26, eng: "が" },
    // { code: 0x27, eng: "ぎ" },
    // { code: 0x28, eng: "ぐ" },
    // { code: 0x29, eng: "げ" },
    // { code: 0x2A, eng: "ご" },
    // { code: 0x2B, eng: "ざ" },
    // { code: 0x2C, eng: "じ" },
    // { code: 0x2D, eng: "ず" },
    // { code: 0x2E, eng: "ぜ" },
    // { code: 0x2F, eng: "ぞ" },
    // { code: 0x30, eng: "だ" },
    // { code: 0x31, eng: "ぢ" },
    // { code: 0x32, eng: "づ" },
    // { code: 0x33, eng: "で" },
    // { code: 0x34, eng: "ど" },
    // { code: 0x3A, eng: "ば" },
    // { code: 0x3B, eng: "び" },
    // { code: 0x3C, eng: "ぶ" },
    // { code: 0x3D, eng: "べ" },
    // { code: 0x3E, eng: "ぼ" },
    // { code: 0x40, eng: "パ" },
    // { code: 0x41, eng: "ピ" },
    // { code: 0x42, eng: "プ" },
    // { code: 0x43, eng: "ポ" },
    // { code: 0x44, eng: "ぱ" },
    // { code: 0x45, eng: "ぴ" },
    // { code: 0x46, eng: "ぷ" },
    // { code: 0x47, eng: "ぺ" },
    // { code: 0x48, eng: "ぽ" },
    { code: 0x49, eng: "<page>", shorthand: true },
    { code: 0x4A, eng: "<pkmn>", shorthand: true },
    { code: 0x4B, eng: "<cont_>", shorthand: true },
    { code: 0x4C, eng: "<autocont>", shorthand: true },
    { code: 0x50, eng: "<end>", shorthand: true },
    { code: 0x51, eng: "<para>", shorthand: true },
    { code: 0x52, eng: "<player>", shorthand: true },
    { code: 0x53, eng: "<rival>", shorthand: true },
    { code: 0x54, eng: "<poke>", shorthand: true },
    { code: 0x55, eng: "<cont>", shorthand: true },
    { code: 0x56, eng: "<......>", shorthand: true },
    { code: 0x57, eng: "<done>", shorthand: true },
    { code: 0x58, eng: "<prompt>", shorthand: true },
    { code: 0x59, eng: "<targ>", shorthand: true },
    { code: 0x5A, eng: "<user>", shorthand: true },
    { code: 0x5B, eng: "<pc>", shorthand: true },
    { code: 0x5C, eng: "<tm>", shorthand: true },
    { code: 0x5D, eng: "<trainer>", shorthand: true },
    { code: 0x5E, eng: "<rocket>", shorthand: true },
    { code: 0x5F, eng: "<dex>", shorthand: true },
    { code: 0x71, eng: "<'>" },
    { code: 0x73, eng: "\"" },
    { code: 0x74, eng: "<mdot>", shorthand: true },
    { code: 0x75, eng: "<...>", shorthand: true },
    { code: 0x79, eng: "<ul>", shorthand: true },
    { code: 0x7A, eng: "<line>", shorthand: true },
    { code: 0x7B, eng: "<ur>", shorthand: true },
    { code: 0x7C, eng: "<pipe>", shorthand: true },
    { code: 0x7D, eng: "<bl>", shorthand: true },
    { code: 0x7E, eng: "<br>", shorthand: true },
    { code: 0x7F, eng: " ", normal: true },
    { code: 0x80, eng: "A", normal: true },
    { code: 0x81, eng: "B", normal: true },
    { code: 0x82, eng: "C", normal: true },
    { code: 0x83, eng: "D", normal: true },
    { code: 0x84, eng: "E", normal: true },
    { code: 0x85, eng: "F", normal: true },
    { code: 0x86, eng: "G", normal: true },
    { code: 0x87, eng: "H", normal: true },
    { code: 0x88, eng: "I", normal: true },
    { code: 0x89, eng: "J", normal: true },
    { code: 0x8A, eng: "K", normal: true },
    { code: 0x8B, eng: "L", normal: true },
    { code: 0x8C, eng: "M", normal: true },
    { code: 0x8D, eng: "N", normal: true },
    { code: 0x8E, eng: "O", normal: true },
    { code: 0x8F, eng: "P", normal: true },
    { code: 0x90, eng: "Q", normal: true },
    { code: 0x91, eng: "R", normal: true },
    { code: 0x92, eng: "S", normal: true },
    { code: 0x93, eng: "T", normal: true },
    { code: 0x94, eng: "U", normal: true },
    { code: 0x95, eng: "V", normal: true },
    { code: 0x96, eng: "W", normal: true },
    { code: 0x97, eng: "X", normal: true },
    { code: 0x98, eng: "Y", normal: true },
    { code: 0x99, eng: "Z", normal: true },
    { code: 0x9A, eng: "(", normal: true },
    { code: 0x9B, eng: ")", normal: true },
    { code: 0x9C, eng: ":", normal: true },
    { code: 0x9D, eng: ";", normal: true },
    { code: 0x9E, eng: "[", normal: true },
    { code: 0x9F, eng: "]", normal: true },
    { code: 0xA0, eng: "a", normal: true },
    { code: 0xA1, eng: "b", normal: true },
    { code: 0xA2, eng: "c", normal: true },
    { code: 0xA3, eng: "d", normal: true },
    { code: 0xA4, eng: "e", normal: true },
    { code: 0xA5, eng: "f", normal: true },
    { code: 0xA6, eng: "g", normal: true },
    { code: 0xA7, eng: "h", normal: true },
    { code: 0xA8, eng: "i", normal: true },
    { code: 0xA9, eng: "j", normal: true },
    { code: 0xAA, eng: "k", normal: true },
    { code: 0xAB, eng: "l", normal: true },
    { code: 0xAC, eng: "m", normal: true },
    { code: 0xAD, eng: "n", normal: true },
    { code: 0xAE, eng: "o", normal: true },
    { code: 0xAF, eng: "p", normal: true },
    { code: 0xB0, eng: "q", normal: true },
    { code: 0xB1, eng: "r", normal: true },
    { code: 0xB2, eng: "s", normal: true },
    { code: 0xB3, eng: "t", normal: true },
    { code: 0xB4, eng: "u", normal: true },
    { code: 0xB5, eng: "v", normal: true },
    { code: 0xB6, eng: "w", normal: true },
    { code: 0xB7, eng: "x", normal: true },
    { code: 0xB8, eng: "y", normal: true },
    { code: 0xB9, eng: "z", normal: true },
    { code: 0xBA, eng: "<e>", shorthand: true },
    { code: 0xBB, eng: "<'d>", shorthand: true },
    { code: 0xBC, eng: "<'l>", shorthand: true },
    { code: 0xBD, eng: "<'s>", shorthand: true },
    { code: 0xBE, eng: "<'t>", shorthand: true },
    { code: 0xBF, eng: "<'v>", shorthand: true },
    // { code: 0xC0, eng: "た" },
    // { code: 0xC1, eng: "ち" },
    // { code: 0xC2, eng: "つ" },
    // { code: 0xC3, eng: "て" },
    // { code: 0xC4, eng: "と" },
    // { code: 0xC5, eng: "な" },
    // { code: 0xC6, eng: "に" },
    // { code: 0xC7, eng: "ぬ" },
    // { code: 0xC8, eng: "ね" },
    // { code: 0xC9, eng: "の" },
    // { code: 0xCA, eng: "は" },
    // { code: 0xCB, eng: "ひ" },
    // { code: 0xCC, eng: "ふ" },
    // { code: 0xCD, eng: "へ" },
    // { code: 0xCE, eng: "ほ" },
    // { code: 0xCF, eng: "ま" },
    // { code: 0xD0, eng: "み" },
    // { code: 0xD1, eng: "む" },
    // { code: 0xD2, eng: "め" },
    // { code: 0xD3, eng: "も" },
    // { code: 0xD4, eng: "や" },
    // { code: 0xD5, eng: "ゆ" },
    // { code: 0xD6, eng: "よ" },
    // { code: 0xD7, eng: "ら" },
    // { code: 0xD8, eng: "り" },
    // { code: 0xD9, eng: "る" },
    // { code: 0xDA, eng: "れ" },
    // { code: 0xDB, eng: "ろ" },
    // { code: 0xDC, eng: "わ" },
    // { code: 0xDD, eng: "を" },
    // { code: 0xDE, eng: "ん" },
    // { code: 0xDF, eng: "っ" },
    { code: 0xE0, eng: "'" },
    { code: 0xE1, eng: "<pk>", shorthand: true, normal: true },
    { code: 0xE2, eng: "<mn>", shorthand: true, normal: true },
    { code: 0xE3, eng: "-", normal: true },
    { code: 0xE4, eng: "<'r>", shorthand: true },
    { code: 0xE5, eng: "<'m>", shorthand: true },
    { code: 0xE6, eng: "?", normal: true },
    { code: 0xE7, eng: "!", normal: true },
    { code: 0xE8, eng: ".", normal: true },
    { code: 0xEC, eng: "<arr-r2>", shorthand: true },
    { code: 0xED, eng: "<arr-r>", shorthand: true },
    { code: 0xEE, eng: "<arr-d>", shorthand: true },
    { code: 0xEF, eng: "<m>", shorthand: true, normal: true },
    { code: 0xF0, eng: "$" },
    { code: 0xF1, eng: "<x>", shorthand: true, normal: true },
    { code: 0xF2, eng: "<.>", shorthand: true },
    { code: 0xF3, eng: "/", normal: true },
    { code: 0xF4, eng: ",", normal: true },
    { code: 0xF5, eng: "<f>", shorthand: true, normal: true },
    { code: 0xF6, eng: "0" },
    { code: 0xF7, eng: "1" },
    { code: 0xF8, eng: "2" },
    { code: 0xF9, eng: "3" },
    { code: 0xFA, eng: "4" },
    { code: 0xFB, eng: "5" },
    { code: 0xFC, eng: "6" },
    { code: 0xFD, eng: "7" },
    { code: 0xFE, eng: "8" },
    { code: 0xFF, eng: "9" },
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

    // Table of raw translation data
    public rawTrans: RawTransArr = rawTrans;

    // Code Index to English Representation
    // Sparse array of code indexes containing representation strings
    public indToEng: TransIndToEng = [];

    // Representation string to code points
    // Object of representation strings containing code values
    public engToIndex: TransEngToInd = {};
}
