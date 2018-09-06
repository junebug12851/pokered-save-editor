import { Sprite } from '../../../assets/data/sprites.d';
import { GameDataService } from './../../data/gameData.service';
// @ts-ignore
import { EventEmitter, OnInit } from '@angular/core';
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

import { Component, Input, Output } from '@angular/core';
import { SpriteData } from './../../data/savefile-expanded/fragments/SpriteData';

// @ts-ignore
const _ = window.require("lodash");

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
    public entry: any = SpriteData.emptyNPC;

    @Input()
    public disabled: boolean = false;

    @Input()
    public addBtn: boolean = false;

    @Input()
    public remBtn: boolean = false;

    @Input()
    public fullViewBtn: boolean = false;

    @Input()
    public fullViewActive: boolean = false;

    @Output()
    public onAdd: EventEmitter<boolean> = new EventEmitter();

    @Output()
    public onRem: EventEmitter<boolean> = new EventEmitter();

    @Output()
    public onFullView: EventEmitter<boolean> = new EventEmitter();

    onAddClick() {
        this.onAdd.emit(true);
    }

    onRemClick() {
        this.onRem.emit(true);
    }

    onFullViewClick() {
        this.onFullView.emit(true);
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
        // @ts-ignore
        return this.entry.trainerClassOrItemID > 0 &&
            // @ts-ignore
            this.entry.trainerSetID == 0;
    }

    public get isTrainer() {
        // @ts-ignore
        return this.entry.trainerClassOrItemID > 0 &&
            // @ts-ignore
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
        // @ts-ignore
        return this.entry.missableIndex > -1;
    }

    public sprites: any[] = [];
}
