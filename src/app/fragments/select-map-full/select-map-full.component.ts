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

declare var window: {
    require: any;
}

import { Component, OnInit, Input } from '@angular/core';

import {
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { RawMap, rawMaps } from '../../data/map.service';

const _: any = window.require("lodash");

@Component({
    selector: 'select-map-full',
    templateUrl: './select-map-full.component.pug',
    styleUrls: ['./select-map-full.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectMapFullComponent, multi: true }
    ],
})
export class SelectMapFullComponent extends ValueAccessorBase<string> implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {

    }

    @Input()
    public disabled: boolean = false;

    @Input()
    public noneSelectable: boolean = false;

    @Input()
    public label: string = "Select Map";

    get mapList() {

        const b = (val: number | any) => {
            return val.toString(16).padStart(2, "0").toUpperCase();
        }

        const w = (val: number | any) => {
            return val.toString(16).padStart(4, "0").toUpperCase();
        }

        const a = (val: number | any) => {
            return val.toString().padStart(2, "0");
        }

        let maps: any = [];

        rawMaps.forEach((el: RawMap) => {
            if (el.glitch === true || el.special === true)
                return;

            maps.push({
                name: el.name,
                value: `${b(el.ind)}_${a(el.height)}_${a(el.width)}_${a(el.height2x2)}_${a(el.width2x2)}_${w(el.dataPtr)}_${w(el.textPtr)}_${w(el.scriptPtr)}`,
            });
        });

        maps = _.sortBy(maps, ['name']);

        return maps;
    }

    trackByFn(index: number) {
        return index;
    }
}
