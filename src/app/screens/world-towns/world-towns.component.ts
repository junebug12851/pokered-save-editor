import { townOrder } from './../../data/townOrder';

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
    selector: 'screen-world-towns',
    templateUrl: './world-towns.component.pug',
    styleUrls: ['./world-towns.component.scss'],
})
export class WorldTownsComponent implements OnInit {

    constructor(
        public fileService: SaveFileService,
    ) { }

    ngOnInit() {

    }

    get towns() {
        return townOrder;
    }

    getTown(index: number): boolean {
        return this.fileService.fileDataExpanded.world.visitedTowns[index];
    }

    setTown(index: number, value: boolean) {
        this.fileService.fileDataExpanded.world.visitedTowns[index] = value;
    }

    toggleTown(index: number) {
        this.setTown(index, !this.getTown(index));
    }

    toggleAllTowns() {
        const town0 = this.getTown(0);

        const count = townOrder.length;

        for (let i = 0; i < count; i++) {
            this.setTown(i, !town0);
        }
    }
}
