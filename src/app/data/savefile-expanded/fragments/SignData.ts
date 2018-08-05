import { SaveFileService } from './../../savefile.service';

export class SignData {
    constructor(savefile: SaveFileService, index: number) {
        let offsetCtr = (2 * index) + 0x275D;
        this.y = savefile.getByte(offsetCtr); offsetCtr += 1;
        this.x = savefile.getByte(offsetCtr); offsetCtr += 1;

        offsetCtr = (1 * index) + 0x277D;
        this.text = savefile.getByte(offsetCtr);
    }

    public y: number;
    public x: number;
    public text: number;
}
