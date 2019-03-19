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
import { Component } from '@angular/core';
import { PokemonParty } from '../../data/savefile-expanded/fragments/PokemonParty';
import { PokemonDBService } from '../../data/pokemonDB.service';
import { PokemonBox } from '../../data/savefile-expanded/fragments/PokemonBox';
import { GameDataService } from '../../data/gameData.service';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'screen-player-pokemon',
    templateUrl: './player-pokemon.component.pug',
    styleUrls: ['./player-pokemon.component.scss'],
})
export class PlayerPokemonComponent {
    constructor(
        public fileService: SaveFileService,
        public pdb: PokemonDBService,
        public gd: GameDataService,
        private snackBar: MatSnackBar
    ) { }

    notify(message: string) {
        this.snackBar.open(message, '', {
            duration: 2 * 1000,
        });
    }

    get entries() {
        return this.fileService.fileDataExpanded.player.pokemon.playerParty;
    }

    onAdd() {
        const pkmn = PokemonBox.newPokemon(this.fileService, this.pdb, this.gd) as PokemonParty;
        PokemonParty.convertToPokemonParty(pkmn);
        this.fileService.fileDataExpanded.player.pokemon.playerParty.push(pkmn);
    }

    onRem(i: number) {
        this.fileService.fileDataExpanded.player.pokemon.playerParty.splice(i, 1);
    }

    onDeposit(i: number) {
        const curBox = this.fileService.fileDataExpanded.storage.pokemonBoxes[
            this.fileService.fileDataExpanded.storage.curBox
        ];

        if(curBox.length >= 20)
            return this.notify("Current Box is full");

        const pkmn = this.fileService.fileDataExpanded.player.pokemon.playerParty.splice(i, 1)[0];
        PokemonParty.convertToPokemonBox(pkmn);
        this.fileService.fileDataExpanded.storage.pokemonBoxes[
            this.fileService.fileDataExpanded.storage.curBox
        ].push(pkmn);

        return this.notify("Deposited Pokemon into current box");
    }
}
