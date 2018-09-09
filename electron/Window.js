const { globalShortcut, BrowserWindow } = require('electron');

module.exports = class Window {
    constructor(app) {

        this.app = app;

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
        app.on('ipcTo', this.onIpcTo.bind(this));

        // Relay keyboard requests to the window
        app.on('menu-keyboardBasic', this.relayTo.bind(this));
        app.on('menu-keyboardFull', this.relayTo.bind(this));
        app.on('menu-keyboardPic', this.relayTo.bind(this));
    }

    // Certain events can be hooked into and echoed to the ipcTo channel
    // which will be relayed directly to the window
    relayTo(event, ...args) {
        app.emit(`ipcTo`, event, ...args);
    }

    toggleDevTools() {
        this.win.webContents.toggleDevTools();
    }

    reOpen() {
        if (this.win.isMinimized()) this.win.restore();
        this.win.focus();
    }

    onIpcTo(event, ...args) {

        const appName = this.app.app.getName();

        // Jump in on certain events
        if (event === "pathChange" && args[0] !== "")
            this.win.setTitle(`${appName} - ${args[0]}`);
        else if (event === "pathChange")
            this.win.setTitle(`${appName} - New File`);

        this.win.webContents.send(event, ...args);
    }

    onClosed() {
        this.win = null;
    }

    onReadyToShow() {
        this.win.show();
        this.app.emit("window-ready");
    }
}
