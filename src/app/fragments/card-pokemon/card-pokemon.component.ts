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

import { Component, Input } from '@angular/core';
import { PokemonParty } from '../../data/savefile-expanded/fragments/PokemonParty';
import {GameDataService} from '../../data/gameData.service';
import { Pokemon } from 'src/assets/data/pokemon';
import { PokemonBox } from 'src/app/data/savefile-expanded/fragments/PokemonBox';

@Component({
    selector: 'card-pokemon',
    templateUrl: './card-pokemon.component.pug',
    styleUrls: ['./card-pokemon.component.scss'],
})
export class CardPokemonComponent implements OnInit {

    constructor(
        public gd: GameDataService
    ) {

    }

    ngOnInit() {
        this.pkmnArr = this.gd.file("pokemon").data;
    }

    get expStart(): number {
        if(this.entry == null || this.entry == undefined)
            return 0;

        const e: PokemonBox = this.entry as PokemonBox;
        return e.levelToExp(this.pkmnArr, e.level, e.species);
    }

    get expEnd(): number {
        if(this.entry == null || this.entry == undefined)
            return 0;

        const e: PokemonBox = this.entry as PokemonBox;
        return e.levelToExp(this.pkmnArr, e.level + 1, e.species) - 1;
    }

    get expPercent(): number {
        if(this.entry == null || this.entry == undefined)
            return 0;

        // Grab EXP
        const e: PokemonBox = this.entry as PokemonBox;
        let exp = e.exp;

        // Offset start from current and end
        exp = exp - this.expStart;
        const expEnd = this.expEnd - this.expStart;

        // Return percentage
        return (exp / expEnd) * 100;
    }

    public pkmnArr: Pokemon[] = [];

    @Input()
    public entry: any = new PokemonParty();

    @Input()
    public disabled: boolean = false;
}
