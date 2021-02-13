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
const login = 'SELECT * FROM users WHERE username = ? AND password = ? ';

// FIND MEMBERSHIP SQL
const find_phone = `SELECT DISTINCT field22 account FROM test WHERE field8 = ?`;
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

const find_name = `SELECT * FROM
            ( SELECT DISTINCT
    		    field22 account,
    		    field1 firstName,
    		    field2 lastName,
    		    field4 fullname,
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
const find_accounts_by_phone = `SELECT * FROM
            ( SELECT DISTINCT
    		    field22 account,
    		    field1 firstName,
    		    field2 lastName,
    		    field4 fullname,
                field5 areaCode,
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

// BUY
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

// RENEW
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
    field32 invoiceTime FROM test WHERE rowid = ? `;

// EDIT
const edit = `UPDATE
                   test 
                SET
                    field5 = ?,
                    field8 = ?,
                    field1 = ?,
                    field2 = ?,
                    field4 = ?,
                    field6 = ?,
                    field7 = ?
                WHERE field22 = ?`;

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
        account = ? ORDER BY record_id DESC LIMIT 1 `;

// HISTORY
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
                FROM test WHERE field22 = ? ORDER BY field20 DESC LIMIT ? OFFSET ?`;

// TOTAL ACCOUNT INVOICES
const total_account_invoices = `SELECT COUNT(*) as count FROM test WHERE field22 = ?`;

// LAST RECORD
const last_row_record = ` SELECT field20 record_id FROM test ORDER BY record_id DESC LIMIT 1`;

// TOTAL RENEW FEE
const totalFee = `SELECT SUM(fees) totalRenewalFee FROM
(SELECT 
	field19 buyGallon,
	field28 renewAmount,
	field31 currentGallon,
	field9 fees
FROM 
test
WHERE field22 = ?)
WHERE buyGallon = 0 OR buyGallon IS NULL`;

module.exports = {
    sql: {
        duplicate,
        add,
        last_record,
        login,
        find_phone,
        last_account_record,
        find_name,
        find_accounts_by_phone,
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
        ];
        return [account, data];
    },
};
