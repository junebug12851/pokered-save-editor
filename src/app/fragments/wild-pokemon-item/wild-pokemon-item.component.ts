import { ValueAccessorBase } from './../abstract/ValueAccessorBase';
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

import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

import {
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
    selector: 'wild-pokemon-item',
    templateUrl: './wild-pokemon-item.component.pug',
    styleUrls: ['./wild-pokemon-item.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: WildPokemonItemComponent, multi: true }
    ],
})
export class WildPokemonItemComponent extends ValueAccessorBase<string> implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {

    }

    @Input()
    public disabled: boolean = false;

    @Input()
    public data: any = { id: 0, value: 1 };

    @Input()
    public index: number = 0;

    @Output()
    public remove: EventEmitter<boolean> = new EventEmitter();

    /*
     * The Pokemon list is in order from most common to most rare
     * Pokemon 0: 19.9% chance
     * Pokemon 1: 19.9% chance
     * Pokemon 2: 15.2% chance
     * Pokemon 3: 9.8% chance
     * Pokemon 4: 9.8% chance
     * Pokemon 5: 9.8% chance
     * Pokemon 6: 5.1% chance
     * Pokemon 7: 5.1% chance
     * Pokemon 8: 4.3% chance
     * Pokemon 9: 1.2% chance
     */
    get encounterChance() {
        if (this.index == 0)
            return "19.9%";
        else if (this.index == 1)
            return "19.9%";
        else if (this.index == 2)
            return "15.2%";
        else if (this.index == 3)
            return "9.8%";
        else if (this.index == 4)
            return "9.8%";
        else if (this.index == 5)
            return "9.8%";
        else if (this.index == 6)
            return "5.1%";
        else if (this.index == 7)
            return "5.1%";
        else if (this.index == 8)
            return "4.3%";
        else if (this.index == 9)
            return "1.2%";

        return "19.9%";
    }

    remListItem() {
        this.remove.emit(true);
    }
}
