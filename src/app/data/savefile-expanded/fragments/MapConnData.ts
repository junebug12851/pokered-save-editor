import { SaveFileService } from './../../savefile.service';

export class MapConnData {
    constructor(saveFile?: SaveFileService, offset?: number) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService, offset as number);
    }

    public load(saveFile: SaveFileService, offset: number) {
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

    public save(saveFile: SaveFileService, offset: number) {
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

    // Connected Map
    public map: string = "";

    // Pointer to upper left corner of map without adjustment for X position
    public viewPtr: number = 0;

    // Strip
    public stripSrc: number = 0;
    public stripDest: number = 0;
    public stripWidth: number = 0;

    // Strip Alignment
    public yAlign: number = 0;
    public xAlign: number = 0;
}
