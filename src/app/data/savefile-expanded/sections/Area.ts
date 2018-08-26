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

        const curMap = saveFile.getByte(0x260A).toString(16).padStart(2, "0").toUpperCase();
        const mapHeight = saveFile.getByte(0x2614).toString().padStart(2, "0");
        const mapWidth = saveFile.getByte(0x2615).toString().padStart(2, "0");
        const mapDataPtr = saveFile.getWord(0x2616, true).toString(16).padStart(4, "0").toUpperCase();
        const mapTextPtr = saveFile.getWord(0x2618, true).toString(16).padStart(4, "0").toUpperCase();
        const mapScriptPtr = saveFile.getWord(0x261A, true).toString(16).padStart(4, "0").toUpperCase();
        const map2x2Height = saveFile.getByte(0x27D0).toString().padStart(2, "0");
        const map2x2Width = saveFile.getByte(0x27D1).toString().padStart(2, "0");

        this.curMap = `${curMap}_${mapHeight}_${mapWidth}_${map2x2Height}_${map2x2Width}_${mapDataPtr}_${mapTextPtr}_${mapScriptPtr}`;

        this.contrast = saveFile.getByte(0x2609);
        this.currentTileBlockMapViewPointer = saveFile.getWord(0x260B, true).toString(16).padStart(2, "0").toUpperCase();
        this.yCoord = saveFile.getByte(0x260D);
        this.xCoord = saveFile.getByte(0x260E);
        this.yBlockCoord = saveFile.getByte(0x260F);
        this.xBlockCoord = saveFile.getByte(0x2610);

        this.mapConn = {
            east: saveFile.getBit(0x261C, 1, 0),
            west: saveFile.getBit(0x261C, 1, 1),
            south: saveFile.getBit(0x261C, 1, 2),
            north: saveFile.getBit(0x261C, 1, 3),
        };

        // @ts-ignore
        this.mapConnData = {};

        if (this.mapConn.north)
            this.mapConnData.north = new MapConnData(saveFile, 0x261D);
        else
            // @ts-ignore
            this.mapConnData.north = MapConnData.empty;

        if (this.mapConn.south)
            this.mapConnData.south = new MapConnData(saveFile, 0x2628);
        else
            // @ts-ignore
            this.mapConnData.south = MapConnData.empty;

        if (this.mapConn.west)
            this.mapConnData.west = new MapConnData(saveFile, 0x2633);
        else
            // @ts-ignore
            this.mapConnData.west = MapConnData.empty;

        if (this.mapConn.east)
            this.mapConnData.east = new MapConnData(saveFile, 0x263E);
        else
            // @ts-ignore
            this.mapConnData.east = MapConnData.empty;

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
        this.mapViewVRAMPointer = saveFile.getWord(0x27D2, true).toString(16).padStart(2, "0").toUpperCase();
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
        this.safariGameOver = saveFile.getByte(0x2CF2) == 1;
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
     * Warps (Complete)
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
    public playerMoveDir: number;

    // the direction in which the player was moving before the player last stopped
    public playerLastStopDir: number;

    // if the player is moving, the current direction
    // if the player is not moving, the last the direction in which the player moved
    public playerCurDir: number;

    // Coords
    public yCoord: number;
    public xCoord: number;
    public yBlockCoord: number;
    public xBlockCoord: number;
    public playerJumpingYScrnCoords: number;

    // Safari
    public safariGameOver: boolean;
    public safariBallCount: number;
    public safariSteps: number;

    // HMs
    public strengthOutsideBattle: boolean;
    public surfingAllowed: boolean;
    public flyOutofBattle: boolean;

    // Battle
    public isBattle: boolean;
    public isTrainerBattle: boolean;
    public noBattles: boolean;
    public battleEndedOrBlackout: boolean;

    // Warps
    public yOffsetSinceLastSpecialWarp: number;
    public xOffsetSinceLastSpecialWarp: number;
    public standingOnDoor: boolean;
    public movingThroughDoor: boolean;
    public standingOnWarp: boolean;

    // Misc

    // 0x00 = walking
    // 0x01 = biking
    // 0x02 = surfing
    public walkBikeSurf: number;
    public finalLedgeJumping: boolean;
    public spinPlayer: boolean;
    public usedCardKey: boolean;
    public usingLinkCable: boolean;

    /**
     * Map
     */

    // Area In
    public curMap: string;

    // pointer to the upper left corner of the current view in the tile block map
    public currentTileBlockMapViewPointer: string;

    // the address of the upper left corner of the visible portion of the BG tile map in VRAM
    public mapViewVRAMPointer: string;

    // index of current map script, mostly used as index for function pointer array
    // mostly copied from map - specific map script pointer and written back later
    public curMapScript: number;

    // use variable "Current Map Script" instead of the index for next frame's
    // map script
    public curMapNextFrame: boolean;

    // Area Around
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

    // Misc
    public forceBikeRide: boolean;

    // Map destination is last blackout map
    public blackoutDest: boolean;
    public cardKeyDoorY: number;
    public cardKeyDoorX: number;

    /**
     * NPC
     */
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
