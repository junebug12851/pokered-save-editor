import { SaveFileService } from './../../../savefile.service';

export class PlayerItems {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.bagItems = [];
        const it = saveFile.iterator.offsetTo(0x25C9);
        const amount = it.getByte();
        for (let i = 0; i < amount; i++) {
            this.bagItems.push({
                id: it.getByte(),
                amount: it.getByte(),
            });
        }
    }

    public save(saveFile: SaveFileService) {
        const it = saveFile.iterator.offsetTo(0x25C9);
        it.setByte(this.bagItems.length);
        for (let i = 0; i < this.bagItems.length; i++) {
            it.setByte(this.bagItems[i].id);
            it.setByte(this.bagItems[i].amount);
        }
        it.setByte(0xFF);
    }

    public bagItems: {
        id: number,
        amount: number
    }[] = [];
}
