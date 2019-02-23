import { SaveFileService } from '../../savefile.service';

export class HoFPokemon {
    constructor(saveFile?: SaveFileService, recordOffset?: number, index?: number) {
        if (saveFile !== undefined)
            this.load(
                saveFile as SaveFileService,
                recordOffset as number,
                index as number
            );
    }

    public load(saveFile: SaveFileService, recordOffset: number, index: number) {

        // Calculate Pokemon Offset in the record
        // Records are 0x10 in size
        // Multiply record number with 0x10 (Record Size) and add to offset
        // record start
        const pokemonOffset = (0x10 * index) + recordOffset;

        /**
         * Record Data
         */

        // Extract Pokemon Data
        this.species = saveFile.getByte(pokemonOffset + 0);
        this.level = saveFile.getByte(pokemonOffset + 1);
        this.name = saveFile.getStr(pokemonOffset + 2, 0xB, 10);
    }

    public save(saveFile: SaveFileService, recordOffset: number, index: number) {
        const pokemonOffset = (0x10 * index) + recordOffset;

        saveFile.setByte(pokemonOffset + 0, this.species);
        saveFile.setByte(pokemonOffset + 1, this.level);
        saveFile.setStr(pokemonOffset + 2, 0xB, 10, this.name);

        // Normally the Gameboy will actively zero out padding bytes
        // but we don't set padding bytes per the strict "Only touch whats needed" rule
    }

    // Inserts Empty Zero-Filled Record
    public static insertEmpty(saveFile: SaveFileService, recordOffset: number, index: number) {
        const pokemonOffset = (0x10 * index) + recordOffset;

        // Insert a 0xFF byte followed by all zeroes
        // Normally the Gameboy will actively zero out all bytes including padding bytes
        // but we don't set padding bytes per the strict "Only touch whats needed" rule
        saveFile.setByte(pokemonOffset + 0, 0xFF);
        saveFile.setByte(pokemonOffset + 1, 0x00);
        saveFile.copyRange(pokemonOffset + 2, 0xB,
            new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                            0x00, 0x00, 0x00, 0x00]));
    }

    /**
     * Record Data
     */
    public species: number = 0;
    public level: number = 0;
    public name: string = "";
}
