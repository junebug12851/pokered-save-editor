import { SaveFileService } from './../savefile.service';
import { World } from './sections/World';
import { Area } from './sections/Area';
import { Storage } from './sections/Storage';
import { Rival } from './sections/Rival';
import { HoFRecord } from './fragments/HoF';
import { Player } from './sections/Player';

export class SaveFileExpanded {
    constructor(saveFile: SaveFileService) {

        this.player = new Player(saveFile);
        this.rival = new Rival(saveFile);
        this.storage = new Storage(saveFile);

        const hofRecordCount = saveFile.fileData[0x284E];
        for (let i = 0; i < hofRecordCount && i < 50; i++) {
            this.hallOfFame.push(new HoFRecord(saveFile, i));
        }

        this.area = new Area(saveFile);
        this.world = new World(saveFile);
    }

    // Related to or equipped with the Player
    public player: Player;

    // Related to or equipped with the Rival
    public rival: Rival;

    // Related to the PC Storage System
    public storage: Storage;

    // Related to the Hall of Fame
    public hallOfFame: HoFRecord[] = [];

    // Related to the current map the player is on and will be destroyed when
    // player leaves
    public area: Area;

    // Related to data pertaining to the state of the world or data pertaining
    // to certain maps that won't be destroyed and will be preserved when the
    // player leaves
    public world: World;
}
