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
