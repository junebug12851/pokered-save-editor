import { SaveFileService } from '../../savefile.service';

export class World {
    constructor(saveFile: SaveFileService) {
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

        this.fossilItemGiven = saveFile.getByte(0x29BB);
        this.fossilPkmnResult = saveFile.getByte(0x29BC);
        this.lastBlackoutMap = saveFile.getByte(0x29C5);
        this.lastMap = saveFile.getByte(0x2611);
        this.debugMode = saveFile.getBit(0x29DE, 1, 1);


        it.offsetTo(0x2CED);
        this.playtime = {
            hours: it.getByte(),
            maxed: it.getByte(),
            minutes: it.getByte(),
            seconds: it.getByte(),
            frames: it.getByte(),
        };
    }

    /**
     * General
     */
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

    /**
     * Other
     */
    public debugMode: boolean;

    public playtime: {
        hours: number,
        maxed: number,
        minutes: number,
        seconds: number,
        frames: number
    };

    public fossilItemGiven: number;
    public fossilPkmnResult: number;
}
