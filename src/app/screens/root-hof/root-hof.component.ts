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
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'screen-root-hof',
    templateUrl: './root-hof.component.pug',
    styleUrls: ['./root-hof.component.scss'],
})
export class RootHoFComponent implements OnInit {
    constructor(
        public fileService: SaveFileService,
    ) { }

    ngOnInit() {
        this.activeRecord = (this.records.length > 0)
            ? 0
            : -1;
    }

    get records() {
        return this.fileService.fileDataExpanded.hallOfFame;
    }

    get pokemon() {
        if (this.activeRecord < 0)
            return [];

        return this.records[this.activeRecord].pokemon;
    }

    onPokemonAdd() {
        if (this.activeRecord < 0)
            return;

        // @ts-ignore
        this.pokemon.push({
            species: 0,
            level: 0,
            name: ""
        })
    }

    onPokemonRem(pokemon: number) {
        if (this.activeRecord < 0)
            return;

        // @ts-ignore
        this.pokemon.splice(pokemon, 1);
    }

    onRecordAdd() {
        // @ts-ignore
        this.records.push({
            pokemon: []
        });

        this.activeRecord = this.records.length - 1;
    }

    onRecordRem() {
        if (this.activeRecord < 0)
            return;

        this.records.splice(this.activeRecord, 1);

        // If we're on record #0 then keep it on 0 after removal as long as
        // they're are still records
        if (this.records.length > 0 && this.activeRecord == 0)
            return;

        // In all other cases just move 1 record back
        this.activeRecord--;
    }

    trackByFn(index: number) {
        return index;
    }

    public activeRecord: number = -1;
}
