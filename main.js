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

let win;

function createWindow() {
    const { screen } = require('electron');

    win = new BrowserWindow({
        width: screen.getPrimaryDisplay().workAreaSize.width * .85,
        height: screen.getPrimaryDisplay().workAreaSize.height * .85,
        show: false,
        simpleFullscreen: true,
        webPreferences: {
            //webSecurity: false,
            //allowRunningInsecureContent: true
        },
    });

    win.loadURL('http://localhost:4200');

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
