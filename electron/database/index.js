// module.exports = (db, dbFile) => {
module.exports = (app) => {
    const { sql } = require('../query');
    const { dialog } = require('electron');
    const path = require('path');

    // Database Setting
    const sqlite3 = require('sqlite3');
    const userData = app.getPath('userData');
    const senterDbFile = path.resolve(userData, 'senter.sqlite3');

    const db = new sqlite3.Database(senterDbFile);

    /**
     * Validate User Login credential with username and password
     *
     * @param {Object} Object containing a username, and password.
     * @param {string} Object.username - The credential username.
     * @param {string} Object.password - The credential password.
     * @returns {Promise} A Promise object that resolve a user login query and reject a message if there
     * is any issue with the query
     *
     */
    const verifyLogin = ({ username, password }) =>
        new Promise((resolve, reject) =>
            db.get(sql.login, [username, password], (err, rowid) =>
                err ? reject(err) : resolve(rowid)
            )
        );

    /**
     * Find Membership by Account Number
     * @param {*} account
     * @returns
     */
    function getAccount(account) {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT * FROM memberships WHERE account = ? ORDER BY rowid  DESC LIMIT 1`,
                account,
                (err, lastAccountRecord) =>
                    err ? reject(err) : resolve(lastAccountRecord)
            );
        });
    }

    function lastAccountRecord(account) {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC LIMIT 1`,
                account,
                (err, row) => (err ? reject(err) : resolve(row))
            );
        });
    }

    function getFirstName(firstName) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT DISTINCT account, since, last, phone FROM memberships WHERE first = ?`,
                firstName,
                async (err, rows) => {
                    if (err) reject(err);
                    if (rows && rows.length === 1) {
                        try {
                            const account = await lastAccountRecord(
                                rows[0].account
                            );
                            resolve({ account });
                        } catch (err) {
                            reject(err);
                        }
                    } else if (rows && rows.length > 1) {
                        const accounts = [];
                        rows.forEach(async (row) => {
                            try {
                                const account = await lastAccountRecord(
                                    row.account
                                );
                                accounts.push(account);
                                if (accounts.length === rows.length) {
                                    resolve({ accounts });
                                }
                            } catch (err) {
                                reject(err);
                            }
                        });
                    } else {
                        resolve({ account: null });
                    }
                }
            );
        });
    }

    function getLastName(lastName) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT DISTINCT account, since, first, phone FROM memberships WHERE last = ?`,
                lastName,
                async (err, rows) => {
                    if (err) reject(err);
                    if (rows && rows.length === 1) {
                        try {
                            const account = await lastAccountRecord(
                                rows[0].account
                            );
                            resolve({ account });
                        } catch (err) {
                            reject(err);
                        }
                    } else if (rows && rows.length > 1) {
                        const accounts = [];
                        rows.forEach(async (row) => {
                            try {
                                const account = await lastAccountRecord(
                                    row.account
                                );
                                accounts.push(account);
                                if (accounts.length === rows.length) {
                                    resolve({ accounts });
                                }
                            } catch (err) {
                                reject(err);
                            }
                        });
                    } else {
                        resolve({ account: null });
                    }
                }
            );
        });
    }

    function getPhone(phone) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT DISTINCT account, since, first, last  FROM memberships WHERE phone = ? ORDER BY rowid`,
                phone,
                async (err, rows) => {
                    if (err) reject(err);
                    if (rows && rows.length === 1) {
                        try {
                            const account = await lastAccountRecord(
                                rows[0].account
                            );
                            resolve({ account });
                        } catch (err) {
                            reject(err);
                        }
                    } else if (rows && rows.length > 1) {
                        const accounts = [];
                        rows.forEach(async (row) => {
                            try {
                                const account = await lastAccountRecord(
                                    row.account
                                );
                                accounts.push(account);
                                if (accounts.length === rows.length) {
                                    resolve({ accounts });
                                }
                            } catch (err) {
                                reject(err);
                            }
                        });
                    } else {
                        resolve({ account: null });
                    }
                }
            );
        });
    }

    /**
     *
     * @param {*} param0
     * @returns
     */
    function getBothName({ first, last }) {
        console.log('getBothName', first, last);
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT DISTINCT account, since, phone FROM memberships WHERE first = ? and last = ?`,
                [first, last],
                async (err, rows) => {
                    if (err) reject(err);
                    if (rows && rows.length === 1) {
                        try {
                            const account = await lastAccountRecord(
                                rows[0].account
                            );
                            resolve({ account });
                        } catch (err) {
                            reject(err);
                        }
                    } else if (rows && rows.length > 1) {
                        const accounts = [];
                        rows.forEach(async (row) => {
                            try {
                                const account = await lastAccountRecord(
                                    row.account
                                );
                                accounts.push(account);
                                if (accounts.length === rows.length) {
                                    resolve({ accounts });
                                }
                            } catch (err) {
                                reject(err);
                            }
                        });
                    } else {
                        resolve({ account: null });
                    }
                }
            );
        });
    }

    /**
     *
     * @param {*} param0
     * @returns
     */
    function getDailyReport({ date, time }) {
        console.log(date, time);
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT SUM(gallon) totalNewGallon, SUM(fee) totalNewFee FROM memberships WHERE type= ? AND date= ?`,
                ['NEW', date],
                (err, { totalNewGallon, totalNewFee }) => {
                    if (err) reject(err);
                    db.get(
                        `SELECT SUM(gallon) totalRenewGallon, SUM(fee) totalRenewFee FROM memberships WHERE type= ? AND date= ?`,
                        ['RENEW', date],
                        (err, { totalRenewGallon, totalRenewFee }) => {
                            if (err) reject(err);
                            db.get(
                                `SELECT SUM(buy) totalBuy FROM memberships WHERE type= ? and date = ?`,
                                ['BUY', date],
                                (err, { totalBuy }) => {
                                    if (err) reject(err);
                                    const data = {
                                        totalNewFee: totalNewFee || 0,
                                        totalNewGallon: totalNewGallon || 0,
                                        totalRenewFee: totalRenewFee || 0,
                                        totalRenewGallon: totalRenewGallon || 0,
                                        totalBuy: totalBuy || 0,
                                        date,
                                        time,
                                    };
                                    resolve(data);
                                }
                            );
                        }
                    );
                }
            );
        });
    }

    /**
     * Insert New Membership
     */
    function insertMembership(data) {
        const account = data[0];
        const columns = [
            'account',
            'phone',
            'first',
            'last',
            'since',
            'fee',
            'gallon',
            'buy',
            'remain',
            'type',
            'date',
            'time',
            'previous',
        ];
        const findDuplicateAccount = `SELECT * FROM memberships WHERE account = ?`;
        const insert = `INSERT INTO memberships ( ${[...columns]} ) VALUES(${[
            ...columns.map(() => '?'),
        ]})`;
        const lastRecord = `SELECT * FROM memberships WHERE rowid = ?`;

        return new Promise((resolve, reject) => {
            db.get(findDuplicateAccount, account, (err, row) => {
                if (err) reject(err);
                if (!row) {
                    db.run(insert, data, function (err) {
                        if (err) reject(err);
                        db.get(lastRecord, this.lastID, (err, row) =>
                            err ? reject(err) : resolve(row)
                        );
                    });
                } else {
                    resolve({
                        error: `Account ${row.account} already existed`,
                        data,
                    });
                }
            });
        });
    }

    /**
     *
     */
    function insertBuy(data) {
        const insertBuy = `
        INSERT INTO memberships ( 
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
        ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const lastBuyRecord = `
        SELECT
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
            time, previous  FROM memberships WHERE rowid = ?`;

        return new Promise((resolve, reject) => {
            db.run(insertBuy, data, function (err) {
                if (err) reject(err);
                db.get(lastBuyRecord, this.lastID, (err, row) =>
                    err ? reject(err) : resolve(row)
                );
            });
        });
    }

    function getHistory(account) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM memberships WHERE account = ?`,
                account,
                (err, rows) => (err ? reject(err) : resolve(rows))
            );
        });
    }

    function getDbFile() {
        const currentdate = new Date().toLocaleDateString();

        return new Promise((resolve, reject) => {
            dialog
                .showSaveDialog({
                    properties: ['openFile', 'multiSelections'],
                    defaultPath: `senter.sqlite3`,
                    filters: [{ name: 'Sqlite3', extensions: ['sqlite3'] }],
                })
                .then((result) => {
                    if (result.filePath) {
                        resolve({
                            dbFile: senterDbFile,
                            filePath: result.filePath,
                            open: `${currentdate.trim()}`,
                        });
                    } else {
                        // resolve({ open: false });
                        resolve({ open: 'Backup' });
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    function edit(data) {
        console.log(data);
        const account = data[3];
        const original = data[4];
        return new Promise((resolve, reject) => {
            if (account !== original) {
                const findDuplicateAccount = `SELECT * FROM memberships WHERE account = ?`;
                db.get(findDuplicateAccount, account, (err, row) => {
                    if (err) reject(err);
                    if (!row) {
                        db.run(
                            `UPDATE memberships SET first = ?, last = ?, phone = ?, account = ?  WHERE account = ?`,
                            data,
                            function (err) {
                                if (err) reject(err);
                                db.all(
                                    `SELECT * FROM memberships WHERE account = ?`,
                                    account,
                                    (err, rows) =>
                                        err ? reject(err) : resolve(rows)
                                );
                            }
                        );
                    } else {
                        resolve({
                            error: `Account ${row.account} already existed`,
                            data,
                        });
                    }
                });
            } else {
                const newArray = data.slice(0, 4);
                console.log(newArray);
                db.run(
                    `UPDATE memberships SET first = ?, last = ?, phone = ? WHERE account = ?`,
                    newArray,
                    function (err) {
                        if (err) reject(err);
                        db.all(
                            `SELECT * FROM memberships WHERE account = ?`,
                            account,
                            (err, rows) => (err ? reject(err) : resolve(rows))
                        );
                    }
                );
            }
        });
    }

    // function edit(data) {
    //     console.log(data);
    //     const account = data[3];
    //     return new Promise((resolve, reject) => {
    //         db.run(
    //             `UPDATE memberships SET first = ?, last = ?, phone = ? WHERE account = ?`,
    //             data,
    //             function (err) {
    //                 if (err) reject(err);
    //                 db.all(
    //                     `SELECT * FROM memberships WHERE account = ?`,
    //                     account,
    //                     (err, rows) => (err ? reject(err) : resolve(rows))
    //                 );
    //             }
    //         );
    //     });
    // }

    function remove(account, password) {
        return new Promise((resolve, reject) => {
            if (password === '911') {
                db.run(
                    `DELETE FROM memberships WHERE account = ?`,
                    account,
                    function (err) {
                        if (err) reject(err);
                        resolve({
                            auth: true,
                            status: this.changes,
                        });
                    }
                );
            } else {
                resolve({
                    auth: false,
                    status: null,
                });
            }
        });
    }

    return {
        verifyLogin,
        getAccount,
        getFirstName,
        getLastName,
        getPhone,
        getBothName,
        getDailyReport,
        insertMembership,
        insertBuy,
        getHistory,
        getDbFile,
        edit,
        remove,
    };
};
