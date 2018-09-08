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

import { Component, OnInit, Input } from '@angular/core';
import { SaveFileService } from './../../data/savefile.service';

@Component({
    selector: 'gym-button',
    templateUrl: './gym-button.component.pug',
    styleUrls: ['./gym-button.component.scss']
})
export class GymButtonComponent implements OnInit {

    constructor(public fileService: SaveFileService) { }

    ngOnInit() { }

    @Input()
    public gymLeader: string = "Brock";

    @Input()
    public gymBadge: string = "Boulder";

    get value(): boolean {
        return this.fileService.fileDataExpanded.player.basics.badges[this.gymBadge.toLowerCase()];
    }

    set value(val: boolean) {
        this.fileService.fileDataExpanded.player.basics.badges[this.gymBadge.toLowerCase()] = val;
    }

    toggle() {
        this.value = !this.value;
    }

    get color() {
        if (this.value)
            return "primary";
        else
            return "";
    }
}
