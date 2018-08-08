import { TextService, RawTransArrEntry } from './../../data/text.service';
import { SaveFileService } from './../../data/savefile.service';

import _ from "lodash";

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

    get controlKeys() {
        const chars: any = _.filter(this.textService.rawTrans, (value: RawTransArrEntry) => {
            if (value.control)
                return true;
        });

        for (let i = 0; i < chars.length; i++) {
            const rawEntry: RawTransArrEntry = chars[i];
            const html = this.textService.convertEngToHTML(rawEntry.eng, 100);
            chars[i] = {
                html,
                copyCode: rawEntry.eng
            }
        }

        return chars;
    }

    get multiCharKeys() {
        const chars: any = _.filter(this.textService.rawTrans, (value: RawTransArrEntry) => {
            if (value.multiChar)
                return true;
        });

        for (let i = 0; i < chars.length; i++) {
            const rawEntry: RawTransArrEntry = chars[i];
            const html = this.textService.convertEngToHTML(rawEntry.eng, 100);
            chars[i] = {
                html,
                copyCode: rawEntry.eng
            }
        }

        return chars;
    }

    get singleCharKeys() {
        const chars: any = _.filter(this.textService.rawTrans, (value: RawTransArrEntry) => {
            if (value.singleChar)
                return true;
        });

        for (let i = 0; i < chars.length; i++) {
            const rawEntry: RawTransArrEntry = chars[i];
            const html = this.textService.convertEngToHTML(rawEntry.eng, 100);
            chars[i] = {
                html,
                copyCode: rawEntry.eng
            }
        }

        return chars;
    }

    // 3 Keyboards
    // 1) Basic Keyboard containing only in-game provided keys
    // 2) Full Keyboard contaning all keys except picture keys
    // 3) Graphic Keyboard containing only graphic keys

    get basicKeys() {
        const chars: any = _.filter(this.textService.rawTrans, (value: RawTransArrEntry) => {
            if (value.normal)
                return true;
        });

        for (let i = 0; i < chars.length; i++) {
            const rawEntry: RawTransArrEntry = chars[i];
            const html = this.textService.convertEngToHTML(rawEntry.eng, 100);
            chars[i] = {
                html,
                copyCode: rawEntry.eng
            }
        }

        return chars;
    }

    get fullKeys() {
        const chars: any = _.filter(this.textService.rawTrans, (value: RawTransArrEntry) => {
            if (!value.picture)
                return true;
        });

        for (let i = 0; i < chars.length; i++) {
            const rawEntry: RawTransArrEntry = chars[i];
            const html = this.textService.convertEngToHTML(rawEntry.eng, 100);
            chars[i] = {
                html,
                copyCode: rawEntry.eng
            }
        }

        return chars;
    }

    get picKeys() {
        const chars: any = _.filter(this.textService.rawTrans, (value: RawTransArrEntry) => {
            if (value.picture)
                return true;
        });

        for (let i = 0; i < chars.length; i++) {
            const rawEntry: RawTransArrEntry = chars[i];
            const html = this.textService.convertEngToHTML(rawEntry.eng, 100);
            chars[i] = {
                html,
                copyCode: rawEntry.eng
            }
        }

        return chars;
    }

    copyChar(code) {
        clipboard.writeText(code);
    }
}
