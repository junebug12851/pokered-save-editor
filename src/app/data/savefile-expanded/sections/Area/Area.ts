import { AreaSprites } from './AreaSprites';
import { AreaPuzzle } from './AreaPuzzle';
import { AreaPokemon } from './AreaPokemon';
import { AreaNPC } from './AreaNPC';
import { AreaMap } from './AreaMap';
import { AreaPlayer } from './AreaPlayer';
import { AreaSigns } from './AreaSigns';
import { AreaWarps } from './AreaWarps';
import { AreaCachedSprites } from './AreaCachedSprites';
import { AreaTileset } from './AreaTileset';
import { AreaAudio } from './AreaAudio';
import { AreaGeneral } from './AreaGeneral';
import { SaveFileService } from './../../../savefile.service';

export class Area {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.general = new AreaGeneral(saveFile);
        this.audio = new AreaAudio(saveFile);
        this.tilesets = new AreaTileset(saveFile);
        this.cachedSprites = new AreaCachedSprites(saveFile);
        this.warps = new AreaWarps(saveFile);
        this.signs = new AreaSigns(saveFile);
        this.sprites = new AreaSprites(saveFile);
        this.player = new AreaPlayer(saveFile);
        this.maps = new AreaMap(saveFile);
        this.npcs = new AreaNPC(saveFile);
        this.pokemon = new AreaPokemon(saveFile);
        this.puzzle = new AreaPuzzle(saveFile);
    }

    public save(saveFile: SaveFileService) {
        this.general.save(saveFile);
        this.audio.save(saveFile);
        this.tilesets.save(saveFile);
        this.cachedSprites.save(saveFile);
        this.warps.save(saveFile);
        this.signs.save(saveFile);
        this.sprites.save(saveFile);
        this.player.save(saveFile);
        this.maps.save(saveFile);
        this.npcs.save(saveFile);
        this.pokemon.save(saveFile);
        this.puzzle.save(saveFile);
    }

    public general: AreaGeneral = new AreaGeneral();
    public audio: AreaAudio = new AreaAudio();
    public tilesets: AreaTileset = new AreaTileset();
    public cachedSprites: AreaCachedSprites = new AreaCachedSprites();
    public warps: AreaWarps = new AreaWarps();
    public signs: AreaSigns = new AreaSigns();
    public sprites: AreaSprites = new AreaSprites();
    public player: AreaPlayer = new AreaPlayer();
    public maps: AreaMap = new AreaMap();
    public npcs: AreaNPC = new AreaNPC();
    public pokemon: AreaPokemon = new AreaPokemon();
    public puzzle: AreaPuzzle = new AreaPuzzle();
}
