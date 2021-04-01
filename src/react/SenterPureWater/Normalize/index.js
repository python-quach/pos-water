export const normalizePhone = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7)
        return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 7)}`;
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(
        6,
        10
    )}`;
};

export const normalizeAccount = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 11) return onlyNums;
    return onlyNums.slice(0, -1);
};

export const normalizeFee = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 5) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};

export const normalizeGallon = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 5) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};

export const normalizeName = (value) => {
    if (!value) return value;
    const onlyLetters = value.replace(/[^A-Za-z]/g, '');
    return (
        onlyLetters.charAt(0).toUpperCase() + onlyLetters.slice(1).toLowerCase()
    );
};

export const normalize = {
    gallon: normalizeGallon,
    fee: normalizeFee,
    name: normalizeName,
    account: normalizeAccount,
    phone: normalizePhone,
};
