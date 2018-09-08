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
    }

    public save(saveFile: SaveFileService) {
        this.events.save(saveFile);
        this.hidden.save(saveFile);
    }

    public events: WorldEvents = new WorldEvents();
    public hidden: WorldHidden = new WorldHidden();
}
