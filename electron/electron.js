const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const { channels } = require('../src/shared/constants');
const sqlite3 = require('sqlite3');
const userData = app.getPath('userData');
const dbFile = path.resolve(userData, 'membership.sqlite3');
const usbDetect = require('usb-detection');
const {
    printReceipt,
    printAddReceipt,
    printBuyReceipt,
    printRenewReceipt,
    printDailyReport,
} = require('./printer');
const {
    totalRenew,
    totalBuy,
    dailyReport,
    deleteAccount,
    getAllUsers,
    addUser,
    deleteUser,
    editUser,
} = require('./db');

// ELECTRON MAIN WINDOW
let mainWindow;

// SQLITE DATABASE
let db;
// let dbSenter;

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
        devices.forEach(function (item) {
            if (item.deviceName === 'USB Printing Support') {
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

usbDetect.on('add', function () {
    usbDetect
        .find()
        .then(function (devices) {
            devices.forEach(function (item) {
                if (item.deviceName === 'USB Printing Support') {
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

/**
 * ipcMain listen for incoming request to pull data from Sqlite Database and response back
 *
 */
const api = require('./database')(db, dbFile);
const controller = require('./controller')(api);

ipcMain.on(channels.LOGIN, controller.verifyCredential);
ipcMain.on(channels.ADD, controller.addNewMember);
ipcMain.on(channels.FIND, controller.findMembership);
ipcMain.on(channels.SHOW_BACKUP_DIALOG, controller.backupDatabase);
ipcMain.on(channels.BUY, controller.buyWater);
ipcMain.on(channels.RENEW, controller.renewMembership);
ipcMain.on(channels.EDIT, controller.editMembershipInfo);
ipcMain.on(channels.HISTORY, controller.getMembershipHistory);
ipcMain.on(channels.TOTAL, controller.getTotalAccountInvoices);
ipcMain.on(channels.LAST_RECORD, controller.getLastRecord);
ipcMain.on(channels.TOTAL_FEE, controller.getTotalFee);

// GET TOTAL RENEW FEE
// ipcMain.on(channels.TOTAL_FEE, (event, arg) => {
//     totalFee(db, arg, (total) => {
//         event.sender.send(channels.TOTAL_FEE, { totalRenewalFee: total });
//     });
// });

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

// Delete Account
ipcMain.on(channels.DELETE_ACCOUNT, (event, args) => {
    deleteAccount(db, args, (err, result) => {
        if (err) {
            event.sender.send(channels.DELETE_ACCOUNT, { delete: false });
        }
        event.sender.send(channels.DELETE_ACCOUNT, {
            delete: true,
            result: result,
        });
    });
});

// Get User Account
ipcMain.on(channels.GET_USERS, (event, args) => {
    getAllUsers(db, args, (err, result) => {
        event.sender.send(channels.GET_USERS, result);
    });
});

// Add New User
ipcMain.on(channels.ADD_USER, (event, args) => {
    addUser(db, args, (err, result) => {
        event.sender.send(channels.ADD_USER, result);
    });
});

// Delete User
ipcMain.on(channels.DELETE_USER, (event, args) => {
    deleteUser(db, args, (err, result) => {
        event.sender.send(channels.DELETE_USER, result);
    });
});

// Edit User
ipcMain.on(channels.EDIT_USER, (event, args) => {
    editUser(db, args, (err, result) => {
        event.sender.send(channels.EDIT_USER, result);
    });
});
