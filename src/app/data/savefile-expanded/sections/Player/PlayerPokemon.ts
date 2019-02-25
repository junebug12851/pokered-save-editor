import { PokemonParty } from './../../fragments/PokemonParty';
import { SaveFileService } from './../../../savefile.service';

export class PlayerPokemon {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.playerParty = [];
        for (let i = 0; i < saveFile.getByte(0x2F2C) && i < 6; i++) {
            this.playerParty.push(new PokemonParty(
                saveFile,
                0x2F34,
                0x307E,
                0x303C,
                i));
        }
    }

    public save(saveFile: SaveFileService) {
        // Set party length and save current party data
        saveFile.setByte(0x2F2C, this.playerParty.length);
        for (let i = 0; i < this.playerParty.length && i < 6; i++) {
            this.playerParty[i].save(
                saveFile,
                0x2F34,
                0x2F2D,
                0x307E,
                0x303C,
                i
            )
        }

        // Mark end of species list if not full party
        if(this.playerParty.length >= 6)
            return;

        let speciesOffset = 0x2F2D + this.playerParty.length;
        saveFile.setByte(speciesOffset, 0xFF);
    }

    public playerParty: PokemonParty[] = [];
}
