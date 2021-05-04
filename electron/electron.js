const { app, BrowserWindow, ipcMain } = require('electron');
const { channels } = require('../src/shared/constants');
const path = require('path');
const url = require('url');
const db = require('./database')(app);
const controller = require('./controller')(db);

// ELECTRON SETUP
function createWindow() {
    const productionHTMLFile = url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
    });

    const devHTMLFile = process.env.ELECTRON_START_URL;
    const startUrl = devHTMLFile || productionHTMLFile;

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        darkTheme: true,
        backgroundColor: '#0a2e4c',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
    });

    mainWindow.removeMenu();
    mainWindow.loadURL(startUrl);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

app.whenReady().then(async () => {
    createWindow();
    controller.usbDetect.startMonitoring();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    controller.usbDetect.stopMonitoring();
    if (process.platform !== 'darwin') app.quit();
});

/**
 * Listen for incoming api request, and response back with the appropriate data
 */
ipcMain.on(channels.LOGIN, controller.authenticate);
ipcMain.on(channels.SENTER_FIND_PHONE, controller.findPhone);
ipcMain.on(channels.SENTER_FIND_ACCOUNT, controller.findAccount);
ipcMain.on(channels.SENTER_FIND_FIRST_NAME, controller.findFirstName);
ipcMain.on(channels.SENTER_FIND_LAST_NAME, controller.findLastName);
ipcMain.on(channels.SENTER_FIND_BOTH_NAME, controller.findBothName);
ipcMain.on(channels.SENTER_REPORT, controller.dailyReport);
ipcMain.on(channels.SENTER_ADD, controller.addNewMembership);
ipcMain.on(channels.SENTER_BUY, controller.buyWater);
ipcMain.on(channels.SENTER_PRINT, controller.print);
ipcMain.on(channels.SENTER_ACCOUNT_HISTORY, controller.history);
ipcMain.on(channels.SENTER_BACKUP, controller.backup);
ipcMain.on(channels.SENTER_EDIT, controller.editMembership);
ipcMain.on(channels.SENTER_DELETE, controller.deleteMembership);
ipcMain.on(channels.SENTER_CLOSE, () => app.quit());
