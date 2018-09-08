import { SaveFileService } from './../../../savefile.service';
import { toBitArray, fromBitArray } from '../../util/bitArray';

export class WorldTowns {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.visitedTowns = [];
        toBitArray(
            saveFile,
            0x29B7,
            2,
            this.visitedTowns
        );
    }

    public save(saveFile: SaveFileService) {
        fromBitArray(
            saveFile,
            0x29B7,
            2,
            this.visitedTowns
        );
    }

    public visitedTowns: boolean[] = [];
}
