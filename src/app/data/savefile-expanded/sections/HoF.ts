import { HoFRecord } from './../fragments/HoFRecord';
import { SaveFileService } from './../../savefile.service';

export class HoF {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        const hofRecordCount = saveFile.getByte(0x284E);
        for (let i = 0; i < hofRecordCount && i < 50; i++) {
            this.hallOfFame.push(new HoFRecord(saveFile, i));
        }
    }

    public save(saveFile: SaveFileService) {
        saveFile.setByte(0x284E, this.hallOfFame.length);
        for (let i = 0; i < this.hallOfFame.length && i < 50; i++) {
            this.hallOfFame[i].save(saveFile, i);
        }
    }

    // Related to the Hall of Fame
    public hallOfFame: HoFRecord[] = [];
}
