const { app } = window.require('electron').remote;

export const devMenu = [{
    label: 'File',
    submenu: [
        {
            label: 'New',
            click: () => {
                window.saveFile.closeFile();
            },
            accelerator: "CommandOrControl+N"
        },
        {
            label: 'Open',
            click: () => {
                window.saveFile.openFile();
            },
            accelerator: "CommandOrControl+O"
        },
        {
            label: 'Re-open',
            click: () => {
                window.saveFile.reOpenFile();
            },
            accelerator: "CommandOrControl+Shift+O"
        },
        {
            label: 'Recent Files',
            submenu: [{
                label: "Clear List",
                click: () => {
                    window.saveFile.clearRecentDocs();
                },
                accelerator: "CommandOrControl+Shift+-"
            }]
        },
        { type: 'separator' },
        {
            label: 'Save',
            click: () => {
                window.saveFile.saveFile();
            },
            accelerator: "CommandOrControl+S"
        },
        {
            label: 'Save As...',
            click: () => {
                window.saveFile.saveAsFile();
            },
            accelerator: "CommandOrControl+Shift+S"
        },
        {
            label: 'Save Copy As...',
            click: () => {
                window.saveFile.saveAsCopyFile();
            },
            accelerator: "CommandOrControl+Alt+S"
        },
        { type: 'separator' },
        {
            label: 'Wipe Unused Space',
            click: () => {
                window.saveFile.wipeUnusedSpace();
            },
            accelerator: "CommandOrControl+Shift+W"
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
            window.keyboards.openBasicKeyboard();
        },
        accelerator: "CommandOrControl+Alt+B"
    }, {
        label: 'Full',
        click: () => {
            window.keyboards.openFullKeyboard();
        },
        accelerator: "CommandOrControl+Alt+F"
    }, {
        label: 'Picture',
        click: () => {
            window.keyboards.openPicKeyboard();
        },
        accelerator: "CommandOrControl+Alt+P"
    }]
}, {
    role: 'windowMenu'
}];

// If OSX, Add Initial OSX Menu Item
// And recent items menu entry
if (process.platform === 'darwin') {
    devMenu.unshift({
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
}
else {
    devMenu[0].submenu.splice(devMenu[0].submenu.length - 1, 0, {
        label: 'Exit',
        click: () => {
            window.keyboards.openPicKeyboard();
        },
        accelerator: "Alt+F4"
    });
}
