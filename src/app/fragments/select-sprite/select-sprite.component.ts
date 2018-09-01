import { Sprite } from './../../../assets/data/sprites.d';
import { GameDataService } from './../../data/gameData.service';
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

//@ts-ignore
const _ = window.require("lodash");

import {
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
    selector: 'select-sprite',
    templateUrl: './select-sprite.component.pug',
    styleUrls: ['./select-sprite.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectSpriteComponent, multi: true }
    ],
})
export class SelectSpriteComponent extends ValueAccessorBase<string> {

    constructor(
        public gd: GameDataService
    ) {
        super();
    }

    @Input()
    public disabled: boolean = false;

    get spriteList() {
        const sprites: Sprite[] = _.sortBy(this.gd.file("sprites").data, ["ind"]);
        return sprites;
    }

    // @ts-ignore
    spriteListTrackBy(index: number, item: any) {
        return index;
    }
}
