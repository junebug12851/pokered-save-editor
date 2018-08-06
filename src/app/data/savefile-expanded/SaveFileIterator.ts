import { SaveFileService } from './../savefile.service';

export class SaveFileIterator {
    constructor(saveFile: SaveFileService) {
        this.saveFile = saveFile;
        this.state = [];
    }

    // Move offset to
    public offsetTo(val: number): SaveFileIterator {
        this.offset = val;
        return this;
    }

    // Move offset by
    public offsetBy(val: number): SaveFileIterator {
        this.offset += val;
        return this;
    }

    // Alias for above
    public skipPadding(val: number): SaveFileIterator {
        return this.offsetBy(val);
    }

    public inc(): SaveFileIterator {
        this.offset++;
        return this;
    }

    public dec(): SaveFileIterator {
        this.offset--;
        return this;
    }

    public get file(): SaveFileService {
        return this.saveFile;
    }

    // Save and restore bookmarked offsets in FIFO ordering
    public push(): SaveFileIterator {
        this.state.push(this.offset);
        return this;
    }

    public pop(): SaveFileIterator {
        this.offset = this.state.pop();

        // In case of error (too many pops), revert offset to zero
        if (this.offset === undefined)
            this.offset = 0x0000;

        return this;
    }

    //
    // Specialized copies of main savefile service
    //

    public getRange(size: number, padding: number = 0, bigEndian: boolean = false): Uint8Array {
        const ret = this.file.getRange(this.offset, size, bigEndian);
        this.offsetBy(size + padding);
        return ret;
    }

    public copyRange(size: number, data: Uint8Array, padding: number = 0, bigEndian: boolean = false) {
        const ret = this.file.copyRange(this.offset, size, data, bigEndian);
        this.offsetBy(size + padding);
        return ret;
    }

    public getStr(size: number, maxChars: number, padding: number = 0): string {
        const ret = this.file.getStr(this.offset, size, maxChars);
        this.offsetBy(size + padding);
        return ret;
    }

    public setStr(size: number, maxChars: number, str: string, padding: number = 0): void {
        const ret = this.file.setStr(this.offset, size, maxChars, str);
        this.offsetBy(size + padding);
        return ret;
    }

    public getHex(size: number, prefix: boolean, padding: number = 0, bigEndian: boolean = false): string {
        const ret = this.file.getHex(this.offset, size, prefix, bigEndian);
        this.offsetBy(size + padding);
        return ret;
    }

    public setHex(size: number, hex: string, hasPrefix: boolean, padding: number = 0, bigEndian: boolean = false): void {
        const ret = this.file.setHex(this.offset, size, hex, hasPrefix, bigEndian);
        this.offsetBy(size + padding);
        return ret;
    }

    public getBCD(size: number, padding: number = 0): number {
        const ret = this.file.getBCD(this.offset, size);
        this.offsetBy(size + padding);
        return ret;
    }

    public setBCD(size: number, val: number, padding: number = 0): void {
        const ret = this.file.setBCD(this.offset, size, val);
        this.offsetBy(size + padding);
        return ret;
    }

    // We can't adjust for bit operations
    public getBit(size: number, bit: number, bigEndian: boolean = false): boolean {
        return this.file.
            getBit(this.offset, size, bit, bigEndian);
    }

    public setBit(size: number, bit: number, val: boolean, bigEndian: boolean = false): void {
        return this.file.
            setBit(this.offset, size, bit, val, bigEndian);
    }

    public getWord(padding: number = 0, bigEndian: boolean = false): number {
        const ret = this.file.getWord(this.offset, bigEndian);
        this.offsetBy(2 + padding);
        return ret;
    }

    public setWord(value: number, padding: number = 0, bigEndian: boolean = false): void {
        const ret = this.file.setWord(this.offset, value, bigEndian);
        this.offsetBy(2 + padding);
        return ret;
    }

    public getByte(padding: number = 0): number {
        const ret = this.file.getByte(this.offset);
        this.offsetBy(1 + padding);
        return ret;
    }

    public setByte(value: number, padding: number = 0): void {
        const ret = this.file.setByte(this.offset, value);
        this.offsetBy(1 + padding);
        return ret;
    }

    public offset: number = 0x0000;
    protected state: number[];
    protected saveFile: SaveFileService;
}
