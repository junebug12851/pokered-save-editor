import { SaveFileService } from './../../../savefile.service';

export class AreaNPC {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.tradeCenterSpritesFaced = saveFile.getBit(0x29D9, 1, 0);
        this.npcsFaceAway = saveFile.getBit(0x29D9, 1, 5);
        this.scriptedNPCMovement = saveFile.getBit(0x29DA, 1, 7);
        this.npcSpriteMovement = saveFile.getBit(0x29DC, 1, 0);
        this.ignoreJoypad = saveFile.getBit(0x29DC, 1, 5);
        this.joypadSimulation = saveFile.getBit(0x29DC, 1, 7);
        this.runningTestBattle = saveFile.getBit(0x29DF, 1, 0);
        this.trainerWantsBattle = saveFile.getBit(0x29DF, 1, 3);
        this.trainerHeaderPtr = saveFile.getHex(0x2CDC, 0x2, false, true);
    }

    public save(saveFile: SaveFileService) {
        saveFile.setBit(0x29D9, 1, 0, this.tradeCenterSpritesFaced);
        saveFile.setBit(0x29D9, 1, 5, this.npcsFaceAway);
        saveFile.setBit(0x29DA, 1, 7, this.scriptedNPCMovement);
        saveFile.setBit(0x29DC, 1, 0, this.npcSpriteMovement);
        saveFile.setBit(0x29DC, 1, 5, this.ignoreJoypad);
        saveFile.setBit(0x29DC, 1, 7, this.joypadSimulation);
        saveFile.setBit(0x29DF, 1, 0, this.runningTestBattle);
        saveFile.setBit(0x29DF, 1, 3, this.trainerWantsBattle);
        saveFile.setHex(0x2CDC, 0x2, this.trainerHeaderPtr, false, true);
    }

    // Sprites
    public npcsFaceAway: boolean = false;
    public scriptedNPCMovement: boolean = false;
    public npcSpriteMovement: boolean = false;
    public tradeCenterSpritesFaced: boolean = false;

    // Controls
    public ignoreJoypad: boolean = false;
    public joypadSimulation: boolean = false;

    // Battle
    public runningTestBattle: boolean = false;
    public trainerWantsBattle: boolean = false;
    public trainerHeaderPtr: string = "0000";
}
