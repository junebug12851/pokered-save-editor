import { SaveFileService } from './../../../savefile.service';

export interface WildPokemon {
    level: number,
    pokemon: number,
};

export class AreaPokemon {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.pauseWildEncounters3Steps = saveFile.getBit(0x29D8, 1, 0);
        this.grassRate = saveFile.getByte(0x2B33);
        const grassPokemon = saveFile.getRange(0x2B34, 20);

        this.grassPokemon = [];
        for (let i = 0; i < 20; i += 2) {
            // Add Grass Pokemon
            this.grassPokemon.push({
                level: grassPokemon[i],
                pokemon: grassPokemon[i + 1],
            });
        }

        this.waterPokemonRate = saveFile.getByte(0x2B50);
        const waterPokemon = saveFile.getRange(0x2B51, 20);

        this.waterPokemon = [];
        for (let i = 0; i < 20; i += 2) {
            // Add Water Pokemon
            this.waterPokemon.push({
                level: waterPokemon[i],
                pokemon: waterPokemon[i + 1],
            });
        }
    }

    public save(saveFile: SaveFileService) {
        const it = saveFile.iterator;

        saveFile.setBit(0x29D8, 1, 0, this.pauseWildEncounters3Steps);

        saveFile.setByte(0x2B33, this.grassRate);
        it.offsetTo(0x2B34);
        for (let i = 0; i < 10; i++) {
            it.setByte(this.grassPokemon[i].level);
            it.setByte(this.grassPokemon[i].pokemon);
        }

        saveFile.setByte(0x2B50, this.grassRate);
        it.offsetTo(0x2B51);
        for (let i = 0; i < 10; i++) {
            it.setByte(this.waterPokemon[i].level);
            it.setByte(this.waterPokemon[i].pokemon);
        }
    }

    /**
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
    public grassRate: number = 0;
    public grassPokemon: WildPokemon[] = [];

    public waterPokemonRate: number = 0;
    public waterPokemon: WildPokemon[] = [];

    public pauseWildEncounters3Steps: boolean = false;
}
