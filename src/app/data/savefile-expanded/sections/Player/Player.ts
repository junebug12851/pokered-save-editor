import { PlayerPokemon } from './PlayerPokemon';
import { PlayerItems } from './PlayerItems';
import { PlayerPokedex } from './PlayerPokedex';
import { PlayerBasics } from './PlayerBasics';
import { SaveFileService } from './../../../savefile.service';

export class Player {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.basics = new PlayerBasics(saveFile);
        this.pokedex = new PlayerPokedex(saveFile);
        this.items = new PlayerItems(saveFile);
        this.pokemon = new PlayerPokemon(saveFile);
    }

    public save(saveFile: SaveFileService) {
        this.basics.save(saveFile);
        this.pokedex.save(saveFile);
        this.items.save(saveFile);
        this.pokemon.save(saveFile);
    }

    public basics: PlayerBasics = new PlayerBasics();
    public pokedex: PlayerPokedex = new PlayerPokedex();
    public items: PlayerItems = new PlayerItems();
    public pokemon: PlayerPokemon = new PlayerPokemon();
}
