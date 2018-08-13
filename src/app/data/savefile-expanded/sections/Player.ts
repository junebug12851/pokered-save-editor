import { PokemonParty } from './../fragments/PokemonParty';
import { SaveFileService } from '../../savefile.service';

export class Player {
    constructor(saveFile: SaveFileService) {
        const it = saveFile.iterator;

        this.playerName = saveFile.getStr(0x2598, 0xB, 7);
        this.playerID = saveFile.getHex(0x2605, 2).padStart(4, "0");

        this.pokedexOwned = [];
        it.offsetTo(0x25A3);
        for (let i = 0; i < 0x13; i++) {
            // Push bits in order of this byte
            this.pokedexOwned.push(it.getBit(1, 0));
            this.pokedexOwned.push(it.getBit(1, 1));
            this.pokedexOwned.push(it.getBit(1, 2));
            this.pokedexOwned.push(it.getBit(1, 3));
            this.pokedexOwned.push(it.getBit(1, 4));
            this.pokedexOwned.push(it.getBit(1, 5));
            this.pokedexOwned.push(it.getBit(1, 6));
            this.pokedexOwned.push(it.getBit(1, 7));

            // Increment iterator
            it.inc();
        }

        this.pokedexSeen = [];
        it.offsetTo(0x25B6);
        for (let i = 0; i < 0x13; i++) {
            // Push bits in order of this byte
            this.pokedexSeen.push(it.getBit(1, 0));
            this.pokedexSeen.push(it.getBit(1, 1));
            this.pokedexSeen.push(it.getBit(1, 2));
            this.pokedexSeen.push(it.getBit(1, 3));
            this.pokedexSeen.push(it.getBit(1, 4));
            this.pokedexSeen.push(it.getBit(1, 5));
            this.pokedexSeen.push(it.getBit(1, 6));
            this.pokedexSeen.push(it.getBit(1, 7));

            // Increment iterator
            it.inc();
        }

        this.bagItems = [];
        it.offsetTo(0x25C9);
        const amount = it.getByte();
        for (let i = 0; i < amount; i++) {
            this.bagItems.push({
                id: it.getByte(),
                amount: it.getByte(),
            });
        }

        this.money = saveFile.getBCD(0x25F3, 3);
        this.coins = saveFile.getBCD(0x2850, 2);

        it.offsetTo(0x2602);
        this.badges = {
            boulder: it.getBit(1, 0),
            cascade: it.getBit(1, 1),
            thunder: it.getBit(1, 2),
            rainbow: it.getBit(1, 3),
            soul: it.getBit(1, 4),
            marsh: it.getBit(1, 5),
            volcano: it.getBit(1, 6),
            earth: it.getBit(1, 7),
        };

        this.playerStarter = saveFile.getHex(0x29C3, 1).toUpperCase().padStart(2, "0");

        this.playerParty = [];
        for (let i = 0; i < saveFile.getByte(0x2F2C) && i < 6; i++) {
            this.playerParty.push(new PokemonParty(
                saveFile,
                0x2F34,
                0x307E,
                0x303C,
                i));
        }

        this.saveFile = saveFile;
    }

    public saveFile: any;

    public playerName: string;
    public playerID: string;
    public pokedexOwned: boolean[];
    public pokedexSeen: boolean[];
    public bagItems: {
        id: number,
        amount: number
    }[];
    public playerParty: PokemonParty[];
    public money: number;
    public coins: number;
    public badges: {
        boulder: boolean,
        cascade: boolean,
        thunder: boolean,
        rainbow: boolean,
        soul: boolean,
        marsh: boolean,
        volcano: boolean,
        earth: boolean,
        [key: string]: boolean;
    };
    public playerStarter: string;
}
