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
