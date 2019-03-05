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

    getBoxPokemon(boxNum: number) {
        return this.fileService.fileDataExpanded.storage.pokemonBoxes[boxNum - 1];
    }

    // Should this box be marked as disabled?
    // It's disabled if changedBoxesBefore is false and givenBoxNum is not the
    // current box
    getBoxDisabled(boxNum: number) {
        if (!this.fileService.fileDataExpanded.storage.changedBoxesBefore &&
            this.fileService.fileDataExpanded.storage.curBox != boxNum)
            return true;

        return false;
    }

    remPokemon(boxNum: number, i: number) {
        this.fileService.fileDataExpanded.storage.pokemonBoxes[boxNum - 1].splice(i, 1);
    }

    addPokemon(boxNum: number) {
        this.fileService.fileDataExpanded.storage.pokemonBoxes[boxNum - 1].push(new PokemonBox());
    }

    ngOnInit() {

    }

    trackItems(index: number) {
        return index;
    }

    trackBoxPokemon(index: number) {
        return index;
    }

    trackBoxTabs(index: number) {
        return index;
    }

    public setScreenItems() {
        this.screen = "items";
        this.viewing = -1;
    }

    public setScreenPokemon(box: number|null = null) {
        if(box === null) {
            this.screen = `pokemon/box${this.curBox}`;
            this.viewing = null;
            return;
        }

        this.screen = `pokemon/box${box}`;
        this.viewing = box;
    }

    public makeBoxCurrent() {
        // Only interested if above 0 and not current box
        if(this.viewing == null || this.viewing <= 0 || this.viewing == this.curBox)
            return;
        
        this.curBox = this.viewing;
    }

    // Returns Non-Zero based box number
    public get curBox() {
        return this.fileService.fileDataExpanded.storage.curBox + 1;
    }

    // Sets box number from Non-Zero based number
    public set curBox(val: number) {
        this.fileService.fileDataExpanded.storage.curBox = val - 1;
    }

    public get boxesPresetup() {
        return this.fileService.fileDataExpanded.storage.changedBoxesBefore;
    }

    public get viewingBox() {
        if(this.viewing == null || this.viewing <= 0 || this.viewing == this.curBox)
            return this.curBox;

        else return this.viewing;
    }

    // Viewing Items or a Pokemon Box
    // - 1      Items
    // null     Current Box
    // >0       Specific Box
    public viewing: number|null = -1;

    // Current screen to display
    public screen: string = "items";
}
