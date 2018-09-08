import { Pokemon } from './../../../assets/data/pokemon.d';
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

import { Component, Input, Output, EventEmitter } from '@angular/core';

import {
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

declare var window: {
    require: any;
};

const _ = window.require("lodash");

@Component({
    selector: 'select-species',
    templateUrl: './select-species.component.pug',
    styleUrls: ['./select-species.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectSpeciesComponent, multi: true }
    ],
})
export class SelectSpeciesComponent extends ValueAccessorBase<string> {

    constructor(
        public gd: GameDataService
    ) {
        super();
    }

    @Input()
    public disabled: boolean = false;

    @Input()
    public label: string = "";

    @Output()
    public speciesChange: EventEmitter<number> = new EventEmitter();

    get speciesList() {
        const pokemon: Pokemon = this.gd.file("pokemon").data;

        let speciesListPokedex: Pokemon[] = _.filter(pokemon, (value: Pokemon) => {
            if (value.pokedex !== undefined)
                return true;

            return false;
        });

        speciesListPokedex = _.sortBy(speciesListPokedex, ['pokedex']);

        let speciesListGlitch = _.filter(pokemon, (value: Pokemon) => {
            if (value.glitch)
                return true;

            return false;
        });

        return [
            { name: "--- Pokedex Species ---", ind: 0x00, disable: true },
            ...speciesListPokedex,
            { name: "--- Glitch Species ---", ind: 0x00, disable: true },
            ...speciesListGlitch,
        ];
    }

    public onSpeciesChange(val: number) {
        this.speciesChange.emit(val);
    }

    speciesTracking(index: number) {
        return index; // or item.id
    }
}
