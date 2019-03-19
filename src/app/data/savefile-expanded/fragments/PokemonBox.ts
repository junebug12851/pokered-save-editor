import { SaveFileIterator } from './../SaveFileIterator';
import { SaveFileService } from './../../savefile.service';
import {Pokemon} from '../../../../assets/data/pokemon';
import { GameDataService } from '../../gameData.service';
import { PokemonDBService } from '../../pokemonDB.service';

// @ts-ignore
const _ = window.require("lodash");

export class PokemonBox {
    constructor(saveFile?: SaveFileService,
        startOffset?: number,
        nicknameStartOffset?: number,
        otNameStartOffset?: number,
        index?: number,
        recordSize?: number) {

        this.gd = new GameDataService();
        this.pkmnArr = this.gd.file("pokemon").data;

        if (saveFile !== undefined) {
            this.load(
                saveFile as SaveFileService,
                startOffset as number,
                nicknameStartOffset as number,
                otNameStartOffset as number,
                index as number,
                recordSize as number
            );
        }

        // Pokemon box data structure complete, Ready for Pokemon Party to
        // takeover
    }

    // Creates a new Pokemon of a random starter-like species without a nickname
    // and not traded. Depending on the species everything else is filled out
    // accordingly such as the chosen species type, catch rate, and initial moves
    // the level is level 5
    // The random species chosen is a base evolution species that's not legendary
    static newPokemon(file: SaveFileService, pdb: PokemonDBService, gd: GameDataService) {
        const pkmn = new PokemonBox();
        const pkmnList = gd.file("randomPkmn").data;
        const pkmnData = pdb.pokemon[_.snakeCase(pkmnList[_.random(0, pkmnList.length, false)])];

        pkmn.species = pkmnData.ind;
        pkmn.level = 5;

        if(pkmnData.type1 !== undefined)
            pkmn.type1 = pkmnData.type1.ind;

        if(pkmnData.type2 !== undefined)
            pkmn.type2 = pkmnData.type2.ind;

        if(pkmn.type1 == pkmn.type2)
            pkmn.type2 = 0xFF;

        for(let i = 0; i < 4; i++) {
            if(pkmnData.initial == undefined)
                continue;

            pkmn.moves[i].moveID = (pkmnData.initial[i]) ? pkmnData.initial[i].ind : 0;
            pkmn.moves[i].pp = (pkmnData.initial[i]) ? pkmnData.initial[i].pp : 0;
            pkmn.moves[i].ppUp = 0;
        }

        pkmn.otID = file.fileDataExpanded.player.basics.playerID;
        pkmn.otName = file.fileDataExpanded.player.basics.playerName;

        pkmn.dv.attack = _.random(0, 15, false);
        pkmn.dv.defense = _.random(0, 15, false);
        pkmn.dv.speed = _.random(0, 15, false);
        pkmn.dv.special = _.random(0, 15, false);

        let nickname = pkmnData.name.toUpperCase();
        if(nickname == "NIDORAN<F>")
            nickname = "NIDORAN<f>"
        else if(nickname == "NIDORAN<M>")
            nickname = "NIDORAN<m>"

        pkmn.nickname = nickname;

        if(pkmnData.catchRate !== undefined)
            pkmn.catchRate = pkmnData.catchRate;

        pkmn.hp = pkmn.hpStat;
        pkmn.updateExp();

        return pkmn;
    }

    public load(saveFile: SaveFileService,
        startOffset: number,
        nicknameStartOffset: number,
        otNameStartOffset: number,
        index: number,

        // Unless overridden, the record size for box data is 0x21
        recordSize: number = 0x21): SaveFileIterator {

        // Grab Pokemon Records
        // These are globally cached so theres no memory issues
        // this.pkmnArr = saveFile.gd.file("pokemon").data;

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
        // Also mark if it was explicitly marked no in-game
        if (this.type2 === 0xFF) {
            this.type2ExplicitNo = true;
        } else if (this.type1 === this.type2) {
            this.type2 = 0xFF;
        }

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
        speciesStartOffset: number | null,
        nicknameStartOffset: number,
        otNameStartOffset: number,
        index: number,
        recordSize: number = 0x21): SaveFileIterator {

        // Retrieve stored internals
        const offset = (recordSize * index) + startOffset;
        const it: SaveFileIterator = saveFile.iterator.offsetTo(offset);
        const otNameOffset = (index * 0xB) + otNameStartOffset;
        const nicknameOffset = (index * 0xB) + nicknameStartOffset;

        // Add species to species list if exists
        if(speciesStartOffset !== null) {
            const speciesOffset = index + speciesStartOffset;
            saveFile.setByte(speciesOffset, this.species);
        }

        // Re-save back
        it.setByte(this.species);
        it.setWord(this.hp);

        // Don't save level to BoxData if this is in the party
        // This honors the global don't touch policy
        // which is don't touch any bits that don't need to be changed
        if (recordSize === 0x21) {
            it.setByte(this.level);
        } else {
            it.inc();
        }

        it.setByte(this.status);
        it.setByte(this.type1);

        // If type 2 explicit no then just write what's in type 2
        if (this.type2ExplicitNo) {
            it.setByte(this.type2);

            // If type 2 is not explicitly no but implicitly no (Type 1 and 2 were marked the same)
            // save it as type 1
        } else if (this.type2 === 0xFF) {
            it.setByte(this.type1);

            // Else just save type 2
        } else {
            it.setByte(this.type2);
        }

        it.setByte(this.catchRate);

        for (let i = 0; i < 4; i++) {
            it.setByte(this.moves[i].moveID);
        }

        it.setHex(2, this.otID, false);

        const exp = this.exp;

        it.setByte((exp & 0xFF0000) >> 16);
        it.setByte((exp & 0x00FF00) >> 8);
        it.setByte(exp & 0x0000FF);

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

    // Is this a valid Pokemon? (Is it even in the Pokedex?)
    // If not returns false, otherwise returns Pokemon Record
    public get isValidPokemon() {
        // Get Pokemon Record
        // The Pokemon Array is organized by species ID with 1 top entry missing
        // thus offset by 1 accordingly
        let record = this.pkmnArr[this.species - 1];

        // Check it's a valid Pokemon (not glitch)
        if(record == undefined || record.pokedex == null || record.pokedex == undefined)
            return false;

        return record;
    }

    // Correctly Converts level to Pokemon Exp
    public levelToExp(level: number = this.level): number {
        let record = this.isValidPokemon;
        let exp = 0;

        // Proceed only if it's valid
        if(record === false)
            return exp;

        // Obtain it's growth rate and calculate accordingly it's exp for the given level
        const gr = record.growthRate;

        // Growth Rate 0: Medium Fast
        if(gr == 0)
            exp = Math.pow(level, 3);

        // Growth Rate 3: Medium Slow
        else if(gr == 3)
            exp = (1.2 * Math.pow(level, 3)) - (15 * Math.pow(level, 2)) + (100*level) - 140;

        // Growth Rate 4: Fast
        else if(gr == 4)
            exp = (4 * Math.pow(level, 3)) / 5

        // Growth Rate 5: Slow
        else if(gr == 5)
            exp = (5 * Math.pow(level, 3)) / 4

        // Return EXP
        return Math.floor(exp);
    }

    public get expStart() {
        if(this.isValidPokemon === false)
            return this.exp;

        return this.levelToExp((this.level < 100) ? this.level : 100);
    }

    public get expEnd() {
        if(this.isValidPokemon === false)
            return this.exp;

        return this.levelToExp((this.level < 100) ? this.level + 1 : 100) - 1;
    }

    // Percent of current exp to level between 0-1
    public get expPercent() {
        if(this.isValidPokemon === false)
            return 0;

        if(this.level >= 100)
            return 1;

        const exp = this.exp - this.expStart;
        const expEnd = this.expEnd - this.expStart;

        // Return percentage
        return exp / expEnd;
    }

    // Resets EXP to start of current level and current species
    public updateExp() {
        if(this.isValidPokemon === false)
            return;

        this.exp = this.expStart;
    }

    // Gets HP DV based on other DV's
    public get hpDV() {
        let hpDv = 0;

        if((this.dv.attack % 2) !== 0)
            hpDv |= 8;

        if((this.dv.defense % 2) !== 0)
            hpDv |= 4;

        if((this.dv.speed % 2) !== 0)
            hpDv |= 2;

        if((this.dv.special % 2) !== 0)
            hpDv |= 1;

        return hpDv;
    }

    public get hpStat() {
        const record = this.isValidPokemon;

        // Proceed only if it's valid
        if(record === false || record.baseHp == undefined)
            return 1;

        return Math.floor((((record.baseHp+this.hpDV)*2+Math.floor(Math.floor(Math.sqrt(this.hpExp))/4))*this.level)/100) + this.level + 10;
    }

    public getNonHPStat(statName: string, dv: number, ev: number) {
        const record = this.isValidPokemon;

        // Proceed only if it's valid
        if(record === false)
            return 0;

        const baseStat = record[statName] as number;
        return Math.floor((((baseStat+dv)*2+Math.floor(Math.floor(Math.sqrt(ev))/4))*this.level)/100) + 5;
    }

    public get attackStat() {
        return this.getNonHPStat("baseAttack", this.dv.attack, this.attackExp);
    }

    public get defenseStat() {
        return this.getNonHPStat("baseDefense", this.dv.defense, this.defenseExp);
    }

    public get speedStat() {
        return this.getNonHPStat("baseSpeed", this.dv.speed, this.speedExp);
    }

    public get specialStat() {
        return this.getNonHPStat("baseSpecial", this.dv.special, this.specialExp);
    }

    private pkmnArr: Pokemon[] = [];

    public species = 0;
    public hp = 0;
    public level = 0;

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
    public status = 0;

    public type1 = 0;
    public type2 = 0;

    // Sometimes type 2 is a duplicate of type 1 and
    // sometimes it's explicitly 0xFF, this is which one
    public type2ExplicitNo = false;

    public catchRate = 0;
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
    public otID = '0000';
    public exp = 0;
    public hpExp = 0;
    public attackExp = 0;
    public defenseExp = 0;
    public speedExp = 0;
    public specialExp = 0;
    public dv = {
        attack: 0 as number,
        defense: 0 as number,
        speed: 0 as number,
        special: 0 as number
    };
    public otName = '';
    public nickname = '';
    public gd: GameDataService;
}
