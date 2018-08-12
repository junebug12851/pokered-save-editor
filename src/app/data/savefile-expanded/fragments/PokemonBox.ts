import { PokemonService } from './../../pokemon.service';
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
        this.saveFile = saveFile;

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
        this.statusByte = statusByte;

        this.statusCode = 0;
        if (this.status.SLP > 0)
            this.statusCode = 1;
        else if (this.status.PSN)
            this.statusCode = 2;
        else if (this.status.BRN)
            this.statusCode = 3;
        else if (this.status.FRZ)
            this.statusCode = 4;
        else if (this.status.PAR)
            this.statusCode = 5;

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
        this.originalName = this.nickname;

        const pokemonList = new PokemonService();

        // If the nickname isn't the same as the species name then auto-mark editable
        if (this.species != 0x00) {
            this.nicknameEdit = this.nickname != pokemonList.lookupIndex[this.species].name.toUpperCase();
            this.onNameChange();
        }

        // Pokemon box data structure complete, Ready for Pokemon Party to
        // takeover
    }

    onNameChange() {
        // Convert player name to bytes and retrieve in-game simulation html
        this.nicknameInternal = this.saveFile.saveText.convertToCode(
            this.nickname,
            10,
            /*this.saveFile.fileDataExpanded.rival.rivalName*/);

        this.nicknameFontStr =
            this.saveFile.saveText.convertEngToHTML(this.nickname, 10);
    }

    public offset: number;
    public nicknameStartOffset: number;
    public otNameStartOffset: number;
    public index: number;
    public it: SaveFileIterator;
    public saveFile: any;

    public species: number;
    public hp: number;
    public boxLevel: number;

    // Pokemon Status codes are a bit weird
    // The game programatically allows one, more, or all status afflections to
    // be active at any given time however the game only ever uses one at a time
    // and never makes use of more than one at the same time despite the fact
    // the codes there to make it happen

    // This is the actual status flags set or unset even though, in normal
    // gameplay, only 1 will be set
    public status: {
        SLP: number, // Number of sleep turns left
        PSN: boolean,
        BRN: boolean,
        FRZ: boolean,
        PAR: boolean
    };

    // This is the raw status byte
    public statusByte: number;

    // This is a special code to simply all this mess and assume normal gameplay
    // by using only one status code. If more than one are active it will only
    // keep the first one found starting with SLP and moving towards PAR
    // 0 - No status
    // 1 - Sleep (Reference status.SLP for turn count left)
    // 2 - Poisoned
    // 3 - Burned
    // 4 - Frozen
    // 5 - Paralyzed
    public statusCode: number;

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

    // Auto sets if the nickname field should be editable but is changeable
    // It's editable if it's condiered a nickname and its a nickname if the
    // species name in all capital letters does not match the Pokemon name
    public nicknameEdit: boolean = true;
    public nickname: string;

    // The unedited nickname/regular name (The original backup)
    public originalName: string;

    // Used for font string generation
    public nicknameInternal: Uint8Array = new Uint8Array([0x80]);
    public nicknameFontStr: string = "";
}
