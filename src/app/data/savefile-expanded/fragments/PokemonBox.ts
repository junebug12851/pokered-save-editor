import { SaveFileIterator } from './../SaveFileIterator';
import { SaveFileService } from './../../savefile.service';

export class PokemonBox {
    constructor(saveFile: SaveFileService,
        startOffset: number,
        nicknameStartOffset: number,
        otNameStartOffset: number,
        index: number,

        // Unless overridden, the record size for box data is 0x21
        recordSize: number = 0x21) {

        this.startOffset = startOffset;
        this.nicknameStartOffset = nicknameStartOffset;
        this.otNameStartOffset = otNameStartOffset;
        this.index = index;
        this.saveFile = saveFile;

        // Calculate record offset
        this.offset = (recordSize * index) + startOffset;

        const it: SaveFileIterator = saveFile.iterator.offsetTo(this.offset);

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
                ppUp: (pp & 0b1100000000) >> 6
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

        // Pokemon box data structure complete, Ready for Pokemon Party to
        // takeover
    }

    public static get emptyData() {
        return {
            species: 0,
            hp: 0,
            level: 0,
            statusByte: 0,
            type1: 0,
            type2: 0,
            catchRate: 0,
            moves: [{
                moveID: 0,
                pp: 0,
                ppUP: 0,
            }, {
                moveID: 0,
                pp: 0,
                ppUP: 0,
            }, {
                moveID: 0,
                pp: 0,
                ppUP: 0,
            }, {
                moveID: 0,
                pp: 0,
                ppUP: 0,
            }],
            otID: "0000",
            exp: 0,
            hpExp: 0,
            attackExp: 0,
            defenseExp: 0,
            speedExp: 0,
            specialExp: 0,
            dv: {
                attack: 0,
                defense: 0,
                speed: 0,
                special: 0,
            },
            otName: "",
            nickname: ""
        };
    }

    public startOffset: number;
    public offset: number;
    public nicknameStartOffset: number;
    public otNameStartOffset: number;
    public index: number;
    public it: SaveFileIterator;
    public saveFile: any;

    public species: number;
    public hp: number;
    public level: number;

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
    public status: number;

    public type1: number;
    public type2: number;
    public catchRate: number;
    public moves: {
        moveID: number;
        pp: number;
        ppUp: number;
    }[];
    public otID: string;
    public exp: number;
    public hpExp: number;
    public attackExp: number;
    public defenseExp: number;
    public speedExp: number;
    public specialExp: number;
    public dv: {
        attack: number,
        defense: number,
        speed: number,
        special: number
    };
    public otName: string;
    public nickname: string;
}
