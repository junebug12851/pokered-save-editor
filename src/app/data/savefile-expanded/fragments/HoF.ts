import { SaveFileService } from '../../savefile.service';

export class HoFPokemon {
    constructor(saveFile: SaveFileService, recordOffset: number, index: number) {
        this.recordOffset = recordOffset;
        this.index = index;

        // Calculate Pokemon Offset in the record
        // Records are 0x10 in size
        // Multiply record number with 0x10 (Record Size) and add to offset
        // record start
        this.pokemonOffset = (0x10 * index) + recordOffset;

        // Extract Pokemon Data
        this.species = saveFile.getRange(this.pokemonOffset + 0, 1)[0];
        this.level = saveFile.getRange(this.pokemonOffset + 1, 1)[0];
        this.name = saveFile.getStr(this.pokemonOffset + 2, 0xB, 10);
        this.padding = saveFile.getRange(this.pokemonOffset + (0xB + 2), 0x3);
    }

    public species: number;
    public level: number;
    public name: string;
    public padding: Uint8Array;

    public index: number;
    public recordOffset: number;
    public pokemonOffset: number;
}

export class HoFRecord {
    constructor(saveFile: SaveFileService, index: number) {

        this.index = index;

        // Calculate HoF Offset for this record
        // Records are 0x60 in size, all records start at 0x598
        // Multiply record number with 0x60 (Record Size) and add to offset
        // of first record (Record 0) which is 0x598
        this.offset = (0x60 * index) + 0x598;

        this.pokemon = [];
        for (let i = 0; i < 6; i++) {

            // If Pokemon doesn't exist then don't proceed any further
            const pokemonOffset = (0x10 * i) + this.offset
            const speciesByte = saveFile.getRange(pokemonOffset + 0, 1)[0];
            if (speciesByte == 0)
                break;

            this.pokemon.push(new HoFPokemon(saveFile, this.offset, i));
        }
    }

    public pokemon: HoFPokemon[];

    public index: number;
    public offset: number;
}
