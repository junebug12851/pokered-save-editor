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
            this.pokemon[i].save(saveFile, offset, i);
        }

        // If the record isn't filled up with 6 Pokemon then
        // we need to insert an ending marker and not touch the rest of the bytes
        if(this.pokemon.length >= 6)
            return;

        // Calculate the ending marker position which is 
        // 1 byte after all record data and set to 0xFF thus sealing the rest
        // of the data

        // Pokemon Record Size * Pokemon Record Number + Record Start Location
        let endingOffset = (0x10 * this.pokemon.length) + offset;
        saveFile.setByte(endingOffset, 0xFF);
    }

    public pokemon: HoFPokemon[] = [];
}
