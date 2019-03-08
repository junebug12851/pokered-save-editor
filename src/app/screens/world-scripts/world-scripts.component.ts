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

import { PageEvent } from '@angular/material';

//@ts-ignore
const _ = window.require("lodash");

@Component({
    selector: 'screen-world-scripts',
    templateUrl: './world-scripts.component.pug',
    styleUrls: ['./world-scripts.component.scss'],
})
export class WorldScriptsComponent implements OnInit {

    constructor(
        public fileService: SaveFileService,
        public gd: GameDataService
    ) { }

    ngOnInit() {

    }

    get scripts() {
        return this.gd.file("scripts").data;
    }

    get scriptsFiltered() {
        const scripts = this.scripts;

        if (this.search == "")
            return scripts;

        return _.filter(scripts, (el: any) => {
            const nameUpper = _.upperCase(el.readableName);
            const searchUpper = _.upperCase(this.search);
            return nameUpper.includes(searchUpper);
        });
    }

    get paginatedScripts() {
        const start = this.pageIndex * this.pageSize;
        const end = start + this.pageSize;
        return this.scriptsFiltered.slice(start, end);
    }

    scriptToIndex(script: any) {
        for(let i = 0; i < this.scripts.length; i++) {
            const _script = this.scripts[i];
            if(script.readableName == _script.readableName) {
                return i;
            }
        }

        return null;
    }

    paginatorChange(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
    }

    public pageIndex: number = 0;
    public pageSize: number = 10;
    public search: string = "";
}
