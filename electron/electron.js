const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const { channels } = require('../src/shared/constants');
const sqlite3 = require('sqlite3');
const userData = app.getPath('userData');
const dbFile = path.resolve(userData, 'membership.sqlite3');
const usbDetect = require('usb-detection');

// ELECTRON MAIN WINDOW
let mainWindow;

// SQLITE DATABASE
let db;

// PRODUCTION AND DEVELOPMENT index.html location
const productionHTMLFile = url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
});
const devHTMLFile = process.env.ELECTRON_START_URL;
const startUrl = devHTMLFile || productionHTMLFile;

db = new sqlite3.Database(dbFile);

// ELECTRON SETUP
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        backgroundColor: '#0a2e4c',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
    });

    // mainWindow.removeMenu();
    mainWindow.loadURL(startUrl);
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    usbDetect.stopMonitoring();
    if (process.platform !== 'darwin') app.quit();
});

/**
 * ipcMain listen for incoming request to pull data from Sqlite Database and response back
 *
 */
const api = require('./database')(db, dbFile);
const controller = require('./controller')(api);

ipcMain.on(channels.LOGIN, controller.verifyCredential);
ipcMain.on(channels.ADD, controller.addNewMembership);
ipcMain.on(channels.FIND, controller.findMembership);
ipcMain.on(channels.SHOW_BACKUP_DIALOG, controller.backupDatabase);
ipcMain.on(channels.BUY, controller.buyWater);
ipcMain.on(channels.RENEW, controller.renewMembership);
ipcMain.on(channels.EDIT, controller.editMembershipInfo);
ipcMain.on(channels.HISTORY, controller.getHistory);
ipcMain.on(channels.TOTAL, controller.getTotalAccountInvoices);
ipcMain.on(channels.LAST_RECORD, controller.getLastRecord);
ipcMain.on(channels.TOTAL_FEE, controller.getTotalFee);
ipcMain.on(channels.TOTAL_RENEW, controller.getTotalRenewalGallon);
ipcMain.on(channels.TOTAL_BUY, controller.getTotalBuyGallon);
ipcMain.on(channels.ALL_HISTORY, controller.getEverything);
ipcMain.on(channels.REPORT, controller.dailyReport);
ipcMain.on(channels.PRINT_RECEIPT, controller.newReceipt);
ipcMain.on(channels.PRINT_BUY_RECEIPT, controller.buyReceipt);
ipcMain.on(channels.PRINT_RENEW_RECEIPT, controller.renewReceipt);
ipcMain.on(channels.DELETE_USER, controller.deleteUser);
ipcMain.on(channels.GET_USERS, controller.getUsers);
ipcMain.on(channels.ADD_USER, controller.addUser);
ipcMain.on(channels.EDIT_USER, controller.editUser);
ipcMain.on(channels.DELETE_ACCOUNT, controller.deleteMembership);

// Close Electron Application
ipcMain.on(channels.CLOSE_APP, () => {
    ipcMain.removeAllListeners(channels.CLOSE_APP);
    app.quit();
});
