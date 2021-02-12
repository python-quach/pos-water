// const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { channels } = require('../src/shared/constants');
const sqlite3 = require('sqlite3');
const userData = app.getPath('userData');
const dbFile = path.resolve(userData, 'membership.sqlite3');

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

    // mainWindow.removeMenu();
    mainWindow.loadURL(startUrl);
    mainWindow.on('closed', function () {
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

ipcMain.on(channels.ADD, (event, arg) => {
    console.log('Add', { arg });
    const sql_findDuplicateAccount = `SELECT * FROM mckee WHERE field22 = ?`;
    const sql_addNewAccount = `INSERT INTO mckee (
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
    const sql_lastRecord = `SELECT * FROM mckee WHERE rowid = ?`;
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
                console.log('last', this.lastID);
                db.get(sql_lastRecord, this.lastID, (err, row) => {
                    if (err) return console.log('last', err.message);
                    console.log(
                        `A row has been inserted with rowid ${this.lastID}`
                    );
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

ipcMain.on(channels.APP_INFO, (event, arg) => {
    console.log('receive app info message', { arg });
    db.all(`SELECT * FROM users`, (err, rows) => {
        if (err) return console.log(err.message);
        event.sender.send(channels.APP_INFO, {
            appName: app.getName(),
            appVersion: app.getVersion(),
            production: productionHTMLFile,
            development: devHTMLFile,
            userData,
            dbFile,
            rows,
        });
    });
});

// LOGIN USER
ipcMain.on(channels.LOGIN, (event, { username, password }) => {
    console.log('login', { username, password });
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ? ';
    db.get(sql, [username, password], (err, row) => {
        if (err) return console.log(err.message);

        console.log({ row });
        event.sender.send(channels.LOGIN, { login: row });
    });
});

// FIND MEMBERSHIP
ipcMain.on(channels.FIND, (event, { phone, account, firstName, lastName }) => {
    console.log('find', { phone, account, firstName, lastName });
    const fullname = phone || account ? '' : firstName + '%' + lastName;

    const sql_findOneAccount = `SELECT 	
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
	mckee 
WHERE 
	account = ?
ORDER BY record_id DESC LIMIT 1`;

    // const sql = `SELECT * FROM
    //                 ( SELECT
    // 					ROWID,
    //                     field20 record_id,
    //                     field22 account,
    //                     field1 firstName,
    //                     field2 lastName,
    //                     field4 fullname,
    //                     field5 areaCode,
    //                     field6 threeDigit,
    //                     field7 fourDigit,
    //                     field8 phone,
    //                     field10 memberSince,
    //                     field31 prev,
    //                     field19 buy,
    //                     field12 remain,
    //                     field9 fee,
    //                     field28 renew,
    //                     field15 invoiceDate,
    //                     field32 invoiceTime
    //                 FROM
    //                     mckee
    //                 WHERE
    // 		            phone = ?
    // 		            OR account =  ?
    // 		            OR fullname like ?
    // 		        ORDER BY
    // 		            fullname
    //                 )
    //             WHERE
    //                 account IS NOT NULL
    //                 AND phone IS NOT NULL
    // 			ORDER BY
    //                 ROWID DESC LIMIT  1`;

    const sql_find = `SELECT * FROM
            ( SELECT DISTINCT
    		    field22 account,
    		    field1 firstName,
    		    field2 lastName,
    		    field4 fullname,
    		    field8 phone
            FROM mckee
                WHERE
    		        phone = ?
    		        OR account =  ?
    		        OR fullname like ?
    		        ORDER BY
    		    fullname
            ) 
        WHERE 
            account IS NOT NULL 
			AND phone IS NOT NULL`;

    // const sql = `SELECT * FROM
    //                 ( SELECT
    // 					ROWID,
    //                     field20 record_id,
    //                     field22 account,
    //                     field1 firstName,
    //                     field2 lastName,
    //                     field4 fullname,
    //                     field5 areaCode,
    //                     field6 threeDigit,
    //                     field7 fourDigit,
    //                     field8 phone,
    //                     field10 memberSince,
    //                     field31 prev,
    //                     field19 buy,
    //                     field12 remain,
    //                     field9 fee,
    //                     field28 renew,
    //                     field15 invoiceDate,
    //                     field32 invoiceTime
    //                 FROM
    //                     mckee
    //                 WHERE
    // 		            phone = ?
    // 		            OR account =  ?
    // 		            OR fullname like ?
    // 		        ORDER BY
    // 		            fullname
    //                 )
    //             WHERE
    //                 account IS NOT NULL
    //                 AND phone IS NOT NULL
    // 			ORDER BY
    //                 ROWID DESC LIMIT  1`;

    // db.all(sql, [phone, account, fullname], (err, rows) => {
    db.all(sql_find, [phone, account, fullname], (err, rows) => {
        if (err) return console.log(err.message);
        console.log('number of record found:', rows.length);
        if (rows.length === 1) {
            db.get(sql_findOneAccount, account, (err, account) => {
                console.log(account);
                event.sender.send(channels.FIND, { membership: account });
            });
        } else if (rows.length > 1) {
            event.sender.send(channels.FIND, { memberships: rows });
        } else {
            event.sender.send(channels.FIND, { membership: null });
        }

        // if (rows === undefined || rows.length === 0) {
        //     event.sender.send(channels.FIND, {
        //         membership: null,
        //     });
        // } else {
        //     // console.log(rows);
        //     event.sender.send(channels.FIND, {
        //         membership: rows,
        //     });
        // }
    });
});

// BUY
ipcMain.on(channels.BUY, (event, arg) => {
    console.log('buy', arg);
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

    const sql = `INSERT INTO mckee (
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
    field32 invoiceTime FROM mckee WHERE rowid = ? `;

    db.run(sql, data, function (err) {
        if (err) return console.log(err.message);
        db.get(sql_lastRecord, this.lastID, (err, row) => {
            if (err) return console.log(err.message);
            console.log(`BUY: ${this.lastID}`);
            event.sender.send(channels.BUY, { row });
        });
    });
});
// RENEW
ipcMain.on(channels.RENEW, (event, arg) => {
    console.log('RENEW', arg);
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

    const sql = `INSERT INTO mckee (
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
    field32 invoiceTime FROM mckee WHERE rowid = ? `;

    db.run(sql, data, function (err) {
        if (err) return console.log(err.message);
        db.get(sql_lastRecord, this.lastID, (err, row) => {
            if (err) return console.log(err.message);
            console.log(`RENEW: ${this.lastID}`);
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
                    mckee
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
        mckee 
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
    console.log('HISTORY:', { account, limit, offset });
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
                FROM mckee WHERE field22 = ? ORDER BY field20 DESC LIMIT ? OFFSET ?`;
    db.all(sql, [account, limit, offset], (err, rows) => {
        if (err) return console.log(err.message);
        event.sender.send(channels.HISTORY, rows);
    });
});

// Total Invoices
ipcMain.on(channels.TOTAL, (event, arg) => {
    const { account } = arg;
    console.log('TOTAL:', { account });
    const sql = `SELECT COUNT(*) as count FROM mckee WHERE field22 = ?`;
    db.get(sql, account, (err, count) => {
        if (err) return console.log(err.message);
        event.sender.send(channels.TOTAL, count.count);
    });
});

// Get last Record
ipcMain.on(channels.LAST_RECORD, (event, arg) => {
    console.log('LAST RECORD');
    const sql = `SELECT field20 record_id FROM mckee ORDER BY record_id DESC LIMIT 1`;
    db.get(sql, (err, row) => {
        const { record_id } = row;
        console.log(record_id + 1);
        event.sender.send(channels.LAST_RECORD, {
            record_id: record_id + 1,
        });
    });
});
