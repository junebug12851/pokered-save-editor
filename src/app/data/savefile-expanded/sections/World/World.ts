import { SaveFileService } from './../../../savefile.service';

export class World {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {

    }

    public save(saveFile: SaveFileService) {

    }

}
