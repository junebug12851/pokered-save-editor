import { SpriteEntry } from './../../data/sprite.service';
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
    selector: 'screen-area-cached-sprites',
    templateUrl: './area-cached-sprites.component.pug',
    styleUrls: ['./area-cached-sprites.component.scss'],
})
export class AreaCachedSpritesComponent {

    constructor(
        public fileService: SaveFileService,
    ) { }

    get entries() {
        return this.fileService.fileDataExpanded.area.spriteSet;
    }

    get preloadFromList() {
        return [
            { name: "----", value: 0x0 },
            { name: "Static List 1", value: 0x1 },
            { name: "Static List 2", value: 0x2 },
            { name: "Static List 3 (Lavender Town)", value: 0x3 },
            { name: "Static List 4 (Vermillion City)", value: 0x4 },
            { name: "Static List 5 (Celadon City)", value: 0x5 },
            { name: "Static List 6", value: 0x6 },
            { name: "Static List 7 (Saffron City)", value: 0x7 },
            { name: "Static List 8", value: 0x8 },
            { name: "Static List 9 (Route 17)", value: 0x9 },
            { name: "Static List 10", value: 0xA },
            { name: "Dynamic List 1 (Route 2)", value: 0xf1 },
            { name: "Dynamic List 2 (Route 10)", value: 0xf2 },
            { name: "Dynamic List 3 (Route 11)", value: 0xf3 },
            { name: "Dynamic List 4 (Route 12)", value: 0xf4 },
            { name: "Dynamic List 5 (Route 15)", value: 0xf5 },
            { name: "Dynamic List 6 (Route 16)", value: 0xf6 },
            { name: "Dynamic List 7 (Route 18)", value: 0xf7 },
            { name: "Dynamic List 8 (Route 20)", value: 0xf8 },
            { name: "Dynamic List 9 (Route 5)", value: 0xf9 },
            { name: "Dynamic List 10 (Route 6)", value: 0xfa },
            { name: "Dynamic List 11 (Route 7)", value: 0xfb },
            { name: "Dynamic List 12 (Route 8)", value: 0xfc },
        ]
    }

    spriteSetTrackBy(index: number, item: SpriteEntry) {
        return index * item.ind;
    }

    // @ts-ignore
    spriteListTrackBy(index: number, item: any) {
        return index;
    }
}
