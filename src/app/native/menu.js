// Bring in needed items
const { Menu } = window.require('electron').remote;
import { prodMenu } from "./menus/prod";
import { devMenu } from "./menus/dev";

let store = window.electronStore;
if (store === undefined) {
    const Store = window.require('electron-store');
    store = window.electronStore = new Store();
}

function populateRecentFiles(template) {
    // Grab recent docs menu entry
    let entries = template[0].submenu[3].submenu;
    if (process.platform === 'darwin')
        entries = template[1].submenu[3].submenu;

    // Grab recent docs list
    const recentDocs = store.get('recentDocs', []);

    // Empty menu entries
    // Keep topmost since that's the clear option
    entries.length = 1;

    for (let i = 0; i < recentDocs.length; i++) {
        const recentDoc = recentDocs[i];

        entries.push({
            label: `${recentDoc}`,
            click: () => {
                window.saveFile.externalReadSaveFile(recentDoc);
            },
            accelerator: `CommandOrControl+Shift+${i}`
        });
    }
}

// Determine if in dev enviroment or not
const isDev = process.env.DEV
    ? (process.env.DEV.trim() == "true")
    : false;

// Final menu template to be rendered based on production or development
// enviroment
const template = (isDev)
    ? devMenu
    : prodMenu;

populateRecentFiles(template);

// Apply menu
let menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// Update on recent docs change
store.onDidChange('recentDocs', (newVal, oldVal) => {
    populateRecentFiles(template);

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});
