import { SaveFileService } from './../../savefile.service';

export interface MapConnDataData {
    // Connected Map
    map: string;

    // Pointer to upper left corner of map without adjustment for X position
    viewPtr: number;

    // Strip
    stripSrc: number;
    stripDest: number;
    stripWidth: number;

    // Strip Alignment
    yAlign: number;
    xAlign: number;
}

export class MapConnData implements MapConnDataData {
    constructor(saveFile: SaveFileService, offset: number) {

        this.saveFile = saveFile;
        this.offset = offset;

        const it = saveFile.iterator.offsetTo(offset);

        const mapPtr = it.getByte();
        this.stripSrc = it.getWord();
        this.stripDest = it.getWord();
        this.stripWidth = it.getByte();
        const width = it.getByte();
        this.yAlign = it.getByte();
        this.xAlign = it.getByte();
        this.viewPtr = it.getWord(0, true);

        this.map = `${mapPtr.toString(16).padStart(2, "0").toUpperCase()}_${width}`;
    }

    static get empty(): MapConnDataData {
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

    public save() {
        const saveFile = this.saveFile;
        const offset = this.offset;

        const it = saveFile.iterator.offsetTo(offset);
        const map = this.map.split("_");

        it.setByte(parseInt(map[0], 16));
        it.setWord(this.stripSrc);
        it.setWord(this.stripDest);
        it.setByte(this.stripWidth);
        it.setByte(parseInt(map[1]));
        it.setByte(this.yAlign);
        it.setByte(this.xAlign);
        it.setWord(this.viewPtr, 0, true);
    }

    public saveFile: SaveFileService;
    public offset: number;

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
