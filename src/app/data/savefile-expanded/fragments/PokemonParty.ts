import { SaveFileIterator } from './../SaveFileIterator';
import { SaveFileService } from './../../savefile.service';
import { PokemonBox } from './PokemonBox';

export class PokemonParty extends PokemonBox {
    constructor(saveFile?: SaveFileService,
        offset?: number,
        nicknameStartOffset?: number,
        otNameStartOffset?: number,
        index?: number) {

        // Due to an annoying attribute of typescript compiling variable
        // declarations below the super call thus resetting child class to default
        // after child and parent class have been initialized properly
        // we have to work around this annoyance by initiating a blank parent
        // and typescripts injected code for a blank child followed by the actual
        // loading process handled by the child and delegated manually to the parent
        // This annoyance took several hours to figure out why only the child
        // kept resetting to default values after loading properly
        super();

        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService,
                offset as number,
                nicknameStartOffset as number,
                otNameStartOffset as number,
                index as number)
    }

    // Modifies a Pokemon Box to be a Pokemon Party and creates initial stats
    static convertToPokemonParty(pkmn: PokemonBox) {
        const _pkmn = pkmn as PokemonParty;
        _pkmn.updateStats = PokemonParty.prototype.updateStats;
        _pkmn.updateStats();
    }

    // Modifies a Pokemon Party to be a Pokemon Box
    static convertToPokemonBox(pkmn: PokemonParty) {
        delete pkmn.updateStats;
        delete pkmn.maxHP;
        delete pkmn.attack;
        delete pkmn.defense;
        delete pkmn.speed;
        delete pkmn.special;
    }

    public load(saveFile: SaveFileService,
        offset: number,
        nicknameStartOffset: number,
        otNameStartOffset: number,
        index: number): SaveFileIterator {

        // Mark record size at end to the expanded size of 0x2C
        // Pokemon Party has expanded data
        const it: SaveFileIterator = super.load(saveFile,
            offset,
            nicknameStartOffset,
            otNameStartOffset,
            index,
            0x2C);

        this.level = it.getByte();
        this.maxHP = it.getWord();
        this.attack = it.getWord();
        this.defense = it.getWord();
        this.speed = it.getWord();
        this.special = it.getWord();

        return it;
    }

    public save(saveFile: SaveFileService,
        offset: number,
        speciesStartOffset: number | null,
        nicknameStartOffset: number,
        otNameStartOffset: number,
        index: number): SaveFileIterator {

        const it: SaveFileIterator = super.save(saveFile,
            offset,
            speciesStartOffset,
            nicknameStartOffset,
            otNameStartOffset,
            index,
            0x2C);

        it.setByte(this.level);
        it.setWord(this.maxHP);
        it.setWord(this.attack);
        it.setWord(this.defense);
        it.setWord(this.speed);
        it.setWord(this.special);

        return it;
    }

    public updateStats() {

        // Stop here if invalid Pokemon
        if(this.isValidPokemon === false)
            return;

        this.maxHP = this.hpStat;
        this.attack = this.attackStat;
        this.defense = this.defenseStat;
        this.speed = this.speedStat;
        this.special = this.specialStat;
    }

    public maxHP: number = 0;
    public attack: number = 0;
    public defense: number = 0;
    public speed: number = 0;
    public special: number = 0;
}
