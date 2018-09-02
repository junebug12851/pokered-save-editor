const { globalShortcut, BrowserWindow } = require('electron');

module.exports = class Window {
    constructor(app) {

        // Load screen data
        const { screen } = require('electron');

        // Create Window
        const win = this.win = new BrowserWindow({
            width: screen.getPrimaryDisplay().workAreaSize.width,
            height: screen.getPrimaryDisplay().workAreaSize.height,
            show: false,
            simpleFullscreen: true,
            icon: app.icon
        });

        // Always allow opening dev tools in any build or platform
        // In production the dev tools menu item will be removed but the dev tools
        // themselves will always be openable with the same shortcut.
        // This means your average user won't have to concern over it but developers
        // or tinkerers can still access it if desired
        globalShortcut.register('CommandOrControl+Shift+I', this.toggleDevTools.bind(this));

        // Load contents depending on development enviroment or not
        if (app.isDev)
            win.loadURL('http://localhost:4200');
        else
            win.loadFile('./dist/pokered-save-editor/index.html');

        // Hook into events
        win.on('closed', this.onClosed.bind(this));
        win.once('ready-to-show', this.onReadyToShow.bind(this));
    }

    toggleDevTools() {
        this.win.webContents.toggleDevTools();
    }

    onClosed() {
        this.win = null;
    }

    onReadyToShow() {
        this.win.show();
    }
}