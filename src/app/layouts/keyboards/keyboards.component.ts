import { KeyboardService } from './../../data/keyboard.service';
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

import { Component, NgZone, OnInit } from '@angular/core';
import { TextService } from '../../data/text.service';

@Component({
    selector: 'app-keyboards',
    templateUrl: './keyboards.component.pug',
    styleUrls: ['./keyboards.component.scss']
})
export class KeyboardsComponent implements OnInit {
    constructor(
        public zone: NgZone,
        public ks: KeyboardService,
        public ts: TextService
    ) { }

    ngOnInit() {
        this.ks.registerKeyboard(this);
    }

    public toggle() {
        this.opened = !this.opened;
    }

    public opened: boolean = false;
}
