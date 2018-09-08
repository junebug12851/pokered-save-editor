import { SaveFileService } from './../../../savefile.service';

export class AreaGeneral {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.contrast = saveFile.getByte(0x2609);
        this.noLetterDelay = saveFile.getBit(0x29DC, 1, 6);
        this.countPlaytime = saveFile.getBit(0x29DE, 1, 0);
    }

    public save(saveFile: SaveFileService) {
        saveFile.setByte(0x2609, this.contrast);
        saveFile.setBit(0x29DC, 1, 6, this.noLetterDelay);
        saveFile.setBit(0x29DE, 1, 0, this.countPlaytime);
    }

    public contrast: number = 0;
    public noLetterDelay: boolean = false;
    public countPlaytime: boolean = false;
}
