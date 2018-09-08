import { SaveFileService } from './../../../savefile.service';
import { toBitArray, fromBitArray } from '../../util/bitArray';

export class PlayerPokedex {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.loadPokedex(saveFile, this.pokedexOwned, 0x25A3);
        this.loadPokedex(saveFile, this.pokedexSeen, 0x25B6);
    }

    public save(saveFile: SaveFileService) {
        this.savePokedex(saveFile, this.pokedexOwned, 0x25A3);
        this.savePokedex(saveFile, this.pokedexSeen, 0x25B6);
    }

    loadPokedex(saveFile: SaveFileService, toArr: Array<boolean>, fromOffset: number) {
        toArr.length = 0;
        toBitArray(
            saveFile,
            fromOffset,
            0x13,
            toArr
        );

        // Correct Array length keeping it at 151
        toArr.length = 151;
    }

    savePokedex(saveFile: SaveFileService, fromArr: Array<boolean>, toOffset: number) {

        const it = fromBitArray(
            saveFile,
            toOffset,
            0x13,
            fromArr
        );

        // Reset last bit keeping it at 151
        it.dec();
        it.setBit(1, 7, false);
    }

    public pokedexOwned: boolean[] = [];
    public pokedexSeen: boolean[] = [];
}
