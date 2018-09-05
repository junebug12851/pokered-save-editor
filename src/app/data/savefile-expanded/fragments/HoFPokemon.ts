import { SaveFileService } from '../../savefile.service';

export interface HoFPokemonData {
    species: number,
    level: number,
    name: string,
};

export class HoFPokemon implements HoFPokemonData {
    constructor(saveFile: SaveFileService, recordOffset: number, index: number) {

        /**
         * Record Internals
         */

        this.recordOffset = recordOffset;
        this.index = index;
        this.saveFile = saveFile;

        // Calculate Pokemon Offset in the record
        // Records are 0x10 in size
        // Multiply record number with 0x10 (Record Size) and add to offset
        // record start
        this.pokemonOffset = (0x10 * index) + recordOffset;

        /**
         * Record Data
         */

        // Extract Pokemon Data
        this.species = saveFile.getByte(this.pokemonOffset + 0);
        this.level = saveFile.getByte(this.pokemonOffset + 1);
        this.name = saveFile.getStr(this.pokemonOffset + 2, 0xB, 10);
    }

    static get empty(): HoFPokemonData {
        return {
            species: 0,
            level: 0,
            name: "",
        };
    }

    public save() {
        const saveFile = this.saveFile;
        saveFile.setByte(this.pokemonOffset + 0, this.species);
        saveFile.setByte(this.pokemonOffset + 1, this.level);
        saveFile.setStr(this.pokemonOffset + 2, 0xB, 10, this.name);
    }

    /**
     * Record Internals
     */
    public index: number;
    public recordOffset: number;
    public pokemonOffset: number;
    public saveFile: SaveFileService;

    /**
     * Record Data
     */
    public species: number;
    public level: number;
    public name: string;
}
