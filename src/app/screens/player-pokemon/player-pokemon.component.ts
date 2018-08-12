import { MoveService, RawMove } from './../../data/moves.service';
import { PokemonBox } from './../../data/savefile-expanded/fragments/PokemonBox';
import { ApplicationRef } from '@angular/core';
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

import { SaveFileService } from './../../data/savefile.service';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { PokemonService, RawEntry } from '../../data/pokemon.service';
import { TypeServiceB } from '../../data/type.service';

declare var window: {
    require: any;
}

declare var M: any;
declare var $: any;
const _: any = window.require("lodash");

@Component({
    selector: 'screen-player-pokemon',
    templateUrl: './player-pokemon.component.pug',
    styleUrls: ['./player-pokemon.component.scss'],
})
export class PlayerPokemonComponent implements OnInit, AfterViewChecked {
    constructor(
        public fileService: SaveFileService,
        public pokemonService: PokemonService,
        public typeService: TypeServiceB,
        public appRef: ApplicationRef,
        public moveService: MoveService
    ) { }

    ngOnInit() {
        M.updateTextFields();
        $('.tabs').tabs();
    }

    ngAfterViewChecked() {
        //M.updateTextFields();
        $('.tabs:not([data-init])').tabs();
        if ($('.tabs:not([data-init])').length > 0)
            M.updateTextFields();
        $('.tabs:not([data-init])').attr('data-init', "true");
    }

    get entries() {
        return this.fileService.fileDataExpanded.player.playerParty;
    }

    get speciesList() {
        let speciesListPokedex = this.pokemonService.lookupPokedex;

        let speciesListGlitch = _.filter(this.pokemonService.rawEntries, (value: RawEntry) => {
            if (value.glitch)
                return true;

            return false;
        });

        return [
            { name: "--- Pokedex Species ---", ind: 0x00, disable: true },
            ...speciesListPokedex,
            { name: "--- Glitch Species ---", ind: 0x00, disable: true },
            ...speciesListGlitch,
        ];
    }

    get movesList() {
        let moveListReg = _.filter(this.moveService.rawMoves, (value: RawMove) => {
            if (!value.glitch)
                return true;

            return false;
        });

        moveListReg = _.sortBy(moveListReg, ['name']);

        let moveListGlitch = _.filter(this.moveService.rawMoves, (value: RawEntry) => {
            if (value.glitch)
                return true;

            return false;
        });

        moveListGlitch = _.sortBy(moveListGlitch, ['name']);

        return [
            { name: "--- Regular Moves ---", ind: 0x00, disable: true },
            ...moveListReg,
            { name: "--- Glitch Moves ---", ind: 0x00, disable: true },
            ...moveListGlitch,
        ];
    }

    get typeList() {
        return this.typeService.rawTypes;
    }

    getHpPercent(entry: any) {
        // @ts-ignore
        return (entry.hp / entry.maxHP).toFixed(2) * 100;
    }

    forceUpdate() {
        this.appRef.tick();
    }

    nickEnabledChange(entry: PokemonBox) {
        if (!entry.nicknameEdit) {
            entry.nickname = entry.originalName;
            entry.onNameChange();
        }

        this.forceUpdate();
    }

    textUpdateChange(entry: PokemonBox) {
        entry.onNameChange();
        this.forceUpdate();
    }

    getPoisonText(entry: PokemonBox) {
        const fontStr = entry.nicknameFontStr;
        const c = this.fileService.saveText.convertEngToHTML.bind(this.fileService.saveText);
        const rivalName = this.fileService.fileDataExpanded.rival.rivalName;

        return `${fontStr}${c(`'s`, 1000, rivalName)}<br/>
                ${c(`hurt by poison!`, 1000, rivalName)}`;
    }

    getPokemonHTML(entry: PokemonBox) {
        return entry.nicknameFontStr;
    }
}
