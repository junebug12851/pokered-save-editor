import { PokemonBox } from './../fragments/PokemonBox';
import { SaveFileService } from './../../savefile.service';

export class Daycare {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        // Is the daycare in use, if so extract daycare Pokemon Information
        if (saveFile.getByte(0x2CF4) > 0)
            this.dayCare = new PokemonBox(saveFile, 0x2D0B, 0x2CF5, 0x2D00, 0);
    }

    public save(saveFile: SaveFileService) {
        saveFile.setByte(0x2CF4, (this.dayCare != null) ? 1 : 0);
        if (this.dayCare != null)
            this.dayCare.save(saveFile, 0x2D0B, 0x2CF5, 0x2D00, 0);
    }

    /**
     * Daycare
     */
    public dayCare: PokemonBox | null = null;
}
