import { SaveFileIterator } from './../SaveFileIterator';
import { SaveFileService } from './../../savefile.service';
import { PokemonBox } from './PokemonBox';

export class PokemonParty extends PokemonBox {
    constructor(saveFile: SaveFileService,
        offset: number,
        nicknameStartOffset: number,
        otNameStartOffset: number,
        index: number) {

        super(saveFile, offset, nicknameStartOffset, otNameStartOffset, index);

        const it: SaveFileIterator = this.it;
        this.level = it.getByte();
        this.maxHP = it.getWord();
        this.attack = it.getWord();
        this.defense = it.getWord();
        this.speed = it.getWord();
        this.special = it.getWord();
    }

    public level: number;
    public maxHP: number;
    public attack: number;
    public defense: number;
    public speed: number;
    public special: number;
}
