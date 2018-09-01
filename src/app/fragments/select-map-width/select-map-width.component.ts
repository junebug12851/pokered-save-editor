import { Map } from './../../../assets/data/maps.d';
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
import { GameDataService } from './../../data/gameData.service';

import {
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

const _: any = window.require("lodash");

@Component({
    selector: 'select-map-width',
    templateUrl: './select-map-width.component.pug',
    styleUrls: ['./select-map-width.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectMapWidthComponent, multi: true }
    ],
})
export class SelectMapWidthComponent extends ValueAccessorBase<string> implements OnInit {

    constructor(
        public gd: GameDataService
    ) {
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

        const maps: Map[] = this.gd.file("maps").data;

        const b = (val: number | any) => {
            return val.toString(16).padStart(2, "0").toUpperCase();
        }

        const a = (val: number | any) => {
            return val.toString().padStart(2, "0");
        }

        let _maps: {
            name: string,
            glitch: boolean | undefined,
            special: boolean | undefined,
            value: string
        }[] = [];

        maps.forEach((el: Map) => {
            if (el.special === true)
                return;

            _maps.push({
                name: el.name,
                glitch: el.glitch,
                special: el.special,
                value: `${b(el.ind)}_${a(el.width)}`,
            });
        });

        let mapListNormal: Map[] = _.filter(_maps, (value: Map) => {
            if (!value.glitch && !value.special)
                return true;

            return false;
        });

        mapListNormal = _.sortBy(mapListNormal, ['name']);

        let mapListGlitch: Map[] = _.filter(_maps, (value: Map) => {
            if (value.glitch && !value.special)
                return true;

            return false;
        });

        mapListGlitch = _.sortBy(mapListGlitch, ['name']);

        return [
            { name: "--- Normal Maps ---", ind: 0x100, disable: true },
            ...mapListNormal,
            { name: "--- Glitch Maps ---", ind: 0x100, disable: true },
            ...mapListGlitch
        ];
    }

    trackByFn(index: number) {
        return index;
    }
}
