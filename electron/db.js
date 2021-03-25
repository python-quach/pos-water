const { sql, addData, buyData, renewData, editData } = require('./query');

module.exports = {
    api: {
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
                callback(true, null);
            }
        },
        addMemberShip: function (db, args, callback) {
            const [account, data] = addData(args);
            db.get(sql.duplicate, account, (err, duplicate) => {
                if (err) return console.log(err.message);
                if (!duplicate) {
                    db.run(sql.add, data, function (err) {
                        if (err) return console.log(err.message);
                        db.get(sql.last_record, this.lastID, (err, row) => {
                            if (err) return console.log(err.message);
                            callback(null, row);
                        });
                    });
                } else {
                    const duplicateAccount = {
                        error: `${account} already existed, Please use another account`,
                    };
                    callback(duplicateAccount, null);
                }
            });
        },
        login: function (db, args, callback) {
            const { username, password } = args;
            db.get(sql.login, [username, password], (err, row) => {
                if (err) return console.log(err.message);
                callback(row);
            });
        },
        find: function (db, args, callback) {
            const { phone, account, firstName, lastName } = args;
            const fullname = firstName + '%' + lastName;

            if (phone && account) {
                db.all(
                    sql.last_both_phone_account,
                    [account, phone],
                    (err, data) => {
                        callback({ membership: data[0] });
                    }
                );
            } else {
                if (phone) {
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
                        if (err) return console.log(err.message);
                        if (rows && rows.length === 1) {
                            const account = rows[0].account;
                            db.get(
                                sql.last_account_record,
                                account,
                                (err, row) => {
                                    if (err) return console.log(err.message);
                                    callback({ membership: row });
                                }
                            );
                        } else {
                            db.all(
                                sql.find_accounts_by_account,
                                account,
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
            const data = buyData(args);
            db.run(sql.buy, data, function (err) {
                if (err) return console.log(err.message);
                db.get(sql.buy_lastRecord, this.lastID, (err, row) => {
                    if (err) return console.log(err.message);
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
                    callback(row);
                });
            });
        },
        edit: function (db, args, callback) {
            const [account, memberSince, data] = editData(args);
            db.run(sql.edit, data, function (err) {
                if (err) return console.log(err.message);
                db.get(
                    sql.edit_last_account_record,
                    [account, memberSince],
                    (err, lastAccountRecord) => {
                        if (err) return console.log(err.message);
                        callback(lastAccountRecord);
                    }
                );
            });
        },
        history: function (db, args, callback) {
            const { account, limit, offset, memberSince } = args;

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
            const { account, memberSince } = args;
            db.get(
                sql.total_account_invoices,
                [account, memberSince],
                (err, count) => {
                    if (err) return console.log(err.message);
                    callback(count.count);
                }
            );
        },
        last_record: function (db, callback) {
            db.get(sql.last_row_record, (err, row) => {
                const { record_id } = row;
                callback({
                    record_id: record_id + 1,
                });
            });
        },
        new_record: function (db, callback) {
            db.get(sql.last_row_record, (err, row) => {
                const { record_id } = row;
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

                        callback(data);
                    });
                });
            });
        },
        report: function (db, args, callback) {
            const { date, time } = args;
            console.log('report', { date, time });

            db.get(
                `SELECT SUM(gallon) totalNewGallon, SUM(fee) totalNewFee FROM memberships WHERE type= ? AND date= ?`,
                ['NEW', date],
                (err, row) => {
                    console.log(row);
                    const { totalNewGallon, totalNewFee } = row;
                    db.get(
                        `SELECT SUM(gallon) totalRenewGallon, SUM(fee) totalRenewFee FROM memberships WHERE type= ? AND date= ?`,
                        ['RENEW', date],
                        (err, row) => {
                            const { totalRenewGallon, totalRenewFee } = row;
                            db.get(
                                `SELECT SUM(buy) totalBuy FROM memberships WHERE type= ? and date = ?`,
                                ['BUY', date],
                                (err, row) => {
                                    const { totalBuy } = row;

                                    const data = {
                                        totalNewFee: totalNewFee || 0,
                                        totalNewGallon: totalNewGallon || 0,
                                        totalRenewFee: totalRenewFee || 0,
                                        totalRenewGallon: totalRenewGallon || 0,
                                        totalBuy: totalBuy || 0,
                                        date,
                                        time,
                                    };
                                    callback(data);
                                }
                            );
                        }
                    );
                }
            );
        },
        getAllUsers: function (db, args, callback) {
            const sql = `SELECT * FROM users`;
            db.all(sql, [], (err, rows) => {
                if (err) {
                    callback(err, null);
                }

                callback(null, rows);
            });
        },
        addUser: function (db, args, callback) {
            const { username, password } = args;
            const sql = `INSERT into users ( username, password) VALUES (?, ?)`;
            db.run(sql, [username, password], function (err) {
                if (err) return console.log(err.message);
                db.get(
                    `SELECT * FROM users WHERE rowid = ?`,
                    this.lastID,
                    (err, row) => {
                        if (err) return console.log(err.message);
                        callback(null, row);
                    }
                );
            });
        },
        editUser: function (db, args, callback) {
            const { username, password, user_id } = args;
            const sql = `UPDATE users SET username = ?, password = ? WHERE rowid = ?`;
            db.run(sql, [username, password, user_id], function (err) {
                if (err) return console.log(err.message);
                callback(false, this.changes);
            });
        },
        deleteUser: function (db, args, callback) {
            const { user_id } = args;
            const sql_delete = `DELETE FROM users WHERE rowid = ?`;
            db.run(sql_delete, [user_id], function (err) {
                if (err) return console.log(err.message);
                callback(false, this.changes);
            });
        },
    },

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
            callback(true, null);
        }
    },
    addMemberShip: function (db, args, callback) {
        const [account, data] = addData(args);
        db.get(sql.duplicate, account, (err, duplicate) => {
            if (err) return console.log(err.message);
            if (!duplicate) {
                db.run(sql.add, data, function (err) {
                    if (err) return console.log(err.message);
                    db.get(sql.last_record, this.lastID, (err, row) => {
                        if (err) return console.log(err.message);
                        callback(null, row);
                    });
                });
            } else {
                const duplicateAccount = {
                    error: `${account} already existed, Please use another account`,
                };
                callback(duplicateAccount, null);
            }
        });
    },
    login: function (db, args, callback) {
        const { username, password } = args;
        db.get(sql.login, [username, password], (err, row) => {
            if (err) return console.log(err.message);
            callback(row);
        });
    },
    find: function (db, args, callback) {
        const { phone, account, firstName, lastName } = args;
        const fullname = firstName + '%' + lastName;

        if (phone && account) {
            db.all(
                sql.last_both_phone_account,
                [account, phone],
                (err, data) => {
                    callback({ membership: data[0] });
                }
            );
        } else {
            if (phone) {
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
                    if (err) return console.log(err.message);
                    if (rows && rows.length === 1) {
                        const account = rows[0].account;
                        db.get(sql.last_account_record, account, (err, row) => {
                            if (err) return console.log(err.message);
                            callback({ membership: row });
                        });
                    } else {
                        db.all(
                            sql.find_accounts_by_account,
                            account,
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
        const data = buyData(args);
        db.run(sql.buy, data, function (err) {
            if (err) return console.log(err.message);
            db.get(sql.buy_lastRecord, this.lastID, (err, row) => {
                if (err) return console.log(err.message);
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
                callback(row);
            });
        });
    },
    edit: function (db, args, callback) {
        const [account, memberSince, data] = editData(args);
        db.run(sql.edit, data, function (err) {
            if (err) return console.log(err.message);
            db.get(
                sql.edit_last_account_record,
                [account, memberSince],
                (err, lastAccountRecord) => {
                    if (err) return console.log(err.message);
                    callback(lastAccountRecord);
                }
            );
        });
    },
    history: function (db, args, callback) {
        const { account, limit, offset, memberSince } = args;

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
        const { account, memberSince } = args;
        db.get(
            sql.total_account_invoices,
            [account, memberSince],
            (err, count) => {
                if (err) return console.log(err.message);
                callback(count.count);
            }
        );
    },
    last_record: function (db, callback) {
        db.get(sql.last_row_record, (err, row) => {
            const { record_id } = row;
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

                    callback(data);
                });
            });
        });
    },
    report: function (db, args, callback) {
        const { date, time } = args;
        console.log('report', { date, time });

        db.get(
            `SELECT SUM(gallon) totalNewGallon, SUM(fee) totalNewFee FROM memberships WHERE type= ? AND date= ?`,
            ['NEW', date],
            (err, row) => {
                console.log(row);
                const { totalNewGallon, totalNewFee } = row;
                db.get(
                    `SELECT SUM(gallon) totalRenewGallon, SUM(fee) totalRenewFee FROM memberships WHERE type= ? AND date= ?`,
                    ['RENEW', date],
                    (err, row) => {
                        const { totalRenewGallon, totalRenewFee } = row;
                        db.get(
                            `SELECT SUM(buy) totalBuy FROM memberships WHERE type= ? and date = ?`,
                            ['BUY', date],
                            (err, row) => {
                                const { totalBuy } = row;

                                const data = {
                                    totalNewFee: totalNewFee || 0,
                                    totalNewGallon: totalNewGallon || 0,
                                    totalRenewFee: totalRenewFee || 0,
                                    totalRenewGallon: totalRenewGallon || 0,
                                    totalBuy: totalBuy || 0,
                                    date,
                                    time,
                                };
                                callback(data);
                            }
                        );
                    }
                );
            }
        );
    },
    getAllUsers: function (db, args, callback) {
        const sql = `SELECT * FROM users`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                callback(err, null);
            }

            callback(null, rows);
        });
    },
    addUser: function (db, args, callback) {
        const { username, password } = args;
        const sql = `INSERT into users ( username, password) VALUES (?, ?)`;
        db.run(sql, [username, password], function (err) {
            if (err) return console.log(err.message);
            db.get(
                `SELECT * FROM users WHERE rowid = ?`,
                this.lastID,
                (err, row) => {
                    if (err) return console.log(err.message);
                    callback(null, row);
                }
            );
        });
    },
    editUser: function (db, args, callback) {
        const { username, password, user_id } = args;
        const sql = `UPDATE users SET username = ?, password = ? WHERE rowid = ?`;
        db.run(sql, [username, password, user_id], function (err) {
            if (err) return console.log(err.message);
            callback(false, this.changes);
        });
    },
    deleteUser: function (db, args, callback) {
        const { user_id } = args;
        const sql_delete = `DELETE FROM users WHERE rowid = ?`;
        db.run(sql_delete, [user_id], function (err) {
            if (err) return console.log(err.message);
            callback(false, this.changes);
        });
    },
};
