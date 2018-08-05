import { SpriteDataExtended } from '../fragments/spriteDataExt';
import { PokemonParty } from '../fragments/PokemonParty';
import { Missable } from '../fragments/missable';
import { SignData } from '../fragments/signData';
import { WarpData } from '../fragments/WarpData';
import { MapConnData } from '../fragments/mapConnData';
import { SaveFileService } from '../../savefile.service';
import { SpriteData } from '../fragments/spriteData';

export class Area {
    constructor(saveFile: SaveFileService) {
        //
    }

    public musicID: number;
    public musicBank: number;
    public contrast: number;
    public curMap: number;
    public currentTileBlockMapViewPointer: number;
    public yCoord: number;
    public xCoord: number;
    public yBlockCoord: number;
    public xBlockCoord: number;
    public lastMap: number;
    public curTileset: number;
    public mapHeight: number;
    public mapWidth: number;
    public mapDataPtr: number;
    public mapTextPtr: number;
    public mapScriptPtr: number;
    public mapConn: {
        east: false,
        west: false,
        south: false,
        north: false,
    };
    public mapConnData: {
        north: MapConnData,
        south: MapConnData,
        west: MapConnData,
        east: MapConnData,
    };
    public spriteSetIds: number[];
    public spriteSetId: number;
    public outOfBoundsTile: number;
    public warps: WarpData[];
    public warpDest: number;
    public signData: SignData[];
    public spriteData: SpriteData[];
    public yOffsetSinceLastSpecialWarp: number;
    public xOffsetSinceLastSpecialWarp: number;
    public map2x2Height: number;
    public map2x2Width: number;
    public mapViewVRAMPointer: number;
    public playerMoveDir: number;
    public playerLastStopDir: number;
    public playerCurdir: number;
    public tilesetBank: number;
    public tilesetBlockPtr: number;
    public tilesetGfxPtr: number;
    public tilesetCollPtr: number;
    public tilesetTalkingOverTiles: number[];
    public tilesetGrassTiles: number[];

    public missableList: Missable[];
    public walkBikeSurf: number;
    public safariSteps: number;
    public playerJumpingYScrnCoords: number;
    public boulderSpriteIndex: number;
    public tileFrontBoulderColl: number;
    public dungeonWarpDest: number;
    public destinationMap: number;
    public whichDungeonWarp: number;

    public strengthOutsideBattle: boolean;
    public surfingAllowed: boolean;
    public usedCardKey: boolean;
    public pauseWildEncounters3Steps: boolean;
    public noAudioFadeout: boolean;
    public tradeCenterSpritesFaced: boolean;
    public warpToLavenderTown: boolean;
    public isDungeonWarp: boolean;
    public npcsFaceAway: boolean;
    public isBattle: boolean;
    public isTrainerBattle: boolean;
    public noBattles: boolean;
    public battleEndedOrBlackout: boolean;
    public usingLinkCable: boolean;
    public scriptedNPCMovement: boolean;
    public npcSpriteMovement: boolean;
    public ignoreJoypad: boolean;
    public noLetterDelay: boolean;
    public joypadSimulation: boolean;
    public countPlaytime: boolean;
    public flyOrDungeonWarp: boolean;
    public flyWarp: boolean;
    public dungeonWarp: boolean;
    public forceBikeRide: boolean;
    public blackoutDest: boolean;
    public runningTestBattle: boolean;
    public preventMusicChange: boolean;
    public skipJoypadCheckWarps: boolean;
    public trainerWantsBattle: boolean;
    public flyOutofBattle: boolean;
    public standingOnDoor: boolean;
    public movingThroughDoor: boolean;
    public standingOnWarp: boolean;
    public finalLedgeJumping: boolean;
    public spinPlayer: boolean;
    public warpedFromWarp: number;
    public warpedfromMap: number;
    public cardKeyDoorY: number;
    public cardKeyDoorX: number;
    public firstTrashcanLock: number;
    public secondTrashcanLock: number;
    public grassRate: number;
    public grassPokemon: number[];
    public enemyPartySpecies: number[];
    public waterPokemonRate: number;
    public waterPokemon: number; // 20 entries
    public enemyPokemon: PokemonParty[];
    public trainerHeaderPtr: number;
    public oppAfterWrongAnsw: number;
    public curMapScript: number;
    public safariGameOver: number;
    public safariBallCount: number;
    public extendedSpriteData: SpriteDataExtended[];
    public tilesetType: number;
}
