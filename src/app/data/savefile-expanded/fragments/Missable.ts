import { SaveFileService } from './../../savefile.service';

export class Missable {
    constructor(savefile: SaveFileService, index: number) {
        let offsetCtr = (0x2 * index) + 0x287A;
        this.spriteID = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.missableIndex = savefile.getByte(offsetCtr);
    }

    // Current Map
    public spriteID: number;

    // Missable Flags
    public missableIndex: number;
}
