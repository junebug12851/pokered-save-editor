import { SaveFileService } from './../../../savefile.service';
import { toBitArray, fromBitArray } from '../../util/bitArray';

export class WorldMissables {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.missableObjectFlags = [];
        toBitArray(
            saveFile,
            0x2852,
            32,
            this.missableObjectFlags
        );
    }

    public save(saveFile: SaveFileService) {
        fromBitArray(
            saveFile,
            0x2852,
            32,
            this.missableObjectFlags
        );
    }

    public missableObjectFlags: boolean[] = [];
}
