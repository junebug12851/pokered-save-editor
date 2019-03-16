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

@Injectable({
    providedIn: 'root'
})
export class PokemonDBService {
    constructor(
        public gd: GameDataService
    ) {
        this.rawItems = this.gd.file("items").data;
        this.rawMoves = this.gd.file("moves").data;
        this.rawPokemon = this.gd.file("pokemon").data;
        this.rawTypes = this.gd.file("types").data;
    }

    public rawItems: Item[];
    public rawMoves: Move[];
    public rawPokemon: Pokemon[];
    public rawTypes: Type[];
}
