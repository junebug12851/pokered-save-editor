import { PokemonParty } from './../fragments/PokemonParty';
import { SaveFileService } from '../../savefile.service';

export class Enemy {
    constructor(saveFile: SaveFileService) {
        //
    }

    public enemyMonOrTrainerClass: number;
    public enemyPokemon: PokemonParty[];
}
