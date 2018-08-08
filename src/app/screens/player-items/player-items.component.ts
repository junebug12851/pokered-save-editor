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
import { ItemService, itemEntries } from '../../data/item.service';

import _ from "lodash";

declare var M: any;
declare var $: any;

@Component({
    selector: 'screen-player-items',
    templateUrl: './player-items.component.html',
    styleUrls: ['./player-items.component.scss'],
    providers: [

    ],
})
export class PlayerItemsComponent implements OnInit {

    constructor(
        public fileService: SaveFileService,
        public itemService: ItemService
    ) { }

    ngOnInit() {
        M.updateTextFields();
    }

    get entries() {
        return this.fileService.fileDataExpanded.player.bagItems;
    }

    get itemList() {
        const itemListNormal = _.filter(itemEntries, (value) => {
            if (value.normal)
                return true;
        });

        const itemListGlitch = _.filter(itemEntries, (value) => {
            if (!value.normal)
                return true;
        });

        return [
            ...itemListNormal,
            { name: "--- Glitch Items ---", ind: 0x00, disable: true },
            ...itemListGlitch
        ];
    }

    idToName(id) {
        return this.itemService.indToName[id].name;
    }

    addListItem() {
        this.fileService.fileDataExpanded.player.bagItems.push({
            id: 0,
            amount: 1,
            index: this.fileService.fileDataExpanded.player.bagItems.length
        });
    }

    remListItem(index) {
        this.fileService.fileDataExpanded.player.bagItems.splice(index, 1);
        this.reUpdateIndexes();
    }

    reUpdateIndexes() {
        for (let i = 0; i < this.fileService.fileDataExpanded.player.bagItems.length; i++) {
            this.fileService.fileDataExpanded.player.bagItems[i].index = i;
        }
    }
}
