const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { channels } = require('../src/shared/constants');
const sqlite3 = require('sqlite3');
const userData = app.getPath('userData');
const dbFile = path.resolve(userData, 'membership.sqlite3');
// const usbDetect = require('usb-detection');

const {
    printAddReceipt,
    printBuyReceipt,
    printRenewReceipt,
    printDailyReport,
} = require('./printer');
const {
    addMemberShip,
    login,
    find,
    buy,
    renew,
    edit,
    history,
    total_account_invoices,
    last_record,
    totalFee,
    totalRenew,
    totalBuy,
    dailyReport,
} = require('./db');

let mainWindow;
let db;
let device;
let printer;

db = new sqlite3.Database(dbFile, (err) => {
    if (err) console.error('Database opening error', err);
    console.log(`sqlite debug:`, { err, dbFile, userData });
});

const productionHTMLFile = url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
});

const devHTMLFile = process.env.ELECTRON_START_URL;

// ELECTRON SETUP
function createWindow() {
    const startUrl = devHTMLFile || productionHTMLFile;
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
        },
    });

    mainWindow.removeMenu();
    mainWindow.loadURL(startUrl);
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    let escpos = require('escpos');
    escpos.USB = require('escpos-usb');
    const options = { encoding: 'GB18030' /* default */ };

    device = new escpos.USB();
    printer = new escpos.Printer(device, options);

    // MIght remove this
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

app.on('ready', createWindow);

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

// ADD NEW MEMBERSHIP
ipcMain.on(channels.ADD, (event, arg) => {
    addMemberShip(db, arg, (duplicateAccount, data) => {
        if (duplicateAccount) {
            event.sender.send(channels.ADD, duplicateAccount);
        } else {
            if (device) printAddReceipt(device, printer, data);
            event.sender.send(channels.ADD, data);
        }
    });
});

// LOGIN USER
ipcMain.on(channels.LOGIN, (event, arg) => {
    login(db, arg, (user) => {
        event.sender.send(channels.LOGIN, { login: user });
    });
});

// FIND MEMBERSHIP
ipcMain.on(channels.FIND, (event, arg) => {
    find(db, arg, (data) => {
        event.sender.send(channels.FIND, data);
    });
});

// BUY
ipcMain.on(channels.BUY, (event, arg) => {
    buy(db, arg, (data) => {
        if (device) printBuyReceipt(device, printer, data);
        event.sender.send(channels.BUY, data);
    });
});

// RENEW
ipcMain.on(channels.RENEW, (event, arg) => {
    renew(db, arg, (data) => {
        if (device) printRenewReceipt(device, printer, data);
        event.sender.send(channels.RENEW, data);
    });
});

// EDIT;
ipcMain.on(channels.EDIT, (event, arg) => {
    edit(db, arg, (data) => {
        event.sender.send(channels.EDIT, data);
    });
});

// HISTORY
ipcMain.on(channels.HISTORY, (event, arg) => {
    history(db, arg, (data) => {
        event.sender.send(channels.HISTORY, data);
    });
});

// Total Invoices
ipcMain.on(channels.TOTAL, (event, arg) => {
    total_account_invoices(db, arg, (total) => {
        event.sender.send(channels.TOTAL, total);
    });
});

// Get last Record
ipcMain.on(channels.LAST_RECORD, (event) => {
    last_record(db, (record) => {
        event.sender.send(channels.LAST_RECORD, record);
    });
});

// GET TOTAL RENEW FEE
ipcMain.on(channels.TOTAL_FEE, (event, arg) => {
    totalFee(db, arg, (total) => {
        event.sender.send(channels.TOTAL_FEE, { totalRenewalFee: total });
    });
});

// GET TOTAL RENEW GALLON
ipcMain.on(channels.TOTAL_RENEW, (event, arg) => {
    totalRenew(db, arg, (totalRenew) => {
        event.sender.send(channels.TOTAL_RENEW, totalRenew);
    });
});

// GET TOTAL BUY GALLON
ipcMain.on(channels.TOTAL_BUY, (event, arg) => {
    totalBuy(db, arg, (totalBuy) => {
        event.sender.send(channels.TOTAL_BUY, totalBuy);
    });
});

// Daily Report
ipcMain.on(channels.REPORT, (event, arg) => {
    dailyReport(db, arg, (data) => {
        if (device) {
            printDailyReport(device, printer, data);
        } else {
            event.sender.send(channels.REPORT, data);
        }
    });
});

// Close Application
ipcMain.on(channels.CLOSE_APP, (event, _) => {
    ipcMain.removeAllListeners(channels.CLOSE_APP);
    console.log('Closing App');
    app.quit();
});

// BACK UP DATABASE
ipcMain.on(channels.SHOW_BACKUP_DIALOG, (event, request) => {
    console.log('open dialog box');
    const currentdate = new Date();
    const datetime =
        currentdate.getMonth() +
        1 +
        '-' +
        currentdate.getDate() +
        '-' +
        currentdate.getFullYear();
    console.log(datetime);

    dialog
        .showSaveDialog({
            properties: ['openFile', 'multiSelections'],
            defaultPath: `backup-${datetime}.sqlite3`,
            filters: [{ name: 'Sqlite3', extensions: ['sqlite3'] }],
        })
        .then((result) => {
            console.log(result);

            fs.copyFile(dbFile, result.filePath, function (err) {
                if (err) {
                    event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                        open: false,
                    });
                    throw err;
                } else {
                    console.log(
                        'Successfully copied and moved the file!',
                        result.filePath
                    );
                    event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                        open: `backup-${datetime}.sqlite3`,
                    });
                }
            });
        })
        .catch((err) => {
            console.log(err);
            event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                open: false,
            });
        });
});
