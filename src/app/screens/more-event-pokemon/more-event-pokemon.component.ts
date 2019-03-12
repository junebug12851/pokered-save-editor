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
import { PokemonParty } from 'src/app/data/savefile-expanded/fragments/PokemonParty';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'more-event-pokemon',
    templateUrl: './more-event-pokemon.component.pug',
    styleUrls: ['./more-event-pokemon.component.scss'],
})
export class MoreEventPokemon implements OnInit {

    constructor(
        public fileService: SaveFileService,
        public gd: GameDataService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {}

    notify(message: string) {
        this.snackBar.open(message, '', {
            duration: 2 * 1000,
        });
    }

    givePokemon(pkmn: PokemonParty): void {
        pkmn.updateExp();
        pkmn.updateStats();
        pkmn.hp = pkmn.hpStat;

        const f = this.fileService.fileDataExpanded;
        const curBox = f.storage.curBox;

        if(f.player.pokemon.playerParty.length < 6) {
            f.player.pokemon.playerParty.push(pkmn);
            this.notify("Event Pokemon was sent to your party");
        }
        else if(f.storage.pokemonBoxes[curBox].length < 20) {
            PokemonParty.convertToPokemonBox(pkmn);
            f.storage.pokemonBoxes[curBox].push(pkmn);
            this.notify("Event Pokemon was sent to your current box");
        }
        else {
            this.notify("No space in party or your current box");
        }
    }

    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Gets a blank Pokemon with random DV's and OTID
    get pkmn() {
        const pkmn = new PokemonParty();
        pkmn.otID = Number(this.getRandomInt(0, 65535)).toString(16).padStart(4, "0").toUpperCase();
        pkmn.dv.attack = this.getRandomInt(0, 15);
        pkmn.dv.defense = this.getRandomInt(0, 15);
        pkmn.dv.speed = this.getRandomInt(0, 15);
        pkmn.dv.special = this.getRandomInt(0, 15);
        return pkmn;
    }

    // Gets a Lvl 5 Mew that knows Pound with random DV's and OTID
    get mew() {
        const pkmn = this.pkmn;
        pkmn.species = 21; // Mew
        pkmn.type1 = 24; // Psychic
        pkmn.type2 = 0xFF; // No 2nd type
        pkmn.nickname = "MEW";
        pkmn.level = 5;
        pkmn.moves[0] = {
            moveID: 1, // Pound
            pp: 35,
            ppUp: 0,
        }

        return pkmn;
    }

    // Gets a Lvl 5 Pikachu with random DV's and OTID
    get pikachu() {
        const pkmn = this.pkmn;
        pkmn.species = 84; // Pikachu
        pkmn.type1 = 23; // Electric
        pkmn.type2 = 0xFF;
        pkmn.nickname = "PIKACHU";
        pkmn.level = 5;

        return pkmn;
    }

    giveGameFreakMew() {
        const pkmn = this.mew;
        pkmn.otName = "GMFRK";
        pkmn.otID = Number(22796).toString(16).padStart(4, "0").toUpperCase();

        // 15 for all DV's as per this event
        pkmn.dv.attack = 15;
        pkmn.dv.defense = 15;
        pkmn.dv.special = 15;
        pkmn.dv.speed = 15;

        this.givePokemon(pkmn);
    }

    giveSpaceWorld99Mew() {
        const pkmn = this.mew;
        pkmn.otName = "MAKHARI";

        this.givePokemon(pkmn);
    }

    giveStampFearow() {
        const pkmn = this.pkmn;
        pkmn.species = 35; // Fearow
        pkmn.type1 = 0; // Normal
        pkmn.type2 = 2; // Flying
        pkmn.otName = "STAMP";
        pkmn.nickname = "FEAROW";
        pkmn.level = 20;
        pkmn.moves[0] = {
            moveID: 45, // Growl
            pp: 40,
            ppUp: 0,
        }
        pkmn.moves[1] = {
            moveID: 43, // Leer
            pp: 30,
            ppUp: 0,
        }
        pkmn.moves[2] = {
            moveID: 31, // Furry Attack
            pp: 20,
            ppUp: 0,
        }
        pkmn.moves[3] = {
            moveID: 6, // Pay Day
            pp: 20,
            ppUp: 0,
        }

        this.givePokemon(pkmn);
    }

    giveStampRapidash() {
        const pkmn = this.pkmn;
        pkmn.species = 164; // Rapidash
        pkmn.type1 = 20; // Fire
        pkmn.type2 = 0xFF;
        pkmn.otName = "STAMP";
        pkmn.nickname = "RAPIDASH";
        pkmn.level = 40;
        pkmn.moves[0] = {
            moveID: 52, // Ember
            pp: 25,
            ppUp: 0,
        }
        pkmn.moves[1] = {
            moveID: 83, // Fire Spin
            pp: 15,
            ppUp: 0,
        }
        pkmn.moves[2] = {
            moveID: 23, // Stomp
            pp: 20,
            ppUp: 0,
        }
        pkmn.moves[3] = {
            moveID: 6, // Pay Day
            pp: 20,
            ppUp: 0,
        }

        this.givePokemon(pkmn);
    }

    give98BattleTourPikachu() {
        const pkmn = this.pikachu;
        pkmn.otName = "IMAKUNI";
        pkmn.moves[0] = {
            moveID: 57, // Surf
            pp: 15,
            ppUp: 0,
        }

        this.givePokemon(pkmn);
    }

    giveUniversityMagikarp() {
        const pkmn = this.pkmn;
        pkmn.species = 133; // Magikarp
        pkmn.type1 = 21; // Water
        pkmn.type2 = 0xFF;
        pkmn.otName = "TAMAMSH";
        pkmn.nickname = "MAGIKARP";
        pkmn.level = 5;
        pkmn.moves[0] = {
            moveID: 150, // Splash
            pp: 40,
            ppUp: 0,
        }
        pkmn.moves[1] = {
            moveID: 82, // Dragon Rage
            pp: 10,
            ppUp: 0,
        }

        this.givePokemon(pkmn);
    }

    give7thNxtGenWrldHbyMew() {
        const pkmn = this.mew;

        const otNames = [
            "FUKUOKA",
            "CHIBA",
            "OSAKA",
            "HOKAIDO",
            "AICHI"
        ];

        pkmn.otName = otNames[this.getRandomInt(0, otNames.length - 1)];

        this.givePokemon(pkmn);
    }

    giveCoroCoroFlyingPikachu() {
        const pkmn = this.pikachu;
        pkmn.otName = "COROCOR";
        pkmn.moves[0] = {
            moveID: 19, // Fly
            pp: 15,
            ppUp: 0,
        }

        this.givePokemon(pkmn);
    }

    giveCoroCoroSurfingPikachu() {
        const pkmn = this.pikachu;
        pkmn.otName = "COROCOR";
        pkmn.moves[0] = {
            moveID: 57, // Surf
            pp: 15,
            ppUp: 0,
        }

        this.givePokemon(pkmn);
    }

    giveSpaceWorld97Mew() {
        const pkmn = this.mew;
        
        const otNames = [
            "YOSHI",
            "LUIGI",
        ];

        pkmn.otName = otNames[this.getRandomInt(0, otNames.length - 1)];

        this.givePokemon(pkmn);
    }

    giveCoroCoro20thMew() {
        const pkmn = this.mew;

        pkmn.otName = "COROCOR";

        this.givePokemon(pkmn);
    }

    giveN64Pikachu() {
        const pkmn = this.pikachu;

        pkmn.otName = "NINTEN"

        pkmn.moves[0] = {
            moveID: 84, // Thundershock
            pp: 30,
            ppUp: 0,
        }
        pkmn.moves[1] = {
            moveID: 45, // Growl
            pp: 40,
            ppUp: 0,
        }
        pkmn.moves[2] = {
            moveID: 57, // Surf
            pp: 15,
            ppUp: 0,
        }

        this.givePokemon(pkmn);
    }

    give4thNxtGenWrldHbyMew() {
        const pkmn = this.mew;

        pkmn.otName = "TOKYOBY";

        this.givePokemon(pkmn);
    }

    giveLgndPkmnMew() {
        const pkmn = this.mew;

        pkmn.otName = "COROCOR";

        this.givePokemon(pkmn);
    }
}
