import { SaveFileIterator } from './../SaveFileIterator';
import { SaveFileService } from './../../savefile.service';
import { PokemonBox, PokemonBoxData } from './PokemonBox';

export interface PokemonPartyData extends PokemonBoxData {
    maxHP: number;
    attack: number;
    defense: number;
    speed: number;
    special: number;
}

export class PokemonParty extends PokemonBox implements PokemonPartyData {
    constructor(saveFile: SaveFileService,
        offset: number,
        nicknameStartOffset: number,
        otNameStartOffset: number,
        index: number) {

        // Mark record size at end to the expanded size of 0x2C
        // Pokemon Party has expanded data
        super(saveFile, offset, nicknameStartOffset, otNameStartOffset, index, 0x2C);

        const it: SaveFileIterator = this.it;
        this.level = it.getByte();
        this.maxHP = it.getWord();
        this.attack = it.getWord();
        this.defense = it.getWord();
        this.speed = it.getWord();
        this.special = it.getWord();
    }

    static get empty(): PokemonPartyData {
        const parent: any = PokemonBox.empty;
        parent.maxHP = 0;
        parent.attack = 0;
        parent.defense = 0;
        parent.speed = 0;
        parent.special = 0;
        return parent;
    }

    public save(): SaveFileIterator {
        const it = super.save();
        it.setByte(this.level);
        it.setWord(this.maxHP);
        it.setWord(this.attack);
        it.setWord(this.defense);
        it.setWord(this.speed);
        it.setWord(this.special);
        return it;
    }

    public maxHP: number;
    public attack: number;
    public defense: number;
    public speed: number;
    public special: number;
}
