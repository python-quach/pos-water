const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const url = require('url');
const { channels } = require('../src/shared/constants');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

let mainWindow;

const productionHTMLFile = url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
});

const devHTMLFile = process.env.ELECTRON_START_URL;

app.whenReady().then(() => {
    const startUrl = devHTMLFile || productionHTMLFile;
    const displays = screen.getAllDisplays();

    const externalDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0;
    });

    if (externalDisplay) {
        mainWindow = new BrowserWindow({
            frame: false,
            x:
                externalDisplay.bounds.x +
                (externalDisplay.bounds.width - 800) / 2,
            y:
                externalDisplay.bounds.y +
                (externalDisplay.bounds.height - 600) / 2,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
            },
        });
        mainWindow.loadURL(startUrl);
    } else {
        // createWindow();
    }

    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});

function createWindow() {
    const startUrl = devHTMLFile || productionHTMLFile;
    // const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // mainWindow = new BrowserWindow({
    //     width,
    //     height,
    //     frame: false,
    //     webPreferences: {
    //         preload: path.join(__dirname, 'preload.js'),
    //     },
    // });

    mainWindow.loadURL(startUrl);
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

// app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on(channels.APP_INFO, (event, arg) => {
    console.log('receive app info message');

    event.sender.send(channels.APP_INFO, {
        appName: app.getName(),
        appVersion: app.getVersion(),
        production: productionHTMLFile,
        development: devHTMLFile,
    });
});
