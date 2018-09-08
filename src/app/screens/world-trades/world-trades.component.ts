import { GameDataService } from './../../data/gameData.service';
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
    selector: 'screen-world-trades',
    templateUrl: './world-trades.component.pug',
    styleUrls: ['./world-trades.component.scss'],
})
export class WorldTradesComponent implements OnInit {

    constructor(
        public fileService: SaveFileService,
        public gd: GameDataService
    ) { }

    ngOnInit() {

    }

    get trades() {
        return this.gd.file("trades").data;
    }

    getTrade(index: number): boolean {
        return this.fileService.fileDataExpanded.world.trades.inGameTrades[index];
    }

    setTrade(index: number, value: boolean) {
        this.fileService.fileDataExpanded.world.trades.inGameTrades[index] = value;
    }

    toggleTrade(index: number) {
        this.setTrade(index, !this.getTrade(index));
    }

    toggleAllTrades() {
        const trade0 = this.getTrade(0);

        const count = this.gd.file("trades").data.length;

        for (let i = 0; i < count; i++) {
            this.setTrade(i, !trade0);
        }
    }
}
