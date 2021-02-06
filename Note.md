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
