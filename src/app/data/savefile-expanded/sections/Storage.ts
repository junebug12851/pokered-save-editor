import { PokemonBox } from '../fragments/PokemonBox';
import { SaveFileService } from '../../savefile.service';

export class Storage {
    constructor(saveFile: SaveFileService) {
        let curBox = this.curBox = saveFile.getByte(0x284C);

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

        // Box 1
        this.pokemonBoxes.push([]);
        for (let i = 0; i < saveFile.getByte(0x4000) && i < 20; i++) {
            this.pokemonBoxes[0].push(new PokemonBox(
                saveFile,
                0x4016,
                0x4386,
                0x42AA,
                i));
        }

        // Box 2
        this.pokemonBoxes.push([]);
        for (let i = 0; i < saveFile.getByte(0x4462) && i < 20; i++) {
            this.pokemonBoxes[1].push(new PokemonBox(
                saveFile,
                0x4478,
                0x47E8,
                0x470C,
                i));
        }

        // Box 3
        this.pokemonBoxes.push([]);
        for (let i = 0; i < saveFile.getByte(0x48C4) && i < 20; i++) {
            this.pokemonBoxes[2].push(new PokemonBox(
                saveFile,
                0x48DA,
                0x4C4A,
                0x4B6E,
                i));
        }

        // Box 4
        this.pokemonBoxes.push([]);
        for (let i = 0; i < saveFile.getByte(0x4D26) && i < 20; i++) {
            this.pokemonBoxes[3].push(new PokemonBox(
                saveFile,
                0x4D3C,
                0x50AC,
                0x4FD0,
                i));
        }

        // Box 5
        this.pokemonBoxes.push([]);
        for (let i = 0; i < saveFile.getByte(0x5188) && i < 20; i++) {
            this.pokemonBoxes[4].push(new PokemonBox(
                saveFile,
                0x519E,
                0x550E,
                0x5432,
                i));
        }

        // Box 6
        this.pokemonBoxes.push([]);
        for (let i = 0; i < saveFile.getByte(0x55EA) && i < 20; i++) {
            this.pokemonBoxes[5].push(new PokemonBox(
                saveFile,
                0x5600,
                0x5970,
                0x5894,
                i));
        }

        ///////////////////////////////////////////////////////

        // Box 7
        this.pokemonBoxes.push([]);
        for (let i = 0; i < saveFile.getByte(0x6000) && i < 20; i++) {
            this.pokemonBoxes[6].push(new PokemonBox(
                saveFile,
                0x6016,
                0x6386,
                0x62AA,
                i));
        }

        // Box 8
        this.pokemonBoxes.push([]);
        for (let i = 0; i < saveFile.getByte(0x6462) && i < 20; i++) {
            this.pokemonBoxes[7].push(new PokemonBox(
                saveFile,
                0x6478,
                0x67E8,
                0x670C,
                i));
        }

        // Box 9
        this.pokemonBoxes.push([]);
        for (let i = 0; i < saveFile.getByte(0x68C4) && i < 20; i++) {
            this.pokemonBoxes[8].push(new PokemonBox(
                saveFile,
                0x68DA,
                0x6C4A,
                0x6B6E,
                i));
        }

        // Box 10
        this.pokemonBoxes.push([]);
        for (let i = 0; i < saveFile.getByte(0x6D26) && i < 20; i++) {
            this.pokemonBoxes[9].push(new PokemonBox(
                saveFile,
                0x6D3C,
                0x70AC,
                0x6FD0,
                i));
        }

        // Box 11
        this.pokemonBoxes.push([]);
        for (let i = 0; i < saveFile.getByte(0x7188) && i < 20; i++) {
            this.pokemonBoxes[10].push(new PokemonBox(
                saveFile,
                0x719E,
                0x750E,
                0x7432,
                i));
        }

        // Box 12
        this.pokemonBoxes.push([]);
        for (let i = 0; i < saveFile.getByte(0x75EA) && i < 20; i++) {
            this.pokemonBoxes[11].push(new PokemonBox(
                saveFile,
                0x7600,
                0x7970,
                0x7894,
                i));
        }
    }

    public curBox: number;
    public boxItems: {
        id: number,
        amount: number
    }[];
    public pokemonBoxes;
}
