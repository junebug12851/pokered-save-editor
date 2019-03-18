import { Move } from './../../../assets/data/moves.d';
import { GameDataService } from './../../data/gameData.service';
import { ValueAccessorBase } from './../abstract/ValueAccessorBase';

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
import { PokemonDBService } from '../../data/pokemonDB.service';

import {
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

declare var window: {
    require: any;
};

const _ = window.require("lodash");

@Component({
    selector: 'select-moves',
    templateUrl: './select-moves.component.pug',
    styleUrls: ['./select-moves.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectMovesComponent, multi: true }
    ],
})
export class SelectMovesComponent extends ValueAccessorBase<string> {

    constructor(
        public gd: GameDataService,
        public pdb: PokemonDBService
    ) {
        super();
    }

    @Input()
    public disabled: boolean = false;

    @Input()
    public species: number | null = null;

    get pokemonData() {
        if(this.species == null)
            return undefined;

        return this.pdb.pokemon[this.species];
    }

    get movesList() {

        // Gather applicable Learnset (If Any)
        let learnset = [];
        if(this.pokemonData !== undefined && this.pokemonData.initial !== undefined)
            for (const learn of this.pokemonData.initial) {
                learnset.push({
                    name: `Level: 1 - ${learn.name}`,
                    ind: learn.ind
                });
            }

        if(this.pokemonData !== undefined && this.pokemonData.moves !== undefined)
            for (const learn of this.pokemonData.moves) {
                learnset.push({
                    name: `Level: ${learn.level} - ${learn.move.name}`,
                    ind: learn.move.ind
                });
            }

        // Gather applicable TM & HM's (If Any)
        let tmHms = [];
        if(this.pokemonData !== undefined && this.pokemonData.tmHm !== undefined)
            for (const tm of this.pokemonData.tmHm) {
                tmHms.push({
                    name: `${tm.tm.name}`,
                    ind: tm.ind
                });
            }

        const moves = this.gd.file("moves").data;

        let moveListReg = _.filter(moves, (value: Move) => {
            if (!value.glitch)
                return true;

            return false;
        });

        moveListReg = _.sortBy(moveListReg, ['name']);

        let moveListGlitch = _.filter(moves, (value: Move) => {
            if (value.glitch)
                return true;

            return false;
        });

        moveListGlitch = _.sortBy(moveListGlitch, ['name']);

        const ret = [
            { name: "--- All Regular Moves ---", ind: 0x00, disable: true },
            ...moveListReg,
            { name: "--- All Glitch Moves ---", ind: 0x00, disable: true },
            ...moveListGlitch,
        ];

        if(tmHms.length > 0) {
            ret.unshift(...tmHms);
            ret.unshift({name: "--- Learnable TM/HMs ---", ind: 0x00, disable: true});
        }

        if(learnset.length > 0) {
            ret.unshift(...learnset);
            ret.unshift({name: "--- Learnable Moves ---", ind: 0x00, disable: true});
        }

        return ret;
    }

    getTooltip(move: any) {
        const moveData = this.pdb.moves[move.ind];
        
        if(moveData === undefined || moveData.glitch)
            return "";

        const power = (moveData.power && moveData.power > 1) ? moveData.power : "---";
        const type = (moveData.type) ? _.startCase(_.lowerCase(moveData.type.name)) : "---";
        const accuracy = (moveData.accuracy) ? `${moveData.accuracy}%` : "---";
        const pp = (moveData.pp) ? moveData.pp : "---";
        
        return `Power:${power} Type:${type} Accuracy:${accuracy} PP:${pp}`;
    }

    movesTracking(index: number) {
        return `${index}-${this.species}`;
    }
}
