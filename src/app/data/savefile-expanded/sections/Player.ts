import { Item } from '../fragments/item';
import { SaveFileService } from '../../savefile.service';

export class Player {
    constructor(saveFile: SaveFileService) {
        //
    }

    public playerName: string;
    public playerID: number;
    public pokedexOwned: boolean[];
    public pokedexSeen: boolean[];
    public bagItems: Item[];
    public money: number;
    public coins: number;
    public badges: {
        boulder: false,
        cascade: false,
        thunder: false,
        rainbow: false,
        soul: false,
        marsh: false,
        volcano: false,
        earth: false,
    };
    public playerStarter: number;
}
