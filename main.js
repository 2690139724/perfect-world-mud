const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
const childWindows = {};

function getWindowOptions(options = {}) {
    const defaults = {
        width: 1280,
        height: 850,
        minWidth: 1000,
        minHeight: 700,
        title: '无尽疆域 - 完美世界',
        icon: path.join(__dirname, 'build', 'icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
        },
        frame: false,
        resizable: true,
        backgroundColor: '#0a0806',
        show: false,
    };
    return { ...defaults, ...options };
}

function createWindow() {
    const opts = getWindowOptions();
    opts.show = true;
    mainWindow = new BrowserWindow(opts);

    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.on('close', (event) => {
        event.preventDefault();
        for (const id in childWindows) {
            try {
                childWindows[id].destroy();
            } catch (e) {}
        }
        childWindows = {};
        mainWindow.destroy();
        app.exit();
    });
}

function createChildWindow(windowId, options) {
    if (childWindows[windowId]) {
        childWindows[windowId].focus();
        return;
    }

    const opts = getWindowOptions({
        width: options.width || 800,
        height: options.height || 600,
        minWidth: options.minWidth || 600,
        minHeight: options.minHeight || 400,
        title: options.title || '无尽疆域',
        parent: mainWindow,
        modal: options.modal || false,
        frame: true,
        show: false,
    });

    const win = new BrowserWindow(opts);

    const queryParams = new URLSearchParams({ 
        windowId,
        windowType: options.type || ''
    }).toString();
    
    win.loadURL(`file://${path.join(__dirname, 'dist', 'index.html')}?${queryParams}`);

    win.on('ready-to-show', () => {
        win.show();
    });

    win.on('closed', () => {
        delete childWindows[windowId];
    });

    childWindows[windowId] = win;
    return win;
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('get-app-path', () => {
    return app.getPath('userData');
});

ipcMain.handle('save-file', (event, fileName, data) => {
    const userDataPath = app.getPath('userData');
    const filePath = path.join(userDataPath, fileName);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Save file error:', error);
        return false;
    }
});

ipcMain.handle('read-file', (event, fileName) => {
    const userDataPath = app.getPath('userData');
    const filePath = path.join(userDataPath, fileName);
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data);
        }
        return null;
    } catch (error) {
        console.error('Read file error:', error);
        return null;
    }
});

ipcMain.handle('delete-file', (event, fileName) => {
    const userDataPath = app.getPath('userData');
    const filePath = path.join(userDataPath, fileName);
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Delete file error:', error);
        return false;
    }
});

ipcMain.handle('create-child-window', (event, windowId, options) => {
    try {
        createChildWindow(windowId, options);
        return true;
    } catch (error) {
        console.error('Create child window error:', error);
        return false;
    }
});

ipcMain.handle('close-child-window', (event, windowId) => {
    try {
        if (childWindows[windowId]) {
            childWindows[windowId].close();
            delete childWindows[windowId];
        }
        return true;
    } catch (error) {
        console.error('Close child window error:', error);
        return false;
    }
});

ipcMain.handle('list-files', (event) => {
    const userDataPath = app.getPath('userData');
    try {
        const files = fs.readdirSync(userDataPath);
        return files.filter(f => f.endsWith('.dat'));
    } catch (error) {
        console.error('List files error:', error);
        return [];
    }
});

ipcMain.handle('window-minimize', () => {
    if (mainWindow) {
        mainWindow.minimize();
    }
});

ipcMain.handle('window-maximize', () => {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    }
});