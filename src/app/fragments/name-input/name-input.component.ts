import { KeyboardService } from './../../data/keyboard.service';
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

import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SaveFileService } from './../../data/savefile.service';
import { TextService } from '../../data/text.service';

import {
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
    selector: 'name-input',
    templateUrl: './name-input.component.pug',
    styleUrls: ['./name-input.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: NameInputComponent, multi: true }
    ],
})
export class NameInputComponent extends ValueAccessorBase<string> implements OnInit, OnChanges {

    constructor(
        public fileService: SaveFileService,
        public textService: TextService,
        public ks: KeyboardService
    ) {
        super();
    }

    ngOnInit() {
        this.doOnChange("");
    }

    ngOnChanges() {
        this.doOnChange(this.value);
    }

    // Max Character count
    // All Pokemon have 10 character limit
    // All Trainers and People have a 7 character limit for dialog sake
    @Input()
    public maxLength: number = 10;

    @Input()
    public label: string = "";

    @Input()
    public disabled: boolean = false;

    // Latest value
    @Output()
    public onChangeValue = new EventEmitter<string>();

    // Latest internal array
    @Output()
    public onChangeInternal = new EventEmitter<Uint8Array>();

    // Latest HTML representation
    @Output()
    public onChangeHTML = new EventEmitter<string>();

    public invalid: boolean = false;

    doOnChange(event: any) {
        // Grab value
        const val = event;

        // Notify value changed
        this.onChangeValue.emit(val);

        // Retrieve Internal Value and notify change
        const internalVal = this.textService.convertToCode(
            val,
            this.maxLength,
            false
        );
        this.onChangeInternal.emit(internalVal);

        // Retrive HTML and notify
        let rival = this.fileService.fileDataExpanded.rival.rivalName;
        if (rival == "")
            rival = "Blue";

        let player = this.fileService.fileDataExpanded.player.basics.playerName;
        if (player == "")
            player = "Red";

        this.onChangeHTML.emit(this.textService.convertEngToHTML(
            val,
            this.maxLength,
            rival,
            player
        ));
    }
}
