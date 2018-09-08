import { SaveFileService } from './../../../savefile.service';

export class AreaPlayer {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.yCoord = saveFile.getByte(0x260D);
        this.xCoord = saveFile.getByte(0x260E);
        this.yBlockCoord = saveFile.getByte(0x260F);
        this.xBlockCoord = saveFile.getByte(0x2610);
        this.yOffsetSinceLastSpecialWarp = saveFile.getByte(0x278E);
        this.xOffsetSinceLastSpecialWarp = saveFile.getByte(0x278F);
        this.playerMoveDir = saveFile.getByte(0x27D4);
        this.playerLastStopDir = saveFile.getByte(0x27D5);
        this.playerCurDir = saveFile.getByte(0x27D6);
        this.walkBikeSurf = saveFile.getByte(0x29AC);
        this.safariSteps = saveFile.getWord(0x29B9);
        this.playerJumpingYScrnCoords = saveFile.getByte(0x29C0);
        this.strengthOutsideBattle = saveFile.getBit(0x29D4, 1, 0);
        this.surfingAllowed = saveFile.getBit(0x29D4, 1, 1);
        this.usedCardKey = saveFile.getBit(0x29D4, 1, 7);
        this.isBattle = saveFile.getBit(0x29D9, 1, 6);
        this.isTrainerBattle = saveFile.getBit(0x29D9, 1, 7);
        this.noBattles = saveFile.getBit(0x29DA, 1, 4);
        this.battleEndedOrBlackout = saveFile.getBit(0x29DA, 1, 5);
        this.usingLinkCable = saveFile.getBit(0x29DA, 1, 6);
        this.flyOutofBattle = saveFile.getBit(0x29DF, 1, 7);
        this.standingOnDoor = saveFile.getBit(0x29E2, 1, 0);
        this.movingThroughDoor = saveFile.getBit(0x29E2, 1, 1);
        this.standingOnWarp = saveFile.getBit(0x29E2, 1, 2);
        this.finalLedgeJumping = saveFile.getBit(0x29E2, 1, 6);
        this.spinPlayer = saveFile.getBit(0x29E2, 1, 7);
        this.safariGameOver = saveFile.getByte(0x2CF2) == 1;
        this.safariBallCount = saveFile.getByte(0x2CF3);
    }

    public save(saveFile: SaveFileService) {
        saveFile.setByte(0x260D, this.yCoord);
        saveFile.setByte(0x260E, this.xCoord);
        saveFile.setByte(0x260F, this.yBlockCoord);
        saveFile.setByte(0x2610, this.xBlockCoord);
        saveFile.setByte(0x278E, this.yOffsetSinceLastSpecialWarp);
        saveFile.setByte(0x278F, this.xOffsetSinceLastSpecialWarp);
        saveFile.setByte(0x27D4, this.playerMoveDir);
        saveFile.setByte(0x27D5, this.playerLastStopDir);
        saveFile.setByte(0x27D6, this.playerCurDir);
        saveFile.setByte(0x29AC, this.walkBikeSurf);
        saveFile.setWord(0x29B9, this.safariSteps);
        saveFile.setByte(0x29C0, this.playerJumpingYScrnCoords);
        saveFile.setBit(0x29D4, 1, 0, this.strengthOutsideBattle);
        saveFile.setBit(0x29D4, 1, 1, this.surfingAllowed);
        saveFile.setBit(0x29D4, 1, 7, this.usedCardKey);
        saveFile.setBit(0x29D9, 1, 6, this.isBattle);
        saveFile.setBit(0x29D9, 1, 7, this.isTrainerBattle);
        saveFile.setBit(0x29DA, 1, 4, this.noBattles);
        saveFile.setBit(0x29DA, 1, 5, this.battleEndedOrBlackout);
        saveFile.setBit(0x29DA, 1, 6, this.usingLinkCable);
        saveFile.setBit(0x29DF, 1, 7, this.flyOutofBattle);
        saveFile.setBit(0x29E2, 1, 0, this.standingOnDoor);
        saveFile.setBit(0x29E2, 1, 1, this.movingThroughDoor);
        saveFile.setBit(0x29E2, 1, 2, this.standingOnWarp);
        saveFile.setBit(0x29E2, 1, 6, this.finalLedgeJumping);
        saveFile.setBit(0x29E2, 1, 7, this.spinPlayer);
        saveFile.setByte(0x2CF2, (this.safariGameOver) ? 1 : 0);
        saveFile.setByte(0x2CF3, this.safariBallCount);
    }

    /**
    * Player (Complete)
   */

    // Direction
    // if the player is moving, the current direction
    // if the player is not moving, zero
    // None     0
    // Right    1
    // Left     2
    // Down     4
    // Up       8
    public playerMoveDir: number = 0;

    // the direction in which the player was moving before the player last stopped
    public playerLastStopDir: number = 0;

    // if the player is moving, the current direction
    // if the player is not moving, the last the direction in which the player moved
    public playerCurDir: number = 0;

    // Coords
    public yCoord: number = 0;
    public xCoord: number = 0;
    public yBlockCoord: number = 0;
    public xBlockCoord: number = 0;
    public playerJumpingYScrnCoords: number = 0;

    // Safari
    public safariGameOver: boolean = false;
    public safariBallCount: number = 0;
    public safariSteps: number = 0;

    // HMs
    public strengthOutsideBattle: boolean = false;
    public surfingAllowed: boolean = false;
    public flyOutofBattle: boolean = false;

    // Battle
    public isBattle: boolean = false;
    public isTrainerBattle: boolean = false;
    public noBattles: boolean = false;
    public battleEndedOrBlackout: boolean = false;

    // Warps
    public yOffsetSinceLastSpecialWarp: number = 0;
    public xOffsetSinceLastSpecialWarp: number = 0;
    public standingOnDoor: boolean = false;
    public movingThroughDoor: boolean = false;
    public standingOnWarp: boolean = false;

    // Misc

    // 0x00 = walking
    // 0x01 = biking
    // 0x02 = surfing
    public walkBikeSurf: number = 0;
    public finalLedgeJumping: boolean = false;
    public spinPlayer: boolean = false;
    public usedCardKey: boolean = false;
    public usingLinkCable: boolean = false;
}
