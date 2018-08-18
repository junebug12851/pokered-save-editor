import { SaveFileService } from './../../savefile.service';

export class SpriteData {
    // Load data all sprites on the map have
    constructor(savefile: SaveFileService, index: number) {

        // Save this sprite id offset by player
        // player will be -1 and
        // all sprites afterwards will be non-player sprites
        this.id = index - 1;

        let offsetCtr = (0x10 * index) + 0x2D2C;
        this.pictureID = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.movementStatus = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.imageIndex = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.yStepVector = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.yPixels = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.xStepVector = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.xPixels = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.intraAnimationFrameCounter = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.animFrameCounter = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.faceDir = savefile.getByte(offsetCtr); offsetCtr += 1;

        offsetCtr = (0x10 * index) + 0x2E2C;
        this.walkAnimationCounter = savefile.getByte(offsetCtr); offsetCtr += 1;
        offsetCtr += 1; // Padding
        this.yDisp = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.xDisp = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.mapY = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.mapX = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.movementByte = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.grassPriority = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.movementDelay = savefile.getByte(offsetCtr); offsetCtr += 1;
        offsetCtr += 5; // Padding
        this.imageBaseOffset = savefile.getByte(offsetCtr); offsetCtr += 1;

        // If this isn't the player sprite then load additional non-player data
        // and check to see if it's missable
        if (index > 0) {
            this.loadNpData(savefile, index);
            this.checkMissable(savefile, index);
        }
    }

    // Load data all sprites but the player (Non-Player Data) have
    loadNpData(savefile: SaveFileService, index: number) {

        // Correct this index
        // Non-Player Data starts zero-based exlcuding the first sprite
        // (The Player)
        index -= 1;

        let offsetCtr = (2 * index) + 0x2790;
        this.npData.movementByte = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.npData.textID = savefile.getByte(offsetCtr); offsetCtr += 1;

        offsetCtr = (2 * index) + 0x27B0;
        this.npData.trainerClassOrItemID = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.npData.trainerSetID = savefile.getByte(offsetCtr);
    }

    // Scan missable list to see if this sprite is in it
    // If a match is found load missable data making this sprite a missable
    // sprite and therefore have it's appearance controlled by the global
    // missable flags
    checkMissable(saveFile: SaveFileService, index: number) {

        // Don't correct this index
        // Missables start at index 1, not 0

        for (let i = 0; i < 17; i++) {
            const offset = (0x2 * i) + 0x287A;
            const mId = saveFile.getByte(offset);
            const mIndex = saveFile.getByte(offset + 1);

            // Stop when reach list terminator
            if (mId == 0xFF)
                break;

            // Skip if the id doesn't match this sprite
            if (mId !== index)
                continue;

            // Save bit index this missable refers to and add to missable
            // array for quick reference
            this.missable.index = mIndex;
            SpriteData.missableList.push(this);
        }
    }

    // All sprites contain this data
    public id: number;

    public pictureID: number;
    public movementStatus: number;
    public imageIndex: number;
    public yStepVector: number;
    public yPixels: number;
    public xStepVector: number;
    public xPixels: number;
    public intraAnimationFrameCounter: number;
    public animFrameCounter: number;
    public faceDir: number;

    public walkAnimationCounter: number;
    public yDisp: number;
    public xDisp: number;
    public mapY: number;
    public mapX: number;
    public movementByte: number;
    public grassPriority: number;
    public movementDelay: number;
    public imageBaseOffset: number;

    // If sprite is not sprite 0, the player sprite, this data applies as well
    public npData = {
        movementByte: null as number | null,
        textID: null as number | null,
        trainerClassOrItemID: null as number | null,
        trainerSetID: null as number | null,
    };

    public missable = {
        index: null as number | null,
    }

    // Local copy
    public _missableList = SpriteData.missableList;

    // Special variable to hold missable list data in the corect order
    public static missableList: SpriteData[] = [];
}
