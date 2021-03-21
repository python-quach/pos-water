/* eslint-disable no-unused-expressions */
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { channels } = require('../src/shared/constants');
const sqlite3 = require('sqlite3');
const userData = app.getPath('userData');
const dbFile = path.resolve(userData, 'membership.sqlite3');
const senterDbFile = path.resolve(userData, 'senter.sqlite3');
const usbDetect = require('usb-detection');
const { addNewAccount, findAccount, lastRecord, add } = require('./sql');
const {
    printReceipt,
    printAddReceipt,
    printBuyReceipt,
    printRenewReceipt,
    printDailyReport,
    printSenterDailyReport,
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
    deleteAccount,
    getAllUsers,
    addUser,
    deleteUser,
    editUser,
    report,
} = require('./db');

// ELECTRON MAIN WINDOW
let mainWindow;

// SQLITE DATABASE
let db;
let dbSenter;

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
dbSenter = new sqlite3.Database(senterDbFile);
console.log(dbSenter, senterDbFile);

// FIND ACCOUNT
ipcMain.on(channels.SENTER_FIND_ACCOUNT, (event, account) => {
    console.log('SENTER_FIND_ACCOUNT:', account);
    dbSenter.get(
        `SELECT * FROM memberships WHERE account = ? ORDER BY rowid  DESC LIMIT 1`,
        account,
        (err, lastAccountRecord) => {
            if (err) {
                console.log(err.message);
                event.sender.send(channels.SENTER_FIND_ACCOUNT, { error: err });
            } else {
                console.log('LAST ACCOUNT RECORD', lastAccountRecord);
                event.sender.send(
                    channels.SENTER_FIND_ACCOUNT,
                    lastAccountRecord
                );
            }
        }
    );
});

// FIND FIRST NAME
ipcMain.on(channels.SENTER_FIND_FIRST_NAME, (event, firstName) => {
    console.log(`SENTER_FIND_FIRST_NAME`, firstName);

    dbSenter.all(
        `SELECT DISTINCT account, since, last, phone  FROM memberships WHERE first = ?`,
        firstName,
        async (err, rows) => {
            if (err) {
                console.log(err.message);
                event.sender.send(channels.SENTER_FIND_FIRST_NAME, {
                    error: err.message,
                });
            } else if (rows && rows.length === 1) {
                // Find only one match
                dbSenter.get(
                    `SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC LIMIT 1`,
                    rows[0].account,
                    (err, row) => {
                        if (err) {
                            console.log(err.message);
                            event.sender.send(channels.SENTER_FIND_FIRST_NAME, {
                                error: err.message,
                            });
                        } else {
                            console.log(row);
                            event.sender.send(channels.SENTER_FIND_FIRST_NAME, {
                                account: row,
                            });
                        }
                    }
                );
            } else if (rows && rows.length > 1) {
                const test = [];
                rows.forEach((row) => {
                    dbSenter.get(
                        `SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC LIMIT 1`,
                        row.account,
                        (err, lastAccountRecord) => {
                            test.push(lastAccountRecord);
                            event.sender.send(channels.SENTER_FIND_FIRST_NAME, {
                                accounts: test,
                            });
                        }
                    );
                });
            } else {
                event.sender.send(channels.SENTER_FIND_FIRST_NAME, {
                    account: null,
                });
            }
        }
    );
});

// FIND LAST  NAME
ipcMain.on(channels.SENTER_FIND_LAST_NAME, (event, lastName) => {
    console.log(`SENTER_FIND_LAST_NAME`, lastName);

    dbSenter.all(
        `SELECT DISTINCT account, since, first, phone  FROM memberships WHERE last= ?`,
        lastName,
        async (err, rows) => {
            if (err) {
                console.log(err.message);
                event.sender.send(channels.SENTER_FIND_LAST_NAME, {
                    error: err.message,
                });
            } else if (rows && rows.length === 1) {
                dbSenter.get(
                    `SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC LIMIT 1`,
                    rows[0].account,
                    (err, row) => {
                        if (err) {
                            console.log(err.message);
                            event.sender.send(channels.SENTER_FIND_LAST_NAME, {
                                error: err.message,
                            });
                        } else {
                            console.log(row);
                            event.sender.send(channels.SENTER_FIND_LAST_NAME, {
                                account: row,
                            });
                        }
                    }
                );
            } else if (rows && rows.length > 1) {
                const test = [];
                rows.forEach((row) => {
                    dbSenter.get(
                        `SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC LIMIT 1`,
                        row.account,
                        (err, lastAccountRecord) => {
                            test.push(lastAccountRecord);
                            event.sender.send(channels.SENTER_FIND_LAST_NAME, {
                                accounts: test,
                            });
                        }
                    );
                });
            } else {
                event.sender.send(channels.SENTER_FIND_LAST_NAME, {
                    account: null,
                });
            }
        }
    );
});

// FIND MEMBER PHONE
ipcMain.on(channels.SENTER_FIND_PHONE, (event, phone) => {
    console.log('SENTER_FIND_PHONE: ', phone);

    // Check if there are same phone with different account
    dbSenter.all(
        `SELECT DISTINCT account, since, first, last  FROM memberships WHERE phone = ?`,
        phone,
        async (err, rows) => {
            // console.log(rows);
            if (err) {
                console.log(err.message);
                event.sender.send(channels.SENTER_FIND_PHONE, {
                    error: err.message,
                });
            } else if (rows && rows.length === 1) {
                console.log(rows);
                dbSenter.get(
                    `SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC LIMIT 1`,
                    rows[0].account,
                    (err, row) => {
                        if (err) {
                            console.log(err.message);
                            event.sender.send(channels.SENTER_FIND_PHONE, {
                                error: err.message,
                            });
                        } else {
                            console.log(row);
                            event.sender.send(channels.SENTER_FIND_PHONE, {
                                account: row,
                            });
                        }
                    }
                );
            } else if (rows && rows.length > 1) {
                const test = [];
                rows.forEach((row) => {
                    dbSenter.get(
                        `SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC LIMIT 1`,
                        row.account,
                        (err, lastAccountRecord) => {
                            test.push(lastAccountRecord);
                            event.sender.send(channels.SENTER_FIND_PHONE, {
                                accounts: test,
                            });
                        }
                    );
                });
                // event.sender.send(channels.SENTER_FIND_PHONE, {
                //     accounts: rows,
                // });
            } else {
                event.sender.send(channels.SENTER_FIND_PHONE, {
                    account: null,
                });
            }
        }
    );
});

// FIND MEMBER BOTH FIRST AND LAST
ipcMain.on(channels.SENTER_FIND_BOTH_NAME, (event, { first, last }) => {
    console.log(`FIND BOTH FIRST AND LAST`, first, last);
    dbSenter.all(
        `SELECT DISTINCT account, since, phone FROM memberships WHERE first = ? and last =?`[
            (first, last)
        ],
        (err, rows) => {
            if (err) {
                console.log(err.message);
                event.sender.send(channels.SENTER_FIND_BOTH_NAME, {
                    error: err.message,
                });
            } else if (rows && rows.length === 1) {
                console.log(rows);
                dbSenter.get(
                    `SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC LIMIT 1`,
                    rows[0].account,
                    (err, row) => {
                        if (err) {
                            console.log(err.message);
                            event.sender.send(channels.SENTER_FIND_BOTH_NAME, {
                                error: err.message,
                            });
                        } else {
                            console.log(row);
                            event.sender.send(channels.SENTER_FIND_BOTH_NAME, {
                                account: row,
                            });
                        }
                    }
                );
            } else if (rows && rows.length > 1) {
                const test = [];
                rows.forEach((row) => {
                    dbSenter.get(
                        `SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC LIMIT 1`,
                        row.account,
                        (err, lastAccountRecord) => {
                            test.push(lastAccountRecord);
                            event.sender.send(channels.SENTER_FIND_BOTH_NAME, {
                                accounts: test,
                            });
                        }
                    );
                });
            } else {
                event.sender.send(channels.SENTER_FIND_BOTH_NAME, {
                    account: null,
                });
            }
        }
    );
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
                fs.copyFile(dbFile, result.filePath, function (err) {
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

// ADD NEW MEMBERSHIP
ipcMain.on(channels.ADD, (event, arg) => {
    addMemberShip(db, arg, (duplicateAccount, data) => {
        if (duplicateAccount) {
            event.sender.send(channels.ADD, duplicateAccount);
        } else {
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
        event.sender.send(channels.BUY, data);
    });
});

// RENEW
ipcMain.on(channels.RENEW, (event, arg) => {
    renew(db, arg, (data) => {
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

// SENTER DAILY REPORT
ipcMain.on(channels.SENTER_REPORT, (event, arg) => {
    console.log('SENTER_REPORT', arg);
    report(dbSenter, arg, (data) => {
        console.log('Daily Report', data);
        if (device) {
            printSenterDailyReport(device, printer, data);
        } else {
            event.sender.send(channels.SENTER_REPORT, data);
        }
    });
});

// Close Application
ipcMain.on(channels.CLOSE_APP, (event, _) => {
    ipcMain.removeAllListeners(channels.CLOSE_APP);
    app.quit();
});

// BACK UP DATABASE
ipcMain.on(channels.SHOW_BACKUP_DIALOG, (event, request) => {
    const currentdate = new Date();
    const datetime =
        currentdate.getMonth() +
        1 +
        '-' +
        currentdate.getDate() +
        '-' +
        currentdate.getFullYear();

    dialog
        .showSaveDialog({
            properties: ['openFile', 'multiSelections'],
            defaultPath: `membership.sqlite3`,
            filters: [{ name: 'Sqlite3', extensions: ['sqlite3'] }],
        })
        .then((result) => {
            if (result.filePath) {
                fs.copyFile(dbFile, result.filePath, function (err) {
                    if (err) {
                        event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                            open: false,
                        });
                        throw err;
                    } else {
                        event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                            open: `backup-${datetime}.sqlite3`,
                        });
                    }
                });
            } else {
                event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                    open: false,
                });
            }
        })
        .catch((err) => {
            event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                open: false,
            });
        });
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
