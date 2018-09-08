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

import { Component } from '@angular/core';
import { SaveFileService } from "../../data/savefile.service";

@Component({
    selector: 'screen-area-pokemon',
    templateUrl: './area-pokemon.component.pug',
    styleUrls: ['./area-pokemon.component.scss'],
})
export class AreaPokemonComponent {

    constructor(
        public fileService: SaveFileService,
    ) { }

    get grassEntries() {
        return this.fileService.fileDataExpanded.area.grassPokemon;
    }

    get waterEntries() {
        return this.fileService.fileDataExpanded.area.waterPokemon;
    }

    addGrassEntry() {
        this.fileService.fileDataExpanded.area.grassPokemon.push({
            level: 0,
            pokemon: 0,
        });
    }

    addWaterEntry() {
        this.fileService.fileDataExpanded.area.waterPokemon.push({
            level: 0,
            pokemon: 0,
        });
    }

    remGrassEntry(index: number) {
        this.fileService.fileDataExpanded.area.grassPokemon.splice(index, 1);
    }

    remWaterEntry(index: number) {
        this.fileService.fileDataExpanded.area.grassPokemon.splice(index, 1);
    }

    grassRateClick() {
        if (this.fileService.fileDataExpanded.area.grassRate > 0)
            this.fileService.fileDataExpanded.area.grassRate = 0;
        else
            this.fileService.fileDataExpanded.area.grassRate = 1;
    }

    waterRateClick() {
        if (this.fileService.fileDataExpanded.area.waterPokemonRate > 0)
            this.fileService.fileDataExpanded.area.waterPokemonRate = 0;
        else
            this.fileService.fileDataExpanded.area.waterPokemonRate = 1;
    }

    entriesTracking(index: number) {
        return index; // or item.id
    }
}
