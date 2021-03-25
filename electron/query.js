const login = 'SELECT * FROM users WHERE username = ? AND password = ? ';
const duplicate = `SELECT * FROM test WHERE field22 = ?`;
const add = `INSERT INTO test (
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

const last_record = `SELECT * FROM test WHERE rowid = ?`;

const find_phone = `SELECT DISTINCT field8 phone, field22 account, field4 fullname FROM test WHERE field8 = ? `;

// const find_account = `SELECT DISTINCT field8 phone, field22 account FROM test WHERE field22 = ?`;
// const find_account = `SELECT DISTINCT field8 phone, field22 account FROM test WHERE field22 = ?`;

const find_account = `SELECT DISTINCT field10 memberSince, field22 account FROM test WHERE field22 = ?`;
// const find_account = `SELECT DISTINCT field10 memberSince  FROM test WHERE field22 = ?`;

const find_account_phone = `SELECT * FROM test WHERE field8 = '258-3381' AND field22 = '?'`;

const last_both_phone_account = `
SELECT
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
	test
WHERE
	 field22 = ? AND field8 = ?  
ORDER BY
	field20
DESC LIMIT 1
`;
const last_account_record = `SELECT
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
	test
WHERE
	field22 = ?
ORDER BY
	field20
DESC LIMIT 1`;

const last_name_record = `SELECT
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
	test
WHERE
	field4 = ?
ORDER BY
	field20
DESC LIMIT 1
`;

const last_phone_record = `SELECT 
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
	test 
WHERE 
	field8 = ? 
ORDER BY 
	field20 
DESC LIMIT 1`;
const find_name = `SELECT * FROM
            ( SELECT DISTINCT
    		    field22 account,
                field10 memberSince,
    		    field1 firstName,
    		    field2 lastName,
    		    field4 fullname,
                field5 areaCode,
    		    field8 phone
            FROM test 
                WHERE
    		        fullname like ?
    		        ORDER BY
    		    fullname
            ) 
        WHERE 
            account IS NOT NULL 
			AND phone IS NOT NULL`;

const find_accounts_by_account = `SELECT * FROM
( SELECT DISTINCT
    field22 account,
    field10 memberSince,
    field8 phone,
    field4 fullname,
    field1 firstName,
    field5 areaCode,
    field2 lastName
    
FROM test 
    WHERE
        field22 =  ? 
        ORDER BY
      memberSince
) 
WHERE 
account IS NOT NULL 
AND memberSince IS NOT NULL`;

const find_accounts_by_phone = `SELECT * FROM
            ( SELECT DISTINCT
    		    field22 account,
    		    field1 firstName,
    		    field2 lastName,
    		    field4 fullname,
                field5 areaCode,
                field10 memberSince,
    		    field8 phone
            FROM test 
                WHERE
                    phone = ?
    		        ORDER BY
    		    fullname
            ) 
        WHERE 
            account IS NOT NULL 
			AND phone IS NOT NULL`;

const buy = `INSERT INTO test(
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
const buy_lastRecord = `SELECT 
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
    field32 invoiceTime FROM test WHERE rowid = ? `;
const renew = `INSERT INTO test(
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
const renew_lastRecord = `SELECT 
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
    field32 invoiceTime 
FROM 
    test 
WHERE rowid = ? `;
const edit = `UPDATE test 
    SET
        field5 = ?,
        field8 = ?,
        field1 = ?,
        field2 = ?,
        field4 = ?,
        field6 = ?,
        field7 = ?
    WHERE field22 = ? AND field10 = ?`;

const edit_last_account_record = `SELECT   
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
    test
    WHERE 
        account = ? AND memberSince = ? ORDER BY record_id DESC LIMIT 1 `;

const history = `SELECT
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
                FROM test WHERE field22 = ? AND memberSince = ?  ORDER BY field20 DESC LIMIT ? OFFSET ?`;

const total_account_invoices = `SELECT COUNT(*) as count FROM test WHERE field22 = ? AND field10  = ?`;
const last_row_record = ` SELECT field20 record_id FROM test ORDER BY record_id DESC LIMIT 1`;
const totalFee = `SELECT SUM(fees) totalRenewalFee FROM
(SELECT 
	field19 buyGallon,
	field28 renewAmount,
	field31 currentGallon,
	field9 fees
FROM 
test
WHERE field22 = ? AND  field10  = ?)
WHERE buyGallon = 0 OR buyGallon IS NULL`;

const totalRenew = `SELECT * FROM
(SELECT 
	field19 ,
	field28 ,
	field31,
	field9 
FROM 
test
WHERE field22 = ? AND  field10 = ? )
WHERE field19 = 0 OR field19 IS NULL`;

const totalBuy = `SELECT SUM(field19) totalBuyGallon FROM
(SELECT 
	field19 ,
	field28 ,
	field31,
	field9 
FROM 
test
WHERE field22 = ? AND field10 = ? )`;

// DAILY REPORT
const reportRenew = `SELECT SUM(renewAmount) totalRenewAmount, SUM(fee) totalFee FROM 
                          (SELECT ROWID record_id,
	field20 invoice_id,
	field22 account,
	field15 purchaseDate,
	field32 purchaseTime,
	field10 memberSince,
	field1 firstName,
	field2 lastName,
	field4 fullname,
	field5 areaCode,
	field6 threeDigit,
	field7 fourDigit,
	field8 phone,
	field31 currentGallon,
	field19 buyGallon,
	field12 remainGallon,
	field28 renewAmount,
	field9 fee,
	field30 clerk
FROM 
	test 
WHERE field15 = ?) 
WHERE buyGallon IS NULL OR buyGallon = '0'`;
const reportBuy = `SELECT SUM(buyGallon) totalBuy FROM 
(SELECT 
	ROWID record_id,
	field20 invoice_id,
	field22 account,
	field15 purchaseDate,
	field32 purchaseTime,
	field10 memberSince,
	field1 firstName,
	field2 lastName,
	field4 fullname,
	field5 areaCode,
	field6 threeDigit,
	field7 fourDigit,
	field8 phone,
	field31 currentGallon,
	field19 buyGallon,
	field12 remainGallon,
	field28 renewAmount,
	field9 fee,
	field30 clerk
FROM 
	test 
WHERE field15 = ?) 
WHERE buyGallon IS NOT NULL OR buyGallon = '0'`;

const reportNew = `SELECT SUM(remainGallon) totalNew FROM 
(SELECT 
	ROWID record_id,
	field20 invoice_id,
	field22 account,
	field15 purchaseDate,
	field32 purchaseTime,
	field10 memberSince,
	field1 firstName,
	field2 lastName,
	field4 fullname,
	field5 areaCode,
	field6 threeDigit,
	field7 fourDigit,
	field8 phone,
	field31 currentGallon,
	field19 buyGallon,
	field12 remainGallon,
	field28 renewAmount,
	field9 fee,
	field30 clerk
FROM 
	test 
WHERE field15 = ?) 
WHERE renewAmount IS  NULL AND buyGallon = '0'`;

module.exports = {
    sql: {
        duplicate,
        add,
        last_record,
        login,
        find_phone,
        find_account,
        last_account_record,
        last_phone_record,
        last_name_record,
        find_name,
        find_accounts_by_phone,
        find_accounts_by_account,
        find_account_phone,
        last_both_phone_account,
        buy,
        buy_lastRecord,
        renew,
        renew_lastRecord,
        edit,
        edit_last_account_record,
        history,
        total_account_invoices,
        last_row_record,
        totalFee,
        totalRenew,
        totalBuy,
        reportRenew,
        reportBuy,
        reportNew,
    },
    renewData: function ({
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
    }) {
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
        return data;
    },
    buyData: function ({
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
    }) {
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
        return data;
    },
    convertDataForSqlite: function ({
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
    }) {
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
        return [account, data];
    },
    addData: function ({
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
    }) {
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
        return [account, data];
    },
    editData: function ({
        firstName,
        lastName,
        fullname,
        areaCode,
        phone,
        account,
        memberSince,
    }) {
        const newPhone = phone.replace(/[^\d+]/g, '');
        const threeDigit = newPhone.slice(0, 3);
        const fourDigit = newPhone.slice(3, 7);

        const data = [
            areaCode,
            phone,
            firstName,
            lastName,
            fullname,
            threeDigit,
            fourDigit,
            account,
            memberSince,
        ];
        return [account, memberSince, data];
    },
};
