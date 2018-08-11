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

import { SaveFileService } from './../../data/savefile.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { PokemonService, RawEntry } from '../../data/pokemon.service';

declare var window: {
    require: any;
}

declare var M: any;
declare var $: any;
const _: any = window.require("lodash");

@Component({
    selector: 'screen-player-pokemon',
    templateUrl: './player-pokemon.component.pug',
    styleUrls: ['./player-pokemon.component.scss'],
})
export class PlayerPokemonComponent implements OnInit, OnChanges {
    constructor(
        public fileService: SaveFileService,
        public pokemonService: PokemonService,
    ) { }

    ngOnInit() {
        M.updateTextFields();
        $('.tabs').tabs();
    }

    ngOnChanges() {
        M.updateTextFields();
    }

    get entries() {
        return this.fileService.fileDataExpanded.player.playerParty;
    }

    get speciesList() {
        let speciesListPokedex = this.pokemonService.lookupPokedex;

        let speciesListGlitch = _.filter(this.pokemonService.rawEntries, (value: RawEntry) => {
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
}
