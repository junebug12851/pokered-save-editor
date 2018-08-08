import { RawTransArrEntry } from './../../data/text.service';
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

declare var M: any;
declare var $: any;

@Component({
    selector: 'screen-player-basics',
    templateUrl: './player-basics.component.html',
    styleUrls: ['./player-basics.component.scss'],
    providers: [

    ],
})
export class PlayerBasicsComponent implements OnInit {

    constructor(public fileService: SaveFileService) { }

    ngOnInit() {
        M.updateTextFields();
        //$('select').formSelect();
    }

    get agathaSpeech() {
        const fontStr = this.fileService.fileDataExpanded.player.playerNameFontStr;
        const c = this.fileService.saveText.convertEngToHTML.bind(this.fileService.saveText);
        const rivalName = this.fileService.fileDataExpanded.rival.rivalName;

        return `${fontStr}${c(`! I'll show`, 1000, rivalName)}<br/>
                ${c(`you how a real`, 1000, rivalName)}`;
    }

    get chosenStarter() {
        return this.fileService.fileDataExpanded.player.playerStarter;
    }
}
