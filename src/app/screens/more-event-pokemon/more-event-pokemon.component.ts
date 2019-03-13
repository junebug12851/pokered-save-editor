import { GameDataService } from './../../data/gameData.service';

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

 // @ts-ignore
const _: any = window.require("lodash");

import { Component, OnInit } from '@angular/core';
import { SaveFileService } from "../../data/savefile.service";
import { PokemonParty } from 'src/app/data/savefile-expanded/fragments/PokemonParty';
import {MatSnackBar} from '@angular/material';
import { EventPokemon } from 'src/assets/data/eventPokemon';
import { Pokemon } from 'src/assets/data/pokemon';
import { Move } from 'src/assets/data/moves';

@Component({
    selector: 'more-event-pokemon',
    templateUrl: './more-event-pokemon.component.pug',
    styleUrls: ['./more-event-pokemon.component.scss'],
})
export class MoreEventPokemon implements OnInit {

    constructor(
        public fileService: SaveFileService,
        public gd: GameDataService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {}

    notify(message: string) {
        this.snackBar.open(message, '', {
            duration: 2 * 1000,
        });
    }

    givePokemon(pkmn: PokemonParty): void {
        pkmn.updateExp();
        pkmn.updateStats();
        pkmn.hp = pkmn.hpStat;

        const f = this.fileService.fileDataExpanded;
        const curBox = f.storage.curBox;

        if(f.player.pokemon.playerParty.length < 6) {
            f.player.pokemon.playerParty.push(pkmn);
            this.notify("Event Pokemon was sent to your party");
        }
        else if(f.storage.pokemonBoxes[curBox].length < 20) {
            PokemonParty.convertToPokemonBox(pkmn);
            f.storage.pokemonBoxes[curBox].push(pkmn);
            this.notify("Event Pokemon was sent to your current box");
        }
        else {
            this.notify("No space in party or your current box");
        }
    }

    // Random integer inclusive to min and max
    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Gets a blank Pokemon with random DV's and OTID
    get pkmn() {
        const pkmn = new PokemonParty();
        pkmn.otID = Number(this.getRandomInt(0, 65535)).toString(16).padStart(4, "0").toUpperCase();
        pkmn.dv.attack = this.getRandomInt(0, 15);
        pkmn.dv.defense = this.getRandomInt(0, 15);
        pkmn.dv.speed = this.getRandomInt(0, 15);
        pkmn.dv.special = this.getRandomInt(0, 15);
        return pkmn;
    }

    // Get all events
    get rawEvents(): EventPokemon[] {
        return this.fileService.gd.file("eventPokemon").data;
    }

    // Get all Japanese events
    get jpRawEvents(): EventPokemon[] {
        return _.filter(this.rawEvents, ['region', 'Japan']);
    }

    // Get all European events
    get euRawEvents(): EventPokemon[] {
        return _.filter(this.rawEvents, ['region', 'Europe']);
    }

    // Get all types
    get rawTypes(): {
        name: string,
        ind: number
    }[] {
        return this.fileService.gd.file("types").data;
    }

    // Get all moves
    get rawMoves(): {
        name: string,
        ind: number,
        glitch?: true
    }[] {
        return this.fileService.gd.file("moves").data;
    }

    getType(typ: string) : number | null {
        const allTypes = this.rawTypes;

        for(let i = 0; i < allTypes.length; i++) {
            const typeEntry = allTypes[i];
            if(typeEntry.name.toUpperCase() == typ.toUpperCase())
                return typeEntry.ind;
        }

        return null;
    }

    getMove(move: string) : Move | null {
        const allMoves = this.rawMoves;

        for(let i = 0; i < allMoves.length; i++) {
            const moveEntry = allMoves[i];
            if(moveEntry.name.toUpperCase() == move.toUpperCase())
                return moveEntry;
        }

        return null;
    }

    // List tracking
    entriesTracking(index: number) {
        return index;
    }

    findPokemonRecord(name: String): Pokemon | null {
        const allPokemon = this.fileService.gd.file("pokemon").data as Pokemon[];

        for(let i = 0; i < allPokemon.length; i++) {
            const pkmnEntry = allPokemon[i];
            if(pkmnEntry.name == name)
                return pkmnEntry;
        }

        return null;
    }

    convertCase(str: string) {
        let newCase: string = _.startCase(_.lowerCase(str));

        if(newCase == "Mrmime")
            newCase = "Mr.Mime";
        else if(newCase == "Nidoranf")
            newCase = "Nidoran<f>";
        else if(newCase == "Nidoranm")
            newCase = "Nidoran<m>";

        return newCase;
    }

    // Gives the Pokemon
    genPokemonAndGive(entry: EventPokemon) {
        // Get a blank Pokemon with random DV's and OT ID
        const pkmn = this.pkmn;

        // Get Pokemon Record
        const nameRecord = this.findPokemonRecord(entry.pokemon);
        if(nameRecord == null)
            return;

        // Assign Species Number
        pkmn.species = nameRecord.ind;

        if(nameRecord.catchRate !== undefined)
            pkmn.catchRate = nameRecord.catchRate;

        // Assign Types 1 & 2
        if(nameRecord.type1 === undefined || nameRecord.type2 === undefined)
            return;

        let typeX = this.getType(nameRecord.type1);
        if(typeX === null)
            return;
        
        pkmn.type1 = typeX;

        typeX = this.getType(nameRecord.type2);
        if(typeX === null)
            return;

        pkmn.type2 = typeX;

        if(pkmn.type1 == pkmn.type2)
            pkmn.type2 = 0xFF;

        // Assign OT Name
        let otName = entry.otName;
        if(Array.isArray(entry.otName))
            otName = otName[this.getRandomInt(0, otName.length - 1)];

        // Handled Above
        // @ts-ignore
        pkmn.otName = otName;

        // OT ID if present, random otherwise
        if(entry.otID !== undefined)
            pkmn.otID = entry.otID;

        if(entry.dv != undefined && entry.dv == "max") {
            pkmn.dv.attack = 15;
            pkmn.dv.defense = 15;
            pkmn.dv.special = 15;
            pkmn.dv.speed = 15;
        }
        else if(entry.dv != undefined && entry.dv.startsWith(":")) {
            const dvs = entry.dv.split(":");
            dvs.shift();

            pkmn.dv.attack = parseInt(dvs[0]);
            pkmn.dv.defense = parseInt(dvs[1]);
            pkmn.dv.speed = parseInt(dvs[2]);
            pkmn.dv.special = parseInt(dvs[3]);
        }

        // Assign Nickname
        pkmn.nickname = nameRecord.name.toUpperCase();

        if(pkmn.nickname == "NIDORAN<M>")
            pkmn.nickname = "NIDORAN<m>";
        else if(pkmn.nickname == "NIDORAN<F>")
            pkmn.nickname = "NIDORAN<f>";

        // Assign Level
        pkmn.level = (entry.level) ? entry.level : 5;

        for(let i = 0; i < entry.moves.length; i++) {
            const move = entry.moves[i];
            const moveData = this.getMove(move);
            if(moveData == null)
                return;

            pkmn.moves[i].moveID = moveData.ind;
            if(moveData.pp !== undefined)
                pkmn.moves[i].pp = moveData.pp;
        }

        this.givePokemon(pkmn);
    }
}
