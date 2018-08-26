import { SaveFileService } from './../../savefile.service';

export class MapConnData {
    constructor(saveFile: SaveFileService, offset: number) {

        let offsetCtr = offset;

        const mapPtr = saveFile.getByte(offsetCtr); offsetCtr += 1;
        this.stripSrc = saveFile.getWord(offsetCtr); offsetCtr += 2;
        this.stripDest = saveFile.getWord(offsetCtr); offsetCtr += 2;
        this.stripWidth = saveFile.getByte(offsetCtr); offsetCtr += 1;
        const width = saveFile.getByte(offsetCtr); offsetCtr += 1;
        this.yAlign = saveFile.getByte(offsetCtr); offsetCtr += 1;
        this.xAlign = saveFile.getByte(offsetCtr); offsetCtr += 1;
        this.viewPtr = saveFile.getWord(offsetCtr, true);

        this.map = `${mapPtr.toString(16).padStart(2, "0").toUpperCase()}_${width}`;
    }

    static get empty() {
        return {
            map: "",
            viewPtr: 0,
            stripSrc: 0,
            stripDest: 0,
            stripWidth: 0,
            yAlign: 0,
            xAlign: 0,
        }
    }

    // Connected Map
    public map: string;

    // Pointer to upper left corner of map without adjustment for X position
    public viewPtr: number;

    // Strip
    public stripSrc: number;
    public stripDest: number;
    public stripWidth: number;

    // Strip Alignment
    public yAlign: number;
    public xAlign: number;
}
