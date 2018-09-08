import { SaveFileIterator } from './../../SaveFileIterator';
import { SaveFileService } from './../../../savefile.service';

export class WorldScripts {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        const it: SaveFileIterator =
            saveFile.iterator.offsetTo(0x289C);

        this.currentScriptProgress = {
            oaksLab: it.getByte(),
            paletteTown: it.getByte(1),
            rivalsHouse: it.getByte(),
            viridianCity: it.getByte(2),
            pewterCity: it.getByte(),
            route3: it.getByte(),
            route4: it.getByte(1),
            viridianGym: it.getByte(),
            pewterGym: it.getByte(),
            ceruleanGym: it.getByte(),
            vermillionGym: it.getByte(),
            celadonGym: it.getByte(),
            route6: it.getByte(),
            route8: it.getByte(),
            route24: it.getByte(),
            route25: it.getByte(),
            route9: it.getByte(),
            route10: it.getByte(),
            mtMoon1: it.getByte(),
            mtMoon3: it.getByte(),
            ssAnne8: it.getByte(),
            ssAnne9: it.getByte(),
            route22: it.getByte(1),
            playersHouse2: it.getByte(),
            viridianMarket: it.getByte(),
            route22Gate: it.getByte(),
            ceruleanCity: it.getByte(7),
            ssAnne5: it.getByte(),
            viridianForest: it.getByte(),
            museum1: it.getByte(),
            route13: it.getByte(),
            route14: it.getByte(),
            route17: it.getByte(),
            route19: it.getByte(),
            route21: it.getByte(),
            safariZoneEntrance: it.getByte(),
            rockTunnel2: it.getByte(),
            rockTunnel1: it.getByte(1),
            route11: it.getByte(),
            route12: it.getByte(),
            route15: it.getByte(),
            route16: it.getByte(),
            route18: it.getByte(),
            route20: it.getByte(),
            ssAnne10: it.getByte(),
            vermillionCity: it.getByte(),
            pokemonTower2: it.getByte(),
            pokemonTower3: it.getByte(),
            pokemonTower4: it.getByte(),
            pokemonTower5: it.getByte(),
            pokemonTower6: it.getByte(),
            pokemonTower7: it.getByte(),
            rocketHideout1: it.getByte(),
            rocketHideout2: it.getByte(),
            rocketHideout3: it.getByte(),
            rocketHideout4: it.getWord(),
            route6Gate: it.getByte(),
            route8Gate: it.getWord(),
            cinnabarIsland: it.getByte(),
            mansion1: it.getWord(),
            mansion2: it.getByte(),
            mansion3: it.getByte(),
            mansion4: it.getByte(),
            victoryRoad2: it.getByte(),
            victoryRoad3: it.getWord(),
            fightingDojo: it.getByte(),
            silphCo2: it.getByte(),
            silphCo3: it.getByte(),
            silphCo4: it.getByte(),
            silphCo5: it.getByte(),
            silphCo6: it.getByte(),
            silphCo7: it.getByte(),
            silphCo8: it.getByte(),
            silphCo9: it.getByte(),
            hofRoom: it.getByte(),
            rival: it.getByte(),
            lorelei: it.getByte(),
            bruno: it.getByte(),
            agatha: it.getByte(),
            unknownDungeon3: it.getByte(),
            victoryRoad1: it.getByte(1),
            lance: it.getByte(4),
            silphCo10: it.getByte(),
            silphCo11: it.getByte(1),
            fuchsiaGym: it.getByte(),
            saffronGym: it.getByte(1),
            cinnabarGym: it.getByte(),
            celadonGameCorner: it.getByte(),
            route16Gate: it.getByte(),
            billsHouse: it.getByte(),
            route5Gate: it.getByte(),
            powerPlantRoute7Gate: it.getByte(1),
            ssAnne2: it.getByte(),
            seafoamIslands4: it.getByte(),
            route23: it.getByte(),
            seafoamIslands5: it.getByte(),
            route18Gate: it.getByte(),
        };
    }

    public save(saveFile: SaveFileService) {
        const it: SaveFileIterator =
            saveFile.iterator.offsetTo(0x289C);

        it.setByte(this.currentScriptProgress.oaksLab);
        it.setByte(this.currentScriptProgress.paletteTown, 1);
        it.setByte(this.currentScriptProgress.rivalsHouse);
        it.setByte(this.currentScriptProgress.viridianCity, 2);
        it.setByte(this.currentScriptProgress.pewterCity);
        it.setByte(this.currentScriptProgress.route3);
        it.setByte(this.currentScriptProgress.route4, 1);
        it.setByte(this.currentScriptProgress.viridianGym);
        it.setByte(this.currentScriptProgress.pewterGym);
        it.setByte(this.currentScriptProgress.ceruleanGym);
        it.setByte(this.currentScriptProgress.vermillionGym);
        it.setByte(this.currentScriptProgress.celadonGym);
        it.setByte(this.currentScriptProgress.route6);
        it.setByte(this.currentScriptProgress.route8);
        it.setByte(this.currentScriptProgress.route24);
        it.setByte(this.currentScriptProgress.route25);
        it.setByte(this.currentScriptProgress.route9);
        it.setByte(this.currentScriptProgress.route10);
        it.setByte(this.currentScriptProgress.mtMoon1);
        it.setByte(this.currentScriptProgress.mtMoon3);
        it.setByte(this.currentScriptProgress.ssAnne8);
        it.setByte(this.currentScriptProgress.ssAnne9);
        it.setByte(this.currentScriptProgress.route22, 1);
        it.setByte(this.currentScriptProgress.playersHouse2);
        it.setByte(this.currentScriptProgress.viridianMarket);
        it.setByte(this.currentScriptProgress.route22Gate);
        it.setByte(this.currentScriptProgress.ceruleanCity, 7);
        it.setByte(this.currentScriptProgress.ssAnne5);
        it.setByte(this.currentScriptProgress.viridianForest);
        it.setByte(this.currentScriptProgress.museum1);
        it.setByte(this.currentScriptProgress.route13);
        it.setByte(this.currentScriptProgress.route14);
        it.setByte(this.currentScriptProgress.route17);
        it.setByte(this.currentScriptProgress.route19);
        it.setByte(this.currentScriptProgress.route21);
        it.setByte(this.currentScriptProgress.safariZoneEntrance);
        it.setByte(this.currentScriptProgress.rockTunnel2);
        it.setByte(this.currentScriptProgress.rockTunnel1, 1);
        it.setByte(this.currentScriptProgress.route11);
        it.setByte(this.currentScriptProgress.route12);
        it.setByte(this.currentScriptProgress.route15);
        it.setByte(this.currentScriptProgress.route16);
        it.setByte(this.currentScriptProgress.route18);
        it.setByte(this.currentScriptProgress.route20);
        it.setByte(this.currentScriptProgress.ssAnne10);
        it.setByte(this.currentScriptProgress.vermillionCity);
        it.setByte(this.currentScriptProgress.pokemonTower2);
        it.setByte(this.currentScriptProgress.pokemonTower3);
        it.setByte(this.currentScriptProgress.pokemonTower4);
        it.setByte(this.currentScriptProgress.pokemonTower5);
        it.setByte(this.currentScriptProgress.pokemonTower6);
        it.setByte(this.currentScriptProgress.pokemonTower7);
        it.setByte(this.currentScriptProgress.rocketHideout1);
        it.setByte(this.currentScriptProgress.rocketHideout2);
        it.setByte(this.currentScriptProgress.rocketHideout3);
        it.setWord(this.currentScriptProgress.rocketHideout4);
        it.setByte(this.currentScriptProgress.route6Gate);
        it.setWord(this.currentScriptProgress.route8Gate);
        it.setByte(this.currentScriptProgress.cinnabarIsland);
        it.setWord(this.currentScriptProgress.mansion1);
        it.setByte(this.currentScriptProgress.mansion2);
        it.setByte(this.currentScriptProgress.mansion3);
        it.setByte(this.currentScriptProgress.mansion4);
        it.setByte(this.currentScriptProgress.victoryRoad2);
        it.setWord(this.currentScriptProgress.victoryRoad3);
        it.setByte(this.currentScriptProgress.fightingDojo);
        it.setByte(this.currentScriptProgress.silphCo2);
        it.setByte(this.currentScriptProgress.silphCo3);
        it.setByte(this.currentScriptProgress.silphCo4);
        it.setByte(this.currentScriptProgress.silphCo5);
        it.setByte(this.currentScriptProgress.silphCo6);
        it.setByte(this.currentScriptProgress.silphCo7);
        it.setByte(this.currentScriptProgress.silphCo8);
        it.setByte(this.currentScriptProgress.silphCo9);
        it.setByte(this.currentScriptProgress.hofRoom);
        it.setByte(this.currentScriptProgress.rival);
        it.setByte(this.currentScriptProgress.lorelei);
        it.setByte(this.currentScriptProgress.bruno);
        it.setByte(this.currentScriptProgress.agatha);
        it.setByte(this.currentScriptProgress.unknownDungeon3);
        it.setByte(this.currentScriptProgress.victoryRoad1, 1);
        it.setByte(this.currentScriptProgress.lance, 4);
        it.setByte(this.currentScriptProgress.silphCo10);
        it.setByte(this.currentScriptProgress.silphCo11, 1);
        it.setByte(this.currentScriptProgress.fuchsiaGym);
        it.setByte(this.currentScriptProgress.saffronGym, 1);
        it.setByte(this.currentScriptProgress.cinnabarGym);
        it.setByte(this.currentScriptProgress.celadonGameCorner);
        it.setByte(this.currentScriptProgress.route16Gate);
        it.setByte(this.currentScriptProgress.billsHouse);
        it.setByte(this.currentScriptProgress.route5Gate);
        it.setByte(this.currentScriptProgress.powerPlantRoute7Gate, 1);
        it.setByte(this.currentScriptProgress.ssAnne2);
        it.setByte(this.currentScriptProgress.seafoamIslands4);
        it.setByte(this.currentScriptProgress.route23);
        it.setByte(this.currentScriptProgress.seafoamIslands5);
        it.setByte(this.currentScriptProgress.route18Gate);
    }

    public currentScriptProgress = {
        oaksLab: 0 as number,
        paletteTown: 0 as number,
        rivalsHouse: 0 as number,
        viridianCity: 0 as number,
        pewterCity: 0 as number,
        route3: 0 as number,
        route4: 0 as number,
        viridianGym: 0 as number,
        pewterGym: 0 as number,
        ceruleanGym: 0 as number,
        vermillionGym: 0 as number,
        celadonGym: 0 as number,
        route6: 0 as number,
        route8: 0 as number,
        route24: 0 as number,
        route25: 0 as number,
        route9: 0 as number,
        route10: 0 as number,
        mtMoon1: 0 as number,
        mtMoon3: 0 as number,
        ssAnne8: 0 as number,
        ssAnne9: 0 as number,
        route22: 0 as number,
        playersHouse2: 0 as number,
        viridianMarket: 0 as number,
        route22Gate: 0 as number,
        ceruleanCity: 0 as number,
        ssAnne5: 0 as number,
        viridianForest: 0 as number,
        museum1: 0 as number,
        route13: 0 as number,
        route14: 0 as number,
        route17: 0 as number,
        route19: 0 as number,
        route21: 0 as number,
        safariZoneEntrance: 0 as number,
        rockTunnel2: 0 as number,
        rockTunnel1: 0 as number,
        route11: 0 as number,
        route12: 0 as number,
        route15: 0 as number,
        route16: 0 as number,
        route18: 0 as number,
        route20: 0 as number,
        ssAnne10: 0 as number,
        vermillionCity: 0 as number,
        pokemonTower2: 0 as number,
        pokemonTower3: 0 as number,
        pokemonTower4: 0 as number,
        pokemonTower5: 0 as number,
        pokemonTower6: 0 as number,
        pokemonTower7: 0 as number,
        rocketHideout1: 0 as number,
        rocketHideout2: 0 as number,
        rocketHideout3: 0 as number,
        rocketHideout4: 0 as number,
        route6Gate: 0 as number,
        route8Gate: 0 as number,
        cinnabarIsland: 0 as number,
        mansion1: 0 as number,
        mansion2: 0 as number,
        mansion3: 0 as number,
        mansion4: 0 as number,
        victoryRoad2: 0 as number,
        victoryRoad3: 0 as number,
        fightingDojo: 0 as number,
        silphCo2: 0 as number,
        silphCo3: 0 as number,
        silphCo4: 0 as number,
        silphCo5: 0 as number,
        silphCo6: 0 as number,
        silphCo7: 0 as number,
        silphCo8: 0 as number,
        silphCo9: 0 as number,
        hofRoom: 0 as number,
        rival: 0 as number,
        lorelei: 0 as number,
        bruno: 0 as number,
        agatha: 0 as number,
        unknownDungeon3: 0 as number,
        victoryRoad1: 0 as number,
        lance: 0 as number,
        silphCo10: 0 as number,
        silphCo11: 0 as number,
        fuchsiaGym: 0 as number,
        saffronGym: 0 as number,
        cinnabarGym: 0 as number,
        celadonGameCorner: 0 as number,
        route16Gate: 0 as number,
        billsHouse: 0 as number,
        route5Gate: 0 as number,
        powerPlantRoute7Gate: 0 as number,
        ssAnne2: 0 as number,
        seafoamIslands4: 0 as number,
        route23: 0 as number,
        seafoamIslands5: 0 as number,
        route18Gate: 0 as number,
    };
}
