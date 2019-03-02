import { EventEmitter, OnInit } from '@angular/core';
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
import { MatSliderChange } from '@angular/material';

@Component({
    selector: 'card-pokemon-header',
    templateUrl: './card-pokemon-header.component.pug',
    styleUrls: ['./card-pokemon-header.component.scss'],
})
export class CardPokemonHeader implements OnInit {

    constructor() { }

    ngOnInit() {

    }

    public updateHP(event: MatSliderChange) {
        this.entry.hp = event.value;
    }

    public updateData() {
        this.entry.updateExp();

        if(this.entry.updateStats)
            this.entry.updateStats();
    }

    @Input()
    public entry: any = new PokemonParty();

    @Input()
    public disabled: boolean = false;

    @Input()
    public addBtn: boolean = false;

    @Input()
    public remBtn: boolean = false;

    @Input()
    public fullViewBtn: boolean = false;

    @Input()
    public fullViewActive: boolean = false;

    @Output()
    public onAdd: EventEmitter<boolean> = new EventEmitter();

    @Output()
    public onRem: EventEmitter<boolean> = new EventEmitter();

    @Output()
    public onFullView: EventEmitter<boolean> = new EventEmitter();

    onAddClick() {
        this.onAdd.emit(true);
    }

    onRemClick() {
        this.onRem.emit(true);
    }

    onFullViewClick() {
        this.onFullView.emit(true);
    }

    toggleEntry() {
        this.activeEntry = !this.activeEntry;
    }

    setActiveTab(val: number) {
        this.activeTab = val;
    }

    // Load the Pokemon Body Contents into the DOM at all?
    public activeEntry: boolean = false;

    // Which tab contents to load into the DOM
    public activeTab: number = 0;
}
