const { sql, buyData, renewData, editData } = require('../query');
const { dialog } = require('electron');

module.exports = (db, dbFile) => {
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
            db.get(sql.login, [username, password], (err, user) =>
                err ? reject(err) : resolve(user)
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
                `SELECT DISTINCT account, since, first, last  FROM memberships WHERE phone = ?`,
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

    return {
        verifyLogin,
        getAccount,
        getFirstName,
        getLastName,
        getPhone,
        getBothName,
        getDailyReport,
    };
};
