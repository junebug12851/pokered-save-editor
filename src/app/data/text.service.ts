import { Text } from './../../assets/data/text.d';
import { GameDataService } from './gameData.service';
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

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TextService {

    constructor(
        public gd: GameDataService
    ) {
        const text: Text[] = this.gd.file("text").data;
        this.rawTrans = text;
        for (let i = 0; i < text.length; i++) {
            // Get translate pair entry
            const transPair: Text = text[i];

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

        if ((typeof str !== 'string') && autoEnd)
            return new Uint8Array([0x50]);
        else if ((typeof str !== 'string') && !autoEnd)
            return new Uint8Array();

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
                fontStr.push(`<div class="pr pr-pic pr-${char.toString(16).toUpperCase().padStart(2, "0")}"></div>`);
            else
                fontStr.push(`<div class="pr pr-${char.toString(16).toUpperCase().padStart(2, "0")}"></div>`);
        }

        return fontStr.join('');
    }

    // Table of raw translation data
    public rawTrans: Text[];

    // Code Index to English Representation
    // Sparse array of code indexes containing representation strings
    public indToEng: Text[] = [];

    // Representation string to code points
    // Object of representation strings containing code values
    public engToIndex: {
        [key: string]: Text
    } = {};
}
