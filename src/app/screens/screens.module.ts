import { PlayerItemsComponent } from './player-items/player-items.component';
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FragmentsModule } from "../fragments/fragments.module";

import { PlayerBasicsComponent } from './player-basics/player-basics.component';
import { FormsModule } from '@angular/forms';
import { PlayerPokedexComponent } from './player-pokedex/player-pokedex.component';

@NgModule({
    imports: [
        CommonModule,
        FragmentsModule,
        FormsModule
    ],
    declarations: [
        PlayerBasicsComponent,
        PlayerPokedexComponent,
        PlayerItemsComponent
    ],
    exports: [
        PlayerBasicsComponent,
        PlayerPokedexComponent,
        PlayerItemsComponent
    ]
})
export class ScreensModule {

}
