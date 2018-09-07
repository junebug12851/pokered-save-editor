import { SaveFileService } from './../../../savefile.service';

export class AreaCachedSprites {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.spriteSet = saveFile.getRange(0x2649, 0xB);
        this.spriteSetId = saveFile.getByte(0x2654);
    }

    public save(saveFile: SaveFileService) {
        saveFile.copyRange(0x2649, 0xB, this.spriteSet);
        saveFile.setByte(0x2654, this.spriteSetId);
    }

    // Cached Sprites (Complete)
    public spriteSet: Uint8Array = new Uint8Array();
    public spriteSetId: number = 0;
}
