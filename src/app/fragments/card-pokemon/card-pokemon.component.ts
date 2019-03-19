import { OnInit, Output, EventEmitter } from '@angular/core';

/**
   Copyright 2018 June Hanabi

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

import { Component, Input } from '@angular/core';
import { PokemonParty } from '../../data/savefile-expanded/fragments/PokemonParty';
import {GameDataService} from '../../data/gameData.service';
import {PokemonDBService} from '../../data/pokemonDB.service';
import { MatSliderChange } from '@angular/material';
import { SaveFileService } from '../../data/savefile.service';
import {MatSnackBar} from '@angular/material';

// @ts-ignore
const _ = window.require("lodash");

@Component({
    selector: 'card-pokemon',
    templateUrl: './card-pokemon.component.pug',
    styleUrls: ['./card-pokemon.component.scss'],
})
export class CardPokemonComponent implements OnInit {

    constructor(
        public gd: GameDataService,
        public pdb: PokemonDBService,
        public file: SaveFileService,
        private snackBar: MatSnackBar
    ) {

    }

    ngOnInit() {}

    notify(message: string) {
        this.snackBar.open(message, '', {
            duration: 2 * 1000,
        });
    }

    public onSpeciesChange() {
        this.updateData();

        const species = this.pdb.pokemon[this.entry.species];
        if(species == undefined || species.name == undefined)
            return;

        if(species.type1 !== undefined)
            this.entry.type1 = species.type1.ind;

        if(species.type2 !== undefined)
            this.entry.type2 = species.type2.ind;

        if(this.entry.type1 == this.entry.type2)
            this.entry.type2 = 0xFF;

        if(species.catchRate !== undefined)
            this.entry.catchRate = species.catchRate;

        const nickname = this.entry.nickname;
        let changeNick = false;

        if(nickname != "") {
            for(let i = 0; i <= this.pdb.rawPokemon.length; i++) {
                const pkmnEntry = this.pdb.pokemon[i];
                if(pkmnEntry == undefined || pkmnEntry.name == undefined)
                    continue;
    
                let pkmnEntryName = pkmnEntry.name.toUpperCase();
                if(pkmnEntryName == "NIDORAN<F>")
                    pkmnEntryName = "NIDORAN<f>"
                else if(pkmnEntryName == "NIDORAN<M>")
                    pkmnEntryName = "NIDORAN<m>"
    
                if(nickname == pkmnEntryName) {
                    changeNick = true;
                    break;
                }
            }
        }
        else
            changeNick = true;
        
        if(!changeNick)
            return;

        this.entry.nickname = species.name.toUpperCase();
        if(this.entry.nickname == "NIDORAN<F>")
            this.entry.nickname = "NIDORAN<f>"
        else if(this.entry.nickname == "NIDORAN<M>")
            this.entry.nickname = "NIDORAN<m>"
    }

    public updateData() {
        this.entry.updateExp();

        if(this.entry.updateStats)
            this.entry.updateStats();

        if(this.entry.hp > (this.entry.maxHP || this.entry.hpStat))
            this.entry.hp = (this.entry.maxHP || this.entry.hpStat);
    }

    public updateHP(event: MatSliderChange) {
        this.entry.hp = event.value;
    }

    public setScreen(name: string) {
        this.screen = name;
    }

    public maxPP(moveId: number, move: any) {
        const moveEntry = this.pdb.moves[moveId];
        if(moveEntry == undefined)
            return "??";

        const pp = moveEntry.pp;
        if(pp == undefined)
            return "??";

        const ppUp = move.ppUp;
        const ppUpPercent = (ppUp * 0.2) + 1;

        return Math.floor(pp * ppUpPercent);
    }

    onPpUpChange(move: any) {
        const maxPP = this.maxPP(move.moveID, move);
        if(maxPP == "??")
            return;

        if(move.pp > maxPP)
            move.pp = maxPP;
    }

    onMoveChange(newVal: number, move: any) {
        const moveEntry = this.pdb.moves[newVal];
        if(moveEntry == undefined)
            return;

        if(moveEntry.glitch == true)
            return;

        const maxPP = this.maxPP(newVal, move);
        if(maxPP == "??")
            return;

        if(move.pp > maxPP)
            move.pp = maxPP;
    }

    get isMaxLevel() {
        return this.entry.level >= 100;
    }

    doMaxLevel() {
        this.entry.level = 100;
        this.updateData();
    }

    get isHealed() {
        const hpHealed = (this.entry.hp == (this.entry.maxHP || this.entry.hpStat));
        const statusHealed = this.entry.status == 0;
        let ppFull = true;
        for(let i = 0; i < this.entry.moves.length; i++) {
            const maxPP = this.maxPP(this.entry.moves[i].moveID, this.entry.moves[i]);
            if(maxPP != "??") {
                if(this.entry.moves[i].pp != maxPP)
                    ppFull = false;
            }
        }

        return hpHealed && statusHealed && ppFull;
    }

    doHeal() {
        this.entry.hp = this.entry.maxHP || this.entry.hpStat;
        this.entry.status = 0;
        for(let i = 0; i < this.entry.moves.length; i++) {
            const maxPP = this.maxPP(this.entry.moves[i].moveID, this.entry.moves[i]);
            if(maxPP != "??")
                this.entry.moves[i].pp = maxPP;
        }
    }

    get isMaxPPUps() {
        let ppUpsFull = true;
        for(let i = 0; i < this.entry.moves.length; i++) {
            const maxPP = this.maxPP(this.entry.moves[i].moveID, this.entry.moves[i]);
            if(maxPP != "??") {
                if(this.entry.moves[i].ppUp < 3)
                    ppUpsFull = false;
            }
        }

        return ppUpsFull;
    }

    maxPPUps() {
        for(let i = 0; i < this.entry.moves.length; i++) {
            const maxPP = this.maxPP(this.entry.moves[i].moveID, this.entry.moves[i]);
            if(maxPP != "??")
                this.entry.moves[i].ppUp = 3;
        }
    }

    get isMaxEVs() {
        return this.entry.hpExp == 0xFFFF &&
            this.entry.attackExp == 0xFFFF &&
            this.entry.defenseExp == 0xFFFF &&
            this.entry.speedExp == 0xFFFF &&
            this.entry.specialExp == 0xFFFF;
    }

    doMaxEVs() {
        this.entry.hpExp = 0xFFFF;
        this.entry.attackExp = 0xFFFF;
        this.entry.defenseExp = 0xFFFF;
        this.entry.speedExp = 0xFFFF;
        this.entry.specialExp = 0xFFFF;
        this.updateData();
    }

    get isMinEVs() {
        return this.entry.hpExp == 0 &&
            this.entry.attackExp == 0 &&
            this.entry.defenseExp == 0 &&
            this.entry.speedExp == 0 &&
            this.entry.specialExp == 0;
    }

    doResetEVs() {
        this.entry.hpExp = 0;
        this.entry.attackExp = 0;
        this.entry.defenseExp = 0;
        this.entry.speedExp = 0;
        this.entry.specialExp = 0;
        this.updateData();
    }

    get isMaxDVs() {
        return this.entry.dv.attack == 15 &&
            this.entry.dv.defense == 15 &&
            this.entry.dv.speed == 15 &&
            this.entry.dv.special == 15;
    }

    doMaxDVs() {
        this.entry.dv.attack = 15;
        this.entry.dv.defense = 15;
        this.entry.dv.speed = 15;
        this.entry.dv.special = 15;
        this.updateData();
    }

    doReRollDVs() {
        this.entry.dv.attack = _.random(0, 15, false);
        this.entry.dv.defense = _.random(0, 15, false);
        this.entry.dv.speed = _.random(0, 15, false);
        this.entry.dv.special = _.random(0, 15, false);
        this.updateData();
    }

    get isFullyMaxed() {
        return this.isMaxLevel && 
            this.isHealed &&
            this.isMaxPPUps &&
            this.isMaxEVs &&
            this.isMaxDVs;
    }

    doFullyMaxed() {
        this.doMaxLevel();
        this.maxPPUps();
        this.doMaxEVs();
        this.doMaxDVs();

        this.doHeal();
    }

    get isFullyReset() {

        const monData = this.pdb.pokemon[this.entry.species];
        if(monData == undefined)
            return null;

        let movesReset = true;
        
        for(let i = 0; i < 4; i++) {
            if(monData.initial == undefined)
                continue;

            movesReset = this.entry.moves[i].moveID == (monData.initial[i]) ? monData.initial[i].ind : 0;
            if(!movesReset)
                break;

            movesReset = this.entry.moves[i].pp == 0;
            if(!movesReset)
                break;

            movesReset = this.entry.moves[i].ppUp == 0;
            if(!movesReset)
                break;
        }

        return this.entry.level == 5 && movesReset && this.isMinEVs && this.isHealed;
    }

    doFullReset() {
        this.entry.level = 5;

        const monData = this.pdb.pokemon[this.entry.species];
        if(monData == undefined)
            return;
        
        for(let i = 0; i < 4; i++) {
            if(monData.initial == undefined)
                continue;

            this.entry.moves[i].moveID = (monData.initial[i]) ? monData.initial[i].ind : 0;
            this.entry.moves[i].pp = 0;
            this.entry.moves[i].ppUp = 0;
        }

        this.doResetEVs();

        this.doHeal();
        this.updateData();
    }

    get isTradedMon() {
        return (this.entry.otID != this.file.fileDataExpanded.player.basics.playerID) ||
            (this.entry.otName != this.file.fileDataExpanded.player.basics.playerName)
    }

    makeTradeMon() {
        const names: string[] = this.gd.file("names").data;
        this.entry.otID = _.random(0, 0xFFFF, false).toString(16).toUpperCase().padStart(4, "0");
        this.entry.otName = names[_.random(0, names.length - 1, false)];
    }

    makeOwnMon() {
        this.entry.otID = this.file.fileDataExpanded.player.basics.playerID;
        this.entry.otName = this.file.fileDataExpanded.player.basics.playerName;
    }

    get isNicknamed() {
        const species = this.pdb.pokemon[this.entry.species];
        if(species == undefined || species.name == undefined)
            return null;

        let nickname = species.name.toUpperCase();
        if(nickname == "NIDORAN<F>")
            nickname = "NIDORAN<f>"
        else if(nickname == "NIDORAN<M>")
            nickname = "NIDORAN<m>"

        if(this.entry.nickname == nickname)
            return false;
        
        return true;
    }

    makeNickname() {
        const names: string[] = this.gd.file("names").data;
        this.entry.nickname = names[_.random(0, names.length - 1, false)];
    }

    makeOwnName() {
        const species = this.pdb.pokemon[this.entry.species];
        if(species == undefined || species.name == undefined)
            return;

        let nickname = species.name.toUpperCase();
        if(nickname == "NIDORAN<F>")
            nickname = "NIDORAN<f>"
        else if(nickname == "NIDORAN<M>")
            nickname = "NIDORAN<m>"

        this.entry.nickname = nickname;
    }

    @Input()
    public entry: any = new PokemonParty();

    @Input()
    public disabled: boolean = false;

    @Input()
    public partyMon: boolean = true;

    @Output()
    public onWithdrawDeposit: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    public rem: EventEmitter<any> = new EventEmitter<any>();

    // Current screen to display
    public screen: string = "basics/name";
}
