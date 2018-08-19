import { SaveFileService } from './../../savefile.service';

export class SpriteData {
    // Load data all sprites on the map have
    constructor(savefile: SaveFileService, index: number) {

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

        // Init missable index to non-player value
        this.missableIndex = -1;

        // Correct this index
        // Non-Player Data starts zero-based exlcuding the first sprite
        // (The Player)
        index -= 1;

        let offsetCtr = (2 * index) + 0x2790;
        this.rangeDirByte = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.textID = savefile.getByte(offsetCtr); offsetCtr += 1;

        offsetCtr = (2 * index) + 0x27B0;
        this.trainerClassOrItemID = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.trainerSetID = savefile.getByte(offsetCtr);
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
            this.missableIndex = mIndex;
        }
    }

    public static get emptyPlayerData() {
        return {
            pictureID: 0,
            movementStatus: 0,
            imageIndex: 0,
            yStepVector: 0,
            yPixels: 0,
            xStepVector: 0,
            xPixels: 0,
            intraAnimationFrameCounter: 0,
            animFrameCounter: 0,
            faceDir: 0,
            walkAnimationCounter: 0,
            yDisp: 0,
            xDisp: 0,
            mapY: 0,
            mapX: 0,
            movementByte: 0,
            grassPriority: 0,
            movementDelay: 0,
            imageBaseOffset: 0,
            rangeDirByte: null,
            textID: null,
            trainerClassOrItemID: null,
            trainerSetID: null,
            missableIndex: null
        }
    }

    public static get emptyNonPlayerData() {
        return {
            pictureID: 0,
            movementStatus: 0,
            imageIndex: 0,
            yStepVector: 0,
            yPixels: 0,
            xStepVector: 0,
            xPixels: 0,
            intraAnimationFrameCounter: 0,
            animFrameCounter: 0,
            faceDir: 0,
            walkAnimationCounter: 0,
            yDisp: 0,
            xDisp: 0,
            mapY: 0,
            mapX: 0,
            movementByte: 0,
            grassPriority: 0,
            movementDelay: 0,
            imageBaseOffset: 0,
            rangeDirByte: 0,
            textID: 0,
            trainerClassOrItemID: 0,
            trainerSetID: 0,
            missableIndex: -1
        }
    }

    /**
     * Sprite data that applies to all sprites
     */

    // Actual sprite image shown
    public pictureID: number;

    // (0: uninitialized, 1: ready, 2: delayed, 3: moving)
    public movementStatus: number;

    // Basically, in the sprite sheet strip, which "pane" or "tile" is it at
    // 0xFF if not on the screen
    public imageIndex: number;

    // When the sprite moves, exactly how far or how much is that?
    //(-1, 0 or 1)
    public yStepVector: number;

    // Screen position in pixels aligned to 4 pixels offset from the grid (To appear centered)
    public yPixels: number;

    // When the sprite moves, exactly how far or how much is that?
    //(-1, 0 or 1)
    public xStepVector: number;

    // Screen position in pixels aligned to 4 pixels offset from the grid (To appear centered)
    public xPixels: number;

    // Counter that helps delay between animation frames so things aren't so instant and fast
    public intraAnimationFrameCounter: number;

    // Animation frame counter
    public animFrameCounter: number;

    // (0: down, 4: up, 8: left, $c: right)
    public faceDir: number;

    // Tracks movement & wandering, sprites are given 0x10 and it's decremented
    public walkAnimationCounter: number;

    // Keep sprites from wandering too far however it's noted that it's bugged
    // to begin with. Both are init to 0x8
    public yDisp: number;
    public xDisp: number;

    // Placement in 2x2 grid steps
    // Origin (Top or Left) has a value of 4
    public mapY: number;
    public mapX: number;

    // (0xFF not moving, 0xFE random movements, others unknown)
    public movementByte: number;

    // (0x80 in grass, 0x00 otherwise) - Prioritizing grass drawn around sprite
    public grassPriority: number;

    // Delay until next movement, counts downward and flags movementStatus ready
    // once reached
    public movementDelay: number;

    // Used to help compute imageIndex based on vram
    public imageBaseOffset: number;

    /**
     * Sprite data that applies to all non-player sprites
     * (All sprites that aren't sprite #0)
     */

    // How far a walking sprite can wander, or if still the facing direction
    // A walking sprite having a value of 0 faces all directions
    public rangeDirByte: number | null = null;

    // Text id when this sprite is interacted with
    public textID: number | null = null;

    // If this is an item sprite, the item id, otherwise the trainer class
    public trainerClassOrItemID: null | number = null;

    // Trainer data id
    public trainerSetID: null | number = null;

    /**
     * Sprite data that applies to all non-player missable sprites
     * (All sprites that aren't sprite #0 and have an associated index in the
     * global missable list which determine if it's rendered or not)
     */
    // If this is not null, then this sprite is a missable and it's appearance
    // is determined by the flag in the global missable index this points to
    public missableIndex: null | number = null;
}
