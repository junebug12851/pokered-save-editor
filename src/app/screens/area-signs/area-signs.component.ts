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
import { SignData } from '../../data/savefile-expanded/fragments/SignData';

@Component({
    selector: 'screen-area-signs',
    templateUrl: './area-signs.component.pug',
    styleUrls: ['./area-signs.component.scss'],
})
export class AreaSignsComponent {

    constructor(
        public fileService: SaveFileService
    ) { }

    get signs() {
        return this.fileService.fileDataExpanded.area.signs.signData;
    }

    addListItem() {
        this.fileService.fileDataExpanded.area.signs.signData.push(new SignData());
    }

    remListItem(index: number) {
        this.fileService.fileDataExpanded.area.signs.signData.splice(index, 1);
    }

    trackByFn(index: number) {
        return index;
    }
}
