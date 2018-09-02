const { Menu } = require('electron');
const menuStructure = require("./menu.json");
const _ = require("lodash");

module.exports = class AppMenu {
    constructor(app) {
        this.app = app;
        this.rebuildMenu();

        app.store.onDidChange('recentDocs', this.onRecentDocsChange.bind(this));
    }

    _rebuildMenu(arr) {
        for (var i = 0; i < arr.length; i++) {
            const obj = arr[i];

            // Is not designated platform
            if ((obj.platform !== undefined &&
                process.platform !== obj.platform) ||

                // Or platform designated against
                (obj.notPlatform !== undefined &&
                    process.platform === obj.notPlatform) ||

                // Or wrong designated enviroments
                (obj.env === "dev" &&
                    this.app.isDev !== true) ||
                (obj.env === "prod" &&
                    this.app.isDev === true)
            ) {
                arr.splice(i, 1);
                i--;
                continue;
            }

            if (obj.placeholder !== undefined) {
                arr.splice(i, 1);
                i--;

                if (obj.placeholder === "recentList")
                    arr.splice(i + 1, 0, ...this.recentFilesStructure);

                continue;
            }

            if (obj.trigger !== undefined) {
                obj.click = () => {
                    if (Array.isArray(obj.triggerData))
                        this.app.emit(`menu-${obj.trigger}`, ...obj.triggerData);
                    else
                        this.app.emit(`menu-${obj.trigger}`, obj.triggerData);
                }
            }

            if (obj.submenu !== undefined) {
                this._rebuildMenu(obj.submenu);
            }
        }
    }

    get recentFilesStructure() {
        const store = this.app.store;
        const structure = [];

        // Grab recent docs list
        const recentDocs = store.get('recentDocs', []);

        for (let i = 0; i < recentDocs.length; i++) {
            const recentDoc = recentDocs[i];

            structure.push({
                label: `${recentDoc}`,
                trigger: "openRecentDocs",
                triggerData: i,
                accelerator: `CommandOrControl+Shift+${i}`
            });
        }

        return structure;
    }

    rebuildMenu() {
        this.menuStructure = _.cloneDeep(menuStructure);
        this._rebuildMenu(this.menuStructure);

        let menu = Menu.buildFromTemplate(this.menuStructure);
        Menu.setApplicationMenu(menu);
    }

    onRecentDocsChange(newVal, oldVal) {
        this.rebuildMenu();
    }
}
