const { sql, addData, buyData, renewData, editData } = require('./query');

module.exports = {
    deleteAccount: function (db, arg, callback) {
        const { account, memberSince, password } = arg;
        const sql_delete = `DELETE FROM test WHERE field22 = ? AND field10 = ? `;

        if (password === '911') {
            db.run(sql_delete, [account, memberSince], function (err) {
                if (err) return console.log(err.message);
                console.log('DELETED RESULT:', this);
                callback(false, this.changes);
            });
        } else {
            console.log('Unable to delete', account);
            callback(true, null);
        }
    },
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

        if (phone && account) {
            console.log({ phone, account });
            db.all(
                sql.last_both_phone_account,
                [account, phone],
                (err, data) => {
                    console.log(data);
                    callback({ membership: data[0] });
                }
            );
        } else {
            if (phone) {
                console.log(phone);
                db.all(sql.find_phone, phone, (err, rows) => {
                    if (err) return console.log(err.message);
                    if (rows && rows.length === 1) {
                        const phone = rows[0].phone;
                        db.get(sql.last_phone_record, phone, (err, row) => {
                            if (err) return console.log(err.message);
                            callback({ membership: row });
                        });
                    } else {
                        db.all(
                            sql.find_accounts_by_phone,
                            phone,
                            (err, rows) => {
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
                            }
                        );
                    }
                });
            } else if (account) {
                db.all(sql.find_account, account, (err, rows) => {
                    console.log('ACCOUNT FIND: ', rows);
                    if (err) return console.log(err.message);
                    if (rows && rows.length === 1) {
                        const account = rows[0].account;
                        db.get(sql.last_account_record, account, (err, row) => {
                            if (err) return console.log(err.message);
                            callback({ membership: row });
                        });
                    } else {
                        console.log('else', account);
                        db.all(
                            sql.find_accounts_by_account,
                            account,
                            (err, rows) => {
                                console.log('More Account: ', { rows });
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
                            }
                        );
                    }
                });
            } else {
                db.all(sql.find_name, fullname, (err, rows) => {
                    if (rows && rows.length === 1) {
                        const name = rows[0].fullname;
                        db.get(sql.last_name_record, name, (err, data) => {
                            callback({ membership: data });
                        });
                    } else if (rows.length > 1) {
                        callback({ memberships: rows });
                    } else {
                        callback({ membership: null });
                    }
                });
            }
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
        console.log('EDIT:', args);
        const [account, memberSince, data] = editData(args);
        db.run(sql.edit, data, function (err) {
            if (err) return console.log(err.message);
            db.get(
                sql.edit_last_account_record,
                [account, memberSince],
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
        console.log('HISTORY', args);
        const {
            account,
            limit,
            offset,
            phone,
            firstName,
            lastName,
            memberSince,
        } = args;
        console.log(phone);

        const first = firstName || '';
        const last = lastName || '';

        const fullName = first + ' ' + last;
        console.log({ fullName });
        console.log(fullName.trim());
        db.all(
            sql.history,
            [account, memberSince, limit, offset],
            (err, rows) => {
                if (err) return console.log(err.message);
                callback(rows);
            }
        );
    },
    total_account_invoices: function (db, args, callback) {
        const { account, firstName, lastName, memberSince } = args;
        console.log('TOTAL ACCOUNT INVOICE', {
            account,
            firstName,
            lastName,
            memberSince,
        });
        db.get(
            sql.total_account_invoices,
            [account, memberSince],
            (err, count) => {
                if (err) return console.log(err.message);
                console.log('TOTAL ACCOUNT INVOICES: ', count.count);
                callback(count.count);
            }
        );
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
        const { account, memberSince } = args;

        db.get(sql.totalFee, [account, memberSince], (err, row) => {
            if (err) {
                return console.log(err.message);
            }
            const { totalRenewalFee } = row;
            console.log('TOTAL RENEWAL FEE:', totalRenewalFee);
            callback(totalRenewalFee);
        });
    },
    totalRenew: function (db, args, callback) {
        const { account, memberSince } = args;
        db.all(sql.totalRenew, [account, memberSince], (err, row) => {
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
        const { account, memberSince } = args;
        db.get(sql.totalBuy, [account, memberSince], (err, row) => {
            if (err) return console.log(err.message);
            const { totalBuyGallon } = row;
            console.log('TOTAL BUY:', totalBuyGallon);
            callback({ totalBuyGallon });
        });
    },
    dailyReport: function (db, args, callback) {
        const { date, time } = args;

        db.get(sql.reportRenew, date, (err, row) => {
            if (err) return console.log(err.message);
            const { totalFee, totalRenewAmount } = row;
            db.get(sql.reportNew, date, (err, row) => {
                const { totalNew } = row;
                db.get(sql.reportBuy, date, (err, row) => {
                    if (err) return console.log(err.message);
                    const { totalBuy } = row;

                    const data = {
                        totalFee: totalFee || 0,
                        totalRenew: totalRenewAmount || 0,
                        totalBuy: totalBuy || 0,
                        totalNew: totalNew || 0,
                        date,
                        time,
                    };

                    console.log('DAILY REPORT:', {
                        data,
                        date,
                        time,
                    });
                    callback(data);
                });
            });
        });
    },
};
