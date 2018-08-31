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
const { app, BrowserWindow } = require('electron');
const Store = require('electron-store')
const store = new Store()

const path = require("path");

let win;

const isDev = process.env.DEV
    ? (process.env.DEV.trim() == "true")
    : false;

const icon = (isDev)
    ? path.join(__dirname, 'src/assets/icons/png/mipmap-xhdpi/ic_launcher.png')
    : path.join(__dirname, 'dist/pokered-save-editor/assets/icons/png/mipmap-xhdpi/ic_launcher.png');

function createWindow() {
    const { screen } = require('electron');

    win = new BrowserWindow({
        width: screen.getPrimaryDisplay().workAreaSize.width,
        height: screen.getPrimaryDisplay().workAreaSize.height,
        show: false,
        simpleFullscreen: true,
        webPreferences: {
            //webSecurity: false,
            //allowRunningInsecureContent: true
        },
        icon
    });

    if (isDev)
        win.loadURL('http://localhost:4200');
    else
        win.loadFile('./dist/pokered-save-editor/index.html');

    win.on('closed', () => {
        win = null;
    });

    win.once('ready-to-show', () => {
        win.show();
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});
