const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { channels } = require('../src/shared/constants');
const sqlite3 = require('sqlite3');
const userData = app.getPath('userData');
const dbFile = path.resolve(userData, 'membership.sqlite3');
const usbDetect = require('usb-detection');
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
    // totalInvoices,
} = require('./db');

// NOTE NEED TO CHANGE AREA CODE INTO STRING

// ELECTRON MAIN WINDOW
let mainWindow;

// SQLITE DATABASE
let db;

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

db = new sqlite3.Database(dbFile);

usbDetect.startMonitoring();
usbDetect
    .find()
    .then(function (devices) {
        console.log(devices);
        devices.forEach(function (item) {
            if (item.deviceName === 'USB Printing Support') {
                console.log('Found USB: ', { ...item });
                escpos = require('escpos');
                escpos.USB = require('escpos-usb');
                device = new escpos.USB();
                printer = new escpos.Printer(device, options);
            }
        });
    })
    .catch(function (err) {
        console.log('71', err);
        escpos = null;
        device = null;
        printer = null;
    });

usbDetect.on('add', function (usbDevice) {
    console.log(usbDevice);
    usbDetect
        .find()
        .then(function (devices) {
            devices.forEach(function (item) {
                if (item.deviceName === 'USB Printing Support') {
                    console.log('Found USB: ', { ...item });
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

// ADD NEW MEMBERSHIP
ipcMain.on(channels.ADD, (event, arg) => {
    addMemberShip(db, arg, (duplicateAccount, data) => {
        if (duplicateAccount) {
            event.sender.send(channels.ADD, duplicateAccount);
        } else {
            // if (device) printAddReceipt(device, printer, data);
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
        // Remove to prevent automatic printing
        // if (device) printBuyReceipt(device, printer, data);
        event.sender.send(channels.BUY, data);
    });
});

// RENEW
ipcMain.on(channels.RENEW, (event, arg) => {
    renew(db, arg, (data) => {
        // if (device) printRenewReceipt(device, printer, data);
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
            if (result.filePath) {
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
            } else {
                // TODO: might remove this line
                event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                    open: false,
                });
            }
        })
        .catch((err) => {
            console.log('catch', err);
            event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                open: false,
            });
        });
});

// PRINT NEW MEMBERSHIP
ipcMain.on(channels.PRINT_RECEIPT, (event, arg) => {
    const renewFee = `Membership Fee: $${arg.field9}`;
    const fullname = `${arg.field4} -- ${arg.field7}`;
    const gallonLeft = `Gallon Total  : ${arg.field31}`;
    const blank = '';
    const time = `${arg.field15}  ${arg.field32}`;
    const message = `Thank You                [Account#: ${arg.field22}]`;

    const receipt = () => {
        console.log(fullname);
        console.log(renewFee);
        console.log(gallonLeft);
        console.log(time);
        console.log(blank);
        console.log(message);
        console.log('Mckee Pure Water');
        console.log('(408) 729-1319');
    };

    console.log('PRINT: ', arg);
    receipt();

    if (device) {
        printAddReceipt(device, printer, arg, (done) => {
            console.log({ done });
            event.sender.send(channels.PRINT_RECEIPT, { done: true });
        });
    } else {
        event.sender.send(channels.PRINT_RECEIPT, { done: false });
    }
});

// PRINT BUY RECEIPT
ipcMain.on(channels.PRINT_BUY_RECEIPT, (event, arg) => {
    const fullname = `${arg.fullname} -- ${arg.fourDigit}`;
    const prevGallon = `Gallon Prev: ${arg.prev}`;
    const gallonBuy = `Gallon Buy : ${arg.buy}`;
    const blank = '';
    const gallonLeft = `Gallon Left: ${arg.remain}`;
    const message = `Thank You                [Account#: ${arg.account}]`;

    if (device) {
        printBuyReceipt(device, printer, arg);
        event.sender.send(channels.PRINT_RECEIPT, { done: true });
    } else {
        console.log(blank);
        console.log(fullname);
        console.log(prevGallon);
        console.log(gallonBuy);
        console.log(gallonLeft);
        console.log(arg.invoiceDate + ' ' + arg.invoiceTime);
        console.log(blank);
        console.log(message);
        console.log('Mckee Pure Water');
        console.log('(408) 729-1319');
        console.log(blank);
        event.sender.send(channels.PRINT_BUY_RECEIPT, { done: false });
    }
});

// PRINT RENEW RECEIPT
ipcMain.on(channels.PRINT_RENEW_RECEIPT, (event, arg) => {
    const renewGallon = `Gallon Renew: ${arg.renew}`;
    const renewFee = `Renew Fee   : $${arg.fee}`;
    const fullname = `${arg.fullname} -- ${arg.fourDigit}`;
    const totalGallon = `Gallon Left : ${arg.remain}`;
    const message = `Thank You                [Account#: ${arg.account}]`;
    const blank = '';

    if (device) {
        printRenewReceipt(device, printer, arg);
        event.sender.send(channels.PRINT_RENEW_RECEIPT, { done: true });
    } else {
        console.log(blank);
        console.log(fullname.trim());
        console.log(renewFee);
        console.log(`Gallon Prev : ${arg.prev}`);
        console.log(renewGallon);
        console.log(totalGallon);
        console.log(arg.invoiceDate + ' ' + arg.invoiceTime);
        console.log(blank);
        console.log(message);
        console.log('Mckee Pure Water');
        console.log('(408) 729-1319');
        console.log(blank);

        event.sender.send(channels.PRINT_RENEW_RECEIPT, { done: false });
    }
});
