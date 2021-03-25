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

    const getBuyLastRecord = (lastId) =>
        new Promise((resolve, reject) => {
            db.get(sql.buy_lastRecord, lastId, (err, row) =>
                err ? reject(err) : resolve(row)
            );
        });

    const getRenewLastRecord = (lastId) =>
        new Promise((resolve, reject) => {
            db.get(sql.renew_lastRecord, lastId, (err, row) =>
                err ? reject(err) : resolve(row)
            );
        });

    const buy = (data) =>
        new Promise((resolve, reject) => {
            db.run(sql.buy, buyData(data), async function (err) {
                if (err) {
                    reject(err);
                } else {
                    try {
                        const record = await getBuyLastRecord(this.lastID);
                        resolve(record);
                    } catch (err) {
                        return console.log(err.message);
                    }
                }
            });
        });

    const renew = (data) =>
        new Promise((resolve, reject) => {
            db.run(sql.renew, renewData(data), async function (err) {
                if (err) {
                    reject(err);
                } else {
                    try {
                        const record = await getRenewLastRecord(this.lastID);
                        resolve(record);
                    } catch (err) {
                        return console.log(err.message);
                    }
                }
            });
        });

    const getLastEditAccountRecord = (account, memberSince) =>
        new Promise((resolve, reject) => {
            db.get(
                sql.edit_last_account_record,
                [account, memberSince],
                (err, lastAccountRecord) =>
                    err ? reject(err) : resolve(lastAccountRecord)
            );
        });

    const edit = (newData) =>
        new Promise((resolve, reject) => {
            const [account, memberSince, data] = editData(newData);
            db.run(sql.edit, data, async function (err) {
                if (err) {
                    reject(err);
                } else {
                    try {
                        const record = getLastEditAccountRecord(
                            account,
                            memberSince
                        );
                        resolve(record);
                    } catch (err) {
                        return console.log(err.message);
                    }
                }
            });
        });

    /**
     * Check for duplicate account in Sqlite Database
     * @param {string} account
     * @returns {Promise} Promise Object that indicate whether there is a duplicate account or not
     */
    const checkDuplicateAccount = (account) =>
        new Promise((resolve, reject) => {
            db.get(sql.duplicate, account, (err, duplicate) =>
                err ? reject(err) : resolve(duplicate)
            );
        });

    /**
     * Insert new membership to SQLite3 database>
     *
     * @param {Object[]} membership
     * @param {string} membership[].record_id
     * @param {string} membership[].account
     * @param {string} membership[].firstName
     * @param {string} membership[].lastName
     * @param {string} membership[].fullName
     * @param {string} membership[].areaCode
     * @param {number} membership[].threeDigit
     * @param {number} membership[].fourDigit
     * @param {string} membership[].phone
     * @param {string} membership[].memberSince
     * @param {null} membership[].renew
     * @param {number} membership[].prev
     * @param {string} membership[].buy
     * @param {number} membership[].remain
     * @param {number} membership[].fee
     * @param {string} membership[].invoiceDate
     * @param {string} membership[].invoiceTime
     *
     * @returns {Promise} A Promise object represent the last record id
     */
    const insert = (membership) =>
        new Promise((resolve, reject) =>
            db.run(sql.add, membership, function (err) {
                err ? reject(err) : resolve(this.lastID);
            })
        );

    /**
     * Get the last record from database
     *
     * @param {string} lastId
     * @returns {Promise} A Promise Object that represent the last record
     */
    const getLastRecord = (lastId) =>
        new Promise((resolve, reject) =>
            db.get(sql.last_record, lastId, (err, newMembership) =>
                err ? reject(err) : resolve(newMembership)
            )
        );

    /**
     * Backup Sqlite Database
     * @param {*} event
     * @returns
     */
    const backupFile = (saveSetting) =>
        new Promise((resolve, reject) => {
            dialog
                .showSaveDialog(saveSetting)
                .then((result) => {
                    result.filePath ? resolve(result.filePath) : resolve(null);
                })
                .catch((err) => {
                    reject(err.message);
                });
        });

    /**
     *
     * @param {*} phone
     * @param {*} account
     * @returns
     */
    const findPhoneAndAccount = (phone, account) => {
        return new Promise((resolve, reject) =>
            db.all(sql.last_both_phone_account, [account, phone], (err, data) =>
                err ? reject(err) : resolve({ membership: data[0] })
            )
        );
    };

    /**
     * Find all the phone that match the query
     * @param {*} phone
     * @returns
     */
    const findPhone = (phone) => {
        return new Promise((resolve, reject) => {
            db.all(sql.find_phone, phone, (err, rows) => {
                const onlyOneAccount = rows && rows.length === 1;
                if (err) reject(err);
                if (onlyOneAccount) {
                    const phone = rows[0].phone;
                    db.get(sql.last_phone_record, phone, (err, row) =>
                        err ? reject(err) : resolve({ membership: row })
                    );
                } else {
                    db.all(sql.find_accounts_by_phone, phone, (err, rows) => {
                        const onlyOneAccount = rows && rows.length === 1;
                        const manyAccount = rows && rows.length > 1;
                        if (onlyOneAccount) {
                            const account = rows[0].account;
                            db.get(
                                sql.last_account_record,
                                account,
                                (err, data) =>
                                    err
                                        ? reject(err)
                                        : resolve({ membership: data })
                            );
                        } else if (manyAccount) {
                            resolve({ memberships: rows });
                        } else {
                            resolve({ membership: null });
                        }
                    });
                }
            });
        });
    };

    /**
     * Find Membership by Account Number
     * @param {*} account
     * @returns
     */
    const findByAccount = (account) => {
        return new Promise((resolve, reject) => {
            /**
             *
             * @param {*} rows
             */
            const sendAccountLastRecord = (account) => {
                db.get(sql.last_account_record, account, (err, row) =>
                    err ? reject(err) : resolve({ membership: row })
                );
            };

            /**
             *
             * @param {*} account
             */
            const sendManyAccountLastRecord = (account) => {
                db.all(sql.find_accounts_by_account, account, (err, rows) => {
                    if (err) reject(err);
                    if (rows && rows.length === 1) {
                        db.get(
                            sql.last_account_record,
                            rows[0].account,
                            (err, data) =>
                                err
                                    ? reject(err)
                                    : resolve({ membership: data })
                        );
                    } else if (rows && rows.length > 1) {
                        resolve({ memberships: rows });
                    } else {
                        resolve({ membership: null });
                    }
                });
            };

            /**
             *
             */
            db.all(sql.find_account, account, (err, rows) => {
                if (err) reject(err);
                const onlyOneAccount = rows && rows.length === 1;
                onlyOneAccount
                    ? sendAccountLastRecord(account)
                    : sendManyAccountLastRecord(account);
            });
        });
    };

    /**
     * Find Account by First and Last Name
     * @param {string} fullname
     * @returns {Promise}
     */
    async function findByFullName(fullname) {
        const getAccountLastRecord = (name) =>
            new Promise((resolve, reject) => {
                db.get(sql.last_name_record, name, (err, data) =>
                    err ? reject(err) : resolve({ membership: data })
                );
            });

        const getAccountByName = (name) =>
            new Promise((resolve, reject) => {
                db.all(sql.find_name, name, (err, rows) =>
                    err ? reject(err) : resolve(rows)
                );
            });

        try {
            const rows = await getAccountByName(fullname);
            if (rows && rows.length === 1)
                return await getAccountLastRecord(rows[0].fullname);
            else if (rows.length > 1) return { memberships: rows };
            else return { membership: null };
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Query the database to get Membership Purchase History
     *
     * @param {Object[]} queries - Contain the queries data to get the account history
     * @param {string} queries[].account - Contain the queries data to get the account history
     * @param {string} queries[].memberSince- Contain the queries data to get the account history
     * @param {string} queries[].limit- Contain the queries data to get the account history
     * @param {string} queries[].offset- Contain the queries data to get the account history
     *
     * @returns {Promise<[string]>} - Customer account history records
     */
    async function history(queries) {
        return new Promise((resolve, reject) => {
            db.all(sql.history, queries, (err, records) =>
                err ? reject(err) : resolve(records)
            );
        });
    }

    /**
     * Query the database for the total account invoices for a membership
     *
     * @param {Object[]} queries - Contain the queries data to get the account history
     * @param {string} queries[].account - Contain the queries data to get the account history
     * @param {string} queries[].memberSince- Contain the queries data to get the account history
     *
     * @returns {Promise<[number]>} - The total number of invoices that belong to an account
     */
    async function totalInvoices(queries) {
        return new Promise((resolve, reject) => {
            db.get(sql.total_account_invoices, queries, (err, { count }) =>
                err ? reject(err) : resolve(count)
            );
        });
    }

    /**
     * Get the last record_id and increment it to 1 to get a new record
     *
     * @returns {Promise<[number]>}} - A new record id
     */
    async function newRecord() {
        return new Promise((resolve, reject) => {
            db.get(sql.last_row_record, (err, { record_id }) =>
                err
                    ? reject(err)
                    : resolve({
                          record_id: record_id + 1,
                      })
            );
        });
    }

    /**
     *
     * @param {*} queries
     * @returns
     */
    async function totalFee(queries) {
        return new Promise((resolve, reject) => {
            db.get(sql.totalFee, queries, (err, { totalRenewalFee }) =>
                err ? reject(err) : resolve(totalRenewalFee)
            );
        });
    }

    return {
        verifyLogin,
        backupFile,
        checkDuplicateAccount,
        findByFullName,
        findByAccount,
        findPhone,
        findPhoneAndAccount,
        getLastRecord,
        insert,
        dbFile,
        buy,
        renew,
        edit,
        history,
        totalInvoices,
        newRecord,
        totalFee,
    };
};
