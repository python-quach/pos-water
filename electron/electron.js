const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { channels } = require('../src/shared/constants');
const usbDetect = require('usb-detection');

// Database Setting
const sqlite3 = require('sqlite3');
const userData = app.getPath('userData');
const senterDbFile = path.resolve(userData, 'senter.sqlite3');
const { addNewAccount, findAccount, lastRecord } = require('./sql');
const {
    printReceipt,
    printAddReceipt,
    printBuyReceipt,
    printRenewReceipt,
    printSenterDailyReport,
} = require('./printer');
const { login, report } = require('./db');

// ELECTRON MAIN WINDOW
let mainWindow;

// SQLITE DATABASE
const dbSenter = new sqlite3.Database(senterDbFile, (err) => {
    if (err) {
        return console.log(err.message);
    } else {
        console.log(dbSenter, senterDbFile);
    }
});

// POS PRINTER SETUP
const options = { encoding: 'GB18030' /* default */ };
let escpos;
let device;
let printer;

// PRODUCTION AND DEVELOPMENT index.html location
const productionHTMLFile = url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
});

const devHTMLFile = process.env.ELECTRON_START_URL;
const startUrl = devHTMLFile || productionHTMLFile;

usbDetect.startMonitoring();
usbDetect
    .find()
    .then(function (devices) {
        devices.forEach(function (item) {
            if (item.deviceName === 'USB Printing Support') {
                // console.log('Found USB: ', { ...item });
                escpos = require('escpos');
                escpos.USB = require('escpos-usb');
                device = new escpos.USB();
                printer = new escpos.Printer(device, options);
            }
        });
    })
    .catch(function (err) {
        escpos = null;
        device = null;
        printer = null;
    });

usbDetect.on('add', function (usbDevice) {
    usbDetect
        .find()
        .then(function (devices) {
            devices.forEach(function (item) {
                if (item.deviceName === 'USB Printing Support') {
                    // console.log('Found USB: ', { ...item });
                    escpos = require('escpos');
                    escpos.USB = require('escpos-usb');
                    setTimeout(function () {
                        device = new escpos.USB();
                        printer = new escpos.Printer(device, options);
                    }, 1000);
                }
            });
        })
        .catch(function () {
            escpos = null;
            device = null;
            printer = null;
        });
});

usbDetect.on('remove', function () {
    escpos = null;
    device = null;
    printer = null;
});

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

    mainWindow.removeMenu();
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

const api = require('./database')(dbSenter, senterDbFile);
const controller = require('./controller')(
    api,
    device,
    printer,
    printSenterDailyReport
);

ipcMain.on(channels.LOGIN, controller.authenticate);
ipcMain.on(channels.SENTER_FIND_PHONE, controller.findPhone);
ipcMain.on(channels.SENTER_FIND_ACCOUNT, controller.findAccount);
ipcMain.on(channels.SENTER_FIND_FIRST_NAME, controller.findFirstName);
ipcMain.on(channels.SENTER_FIND_LAST_NAME, controller.findLastName);
ipcMain.on(channels.SENTER_FIND_BOTH_NAME, controller.findBothName);
// ipcMain.on(channels.SENTER_REPORT, controller.dailyReport);

// SENTER DAILY REPORT
ipcMain.on(channels.SENTER_REPORT, (event, arg) => {
    console.log('SENTER_REPORT', arg);
    report(dbSenter, arg, (data) => {
        console.log('Daily Report', data);
        if (device) {
            printSenterDailyReport(device, printer, data);
            event.sender.send(channels.SENTER_REPORT, data);
        } else {
            event.sender.send(channels.SENTER_REPORT, data);
        }
    });
});

// INSERT NEW MEMBERSHIP INTO TABLE
ipcMain.on(channels.SENTER_ADD, (event, args) => {
    console.log('SENTER_ADD: REQUEST', args);
    const {
        account,
        phone,
        first,
        last,
        since,
        fee,
        gallon,
        buy,
        remain,
        type,
        date,
        time,
        previous,
    } = args;

    const data = [
        account,
        phone,
        first,
        last,
        since,
        fee,
        gallon,
        buy,
        remain,
        type,
        date,
        time,
        previous,
    ];

    dbSenter.get(findAccount, account, (err, duplicate) => {
        if (err) return console.log(err.message);

        if (!duplicate) {
            dbSenter.run(addNewAccount, data, function (err) {
                if (err) {
                    return console.log(err.message);
                } else {
                    dbSenter.get(lastRecord, this.lastID, function (err, row) {
                        if (err) return console.log(err.message);
                        event.sender.send(channels.SENTER_ADD, row);
                    });
                }
            });
        } else {
            event.sender.send(channels.SENTER_ADD, {
                error: `Account ${account} already existed`,
                data: args,
            });
        }
    });
});

// INSERT BUY GALLON
ipcMain.on(channels.SENTER_BUY, (event, args) => {
    console.log('SENTER_BUY: REQUEST', args);
    const {
        account,
        phone,
        first,
        last,
        since,
        fee,
        gallon,
        buy,
        remain,
        type,
        date,
        time,
        previous,
    } = args;
    dbSenter.run(
        `INSERT INTO memberships ( 
            account,
            phone,
            first,
            last,
            since,
            fee,
            gallon,
            buy,
            remain,
            type,
            date,
            time, 
            previous
        ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            account,
            phone,
            first,
            last,
            since,
            fee,
            gallon,
            buy,
            remain,
            type,
            date,
            time,
            previous,
        ],
        function (err) {
            if (err) {
                console.log(err.message);
                event.removeAllListeners(channels.SENTER_BUY);
                return console.log(err.message);
            } else {
                console.log(
                    `A row has been inserted with rowid ${this.lastID}`
                );
                dbSenter.get(
                    `SELECT     account,
            phone,
            first,
            last,
            since,
            fee,
            gallon,
            buy,
            remain,
            type,
            date,
            time, previous  FROM memberships WHERE rowid = ?`,
                    this.lastID,
                    function (err, row) {
                        if (err) return console.log(err.message);
                        event.sender.send(channels.SENTER_BUY, row);
                    }
                );
            }
        }
    );
});

// GET ACCOUNT HISTORY
ipcMain.on(channels.SENTER_ACCOUNT_HISTORY, (event, account) => {
    console.log('SENTER_FIND_ACCOUNT_HISTORY', account);
    dbSenter.all(
        `SELECT * FROM memberships WHERE account = ?`,
        account,
        (err, records) => {
            if (err) return console.log('hhaha', err);
            console.log('RECORDS', records);
            event.sender.send(channels.SENTER_ACCOUNT_HISTORY, records);
        }
    );
});

// BACKUP SENTER DATABASE
ipcMain.on(channels.SENTER_BACKUP, (event, request) => {
    const currentdate = new Date().toLocaleDateString();

    dialog
        .showSaveDialog({
            properties: ['openFile', 'multiSelections'],
            defaultPath: `senter.sqlite3`,
            filters: [{ name: 'Sqlite3', extensions: ['sqlite3'] }],
        })
        .then((result) => {
            if (result.filePath) {
                fs.copyFile(senterDbFile, result.filePath, function (err) {
                    if (err) {
                        event.sender.send(channels.SENTER_BACKUP, {
                            open: false,
                        });
                        throw err;
                    } else {
                        event.sender.send(channels.SENTER_BACKUP, {
                            open: `${currentdate.trim()}`,
                        });
                    }
                });
            } else {
                event.sender.send(channels.SENTER_BACKUP, {
                    open: false,
                });
            }
        })
        .catch((err) => {
            event.sender.send(channels.SENTER_BACKUP, {
                open: false,
            });
        });
});

// EDIT SENTER USER
ipcMain.on(channels.SENTER_EDIT, (event, args) => {
    console.log('EDIT:', args);
    const { account, phone, first, last } = args;

    dbSenter.run(
        `UPDATE memberships SET first = ?, last = ?, phone = ? WHERE account = ?`,
        [first, last, phone, account],
        function (err) {
            if (err) return console.log(err.message);
            // console.log(this.lastID);
            dbSenter.all(
                `SELECT * FROM memberships WHERE account = ?`,
                account,
                function (err, rows) {
                    if (err) return console.log(err.message);
                    event.sender.send(channels.SENTER_EDIT, rows);
                }
            );
        }
    );
});

// SENTER CLOSE APP
ipcMain.on(channels.SENTER_CLOSE, (event, args) => {
    ipcMain.removeAllListeners(channels.SENTER_CLOSE);
    app.quit();
});

// SENTER DELETE ACCOUNT
ipcMain.on(channels.SENTER_DELETE, (event, { account, password }) => {
    console.log('SENTER DELETE ACCOUNT', account);
    if (password === '911') {
        dbSenter.run(
            `DELETE FROM memberships WHERE account = ?`,
            account,
            function (err) {
                if (err) return console.log(err.message);
                console.log('DELETED RESULT:', this);
                event.sender.send(channels.SENTER_DELETE, {
                    auth: true,
                    status: this.changes,
                });
            }
        );
    } else {
        console.log(`Unable to delete account: ${account}`);
        event.sender.send(channels.SENTER_DELETE, {
            auth: false,
            status: null,
        });
    }
});

// Close Application
ipcMain.on(channels.CLOSE_APP, (event, _) => {
    ipcMain.removeAllListeners(channels.CLOSE_APP);
    app.quit();
});

// PRINT NEW MEMBERSHIP
ipcMain.on(channels.PRINT_RECEIPT, (event, arg) => {
    if (device) {
        printAddReceipt(device, printer, arg, (done) => {
            event.sender.send(channels.PRINT_RECEIPT, { done: true });
        });
    } else {
        event.sender.send(channels.PRINT_RECEIPT, { done: false });
    }
});

// PRINT BUY RECEIPT
ipcMain.on(channels.PRINT_BUY_RECEIPT, (event, arg) => {
    if (device) {
        printBuyReceipt(device, printer, arg);
        event.sender.send(channels.PRINT_BUY_RECEIPT, { done: true });
    } else {
        event.sender.send(channels.PRINT_BUY_RECEIPT, { done: false });
    }
});

// SENTER PRINT RECEIPT
ipcMain.on(channels.SENTER_PRINT, (event, receipt) => {
    console.log('SENTER PRINT', receipt);
    if (device) {
        printReceipt(device, printer, receipt);
        event.sender.send(channels.SENTER_PRINT, { done: true });
    } else {
        event.sender.send(channels.SENTER_PRINT, { done: false });
    }
});

// PRINT RENEW RECEIPT
ipcMain.on(channels.PRINT_RENEW_RECEIPT, (event, arg) => {
    if (device) {
        printRenewReceipt(device, printer, arg);
        event.sender.send(channels.PRINT_RENEW_RECEIPT, { done: true });
    } else {
        event.sender.send(channels.PRINT_RENEW_RECEIPT, { done: false });
    }
});
