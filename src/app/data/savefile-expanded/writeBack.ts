import { SaveFileIterator } from './SaveFileIterator';
import { SaveFileService } from './../savefile.service';
import { PokemonBox } from './fragments/PokemonBox';
import { PokemonParty } from './fragments/PokemonParty';

function pokemonBox(
    start: number,
    nameStart: number,
    otNameStart: number,
    data: PokemonBox,
    it: SaveFileIterator,
    index: number,
    recordSize: number = 0x21) {

    const offset = (recordSize * index) + start;

    it.offsetTo(offset);
    it.setByte(data.species);
    it.setWord(data.hp);
    it.setByte(data.level);
    it.setByte(data.status);
    it.setByte(data.type1);

    if (data.type2 == 0xFF)
        it.setByte(data.type1);
    else
        it.setByte(data.type2);

    it.setByte(data.catchRate);

    it.setByte(data.moves[0].moveID);
    it.setByte(data.moves[1].moveID);
    it.setByte(data.moves[2].moveID);
    it.setByte(data.moves[3].moveID);

    it.setHex(0x2, data.otID, false);

    const exp = data.exp;
    const expArr = [];
    expArr.push((exp & 0xFF0000) >> 16);
    expArr.push((exp & 0x00FF00) >> 8);
    expArr.push(exp & 0x0000FF);
    it.copyRange(0x3, new Uint8Array(expArr));

    it.setWord(data.hpExp);
    it.setWord(data.attackExp);
    it.setWord(data.defenseExp);
    it.setWord(data.speedExp);
    it.setWord(data.specialExp);

    let dvs = 0;
    dvs |= ((data.dv.attack) << 12);
    dvs |= ((data.dv.defense) << 8);
    dvs |= ((data.dv.speed) << 4);
    dvs |= data.dv.special;
    it.setWord(dvs);

    it.setByte(data.moves[0].pp | (data.moves[0].ppUp << 6));
    it.setByte(data.moves[1].pp | (data.moves[1].ppUp << 6));
    it.setByte(data.moves[2].pp | (data.moves[2].ppUp << 6));
    it.setByte(data.moves[3].pp | (data.moves[3].ppUp << 6));

    it.offsetTo((index * 0xB) + nameStart);
    it.setStr(0xB, 10, data.nickname);

    it.offsetTo((index * 0xB) + otNameStart);
    it.setStr(0xB, 10, data.otName);
}

function pokemonParty(
    start: number,
    nameStart: number,
    otNameStart: number,
    data: PokemonParty,
    it: SaveFileIterator,
    index: number,
) {
    pokemonBox(
        start,
        nameStart,
        otNameStart,
        data,
        it,
        index,
        0x2C
    );

    it.setByte(data.level);
    it.setWord(data.maxHP);
    it.setWord(data.attack);
    it.setWord(data.defense);
    it.setWord(data.speed);
    it.setWord(data.special);
}

// Writes all the expanded data back to the save file, it only overwrites used
// portions of the save file
export function writeBack(file: SaveFileService) {

    // Prepare
    const full = file.fileDataExpanded;
    const it = file.iterator;

    // Hall of Fame Records
    // Write only records in Expanded Data but no more than 50
    for (let i = 0; i < full.hallOfFame.length && i < 50; i++) {

        // Calculate record start offset for this HoF record
        // Each record is 0x60 in size and starts at offset 0x598
        // There is space for only up to 50 records
        const recordOffset = (0x60 * i) + 0x598;

        // Grab Hall of Fame Record
        const record = full.hallOfFame[i];

        // A record consists of 6 Pokemon
        // Loop through them all and ensure no more than 6
        for (let j = 0; j < record.pokemon.length && j < 6; j++) {

            // Move offset to start of record
            it.offsetTo((0x10 * j) + recordOffset);

            // Grab Hall of Fame Pokemon Record in HoF Record
            // It consists of only 3 items in order
            // * Species Number
            // * Level
            // * Pokemon Name
            const pokemon = record.pokemon[j];

            // Write
            it.setByte(pokemon.species);
            it.setByte(pokemon.level);
            it.setStr(0xB, 10, pokemon.name, 3);
        }
    }

    // Offset To Player Name and write
    it.offsetTo(0x2598);
    it.setStr(0xB, 7, full.player.playerName); // 0x2598

    // Set Pokedex Owned // 0x25A3
    for (let i = 0; i < 0x13; i++) {
        it.setBit(0x1, 0, full.player.pokedexOwned[(8 * i) + 0]);
        it.setBit(0x1, 1, full.player.pokedexOwned[(8 * i) + 1]);
        it.setBit(0x1, 2, full.player.pokedexOwned[(8 * i) + 2]);
        it.setBit(0x1, 3, full.player.pokedexOwned[(8 * i) + 3]);
        it.setBit(0x1, 4, full.player.pokedexOwned[(8 * i) + 4]);
        it.setBit(0x1, 5, full.player.pokedexOwned[(8 * i) + 5]);
        it.setBit(0x1, 6, full.player.pokedexOwned[(8 * i) + 6]);
        it.setBit(0x1, 7, full.player.pokedexOwned[(8 * i) + 7]);

        it.inc();
    }

    // Set Pokedex Seen
    it.offsetTo(0x25B6); // 25B6

    for (let i = 0; i < 0x13; i++) {
        it.setBit(0x1, 0, full.player.pokedexSeen[(8 * i) + 0]);
        it.setBit(0x1, 1, full.player.pokedexSeen[(8 * i) + 1]);
        it.setBit(0x1, 2, full.player.pokedexSeen[(8 * i) + 2]);
        it.setBit(0x1, 3, full.player.pokedexSeen[(8 * i) + 3]);
        it.setBit(0x1, 4, full.player.pokedexSeen[(8 * i) + 4]);
        it.setBit(0x1, 5, full.player.pokedexSeen[(8 * i) + 5]);
        it.setBit(0x1, 6, full.player.pokedexSeen[(8 * i) + 6]);
        it.setBit(0x1, 7, full.player.pokedexSeen[(8 * i) + 7]);

        it.inc();
    }

    // Set Bag Items
    // Allow no more than 20 items
    file.fileData[0x25C9] = full.player.bagItems.length; // Bag Items Count
    it.offsetTo(0x25CA); // 25CA
    for (let i = 0; i < full.player.bagItems.length && i < 20; i++) {
        const item = full.player.bagItems[i];

        it.setByte(item.id);
        it.setByte(item.amount);
    }

    // List terminator
    it.setByte(0xFF);

    // Set Money
    it.offsetTo(0x25F3);
    it.setBCD(0x3, full.player.money); // 25F3

    // Set Rival Name
    it.setStr(0xB, 7, full.rival.rivalName); // 25F6

    // Set Text speed first
    let byte = it.getByte();
    byte |= full.world.options.textSpeedSlowness & 0b00001111;
    it.dec();
    it.setByte(byte);

    // Now set other 2 options
    it.dec();
    it.setBit(0x1, 6, full.world.options.battleStyleSet);
    it.setBit(0x1, 7, full.world.options.battleAnimOff); // 2601
    it.inc(); // 2602

    // Set Badges
    it.setBit(0x1, 0, full.player.badges.boulder);
    it.setBit(0x1, 1, full.player.badges.cascade);
    it.setBit(0x1, 2, full.player.badges.thunder);
    it.setBit(0x1, 3, full.player.badges.rainbow);
    it.setBit(0x1, 4, full.player.badges.soul);
    it.setBit(0x1, 5, full.player.badges.marsh);
    it.setBit(0x1, 6, full.player.badges.volcano);
    it.setBit(0x1, 7, full.player.badges.earth);
    it.inc(); // 2603
    it.inc(); // 2604

    // Set Letter Delay
    it.setBit(0x1, 0, full.world.letterDelay.normalDelay);
    it.setBit(0x1, 1, full.world.letterDelay.dontDelay);
    it.inc(); // 2605

    // Player ID
    it.setHex(0x2, full.player.playerID, false); // 2605-2607

    // Music
    it.setByte(full.area.musicID); // 2607
    it.setByte(full.area.musicBank); // 2608
    it.setByte(full.area.contrast); // 2609
    it.setByte(full.area.curMap); // 260A
    it.setWord(full.area.currentTileBlockMapViewPointer); // 260B-260C
    it.setByte(full.area.yCoord); // 260D
    it.setByte(full.area.xCoord); // 260E
    it.setByte(full.area.yBlockCoord); // 260F
    it.setByte(full.area.xBlockCoord); // 2610
    it.setByte(full.world.lastMap, 1); // 2611-2612
    it.setByte(full.area.curTileset); // 2613
    it.setByte(full.area.mapHeight); // 2614
    it.setByte(full.area.mapWidth); // 2615

    it.setWord(full.area.mapDataPtr); // 2616-2617
    it.setWord(full.area.mapTextPtr); // 2618-2619
    it.setWord(full.area.mapScriptPtr); // 261A-261B

    it.setBit(0x1, 0, full.area.mapConn.east);
    it.setBit(0x1, 1, full.area.mapConn.west);
    it.setBit(0x1, 2, full.area.mapConn.south);
    it.setBit(0x1, 3, full.area.mapConn.north);
    it.inc(); // 261C

    // Connection Data North
    it.setByte(full.area.mapConnData.north.mapPtr); // 261D
    it.setWord(full.area.mapConnData.north.stripSrc); // 261E-F
    it.setWord(full.area.mapConnData.north.stripDest); // 2620-2621
    it.setByte(full.area.mapConnData.north.stripWidth); // 2622
    it.setByte(full.area.mapConnData.north.width); // 2623
    it.setByte(full.area.mapConnData.north.yAlign); // 2624
    it.setByte(full.area.mapConnData.north.xAlign); // 2625
    it.setWord(full.area.mapConnData.north.viewPtr); // 2626-2627

    // Connection Data South
    it.setByte(full.area.mapConnData.south.mapPtr); // 2628
    it.setWord(full.area.mapConnData.south.stripSrc); // 2629-A
    it.setWord(full.area.mapConnData.south.stripDest); // 262B-C
    it.setByte(full.area.mapConnData.south.stripWidth); // 262D
    it.setByte(full.area.mapConnData.south.width); // 262E
    it.setByte(full.area.mapConnData.south.yAlign); // 262F
    it.setByte(full.area.mapConnData.south.xAlign); // 2630
    it.setWord(full.area.mapConnData.south.viewPtr); // 2631-2

    // Connection Data West
    it.setByte(full.area.mapConnData.west.mapPtr); // 2633
    it.setWord(full.area.mapConnData.west.stripSrc); // 2634-5
    it.setWord(full.area.mapConnData.west.stripDest); // 2636-7
    it.setByte(full.area.mapConnData.west.stripWidth); // 2638
    it.setByte(full.area.mapConnData.west.width); // 2639
    it.setByte(full.area.mapConnData.west.yAlign); // 263A
    it.setByte(full.area.mapConnData.west.xAlign); // 263B
    it.setWord(full.area.mapConnData.west.viewPtr); // 263C-D

    // Connection Data East
    it.setByte(full.area.mapConnData.east.mapPtr); // 263E
    it.setWord(full.area.mapConnData.east.stripSrc); // 263F-2640
    it.setWord(full.area.mapConnData.east.stripDest); // 2641-2
    it.setByte(full.area.mapConnData.east.stripWidth); // 2643
    it.setByte(full.area.mapConnData.east.width); // 2644
    it.setByte(full.area.mapConnData.east.yAlign); // 2645
    it.setByte(full.area.mapConnData.east.xAlign); // 2646
    it.setWord(full.area.mapConnData.east.viewPtr); // 2647-8

    // Sprite Set
    for (let i = 0; i < 11; i++) {
        it.setByte(full.area.spriteSet[i]);
    }

    // Realign after for loop
    it.offsetTo(0x2654);

    it.setByte(full.area.spriteSetId, 4); // 2654 (Skip +4)
    it.setByte(full.area.outOfBoundsTile); // 2659

    // Warp Data
    it.setByte(full.area.warpData.length); // 265A

    // 265B
    for (let i = 0; i < full.area.warpData.length && i < 32; i++) {
        const warpData = full.area.warpData[i];

        // Warp data consists of only 4 bytes, there can be no more than 32
        // entries
        it.setByte(warpData.y);
        it.setByte(warpData.x);
        it.setByte(warpData.destWarp);
        it.setByte(warpData.destMap);
    }

    // Re-position
    it.offsetTo(0x26DB); // 26DB
    it.setByte(full.area.warpDest); // 26DB

    // Re-position after long set of padding
    it.offsetTo(0x275C); // 275C
    it.setByte(full.area.signData.length); // 275C

    // Sign coords are split into 2 sections in the save file
    for (let i = 0; i < full.area.signData.length && i < 16; i++) {
        const signData = full.area.signData[i];

        // Sign Data Part 1 consists of only 2 bytes, Y and X
        it.setByte(signData.y);
        it.setByte(signData.x);
    }

    it.offsetTo(0x277D); // 277D
    for (let i = 0; i < full.area.signData.length && i < 16; i++) {
        const signData = full.area.signData[i];

        // Sign Data Part 2 cosnists of text id's
        it.setByte(signData.text);
    }

    it.offsetTo(0x278D); // 278D
    it.setByte(full.area.spriteData.length); // 278D

    it.setByte(full.area.yOffsetSinceLastSpecialWarp); // 278E
    it.setByte(full.area.xOffsetSinceLastSpecialWarp); // 278F

    // 2790
    // Sprite Data is split into 2 sections in the save file
    // Section 1
    for (let i = 0; i < full.area.spriteData.length && i < 16; i++) {
        const sprData = full.area.spriteData[i];
        it.setByte(sprData.movementByte);
        it.setByte(sprData.textID);
    }

    // Section 2
    it.offsetTo(0x27B0); // 27B0
    for (let i = 0; i < full.area.spriteData.length && i < 16; i++) {
        const sprData = full.area.spriteData[i];
        it.setByte(sprData.trainerClassOrItemID);
        it.setByte(sprData.trainerSetID);
    }

    it.offsetTo(0x27D0); // 27D0
    it.setByte(full.area.map2x2Height); // 27D0
    it.setByte(full.area.map2x2Width); // 27D1

    it.setWord(full.area.mapViewVRAMPointer); // 27D2-3

    it.setByte(full.area.playerMoveDir); // 27D4
    it.setByte(full.area.playerLastStopDir); // 27D5
    it.setByte(full.area.playerCurDir); // 27D6

    it.setByte(full.area.tilesetBank); // 27D7
    it.setWord(full.area.tilesetBlockPtr); // 27D8-9
    it.setWord(full.area.tilesetGfxPtr); // 27DA-B
    it.setWord(full.area.tilesetCollPtr); // 27DC-D

    // 27DE-27E0
    it.copyRange(0x3, new Uint8Array(full.area.tilesetTalkingOverTiles));

    // 27E1-27E5
    it.copyRange(0x5, new Uint8Array(full.area.tilesetGrassTiles));

    // Set Box Items
    // Allow no more than 50 items
    it.setByte(full.storage.boxItems.length); // 27E6
    it.offsetTo(0x25CA); // 27E7
    for (let i = 0; i < full.storage.boxItems.length && i < 50; i++) {
        const item = full.storage.boxItems[i];

        it.setByte(item.id);
        it.setByte(item.amount);
    }

    it.setByte(0xFF);

    it.offsetTo(0x284C); // 284C
    it.setByte((full.storage.curBox - 1) & 0b01111111); // 284C
    it.dec(); // 284C
    it.setBit(0x1, 7, full.storage.changedBoxesBefore); // 284C

    it.offsetTo(0x284E); // 284E
    it.setByte(full.hallOfFame.length, 1); // 284E + 1 Padding

    it.setBCD(0x2, full.player.coins); // 2850-2851

    // 2852
    for (let i = 0; i < 32; i++) {
        // Push bits in order of this byte
        it.setBit(0x1, 0, full.world.missableObjectFlags[(8 * i) + 0]);
        it.setBit(0x1, 1, full.world.missableObjectFlags[(8 * i) + 1]);
        it.setBit(0x1, 2, full.world.missableObjectFlags[(8 * i) + 2]);
        it.setBit(0x1, 3, full.world.missableObjectFlags[(8 * i) + 3]);
        it.setBit(0x1, 4, full.world.missableObjectFlags[(8 * i) + 4]);
        it.setBit(0x1, 5, full.world.missableObjectFlags[(8 * i) + 5]);
        it.setBit(0x1, 6, full.world.missableObjectFlags[(8 * i) + 6]);
        it.setBit(0x1, 7, full.world.missableObjectFlags[(8 * i) + 7]);

        // Increment iterator
        it.inc();
    }

    it.offsetTo(0x287A); // 287A
    // 287A
    for (let i = 0; i < full.area.missableList.length && i < 17; i++) {
        const val = full.area.missableList[i];

        it.setByte(val.spriteID);
        it.setByte(val.missableIndex);
    }
    it.setByte(0xFF);

    it.offsetTo(0x289C); // 289C
    it.setByte(full.world.currentScriptProgress.oaksLab);
    it.setByte(full.world.currentScriptProgress.paletteTown, 1);
    it.setByte(full.world.currentScriptProgress.rivalsHouse);
    it.setByte(full.world.currentScriptProgress.viridianCity, 2);
    it.setByte(full.world.currentScriptProgress.pewterCity);
    it.setByte(full.world.currentScriptProgress.route3);
    it.setByte(full.world.currentScriptProgress.route4, 1);
    it.setByte(full.world.currentScriptProgress.viridianGym);
    it.setByte(full.world.currentScriptProgress.pewterGym);
    it.setByte(full.world.currentScriptProgress.ceruleanGym);
    it.setByte(full.world.currentScriptProgress.vermillionGym);
    it.setByte(full.world.currentScriptProgress.celadonGym);
    it.setByte(full.world.currentScriptProgress.route6);
    it.setByte(full.world.currentScriptProgress.route8);
    it.setByte(full.world.currentScriptProgress.route24);
    it.setByte(full.world.currentScriptProgress.route25);
    it.setByte(full.world.currentScriptProgress.route9);
    it.setByte(full.world.currentScriptProgress.route10);
    it.setByte(full.world.currentScriptProgress.mtMoon1);
    it.setByte(full.world.currentScriptProgress.mtMoon3);
    it.setByte(full.world.currentScriptProgress.ssAnne8);
    it.setByte(full.world.currentScriptProgress.ssAnne9);
    it.setByte(full.world.currentScriptProgress.route22, 1);
    it.setByte(full.world.currentScriptProgress.playersHouse2);
    it.setByte(full.world.currentScriptProgress.viridianMarket);
    it.setByte(full.world.currentScriptProgress.route22Gate);
    it.setByte(full.world.currentScriptProgress.ceruleanCity, 7);
    it.setByte(full.world.currentScriptProgress.ssAnne5);
    it.setByte(full.world.currentScriptProgress.viridianForest);
    it.setByte(full.world.currentScriptProgress.museum1);
    it.setByte(full.world.currentScriptProgress.route13);
    it.setByte(full.world.currentScriptProgress.route14);
    it.setByte(full.world.currentScriptProgress.route17);
    it.setByte(full.world.currentScriptProgress.route19);
    it.setByte(full.world.currentScriptProgress.route21);
    it.setByte(full.world.currentScriptProgress.safariZoneEntrance);
    it.setByte(full.world.currentScriptProgress.rockTunnel2);
    it.setByte(full.world.currentScriptProgress.rockTunnel1, 1);
    it.setByte(full.world.currentScriptProgress.route11);
    it.setByte(full.world.currentScriptProgress.route12);
    it.setByte(full.world.currentScriptProgress.route15);
    it.setByte(full.world.currentScriptProgress.route16);
    it.setByte(full.world.currentScriptProgress.route18);
    it.setByte(full.world.currentScriptProgress.route20);
    it.setByte(full.world.currentScriptProgress.ssAnne10);
    it.setByte(full.world.currentScriptProgress.vermillionCity);
    it.setByte(full.world.currentScriptProgress.pokemonTower2);
    it.setByte(full.world.currentScriptProgress.pokemonTower3);
    it.setByte(full.world.currentScriptProgress.pokemonTower4);
    it.setByte(full.world.currentScriptProgress.pokemonTower5);
    it.setByte(full.world.currentScriptProgress.pokemonTower6);
    it.setByte(full.world.currentScriptProgress.pokemonTower7);
    it.setByte(full.world.currentScriptProgress.rocketHideout1);
    it.setByte(full.world.currentScriptProgress.rocketHideout2);
    it.setByte(full.world.currentScriptProgress.rocketHideout3);
    it.setWord(full.world.currentScriptProgress.rocketHideout4);
    it.setByte(full.world.currentScriptProgress.route6Gate);
    it.setWord(full.world.currentScriptProgress.route8Gate);
    it.setByte(full.world.currentScriptProgress.cinnabarIsland);
    it.setWord(full.world.currentScriptProgress.mansion1);
    it.setByte(full.world.currentScriptProgress.mansion2);
    it.setByte(full.world.currentScriptProgress.mansion3);
    it.setByte(full.world.currentScriptProgress.mansion4);
    it.setByte(full.world.currentScriptProgress.victoryRoad2);
    it.setWord(full.world.currentScriptProgress.victoryRoad3);
    it.setByte(full.world.currentScriptProgress.fightingDojo);
    it.setByte(full.world.currentScriptProgress.silphCo2);
    it.setByte(full.world.currentScriptProgress.silphCo3);
    it.setByte(full.world.currentScriptProgress.silphCo4);
    it.setByte(full.world.currentScriptProgress.silphCo5);
    it.setByte(full.world.currentScriptProgress.silphCo6);
    it.setByte(full.world.currentScriptProgress.silphCo7);
    it.setByte(full.world.currentScriptProgress.silphCo8);
    it.setByte(full.world.currentScriptProgress.silphCo9);
    it.setByte(full.world.currentScriptProgress.hofRoom);
    it.setByte(full.world.currentScriptProgress.rival);
    it.setByte(full.world.currentScriptProgress.lorelei);
    it.setByte(full.world.currentScriptProgress.bruno);
    it.setByte(full.world.currentScriptProgress.agatha);
    it.setByte(full.world.currentScriptProgress.unknownDungeon3);
    it.setByte(full.world.currentScriptProgress.victoryRoad1, 1);
    it.setByte(full.world.currentScriptProgress.lance, 4);
    it.setByte(full.world.currentScriptProgress.silphCo10);
    it.setByte(full.world.currentScriptProgress.silphCo11, 1);
    it.setByte(full.world.currentScriptProgress.fuchsiaGym);
    it.setByte(full.world.currentScriptProgress.saffronGym, 1);
    it.setByte(full.world.currentScriptProgress.cinnabarGym);
    it.setByte(full.world.currentScriptProgress.celadonGameCorner);
    it.setByte(full.world.currentScriptProgress.route16Gate);
    it.setByte(full.world.currentScriptProgress.billsHouse);
    it.setByte(full.world.currentScriptProgress.route5Gate);
    it.setByte(full.world.currentScriptProgress.powerPlantRoute7Gate, 1);
    it.setByte(full.world.currentScriptProgress.ssAnne2);
    it.setByte(full.world.currentScriptProgress.seafoamIslands4);
    it.setByte(full.world.currentScriptProgress.route23);
    it.setByte(full.world.currentScriptProgress.seafoamIslands5);
    it.setByte(full.world.currentScriptProgress.route18Gate);

    it.offsetTo(0x299C); // 299C
    for (let i = 0; i < 14; i++) {
        it.setBit(0x1, 0, full.world.ownedHidenItems[(8 * i) + 0]);
        it.setBit(0x1, 1, full.world.ownedHidenItems[(8 * i) + 1]);
        it.setBit(0x1, 2, full.world.ownedHidenItems[(8 * i) + 2]);
        it.setBit(0x1, 3, full.world.ownedHidenItems[(8 * i) + 3]);
        it.setBit(0x1, 4, full.world.ownedHidenItems[(8 * i) + 4]);
        it.setBit(0x1, 5, full.world.ownedHidenItems[(8 * i) + 5]);
        it.setBit(0x1, 6, full.world.ownedHidenItems[(8 * i) + 6]);
        it.setBit(0x1, 7, full.world.ownedHidenItems[(8 * i) + 7]);

        // Increment iterator
        it.inc();
    }

    it.offsetTo(0x29AA); // 29AA
    for (let i = 0; i < 2; i++) {
        it.setBit(0x1, 0, full.world.ownedHiddenCoins[(8 * i) + 0]);
        it.setBit(0x1, 1, full.world.ownedHiddenCoins[(8 * i) + 1]);
        it.setBit(0x1, 2, full.world.ownedHiddenCoins[(8 * i) + 2]);
        it.setBit(0x1, 3, full.world.ownedHiddenCoins[(8 * i) + 3]);
        it.setBit(0x1, 4, full.world.ownedHiddenCoins[(8 * i) + 4]);
        it.setBit(0x1, 5, full.world.ownedHiddenCoins[(8 * i) + 5]);
        it.setBit(0x1, 6, full.world.ownedHiddenCoins[(8 * i) + 6]);
        it.setBit(0x1, 7, full.world.ownedHiddenCoins[(8 * i) + 7]);

        // Increment iterator
        it.inc();
    }

    it.offsetTo(0x29AC); // 29AC
    it.setByte(full.area.walkBikeSurf, 10); // 29AC

    it.offsetTo(0x29B7); // 29B7
    for (let i = 0; i < 2; i++) {
        it.setBit(0x1, 0, full.world.visitedTowns[(8 * i) + 0]);
        it.setBit(0x1, 1, full.world.visitedTowns[(8 * i) + 1]);
        it.setBit(0x1, 2, full.world.visitedTowns[(8 * i) + 2]);
        it.setBit(0x1, 3, full.world.visitedTowns[(8 * i) + 3]);
        it.setBit(0x1, 4, full.world.visitedTowns[(8 * i) + 4]);
        it.setBit(0x1, 5, full.world.visitedTowns[(8 * i) + 5]);
        it.setBit(0x1, 6, full.world.visitedTowns[(8 * i) + 6]);
        it.setBit(0x1, 7, full.world.visitedTowns[(8 * i) + 7]);

        // Increment iterator
        it.inc();
    }

    it.offsetTo(0x29B9); // 29B9
    it.setWord(full.area.safariSteps); // 29B9-A

    it.setByte(full.world.fossilItemGiven); // 29BB
    it.setByte(full.world.fossilPkmnResult, 2); // 29BC + 2 padding
    it.inc(); // Skip enemy stuff // 29BF
    it.setByte(full.area.playerJumpingYScrnCoords); // 29C0
    it.setHex(0x1, full.rival.rivalStarter, false, 1); // 29C1 + 1 Padding
    it.setHex(0x1, full.player.playerStarter, false); // 29C3
    it.setByte(full.area.boulderSpriteIndex); // 29C4
    it.setByte(full.world.lastBlackoutMap); // 29C5
    it.setByte(full.area.destinationMap, 1); // 29C6 + 1 Padding

    it.setByte(full.area.tileFrontBoulderColl); // 29C8
    it.setByte(full.area.dungeonWarpDest); // 29C9
    it.setByte(full.area.whichDungeonWarp, 9); // 29CA + 9 Padding

    // 29D4
    // Various Flags 1
    it.setBit(0x1, 0, full.area.strengthOutsideBattle);
    it.setBit(0x1, 1, full.area.surfingAllowed);
    it.setBit(0x1, 3, full.world.obtainedOldRod);
    it.setBit(0x1, 4, full.world.obtainedGoodRod);
    it.setBit(0x1, 5, full.world.obtainedSuperRod);
    it.setBit(0x1, 6, full.world.satisfiedSaffronGuards);
    it.setBit(0x1, 7, full.area.usedCardKey);
    it.inc(); // 29D5
    it.inc(); // 29D6 (Skip Padding)

    // Defeated Gyms (Copy of Badges Obtained)
    // 29D6
    it.setBit(0x1, 0, full.player.badges.boulder);
    it.setBit(0x1, 1, full.player.badges.cascade);
    it.setBit(0x1, 2, full.player.badges.thunder);
    it.setBit(0x1, 3, full.player.badges.rainbow);
    it.setBit(0x1, 4, full.player.badges.soul);
    it.setBit(0x1, 5, full.player.badges.marsh);
    it.setBit(0x1, 6, full.player.badges.volcano);
    it.setBit(0x1, 7, full.player.badges.earth);
    it.inc(); // 29D7
    it.inc(); // 29D8 (Skip Padding)

    // 29D8
    // Various Flags 2
    it.setBit(0x1, 0, full.area.pauseWildEncounters3Steps);
    it.setBit(0x1, 1, full.area.noAudioFadeout);
    it.inc(); // 29D9

    // 29D9
    // Various Flags 3
    it.setBit(0x1, 0, full.area.tradeCenterSpritesFaced);
    it.setBit(0x1, 3, full.area.warpToLavenderTown);
    it.setBit(0x1, 4, full.area.isDungeonWarp);
    it.setBit(0x1, 5, full.area.npcsFaceAway);
    it.setBit(0x1, 6, full.area.isBattle);
    it.setBit(0x1, 7, full.area.isTrainerBattle);
    it.inc(); // 29DA

    // 29DA
    // Various Flags 4
    it.setBit(0x1, 0, full.world.obtainedLapras);
    it.setBit(0x1, 2, full.world.everHealedPokemon);
    it.setBit(0x1, 3, full.world.obtainedStarterPokemon);
    it.setBit(0x1, 4, full.area.noBattles);
    it.setBit(0x1, 5, full.area.battleEndedOrBlackout);
    it.setBit(0x1, 6, full.area.usingLinkCable);
    it.setBit(0x1, 7, full.area.scriptedNPCMovement);
    it.inc(); // 29DB
    it.inc(); // 29DC

    // 29DC
    // Various Flags 5
    it.setBit(0x1, 0, full.area.npcSpriteMovement);
    it.setBit(0x1, 5, full.area.ignoreJoypad);
    it.setBit(0x1, 6, full.area.noLetterDelay);
    it.setBit(0x1, 7, full.area.joypadSimulation);
    it.inc(); // 29DD
    it.inc(); // 29DE

    // 29DE
    // Various Flags 6
    it.setBit(0x1, 0, full.area.countPlaytime);
    it.setBit(0x1, 1, full.world.debugMode);
    it.setBit(0x1, 2, full.area.flyOrDungeonWarp);
    it.setBit(0x1, 3, full.area.flyWarp);
    it.setBit(0x1, 4, full.area.dungeonWarp);
    it.setBit(0x1, 5, full.area.forceBikeRide);
    it.setBit(0x1, 6, full.area.blackoutDest);
    it.inc(); // 29DF

    // 29DF
    // Various Flags 7
    it.setBit(0x1, 0, full.area.runningTestBattle);
    it.setBit(0x1, 1, full.area.preventMusicChange);
    it.setBit(0x1, 2, full.area.skipJoypadCheckWarps);
    it.setBit(0x1, 3, full.area.isTrainerBattle);
    it.setBit(0x1, 4, full.area.curMapNextFrame);
    it.setBit(0x1, 7, full.area.flyOutofBattle);
    it.inc(); // 29E0

    // 29E0
    it.setBit(0x1, 1, full.world.defeatedLorelei);
    it.inc(); // 29E1
    it.inc(); // 29E2

    // 29E2
    // Various Flags 8
    it.setBit(0x1, 0, full.area.standingOnDoor);
    it.setBit(0x1, 1, full.area.movingThroughDoor);
    it.setBit(0x1, 2, full.area.standingOnWarp);
    it.setBit(0x1, 6, full.area.finalLedgeJumping);
    it.setBit(0x1, 7, full.area.spinPlayer);
    it.inc(); // 29E3

    // 29E3
    for (let i = 0; i < 2; i++) {
        it.setBit(0x1, 0, full.world.inGameTrades[(8 * i) + 0]);
        it.setBit(0x1, 1, full.world.inGameTrades[(8 * i) + 1]);
        it.setBit(0x1, 2, full.world.inGameTrades[(8 * i) + 2]);
        it.setBit(0x1, 3, full.world.inGameTrades[(8 * i) + 3]);
        it.setBit(0x1, 4, full.world.inGameTrades[(8 * i) + 4]);
        it.setBit(0x1, 5, full.world.inGameTrades[(8 * i) + 5]);
        it.setBit(0x1, 6, full.world.inGameTrades[(8 * i) + 6]);
        it.setBit(0x1, 7, full.world.inGameTrades[(8 * i) + 7]);

        // Increment iterator
        it.inc();
    }

    it.offsetTo(0x29E7); // 29E7
    it.setByte(full.area.warpedFromWarp); // 29E7
    it.setByte(full.area.warpedfromMap, 2); // 29E8 + 2 Padding

    // 29EB
    it.setByte(full.area.cardKeyDoorY); // 29EB
    it.setByte(full.area.cardKeyDoorX, 2); // 29EC + 2 Padding

    // 29EF
    it.setByte(full.area.firstTrashcanLock); // 29EF
    it.setByte(full.area.secondTrashcanLock, 2); // 29F0 + 2 Padding

    // 29F3
    for (let i = 0; i < 320; i++) {
        it.setBit(0x1, 0, full.world.completedEvents[(8 * i) + 0]);
        it.setBit(0x1, 1, full.world.completedEvents[(8 * i) + 1]);
        it.setBit(0x1, 2, full.world.completedEvents[(8 * i) + 2]);
        it.setBit(0x1, 3, full.world.completedEvents[(8 * i) + 3]);
        it.setBit(0x1, 4, full.world.completedEvents[(8 * i) + 4]);
        it.setBit(0x1, 5, full.world.completedEvents[(8 * i) + 5]);
        it.setBit(0x1, 6, full.world.completedEvents[(8 * i) + 6]);
        it.setBit(0x1, 7, full.world.completedEvents[(8 * i) + 7]);

        // Increment iterator
        it.inc();
    }

    it.offsetTo(0x2B33); // 2B33
    it.setByte(full.area.grassRate); // 2B33

    // 2B34
    it.copyRange(20, full.area.grassPokemon);

    // Skip Enemy Stuff

    it.offsetTo(0x2B50); // 2B50
    it.setByte(full.area.waterPokemonRate); // 2B50
    it.copyRange(20, full.area.waterPokemon);

    // Skip Enemy Stuff

    it.offsetTo(0x2CDC); // 2CDC
    it.setWord(full.area.trainerHeaderPtr, 6); // 2CDC-D + 6 Padding

    //2CE4
    it.setByte(full.area.oppAfterWrongAnsw); // 2CE4
    it.setByte(full.area.curMapScript, 7); // 2CE5 + 7 Padding

    // 2CED
    it.setByte(full.world.playtime.hours); // 2CED
    it.setByte(full.world.playtime.maxed); // 2CEE
    it.setByte(full.world.playtime.minutes); // 2CEF
    it.setByte(full.world.playtime.seconds); // 2CF0
    it.setByte(full.world.playtime.frames); // 2CF1

    it.setByte(full.area.safariGameOver); // 2CF2
    it.setByte(full.area.safariBallCount); // 2CF3

    // 2CF4 (Daycare in-use)
    if (full.world.dayCare === null)
        it.setByte(0x00);
    else
        it.setByte(0x01);

    // 2CF5 (Only if day-care is in use)
    if (full.world.dayCare !== null)
        pokemonBox(
            0x2D0B,
            0x2CF5,
            0x2D00,
            full.world.dayCare,
            it,
            0
        );

    // 2D2C
    it.offsetTo(0x2D2C);
    for (let i = 0; i < 16; i++) {
        it.setByte(full.area.extendedSpriteData[i].pictureID);
        it.setByte(full.area.extendedSpriteData[i].movementStatus);
        it.setByte(full.area.extendedSpriteData[i].imageIndex);
        it.setByte(full.area.extendedSpriteData[i].yStepVector);
        it.setByte(full.area.extendedSpriteData[i].yPixels);
        it.setByte(full.area.extendedSpriteData[i].xStepVector);
        it.setByte(full.area.extendedSpriteData[i].xPixels);
        it.setByte(full.area.extendedSpriteData[i].intraAnimationFrameCounter);
        it.setByte(full.area.extendedSpriteData[i].animFrameCounter);
        it.setByte(full.area.extendedSpriteData[i].faceDir, 6);
    }

    // 2E2C
    it.offsetTo(0x2E2C);
    for (let i = 0; i < 16; i++) {
        it.setByte(full.area.extendedSpriteData[i].walkAnimationCounter, 1);
        it.setByte(full.area.extendedSpriteData[i].yDisp);
        it.setByte(full.area.extendedSpriteData[i].xDisp);
        it.setByte(full.area.extendedSpriteData[i].mapY);
        it.setByte(full.area.extendedSpriteData[i].mapX);
        it.setByte(full.area.extendedSpriteData[i].movementByte);
        it.setByte(full.area.extendedSpriteData[i].grassPriority);
        it.setByte(full.area.extendedSpriteData[i].movementDelay, 5);
        it.setByte(full.area.extendedSpriteData[i].imageBaseOffset, 1);
    }
}