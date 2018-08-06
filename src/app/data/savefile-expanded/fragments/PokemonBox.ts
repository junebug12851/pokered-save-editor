import { SaveFileIterator } from './../SaveFileIterator';
import { SaveFileService } from './../../savefile.service';

export class PokemonBox {
    constructor(saveFile: SaveFileService,
        offset: number,
        nicknameStartOffset: number,
        otNameStartOffset: number,
        index: number) {

        this.offset = offset;
        this.nicknameStartOffset = nicknameStartOffset;
        this.otNameStartOffset = otNameStartOffset;
        this.index = index;

        const it: SaveFileIterator = saveFile.iterator.offsetTo(offset);

        this.species = it.getByte();
        this.hp = it.getWord();
        this.boxLevel = it.getByte();
        this.status = it.getByte();
        this.type1 = it.getByte();
        this.type2 = it.getByte();
        this.catchRate = it.getByte();

        // Save offset to restore later
        it.push();

        // Temporarily save moves for later
        const moves = [];
        for (let i = 0; i < 4; i++) {
            // A Move of 0x00 indicates end of move list
            const moveID = it.getByte();
            if (moveID === 0x00)
                break;

            moves.push(moveID);
        }

        // Restore offset to start of moves and move past the moves
        it.pop().offsetBy(0x4);

        this.otID = it.getWord();

        // Exp is 3 bytes so it's a bit tricky
        const expRaw = it.getRange(3);
        this.exp = expRaw[0];
        this.exp <<= 8;
        this.exp |= expRaw[1];
        this.exp <<= 8;
        this.exp |= expRaw[2];

        this.hpExp = it.getWord();
        this.attackExp = it.getWord();
        this.defenseExp = it.getWord();
        this.speedExp = it.getWord();
        this.specialExp = it.getWord();
        this.dv = it.getWord();

        it.push();

        // Next gather PP
        const ppList = [];
        for (let i = 0; i < moves.length; i++) {
            ppList.push(it.getByte());
        }

        // Combine together in moves
        this.moves = [];
        for (let i = 0; i < moves.length; i++) {
            const moveID = moves[i];
            const pp = ppList[i];
            this.moves.push({
                moveID,
                pp
            });
        }

        // Restore back to before PP and move past PP, save iterator to class
        // because PokemonParty may pick it up and continue since it extends
        it.pop().offsetBy(0x4);
        this.it = it;

        // Now we must gather the OT names and Pokemon names whihc were poorly
        // implemented in sometimes arbitrary spots outside of the data sructure
        const otNameOffset = (index * 0xB) + otNameStartOffset;
        this.otName = saveFile.getStr(otNameOffset, 0xB, 7);

        const nicknameOffset = (index * 0xB) + nicknameStartOffset;
        this.nickname = saveFile.getStr(nicknameOffset, 0xB, 10);

        // Pokemon box data structure complete
    }

    public offset: number;
    public nicknameStartOffset: number;
    public otNameStartOffset: number;
    public index: number;
    public it: SaveFileIterator;

    public species: number;
    public hp: number;
    public boxLevel: number;
    public status: number;
    public type1: number;
    public type2: number;
    public catchRate: number;
    public moves: {
        moveID: number;
        pp: number;
    }[];
    public otID: number;
    public exp: number;
    public hpExp: number;
    public attackExp: number;
    public defenseExp: number;
    public speedExp: number;
    public specialExp: number;
    public dv: number;
    public otName: string;
    public nickname: string;
}
