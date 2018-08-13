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

declare var M: any;

@Component({
    selector: 'entry-item',
    templateUrl: './entry-item.component.pug',
    styleUrls: ['./entry-item.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: EntryItemComponent, multi: true }
    ],
})
export class EntryItemComponent extends ValueAccessorBase<string> implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
        M.updateTextFields();
    }

    @Input()
    public disabled: boolean = false;

    @Input()
    public data: any = { id: 0, value: 1 };

    @Output()
    public remove: EventEmitter<boolean> = new EventEmitter();

    remListItem() {
        this.remove.emit(true);
    }
}
