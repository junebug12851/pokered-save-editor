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

@Component({
    selector: 'screen-player-pokemon',
    templateUrl: './player-pokemon.component.pug',
    styleUrls: ['./player-pokemon.component.scss'],
})
export class PlayerPokemonComponent {
    constructor(
        public fileService: SaveFileService,
    ) { }

    get entries() {
        return this.fileService.fileDataExpanded.player.playerParty;
    }

    onAdd() {
        this.fileService.fileDataExpanded.player.playerParty.push(PokemonParty.empty);
    }

    onRem(i: number) {
        this.fileService.fileDataExpanded.player.playerParty.splice(i, 1);
    }

    onFullView(entry: PokemonParty) {
        if (this.fullView == entry)
            this.fullView = null;
        else
            this.fullView = entry;
    }

    public fullView: PokemonParty | null = null;
}
