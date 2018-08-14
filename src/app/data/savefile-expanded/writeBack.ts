import { SaveFileService } from './../savefile.service';

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
    it.setStr(0xB, 7, full.player.playerName);

    // Set Pokedex Owned
    it.offsetTo(0x25A3);

    for (let i = 0; i < 0x13; i++) {
        it.setBit(0x1, 0, full.player.pokedexOwned[i]);
        it.setBit(0x1, 1, full.player.pokedexOwned[i]);
        it.setBit(0x1, 2, full.player.pokedexOwned[i]);
        it.setBit(0x1, 3, full.player.pokedexOwned[i]);
        it.setBit(0x1, 4, full.player.pokedexOwned[i]);
        it.setBit(0x1, 5, full.player.pokedexOwned[i]);
        it.setBit(0x1, 6, full.player.pokedexOwned[i]);

        // The last bit is unused
        if (i !== 0x12)
            it.setBit(0x1, 7, full.player.pokedexOwned[i]);

        it.inc();
    }

    // Set Pokedex Seen
    it.offsetTo(0x25B6);

    for (let i = 0; i < 0x13; i++) {
        it.setBit(0x1, 0, full.player.pokedexSeen[i]);
        it.setBit(0x1, 1, full.player.pokedexSeen[i]);
        it.setBit(0x1, 2, full.player.pokedexSeen[i]);
        it.setBit(0x1, 3, full.player.pokedexSeen[i]);
        it.setBit(0x1, 4, full.player.pokedexSeen[i]);
        it.setBit(0x1, 5, full.player.pokedexSeen[i]);
        it.setBit(0x1, 6, full.player.pokedexSeen[i]);

        // The last bit is unused
        if (i !== 0x12)
            it.setBit(0x1, 7, full.player.pokedexSeen[i]);

        it.inc();
    }

    // Set Bag Items
    // Allow no more than 20 items
    file.fileData[0x25C9] = full.player.bagItems.length; // Bag Items Count
    it.offsetTo(0x25CA);
    for (let i = 0; i < full.player.bagItems.length && i < 20; i++) {
        const item = full.player.bagItems[i];

        it.setByte(item.id);
        it.setByte(item.amount);
    }

    // List terminator
    it.setByte(0xFF);

    // Set Money
    it.offsetTo(0x25F3);
    it.setBCD(0x3, full.player.money);

    // Set Rival Name
    it.offsetTo(0x25F6);
    it.setStr(0xB, 7, full.rival.rivalName);

    // Set Options
    it.offsetTo(0x2601);

    // Set Text speed first
    let byte = it.getByte();
    byte |= full.world.options.textSpeedSlowness & 0b00001111;
    it.dec();
    it.setByte(byte);

    // Now set other 2 options
    it.dec();
    it.setBit(0x1, 6, full.world.options.battleStyleSet);
    it.setBit(0x1, 7, full.world.options.battleAnimOff);

    // Set Badges
    it.offsetTo(0x2602);
    it.setBit(0x1, 0, full.player.badges.boulder);
    it.setBit(0x1, 1, full.player.badges.cascade);
    it.setBit(0x1, 2, full.player.badges.thunder);
    it.setBit(0x1, 3, full.player.badges.rainbow);
    it.setBit(0x1, 4, full.player.badges.soul);
    it.setBit(0x1, 5, full.player.badges.marsh);
    it.setBit(0x1, 6, full.player.badges.volcano);
    it.setBit(0x1, 7, full.player.badges.earth);

    // Set Letter Delay
    it.offsetTo(0x2604);
    it.setBit(0x1, 0, full.world.letterDelay.normalDelay);
    it.setBit(0x1, 1, full.world.letterDelay.dontDelay);

    // Player ID
    it.offsetTo(0x2605);
    it.setHex(0x2, full.player.playerID, false);
}
