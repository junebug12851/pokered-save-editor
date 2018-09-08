import { SignData } from './../../fragments/SignData';
import { SaveFileService } from './../../../savefile.service';

export class AreaSigns {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.signData = [];
        for (let i = 0; i < saveFile.getByte(0x275C) && i < 16; i++) {
            this.signData.push(new SignData(saveFile, i));
        }
    }

    public save(saveFile: SaveFileService) {
        saveFile.setByte(0x275C, this.signData.length);
        for (let i = 0; i < this.signData.length && i < 16; i++) {
            this.signData[i].save(saveFile, i);
        }
    }

    // Signs
    public signData: SignData[] = [];
}
