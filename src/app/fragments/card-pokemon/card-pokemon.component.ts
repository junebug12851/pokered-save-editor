import { AfterViewInit } from '@angular/core';
// @ts-ignore
import { NicknameInputBoxComponent } from './../nickname-input-box/nickname-input-box.component';
import { EventEmitter, OnInit, ViewChild } from '@angular/core';
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

import { Component, Input, Output } from '@angular/core';
import { PokemonParty } from '../../data/savefile-expanded/fragments/PokemonParty';

declare var M: any;
declare var $: any;

@Component({
    selector: 'card-pokemon',
    templateUrl: './card-pokemon.component.pug',
    styleUrls: ['./card-pokemon.component.scss'],
})
export class CardPokemonComponent implements OnInit, AfterViewInit {

    constructor() { }

    ngOnInit() {
        M.updateTextFields();
        $('.tabs').tabs();
    }

    ngAfterViewInit() {
        $('.tabs').tabs();
    }

    @Input()
    public entry: any = PokemonParty.emptyData;

    @Input()
    public disabled: boolean = false;

    @Input()
    public addBtn: boolean = false;

    @Input()
    public remBtn: boolean = false;

    @Output()
    public onAdd: EventEmitter<boolean> = new EventEmitter();

    @Output()
    public onRem: EventEmitter<boolean> = new EventEmitter();

    //@ts-ignore
    @ViewChild(NicknameInputBoxComponent) nicknameInputBox: NicknameInputBoxComponent;

    onAddClick() {
        this.onAdd.emit(true);
    }

    onRemClick() {
        this.onRem.emit(true);
    }
}
