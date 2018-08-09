import { SaveFileService } from './../../data/savefile.service';
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

declare var $: any;

declare var window: {
    require: any;
};

import { TextService, RawTransArrEntry } from './../../data/text.service';

const _: any = window.require("lodash");

const { clipboard } = window.require('electron');

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.pug',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(
        public textService: TextService,
        public saveFile: SaveFileService) { }

    ngOnInit() {
        $(".dropdown-btn").dropdown();
        $('.modal').modal();
    }

    get controlKeys() {
        const chars: any = _.filter(this.textService.rawTrans, (value: RawTransArrEntry) => {
            if (value.control)
                return true;

            return false;
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

            return false;
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

            return false;
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

            return false;
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

            return false;
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

            return false;
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

    copyChar(code: string) {
        clipboard.writeText(code);
    }
}
