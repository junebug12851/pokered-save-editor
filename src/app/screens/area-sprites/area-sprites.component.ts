import { SpriteData } from './../../data/savefile-expanded/fragments/SpriteData';
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

import { SaveFileService } from './../../data/savefile.service';
import { Component } from '@angular/core';

@Component({
    selector: 'screen-area-sprites',
    templateUrl: './area-sprites.component.pug',
    styleUrls: ['./area-sprites.component.scss'],
})
export class AreaSpritesComponent {
    constructor(
        public fileService: SaveFileService,
    ) { }

    get entries() {
        return this.fileService.fileDataExpanded.area.sprites.spriteData;
    }

    onAdd() {
        this.fileService.fileDataExpanded.area.sprites.spriteData.push(new SpriteData(true));
    }

    onRem(i: number) {
        this.fileService.fileDataExpanded.area.sprites.spriteData.splice(i, 1);
    }

    onFullView(entry: any) {
        if (this.fullView == entry)
            this.fullView = null;
        else
            this.fullView = entry;
    }

    public fullView: any | null = null;
}
