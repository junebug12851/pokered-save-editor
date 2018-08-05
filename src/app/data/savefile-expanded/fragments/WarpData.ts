import { SaveFileService } from './../../savefile.service';
export class WarpData {
    constructor(savefile: SaveFileService, index: number) {
        let offsetCtr = (0x4 * index) + 0x265B;
        this.y = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.x = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.destWarp = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.destMap = savefile.getByte(offsetCtr); offsetCtr += 1;
    }

    public y: number;
    public x: number;
    public destWarp: number;
    public destMap: number;
}
