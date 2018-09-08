import { SaveFileService } from '../../savefile.service';

export interface WildPokemon {
    level: number,
    pokemon: number,
};

export class Area {
    constructor(saveFile: SaveFileService) {

        this.pauseWildEncounters3Steps = saveFile.getBit(0x29D8, 1, 0);
        this.firstTrashcanLock = saveFile.getByte(0x29EF);
        this.secondTrashcanLock = saveFile.getByte(0x29F0);

        this.grassRate = saveFile.getByte(0x2B33);
        const grassPokemon = saveFile.getRange(0x2B34, 20);

        this.grassPokemon = [];
        //if (gr > 0) // Unverified
        for (let i = 0; i < 20; i += 2) {

            // List ends with 0x00 or until 10 is reached
            // Unverified
            // if (grassPokemon[i] == 0x00 || grassPokemon[i + 1] == 0x00)
            //     break;

            // Add Grass Pokemon
            this.grassPokemon.push({
                level: grassPokemon[i],
                pokemon: grassPokemon[i + 1],
            });
        }

        this.waterPokemonRate = saveFile.getByte(0x2B50);
        const waterPokemon = saveFile.getRange(0x2B51, 20);

        this.waterPokemon = [];
        //if (wr > 0) // Unverified
        for (let i = 0; i < 20; i += 2) {

            // List ends with 0x00 or until 10 is reached
            // Unverified
            // if (waterPokemon[i] == 0x00 || waterPokemon[i + 1] == 0x00)
            //     break;

            // Add Water Pokemon
            this.waterPokemon.push({
                level: waterPokemon[i],
                pokemon: waterPokemon[i + 1],
            });
        }

        this.oppAfterWrongAnsw = saveFile.getByte(0x2CE4);
    }

    /**
     * Pokemon
     *
     * Rate is how likely to encounter Pokemon
     * higher number = higher chance
     * A rate of 0 means no wild pokemon on map
     *
     * The Pokemon list is in order from most common to most rare
     * Pokemon 0: 19.9% chance
     * Pokemon 1: 19.9% chance
     * Pokemon 2: 15.2% chance
     * Pokemon 3: 9.8% chance
     * Pokemon 4: 9.8% chance
     * Pokemon 5: 9.8% chance
     * Pokemon 6: 5.1% chance
     * Pokemon 7: 5.1% chance
     * Pokemon 8: 4.3% chance
     * Pokemon 9: 1.2% chance
     */
    public grassRate: number;
    public grassPokemon: WildPokemon[];
    public waterPokemonRate: number;
    public waterPokemon: WildPokemon[];
    public pauseWildEncounters3Steps: boolean;

    // Puzzle
    public firstTrashcanLock: number;
    public secondTrashcanLock: number;
    public oppAfterWrongAnsw: number;
}
