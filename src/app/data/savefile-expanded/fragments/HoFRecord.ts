import { SaveFileService } from '../../savefile.service';
import { HoFPokemon } from './HoFPokemon';

export class HoFRecord {
    constructor(saveFile?: SaveFileService, index?: number) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService, index as number);
    }

    load(saveFile: SaveFileService, index: number) {
        // Calculate HoF Offset for this record
        // Records are 0x60 in size, all records start at 0x598
        // Multiply record number with 0x60 (Record Size) and add to offset
        // of first record (Record 0) which is 0x598
        const offset = (0x60 * index) + 0x598;

        this.pokemon = [];
        for (let i = 0; i < 6; i++) {
            // If Pokemon doesn't exist then don't proceed any further
            // the data stop code is 0xFF
            const pokemonOffset = (0x10 * i) + offset;
            const speciesByte = saveFile.getByte(pokemonOffset + 0);
            if (speciesByte == 0xFF)
                break;
            this.pokemon.push(new HoFPokemon(saveFile, offset, i));
        }
    }

    save(saveFile: SaveFileService, index: number) {
        const offset = (0x60 * index) + 0x598;
        for (let i = 0; i < this.pokemon.length; i++) {
            this.pokemon[i].save(saveFile, offset, index);
        }

        // We need to insert blank HoF pokemon records to account for a non-full
        // HoF team
        const teamRemain = 6 - this.pokemon.length;
        if(teamRemain == 0)
            return;

        for (let i = 0; i < teamRemain; i++) {
            HoFPokemon.insertEmpty(saveFile, offset, i);
        }
    }

    public pokemon: HoFPokemon[] = [];
}
