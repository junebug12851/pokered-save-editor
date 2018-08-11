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

        const statusByte = it.getByte();
        this.status = {
            // Number of turns left
            SLP: statusByte & 0b00000111,
            PSN: (statusByte & 0b00001000) > 0,
            BRN: (statusByte & 0b00010000) > 0,
            FRZ: (statusByte & 0b00100000) > 0,
            PAR: (statusByte & 0b01000000) > 0,
        };

        this.type1 = it.getByte();
        this.type2 = it.getByte();
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
                ppUp: 0b1100000000
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

    public offset: number;
    public nicknameStartOffset: number;
    public otNameStartOffset: number;
    public index: number;
    public it: SaveFileIterator;

    public species: number;
    public hp: number;
    public boxLevel: number;
    public status: {
        SLP: number, // Number of sleep turns left
        PSN: boolean,
        BRN: boolean,
        FRZ: boolean,
        PAR: boolean
    };
    public type1: number;
    public type2: number;
    public catchRate: number;
    public moves: {
        moveID: number;
        pp: number;
        ppUp: number;
    }[];
    public otID: number;
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
