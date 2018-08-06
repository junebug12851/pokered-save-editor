import { PokemonParty } from './../fragments/PokemonParty';
import { SaveFileService } from '../../savefile.service';

export class Enemy {
    constructor(saveFile: SaveFileService) {
        this.enemyMonOrTrainerClass = saveFile.getByte(0x29BF);

        this.enemyPokemon = [];
        for (let i = 0; i < saveFile.getByte(0x2B48) && i < 6; i++) {
            this.enemyPokemon.push(new PokemonParty(
                saveFile,
                0x2B50,
                0x2C9A,
                0x2C58,
                i));
        }

        this.linkTrainer = saveFile.getStr(0x2B33, 0xB, 7);
        this.linkDataBlock = saveFile.getRange(0x2B3F, 9);
    }

    public enemyMonOrTrainerClass: number;
    public enemyPokemon: PokemonParty[];

    public linkTrainer: string;
    public linkDataBlock: Uint8Array;
}
