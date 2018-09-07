import { AreaGeneral } from './AreaGeneral';
import { SaveFileService } from './../../../savefile.service';

export class Area {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.general = new AreaGeneral(saveFile);
    }

    public save(saveFile: SaveFileService) {
        this.general.save(saveFile);
    }

    public general: AreaGeneral = new AreaGeneral();
}
