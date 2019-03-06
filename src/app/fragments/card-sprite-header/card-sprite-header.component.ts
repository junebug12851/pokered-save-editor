import { Sprite } from '../../../assets/data/sprites.d';
import { GameDataService } from './../../data/gameData.service';
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
import { SpriteData } from './../../data/savefile-expanded/fragments/SpriteData';

@Component({
    selector: 'card-sprite-header',
    templateUrl: './card-sprite-header.component.pug',
    styleUrls: ['./card-sprite-header.component.scss'],
})
export class CardSpriteHeader implements OnInit {

    constructor(
        public gd: GameDataService
    ) { }

    ngOnInit() {
        const sprites: Sprite[] = this.gd.file("sprites").data;
        sprites.forEach((el: Sprite) => {
            this.sprites[el.ind] = el;
        });
    }

    @Input()
    public entry: any = new SpriteData(true);

    @Input()
    public disabled: boolean = false;

    public get coords() {
        const sprite: SpriteData = this.entry;
        return `(${sprite.mapX}, ${sprite.mapY})`;
    }

    public get spriteName() {
        const data = this.sprites[this.entry.pictureID];
        if (data === null || data === undefined || !(this.entry.pictureID > 0))
            return "";
        else
            return data.name;
    }

    public get isNonTrainer() {
        return this.entry.trainerClassOrItemID == 0;
    }

    public get isItem() {
        return this.entry.trainerClassOrItemID > 0 &&
            this.entry.trainerSetID == 0;
    }

    public get isTrainer() {
        return this.entry.trainerClassOrItemID > 0 &&
            this.entry.trainerSetID > 0;
    }

    public get isMovementStay() {
        return this.entry.movementByte == 0xFF;
    }

    public get isMovementWander() {
        return this.entry.movementByte == 0xFE;
    }

    public get isMovementInvalid() {
        return !this.isMovementStay && !this.isMovementWander;
    }

    public get isPlayerSprite() {
        return this.entry.rangeDirByte == null;
    }

    public get isNormalSprite() {
        return !this.isPlayerSprite;
    }

    public get isMissable() {
        return this.entry.missableIndex > -1;
    }

    public sprites: any[] = [];
}
