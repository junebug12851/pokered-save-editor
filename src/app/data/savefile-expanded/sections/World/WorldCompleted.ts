import { SaveFileService } from './../../../savefile.service';

export class WorldCompleted {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        this.obtainedOldRod = saveFile.getBit(0x29D4, 1, 3);
        this.obtainedGoodRod = saveFile.getBit(0x29D4, 1, 4);
        this.obtainedSuperRod = saveFile.getBit(0x29D4, 1, 5);
        this.satisfiedSaffronGuards = saveFile.getBit(0x29D4, 1, 6);
        this.obtainedLapras = saveFile.getBit(0x29DA, 1, 0);
        this.everHealedPokemon = saveFile.getBit(0x29DA, 1, 2);
        this.obtainedStarterPokemon = saveFile.getBit(0x29DA, 1, 3);
        this.defeatedLorelei = saveFile.getBit(0x29E0, 1, 1);
    }

    public save(saveFile: SaveFileService) {
        saveFile.setBit(0x29D4, 1, 3, this.obtainedOldRod);
        saveFile.setBit(0x29D4, 1, 4, this.obtainedGoodRod);
        saveFile.setBit(0x29D4, 1, 5, this.obtainedSuperRod);
        saveFile.setBit(0x29D4, 1, 6, this.satisfiedSaffronGuards);
        saveFile.setBit(0x29DA, 1, 0, this.obtainedLapras);
        saveFile.setBit(0x29DA, 1, 2, this.everHealedPokemon);
        saveFile.setBit(0x29DA, 1, 3, this.obtainedStarterPokemon);
        saveFile.setBit(0x29E0, 1, 1, this.defeatedLorelei);
    }

    // Rods
    public obtainedOldRod: boolean = false;
    public obtainedGoodRod: boolean = false;
    public obtainedSuperRod: boolean = false;

    // Pokemon
    public obtainedLapras: boolean = false;
    public obtainedStarterPokemon: boolean = false;
    public everHealedPokemon: boolean = false;

    // Other
    public satisfiedSaffronGuards: boolean = false;
    public defeatedLorelei: boolean = false;
}
