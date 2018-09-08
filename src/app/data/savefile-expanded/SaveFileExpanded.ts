import { Storage } from './sections/Storage';
import { HoF } from './sections/HoF';
import { Area } from './sections/Area/Area';
import { Rival } from './sections/Rival';
import { Player } from './sections/Player/Player';
import { World } from './sections/World/World';
import { Daycare } from './sections/Daycare';
import { SaveFileService } from './../savefile.service';

export class SaveFileExpanded {

    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    load(saveFile: SaveFileService) {
        this.player = new Player(saveFile);
        this.rival = new Rival(saveFile);
        this.storage = new Storage(saveFile);
        this.area = new Area(saveFile);
        this.world = new World(saveFile);
    }

    save(saveFile: SaveFileService) {
        this.player.save(saveFile);
        this.rival.save(saveFile);
        this.storage.save(saveFile);
        this.area.save(saveFile);
        this.world.save(saveFile);
    }

    // Related to or equipped with the Player
    public player: Player = new Player();

    // Related to or equipped with the Rival
    public rival: Rival = new Rival();

    // Related to the PC Storage System
    public storage: Storage = new Storage();

    // Related to the current map the player is on and will be destroyed when
    // player leaves
    public area: Area = new Area();

    // Related to data pertaining to the state of the world or data pertaining
    // to certain maps that won't be destroyed and will be preserved when the
    // player leaves
    public world: World = new World();

    // Related to the daycare
    public daycare: Daycare = new Daycare();

    // Related to the Hall of Fame
    public hof: HoF = new HoF();
}
