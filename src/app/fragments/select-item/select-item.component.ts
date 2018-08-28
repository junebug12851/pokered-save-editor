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
import { itemEntries, ItemEntry } from '../../data/item.service';

import {
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

const _: any = window.require("lodash");

@Component({
    selector: 'select-item',
    templateUrl: './select-item.component.pug',
    styleUrls: ['./select-item.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectItemComponent, multi: true }
    ],
})
export class SelectItemComponent extends ValueAccessorBase<string> implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {

    }

    @Input()
    public disabled: boolean = false;

    @Input()
    public label: string = "Select Item";

    @Input()
    public noneSelectable: boolean = false;

    get itemList() {
        let itemListCommon = _.filter(itemEntries, (value: ItemEntry) => {
            if (value.normal && value.typical)
                return true;

            return false;
        });

        itemListCommon = _.sortBy(itemListCommon, ['name']);

        let itemListSpecial = _.filter(itemEntries, (value: ItemEntry) => {
            if (value.normal && !value.typical)
                return true;

            return false;
        });

        itemListSpecial = _.sortBy(itemListSpecial, ['name']);

        let itemListGlitch = _.filter(itemEntries, (value: ItemEntry) => {
            if (!value.normal)
                return true;

            return false;
        });

        itemListGlitch = _.sortBy(itemListGlitch, ['name']);

        return [
            { name: "--- Common Items ---", ind: 0x100, disable: true },
            ...itemListCommon,
            { name: "--- Special Items ---", ind: 0x100, disable: true },
            ...itemListSpecial,
            { name: "--- Glitch Items ---", ind: 0x100, disable: true },
            ...itemListGlitch
        ];
    }

    // @ts-ignore
    optionsTracking(index: number, item: any) {
        return index; // or item.id
    }
}
