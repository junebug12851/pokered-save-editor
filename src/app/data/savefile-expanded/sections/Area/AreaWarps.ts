import { WarpData } from './../../fragments/WarpData';
import { SaveFileService } from './../../../savefile.service';

export class AreaWarps {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.warpData = [];
        for (let i = 0; i < saveFile.getByte(0x265A) && i < 32; i++) {
            this.warpData.push(new WarpData(saveFile, i));
        }
        this.warpDest = saveFile.getByte(0x26DB);
        this.dungeonWarpDestMap = saveFile.getByte(0x29C9);
        this.specialWarpDestMap = saveFile.getByte(0x29C6);
        this.whichDungeonWarp = saveFile.getByte(0x29CA);
        this.scriptedWarp = saveFile.getBit(0x29D9, 1, 3);
        this.isDungeonWarp = saveFile.getBit(0x29D9, 1, 4);
        this.flyOrDungeonWarp = saveFile.getBit(0x29DE, 1, 2);
        this.flyWarp = saveFile.getBit(0x29DE, 1, 3);
        this.dungeonWarp = saveFile.getBit(0x29DE, 1, 4);
        this.skipJoypadCheckWarps = saveFile.getBit(0x29DF, 1, 2);
        this.warpedFromWarp = saveFile.getByte(0x29E7);
        this.warpedfromMap = saveFile.getByte(0x29E8);
    }

    public save(saveFile: SaveFileService) {
        saveFile.setByte(0x265A, this.warpData.length);
        for (let i = 0; i < this.warpData.length && i < 32; i++) {
            this.warpData[i].save(saveFile, i);
        }

        saveFile.setByte(0x26DB, this.warpDest);
        saveFile.setByte(0x29C9, this.dungeonWarpDestMap);
        saveFile.setByte(0x29C6, this.specialWarpDestMap);
        saveFile.setByte(0x29CA, this.whichDungeonWarp);
        saveFile.setBit(0x29D9, 1, 3, this.scriptedWarp);
        saveFile.setBit(0x29D9, 1, 4, this.isDungeonWarp);
        saveFile.setBit(0x29DE, 1, 2, this.flyOrDungeonWarp);
        saveFile.setBit(0x29DE, 1, 3, this.flyWarp);
        saveFile.setBit(0x29DE, 1, 4, this.dungeonWarp);
        saveFile.setBit(0x29DF, 1, 2, this.skipJoypadCheckWarps);
        saveFile.setByte(0x29E7, this.warpedFromWarp);
        saveFile.setByte(0x29E8, this.warpedfromMap);
    }

    // Pre-Warp
    public scriptedWarp: boolean = false; // Do a scripted warp
    public isDungeonWarp: boolean = false; // On a dungeon warp
    public skipJoypadCheckWarps: boolean = false; // Skips check for warp after not collided (Forced Warp)??

    // Warping
    public warpDest: number = 0; // Warp actively warping to or 0xFF to warp to same position
    public dungeonWarpDestMap: number = 0; // Destination Map for dungeon warps
    public specialWarpDestMap: number = 0; // Destination Map for special warps
    public flyOrDungeonWarp: boolean = false; // Is a fly or dungeon warp
    public flyWarp: boolean = false; // Is a fly warp
    public dungeonWarp: boolean = false; // Is a dungeon warp

    // Warped
    public whichDungeonWarp: number = 0; // Warped from which dungeon warp
    public warpedFromWarp: number = 0; // Warped from which warp
    public warpedfromMap: number = 0; // Warped from which map

    // Warp Points
    public warpData: WarpData[] = []; // Warp entries
}
