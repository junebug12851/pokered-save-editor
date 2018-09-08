import { SaveFileService } from './../../../savefile.service';

export class WorldOther {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.fossilItemGiven = saveFile.getByte(0x29BB);
        this.fossilPkmnResult = saveFile.getByte(0x29BC);
        this.debugMode = saveFile.getBit(0x29DE, 1, 1);


        const it = saveFile.iterator.offsetTo(0x2CED);
        this.playtime = {
            hours: it.getByte(),
            maxed: it.getByte(),
            minutes: it.getByte(),
            seconds: it.getByte(),
            frames: it.getByte(),
        };
    }

    public save(saveFile: SaveFileService) {
        saveFile.setByte(0x29BB, this.fossilItemGiven);
        saveFile.setByte(0x29BC, this.fossilPkmnResult);
        saveFile.setBit(0x29DE, 1, 1, this.debugMode);

        const it = saveFile.iterator.offsetTo(0x2CED);
        it.setByte(this.playtime.hours);
        it.setByte(this.playtime.maxed);
        it.setByte(this.playtime.minutes);
        it.setByte(this.playtime.seconds);
        it.setByte(this.playtime.frames);
    }

    public debugMode: boolean = false;

    public playtime = {
        hours: 0 as number,
        maxed: 0 as number,
        minutes: 0 as number,
        seconds: 0 as number,
        frames: 0 as number
    };

    public fossilItemGiven: number = 0;
    public fossilPkmnResult: number = 0;
}
