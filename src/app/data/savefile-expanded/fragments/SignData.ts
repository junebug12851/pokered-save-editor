import { SaveFileService } from './../../savefile.service';

export interface SignDataData {
    y: number;
    x: number;
    text: number;
}

export class SignData implements SignDataData {
    constructor(savefile: SaveFileService, index: number) {
        this.saveFile = savefile;
        this.index = index;

        const it = savefile.iterator.offsetTo((2 * index) + 0x275D);
        this.y = it.getByte();
        this.x = it.getByte();

        it.offsetTo((1 * index) + 0x277D);
        this.text = it.getByte();
    }

    static get empty(): SignDataData {
        return {
            y: 0,
            x: 0,
            text: 0
        }
    }

    public save() {
        const saveFile = this.saveFile;
        const index = this.index;

        const it = saveFile.iterator.offsetTo((2 * index) + 0x275D);
        it.setByte(this.y);
        it.setByte(this.x);

        it.offsetTo((1 * index) + 0x277D);
        it.setByte(this.text);
    }

    public saveFile: SaveFileService;
    public index: number;

    public y: number;
    public x: number;
    public text: number;
}
