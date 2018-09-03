const { app, ipcMain } = require('electron');
const path = require("path");
const Window = require("./Window");
const AppMenu = require("./AppMenu");
const Store = require('electron-store');
const EventEmitter = require('events');
const SaveFile = require('./SaveFile');

/**
 * App Singleton (Wrapper around electron app singleton var)
 */
module.exports = class App extends EventEmitter {
    constructor() {
        super();

        // Make Single Instance and ensure single instance
        if (app.makeSingleInstance(this.onSecondInstance.bind(this)))
            this.quit();

        // Electron app var
        this.app = app;

        // Window
        this.mainWindow = null;

        // Is development or not
        this.isDev = process.env.DEV
            ? (process.env.DEV.trim() == "true")
            : false;

        // Adjust process working directory depending on dev enviroment or not
        if (this.isDev)
            process.chdir(path.join(__dirname, '../src'));
        else
            process.chdir(path.join(__dirname, '../dist/pokered-save-editor'));

        this.store = new Store();
        this.saveFile = new SaveFile(this);

        // App Icon
        this.icon = 'assets/icons/512x512.png';

        // Set Name
        app.setName("Pokered Save Editor");

        // App events to hook into for wrapper
        app.on('ready', this.createWindow.bind(this));
        app.on('window-all-closed', this.quit.bind(this));

        ipcMain.on('ipcFrom', this.onIpcFrom.bind(this));
    }

    onIpcFrom(sender, event, ...args) {
        this.emit(`ipcFrom-${event}`, ...args);
    }

    onSecondInstance(argv, cwd) {
        if (this.mainWindow)
            this.mainWindow.reOpen();
    }

    createWindow() {
        // Menu must be called around this time so it's placed here
        this.menu = new AppMenu(this);
        this.mainWindow = new Window(this);
    }

    quit() {
        app.quit();
    }
}
