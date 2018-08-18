import { SpriteService } from './../../data/sprite.service';
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
        public spriteService: SpriteService
    ) {
        super();
    }

    @Input()
    public disabled: boolean = false;

    get spriteList() {
        return this.spriteService.indToName;
    }
}
