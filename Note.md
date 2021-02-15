npm i -D electron@latest

SELECT \* FROM
(SELECT
field20 record_id,
field22 account,
field2 firstName,
field3 lastName,
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
mckee
WHERE
field22 = '45403'
ORDER BY
field20
DESC LIMIT 5)
ORDER BY
record_id
ASC

// const {
// record_id,
// account,
// firstName,
// lastName,
// fullname,
// areaCode,
// threeDigit,
// fourDigit,
// phone,
// memberSince,
// prev,
// buy,
// remain,
// fee,
// renew,
// invoiceDate,
// invoiceTime,
// } = data;

        // console.table([
        //     {
        //         record_id,
        //         account,
        //         firstName,
        //         lastName,
        //         fullname,
        //         areaCode,
        //         threeDigit,
        //         fourDigit,
        //         phone,
        //         memberSince,
        //         prev,
        //         buy,
        //         remain,
        //         fee,
        //         renew,
        //         invoiceDate,
        //         invoiceTime,
        //     },
        // ]);

// form.initialize({
// account,
// record_id: values.record_id + 1 || '',
// areaCode: values.areaCode,
// phone: values.phone,
// fullname: values.fullname,
// firstName: values.firstName,
// lastName: values.lastName,
// memberSince,
// prev: values.remain,
// buy: 0,
// threeDigit: values.threeDigit,
// fourDigit: values.fourDigit,
// remain: values.remain,
// fee: 0,
// renew: 0,
// invoiceDate: currentDate(),
// invoiceTime: getCurrentTime(),
// });

               // form.initialize({
            //     account,
            //     record_id: values.record_id + 1 || '',
            //     areaCode: values.areaCode,
            //     phone: values.phone,
            //     fullname: values.fullname,
            //     firstName: values.firstName,
            //     lastName: values.lastName,
            //     memberSince,
            //     prev: values.remain + values.renew,
            //     buy: 0,
            //     threeDigit: values.threeDigit,
            //     fourDigit: values.fourDigit,
            //     remain: values.remain + values.renew,
            //     fee: 0,
            //     renew: 0,
            //     invoiceDate: currentDate(),
            //     invoiceTime: getCurrentTime(),
            // });

SELECT \* FROM (SELECT  
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
-- field16 prev,
-- field33 prev,
-- field12 prev,
-- field14 prev,
-- field17 prev,
field19 buy,
field12 remain,
-- field33 remain,
-- field14 remain,
field9 fee,
field28 renew,
field15 invoiceDate,
field32 invoiceTime
FROM
mckee
WHERE
field22 = '45403'
ORDER BY
field20
DESC LIMIT 5)
ORDER BY record_id ASC

     console.log('ADD NEW MEMBERSHIP', row);
                    const account = row.field22;
                    const phone = row.field7;
                    const fullname = row.field1;
                    const prev = 'Gallons prev:' + ' ' + row.field12;
                    const action = 'NEW MEMBERSHIP';
                    const left = 'Gallon left:' + ' ' + row.field31;
                    const date = row.field15 + '---' + row.field32;
                    // const time = row.field32;
                    const message = 'Thank You' + '     ' + account;
                    const store = 'Mckee Pure Water';

                    console.log(fullname + '--' + phone);
                    console.log(prev);
                    console.log(action);
                    console.log(left);
                    console.log(date);
                    console.log(message);
                    console.log(store);

-- SEARCH BY PHONE, then we need search phone first, then use account to get last record
-- SELECT DISTINCT field22 account FROM test WHERE field8 = '712-3459'

SELECT \* FROM
(SELECT
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
ORDER BY record_id DESC LIMIT 50
)
ORDER BY record_id ASC

./node_modules/.bin/electron-rebuild
