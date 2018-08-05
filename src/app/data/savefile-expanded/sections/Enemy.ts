import { PokemonParty } from './../fragments/PokemonParty';
import { SaveFileService } from '../../savefile.service';

export class Enemy {
    constructor(saveFile: SaveFileService) {
        this.linkTrainer = saveFile.getStr(0x2B33, 0xB, 7);
        this.linkDataBlock = saveFile.getRange(0x2B3F, 9);
    }

    public enemyMonOrTrainerClass: number;
    public enemyPokemon: PokemonParty[];

    public linkTrainer: string;
    public linkDataBlock: Uint8Array;
}
