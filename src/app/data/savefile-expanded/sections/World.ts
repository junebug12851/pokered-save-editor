import { SaveFileIterator } from './../SaveFileIterator';
import { PokemonBox } from '../fragments/PokemonBox';
import { SaveFileService } from '../../savefile.service';

export class World {
    constructor(saveFile: SaveFileService) {
        this.options = {
            // Bits 0-3 [max 15]
            textSpeedSlowness: (saveFile.getByte(0x2601) & 0b00001111),
            battleStyleSet: saveFile.getBit(0x2601, 1, 6),
            battleAnimOff: saveFile.getBit(0x2601, 1, 7),
        };

        this.letterDelay = {
            normalDelay: saveFile.getBit(0x2604, 1, 0),
            dontDelay: saveFile.getBit(0x2604, 1, 1),
        };

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

        // 32 bytes of bitfield
        this.missableObjectFlags = [];
        it.offsetTo(0x2852);
        for (let i = 0; i < 32; i++) {
            // Push bits in order of this byte
            this.missableObjectFlags.push(it.getBit(1, 0));
            this.missableObjectFlags.push(it.getBit(1, 1));
            this.missableObjectFlags.push(it.getBit(1, 2));
            this.missableObjectFlags.push(it.getBit(1, 3));
            this.missableObjectFlags.push(it.getBit(1, 4));
            this.missableObjectFlags.push(it.getBit(1, 5));
            this.missableObjectFlags.push(it.getBit(1, 6));
            this.missableObjectFlags.push(it.getBit(1, 7));

            // Increment iterator
            it.inc();
        }

        this.ownedHidenItems = [];
        it.offsetTo(0x299C);
        for (let i = 0; i < 14; i++) {
            // Push bits in order of this byte
            this.ownedHidenItems.push(it.getBit(1, 0));
            this.ownedHidenItems.push(it.getBit(1, 1));
            this.ownedHidenItems.push(it.getBit(1, 2));
            this.ownedHidenItems.push(it.getBit(1, 3));
            this.ownedHidenItems.push(it.getBit(1, 4));
            this.ownedHidenItems.push(it.getBit(1, 5));
            this.ownedHidenItems.push(it.getBit(1, 6));
            this.ownedHidenItems.push(it.getBit(1, 7));

            // Increment iterator
            it.inc();
        }

        this.ownedHiddenCoins = [];
        it.offsetTo(0x29AA);
        for (let i = 0; i < 2; i++) {
            // Push bits in order of this byte
            this.ownedHiddenCoins.push(it.getBit(1, 0));
            this.ownedHiddenCoins.push(it.getBit(1, 1));
            this.ownedHiddenCoins.push(it.getBit(1, 2));
            this.ownedHiddenCoins.push(it.getBit(1, 3));
            this.ownedHiddenCoins.push(it.getBit(1, 4));
            this.ownedHiddenCoins.push(it.getBit(1, 5));
            this.ownedHiddenCoins.push(it.getBit(1, 6));
            this.ownedHiddenCoins.push(it.getBit(1, 7));

            // Increment iterator
            it.inc();
        }

        this.visitedTowns = [];
        it.offsetTo(0x29B7);
        for (let i = 0; i < 2; i++) {
            // Push bits in order of this byte
            this.visitedTowns.push(it.getBit(1, 0));
            this.visitedTowns.push(it.getBit(1, 1));
            this.visitedTowns.push(it.getBit(1, 2));
            this.visitedTowns.push(it.getBit(1, 3));
            this.visitedTowns.push(it.getBit(1, 4));
            this.visitedTowns.push(it.getBit(1, 5));
            this.visitedTowns.push(it.getBit(1, 6));
            this.visitedTowns.push(it.getBit(1, 7));

            // Increment iterator
            it.inc();
        }

        this.fossilItemGiven = saveFile.getByte(0x29BB);
        this.fossilPkmnResult = saveFile.getByte(0x29BC);
        this.lastBlackoutMap = saveFile.getByte(0x29C5);
        this.lastMap = saveFile.getByte(0x2611);

        this.obtainedOldRod = saveFile.getBit(0x29D4, 1, 3);
        this.obtainedGoodRod = saveFile.getBit(0x29D4, 1, 4);
        this.obtainedSuperRod = saveFile.getBit(0x29D4, 1, 5);
        this.satisfiedSaffronGuards = saveFile.getBit(0x29D4, 1, 6);
        this.obtainedLapras = saveFile.getBit(0x29DA, 1, 0);
        this.everHealedPokemon = saveFile.getBit(0x29DA, 1, 2);
        this.obtainedStarterPokemon = saveFile.getBit(0x29DA, 1, 3);
        this.debugMode = saveFile.getBit(0x29DE, 1, 1);
        this.defeatedLorelei = saveFile.getBit(0x29E0, 1, 1);

        this.inGameTrades = [];
        it.offsetTo(0x29E3);
        for (let i = 0; i < 2; i++) {
            // Push bits in order of this byte
            this.inGameTrades.push(it.getBit(1, 0));
            this.inGameTrades.push(it.getBit(1, 1));
            this.inGameTrades.push(it.getBit(1, 2));
            this.inGameTrades.push(it.getBit(1, 3));
            this.inGameTrades.push(it.getBit(1, 4));
            this.inGameTrades.push(it.getBit(1, 5));
            this.inGameTrades.push(it.getBit(1, 6));
            this.inGameTrades.push(it.getBit(1, 7));

            // Increment iterator
            it.inc();
        }

        this.completedEvents = [];
        it.offsetTo(0x29F3);
        for (let i = 0; i < 320; i++) {
            // Push bits in order of this byte
            this.completedEvents.push(it.getBit(1, 0));
            this.completedEvents.push(it.getBit(1, 1));
            this.completedEvents.push(it.getBit(1, 2));
            this.completedEvents.push(it.getBit(1, 3));
            this.completedEvents.push(it.getBit(1, 4));
            this.completedEvents.push(it.getBit(1, 5));
            this.completedEvents.push(it.getBit(1, 6));
            this.completedEvents.push(it.getBit(1, 7));

            // Increment iterator
            it.inc();
        }

        it.offsetTo(0x2CED);
        this.playtime = {
            hours: it.getByte(),
            maxed: it.getByte(),
            minutes: it.getByte(),
            seconds: it.getByte(),
            frames: it.getByte(),
        };

        // Is the daycare in use, if so extract daycare Pokemon Information
        if (saveFile.getByte(0x2CF4) > 0)
            this.dayCare = new PokemonBox(saveFile, 0x2D0B, 0x2CF5, 0x2D00, 0);
        else
            this.dayCare = null;
    }

    /**
     * Events
     */
    public completedEvents: boolean[];

    /**
     * Hidden
     */

    public ownedHidenItems: boolean[];
    public ownedHiddenCoins: boolean[];

    /**
     * Trades
     */
    public inGameTrades: boolean[];

    /**
     * Towns
     */
    public visitedTowns: boolean[];

    /**
     * Missables
     */
    public missableObjectFlags: boolean[];

    /**
     * Next Script
     */
    public currentScriptProgress: {
        oaksLab: number,
        paletteTown: number,
        rivalsHouse: number,
        viridianCity: number,
        pewterCity: number,
        route3: number,
        route4: number,
        viridianGym: number,
        pewterGym: number,
        ceruleanGym: number,
        vermillionGym: number,
        celadonGym: number,
        route6: number,
        route8: number,
        route24: number,
        route25: number,
        route9: number,
        route10: number,
        mtMoon1: number,
        mtMoon3: number,
        ssAnne8: number,
        ssAnne9: number,
        route22: number,
        playersHouse2: number,
        viridianMarket: number,
        route22Gate: number,
        ceruleanCity: number,
        ssAnne5: number,
        viridianForest: number,
        museum1: number,
        route13: number,
        route14: number,
        route17: number,
        route19: number,
        route21: number,
        safariZoneEntrance: number,
        rockTunnel2: number,
        rockTunnel1: number,
        route11: number,
        route12: number,
        route15: number,
        route16: number,
        route18: number,
        route20: number,
        ssAnne10: number,
        vermillionCity: number,
        pokemonTower2: number,
        pokemonTower3: number,
        pokemonTower4: number,
        pokemonTower5: number,
        pokemonTower6: number,
        pokemonTower7: number,
        rocketHideout1: number,
        rocketHideout2: number,
        rocketHideout3: number,
        rocketHideout4: number,
        route6Gate: number,
        route8Gate: number,
        cinnabarIsland: number,
        mansion1: number,
        mansion2: number,
        mansion3: number,
        mansion4: number,
        victoryRoad2: number,
        victoryRoad3: number,
        fightingDojo: number,
        silphCo2: number,
        silphCo3: number,
        silphCo4: number,
        silphCo5: number,
        silphCo6: number,
        silphCo7: number,
        silphCo8: number,
        silphCo9: number,
        hofRoom: number,
        rival: number,
        lorelei: number,
        bruno: number,
        agatha: number,
        unknownDungeon3: number,
        victoryRoad1: number,
        lance: number,
        silphCo10: number,
        silphCo11: number,
        fuchsiaGym: number,
        saffronGym: number,
        cinnabarGym: number,
        celadonGameCorner: number,
        route16Gate: number,
        billsHouse: number,
        route5Gate: number,
        powerPlantRoute7Gate: number,
        ssAnne2: number,
        seafoamIslands4: number,
        route23: number,
        seafoamIslands5: number,
        route18Gate: number,
    };

    /**
     * Completed
     */

    // Rods
    public obtainedOldRod: boolean;
    public obtainedGoodRod: boolean;
    public obtainedSuperRod: boolean;

    // Pokemon
    public obtainedLapras: boolean;
    public obtainedStarterPokemon: boolean;
    public everHealedPokemon: boolean;

    // Other
    public satisfiedSaffronGuards: boolean;
    public defeatedLorelei: boolean;

    /**
     * General
     */
    // Maps
    public lastBlackoutMap: number;
    public lastMap: number;

    // Options
    public options: {
        textSpeedSlowness: number,
        battleStyleSet: boolean,
        battleAnimOff: boolean,
    };

    public letterDelay: {
        normalDelay: boolean,
        dontDelay: boolean,
    }

    /**
     * Other
     */
    public debugMode: boolean;

    public playtime: {
        hours: number,
        maxed: number,
        minutes: number,
        seconds: number,
        frames: number
    };

    public fossilItemGiven: number;
    public fossilPkmnResult: number;

    /**
     * Daycare
     */
    public dayCare: PokemonBox | null;
}
