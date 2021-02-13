const { sql, addData, buyData, renewData, editData } = require('./query');

module.exports = {
    addMemberShip: function (db, args, callback) {
        console.log('ADD: ', { ...args });
        const [account, data] = addData(args);
        db.get(sql.duplicate, account, (err, duplicate) => {
            if (err) return console.log(err.message);
            if (!duplicate) {
                db.run(sql.add, data, function (err) {
                    if (err) return console.log(err.message);
                    db.get(sql.last_record, this.lastID, (err, row) => {
                        if (err) return console.log(err.message);
                        console.log('ADD NEW ACCOUNT', row);
                        callback(null, row);
                    });
                });
            } else {
                const duplicateAccount = {
                    error: `${account} already existed, Please use another account`,
                };
                console.log(duplicateAccount);
                callback(duplicateAccount, null);
            }
        });
    },
    login: function (db, args, callback) {
        console.log('LOGIN:', { args });
        const { username, password } = args;
        db.get(sql.login, [username, password], (err, row) => {
            if (err) return console.log(err.message);
            if (!row) console.log('LOGIN FAILED', row, args);
            callback(row);
        });
    },
    find: function (db, args, callback) {
        console.log('FIND:', { args });
        const { phone, account, firstName, lastName } = args;
        const fullname = firstName + '%' + lastName;

        if (phone) {
            db.all(sql.find_phone, phone, (err, rows) => {
                if (err) return console.log(err.message);
                if (rows && rows.length === 1) {
                    const user_account = rows[0].account;
                    db.get(
                        sql.last_account_record,
                        user_account,
                        (err, row) => {
                            if (err) return console.log(err.message);
                            callback({ membership: row });
                        }
                    );
                } else {
                    db.all(sql.find_accounts_by_phone, phone, (err, rows) => {
                        if (rows && rows.length === 1) {
                            const account = rows[0].account;
                            db.get(
                                sql.last_account_record,
                                account,
                                (err, data) => {
                                    callback({ membership: data });
                                }
                            );
                        } else if (rows && rows.length > 1) {
                            callback({ memberships: rows });
                        } else {
                            callback({ membership: null });
                        }
                    });
                }
            });
        } else if (account) {
            db.get(sql.last_account_record, account, (err, row) => {
                if (err) return console.log(err.message);
                if (row) {
                    callback({ membership: row });
                } else {
                    callback({ membership: null });
                }
            });
        } else {
            db.all(sql.find_name, fullname, (err, rows) => {
                if (rows.length === 1) {
                    const account = rows[0].account;
                    db.get(sql.last_account_record, account, (err, data) => {
                        callback({ membership: data });
                    });
                } else if (rows.length > 1) {
                    callback({ memberships: rows });
                } else {
                    callback({ membership: null });
                }
            });
        }
    },
    buy: function (db, args, callback) {
        console.log('BUY: ', { args });
        const data = buyData(args);
        db.run(sql.buy, data, function (err) {
            if (err) return console.log(err.message);
            db.get(sql.buy_lastRecord, this.lastID, (err, row) => {
                if (err) return console.log(err.message);
                console.log(`BUY: ${this.lastID}: record: ${row.record_id}`);
                callback(row);
            });
        });
    },
    renew: function (db, args, callback) {
        const data = renewData(args);
        db.run(sql.renew, data, function (err) {
            if (err) return console.log(err.message);
            db.get(sql.renew_lastRecord, this.lastID, (err, row) => {
                if (err) return console.log(err.message);
                console.log(`RENEW: ${this.lastID} record: ${row.record_id}`);
                callback(row);
            });
        });
    },
    edit: function (db, args, callback) {
        const [account, data] = editData(args);
        db.run(sql.edit, data, function (err) {
            if (err) return console.log(err.message);

            db.get(
                sql.edit_last_account_record,
                account,
                (err, lastAccountRecord) => {
                    console.log(lastAccountRecord);
                    if (err) return console.log(err.message);
                    console.log(`EDIT: record: ${lastAccountRecord.record_id}`);
                    callback(lastAccountRecord);
                }
            );
        });
    },
    history: function (db, args, callback) {
        const { account, limit, offset } = args;
        db.all(sql.history, [account, limit, offset], (err, rows) => {
            if (err) return console.log(err.message);
            callback(rows);
        });
    },
    total_account_invoices: function (db, args, callback) {
        const { account } = args;
        db.get(sql.total_account_invoices, account, (err, count) => {
            if (err) return console.log(err.message);
            console.log('TOTAL ACCOUNT INVOICES: ', count.count);
            callback(count.count);
        });
    },
    last_record: function (db, callback) {
        db.get(sql.last_row_record, (err, row) => {
            const { record_id } = row;
            console.log('LAST RECORD ID:', record_id);
            callback({
                record_id: record_id + 1,
            });
        });
    },
    totalFee: function (db, args, callback) {
        const { account } = args;
        db.get(sql.totalFee, account, (err, row) => {
            if (err) {
                return console.log(err.message);
            }
            const { totalRenewalFee } = row;
            console.log('TOTAL RENEWAL FEE:', totalRenewalFee);
            callback(totalRenewalFee);
        });
    },
    totalRenew: function (db, args, callback) {
        const { account } = args;
        db.all(sql.totalRenew, account, (err, row) => {
            if (err) {
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

            console.log('TOTAL RENEW:', sum);

            callback({
                totalRenewalGallon: sum,
            });
        });
    },
    totalBuy: function (db, args, callback) {
        const { account } = args;
        db.get(sql.totalBuy, account, (err, row) => {
            if (err) return console.log(err.message);
            const { totalBuyGallon } = row;
            console.log('TOTAL BUY:', totalBuyGallon);
            callback({ totalBuyGallon });
        });
    },
};
