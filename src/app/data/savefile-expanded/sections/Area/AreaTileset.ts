import { SaveFileService } from './../../../savefile.service';

export class AreaTileset {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        const curTileset = saveFile.getHex(0x2613, 0x1).padStart(2, "0").toUpperCase();
        const tilesetBank = saveFile.getHex(0x27D7, 0x1).padStart(2, "0").toUpperCase();

        const tilesetBlockPtr = saveFile.getWord(0x27D8, true).toString(16).padStart(4, "0").toUpperCase();
        const tilesetGfxPtr = saveFile.getWord(0x27DA, true).toString(16).padStart(4, "0").toUpperCase();
        const tilesetCollPtr = saveFile.getWord(0x27DC, true).toString(16).padStart(4, "0").toUpperCase();

        this.tileset = `${tilesetBank}_${curTileset}_${tilesetGfxPtr}_${tilesetBlockPtr}_${tilesetCollPtr}`;

        this.outOfBoundsTile = saveFile.getHex(0x2659, 0x1).padStart(2, "0").toUpperCase();

        const tilesetTalkingOverTiles = saveFile.getRange(0x27DE, 0x3);
        this.tilesetTalkingOverTiles = [
            tilesetTalkingOverTiles[0].toString(16).padStart(2, "0").toUpperCase(),
            tilesetTalkingOverTiles[1].toString(16).padStart(2, "0").toUpperCase(),
            tilesetTalkingOverTiles[2].toString(16).padStart(2, "0").toUpperCase(),
        ];
        this.tilesetGrassTile = saveFile.getByte(0x27E1).toString(16).padStart(2, "0").toUpperCase();
        this.boulderSpriteIndex = saveFile.getByte(0x29C4);
        this.tileFrontBoulderColl = saveFile.getByte(0x29C8).toString(16).padStart(2, "0").toUpperCase();

        this.tilesetType = saveFile.getByte(0x3522).toString(16).padStart(2, "0").toUpperCase();
    }

    public save(saveFile: SaveFileService) {
        const tilesetArr = this.tileset.split("_");
        saveFile.setHex(0x2613, 0x1, tilesetArr[1]); // curTileset
        saveFile.setHex(0x27D7, 0x1, tilesetArr[0]); // tilesetBank
        saveFile.setHex(0x27D8, 0x2, tilesetArr[3], false, true); // tilesetBlockPtr
        saveFile.setHex(0x27DA, 0x2, tilesetArr[2], false, true); // tilesetGfxPtr
        saveFile.setHex(0x27DC, 0x2, tilesetArr[4], false, true); // tilesetCollPtr

        saveFile.setHex(0x2659, 0x1, this.outOfBoundsTile);

        saveFile.setHex(0x27DE, 0x1, this.tilesetTalkingOverTiles[0]);
        saveFile.setHex(0x27DF, 0x1, this.tilesetTalkingOverTiles[1]);
        saveFile.setHex(0x27E0, 0x1, this.tilesetTalkingOverTiles[2]);

        saveFile.setHex(0x27E1, 0x1, this.tilesetGrassTile);
        saveFile.setByte(0x29C4, this.boulderSpriteIndex);
        saveFile.setHex(0x29C8, 0x1, this.tileFrontBoulderColl);
        saveFile.setHex(0x3522, 0x1, this.tilesetType);
    }

    // Tileset (Complete)
    public tileset: string = "00_00_0000_0000_0000";
    public outOfBoundsTile: string = "00";
    public tilesetTalkingOverTiles: string[] = [];
    public tilesetGrassTile: string = "00";
    public boulderSpriteIndex: number = 0;
    public tileFrontBoulderColl: string = "00";
    public tilesetType: string = "00";
}
