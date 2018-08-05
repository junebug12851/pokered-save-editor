import { SaveFileService } from './../../savefile.service';

export class SpriteDataExtended {
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
    }

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
}