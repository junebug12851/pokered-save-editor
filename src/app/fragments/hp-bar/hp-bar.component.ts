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

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSliderChange } from '@angular/material';

@Component({
    selector: 'hp-bar',
    templateUrl: './hp-bar.component.pug',
    styleUrls: ['./hp-bar.component.scss'],
})
export class HPBarComponent {

    constructor() { }

    @Input()
    public curHP: number = 0;

    @Input()
    public maxHP: number = 1;

    @Input()
    public disabled: boolean = false;

    @Output()
    public input: EventEmitter<MatSliderChange> = new EventEmitter<MatSliderChange>();

    // Divide curHP into maxHP to get percent (ex: .859245)
    // Then multiply by 100 to get readable and useable percent (ex: 85.9245)
    // Then trim off all but 2 decimals converting to a string (ex: "85.92") - In this component it's very silly to try and get into rounding and such
    // Then convert the string back to a number (ex: 85.92)
    // Viola, done
    get percent() {
        return Number(((this.curHP / this.maxHP) * 100).toFixed(4));
    }
}
