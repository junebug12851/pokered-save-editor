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

// List of Pokemon in National Pokedex Order and in array form which is zero
// based
export const itemEntries = [
    { name: "Master Ball", ind: 0x01, normal: true },
    { name: "Ultra Ball", ind: 0x02, normal: true },
    { name: "Great Ball", ind: 0x03, normal: true },
    { name: "Poke Ball", ind: 0x04, normal: true },
    { name: "Town Map", ind: 0x05, normal: true },
    { name: "Bicycle", ind: 0x06, normal: true },
    { name: "Surfboard", ind: 0x07 },
    { name: "Safari Ball", ind: 0x08 },
    { name: "Pokedex", ind: 0x09 },
    { name: "Moon Stone", ind: 0x0A, normal: true },
    { name: "Antidote", ind: 0x0B, normal: true },
    { name: "Burn Heal", ind: 0x0C, normal: true },
    { name: "Ice Heal", ind: 0x0D, normal: true },
    { name: "Awakening", ind: 0x0E, normal: true },
    { name: "Parlyz Heal", ind: 0x0F, normal: true },
    { name: "Full Restore", ind: 0x10, normal: true },
    { name: "Max Potion", ind: 0x11, normal: true },
    { name: "Hyper Potion", ind: 0x12, normal: true },
    { name: "Super Potion", ind: 0x13, normal: true },
    { name: "Potion", ind: 0x14, normal: true },
    { name: "Boulder Badge", ind: 0x15 },
    { name: "Cascade Badge", ind: 0x16 },
    { name: "Thunder Badge", ind: 0x17 },
    { name: "Rainbow Badge", ind: 0x18 },
    { name: "Soul Badge", ind: 0x19 },
    { name: "Marsh Badge", ind: 0x1A },
    { name: "Volcano Badge", ind: 0x1B },
    { name: "Earth Badge", ind: 0x1C },
    { name: "Escape Rope", ind: 0x1D, normal: true },
    { name: "Repel", ind: 0x1E, normal: true },
    { name: "Old Amber", ind: 0x1F, normal: true },
    { name: "Fire Stone", ind: 0x20, normal: true },
    { name: "Thunder Stone", ind: 0x21, normal: true },
    { name: "Water Stone", ind: 0x22, normal: true },
    { name: "HP Up", ind: 0x23, normal: true },
    { name: "Protein", ind: 0x24, normal: true },
    { name: "Iron", ind: 0x25, normal: true },
    { name: "Carbos", ind: 0x26, normal: true },
    { name: "Calcium", ind: 0x27, normal: true },
    { name: "Rare Candy", ind: 0x28, normal: true },
    { name: "Dome Fossil", ind: 0x29, normal: true },
    { name: "Helix Fossil", ind: 0x2A, normal: true },
    { name: "Secret Key", ind: 0x2B, normal: true },
    { name: "Unused Item", ind: 0x2C },
    { name: "Bike Voucher", ind: 0x2D, normal: true },
    { name: "X Accuracy", ind: 0x2E, normal: true },
    { name: "Leaf Stone", ind: 0x2F, normal: true },
    { name: "Card Key", ind: 0x30, normal: true },
    { name: "Nugget", ind: 0x31, normal: true },
    { name: "PP Up 2", ind: 0x32, normal: true },
    { name: "Poke Doll", ind: 0x33, normal: true },
    { name: "Full Heal", ind: 0x34, normal: true },
    { name: "Revive", ind: 0x35, normal: true },
    { name: "Max Revive", ind: 0x36, normal: true },
    { name: "Guard Spec", ind: 0x37, normal: true },
    { name: "Super Repel", ind: 0x38, normal: true },
    { name: "Max Repel", ind: 0x39, normal: true },
    { name: "Dire Hit", ind: 0x3A, normal: true },
    { name: "Coin", ind: 0x3B },
    { name: "Fresh Water", ind: 0x3C, normal: true },
    { name: "Soda Pop", ind: 0x3D, normal: true },
    { name: "Lemonade", ind: 0x3E, normal: true },
    { name: "S.S. Ticket", ind: 0x3F, normal: true },
    { name: "Gold Teeth", ind: 0x40, normal: true },
    { name: "X Attack", ind: 0x41, normal: true },
    { name: "X Defend", ind: 0x42, normal: true },
    { name: "X Speed", ind: 0x43, normal: true },
    { name: "X Special", ind: 0x44, normal: true },
    { name: "Coin Case", ind: 0x45, normal: true },
    { name: "Oaks Parcel", ind: 0x46, normal: true },
    { name: "Item Finder", ind: 0x47, normal: true },
    { name: "Silph Scope", ind: 0x48, normal: true },
    { name: "Poke Flute", ind: 0x49, normal: true },
    { name: "Lift Key", ind: 0x4A, normal: true },
    { name: "Exp All", ind: 0x4B, normal: true },
    { name: "Old Rod", ind: 0x4C, normal: true },
    { name: "Good Rod", ind: 0x4D, normal: true },
    { name: "Super Rod", ind: 0x4E, normal: true },
    { name: "PP Up", ind: 0x4F, normal: true },
    { name: "Ether", ind: 0x50, normal: true },
    { name: "Max Ether", ind: 0x51, normal: true },
    { name: "Elixer", ind: 0x52, normal: true },
    { name: "Max Elixer", ind: 0x53, normal: true },
    { name: "Floor B2F", ind: 0x54 },
    { name: "Floor B1F", ind: 0x55 },
    { name: "Floor 1F", ind: 0x56 },
    { name: "Floor 2F", ind: 0x57 },
    { name: "Floor 3F", ind: 0x58 },
    { name: "Floor 4F", ind: 0x59 },
    { name: "Floor 5F", ind: 0x5A },
    { name: "Floor 6F", ind: 0x5B },
    { name: "Floor 7F", ind: 0x5C },
    { name: "Floor 8F", ind: 0x5D },
    { name: "Floor 9F", ind: 0x5E },
    { name: "Floor 10F", ind: 0x5F },
    { name: "Floor 11F", ind: 0x60 },
    { name: "Floor B4F", ind: 0x61 },
    { name: "HM 01", ind: 0xC4, normal: true },
    { name: "HM 02", ind: 0xC5, normal: true },
    { name: "HM 03", ind: 0xC6, normal: true },
    { name: "HM 04", ind: 0xC7, normal: true },
    { name: "HM 05", ind: 0xC8, normal: true },
    { name: "TM 01", ind: 0xC9, normal: true },
    { name: "TM 02", ind: 0xCA, normal: true },
    { name: "TM 03", ind: 0xCB, normal: true },
    { name: "TM 04", ind: 0xCC, normal: true },
    { name: "TM 05", ind: 0xCD, normal: true },
    { name: "TM 06", ind: 0xCE, normal: true },
    { name: "TM 07", ind: 0xCF, normal: true },
    { name: "TM 08", ind: 0xD0, normal: true },
    { name: "TM 09", ind: 0xD1, normal: true },
    { name: "TM 10", ind: 0xD2, normal: true },
    { name: "TM 11", ind: 0xD3, normal: true },
    { name: "TM 12", ind: 0xD4, normal: true },
    { name: "TM 13", ind: 0xD5, normal: true },
    { name: "TM 14", ind: 0xD6, normal: true },
    { name: "TM 15", ind: 0xD7, normal: true },
    { name: "TM 16", ind: 0xD8, normal: true },
    { name: "TM 17", ind: 0xD9, normal: true },
    { name: "TM 18", ind: 0xDA, normal: true },
    { name: "TM 19", ind: 0xDB, normal: true },
    { name: "TM 20", ind: 0xDC, normal: true },
    { name: "TM 21", ind: 0xDD, normal: true },
    { name: "TM 22", ind: 0xDE, normal: true },
    { name: "TM 23", ind: 0xDF, normal: true },
    { name: "TM 24", ind: 0xE0, normal: true },
    { name: "TM 25", ind: 0xE1, normal: true },
    { name: "TM 26", ind: 0xE2, normal: true },
    { name: "TM 27", ind: 0xE3, normal: true },
    { name: "TM 28", ind: 0xE4, normal: true },
    { name: "TM 29", ind: 0xE5, normal: true },
    { name: "TM 30", ind: 0xE6, normal: true },
    { name: "TM 31", ind: 0xE7, normal: true },
    { name: "TM 32", ind: 0xE8, normal: true },
    { name: "TM 33", ind: 0xE9, normal: true },
    { name: "TM 34", ind: 0xEA, normal: true },
    { name: "TM 35", ind: 0xEB, normal: true },
    { name: "TM 36", ind: 0xEC, normal: true },
    { name: "TM 37", ind: 0xED, normal: true },
    { name: "TM 38", ind: 0xEE, normal: true },
    { name: "TM 39", ind: 0xEF, normal: true },
    { name: "TM 40", ind: 0xF0, normal: true },
    { name: "TM 41", ind: 0xF1, normal: true },
    { name: "TM 42", ind: 0xF2, normal: true },
    { name: "TM 43", ind: 0xF3, normal: true },
    { name: "TM 44", ind: 0xF4, normal: true },
    { name: "TM 45", ind: 0xF5, normal: true },
    { name: "TM 46", ind: 0xF6, normal: true },
    { name: "TM 47", ind: 0xF7, normal: true },
    { name: "TM 48", ind: 0xF8, normal: true },
    { name: "TM 49", ind: 0xF9, normal: true },
    { name: "TM 50", ind: 0xFA, normal: true },
];

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    constructor() {
        for (var i = 0; i < itemEntries.length; i++) {
            const entry = itemEntries[i];
            this.nameToInd[entry.name] = entry;
            this.indToName[entry.ind] = entry;
        };
    }

    // Generated list of Pokemon in same order as above but lookup index by name
    public nameToInd = {};

    // Generated list of Pokemon in same order as above but lookup name by index
    public indToName = [];
}
