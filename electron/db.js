const { sql, addData } = require('./query');

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
                        callback(null, row);
                    });
                });
            } else {
                callback(
                    {
                        error: `${account} already existed, Please use another account`,
                    },
                    null
                );
            }
        });
    },
};
