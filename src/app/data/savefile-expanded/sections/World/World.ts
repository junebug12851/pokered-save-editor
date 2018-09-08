import { WorldCompleted } from './WorldCompleted';
import { WorldScripts } from './WorldScripts';
import { WorldMissables } from './WorldMissables';
import { WorldTrades } from './WorldTrades';
import { WorldTowns } from './WorldTowns';
import { WorldHidden } from './WorldHidden';
import { WorldEvents } from './WorldEvents';
import { SaveFileService } from './../../../savefile.service';

export class World {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.events = new WorldEvents(saveFile);
        this.hidden = new WorldHidden(saveFile);
        this.towns = new WorldTowns(saveFile);
        this.trades = new WorldTrades(saveFile);
        this.missables = new WorldMissables(saveFile);
        this.scripts = new WorldScripts(saveFile);
        this.completed = new WorldCompleted(saveFile);
    }

    public save(saveFile: SaveFileService) {
        this.events.save(saveFile);
        this.hidden.save(saveFile);
        this.towns.save(saveFile);
        this.trades.save(saveFile);
        this.missables.save(saveFile);
        this.scripts.save(saveFile);
        this.completed.save(saveFile);
    }

    public events: WorldEvents = new WorldEvents();
    public hidden: WorldHidden = new WorldHidden();
    public towns: WorldTowns = new WorldTowns();
    public trades: WorldTrades = new WorldTrades();
    public missables: WorldMissables = new WorldMissables();
    public scripts: WorldScripts = new WorldScripts();
    public completed: WorldCompleted = new WorldCompleted();
}
