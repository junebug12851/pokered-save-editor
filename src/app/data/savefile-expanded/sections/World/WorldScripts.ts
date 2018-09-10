import { WorldScript } from './../../../../../assets/data/world-scripts.d';
import { SaveFileIterator } from './../../SaveFileIterator';
import { SaveFileService } from './../../../savefile.service';
import { GameDataService } from '../../../gameData.service';
import { CurrentScriptProgress } from './currentScriptProgress';

export class WorldScripts {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        const gd = new GameDataService();
        const worldScriptData: WorldScript[] = gd.file("world-scripts").data;

        const it: SaveFileIterator =
            saveFile.iterator.offsetTo(0x289C);

        for (let i = 0; i < worldScriptData.length; i++) {
            const worldScriptEntry = worldScriptData[i];

            let val;
            if (worldScriptEntry.size == 1)
                val = it.getByte();
            else
                val = it.getWord();

            this.currentScriptProgress[worldScriptEntry.name] = val;

            if (worldScriptEntry.skip !== undefined)
                it.skipPadding(worldScriptEntry.skip);
        }
    }

    public save(saveFile: SaveFileService) {
        const gd = new GameDataService();
        const worldScriptData: WorldScript[] = gd.file("world-scripts").data;

        const it: SaveFileIterator =
            saveFile.iterator.offsetTo(0x289C);

        for (let i = 0; i < worldScriptData.length; i++) {
            const worldScriptEntry = worldScriptData[i];
            const val = this.currentScriptProgress[worldScriptEntry.name];

            if (worldScriptEntry.size == 1)
                it.setByte(val);
            else
                it.setWord(val);

            if (worldScriptEntry.skip !== undefined)
                it.skipPadding(worldScriptEntry.skip);
        }
    }

    public currentScriptProgress: CurrentScriptProgress = {
        oaksLab: 0,
        paletteTown: 0,
        rivalsHouse: 0,
        viridianCity: 0,
        pewterCity: 0,
        route3: 0,
        route4: 0,
        viridianGym: 0,
        pewterGym: 0,
        ceruleanGym: 0,
        vermillionGym: 0,
        celadonGym: 0,
        route6: 0,
        route8: 0,
        route24: 0,
        route25: 0,
        route9: 0,
        route10: 0,
        mtMoon1: 0,
        mtMoon3: 0,
        ssAnne8: 0,
        ssAnne9: 0,
        route22: 0,
        playersHouse2: 0,
        viridianMarket: 0,
        route22Gate: 0,
        ceruleanCity: 0,
        ssAnne5: 0,
        viridianForest: 0,
        museum1: 0,
        route13: 0,
        route14: 0,
        route17: 0,
        route19: 0,
        route21: 0,
        safariZoneEntrance: 0,
        rockTunnel2: 0,
        rockTunnel1: 0,
        route11: 0,
        route12: 0,
        route15: 0,
        route16: 0,
        route18: 0,
        route20: 0,
        ssAnne10: 0,
        vermillionCity: 0,
        pokemonTower2: 0,
        pokemonTower3: 0,
        pokemonTower4: 0,
        pokemonTower5: 0,
        pokemonTower6: 0,
        pokemonTower7: 0,
        rocketHideout1: 0,
        rocketHideout2: 0,
        rocketHideout3: 0,
        rocketHideout4: 0,
        route6Gate: 0,
        route8Gate: 0,
        cinnabarIsland: 0,
        mansion1: 0,
        mansion2: 0,
        mansion3: 0,
        mansion4: 0,
        victoryRoad2: 0,
        victoryRoad3: 0,
        fightingDojo: 0,
        silphCo2: 0,
        silphCo3: 0,
        silphCo4: 0,
        silphCo5: 0,
        silphCo6: 0,
        silphCo7: 0,
        silphCo8: 0,
        silphCo9: 0,
        hofRoom: 0,
        rival: 0,
        lorelei: 0,
        bruno: 0,
        agatha: 0,
        unknownDungeon3: 0,
        victoryRoad1: 0,
        lance: 0,
        silphCo10: 0,
        silphCo11: 0,
        fuchsiaGym: 0,
        saffronGym: 0,
        cinnabarGym: 0,
        celadonGameCorner: 0,
        route16Gate: 0,
        billsHouse: 0,
        route5Gate: 0,
        powerPlantRoute7Gate: 0,
        ssAnne2: 0,
        seafoamIslands4: 0,
        route23: 0,
        seafoamIslands5: 0,
        route18Gate: 0,
    };
}
