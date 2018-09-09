import { SaveFileService } from './../../../savefile.service';

export class PlayerBasics {
    constructor(saveFile?: SaveFileService) {
        if (saveFile !== undefined)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.playerName = saveFile.getStr(0x2598, 0xB, 7);
        this.playerID = saveFile.getHex(0x2605, 2).padStart(4, "0");
        this.money = saveFile.getBCD(0x25F3, 3);
        this.coins = saveFile.getBCD(0x2850, 2);

        // We only pull from the first duplicate, there are 2 identical sets
        // of badges in the save file
        const it = saveFile.iterator.offsetTo(0x2602);
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
    }

    public save(saveFile: SaveFileService) {
        saveFile.setStr(0x2598, 0xB, 7, this.playerName);
        saveFile.setHex(0x2605, 2, this.playerID);
        saveFile.setBCD(0x25F3, 3, this.money);
        saveFile.setBCD(0x2850, 2, this.coins);
        saveFile.setHex(0x29C3, 1, this.playerStarter);

        // Badges have to be duplicated on the save file
        this.setBadges(saveFile, 0x2602);
        this.setBadges(saveFile, 0x29D6);
    }

    setBadges(saveFile: SaveFileService, offset: number) {
        const it = saveFile.iterator.offsetTo(offset);
        it.setBit(1, 0, this.badges.boulder);
        it.setBit(1, 1, this.badges.cascade);
        it.setBit(1, 2, this.badges.thunder);
        it.setBit(1, 3, this.badges.rainbow);
        it.setBit(1, 4, this.badges.soul);
        it.setBit(1, 5, this.badges.marsh);
        it.setBit(1, 6, this.badges.volcano);
        it.setBit(1, 7, this.badges.earth);
    }

    public playerName: string = "";
    public playerID: string = "0000";
    public money: number = 0;
    public coins: number = 0;
    public badges: {
        [index: string]: boolean
    } = {
            boulder: false as boolean,
            cascade: false as boolean,
            thunder: false as boolean,
            rainbow: false as boolean,
            soul: false as boolean,
            marsh: false as boolean,
            volcano: false as boolean,
            earth: false as boolean,
        };
    public playerStarter: string = "00";
}
