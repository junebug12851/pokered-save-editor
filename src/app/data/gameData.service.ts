import { Injectable } from '@angular/core';
import { utils } from './../utils/utils';

declare var window: {
    require: any;
}

/**
 * Represents a single game data file
 */
class GameData {
    constructor(name: string) {
        this.data = window.require(utils.getPath(`/assets/data/${name}.json`));
    }

    public data: any;
}

/**
 * Looks up game data on demand in the game data folder and index and caches
 * it for use
 */
@Injectable({
    providedIn: 'root'
})
export class GameDataService {

    file(name: string) {
        if (this.cache[name] === undefined)
            this.cache[name] = new GameData(name);

        return this.cache[name];
    }

    protected cache: {
        [key: string]: GameData
    } = {};
}
