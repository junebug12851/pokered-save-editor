import { PokemonBox } from './../../data/savefile-expanded/fragments/PokemonBox';
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

import { Component, OnInit } from '@angular/core';
import { SaveFileService } from "../../data/savefile.service";

@Component({
    selector: 'screen-storage-all',
    templateUrl: './storage-all.component.pug',
    styleUrls: ['./storage-all.component.scss'],
})
export class StorageAllComponent implements OnInit {

    constructor(
        public fileService: SaveFileService,
    ) { }

    get boxItems() {
        return this.fileService.fileDataExpanded.storage.boxItems;
    }

    addBoxItem() {
        this.fileService.fileDataExpanded.storage.boxItems.push({
            id: 0,
            amount: 1,
        });
    }

    remBoxItem(index: number) {
        this.fileService.fileDataExpanded.storage.boxItems.splice(index, 1);
    }

    ////////////////////////////////

    get boxPokemon() {
        return this.fileService.fileDataExpanded.storage.pokemonBoxes[this.activeTab - 1];
    }

    remPokemon(i: number) {
        this.fileService.fileDataExpanded.storage.pokemonBoxes[this.activeTab - 1].splice(i, 1);
    }

    addPokemon() {
        // @ts-ignore
        this.fileService.fileDataExpanded.storage.pokemonBoxes[this.activeTab - 1].push(PokemonBox.emptyData);
    }

    ngOnInit() {

    }

    setActiveTab(val: number) {
        this.activeTab = val;
    }

    // Which tab contents to load into the DOM
    public activeTab: number = 0;
}
