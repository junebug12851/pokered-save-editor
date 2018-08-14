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

// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { FontawesomeModule } from './libs/fontawesome.module';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Services
import { SaveFileService } from './data/savefile.service';

// Core
import { AppComponent } from './app.component';

// Fragments
import { GymButtonComponent } from './fragments/gym-button/gym-button.component';
import { NameInputComponent } from './fragments/name-input/name-input.component';
import { NameInputBoxComponent } from './fragments/name-input-box/name-input-box.component';
import { NameBoxComponent } from './fragments/name-box/name-box.component';
import { SelectStarterComponent } from './fragments/select-starter/select-starter.component';
import { HPBarComponent } from './fragments/hp-bar/hp-bar.component';
import { EntryItemComponent } from './fragments/entry-item/entry-item.component';
import { SelectItemComponent } from './fragments/select-item/select-item.component';
import { CardPokemonComponent } from './fragments/card-pokemon/card-pokemon.component';
import { SelectSpeciesComponent } from './fragments/select-species/select-species.component';
import { SelectTypeComponent } from './fragments/select-type/select-type.component';
import { SelectStatusComponent } from './fragments/select-status/select-status.component';

// Scrapped
// import { NicknameInputBoxComponent } from './fragments/nickname-input-box/nickname-input-box.component';

import { SelectMovesComponent } from './fragments/select-moves/select-moves.component';

// Layout
import { KeyboardsComponent } from './layouts/keyboards/keyboards.component';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';

// Screens
import { PlayerBasicsComponent } from './screens/player-basics/player-basics.component';
import { FormsModule } from '@angular/forms';
import { PlayerPokedexComponent } from './screens/player-pokedex/player-pokedex.component';
import { PlayerItemsComponent } from './screens/player-items/player-items.component';
import { PlayerPokemonComponent } from './screens/player-pokemon/player-pokemon.component';
import { RivalBasicsComponent } from './screens/rival-basics/rival-basics.component';
import { StorageAllComponent } from './screens/storage-all/storage-all.component';

@NgModule({
    declarations: [
        AppComponent,
        PlayerBasicsComponent,
        PlayerPokedexComponent,
        PlayerItemsComponent,
        GymButtonComponent,
        KeyboardsComponent,
        SidenavComponent,
        PlayerPokemonComponent,
        NameBoxComponent,
        NameInputComponent,
        NameInputBoxComponent,
        SelectStarterComponent,
        SelectItemComponent,
        EntryItemComponent,
        HPBarComponent,
        CardPokemonComponent,
        SelectSpeciesComponent,
        SelectTypeComponent,
        SelectStatusComponent,
        //NicknameInputBoxComponent // Scrapped
        SelectMovesComponent,
        RivalBasicsComponent,
        StorageAllComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        FontawesomeModule,
    ],
    providers: [
        SaveFileService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
