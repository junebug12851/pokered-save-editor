import { OnInit } from '@angular/core';

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

import { Component } from '@angular/core';
import { utils } from './utils/utils';

declare var window: {
    require: any;
};

declare var process: any;
declare var __dirname: string;

const path = window.require('path');

const isDev = utils.isDev;

// Adjust process working directory depending on dev enviroment or not

// Used to the main process set this and it applied here but a recent update
// made 2 interesting things happen. The main process cwd is now seperate
// from the render process cwd and furthermore the render process cwd is now
// deep inside it's own folder structure particulary when developing however
// regardless both have to be set or the program won't behave properly.
if (isDev) {
    process.chdir(path.join(__dirname, '../../../../../../src'));
} else {
    process.chdir(path.join(__dirname, '../../dist/pokered-save-editor'));
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    ngOnInit() { }
}
