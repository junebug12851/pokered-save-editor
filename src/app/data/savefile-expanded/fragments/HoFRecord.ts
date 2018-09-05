import { HoFRecordData } from './HoFRecord';
import { SaveFileService } from '../../savefile.service';
import { HoFPokemon } from './HoFPokemon';

export interface HoFRecordData {
    pokemon: HoFPokemon[];
}

export class HoFRecord implements HoFRecordData {
    constructor(saveFile: SaveFileService, index: number) {
        this.index = index;
        this.saveFile = saveFile;
        // Calculate HoF Offset for this record
        // Records are 0x60 in size, all records start at 0x598
        // Multiply record number with 0x60 (Record Size) and add to offset
        // of first record (Record 0) which is 0x598
        this.offset = (0x60 * index) + 0x598;

        this.pokemon = [];
        for (let i = 0; i < 6; i++) {
            // If Pokemon doesn't exist then don't proceed any further
            const pokemonOffset = (0x10 * i) + this.offset;
            const speciesByte = saveFile.getByte(pokemonOffset + 0);
            if (speciesByte == 0)
                break;
            this.pokemon.push(new HoFPokemon(saveFile, this.offset, i));
        }
    }

    static get empty(): HoFRecordData {
        return {
            pokemon: []
        }
    }

    save() {
        for (let i = 0; i < this.pokemon.length; i++) {
            this.pokemon[i].save();
        }
    }

    public index: number;
    public offset: number;
    public saveFile: SaveFileService;

    public pokemon: HoFPokemon[];
}
