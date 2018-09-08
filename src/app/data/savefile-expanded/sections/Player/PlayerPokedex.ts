import { SaveFileService } from './../../../savefile.service';

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
        const it = saveFile.iterator.offsetTo(fromOffset);

        // Clear Array
        toArr.length = 0;
        for (let i = 0; i < 0x13; i++) {
            // Push bits in order of this byte
            toArr.push(it.getBit(1, 0));
            toArr.push(it.getBit(1, 1));
            toArr.push(it.getBit(1, 2));
            toArr.push(it.getBit(1, 3));
            toArr.push(it.getBit(1, 4));
            toArr.push(it.getBit(1, 5));
            toArr.push(it.getBit(1, 6));
            toArr.push(it.getBit(1, 7));

            // Increment iterator
            it.inc();
        }

        // Correct Array length keeping it at 151
        toArr.length = 151;
    }

    savePokedex(saveFile: SaveFileService, fromArr: Array<boolean>, toOffset: number) {
        const it = saveFile.iterator.offsetTo(toOffset);

        // Clear Array
        fromArr.length = 0;
        for (let i = 0; i < 0x13; i += 8) {
            // Push bits in order of this byte
            it.setBit(1, 0, fromArr[i + 0]);
            it.setBit(1, 1, fromArr[i + 1]);
            it.setBit(1, 2, fromArr[i + 2]);
            it.setBit(1, 3, fromArr[i + 3]);
            it.setBit(1, 4, fromArr[i + 4]);
            it.setBit(1, 5, fromArr[i + 5]);
            it.setBit(1, 6, fromArr[i + 6]);
            it.setBit(1, 7, fromArr[i + 7]);

            // Increment iterator
            it.inc();
        }

        // Reset last bit keeping it at 151
        it.dec();
        it.setBit(1, 7, false);
    }

    public pokedexOwned: boolean[] = [];
    public pokedexSeen: boolean[] = [];
}
