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
    selector: 'screen-world-other',
    templateUrl: './world-other.component.pug',
    styleUrls: ['./world-other.component.scss'],
})
export class WorldOtherComponent {

    constructor(
        public fileService: SaveFileService,
    ) { }

    togglePlaytime() {
        let maxed = this.fileService.fileDataExpanded.world.other.playtime.maxed;
        if(maxed == 0)
            maxed = 255;
        else
            maxed = 0;

        this.fileService.fileDataExpanded.world.other.playtime.maxed = maxed;
    }
}
