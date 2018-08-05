import { PokemonBox } from '../fragments/PokemonBox';
import { PokemonParty } from '../fragments/PokemonParty';
import { Item } from '../fragments/item';
import { SaveFileService } from '../../savefile.service';

export class Storage {
    constructor(saveFile: SaveFileService) {
        //
    }

    public curBox: number;
    public boxItems: Item[];
    public playerParty: PokemonParty[];
    public playerBoxes: PokemonBox[];
}
