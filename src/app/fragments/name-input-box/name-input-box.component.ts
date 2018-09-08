import { ValueAccessorBase } from './../abstract/ValueAccessorBase';
import { SaveFileService } from './../../data/savefile.service';
import { TextService } from './../../data/text.service';
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
    selector: 'name-input-box',
    templateUrl: './name-input-box.component.pug',
    styleUrls: ['./name-input-box.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: NameInputBoxComponent, multi: true }
    ],
})
export class NameInputBoxComponent extends ValueAccessorBase<string> implements OnInit {

    constructor(
        public saveFile: SaveFileService,
        public textService: TextService
    ) {
        super();
    }

    ngOnInit() {

    }

    // Max Character count
    // All Pokemon have 10 character limit
    // All Trainers and People have a 7 character limit for dialog sake
    @Input()
    public maxLength: number = 10;

    @Input()
    public label: string = "";

    @Input()
    public bg: boolean = true;

    @Input()
    public textBlack: boolean = true;

    @Input()
    public disabled: boolean = false;

    // The template contains 3 parts to it
    // 1. A gameboy string to give context to the text from the textbox
    // 2. HTML such as line breaks (A textbox is 2 lines)
    // 3. An insertion point for the text from the textbox
    //
    // To use this the string recognizes special template code
    // Write HTML directly like this, mostly only used for linebreaks
    // For gameboy strings write text inside of <(c())> like this <(c(Hello))>
    // To insert the textbox text which is already compiled use this <<t>>
    //
    // <()> - Runs a script, there is only one function, c, to compile
    // <<>> - Inserts a variable, there is only 1 variable, t, the textbox value
    // <<<>>> - Inserts variable escaped, there if you ever need it
    @Input()
    public template: string = "";

    // Latest value
    @Output()
    public onChangeValue = new EventEmitter<string>();

    // Latest internal array
    @Output()
    public onChangeInternal = new EventEmitter<Uint8Array>();

    // Latest HTML representation
    @Output()
    public onChangeHTML = new EventEmitter<string>();

    public doOnChangeValue(event: any) {
        // Relay event
        this.onChangeValue.emit(event);
    }

    public doOnChangeInternal(event: any) {
        // Relay event
        this.onChangeInternal.emit(event);
    }

    public doOnChangeHTML(event: any) {
        // Relay event
        this.onChangeHTML.emit(event);
    }
}
