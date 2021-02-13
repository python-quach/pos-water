const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { channels } = require('../src/shared/constants');
const sqlite3 = require('sqlite3');
const userData = app.getPath('userData');
const dbFile = path.resolve(userData, 'membership.sqlite3');
const usbDetect = require('usb-detection');

let mainWindow;
let db;

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

// ESC-POS PRINTER SETUP
let escpos = require('escpos');
escpos.USB = require('escpos-usb');
const options = { encoding: 'GB18030' /* default */ };

let device;
let printer;

usbDetect.startMonitoring();
usbDetect
    .find()
    .then(function (devices) {
        console.log(devices);
        devices.forEach(function (item) {
            if (item.deviceName === 'USB Printing Support') {
                device = new escpos.USB();
                printer = new escpos.Printer(device, options);
            }
        });
    })
    .catch(function (err) {
        console.log(err);
        device = null;
        printer = null;
    });

usbDetect.on('remove', function (device) {
    console.log('remove', device);
    app.quit();
});

// app.whenReady().then(() => {
//     const startUrl = devHTMLFile || productionHTMLFile;
//     const displays = screen.getAllDisplays();
//     const externalDisplay = displays.find((display) => {
//         return display.bounds.x !== 0 || display.bounds.y !== 0;
//     });

//     if (externalDisplay) {
//         mainWindow = new BrowserWindow({
//             frame: false,
//             x:
//                 externalDisplay.bounds.x +
//                 (externalDisplay.bounds.width - 800) / 2,
//             y:
//                 externalDisplay.bounds.y +
//                 (externalDisplay.bounds.height - 600) / 2,
//             webPreferences: {
//                 preload: path.join(__dirname, 'preload.js'),
//             },
//         });
//         mainWindow.loadURL(startUrl);
//     } else {
//         createWindow();
//     }

//     mainWindow.on('closed', function () {
//         mainWindow = null;
//     });
// });

function createWindow() {
    const startUrl = devHTMLFile || productionHTMLFile;
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        // frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.removeMenu();
    mainWindow.loadURL(startUrl);
    mainWindow.on('closed', function () {
        usbDetect.stopMonitoring();
        mainWindow = null;
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

// Listen for incoming request from ipcRenderer aka REACT FrontEND

// ADD NEW MEMBERSHIP
ipcMain.on(channels.ADD, (event, arg) => {
    console.log('Add', { arg });
    const sql_findDuplicateAccount = `SELECT * FROM test WHERE field22 = ?`;
    const sql_addNewAccount = `INSERT INTO test (
		            field20,
                    field22,
                    field1,
                    field2,
                    field4,
                    field5,
                    field6,
                    field7,
                    field8,
                    field10,
                    field31,
                    field28,
                    field19,
                    field12,
                    field9,
                    field15,
                    field32 
		        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;
    const sql_lastRecord = `SELECT * FROM test WHERE rowid = ?`;

    const {
        record_id,
        account,
        firstName,
        lastName,
        fullname,
        areaCode,
        threeDigit,
        fourDigit,
        phone,
        memberSince,
        prev,
        renew,
        buy,
        remain,
        fee,
        invoiceDate,
        invoiceTime,
    } = arg;

    const data = [
        record_id,
        account,
        firstName,
        lastName,
        fullname,
        areaCode,
        threeDigit,
        fourDigit,
        phone,
        memberSince,
        prev,
        renew,
        buy,
        remain,
        fee,
        invoiceDate,
        invoiceTime,
    ];

    db.get(sql_findDuplicateAccount, account, (err, duplicate) => {
        if (!duplicate) {
            db.run(sql_addNewAccount, data, function (err) {
                if (err) return console.log('add', err.message);
                // console.log('ADD:', this.lastID);
                db.get(sql_lastRecord, this.lastID, (err, row) => {
                    if (err) return console.log('last', err.message);
                    console.log(
                        `A row has been inserted with rowid ${this.lastID}: record ${row.field20}`
                    );

                    const data = {
                        renewFee: `Membership Fee: $${row.field9}`,
                        fullname: `${row.field4} -- ${row.field7}`,
                        gallonLeft: `Gallon Total  : ${row.field31}`,
                        blank: '',
                        last: this.lastID,
                        newMembership: row.field22,
                        time: `${row.field15}  ${row.field32}`,
                    };

                    const account = `[Account#: ${row.field22}]`;
                    const message = `Thank You                ${account}`;

                    if (device) {
                        device.open(function (error) {
                            if (error) {
                                return console.log(error.message);
                            }

                            printer
                                .font('a')
                                .align('lt')
                                .text(data.blank)
                                .text(data.fullname)
                                .text(`NEW MEMBERSHIP`)
                                .text(data.renewFee)
                                .text(data.gallonLeft)
                                .text(data.time)
                                .text(data.blank)
                                .text(message)
                                .text('Mckee Pure Water')
                                .text('(408) 729-1319')
                                .text(data.blank)
                                .cut()
                                .close();
                        });
                    }

                    event.sender.send(channels.ADD, row);
                });
            });
        } else {
            event.sender.send(channels.ADD, {
                error: `${account} already existed, Please use another account`,
            });
        }
    });
});

// LOGIN USER
ipcMain.on(channels.LOGIN, (event, { username, password }) => {
    // console.log('login', { username, password });
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ? ';
    db.get(sql, [username, password], (err, row) => {
        if (err) return console.log(err.message);
        // console.log({ row });
        event.sender.send(channels.LOGIN, { login: row });
    });
});

// FIND MEMBERSHIP
ipcMain.on(channels.FIND, (event, { phone, account, firstName, lastName }) => {
    console.log('find', { phone, account, firstName, lastName });

    const sql_selectPhone = ` SELECT DISTINCT field22 account FROM test WHERE field8 = ?`;
    const sql_getLastAccountRecord = `SELECT 
	field20 record_id,
	field22 account,
	field1 firstName,
	field2 lastName,
	field4 fullname,
	field5 areaCode,
	field6 threeDigit,
	field7 fourDigit,
	field8 phone,
	field10 memberSince,
	field28 renew,
	field31 prev,
	field19 buy,
	field12 remain,
	field9 fee,
	field15 invoiceDate,
	field32 invoiceTime  
FROM 
	test 
WHERE 
	field22 = ? 
ORDER BY 
	field20 
DESC LIMIT 1`;

    const sql_find = `SELECT * FROM
            ( SELECT DISTINCT
    		    field22 account,
    		    field1 firstName,
    		    field2 lastName,
    		    field4 fullname,
    		    field8 phone
            FROM test 
                WHERE
    		        fullname like ?
    		        ORDER BY
    		    fullname
            ) 
        WHERE 
            account IS NOT NULL 
			AND phone IS NOT NULL`;
    const sql_phone = `SELECT * FROM
            ( SELECT DISTINCT
    		    field22 account,
    		    field1 firstName,
    		    field2 lastName,
    		    field4 fullname,
                field5 areaCode,
    		    field8 phone
            FROM test 
                WHERE
                    phone = ?
    		        ORDER BY
    		    fullname
            ) 
        WHERE 
            account IS NOT NULL 
			AND phone IS NOT NULL`;

    const fullname = firstName + '%' + lastName;

    if (phone) {
        db.all(sql_selectPhone, phone, (err, rows) => {
            if (err) return console.log(err.message);
            console.log(rows);
            if (rows.length === 1) {
                db.get(sql_getLastAccountRecord, rows.account, (err, row) => {
                    if (err) return console.log(err.message);
                    console.log(row);
                    event.sender.send(channels.FIND, { membership: row });
                });
            } else {
                db.all(sql_phone, phone, (err, rows) => {
                    console.log(rows);
                    if (rows.length === 1) {
                        const account = rows[0].account;
                        db.get(
                            sql_getLastAccountRecord,
                            account,
                            (err, data) => {
                                console.log(data);
                                event.sender.send(channels.FIND, {
                                    membership: data,
                                });
                            }
                        );
                    } else if (rows.length > 1) {
                        event.sender.send(channels.FIND, { memberships: rows });
                    } else {
                        event.sender.send(channels.FIND, { membership: null });
                    }
                });
            }
        });
    } else if (account) {
        db.get(sql_getLastAccountRecord, account, (err, row) => {
            if (err) return console.log(err.message);
            console.log(row);
            if (row) {
                event.sender.send(channels.FIND, { membership: row });
            } else {
                event.sender.send(channels.FIND, { membership: null });
            }
        });
    } else {
        console.log(fullname);
        db.all(sql_find, fullname, (err, rows) => {
            console.log(rows);
            if (rows.length === 1) {
                const account = rows[0].account;
                db.get(sql_getLastAccountRecord, account, (err, data) => {
                    console.log(data);
                    event.sender.send(channels.FIND, { membership: data });
                });
            } else if (rows.length > 1) {
                event.sender.send(channels.FIND, { memberships: rows });
            } else {
                event.sender.send(channels.FIND, { membership: null });
            }
        });
    }
});

// BUY
ipcMain.on(channels.BUY, (event, arg) => {
    // console.log('buy', arg);
    const {
        record_id,
        account,
        firstName,
        lastName,
        fullname,
        areaCode,
        threeDigit,
        fourDigit,
        phone,
        memberSince,
        prev,
        buy,
        remain,
        fee,
        renew,
        invoiceDate,
        invoiceTime,
    } = arg;

    const data = [
        record_id,
        account,
        firstName,
        lastName,
        fullname,
        areaCode,
        threeDigit,
        fourDigit,
        phone,
        memberSince,
        prev,
        buy,
        remain,
        fee,
        renew,
        invoiceDate,
        invoiceTime,
    ];

    const sql = `INSERT INTO test(
  	field20,
	field22,
	field1,
	field2,
	field4,
	field5,
	field6,
	field7,
	field8,
	field10,
	field31,
	field19,
	field12,
	field9,
	field28,
	field15,
	field32 

        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const sql_lastRecord = `SELECT 
    rowid,
    field20 record_id,
	field22 account,
	field1 firstName,
	field2 lastName,
	field4 fullname,
	field5 areaCode,
	field6 threeDigit,
	field7 fourDigit,
	field8 phone,
	field10 memberSince,
	field31 prev,
	field19 buy,
	field12 remain,
	field9 fee,
	field28 renew,
	field15 invoiceDate,
    field32 invoiceTime FROM test WHERE rowid = ? `;

    db.run(sql, data, function (err) {
        if (err) return console.log(err.message);
        db.get(sql_lastRecord, this.lastID, (err, row) => {
            if (err) return console.log(err.message);
            console.log(row);
            console.log(`BUY: ${this.lastID}: record: ${row.record_id}`);

            const fullname = `${row.fullname} -- ${row.fourDigit}`;
            const prevGallon = `Gallon Prev: ${row.prev}`;
            const gallonBuy = `Gallon Buy : ${row.buy}`;
            const blank = '';
            const gallonLeft = `Gallon Left: ${row.remain}`;
            const account = `[Account#: ${row.account}]`;
            const message = `Thank You                ${account}`;

            if (device) {
                device.open(function (error) {
                    if (error) return console.log(error.message);
                    printer
                        .font('a')
                        .align('lt')
                        .text(fullname.trim())
                        .text(prevGallon)
                        .text(gallonBuy)
                        .text(gallonLeft)
                        .text(row.invoiceTime + ' ' + row.invoiceTime)
                        .text(blank)
                        .text(message)
                        .text('Mckee Pure Water')
                        .text('(408) 729-1319')
                        .text(blank)
                        .cut()
                        .close();
                });
            }
            event.sender.send(channels.BUY, { row });
        });
    });
});
// RENEW
ipcMain.on(channels.RENEW, (event, arg) => {
    // console.log('RENEW', arg);
    const {
        record_id,
        account,
        firstName,
        lastName,
        fullname,
        areaCode,
        threeDigit,
        fourDigit,
        phone,
        memberSince,
        prev,
        buy,
        remain,
        fee,
        renew,
        invoiceDate,
        invoiceTime,
    } = arg;

    const data = [
        record_id,
        account,
        firstName,
        lastName,
        fullname,
        areaCode,
        threeDigit,
        fourDigit,
        phone,
        memberSince,
        prev,
        buy,
        remain,
        fee,
        renew,
        invoiceDate,
        invoiceTime,
    ];

    const sql = `INSERT INTO test(
  	field20,
	field22,
	field1,
	field2,
	field4,
	field5,
	field6,
	field7,
	field8,
	field10,
	field31,
	field19,
	field12,
	field9,
	field28,
	field15,
	field32 
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const sql_lastRecord = `SELECT 
    rowid,
    field20 record_id,
	field22 account,
	field1 firstName,
	field2 lastName,
	field4 fullname,
	field5 areaCode,
	field6 threeDigit,
	field7 fourDigit,
	field8 phone,
	field10 memberSince,
	field31 prev,
	field19 buy,
	field12 remain,
	field9 fee,
	field28 renew,
	field15 invoiceDate,
    field32 invoiceTime FROM test WHERE rowid = ? `;

    db.run(sql, data, function (err) {
        if (err) return console.log(err.message);
        db.get(sql_lastRecord, this.lastID, (err, row) => {
            if (err) return console.log(err.message);
            console.log(`RENEW: ${this.lastID} record: ${row.record_id}`);

            const renewGallon = `Gallon Renew: ${row.renew}`;
            const renewFee = `Renew Fee   : $${row.fee}`;
            const fullname = `${row.fullname} -- ${row.fourDigit}`;
            const account = `[Account#: ${row.account}]`;
            const totalGallon = `Gallon Left : ${row.remain}`;
            const message = `Thank You                ${account}`;
            const blank = '';

            if (device) {
                device.open(function (error) {
                    if (error) return console.log(error.message);
                    printer
                        .font('a')
                        .align('lt')
                        .text(blank)
                        .text(fullname.trim())
                        .text(renewFee)
                        .text(`Gallon Prev : ${row.prev}`)
                        .text(renewGallon)
                        .text(totalGallon)
                        .text(row.invoiceDate + ' ' + row.invoiceTime)
                        .text(blank)
                        .text(message)
                        .text('Mckee Pure Water')
                        .text('(408) 729-1319')
                        .text(blank)
                        .cut()
                        .close();
                });
            }

            event.sender.send(channels.RENEW, { row });
        });
    });
});

// EDIT
ipcMain.on(
    channels.EDIT,
    (event, { firstName, lastName, fullname, areaCode, phone, account }) => {
        const newPhone = phone.replace(/[^\d+]/g, '');
        const threeDigit = newPhone.slice(0, 3);
        const fourDigit = newPhone.slice(3, 7);

        const sql = `UPDATE
                   test 
                SET
                    field5 = ?,
                    field8 = ?,
                    field1 = ?,
                    field2 = ?,
                    field4 = ?,
                    field6 = ?,
                    field7 = ?
                WHERE field22 = ?`;

        const data = [
            areaCode,
            phone,
            firstName,
            lastName,
            fullname,
            threeDigit,
            fourDigit,
            account,
        ];

        const sql_getLastAccountRecord = `SELECT   
        field20 record_id,
	    field22 account,
	    field1 firstName,
	    field2 lastName,
	    field4 fullname,
	    field5 areaCode,
	    field6 threeDigit,
	    field7 fourDigit,
	    field8 phone,
	    field10 memberSince,
	    field31 prev,
	    field19 buy,
	    field12 remain,
	    field9 fee,
	    field28 renew,
	    field15 invoiceDate,
        field32 invoiceTime 
    FROM 
    test
    WHERE 
        account = ? ORDER BY record_id DESC LIMIT 1 `;

        // console.log({ data });

        db.run(sql, data, function (err) {
            if (err) return console.log(err.message);

            db.get(
                sql_getLastAccountRecord,
                account,
                (err, lastAccountRecord) => {
                    if (err) return console.log(err.message);
                    event.sender.send(channels.EDIT, lastAccountRecord);
                }
            );
        });
    }
);
// HISTORY
ipcMain.on(channels.HISTORY, (event, arg) => {
    const { account, limit, offset } = arg;
    // console.log('HISTORY:', { account, limit, offset });

    const sql = `SELECT   
                    field20 record_id,
                    field22 account,
                    field1 firstName,
                    field2 lastName,
                    field4 fullname,
                    field5 areaCode,
                    field6 threeDigit,
                    field7 fourDigit,
                    field8 phone,
                    field10 memberSince,
                    field31 prev,
                    field19 buy,
                    field12 remain,
                    field9 fee,
                    field28 renew,
                    field15 invoiceDate,
                    field32 invoiceTime  
                FROM test WHERE field22 = ? ORDER BY field20 DESC LIMIT ? OFFSET ?`;

    db.all(sql, [account, limit, offset], (err, rows) => {
        if (err) return console.log(err.message);
        event.sender.send(channels.HISTORY, rows);
    });
});

// Total Invoices
ipcMain.on(channels.TOTAL, (event, arg) => {
    const { account } = arg;
    // console.log('TOTAL:', { account });
    const sql = `SELECT COUNT(*) as count FROM test WHERE field22 = ?`;
    db.get(sql, account, (err, count) => {
        if (err) return console.log(err.message);
        event.sender.send(channels.TOTAL, count.count);
    });
});

// Get last Record
ipcMain.on(channels.LAST_RECORD, (event, arg) => {
    // console.log('LAST RECORD');
    const sql = `SELECT field20 record_id FROM test ORDER BY record_id DESC LIMIT 1`;
    db.get(sql, (err, row) => {
        const { record_id } = row;
        // console.log(record_id + 1);
        event.sender.send(channels.LAST_RECORD, {
            record_id: record_id + 1,
        });
    });
});

// GET TOTAL RENEW FEE
ipcMain.on(channels.TOTAL_FEE, (event, request) => {
    const { account } = request;

    const totalFee = `SELECT SUM(fees) totalRenewalFee FROM
(SELECT 
	field19 buyGallon,
	field28 renewAmount,
	field31 currentGallon,
	field9 fees
FROM 
test
WHERE field22 = ?)
WHERE buyGallon = 0 OR buyGallon IS NULL`;

    db.get(totalFee, account, (err, row) => {
        if (err) {
            ipcMain.removeAllListeners(channels.TOTAL_FEE);
            return console.log(err.message);
        }

        const { totalRenewalFee } = row;
        event.sender.send(channels.TOTAL_FEE, { totalRenewalFee });
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
