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

import { Component } from '@angular/core';
import { SaveFileService } from "../../data/savefile.service";

@Component({
    selector: 'screen-root-daycare',
    templateUrl: './root-daycare.component.pug',
    styleUrls: ['./root-daycare.component.scss'],
})
export class RootDaycareComponent {

    constructor(
        public fileService: SaveFileService,
    ) { }

    public dayCareUsedClick() {
        const daycare = this.fileService.fileDataExpanded.world.dayCare;
        if (daycare == null)
            this.fileService.fileDataExpanded.world.dayCare = new PokemonBox()
        else
            this.fileService.fileDataExpanded.world.dayCare = null;
    }
}
