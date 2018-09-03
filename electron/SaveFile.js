const BluePromise = require("bluebird");
const fs = require("fs");
const electron = require("electron");
const { dialog } = electron;
const fs2 = BluePromise.promisifyAll(fs);
const _ = require("lodash");

module.exports = class SaveFile {
    constructor(app) {
        this.app = app;

        // Init empty path and data
        this.onPathChange();
        this.onDataChange();

        this.app.on("menu-clearRecentDocs", this.clearRecentDocs.bind(this));
        this.app.on("menu-open", this.openFile.bind(this));
        this.app.on("menu-reopen", this.reOpenFile.bind(this));
        this.app.on("menu-new", this.closeFile.bind(this));
        this.app.on("menu-save", this.saveFile.bind(this));
        this.app.on("menu-saveAs", this.saveAsFile.bind(this));
        this.app.on("menu-saveAsCopy", this.saveAsCopyFile.bind(this));
        this.app.on("menu-wipe", this.wipeUnusedSpace.bind(this));

        this.app.on("ipcFrom-dataUpdate", this.onDataChange.bind(this));

        this.app.on("window-ready", this.onWindowReady.bind(this));
    }

    onWindowReady() {
        this.onPathChange(this.filePath);
    }

    onPathChange(path = "") {
        if (path !== "")
            this.addRecentDocument(path);

        this.filePath = path;
        this.app.emit("ipcTo", "pathChange", path);
    }

    onDataChange(data = new Uint8Array(0x8000), fromRender = false) {
        this.fileData = data;

        if (!fromRender)
            this.app.emit("ipcTo", "dataChange", data);

        if (fromRender && this.pendingSave)
            this._writeSaveFile();
    }

    // Adds a file to the list of recent documents which is persistent
    // Only 10 unique non-duplicate files are kept meaning each entry will be
    // a different file, the samefile will remain in the same slot
    // They are added to the top, oldest at the bottom
    // They are accessible via CommandOrControl+Shift+# <0-9>
    addRecentDocument(path) {
        let recentDocs = this.app.store.get('recentDocs', []);
        recentDocs.unshift(path);
        recentDocs = _.uniq(recentDocs);
        if (recentDocs.length > 10)
            recentDocs.length = 10;
        store.set('recentDocs', recentDocs);
    }

    // Handles Open File Dialog
    // We want this to use es6 async/await and since it never throws an error
    // we can't use Bluebird so we need to promisfy it manually
    openOpenFileDialog(title) {
        return new Promise((resolve) => {
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
            }, (files) => {
                resolve(files);
            });
        });
    }

    // Handles Save File Dialog
    // We want this to use es6 async/await and since it never throws an error
    // we can't use Bluebird so we need to promisfy it manually
    openSaveFileDialog(title) {
        return new Promise((resolve) => {
            dialog.showSaveDialog({
                title,
                buttonLabel: "Save",
                filters: [
                    { name: 'SAV Files', extensions: ['sav'] },
                    { name: 'All Files', extensions: ['*'] },
                ],
            }, (file) => {
                resolve(file);
            });
        });
    }

    // Handles loading file into memory
    async readSaveFile(filePath) {
        // Read file
        const data = await fs2.readFileAsync(filePath);

        this.onDataChange(data);
        this.onPathChange(filePath);
    }

    // Cache and save requested data update
    async _writeSaveFile() {
        await fs2.writeFileAsync(this.pendingSave, this.fileData);
    }

    // Request data update
    async writeSaveFile(_filePath = this.filePath) {
        this.pendingSave = _filePath;
        this.app.emit("ipcTo", "dataUpdate");
    }

    clearRecentDocs() {
        this.app.store.set('recentDocs', []);
    }

    // Initiates an open file dialog to open save file
    async openFile() {
        const fileNames = await this.openOpenFileDialog("Open Save File");

        if (fileNames === undefined) {
            return;
        }

        const filePath = fileNames[0];
        await this.readSaveFile(filePath);
    }

    // Reloads file from disk erasing unsaved changes, if no open file is
    // present just resets buffer
    async reOpenFile() {
        // If theres no open file then reload an empty array
        if (this.filePath === "") {
            this.onDataChange();
            return;
        }

        await this.readSaveFile(this.filePath);
    }

    // Closes file in memory and erases buffer
    closeFile() {
        this.onDataChange();
        this.onPathChange();
    }

    // Save file
    async saveFile() {
        if (this.filePath === "") {
            await this.saveAsFile();
            return;
        }

        await this.writeSaveFile();
    }

    // Save file as...
    async saveAsFile() {
        const fileName = await this.openSaveFileDialog("Save File As...");

        if (fileName === undefined) {
            return;
        }

        await this.saveFile();
        this.onPathChange(fileName);
    }

    // Save copy of file
    async saveAsCopyFile() {
        const fileName = await this.openSaveFileDialog("Save Copy As...");

        if (fileName === undefined) {
            return;
        }

        await this.writeSaveFile(fileName);
    }

    // This erases the raw internal data completely leaving the file all zeroes
    // Normally the expanded copy will overwrite only the used bytes and leave
    // everything else as-is however with this method the expanded copy will
    // still do the same but will be writing back to a clean slate thus blasting
    // away all unused values
    wipeUnusedSpace(val = 0x00) {
        // We fill the array from start to end with a fill value, default 0x00
        // We do this because we don't want to change the array instance only
        // the array contents
        this.fileData.fill(val);
    }
}
