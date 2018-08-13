import { SaveFileService } from './../../data/savefile.service';
import { TextService } from './../../data/text.service';
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

import { Component, OnInit, Input, OnChanges } from '@angular/core';

// @ts-ignore
const _ = window.require("lodash");

@Component({
    selector: 'name-box',
    templateUrl: './name-box.component.pug',
    styleUrls: ['./name-box.component.scss'],
})
export class NameBoxComponent implements OnInit, OnChanges {

    constructor(
        public saveFile: SaveFileService,
        public textService: TextService
    ) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.doOnChangeHTML();
    }

    // Max Character count
    // All Pokemon have 10 character limit
    // All Trainers and People have a 7 character limit for dialog sake
    @Input()
    public maxLength: number = 10;

    @Input()
    public bg: boolean = true;

    @Input()
    public textBlack: boolean = true;

    // The template contains 3 parts to it
    // 1. A gameboy string to give context to the text from the textbox
    // 2. HTML such as line breaks (A textbox is 2 lines)
    // 3. An insertion point for the text from the textbox
    //
    // To use this the string recognizes special template code
    // Write HTML directly like this, mostly only used for linebreaks
    // For gameboy strings write text inside of <(c())> like this <(c(Hello))>
    // To insert the textbox text which is already compiled use this <<t>>
    //
    // <()> - Runs a script, there is only one function, c, to compile
    // <<>> - Inserts a variable, there is only 1 variable, t, the textbox value
    // <<<>>> - Inserts variable escaped, there if you ever need it
    @Input()
    public template: string = "";

    // Latest HTML representation
    @Input()
    public value: string = "";

    protected compiled = null;
    protected writing = "";

    public doOnChangeHTML() {
        let rivalName = this.saveFile.fileDataExpanded.rival.rivalName;
        if (rivalName == "")
            rivalName = "Blue"

        let playerName = this.saveFile.fileDataExpanded.player.playerName;
        if (playerName == "")
            playerName = "Red"

        const event = this.textService.convertEngToHTML(
            this.value,
            this.maxLength,
            rivalName,
            playerName);

        const fontStr = event;

        const self = this;
        const c = (str: string) => {
            const val = self.textService.convertEngToHTML(
                str,
                1000, // Don't limit context wording
                rivalName,
                playerName);

            return val;
        }

        if (this.compiled === null)

            // Compile template if there isn't one compiled
            this.compiled = _.template(this.template, {
                // Interpolate <<Value>>
                interpolate: /<<([\s\S]+?)>>/g,

                // Evaluate <(Value)>
                evaluate: /<\(([\s\S]+?)\)>/g,

                // Escape <<<Value>>>
                escape: /<<<([\s\S]+?)>>>/g,
            });

        // @ts-ignore
        this.writing = this.compiled({
            c, // Translate function
            t: fontStr // Compiled text from textbox
        });
    }
}
