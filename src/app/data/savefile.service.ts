import { SaveFileIterator } from './savefile-expanded/SaveFileIterator';
import { SaveFileExpanded } from './savefile-expanded/SaveFileExpanded';
/**
   Copyright 2018 June Hanabi

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

/**
 * Provides means to work with a Pokemon Red save file and correctly extract
 * various data formats in a useable and readable form as well as write them
 * back correctly.
 */

declare const Buffer;

import { Injectable } from '@angular/core';
import { TextService } from "./text.service";

// @ts-ignore
const BluePromise = window.require("bluebird");

// @ts-ignore
const electron = window.require('electron').remote
const { dialog } = electron;

// Quiet Typescript, I already can't access fs normally thanks to angular
// @ts-ignore
const fs = BluePromise.promisifyAll(window.require("fs"));

@Injectable({
    providedIn: 'root'
})
export class SaveFileService {

    constructor(private saveText: TextService) {
        this.fileDataExpanded = new SaveFileExpanded(this);
        window["saveFile"] = this;
    }

    public get iterator(): SaveFileIterator {
        return new SaveFileIterator(this);
    }

    /*
    * bcd2number -> takes a nodejs buffer with a BCD and returns the corresponding number.
    * input: nodejs buffer
    * output: number
    * credit: joaomaia @ https://gist.github.com/joaomaia/3892692
    */
    public bcd2number(bcd: Uint8Array): number {
        var n = 0;
        var m = 1;
        for (var i: number = 0; i < bcd.length; i += 1) {
            n += (bcd[bcd.length - 1 - i] & 0x0F) * m;
            n += ((bcd[bcd.length - 1 - i] >> 4) & 0x0F) * m * 10;
            m *= 100;
        }
        return n;
    }

    /*
    * number2bcd -> takes a number and returns the corresponding BCD in a nodejs buffer object.
    * input: 32 bit positive number, nodejs buffer size
    * output: nodejs buffer
    * credit: joaomaia @ https://gist.github.com/joaomaia/3892692
    */
    public number2bcd(number: number, size: number): Uint8Array {
        var s = size || 4; //default value: 4
        var bcd = new Buffer(s);
        bcd.fill(0);
        while (number !== 0 && s !== 0) {
            s -= 1;
            bcd[s] = (number % 10);
            number = (number / 10) | 0;
            bcd[s] += (number % 10) << 4;
            number = (number / 10) | 0;
        }
        return bcd;
    }

    // Copies a range of bytes to a buffer of size and returns them
    public getRange(from: number, size: number, bigEndian: boolean = false): Uint8Array {
        if (bigEndian)
            return this.fileData.subarray(from, from + size).reverse();
        else
            return this.fileData.subarray(from, from + size);
    }

    // Copies data to the save data at a particular place going no further
    // than the maximum size desired to be copied and the maximum array
    // given top copy from
    //
    // from = index to start copying at inclusive
    // size = maximum length to copy
    // data = array of data to copy into, will stop at size or data length
    public copyRange(from: number, size: number, data: Uint8Array, bigEndian: boolean = false) {

        if (bigEndian)
            data = data.reverse();

        for (let i = from, j = 0; i < (from + size) || j < data.length; i++ , j++) {
            this.fileData[i] = data[j];
        }
    }

    // Gets a string from the save file auto-converted to normal characters
    // Strings are always little endian
    public getStr(from: number, size: number, maxChars: number): string {
        return this.saveText.convertFromCode(this.getRange(from, size), maxChars);
    }

    // Sets a string to save file auto-converted to in-game characters
    // Strings are always little endian
    public setStr(from: number, size: number, maxChars: number, str: string): void {
        this.copyRange(from, size, this.saveText.convertToCode(str, maxChars));
    }

    // Gets a value in hex from the save file
    public getHex(from: number, size: number, prefix: boolean = false, bigEndian: boolean = false): string {

        let rawHex = this.getRange(from, size, bigEndian);

        let hexStr = "";
        for (let i = 0; i < rawHex.length; i++) {
            hexStr += rawHex[i].toString(16);
        }
        hexStr = hexStr.toUpperCase();
        if (prefix)
            hexStr = `0x${hexStr}`;

        return hexStr;
    }

    // Saves a hex value to bytes in the save file
    public setHex(from: number, size: number, hex: string, hasPrefix: boolean = false, bigEndian: boolean = false): void {
        // Trim prefix if any
        if (hasPrefix)
            hex = hex.substr(2);

        // Convert to number
        let hexValue = parseInt(hex, 16);
        let hexArr = [];

        // Break apart number into seperate bytes and store them in an
        // array. This also places it big-endian style which is how the
        // save data is structured
        if (hexValue === 0)
            hexArr.push(0);
        else
            while (hexValue > 0) {
                hexArr.push(hexValue & 0xFF);
                hexValue >>= 8;
            }

        // Copy to save data
        this.copyRange(from, size, new Uint8Array(hexArr), !bigEndian);
    }

    // Get a Raw BCD value in integer format
    // BCD is always little endian
    public getBCD(from: number, size: number): number {
        return this.bcd2number(this.getRange(from, size));
    }

    // Sets a number in raw BCD format
    // BCD is always little endian
    public setBCD(from: number, size: number, val: number): void {
        this.copyRange(from, size, this.number2bcd(val, size));
    }

    // Gets a bit from a value
    public getBit(from: number, size: number, bit: number, bigEndian: boolean = false): boolean {
        let value = this.getRange(from, size);

        if (bigEndian)
            value = value.reverse();

        let res = value[0];

        if (size > 0)
            for (let i = 1; i < size; i++) {
                res <<= 8;
                res |= value[i];
            }

        return (res & (1 << bit)) !== 0;
    }

    // Sets/Resets a bit in a value
    public setBit(from: number, size: number, bit: number, val: boolean, bigEndian: boolean = false): void {
        let value = this.getRange(from, size, bigEndian);

        let res = value[0];

        if (size > 0)
            for (let i = 1; i < size; i++) {
                res <<= 8;
                res |= value[i];
            }

        if (val)
            res |= (1 << bit);
        else
            res &= ~(1 << bit);

        const resHex = res.toString(16);
        this.setHex(from, size, resHex, false, bigEndian);
    }

    public getWord(from: number, bigEndian: boolean = false): number {
        let value = this.getRange(from, 2, bigEndian);

        let res = value[0];
        res <<= 8;
        res |= value[1];

        return res;
    }

    public setWord(from: number, value: number, bigEndian: boolean = false): void {

        const byteL = value & 0x00FF;
        const byteH = value & 0xFF00;

        this.copyRange(from, 2, new Uint8Array([byteH, byteL]), bigEndian);
    }

    public getByte(offset: number): number {
        return this.fileData[offset];
    }

    public setByte(offset: number, value: number): void {
        this.fileData[offset] = value;
    }

    // Calculates checksum from start index inclusive to end index exclusive
    // and returns it
    public getChecksum(from: number, to: number): number {
        const toChecksum = this.fileData.subarray(from, to);
        const checksum = new Uint8Array([0xFF]);;
        for (let i = 0; i < toChecksum.length; i++) {
            checksum[0] -= toChecksum[i];
        }
        return checksum[0];
    }

    // Recalculates all checksums and sets them on the save data
    public recalcChecksums() {
        // Bank 1 Checksum
        this.fileData[0x3523] = this.getChecksum(0x2598, 0x3523);

        // Bank 2 Checksums for Boxes 1-6
        const bank2IndvChecksums = [
            this.getChecksum(0x4000, 0x4462),
            this.getChecksum(0x4462, 0x48C4),
            this.getChecksum(0x48C4, 0x4D26),
            this.getChecksum(0x4D26, 0x5188),
            this.getChecksum(0x5188, 0x55EA),
            this.getChecksum(0x55EA, 0x5A4C),
        ];
        this.copyRange(0x5A4D, 0x6, new Uint8Array(bank2IndvChecksums));

        // Bank 2 Checksum
        this.fileData[0x5A4C] = this.getChecksum(0x5A4D, 0x5A53);

        // Bank 3 Checksums for Boxes 7-12
        const bank3IndvChecksums = [
            this.getChecksum(0x6000, 0x6462),
            this.getChecksum(0x6462, 0x68C4),
            this.getChecksum(0x68C4, 0x6D26),
            this.getChecksum(0x6D26, 0x7188),
            this.getChecksum(0x7188, 0x75EA),
            this.getChecksum(0x75EA, 0x7A4C),
        ];
        this.copyRange(0x7A4D, 0x6, new Uint8Array(bank3IndvChecksums));

        // Bank 3 Checksum
        this.fileData[0x7A4C] = this.getChecksum(0x7A4D, 0x7A53);
    }

    // Handles Open File Dialog
    // We want this to use es6 async/await and since it never throws an error
    // we can't use Bluebird so we need to promisfy it manually
    protected async openOpenFileDialog(title: string) {
        return new Promise((resolve, reject) => {
            dialog.showOpenDialog({
                title,
                buttonLabel: "Open",
                filters: [
                    { name: 'SAV Files', extensions: ['sav'] },
                    { name: 'All Files', extensions: ['*'] },
                ],
                properties: [
                    "openFile",
                    "treatPackageAsDirectory",
                ],
            }, files => {
                resolve(files);
            });
        });
    }

    // Handles Save File Dialog
    // We want this to use es6 async/await and since it never throws an error
    // we can't use Bluebird so we need to promisfy it manually
    protected async openSaveFileDialog(title: string) {
        return new Promise((resolve, reject) => {
            dialog.showSaveDialog({
                title,
                buttonLabel: "Save",
                filters: [
                    { name: 'SAV Files', extensions: ['sav'] },
                    { name: 'All Files', extensions: ['*'] },
                ],
            }, file => {
                resolve(file);
            });
        });
    }

    // Handles loading file into memory
    protected async readSaveFile(filePath: string) {
        const data = await fs.readFileAsync(filePath);
        this.filePath = filePath;
        this.fileData = data;
        this.fileDataExpanded = new SaveFileExpanded(this);
    }

    // Write Buffer to file
    protected async writeSaveFile(_filePath: string = this.filePath) {
        this.recalcChecksums();
        await fs.writeFileAsync(_filePath, this.fileData);
    }

    // Initiates an open file dialog to open save file
    public async openFile() {
        const fileNames = await this.openOpenFileDialog("Open Save File");

        if (fileNames === undefined) {
            return;
        }

        const filePath = fileNames[0];
        await this.readSaveFile(filePath);
    }

    // Reloads file from disk erasing unsaved changes, if no open file is
    // present just resets buffer
    public async reOpenFile() {
        // If theres no open file then reload an empty array
        if (this.filePath === null) {
            this.fileData = new Uint8Array(0x8000);
            return;
        }

        await this.readSaveFile(this.filePath);
    }

    // Closes file in memory and erases buffer
    public closeFile() {
        this.filePath = null;
        this.fileData = new Uint8Array(0x8000);
        this.fileDataExpanded = new SaveFileExpanded(this);
    }

    // Save file
    public async saveFile() {
        if (this.filePath === null) {
            await this.saveAsFile();
            return;
        }

        await this.writeSaveFile();
    }

    // Save file as...
    public async saveAsFile() {
        const fileName = await this.openSaveFileDialog("Save File As...");

        if (fileName === undefined) {
            return;
        }

        // @ts-ignore
        this.filePath = fileName;
        await this.saveFile();
    }

    // Save copy of file
    public async saveAsCopyFile() {
        const fileName = await this.openSaveFileDialog("Save Copy As...");

        if (fileName === undefined) {
            return;
        }

        // @ts-ignore
        await this.writeSaveFile(fileName);
    }

    // Current file path
    public filePath: string = null;

    // Buffered file data
    public fileData: Uint8Array = new Uint8Array(0x8000);

    // Expands the save data to something more readable and useable
    public fileDataExpanded: SaveFileExpanded;
}
