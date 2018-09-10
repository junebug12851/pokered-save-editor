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

import { Component } from '@angular/core';
import { SaveFileService } from "../../data/savefile.service";

@Component({
    selector: 'screen-area-tilesets',
    templateUrl: './area-tilesets.component.pug',
    styleUrls: ['./area-tilesets.component.scss'],
})
export class AreaTilesetsComponent {

    constructor(
        public fileService: SaveFileService,
        public gd: GameDataService
    ) { }

    get containerTileset() {
        const tileset = this.fileService.fileDataExpanded.area.tilesets.tileset;
        const tilesetData = this.gd.file("tileset-data").data;

        if (tilesetData[tileset] !== undefined)
            return tilesetData[tileset];

        return {
            tileset: "",
            container: ""
        };
    }

    get invalidClass() {
        return "pr pr-pic pr-raw-" + this.fileService.fileDataExpanded.area.tilesets.outOfBoundsTile;
    }

    get grassClass() {
        return "pr pr-pic pr-raw-" + this.fileService.fileDataExpanded.area.tilesets.tilesetGrassTile;
    }

    getCounterClass(val: number) {
        return "pr pr-pic pr-raw-" + this.fileService.fileDataExpanded.area.tilesets.tilesetTalkingOverTiles[val];
    }
}
