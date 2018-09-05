import { SaveFileIterator } from './../SaveFileIterator';
import { SaveFileService } from './../../savefile.service';
import { PokemonBox } from './PokemonBox';

export class PokemonParty extends PokemonBox {
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

    static get empty() {
        const parent: any = PokemonBox.empty;
        parent.maxHP = 0;
        parent.attack = 0;
        parent.defense = 0;
        parent.speed = 0;
        parent.special = 0;
        return parent;
    }

    public maxHP: number;
    public attack: number;
    public defense: number;
    public speed: number;
    public special: number;
}
