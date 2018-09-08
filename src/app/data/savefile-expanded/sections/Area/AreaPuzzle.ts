import { SaveFileService } from './../../../savefile.service';

export class AreaPuzzle {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.firstTrashcanLock = saveFile.getByte(0x29EF);
        this.secondTrashcanLock = saveFile.getByte(0x29F0);
        this.oppAfterWrongAnsw = saveFile.getByte(0x2CE4);
    }

    public save(saveFile: SaveFileService) {
        saveFile.setByte(0x29EF, this.firstTrashcanLock);
        saveFile.setByte(0x29F0, this.secondTrashcanLock);
        saveFile.setByte(0x2CE4, this.oppAfterWrongAnsw);
    }

    public firstTrashcanLock: number = 0;
    public secondTrashcanLock: number = 0;
    public oppAfterWrongAnsw: number = 0;
}
