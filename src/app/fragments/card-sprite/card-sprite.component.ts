import { SpriteService } from './../../data/sprite.service';
import { SpriteData } from './../../data/savefile-expanded/fragments/SpriteData';
// @ts-ignore
import { OnInit, EventEmitter } from '@angular/core';
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

@Component({
    selector: 'card-sprite',
    templateUrl: './card-sprite.component.pug',
    styleUrls: ['./card-sprite.component.scss'],
})
export class CardSpriteComponent implements OnInit {

    constructor(
        public spriteService: SpriteService
    ) { }

    ngOnInit() {

    }

    @Input()
    // @ts-ignore
    public entry: any = SpriteData.emptyNonPlayerData;

    @Input()
    public disabled: boolean = false;

    @Input()
    public addBtn: boolean = false;

    @Input()
    public remBtn: boolean = false;

    @Output()
    public onAdd: EventEmitter<boolean> = new EventEmitter();

    @Output()
    public onRem: EventEmitter<boolean> = new EventEmitter();

    onAddClick() {
        this.onAdd.emit(true);
    }

    onRemClick() {
        this.onRem.emit(true);
    }

    toggleEntry() {
        this.activeEntry = !this.activeEntry;
    }

    setActiveTab(val: number) {
        this.activeTab = val;
    }

    public get spriteName() {
        const data = this.spriteService.indToName[this.entry.pictureID];
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

    // Load the contents into the DOM at all?
    public activeEntry: boolean = false;

    // Which tab contents to load into the DOM
    public activeTab: number = 0;
}
