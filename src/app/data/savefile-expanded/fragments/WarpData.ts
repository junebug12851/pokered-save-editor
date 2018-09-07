import { SaveFileService } from './../../savefile.service';

export class WarpData {
    constructor(savefile?: SaveFileService, index?: number) {
        if (arguments.length >= 2)
            this.load(savefile as SaveFileService, index as number);
    }

    public load(savefile: SaveFileService, index: number) {
        const it = savefile.iterator.offsetTo((0x4 * index) + 0x265B);

        this.y = it.getByte();
        this.x = it.getByte();
        this.destWarp = it.getByte();
        this.destMap = it.getByte();
    }

    public save(savefile: SaveFileService, index: number) {
        const it = savefile.iterator.offsetTo((0x4 * index) + 0x265B);

        it.setByte(this.y);
        it.setByte(this.x);
        it.setByte(this.destWarp);
        it.setByte(this.destMap);
    }

    public y: number = 0;
    public x: number = 0;
    public destWarp: number = 0;
    public destMap: number = 0;
}
