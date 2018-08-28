import { WorldCompletedComponent } from './screens/world-completed/world-completed.component';
import { WorldMissablesComponent } from './screens/world-missables/world-missables.component';
import { WorldTownsComponent } from './screens/world-towns/world-towns.component';
import { AreaPuzzleComponent } from './screens/area-puzzle/area-puzzle.component';
import { AreaPokemonComponent } from './screens/area-pokemon/area-pokemon.component';
import { AreaNpcsComponent } from './screens/area-npcs/area-npcs.component';
import { AreaMapsComponent } from './screens/area-maps/area-maps.component';
import { AreaPlayerComponent } from './screens/area-player/area-player.component';
import { AreaSignsComponent } from './screens/area-signs/area-signs.component';
import { AreaWarpsComponent } from './screens/area-warps/area-warps.component';
import { AreaSpritesComponent } from './screens/area-sprites/area-sprites.component';
import { AreaCachedSpritesComponent } from './screens/area-cached-sprites/area-cached-sprites.component';
import { AreaTilesetsComponent } from './screens/area-tilesets/area-tilesets.component';
import { AreaAudioComponent } from './screens/area-audio/area-audio.component';
import { AreaGeneralComponent } from './screens/area-general/area-general.component';
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
import { Routes, RouterModule } from '@angular/router';
import { PlayerBasicsComponent } from "./screens/player-basics/player-basics.component";
import { PlayerPokedexComponent } from './screens/player-pokedex/player-pokedex.component';
import { PlayerItemsComponent } from './screens/player-items/player-items.component';
import { PlayerPokemonComponent } from './screens/player-pokemon/player-pokemon.component';
import { RivalBasicsComponent } from './screens/rival-basics/rival-basics.component';
import { StorageAllComponent } from './screens/storage-all/storage-all.component';
import { WorldEventsComponent } from './screens/world-events/world-events.component';
import { WorldHiddenComponent } from './screens/world-hidden/world-hidden.component';
import { WorldTradesComponent } from './screens/world-trades/world-trades.component';
import { WorldScriptsComponent } from './screens/world-scripts/world-scripts.component';
import { WorldGeneralComponent } from './screens/world-general/world-general.component';
import { WorldOtherComponent } from './screens/world-other/world-other.component';

const routes: Routes = [
    { path: 'player-basics', component: PlayerBasicsComponent },
    { path: 'player-pokedex', component: PlayerPokedexComponent },
    { path: 'player-items', component: PlayerItemsComponent },
    { path: 'player-pokemon', component: PlayerPokemonComponent },
    { path: 'rival-basics', component: RivalBasicsComponent },
    { path: 'storage-all', component: StorageAllComponent },
    { path: 'area-general', component: AreaGeneralComponent },
    { path: 'area-audio', component: AreaAudioComponent },
    { path: 'area-tilesets', component: AreaTilesetsComponent },
    { path: 'area-cached-sprites', component: AreaCachedSpritesComponent },
    { path: 'area-sprites', component: AreaSpritesComponent },
    { path: 'area-warps', component: AreaWarpsComponent },
    { path: 'area-signs', component: AreaSignsComponent },
    { path: 'area-player', component: AreaPlayerComponent },
    { path: 'area-maps', component: AreaMapsComponent },
    { path: 'area-npcs', component: AreaNpcsComponent },
    { path: 'area-pokemon', component: AreaPokemonComponent },
    { path: 'area-puzzle', component: AreaPuzzleComponent },
    { path: 'world-events', component: WorldEventsComponent },
    { path: 'world-hidden', component: WorldHiddenComponent },
    { path: 'world-trades', component: WorldTradesComponent },
    { path: 'world-towns', component: WorldTownsComponent },
    { path: 'world-missables', component: WorldMissablesComponent },
    { path: 'world-scripts', component: WorldScriptsComponent },
    { path: 'world-completed', component: WorldCompletedComponent },
    { path: 'world-general', component: WorldGeneralComponent },
    { path: 'world-other', component: WorldOtherComponent },
    {
        path: '',
        redirectTo: '/player-basics',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
