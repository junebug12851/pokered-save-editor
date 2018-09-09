import { SpriteData } from './../../fragments/SpriteData';
import { SaveFileService } from './../../../savefile.service';

export class AreaSprites {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        // Get total sprite count and increment by 1 to include player
        const spriteCount = saveFile.getByte(0x278D) + 1;
        this.spriteData = [];
        for (let i = 0; i < spriteCount && i < 16; i++) {
            this.spriteData.push(new SpriteData(saveFile, i));
        }
    }

    public save(saveFile: SaveFileService) {
        // Save sprite count
        // Subtract 1 to exclude player sprite
        saveFile.setByte(0x278D, this.spriteData.length - 1);

        // Re-save sprite data
        for (let i = 0; i < this.spriteData.length && i < 16; i++) {
            this.spriteData[i].save(saveFile, i);
        }

        // Save missables
        SpriteData.saveMissables(saveFile, this.spriteData);
    }

    // Sprites (Complete)
    // Default to empty player sprite only
    public spriteData: SpriteData[] = [
        new SpriteData(false)
    ];
}
