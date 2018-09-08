import { PokemonBox } from './../fragments/PokemonBox';
import { SaveFileService } from '../../savefile.service';

export class Storage {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    load(saveFile: SaveFileService) {
        let curBox = this.curBox = (saveFile.getByte(0x284C) & 0b01111111);

        // All the Pokemon data is uninitialized and unformatted / random
        // garbage if this is false
        // So if this is false then don't load any box data
        this.changedBoxesBefore = saveFile.getBit(0x284C, 0x1, 7);

        const it = saveFile.iterator.offsetTo(0x27E7);
        this.boxItems = [];
        for (let i = 0; i < saveFile.getByte(0x27E6) && i < 50; i++) {
            this.boxItems.push({
                id: it.getByte(),
                amount: it.getByte()
            });
        }

        // Create Parent of all boxes
        this.pokemonBoxes = [];

        // Load boxes 1-6
        this.loadBoxes(saveFile, 0x4000);

        // Load boxes 7-12
        this.loadBoxes(saveFile, 0x6000);

        // Overwrite box data of the current box with current box data
        // Pokemon Red and Blue save a copy of the current box locally in Bank 1
        // All box changes go to this box, in other words
        // If the current box is box number 1, then the actual box number 1
        // reflects all changes up until the box switch and none after. Box 1,
        // in this example, will only be updated to reflect all newest changes
        // when switching boxes

        // Wipe current box data and re-insert from scratch latest box data for
        // that box

        // Also force load the current box
        this.pokemonBoxes[curBox] = [];
        this.loadBox(saveFile, curBox, 0x30C0, true);
    }

    // Loads 6 boxes in a bank offset adding to the existing boxes
    loadBoxes(saveFile: SaveFileService, boxesOffset: number) {
        for (let i = 0; i < 6; i++) {
            this.pokemonBoxes.push([]);
            this.loadBox(
                saveFile,
                this.pokemonBoxes.length - 1,
                (i * 0x462) + boxesOffset
            )
        }
    }

    // Loads a pokemon box # from given offset, won't load anything unless
    // data is pre-formatted or forced
    loadBox(saveFile: SaveFileService, boxInd: number, boxOffset: number, forceLoad: boolean = false) {
        if (!this.changedBoxesBefore && !forceLoad)
            return;

        for (let i = 0; i < saveFile.getByte(boxOffset) && i < 20; i++) {
            this.pokemonBoxes[boxInd].push(new PokemonBox(
                saveFile,
                boxOffset + 0x16,
                boxOffset + 0x386,
                boxOffset + 0x2AA,
                i));
        }
    }

    save(saveFile: SaveFileService) {
        // Save current box details
        saveFile.setByte(0x284C, this.curBox);
        saveFile.setBit(0x284C, 1, 7, this.changedBoxesBefore);

        // Save all box items
        const it = saveFile.iterator.offsetTo(0x27E6);
        it.setByte(this.boxItems.length);
        for (let i = 0; i < this.boxItems.length && i < 50; i++) {
            it.setByte(this.boxItems[i].id);
            it.setByte(this.boxItems[i].amount);
        }
        it.setByte(0xFF);

        // Save boxes 1-6
        this.saveBoxes(
            saveFile,
            0x4000,
            0
        );

        // Save boxes 7-12
        this.saveBoxes(
            saveFile,
            0x6000,
            1
        );

        // Save current box data to current box cache
        this.saveBox(
            saveFile,
            this.curBox,
            0x30C0
        );
    }

    saveBox(saveFile: SaveFileService, boxInd: number, boxOffset: number) {
        saveFile.setByte(boxOffset, this.pokemonBoxes[boxInd].length);
        for (let i = 0; i < this.pokemonBoxes[boxInd].length && i < 20; i++) {
            this.pokemonBoxes[boxInd][i].save(
                saveFile,
                boxOffset + 0x16,
                boxOffset + 0x386,
                boxOffset + 0x2AA,
                i
            );
        }
    }

    saveBoxes(saveFile: SaveFileService, boxesOffset: number, boxSet: number) {
        for (let i = boxSet * 6; i < (boxSet * 6) + 6; i++) {
            this.saveBox(
                saveFile,
                i,
                (i * 0x462) + boxesOffset
            )
        }
    }

    public curBox: number = 0;
    public changedBoxesBefore: boolean = false;
    public boxItems: {
        id: number,
        amount: number
    }[] = [];
    public pokemonBoxes: PokemonBox[][] = [[]];
}
