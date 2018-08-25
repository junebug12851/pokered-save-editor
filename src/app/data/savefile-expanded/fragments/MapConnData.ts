import { SaveFileService } from './../../savefile.service';

export class MapConnData {
    constructor(saveFile: SaveFileService, offset: number) {

        let offsetCtr = offset;

        this.mapPtr = saveFile.getByte(offsetCtr); offsetCtr += 1;
        this.stripSrc = saveFile.getWord(offsetCtr); offsetCtr += 2;
        this.stripDest = saveFile.getWord(offsetCtr); offsetCtr += 2;
        this.stripWidth = saveFile.getByte(offsetCtr); offsetCtr += 1;
        this.width = saveFile.getByte(offsetCtr); offsetCtr += 1;
        this.yAlign = saveFile.getByte(offsetCtr); offsetCtr += 1;
        this.xAlign = saveFile.getByte(offsetCtr); offsetCtr += 1;
        this.viewPtr = saveFile.getWord(offsetCtr, true);
    }

    // Combine
    public mapPtr: number;
    public width: number;

    // Pointer to upper left corner of map without adjustment for X position
    // Can't combine
    public viewPtr: number;

    public stripSrc: number;
    public stripDest: number;
    public stripWidth: number;

    public yAlign: number;
    public xAlign: number;
}
