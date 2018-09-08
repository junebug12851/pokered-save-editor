import { SaveFileService } from './../../../savefile.service';
import { toBitArray, fromBitArray } from '../../util/bitArray';

export class WorldGeneral {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.options = {
            // Bits 0-3 [max 15]
            textSpeedSlowness: (saveFile.getByte(0x2601) & 0b00001111),
            battleStyleSet: saveFile.getBit(0x2601, 1, 6),
            battleAnimOff: saveFile.getBit(0x2601, 1, 7),
        };

        this.letterDelay = {
            normalDelay: saveFile.getBit(0x2604, 1, 0),
            dontDelay: saveFile.getBit(0x2604, 1, 1),
        };
        this.lastBlackoutMap = saveFile.getByte(0x29C5);
        this.lastMap = saveFile.getByte(0x2611);
    }

    public save(saveFile: SaveFileService) {
        saveFile.setByte(0x2601, this.options.textSpeedSlowness);
        saveFile.setBit(0x2601, 1, 6, this.options.battleStyleSet);
        saveFile.setBit(0x2601, 1, 7, this.options.battleAnimOff);

        saveFile.setBit(0x2604, 1, 0, this.letterDelay.normalDelay);
        saveFile.setBit(0x2604, 1, 1, this.letterDelay.dontDelay);

        saveFile.setByte(0x29C5, this.lastBlackoutMap);
        saveFile.setByte(0x2611, this.lastMap);
    }

    // Maps
    public lastBlackoutMap: number;
    public lastMap: number;

    // Options
    public options: {
        textSpeedSlowness: number,
        battleStyleSet: boolean,
        battleAnimOff: boolean,
    };

    public letterDelay: {
        normalDelay: boolean,
        dontDelay: boolean,
    }
}
