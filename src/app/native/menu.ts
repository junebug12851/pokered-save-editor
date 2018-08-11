// Going to try an expirement with using a native menu which will be more
// responsive

// @ts-ignore
const { app, Menu, MenuItem } = window.require('electron').remote;

declare var $: any;
declare var M: any;

const template = [{
    label: 'File',
    submenu: [
        {
            label: 'Open',
            click: () => {
                // @ts-ignore
                window.saveFile.openFile();
            }
        },
        {
            label: 'Recent Files',
            submenu: [
                { role: 'recentDocuments' },
                { role: 'clearRecentDocuments' },
            ]
        },
        { type: 'separator' },
        {
            label: 'Save',
            click: () => {
                // @ts-ignore
                window.saveFile.saveFile();
            }
        },
        {
            label: 'Save As...',
            click: () => {
                // @ts-ignore
                window.saveFile.saveAsFile();
            }
        },
        {
            label: 'Save Copy As...',
            click: () => {
                // @ts-ignore
                window.saveFile.saveAsCopyFile();
            }
        },
        { type: 'separator' },
        {
            label: 'Reload From Disk',
            click: () => {
                // @ts-ignore
                window.saveFile.reOpenFile();
            }
        },
        {
            label: 'Close File',
            click: () => {
                // @ts-ignore
                window.saveFile.closeFile();
            }
        },
        { type: 'separator' },
        {
            label: 'Wipe Unused Space',
            click: () => {
                // @ts-ignore
                window.saveFile.wipeUnusedSpace();
            }
        },
    ]
}, {
    role: 'editMenu'
}, {
    label: 'View',
    submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
    ]
}, {
    label: 'Keyboards',
    submenu: [{
        label: 'Basic',
        click: () => {
            M.Modal.getInstance($("#char-basic-modal")[0]).open();
        }
    }, {
        label: 'Full',
        click: () => {
            M.Modal.getInstance($("#char-full-modal")[0]).open();
        }
    }, {
        label: 'Picture',
        click: () => {
            M.Modal.getInstance($("#char-pic-modal")[0]).open();
        }
    }]
}, {
    role: 'windowMenu'
}, {
    role: 'help',
    submenu: [
        {
            label: 'Learn More',
            click() { /*require('electron').shell.openExternal('https://electronjs.org')*/ }
        }]
}];

// @ts-ignore
if (process.platform === 'darwin') {
    // Add menu to beginning of app
    // @ts-ignore
    template.unshift({
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services', submenu: [] },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    });

    // Edit menu
    // @ts-ignore
    // template[2].submenu.push(
    //     { type: 'separator' },
    //     {
    //         label: 'Speech',
    //         submenu: [
    //             { role: 'startspeaking' },
    //             { role: 'stopspeaking' }
    //         ]
    //     }
    // )

    // Window menu
    // template[3].submenu = [
    //     { role: 'close' },
    //     { role: 'minimize' },
    //     { role: 'zoom' },
    //     { type: 'separator' },
    //     { role: 'front' }
    // ]
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
