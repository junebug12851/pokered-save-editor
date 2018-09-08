import { SaveFileService } from './../../../savefile.service';
import { toBitArray, fromBitArray } from '../../util/bitArray';

export class WorldHidden {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.ownedHidenItems = [];
        toBitArray(
            saveFile,
            0x299C,
            14,
            this.ownedHidenItems
        );

        this.ownedHiddenCoins = [];
        toBitArray(
            saveFile,
            0x29AA,
            2,
            this.ownedHiddenCoins
        );
    }

    public save(saveFile: SaveFileService) {
        fromBitArray(
            saveFile,
            0x299C,
            14,
            this.ownedHidenItems
        );

        fromBitArray(
            saveFile,
            0x29AA,
            2,
            this.ownedHiddenCoins
        );
    }

    public ownedHidenItems: boolean[] = [];
    public ownedHiddenCoins: boolean[] = [];
}
