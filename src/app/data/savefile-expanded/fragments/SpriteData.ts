import { SaveFileService } from './../../savefile.service';

export class SpriteData {
    constructor(savefile: SaveFileService, index: number) {
        let offsetCtr = (2 * index) + 0x2790;
        this.movementByte = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.textID = savefile.getByte(offsetCtr); offsetCtr += 1;

        offsetCtr = (2 * index) + 0x27B0;
        this.trainerClassOrItemID = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.trainerSetID = savefile.getByte(offsetCtr);
    }

    public movementByte: number;
    public textID: number;
    public trainerClassOrItemID: number;
    public trainerSetID: number;
}
