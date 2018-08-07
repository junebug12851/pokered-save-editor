import { TextService } from './../../data/text.service';
import { SaveFileService } from './../../data/savefile.service';

declare var window: {
    require: any;
};

const { clipboard } = window.require('electron');

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

declare var M: any;
declare var $: any;
declare var jQuery: any;

import { Component, OnInit } from '@angular/core';
import { AppService } from "../../data/app.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(private appService: AppService,
        private saveFile: SaveFileService,
        public textService: TextService) { }

    ngOnInit() {
        $(".dropdown-btn").dropdown();
        $('.modal').modal();
    }

    get specialChars() {
        const chars = [];

        for (let i = 0; i < this.textService.rawTrans.length; i++) {
            const rawEntry = this.textService.rawTrans[i];
            if (!rawEntry.shorthand)
                continue;

            const html = this.textService.convertEngToHTML(rawEntry.eng, 100);

            // We only want special untypable chars given a typical
            // American keyboard or just in-general impossible out of the game
            chars.push({
                html,
                copyCode: rawEntry.eng
            });
        }

        return chars;
    }

    get typeableChars() {
        const chars = [];

        for (let i = 0; i < this.textService.rawTrans.length; i++) {
            const rawEntry = this.textService.rawTrans[i];
            if (rawEntry.shorthand)
                continue;

            const html = this.textService.convertEngToHTML(rawEntry.eng, 100);

            // We only want regular typable chars given a typical
            // American keyboard or just in-general impossible out of the game
            chars.push({
                html,
                copyCode: rawEntry.eng
            });
        }

        return chars;
    }

    copyChar(code) {
        clipboard.writeText(code);
    }
}
