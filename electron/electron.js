const { app, BrowserWindow, ipcMain, screen } = require('electron');
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

    const sql = `SELECT * FROM 
                    ( SELECT 
						ROWID,
    		            field22 account, 
						field20 record_id, 
						field15 invoiceDate, 
						field32 invoiceTime, 
						field1 firstName, 
						field2 lastName, 
					    field4 fullname,
						field5 areaCode, 
						field6 threeDigit, 
						field7 fourDigit,
						field8 phone,
						field9 fee,
						field10 memberSince, 
						field31 gallonCurrent, 
						field19 gallonBuy, 
						field12 gallonRemain, 
						field12 afterBuyGallonTotal, 
						field12 overGallon, 
						field28 lastRenewGallon, 
						field28 renew, 
						field9 renewFee 
                    FROM 
                        mckee
                    WHERE
    		            phone = ? 
    		            OR account =  ? 
    		            OR fullname like ? 
    		        ORDER BY
    		            fullname
                    ) 
                WHERE 
                    account IS NOT NULL 
                    AND phone IS NOT NULL
				ORDER BY
					ROWID DESC LIMIT  1`;

    // const sql = `SELECT * FROM
    //                 ( SELECT DISTINCT
    // 		            field22 account,
    // 		            field1 firstName,
    // 		            field2 lastName,
    // 		            field4 fullname,
    //                     field8 phone,
    //                     field10 memberSince
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
    //                 AND phone IS NOT NULL`;

    db.all(sql, [phone, account, fullname], (err, rows) => {
        if (err) return console.log(err.message);
        console.log(rows, rows.length);

        if (rows === undefined || rows.length === 0) {
            event.sender.send(channels.FIND, {
                membership: null,
            });
        } else {
            // if (rows.length === 1) {
            event.sender.send(channels.FIND, {
                membership: rows,
            });
            // } else {
            //     event.sender.send(channels.FIND, {
            //         membership: rows,
            //     });
            // }
        }
    });
});
