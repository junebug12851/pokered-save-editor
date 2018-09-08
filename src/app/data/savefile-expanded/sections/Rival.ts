import { SaveFileService } from '../../savefile.service';

export class RivalBasics {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    load(saveFile: SaveFileService) {
        this.rivalName = saveFile.getStr(0x25F6, 0xB, 7);
        this.rivalStarter = saveFile.getHex(0x29C1, 1).toUpperCase().padStart(2, "0");
    }

    save(saveFile: SaveFileService) {
        saveFile.setStr(0x25F6, 0xB, 7, this.rivalName);
        saveFile.setHex(0x29C1, 1, this.rivalStarter);
    }

    public rivalName: string = "";
    public rivalStarter: string = "";
}
