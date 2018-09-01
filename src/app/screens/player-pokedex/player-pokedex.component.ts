import { Pokemon } from './../../../assets/data/pokemon.d';
import { GameDataService } from './../../data/gameData.service';
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

import { Component, OnInit } from '@angular/core';
import { SaveFileService } from "../../data/savefile.service";

// @ts-ignore
const _ = window.require("lodash");

@Component({
    selector: 'screen-pokedex',
    templateUrl: './player-pokedex.component.pug',
    styleUrls: ['./player-pokedex.component.scss'],
})
export class PlayerPokedexComponent implements OnInit {

    constructor(
        public fileService: SaveFileService,
        public gd: GameDataService
    ) { }

    ngOnInit() {
        this.gd.file("pokemon").data.forEach((el: Pokemon) => {
            // @ts-ignore
            if (!isNaN(el.pokedex))
                this.pokedexPokemon.push(el);
        });

        this.pokedexPokemon = _.sortBy(this.pokedexPokemon, ["pokedex"]);
    }

    get entries() {
        return this.pokedexPokemon;
    }

    getSeen(index: number): boolean {
        return this.fileService.fileDataExpanded.player.pokedexSeen[index];
    }

    setSeen(index: number, value: boolean) {
        this.fileService.fileDataExpanded.player.pokedexSeen[index] = value;
    }

    toggleSeen(index: number) {
        this.setSeen(index, !this.getSeen(index));
    }

    getOwn(index: number): boolean {
        return this.fileService.fileDataExpanded.player.pokedexOwned[index];
    }

    setOwn(index: number, value: boolean) {
        this.fileService.fileDataExpanded.player.pokedexOwned[index] = value;
    }

    toggleOwn(index: number) {
        this.setOwn(index, !this.getOwn(index));
    }

    toggleAllSeen() {
        const item0 = this.getSeen(0);

        const count = this.gd.file("pokemon").data.length;

        for (let i = 0; i < count; i++) {
            this.setSeen(i, !item0);
        }
    }

    toggleAllOwn() {
        const item0 = this.getOwn(0);

        const count = this.gd.file("pokemon").data.length;

        for (let i = 0; i < count; i++) {
            this.setOwn(i, !item0);
        }
    }

    public pokedexPokemon: Pokemon[] = [];
}
