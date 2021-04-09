const renewHeader = [
    'Renew Receipt',
    'Account',
    'Phone',
    'First Name',
    'Last Name',
    'Fee',
    'Prev',
    'Renew',
    'Remain',
    'Date',
    'Time',
];

const renewData = ({
    record_id,
    account,
    areaCode,
    phone,
    firstName,
    lastName,
    fee,
    prev,
    renew,
    remain,
    invoiceTime,
    invoiceDate,
}) => [
    {
        record_id,
        account,
        phone: areaCode + '-' + phone,
        firstName,
        lastName,
        fee,
        prev,
        renew,
        remain,
        invoiceDate,
        invoiceTime,
    },
];

const renewRow = (data, i) => ({
    key: `row-${i}`,
    cells: data,
});

const buyHeader = [
    'Buy Receipt',
    'Account',
    'Phone',
    'First Name',
    'Last Name',
    'Prev',
    'Buy',
    'Remain',
    'Date',
    'Time',
];

const buyData = ({
    record_id,
    account,
    areaCode,
    phone,
    firstName,
    lastName,
    prev,
    buy,
    remain,
    invoiceTime,
    invoiceDate,
}) => [
    {
        record_id,
        account,
        phone: areaCode + '-' + phone,
        firstName,
        lastName,
        prev,
        buy,
        remain,
        invoiceDate,
        invoiceTime,
    },
];

const buyRow = (data, i) => ({
    key: `row-${i}`,
    cells: data,
});

const data = {
    renewData,
    renewHeader,
    renewRow,
    buyData,
    buyHeader,
    buyRow,
};

export default data;
