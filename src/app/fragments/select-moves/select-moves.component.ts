import { MoveService, RawMove } from './../../data/moves.service';
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

import { Component, Input } from '@angular/core';

import {
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

// @ts-ignore
const _ = window.require("lodash");

@Component({
    selector: 'select-moves',
    templateUrl: './select-moves.component.pug',
    styleUrls: ['./select-moves.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectMovesComponent, multi: true }
    ],
})
export class SelectMovesComponent extends ValueAccessorBase<string> {

    constructor(
        public moveService: MoveService
    ) {
        super();
    }

    @Input()
    public disabled: boolean = false;

    get movesList() {
        let moveListReg = _.filter(this.moveService.rawMoves, (value: RawMove) => {
            if (!value.glitch)
                return true;

            return false;
        });

        moveListReg = _.sortBy(moveListReg, ['name']);

        let moveListGlitch = _.filter(this.moveService.rawMoves, (value: RawMove) => {
            if (value.glitch)
                return true;

            return false;
        });

        moveListGlitch = _.sortBy(moveListGlitch, ['name']);

        return [
            { name: "--- Regular Moves ---", ind: 0x00, disable: true },
            ...moveListReg,
            { name: "--- Glitch Moves ---", ind: 0x00, disable: true },
            ...moveListGlitch,
        ];
    }

    // @ts-ignore
    movesTracking(index: number, item: any) {
        return index; // or item.id
    }
}
