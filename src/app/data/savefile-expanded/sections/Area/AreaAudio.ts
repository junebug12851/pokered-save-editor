import { SaveFileService } from './../../../savefile.service';

export class AreaAudio {
    constructor(saveFile?: SaveFileService) {
        if (arguments.length >= 1)
            this.load(saveFile as SaveFileService);
    }

    public load(saveFile: SaveFileService) {
        const musicID = saveFile.getHex(0x2607, 0x1).padStart(2, "0").toUpperCase();
        const musicBank = saveFile.getHex(0x2608, 0x1).padStart(2, "0").toUpperCase();
        this.music = `${musicBank}_${musicID}`;

        this.noAudioFadeout = saveFile.getBit(0x29D8, 1, 1);
        this.preventMusicChange = saveFile.getBit(0x29DF, 1, 1);
    }

    public save(saveFile: SaveFileService) {
        const musicArr = this.music.split("_");
        const musicID = musicArr[1];
        const musicBank = musicArr[0];

        saveFile.setHex(0x2607, 0x1, musicID);
        saveFile.setHex(0x2608, 0x1, musicBank);
        saveFile.setBit(0x29D8, 1, 1, this.noAudioFadeout);
        saveFile.setBit(0x29DF, 1, 1, this.preventMusicChange);
    }

    // Audio (Complete)
    public music: string = "00_00";
    public noAudioFadeout: boolean = false;
    public preventMusicChange: boolean = false;
}
