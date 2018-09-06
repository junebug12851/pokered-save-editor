import { SaveFileIterator } from './../SaveFileIterator';
import { SaveFileService } from './../../savefile.service';
import { PokemonBox } from './PokemonBox';

export class PokemonParty extends PokemonBox {
    constructor(saveFile?: SaveFileService,
        offset?: number,
        nicknameStartOffset?: number,
        otNameStartOffset?: number,
        index?: number) {

        // Mark record size at end to the expanded size of 0x2C
        // Pokemon Party has expanded data
        super(saveFile, offset, nicknameStartOffset, otNameStartOffset, index, 0x2C);
    }

    public load(saveFile: SaveFileService,
        offset: number,
        nicknameStartOffset: number,
        otNameStartOffset: number,
        index: number): SaveFileIterator {

        const it: SaveFileIterator = super.load(saveFile,
            offset,
            nicknameStartOffset,
            otNameStartOffset,
            index);

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
        nicknameStartOffset: number,
        otNameStartOffset: number,
        index: number): SaveFileIterator {

        const it: SaveFileIterator = super.save(saveFile,
            offset,
            nicknameStartOffset,
            otNameStartOffset,
            index);

        it.setByte(this.level);
        it.setWord(this.maxHP);
        it.setWord(this.attack);
        it.setWord(this.defense);
        it.setWord(this.speed);
        it.setWord(this.special);

        return it;
    }

    public maxHP: number = 0;
    public attack: number = 0;
    public defense: number = 0;
    public speed: number = 0;
    public special: number = 0;
}
