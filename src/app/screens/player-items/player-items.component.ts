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
import { ItemService } from '../../data/item.service';

@Component({
    selector: 'screen-player-items',
    templateUrl: './player-items.component.pug',
    styleUrls: ['./player-items.component.scss'],
})
export class PlayerItemsComponent {

    constructor(
        public fileService: SaveFileService,
        public itemService: ItemService
    ) { }

    get entries() {
        return this.fileService.fileDataExpanded.player.bagItems;
    }

    get entriesCount() {
        return this.fileService.fileDataExpanded.player.bagItems.length;
    }

    addListItem() {
        this.fileService.fileDataExpanded.player.bagItems.push({
            id: 0,
            amount: 1,
        });
    }

    remListItem(index: number) {
        this.fileService.fileDataExpanded.player.bagItems.splice(index, 1);
    }

    // @ts-ignore
    entriesTracking(index: number, item: any) {
        return index; // or item.id
    }
}
