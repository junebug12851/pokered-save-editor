import { PokemonService } from './../../data/pokemon.service';
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

import { Component, Input, Output, EventEmitter, OnInit, NgZone } from '@angular/core';

import {
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

// @ts-ignore
const _ = window.require("lodash");

@Component({
    selector: 'nickname-input-box',
    templateUrl: './nickname-input-box.component.pug',
    styleUrls: ['./nickname-input-box.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: NicknameInputBoxComponent, multi: true }
    ],
})
export class NicknameInputBoxComponent extends ValueAccessorBase<string> implements OnInit {

    constructor(
        public pokemonService: PokemonService,
        public zone: NgZone
    ) {
        super();
    }

    ngOnInit() {
        // Set edit box based on species name matching or not the Pokemon name
        // It's a nickname if the species name does not match the pokemon name
        this.edit = !this.namesMatch;
    }

    @Input()
    public disabled: boolean = false;

    @Input()
    public species: number = 0;

    @Input()
    public nickname: string = "";

    // Latest value
    @Output()
    public onChangeValue = new EventEmitter<string>();

    // Latest internal array
    @Output()
    public onChangeInternal = new EventEmitter<Uint8Array>();

    // Latest HTML representation
    @Output()
    public onChangeHTML = new EventEmitter<string>();

    // Is the edit box enabled or not
    public edit: boolean = false;

    public editClicked() {
        this.edit = !this.edit;

        // Proceed only if unchecked
        if (this.edit)
            return;

        // @ts-ignore
        this.value = (this.getNonNickname()) ? this.getNonNickname() : "";
    }

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

    public doSpeciesCheck(val: number) {
        this.zone.run(() => {

            // Change the pokemon name if the species changes and nickname is unchecked
            if (this.edit)
                return;

            if (!this.namesMatch)
                // @ts-ignore
                this.value = (this.getNonNickname(val)) ? this.getNonNickname(val) : "";
        }, this);
    }

    public getNonNickname(val: number = this.species) {
        const species = this.pokemonService.lookupIndex[val];
        if (species === undefined)
            return undefined;
        else
            return species.name.toUpperCase();
    }

    public get namesMatch(): boolean {
        return (this.nickname == this.getNonNickname());
    }
}
