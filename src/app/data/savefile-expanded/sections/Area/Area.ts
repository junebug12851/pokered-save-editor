import { AreaWarps } from './AreaWarps';
import { AreaCachedSprites } from './AreaCachedSprites';
import { AreaTileset } from './AreaTileset';
import { AreaAudio } from './AreaAudio';
import { AreaGeneral } from './AreaGeneral';
import { SaveFileService } from './../../../savefile.service';

export class Area {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.general = new AreaGeneral(saveFile);
        this.audio = new AreaAudio(saveFile);
        this.tileset = new AreaTileset(saveFile);
        this.cachedSprites = new AreaCachedSprites(saveFile);
        this.warps = new AreaWarps(saveFile);
    }

    public save(saveFile: SaveFileService) {
        this.general.save(saveFile);
        this.audio.save(saveFile);
        this.tileset.save(saveFile);
        this.cachedSprites.save(saveFile);
        this.warps.save(saveFile);
    }

    public general: AreaGeneral = new AreaGeneral();
    public audio: AreaAudio = new AreaAudio();
    public tileset: AreaTileset = new AreaTileset();
    public cachedSprites: AreaCachedSprites = new AreaCachedSprites();
    public warps: AreaWarps = new AreaWarps();
}
