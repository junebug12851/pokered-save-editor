import { SaveFileService } from './../../../savefile.service';
import { toBitArray, fromBitArray } from '../../util/bitArray';

export class WorldEvents {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.completedEvents = [];
        toBitArray(
            saveFile,
            0x29F3,
            320,
            this.completedEvents
        );
    }

    public save(saveFile: SaveFileService) {
        fromBitArray(
            saveFile,
            0x29F3,
            320,
            this.completedEvents
        );
    }

    public completedEvents: boolean[] = [];
}
