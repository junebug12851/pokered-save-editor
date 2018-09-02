const { app } = require('electron');
const path = require("path");
const Window = require("./Window");

/**
 * App Singleton (Wrapper around electron app singleton var)
 */
module.exports = class App {
    constructor() {
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

        // App Icon
        this.icon = 'assets/icons/512x512.png';

        // App events to hook into for wrapper
        app.on('ready', this.createWindow.bind(this));
        app.on('window-all-closed', this.quit.bind(this));
    }

    createWindow() {
        this.mainWindow = new Window(this);
    }

    quit() {
        this.app.quit();
    }
}