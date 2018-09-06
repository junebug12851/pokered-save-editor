import { SaveFileService } from './../../savefile.service';

export class SignData {
    constructor(savefile?: SaveFileService, index?: number) {
        if (arguments.length >= 2)
            this.load(savefile as SaveFileService, index as number);
    }

    public load(savefile: SaveFileService, index: number) {
        const it = savefile.iterator.offsetTo((2 * index) + 0x275D);
        this.y = it.getByte();
        this.x = it.getByte();

        it.offsetTo((1 * index) + 0x277D);
        this.text = it.getByte();
    }

    public save(saveFile: SaveFileService, index: number) {
        const it = saveFile.iterator.offsetTo((2 * index) + 0x275D);
        it.setByte(this.y);
        it.setByte(this.x);

        it.offsetTo((1 * index) + 0x277D);
        it.setByte(this.text);
    }

    public y: number = 0;
    public x: number = 0;
    public text: number = 0;
}
