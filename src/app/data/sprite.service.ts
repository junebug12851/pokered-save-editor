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

export interface SpriteEntry {
    name: string,
    ind: number,
    disabled?: boolean
};

export const spriteEntries: SpriteEntry[] = [
    { name: "", ind: 0x0, disabled: true },
    { name: "Player", ind: 0x01 },
    { name: "Rival", ind: 0x02 },
    { name: "Prof. Oak", ind: 0x03 },
    { name: "Bug Catcher", ind: 0x04 },
    { name: "Slowbro", ind: 0x05 },
    { name: "Lass", ind: 0x06 },
    { name: "Black Hair Boy 1", ind: 0x07 },
    { name: "Little Girl", ind: 0x08 },
    { name: "Bird", ind: 0x09 },
    { name: "Fat Bald Guy", ind: 0x0a },
    { name: "Gambler", ind: 0x0b },
    { name: "Black Hair Boy 2", ind: 0x0c },
    { name: "Girl", ind: 0x0d },
    { name: "Hiker", ind: 0x0e },
    { name: "Foulard Woman", ind: 0x0f },
    { name: "Gentleman", ind: 0x10 },
    { name: "Daisy", ind: 0x11 },
    { name: "Biker", ind: 0x12 },
    { name: "Sailor", ind: 0x13 },
    { name: "Cook", ind: 0x14 },
    { name: "Bike Shop Guy", ind: 0x15 },
    { name: "Mr. Fuji", ind: 0x16 },
    { name: "Giovanni", ind: 0x17 },
    { name: "Rocket", ind: 0x18 },
    { name: "Medium", ind: 0x19 },
    { name: "Waiter", ind: 0x1a },
    { name: "Erika", ind: 0x1b },
    { name: "Mom Geisha", ind: 0x1c },
    { name: "Brunette Girl", ind: 0x1d },
    { name: "Lance", ind: 0x1e },
    { name: "Oak Scientist Aide", ind: 0x1f },
    { name: "Oak Aide", ind: 0x20 },
    { name: "Rocker", ind: 0x21 },
    { name: "Swimmer", ind: 0x22 },
    { name: "White Player", ind: 0x23 },
    { name: "Gym Helper", ind: 0x24 },
    { name: "Old Person", ind: 0x25 },
    { name: "Mart Guy", ind: 0x26 },
    { name: "Fisher", ind: 0x27 },
    { name: "Old Medium Woman", ind: 0x28 },
    { name: "Nurse", ind: 0x29 },
    { name: "Cable Club Woman", ind: 0x2a },
    { name: "Mr. Masterball", ind: 0x2b },
    { name: "Lapras Giver", ind: 0x2c },
    { name: "Warden", ind: 0x2d },
    { name: "SS. Captain", ind: 0x2e },
    { name: "Fisher 2", ind: 0x2f },
    { name: "Blackbelt", ind: 0x30 },
    { name: "Guard", ind: 0x31 },
    { name: "Cop Guard", ind: 0x32 },
    { name: "Mom", ind: 0x33 },
    { name: "Balding Guy", ind: 0x34 },
    { name: "Young Boy", ind: 0x35 },
    { name: "Gameboy Kid", ind: 0x36 },
    { name: "Gameboy Kid Copy", ind: 0x37 },
    { name: "Clefairy", ind: 0x38 },
    { name: "Agatha", ind: 0x39 },
    { name: "Bruno", ind: 0x3a },
    { name: "Lorelei", ind: 0x3b },
    { name: "Seel", ind: 0x3c },
    { name: "Pokeball", ind: 0x3d },
    { name: "Omanyte", ind: 0x3e },
    { name: "Boulder", ind: 0x3f },
    { name: "Paper Sheet", ind: 0x40 },
    { name: "Book Map Dex", ind: 0x41 },
    { name: "Clipboard", ind: 0x42 },
    { name: "Snorlax", ind: 0x43 },
    { name: "Old Amber Copy", ind: 0x44 },
    { name: "Old Amber", ind: 0x45 },
    { name: "Lying Old Man Unused 1", ind: 0x46 },
    { name: "Lying Old Man Unused 2", ind: 0x47 },
    { name: "Lying Old Man", ind: 0x48 },
];

@Injectable({
    providedIn: 'root'
})
export class SpriteService {

    constructor() {
        for (var i = 0; i < spriteEntries.length; i++) {
            const entry = spriteEntries[i];

            this.nameToInd[entry.name] = entry;
            this.indToName.push(entry);
        };
    }

    // Main Sprites
    public nameToInd: {
        [key: string]: SpriteEntry
    } = {};

    // Main Sprites
    public indToName: SpriteEntry[] = [];
}
