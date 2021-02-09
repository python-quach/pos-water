export const currentTime = () => {
    const time = new Date();
    return time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });
};

export const verifyAccount = (value) => {
    if (value.match(/^[0-9]*$/) && value.length <= 10) {
        return value;
    }
};

export const currentDate = () => {
    const currentdate = new Date();
    // const currentdate = new Date(2019, 19, 5, 5, 23, 59);
    const datetime =
        currentdate.getMonth() +
        1 +
        '/' +
        currentdate.getDate() +
        '/' +
        currentdate.getFullYear();

    return datetime;
};

export const normalizeAreaCode = (value, previousValue) => {
    // console.log(value);
    if (value.length <= 3 && value.match(/^\d+$/g)) {
        if (value.length === 3) {
            // document.getElementById('Phone').focus();
            return value;
        }
        return value;
    } else {
        if (value === '') {
            return '';
        } else {
            return previousValue;
        }
    }
};
export const normalizeInput = (value, previousValue) => {
    // console.log({ value, previousValue });
    if (value.match(/^\d+$/g) && value.length <= 7) {
        if (value.length === 7 && value.length > previousValue.length) {
            // document.getElementById('firstName').focus();
            return value.slice(0, 3) + '-' + value.slice(3, 7);
        }
        if (value.length === 0) return '';
        return value;
    }

    if (
        previousValue &&
        previousValue.length > value.length &&
        value.length < 9
    ) {
        return value;
    }

    if (
        previousValue &&
        previousValue.length < value.length &&
        value.length < 9
    ) {
        // console.log('match second if', value);
        if (value.match(/^\d+$/g) || value.charAt(3) === '-') {
            return value;
        }
        return previousValue;
    }

    return previousValue;
};

export const upperCaseName = (value) => {
    if (value.match(/^[a-zA-Z]+$/g)) return value.toUpperCase();
};

export const verifyFee = (value, previousValue) => {
    if (isNaN(parseInt(value))) return 0;
    return value.length <= 4 ? parseInt(value) : previousValue;
};

export const verifyRenewGallon = (value, previousValue) => {
    if (isNaN(parseInt(value))) return 0;
    return value.length <= 4 ? parseInt(value) : previousValue;
};
