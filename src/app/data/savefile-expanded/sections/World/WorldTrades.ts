import { SaveFileService } from './../../../savefile.service';
import { toBitArray, fromBitArray } from '../../util/bitArray';

export class WorldTrades {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.inGameTrades = [];
        toBitArray(
            saveFile,
            0x29E3,
            2,
            this.inGameTrades
        );
    }

    public save(saveFile: SaveFileService) {
        fromBitArray(
            saveFile,
            0x29E3,
            2,
            this.inGameTrades
        );
    }

    public inGameTrades: boolean[] = [];
}
