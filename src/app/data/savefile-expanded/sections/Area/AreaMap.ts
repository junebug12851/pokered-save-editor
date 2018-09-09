import { MapConnData } from './../../fragments/MapConnData';
import { SaveFileService } from './../../../savefile.service';

export class AreaMap {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        const curMap = saveFile.getByte(0x260A).toString(16).padStart(2, "0").toUpperCase();
        const mapHeight = saveFile.getByte(0x2614).toString().padStart(2, "0");
        const mapWidth = saveFile.getByte(0x2615).toString().padStart(2, "0");
        const mapDataPtr = saveFile.getWord(0x2616, true).toString(16).padStart(4, "0").toUpperCase();
        const mapTextPtr = saveFile.getWord(0x2618, true).toString(16).padStart(4, "0").toUpperCase();
        const mapScriptPtr = saveFile.getWord(0x261A, true).toString(16).padStart(4, "0").toUpperCase();
        const map2x2Height = saveFile.getByte(0x27D0).toString().padStart(2, "0");
        const map2x2Width = saveFile.getByte(0x27D1).toString().padStart(2, "0");

        this.curMap = `${curMap}_${mapHeight}_${mapWidth}_${map2x2Height}_${map2x2Width}_${mapDataPtr}_${mapTextPtr}_${mapScriptPtr}`;

        this.currentTileBlockMapViewPointer = saveFile.getWord(0x260B, true).toString(16).padStart(2, "0").toUpperCase();

        this.mapConn = {
            east: saveFile.getBit(0x261C, 1, 0),
            west: saveFile.getBit(0x261C, 1, 1),
            south: saveFile.getBit(0x261C, 1, 2),
            north: saveFile.getBit(0x261C, 1, 3),
        };

        if (this.mapConn.north)
            this.mapConnData.north = new MapConnData(saveFile, 0x261D);

        if (this.mapConn.south)
            this.mapConnData.south = new MapConnData(saveFile, 0x2628);

        if (this.mapConn.west)
            this.mapConnData.west = new MapConnData(saveFile, 0x2633);

        if (this.mapConn.east)
            this.mapConnData.east = new MapConnData(saveFile, 0x263E);

        this.mapViewVRAMPointer = saveFile.getWord(0x27D2, true).toString(16).padStart(2, "0").toUpperCase();

        this.forceBikeRide = saveFile.getBit(0x29DE, 1, 5);
        this.blackoutDest = saveFile.getBit(0x29DE, 1, 6);
        this.curMapNextFrame = saveFile.getBit(0x29DF, 1, 4);
        this.cardKeyDoorY = saveFile.getByte(0x29EB);
        this.cardKeyDoorX = saveFile.getByte(0x29EC);
        this.curMapScript = saveFile.getByte(0x2CE5);
    }

    public save(saveFile: SaveFileService) {

        /**
         * 0    ${curMap}           Hex
         * 1    ${mapHeight}        Number
         * 2    ${mapWidth}         Number
         * 3    ${map2x2Height}     Number
         * 4    ${map2x2Width}      Number
         * 5    ${mapDataPtr}       Hex
         * 6    ${mapTextPtr}       Hex
         * 7    ${mapScriptPtr}     Hex
         */
        const curMapArr = this.curMap.split("_");

        saveFile.setHex(0x260A, 1, curMapArr[0]); // curMap
        saveFile.setByte(0x2614, parseInt(curMapArr[1])); // mapHeight
        saveFile.setByte(0x2615, parseInt(curMapArr[2])); // mapWidth
        saveFile.setHex(0x2616, 2, curMapArr[5], false, true); // mapDataPtr
        saveFile.setHex(0x2618, 2, curMapArr[6], false, true); // mapTextPtr
        saveFile.setHex(0x261A, 2, curMapArr[7], false, true); // mapScriptPtr
        saveFile.setByte(0x27D0, parseInt(curMapArr[3])); // map2x2Height
        saveFile.setByte(0x27D1, parseInt(curMapArr[4])); // map2x2Width

        saveFile.setHex(0x260B, 2, this.currentTileBlockMapViewPointer, false, true);

        saveFile.setBit(0x261C, 1, 0, this.mapConn.east);
        saveFile.setBit(0x261C, 1, 1, this.mapConn.west);
        saveFile.setBit(0x261C, 1, 2, this.mapConn.south);
        saveFile.setBit(0x261C, 1, 3, this.mapConn.north);

        if (this.mapConn.north)
            this.mapConnData.north.save(saveFile, 0x261D);

        if (this.mapConn.south)
            this.mapConnData.south.save(saveFile, 0x2628);

        if (this.mapConn.west)
            this.mapConnData.west.save(saveFile, 0x2633);

        if (this.mapConn.east)
            this.mapConnData.east.save(saveFile, 0x263E);

        saveFile.setHex(0x27D2, 2, this.mapViewVRAMPointer, false, true);

        saveFile.setBit(0x29DE, 1, 5, this.forceBikeRide);
        saveFile.setBit(0x29DE, 1, 6, this.blackoutDest);
        saveFile.setBit(0x29DF, 1, 4, this.curMapNextFrame);
        saveFile.setByte(0x29EB, this.cardKeyDoorY);
        saveFile.setByte(0x29EC, this.cardKeyDoorX);
        saveFile.setByte(0x2CE5, this.curMapScript);
    }

    // Area In
    public curMap: string = "00_00_00_00_00_0000_0000_0000";

    // pointer to the upper left corner of the current view in the tile block map
    public currentTileBlockMapViewPointer: string = "0000";

    // the address of the upper left corner of the visible portion of the BG tile map in VRAM
    public mapViewVRAMPointer: string = "0000";

    // index of current map script, mostly used as index for function pointer array
    // mostly copied from map - specific map script pointer and written back later
    public curMapScript: number = 0;

    // use variable "Current Map Script" instead of the index for next frame's
    // map script
    public curMapNextFrame: boolean = false;

    // Area Around
    public mapConn = {
        east: false as boolean,
        west: false as boolean,
        south: false as boolean,
        north: false as boolean,
    };
    public mapConnData = {
        north: new MapConnData() as MapConnData,
        south: new MapConnData() as MapConnData,
        west: new MapConnData() as MapConnData,
        east: new MapConnData() as MapConnData,
    };

    // Misc
    public forceBikeRide: boolean = false;

    // Map destination is last blackout map
    public blackoutDest: boolean = false;
    public cardKeyDoorY: number = 0;
    public cardKeyDoorX: number = 0;
}
