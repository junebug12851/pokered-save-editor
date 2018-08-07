import { PokemonParty } from './../fragments/PokemonParty';
import { SaveFileService } from '../../savefile.service';

import _ from "lodash";

export class Player {
    constructor(saveFile: SaveFileService) {
        const it = saveFile.iterator;

        this.playerName = saveFile.getStr(0x2598, 0xB, 7);
        this.playerID = saveFile.getWord(0x2605);

        this.pokedexOwned = [];
        it.offsetTo(0x25A3);
        for (let i = 0; i < 0x13; i++) {
            // Push bits in order of this byte
            this.pokedexOwned.push(it.getBit(1, 0));
            this.pokedexOwned.push(it.getBit(1, 1));
            this.pokedexOwned.push(it.getBit(1, 2));
            this.pokedexOwned.push(it.getBit(1, 3));
            this.pokedexOwned.push(it.getBit(1, 4));
            this.pokedexOwned.push(it.getBit(1, 5));
            this.pokedexOwned.push(it.getBit(1, 6));
            this.pokedexOwned.push(it.getBit(1, 7));

            // Increment iterator
            it.inc();
        }

        this.pokedexSeen = [];
        it.offsetTo(0x25B6);
        for (let i = 0; i < 0x13; i++) {
            // Push bits in order of this byte
            this.pokedexSeen.push(it.getBit(1, 0));
            this.pokedexSeen.push(it.getBit(1, 1));
            this.pokedexSeen.push(it.getBit(1, 2));
            this.pokedexSeen.push(it.getBit(1, 3));
            this.pokedexSeen.push(it.getBit(1, 4));
            this.pokedexSeen.push(it.getBit(1, 5));
            this.pokedexSeen.push(it.getBit(1, 6));
            this.pokedexSeen.push(it.getBit(1, 7));

            // Increment iterator
            it.inc();
        }

        this.bagItems = [];
        it.offsetTo(0x25C9);
        const amount = it.getByte();
        for (let i = 0; i < amount; i++) {
            this.bagItems.push({
                id: it.getByte(),
                amount: it.getByte()
            });
        }

        this.money = saveFile.getBCD(0x25F3, 3);
        this.coins = saveFile.getBCD(0x2850, 2);

        it.offsetTo(0x2602);
        this.badges = {
            boulder: it.getBit(1, 0),
            cascade: it.getBit(1, 1),
            thunder: it.getBit(1, 2),
            rainbow: it.getBit(1, 3),
            soul: it.getBit(1, 4),
            marsh: it.getBit(1, 5),
            volcano: it.getBit(1, 6),
            earth: it.getBit(1, 7),
        };

        this.playerStarter = saveFile.getByte(0x29C3);

        this.playerParty = [];
        for (let i = 0; i < saveFile.getByte(0x2F2C) && i < 6; i++) {
            this.playerParty.push(new PokemonParty(
                saveFile,
                0x2F34,
                0x307E,
                0x303C,
                i));
        }

        this.saveFile = saveFile;
        this.onNameChange();
    }

    onNameChange() {
        // Convert string to char codes
        let charCodes = Array.from(this.playerNameInternal = this.saveFile.saveText.convertToCode(this.playerName, 7));

        // Pre-pass
        for (let i = 0; i < charCodes.length; i++) {
            const char = charCodes[i];
            // <pkmn>
            if (char === 0x4A) {
                charCodes.splice(i, 1, 0xE1, 0xE2);
            }
            // <rival>
            else if (char === 0x53) {
                const rivalName = Array.from(this.saveFile.saveText.convertToCode(this.saveFile.fileDataExpanded.rival.rivalName, 7, false));
                charCodes.splice(i, 1, ...rivalName);
            }
            // POK<e>
            else if (char === 0x54) {
                const str = Array.from(this.saveFile.saveText.convertToCode("POK<e>", 10, false));
                charCodes.splice(i, 1, ...str);
            }
            // <......>
            else if (char === 0x56) {
                const str = Array.from(this.saveFile.saveText.convertToCode("<...><...>", 10, false));
                charCodes.splice(i, 1, ...str);
            }
            // <targ>
            else if (char === 0x59) {
                const str = Array.from(this.saveFile.saveText.convertToCode("Enemy BLASTOISE", 100, false));
                charCodes.splice(i, 1, ...str);
            }
            // <user>
            else if (char === 0x5A) {
                const str = Array.from(this.saveFile.saveText.convertToCode("CHARIZARD", 100, false));
                charCodes.splice(i, 1, ...str);
            }
            // <pc>
            else if (char === 0x5B) {
                const str = Array.from(this.saveFile.saveText.convertToCode("PC", 100, false));
                charCodes.splice(i, 1, ...str);
            }
            // <tm>
            else if (char === 0x5C) {
                const str = Array.from(this.saveFile.saveText.convertToCode("TM", 100, false));
                charCodes.splice(i, 1, ...str);
            }
            // <trainer>
            else if (char === 0x5D) {
                const str = Array.from(this.saveFile.saveText.convertToCode("TRAINER", 100, false));
                charCodes.splice(i, 1, ...str);
            }
            // <rocket>
            else if (char === 0x5E) {
                const str = Array.from(this.saveFile.saveText.convertToCode("ROCKET", 100, false));
                charCodes.splice(i, 1, ...str);
            }
        }

        const fontStr = [];
        for (let i = 0; i < charCodes.length; i++) {
            const char = charCodes[i];
            // @ts-ignore
            fontStr.push(`<div class="pr pr-${char.toString(16).toUpperCase()}"></div>`);
        }

        this.playerNameFontStr = fontStr.join('');
    }

    public saveFile: any;

    public playerName: string;
    public playerNameInternal: Uint8Array = new Uint8Array([0x80]);
    public playerNameFontStr: string;

    public playerID: number;
    public pokedexOwned: boolean[];
    public pokedexSeen: boolean[];
    public bagItems: {
        id: number,
        amount: number,
    }[];
    public playerParty: PokemonParty[];
    public money: number;
    public coins: number;
    public badges: {
        boulder: boolean,
        cascade: boolean,
        thunder: boolean,
        rainbow: boolean,
        soul: boolean,
        marsh: boolean,
        volcano: boolean,
        earth: boolean,
    };
    public playerStarter: number;
}
