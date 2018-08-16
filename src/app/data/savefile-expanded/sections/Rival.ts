import { SaveFileService } from '../../savefile.service';

export class Rival {
    constructor(saveFile: SaveFileService) {
        this.rivalName = saveFile.getStr(0x25F6, 0xB, 7);
        this.rivalStarter = saveFile.getHex(0x29C1, 1).toUpperCase().padStart(2, "0");
    }

    public rivalName: string;
    public rivalStarter: string;
}
