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

module.exports = {
    addNewAccount: `INSERT INTO memberships ( ${[...columns]} ) VALUES(${[
        ...columns.map(() => '?'),
    ]})`,
    findAccount: `SELECT * FROM memberships WHERE account = ?`,
    // lastRecord: `SELECT account, phone, first, last, since, fee, gallon, buy, remain, type, date, time, previous FROM memberships WHERE rowid = ?`,
    lastRecord: `SELECT * FROM memberships WHERE rowid = ?`,
    add: function (args) {
        const {
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
            previous,
        } = args;

        const data = [
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
            previous,
        ];

        const addNewMember = `INSERT INTO memberships ( ${[
            ...columns,
        ]} ) VALUES(${[...columns.map(() => '?')]})`;

        return { addNewMember, data };
    },
};
