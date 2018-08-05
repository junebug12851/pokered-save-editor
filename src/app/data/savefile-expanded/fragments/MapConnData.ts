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
        this.viewPtr = saveFile.getWord(offsetCtr);
    }

    public mapPtr: number;
    public stripSrc: number;
    public stripDest: number;
    public stripWidth: number;
    public width: number;
    public yAlign: number;
    public xAlign: number;
    public viewPtr: number;
}
