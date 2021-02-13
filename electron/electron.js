const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { channels } = require('../src/shared/constants');
const sqlite3 = require('sqlite3');
const userData = app.getPath('userData');
const dbFile = path.resolve(userData, 'membership.sqlite3');
const {
    printAddReceipt,
    printBuyReceipt,
    printRenewReceipt,
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

function createWindow() {
    const startUrl = devHTMLFile || productionHTMLFile;
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
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
ipcMain.on(channels.TOTAL_RENEW, (event, request) => {
    const { account } = request;

    const totalRenew = `SELECT * FROM
(SELECT 
	field19 ,
	field28 ,
	field31,
	field9 
FROM 
test
WHERE field22 = ?)
WHERE field19 = 0 OR field19 IS NULL`;

    db.all(totalRenew, account, (err, row) => {
        if (err) {
            ipcMain.removeAllListeners(channels.TOTAL_RENEW);
            return console.log(err.message);
        }
        let sum = 0;
        row.forEach((data) => {
            if (parseInt(data.field19) === 0 && data.field28 === null) {
                sum = sum + parseInt(data.field31);
            } else {
                if (data.field28 !== null) {
                    sum = sum + parseInt(data.field28);
                }
            }
        });

        event.sender.send(channels.TOTAL_RENEW, {
            totalRenewalGallon: sum,
        });
    });
});

// GET TOTAL BUY GALLON
ipcMain.on(channels.TOTAL_BUY, (event, request) => {
    const { account } = request;
    const totalBuy = `SELECT SUM(field19) totalBuyGallon FROM
(SELECT 
	field19 ,
	field28 ,
	field31,
	field9 
FROM 
test
WHERE field22 = ?)`;

    db.get(totalBuy, account, (err, row) => {
        if (err) {
            ipcMain.removeAllListeners(channels.TOTAL_BUY);
            return console.log(err.message);
        }
        const { totalBuyGallon } = row;
        event.sender.send(channels.TOTAL_BUY, {
            totalBuyGallon,
        });
    });
});

// Daily Report
ipcMain.on(channels.REPORT, (event, request) => {
    const { date, time } = request;

    const reportRenew = `SELECT SUM(renewAmount) totalRenewAmount, SUM(fee) totalFee FROM 
                          (SELECT ROWID record_id,
	field20 invoice_id,
	field22 account,
	field15 purchaseDate,
	field32 purchaseTime,
	field10 memberSince,
	field1 firstName,
	field2 lastName,
	field4 fullname,
	field5 areaCode,
	field6 threeDigit,
	field7 fourDigit,
	field8 phone,
	field31 currentGallon,
	field19 buyGallon,
	field12 remainGallon,
	field28 renewAmount,
	field9 fee,
	field30 clerk
FROM 
	test 
WHERE field15 = ?) 
WHERE buyGallon IS NULL OR buyGallon = '0'`;
    const reportBuy = `SELECT SUM(buyGallon) totalBuy FROM 
(SELECT 
	ROWID record_id,
	field20 invoice_id,
	field22 account,
	field15 purchaseDate,
	field32 purchaseTime,
	field10 memberSince,
	field1 firstName,
	field2 lastName,
	field4 fullname,
	field5 areaCode,
	field6 threeDigit,
	field7 fourDigit,
	field8 phone,
	field31 currentGallon,
	field19 buyGallon,
	field12 remainGallon,
	field28 renewAmount,
	field9 fee,
	field30 clerk
FROM 
	test 
WHERE field15 = ?) 
WHERE buyGallon IS NOT NULL OR buyGallon = '0'`;

    const reportNew = `SELECT SUM(remainGallon) totalNew FROM 
(SELECT 
	ROWID record_id,
	field20 invoice_id,
	field22 account,
	field15 purchaseDate,
	field32 purchaseTime,
	field10 memberSince,
	field1 firstName,
	field2 lastName,
	field4 fullname,
	field5 areaCode,
	field6 threeDigit,
	field7 fourDigit,
	field8 phone,
	field31 currentGallon,
	field19 buyGallon,
	field12 remainGallon,
	field28 renewAmount,
	field9 fee,
	field30 clerk
FROM 
	test 
WHERE field15 = ?) 
WHERE renewAmount IS  NULL AND buyGallon = '0'`;

    console.log('daily report', { date });
    db.get(reportRenew, date, (err, row) => {
        if (err) return console.log(err.message);
        const { totalFee, totalRenewAmount } = row;

        db.get(reportNew, date, (err, row) => {
            const { totalNew } = row;
            db.get(reportBuy, date, (err, row) => {
                if (err) return console.log(err.message);
                const { totalBuy } = row;

                const test = totalNew || 0;
                const test2 = totalRenewAmount || 0;
                const data = test + test2;

                const totalRenewFee = `Total Fee  : $${totalFee || 0}`;
                // const totalRenew = `Total Renew: ${totalRenewAmount || 0}`;
                const totalRenew = `Total Renew: ${data}`;
                const totalBuyAmount = `Total Buy  : ${totalBuy || 0}`;
                if (device) {
                    device.open(function (error) {
                        if (error) return console.log(error.message);
                        printer
                            .font('a')
                            .align('lt')
                            .text('Mckee Pure Water')
                            .text(`Daily Report`)
                            .text(`${date} - ${time}`)
                            .text(totalRenewFee)
                            .text(totalRenew)
                            .text(totalBuyAmount)
                            .text('')
                            .text('')
                            .cut()
                            .close();

                        event.sender.send(channels.REPORT, {
                            totalFee,
                            totalRenewAmount,
                            totalBuy,
                            totalNew,
                        });
                    });
                } else {
                    event.sender.send(channels.REPORT, {
                        totalFee,
                        totalRenewAmount,
                        totalBuy,
                        totalNew,
                    });
                }
            });
        });
    });
});
