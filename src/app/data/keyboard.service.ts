import { NameInputComponent } from './../fragments/name-input/name-input.component';
import { KeyboardsComponent } from './../layouts/keyboards/keyboards.component';
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

import { Injectable } from '@angular/core';

declare var window: {
    keyboard: any;
};

@Injectable({
    providedIn: 'root'
})
export class KeyboardService {
    constructor() {
        window.keyboard = this;
    }

    registerKeyboard(keyboard: KeyboardsComponent) {
        this.keyboard = keyboard;
    }

    deregisterKeyboard() {
        this.keyboard = null;
    }

    open(input: NameInputComponent) {
        if (this.keyboard !== null)
            this.keyboard.open(input);
    }

    keyboard: KeyboardsComponent | null = null;
}
