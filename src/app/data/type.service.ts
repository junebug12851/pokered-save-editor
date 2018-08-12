import { RawType } from './type.service';
import { Injectable } from '@angular/core';

export interface RawType {
    name: string,
    ind: number
}

export const rawTypes: RawType[] = [{ name: "Normal", ind: 0x00 },
{ name: "Fighting", ind: 0x01 },
{ name: "Flying", ind: 0x02 },
{ name: "Poison", ind: 0x03 },
{ name: "Ground", ind: 0x04 },
{ name: "Rock", ind: 0x05 },
{ name: "Bug", ind: 0x07 },
{ name: "Ghost", ind: 0x08 },
{ name: "Fire", ind: 0x14 },
{ name: "Water", ind: 0x15 },
{ name: "Grass", ind: 0x16 },
{ name: "Electric", ind: 0x17 },
{ name: "Psychic", ind: 0x18 },
{ name: "Ice", ind: 0x19 },
{ name: "Dragon", ind: 0x1A }
]

@Injectable({
    providedIn: 'root'
})
export class TypeServiceB {

    constructor() {
        for (var i = 0; i < rawTypes.length; i++) {
            const rawEntry = rawTypes[i];
            const ind = rawEntry.ind;
            const name = rawEntry.name;

            this.nameToInd[name] = rawEntry;

            this.indToName = [];
            this.indToName[ind] = rawEntry;
        };
    }

    // Generated list of Pokemon in same order as above but lookup index by name
    public nameToInd: {
        [key: string]: RawType
    } = {};

    // Generated list of Pokemon in same order as above but lookup name by index
    // @ts-ignore - It's clearly defined above, I don't understand what your comaplining about
    public indToName: RawType[];

    public rawTypes = rawTypes;
}
