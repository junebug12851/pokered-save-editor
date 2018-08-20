import { MapConnData } from './../fragments/MapConnData';
import { SignData } from '../fragments/SignData';
import { WarpData } from '../fragments/WarpData';
import { SpriteData } from '../fragments/SpriteData';
import { SaveFileService } from '../../savefile.service';

export class Area {
    constructor(saveFile: SaveFileService) {
        const musicID = saveFile.getHex(0x2607, 0x1).padStart(2, "0").toUpperCase();
        const musicBank = saveFile.getHex(0x2608, 0x1).padStart(2, "0").toUpperCase();

        this.music = `${musicBank}_${musicID}`;

        const curTileset = saveFile.getHex(0x2613, 0x1).padStart(2, "0").toUpperCase();
        const tilesetBank = saveFile.getHex(0x27D7, 0x1).padStart(2, "0").toUpperCase();

        const tilesetBlockPtr = saveFile.getWord(0x27D8, true).toString(16).padStart(4, "0").toUpperCase();
        const tilesetGfxPtr = saveFile.getWord(0x27DA, true).toString(16).padStart(4, "0").toUpperCase();
        const tilesetCollPtr = saveFile.getWord(0x27DC, true).toString(16).padStart(4, "0").toUpperCase();

        this.tileset = `${tilesetBank}_${curTileset}_${tilesetGfxPtr}_${tilesetBlockPtr}_${tilesetCollPtr}`;

        // Get total sprite count and increment by 1 to include player
        const spriteCount = saveFile.getByte(0x278D) + 1;
        this.spriteData = [];
        for (let i = 0; i < spriteCount && i < 16; i++) {
            this.spriteData.push(new SpriteData(saveFile, i));
        }

        this.contrast = saveFile.getByte(0x2609);
        this.curMap = saveFile.getByte(0x260A);
        this.currentTileBlockMapViewPointer = saveFile.getWord(0x260B);
        this.yCoord = saveFile.getByte(0x260D);
        this.xCoord = saveFile.getByte(0x260E);
        this.yBlockCoord = saveFile.getByte(0x260F);
        this.xBlockCoord = saveFile.getByte(0x2610);
        this.mapHeight = saveFile.getByte(0x2614);
        this.mapWidth = saveFile.getByte(0x2615);
        this.mapDataPtr = saveFile.getWord(0x2616);
        this.mapTextPtr = saveFile.getWord(0x2618);
        this.mapScriptPtr = saveFile.getWord(0x261A);

        this.mapConn = {
            east: saveFile.getBit(0x261C, 1, 0),
            west: saveFile.getBit(0x261C, 1, 1),
            south: saveFile.getBit(0x261C, 1, 2),
            north: saveFile.getBit(0x261C, 1, 3),
        };

        this.mapConnData = {
            north: new MapConnData(saveFile, 0x261D),
            south: new MapConnData(saveFile, 0x2628),
            west: new MapConnData(saveFile, 0x2633),
            east: new MapConnData(saveFile, 0x263E),
        };

        this.spriteSet = saveFile.getRange(0x2649, 0xB);
        this.spriteSetId = saveFile.getByte(0x2654);
        this.outOfBoundsTile = saveFile.getHex(0x2659, 0x1).padStart(2, "0").toUpperCase();

        this.warpData = [];
        for (let i = 0; i < saveFile.getByte(0x265A) && i < 32; i++) {
            this.warpData.push(new WarpData(saveFile, i));
        }
        this.warpDest = saveFile.getByte(0x26DB);

        this.signData = [];
        for (let i = 0; i < saveFile.getByte(0x275C) && i < 16; i++) {
            this.signData.push(new SignData(saveFile, i));
        }

        this.yOffsetSinceLastSpecialWarp = saveFile.getByte(0x278E);
        this.xOffsetSinceLastSpecialWarp = saveFile.getByte(0x278F);
        this.map2x2Height = saveFile.getByte(0x27D0);
        this.map2x2Width = saveFile.getByte(0x27D1);
        this.mapViewVRAMPointer = saveFile.getWord(0x27D2);
        this.playerMoveDir = saveFile.getByte(0x27D4);
        this.playerLastStopDir = saveFile.getByte(0x27D5);
        this.playerCurDir = saveFile.getByte(0x27D6);
        const tilesetTalkingOverTiles = saveFile.getRange(0x27DE, 0x3);
        this.tilesetTalkingOverTiles = [
            tilesetTalkingOverTiles[0].toString(16).padStart(2, "0").toUpperCase(),
            tilesetTalkingOverTiles[1].toString(16).padStart(2, "0").toUpperCase(),
            tilesetTalkingOverTiles[2].toString(16).padStart(2, "0").toUpperCase(),
        ];
        this.tilesetGrassTile = saveFile.getByte(0x27E1).toString(16).padStart(2, "0").toUpperCase();

        this.walkBikeSurf = saveFile.getByte(0x29AC);
        this.safariSteps = saveFile.getWord(0x29B9);
        this.playerJumpingYScrnCoords = saveFile.getByte(0x29C0);
        this.boulderSpriteIndex = saveFile.getByte(0x29C4);
        this.tileFrontBoulderColl = saveFile.getByte(0x29C8).toString(16).padStart(2, "0").toUpperCase();
        this.dungeonWarpDestMap = saveFile.getByte(0x29C9);
        this.specialWarpDestMap = saveFile.getByte(0x29C6);
        this.whichDungeonWarp = saveFile.getByte(0x29CA);

        this.strengthOutsideBattle = saveFile.getBit(0x29D4, 1, 0);
        this.surfingAllowed = saveFile.getBit(0x29D4, 1, 1);
        this.usedCardKey = saveFile.getBit(0x29D4, 1, 7);
        this.pauseWildEncounters3Steps = saveFile.getBit(0x29D8, 1, 0);
        this.noAudioFadeout = saveFile.getBit(0x29D8, 1, 1);
        this.tradeCenterSpritesFaced = saveFile.getBit(0x29D9, 1, 0);
        this.scriptedWarp = saveFile.getBit(0x29D9, 1, 3);
        this.isDungeonWarp = saveFile.getBit(0x29D9, 1, 4);
        this.npcsFaceAway = saveFile.getBit(0x29D9, 1, 5);
        this.isBattle = saveFile.getBit(0x29D9, 1, 6);
        this.isTrainerBattle = saveFile.getBit(0x29D9, 1, 7);
        this.noBattles = saveFile.getBit(0x29DA, 1, 4);
        this.battleEndedOrBlackout = saveFile.getBit(0x29DA, 1, 5);
        this.usingLinkCable = saveFile.getBit(0x29DA, 1, 6);
        this.scriptedNPCMovement = saveFile.getBit(0x29DA, 1, 7);
        this.npcSpriteMovement = saveFile.getBit(0x29DC, 1, 0);
        this.ignoreJoypad = saveFile.getBit(0x29DC, 1, 5);
        this.noLetterDelay = saveFile.getBit(0x29DC, 1, 6);
        this.joypadSimulation = saveFile.getBit(0x29DC, 1, 7);
        this.countPlaytime = saveFile.getBit(0x29DE, 1, 0);
        this.flyOrDungeonWarp = saveFile.getBit(0x29DE, 1, 2);
        this.flyWarp = saveFile.getBit(0x29DE, 1, 3);
        this.dungeonWarp = saveFile.getBit(0x29DE, 1, 4);
        this.forceBikeRide = saveFile.getBit(0x29DE, 1, 5);
        this.blackoutDest = saveFile.getBit(0x29DE, 1, 6);
        this.runningTestBattle = saveFile.getBit(0x29DF, 1, 0);
        this.preventMusicChange = saveFile.getBit(0x29DF, 1, 1);
        this.skipJoypadCheckWarps = saveFile.getBit(0x29DF, 1, 2);
        this.trainerWantsBattle = saveFile.getBit(0x29DF, 1, 3);
        this.curMapNextFrame = saveFile.getBit(0x29DF, 1, 4);
        this.flyOutofBattle = saveFile.getBit(0x29DF, 1, 7);
        this.standingOnDoor = saveFile.getBit(0x29E2, 1, 0);
        this.movingThroughDoor = saveFile.getBit(0x29E2, 1, 1);
        this.standingOnWarp = saveFile.getBit(0x29E2, 1, 2);
        this.finalLedgeJumping = saveFile.getBit(0x29E2, 1, 6);
        this.spinPlayer = saveFile.getBit(0x29E2, 1, 7);

        this.warpedFromWarp = saveFile.getByte(0x29E7);
        this.warpedfromMap = saveFile.getByte(0x29E8);

        this.cardKeyDoorY = saveFile.getByte(0x29EB);
        this.cardKeyDoorX = saveFile.getByte(0x29EC);
        this.firstTrashcanLock = saveFile.getByte(0x29EF);
        this.secondTrashcanLock = saveFile.getByte(0x29F0);
        this.grassRate = saveFile.getByte(0x2B33);
        this.grassPokemon = saveFile.getRange(0x2B34, 20);
        this.waterPokemonRate = saveFile.getByte(0x2B50);
        this.waterPokemon = saveFile.getRange(0x2B51, 20);

        this.trainerHeaderPtr = saveFile.getWord(0x2CDC);
        this.oppAfterWrongAnsw = saveFile.getByte(0x2CE4);
        this.curMapScript = saveFile.getByte(0x2CE5);
        this.safariGameOver = saveFile.getByte(0x2CF2);
        this.safariBallCount = saveFile.getByte(0x2CF3);

        this.tilesetType = saveFile.getByte(0x3522).toString(16).padStart(2, "0").toUpperCase();
    }

    // General (Complete)
    public contrast: number;
    public noLetterDelay: boolean;
    public countPlaytime: boolean;

    // Audio (Complete)
    public music: string;
    public noAudioFadeout: boolean;
    public preventMusicChange: boolean;

    // Tileset (Complete)
    public tileset: string;
    public outOfBoundsTile: string;
    public tilesetTalkingOverTiles: string[];
    public tilesetGrassTile: string;
    public boulderSpriteIndex: number;
    public tileFrontBoulderColl: string;
    public tilesetType: string;

    // Cached Sprites (Complete)
    public spriteSet: Uint8Array;
    public spriteSetId: number;

    // Sprites (Complete)
    public spriteData: SpriteData[];
    public tradeCenterSpritesFaced: boolean;

    /**
     * Warps
     */
    // Pre-Warp
    public scriptedWarp: boolean; // Do a scripted warp
    public isDungeonWarp: boolean; // On a dungeon warp
    public skipJoypadCheckWarps: boolean; // Skips check for warp after not collided (Forced Warp)??

    // Warping
    public warpDest: number; // Warp actively warping to or 0xFF to warp to same position
    public dungeonWarpDestMap: number; // Destination Map for dungeon warps
    public specialWarpDestMap: number; // Destination Map for special warps
    public flyOrDungeonWarp: boolean; // Is a fly or dungeon warp
    public flyWarp: boolean; // Is a fly warp
    public dungeonWarp: boolean; // Is a dungeon warp

    // Warped
    public whichDungeonWarp: number; // Warped from which dungeon warp
    public warpedFromWarp: number; // Warped from which warp
    public warpedfromMap: number; // Warped from which map

    // Warp Points
    public warpData: WarpData[]; // Warp entries

    // Signs
    public signData: SignData[];

    // Player
    public playerMoveDir: number;
    public playerLastStopDir: number;
    public playerCurDir: number;
    public yCoord: number;
    public xCoord: number;
    public yBlockCoord: number;
    public xBlockCoord: number;
    public yOffsetSinceLastSpecialWarp: number;
    public xOffsetSinceLastSpecialWarp: number;
    public walkBikeSurf: number;
    public safariSteps: number;
    public playerJumpingYScrnCoords: number;
    public strengthOutsideBattle: boolean;
    public surfingAllowed: boolean;
    public usedCardKey: boolean;
    public isBattle: boolean;
    public isTrainerBattle: boolean;
    public noBattles: boolean;
    public battleEndedOrBlackout: boolean;
    public usingLinkCable: boolean;
    public flyOutofBattle: boolean;
    public standingOnDoor: boolean;
    public movingThroughDoor: boolean;
    public standingOnWarp: boolean;
    public finalLedgeJumping: boolean;
    public spinPlayer: boolean;
    public safariGameOver: number;
    public safariBallCount: number;

    // Map
    public curMap: number;
    public currentTileBlockMapViewPointer: number;
    public mapHeight: number;
    public mapWidth: number;
    public mapDataPtr: number;
    public mapTextPtr: number;
    public mapScriptPtr: number;
    public mapConn: {
        east: boolean,
        west: boolean,
        south: boolean,
        north: boolean,
    };
    public mapConnData: {
        north: MapConnData,
        south: MapConnData,
        west: MapConnData,
        east: MapConnData,
    };
    public map2x2Height: number;
    public map2x2Width: number;
    public mapViewVRAMPointer: number;
    public forceBikeRide: boolean;
    public blackoutDest: boolean;
    public curMapNextFrame: boolean;
    public cardKeyDoorY: number;
    public cardKeyDoorX: number;
    public curMapScript: number;

    // NPC
    public npcsFaceAway: boolean;
    public scriptedNPCMovement: boolean;
    public npcSpriteMovement: boolean;
    public ignoreJoypad: boolean;
    public joypadSimulation: boolean;
    public runningTestBattle: boolean;
    public trainerWantsBattle: boolean;
    public trainerHeaderPtr: number;

    // Pokemon
    public grassRate: number;
    public grassPokemon: Uint8Array;
    public waterPokemonRate: number;
    public waterPokemon: Uint8Array;
    public pauseWildEncounters3Steps: boolean;

    // Puzzle
    public firstTrashcanLock: number;
    public secondTrashcanLock: number;
    public oppAfterWrongAnsw: number;
}
