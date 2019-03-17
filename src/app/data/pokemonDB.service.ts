import { Injectable } from "@angular/core";
import { GameDataService } from "./gameData.service";

import { Item } from "../../assets/data/items";
import { Move } from "../../assets/data/moves";
import { Pokemon } from "../../assets/data/pokemon";
import { Type } from "../../assets/data/types";

/**
 * Files
 *
 * items
 * moves
 * pokemon
 * types
 */

// @ts-ignore
const _ = window.require("lodash");

@Injectable({
    providedIn: 'root'
})
export class PokemonDBService {
    constructor(
        public gd: GameDataService
    ) {
        // @ts-ignore
        window.pokemonDB = this;

        // Get Raw Data
        this.rawItems = this.gd.file("items").data;
        this.rawMoves = this.gd.file("moves").data;
        this.rawPokemon = this.gd.file("pokemon").data;
        this.rawTypes = this.gd.file("types").data;

        // Convert to index data by name in snake_case form
        this.process1(this.rawItems, this.items, "name");
        this.process1(this.rawMoves, this.moves, "name");
        this.process1(this.rawPokemon, this.pokemon, "name");
        this.process1(this.rawTypes, this.types, "name");

        // Circular Link everything
        // Yes I'm aware of the dangers and pitfalls of circular linking
        // I'm choosing it anyways for now
        this.process2Items();
        this.process2Moves();
        this.process2Pokemon();
    }

    process1(from: any, to: any, key: any) {
        for(let i = 0; i < from.length; i++) {
            const entry = from[i];
            to[_.snakeCase(entry[key])] = _.cloneDeep(entry);
        }
    }

    process2Items() {
        const self = this;

        _.forOwn(this.items, function(value: any) {
            if(value.tm !== undefined) {
                value._tm = value.tm;
                value.tm = _.find(self.moves, ['tm', value.tm]);
            }
            if(value.hm !== undefined) {
                value._hm = value.hm;
                value.hm = _.find(self.moves, ['hm', value.hm]);
            }
        });
    }

    process2Moves() {
        const self = this;

        _.forOwn(this.moves, function(value: any) {
            if(value.type !== undefined) {
                value._type = value.type;
                value.type = _.find(self.types, ['name', _.startCase(_.lowerCase(value.type))]);
            }
            if(value.tm !== undefined) {
                value._tm = value.tm;
                value.tm = _.find(self.items, ['_tm', value.tm]);
            }
            if(value.hm !== undefined) {
                value._hm = value.hm;
                value.hm = _.find(self.items, ['_hm', value.hm]);
            }
        });
    }

    process2Pokemon() {
        const self = this;

        _.forOwn(this.pokemon, function(value: any) {
            if(value.moves !== undefined) {
                for(let i = 0; i < value.moves.length; i++) {
                    const move = value.moves[i];
                    move._move = move.move;
                    move.move = _.find(self.moves, ['name', _.startCase(_.lowerCase(move.move))]);
                }
            }

            if(value.initial !== undefined) {
                value._initial = _.cloneDeep(value.initial);
                for(let i = 0; i < value.initial.length; i++) {
                    const initial = value.initial[i];
                    value.initial[i] = _.find(self.moves, ['name', _.startCase(_.lowerCase(initial))]);
                }
            }

            if(value.tmHm !== undefined) {
                value._tmHm = _.cloneDeep(value.tmHm);
                for(let i = 0; i < value.tmHm.length; i++) {
                    const tmHmEntry = value.tmHm[i];
                    value.tmHm[i] = _.find(self.moves, ['_tm', tmHmEntry]);
                }
            }

            if(value.type1 !== undefined) {
                value._type1 = value.type1;
                value.type1 = _.find(self.types, ['name', _.startCase(_.lowerCase(value.type1))]);
            }

            if(value.type2 !== undefined) {
                value._type2 = value.type2;
                value.type2 = _.find(self.types, ['name', _.startCase(_.lowerCase(value.type2))]);
            }

            if(value.evolution !== undefined) {
                const process = (entry: any) => {
                    if(entry.item !== undefined) {
                        entry._item = entry.item;
                        entry.item = _.find(self.items, ['name', _.startCase(_.lowerCase(entry.item))]);
                    }

                    entry._toName = entry.toName;
                    entry.toName = _.find(self.pokemon, ['name', _.startCase(_.lowerCase(entry.toName))]);
                }

                if(Array.isArray(value.evolution)) {
                    for(let i = 0; i < value.evolution.length; i++) {
                        process(value.evolution[i]);
                    }
                }
                else
                    process(value.evolution);
            }
        });
    }

    public rawItems: Item[];
    public rawMoves: Move[];
    public rawPokemon: Pokemon[];
    public rawTypes: Type[];

    public items: {
        [key: string]: any
    } = {};

    public moves: {
        [key: string]: any
    } = {};

    public pokemon: {
        [key: string]: any
    } = {};

    public types: {
        [key: string]: any
    } = {};
}
