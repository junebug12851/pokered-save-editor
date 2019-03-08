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
    selector: 'screen-world-events',
    templateUrl: './world-events.component.pug',
    styleUrls: ['./world-events.component.scss'],
})
export class WorldEventsComponent implements OnInit {

    constructor(
        public fileService: SaveFileService,
        public gd: GameDataService
    ) { }

    ngOnInit() {

    }

    get entries() {
        const events = this.gd.file("events").data;

        if (this.search == "")
            return events;

        return _.filter(events, (el: any) => {
            const nameUpper = _.upperCase(el.name);
            const searchUpper = _.upperCase(this.search);
            return nameUpper.includes(searchUpper);
        });
    }

    get paginatedEntries() {
        const start = this.pageIndex * this.pageSize;
        const end = start + this.pageSize;
        return this.entries.slice(start, end);
    }

    getEvent(index: number): boolean {
        return this.fileService.fileDataExpanded.world.events.completedEvents[index];
    }

    setEvent(index: number, value: boolean) {
        this.fileService.fileDataExpanded.world.events.completedEvents[index] = value;
    }

    toggleEvent(index: number) {
        this.setEvent(index, !this.getEvent(index));
    }

    toggleAllEvents() {
        const item0 = this.getEvent(0);

        const count = this.fileService.fileDataExpanded.world.events.completedEvents.length;

        for (let i = 0; i < count; i++) {
            this.setEvent(i, !item0);
        }
    }

    paginatorChange(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
    }

    public pageIndex: number = 0;
    public pageSize: number = 10;
    public search: string = "";
}
