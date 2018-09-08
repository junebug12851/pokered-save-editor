import { SaveFileIterator } from './../SaveFileIterator';
import { SaveFileService } from './../../savefile.service';

export class PokemonBox {
    constructor(saveFile?: SaveFileService,
        startOffset?: number,
        nicknameStartOffset?: number,
        otNameStartOffset?: number,
        index?: number,
        recordSize?: number) {

        if (saveFile !== undefined)
            this.load(
                saveFile as SaveFileService,
                startOffset as number,
                nicknameStartOffset as number,
                otNameStartOffset as number,
                index as number,
                recordSize as number
            );

        // Pokemon box data structure complete, Ready for Pokemon Party to
        // takeover
    }

    public load(saveFile: SaveFileService,
        startOffset: number,
        nicknameStartOffset: number,
        otNameStartOffset: number,
        index: number,

        // Unless overridden, the record size for box data is 0x21
        recordSize: number = 0x21): SaveFileIterator {

        // Calculate record offset
        const offset = (recordSize * index) + startOffset;

        const it: SaveFileIterator = saveFile.iterator.offsetTo(offset);

        this.species = it.getByte();
        this.hp = it.getWord();
        this.level = it.getByte();

        this.status = it.getByte();

        this.type1 = it.getByte();
        this.type2 = it.getByte();

        // Don't duplicate type 1 to type 2, fill type 2 only if it's different
        if (this.type1 === this.type2)
            this.type2 = 0xFF;

        this.catchRate = it.getByte();

        // Save offset to restore later
        it.push();

        // Temporarily save moves for later
        const moves = [];
        for (let i = 0; i < 4; i++) {
            const moveID = it.getByte();
            moves.push(moveID);
        }

        // Restore offset to start of moves and move past the moves
        it.pop().offsetBy(0x4);

        this.otID = it.getHex(2, false);

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

        const dvTotal = it.getWord();
        this.dv = {
            attack: (dvTotal & 0xF000) >> 12,
            defense: (dvTotal & 0x0F00) >> 8,
            speed: (dvTotal & 0x00F0) >> 4,
            special: dvTotal & 0x000F
        };

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
                pp: pp & 0b00111111,
                ppUp: (pp & 0b11000000) >> 6
            });
        }

        // Restore back to before PP and move past PP, save iterator to class
        // because PokemonParty may pick it up and continue since it extends
        it.pop().offsetBy(0x4);

        // Now we must gather the OT names and Pokemon names whihc were poorly
        // implemented in sometimes arbitrary spots outside of the data sructure
        const otNameOffset = (index * 0xB) + otNameStartOffset;
        this.otName = saveFile.getStr(otNameOffset, 0xB, 7);

        const nicknameOffset = (index * 0xB) + nicknameStartOffset;
        this.nickname = saveFile.getStr(nicknameOffset, 0xB, 10);

        return it;
    }

    public save(saveFile: SaveFileService,
        startOffset: number,
        nicknameStartOffset: number,
        otNameStartOffset: number,
        index: number,
        recordSize: number = 0x21): SaveFileIterator {

        // Retrieve stored internals
        const offset = (recordSize * index) + startOffset;
        const it: SaveFileIterator = saveFile.iterator.offsetTo(offset);
        const otNameOffset = (index * 0xB) + otNameStartOffset;
        const nicknameOffset = (index * 0xB) + nicknameStartOffset;

        // Re-save back
        it.setByte(this.species);
        it.setWord(this.hp);
        it.setByte(this.level);
        it.setByte(this.status);
        it.setByte(this.type1);

        if (this.type2 == 0xFF)
            it.setByte(this.type1);
        else
            it.setByte(this.type2);

        it.setByte(this.catchRate);

        for (let i = 0; i < 4; i++) {
            it.setByte(this.moves[i].moveID);
        }

        it.setHex(2, this.otID, false);

        let exp = this.exp;

        it.setByte(exp & 0xFF);
        exp >>= 8;

        it.setByte(exp & 0xFF);
        exp >>= 8;

        it.setByte(exp & 0xFF);

        it.setWord(this.hpExp);
        it.setWord(this.attackExp);
        it.setWord(this.defenseExp);
        it.setWord(this.speedExp);
        it.setWord(this.specialExp);

        let dv = 0;
        dv |= (this.dv.attack << 12);
        dv |= (this.dv.defense << 8);
        dv |= (this.dv.speed << 4);
        dv |= this.dv.special;
        it.setWord(dv);

        for (let i = 0; i < 4; i++) {
            const move = this.moves[i];
            const ppCombined = (move.ppUp << 6) | move.pp;
            it.setByte(ppCombined);
        }

        saveFile.setStr(otNameOffset, 0xB, 10, this.otName);
        saveFile.setStr(nicknameOffset, 0xB, 10, this.nickname);

        return it;
    }

    public species: number = 0;
    public hp: number = 0;
    public level: number = 0;

    // Pokemon Status codes are a bit weird
    // The game programatically allows one, more, or all status afflections to
    // be active at any given time however the game only ever uses one at a time
    // and never makes use of more than one at the same time despite the fact
    // the codes there to make it happen

    // Raw status byte
    // The only used numbers would ever be at any time via normal gameplay are
    // 0 - No status
    // 1-7 - Sleep Turns Left
    // 8 - Poisoned
    // 16 - Burned
    // 32 - Frozen
    // 64 - Paralyzed
    public status: number = 0;

    public type1: number = 0;
    public type2: number = 0;
    public catchRate: number = 0;
    public moves: {
        moveID: number;
        pp: number;
        ppUp: number;
    }[] = [{
        moveID: 0,
        pp: 0,
        ppUp: 0
    }, {
        moveID: 0,
        pp: 0,
        ppUp: 0
    }, {
        moveID: 0,
        pp: 0,
        ppUp: 0
    }, {
        moveID: 0,
        pp: 0,
        ppUp: 0
    }];
    public otID: string = "0000";
    public exp: number = 0;
    public hpExp: number = 0;
    public attackExp: number = 0;
    public defenseExp: number = 0;
    public speedExp: number = 0;
    public specialExp: number = 0;
    public dv = {
        attack: 0 as number,
        defense: 0 as number,
        speed: 0 as number,
        special: 0 as number
    };
    public otName: string = "";
    public nickname: string = "";
}
