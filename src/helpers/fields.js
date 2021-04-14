/**
 *
 * @param {*} value
 * @returns
 */
export const normalizeName = (value) => {
    if (!value) return value;
    const onlyWords = value.replace(/[^A-Za-z]/g, '');
    return onlyWords.toUpperCase();
};
/**
 *
 * @param {*} value
 * @returns
 */
export const normalizeGallon = (value) => {
    if (!value) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 6) return parseInt(onlyNums);
    return parseInt(onlyNums.slice(0, 5));
};
/**
 *
 * @param {*} value
 * @returns
 */
export const normalizeAreaCode = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 4) return onlyNums;
    return onlyNums.slice(0, 3);
};
/**
 *
 * @param {*} value
 * @returns
 */
export const required = (value) => (value ? undefined : 'Required');
/**
 *
 * @param {*} value
 * @returns
 */
export const mustBeNumber = (value) =>
    isNaN(value) ? 'Must be a number' : undefined;
/**
 *
 * @param {*} min
 * @returns
 */
export const minValue = (min) => (value) =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
/**
 *
 * @param  {...any} validators
 * @returns
 */
export const composeValidators = (...validators) => (value) =>
    validators.reduce(
        (error, validator) => error || validator(value),
        undefined
    );

/**
 *
 * @param {*} value
 * @returns
 */
export const normalizeFee = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 7) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};
/**
 *
 * @param {*} value
 * @returns
 */
export const normalizePhone = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 6) return onlyNums;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}`;
};

/**
 *
 * @param {*} value
 * @returns
 */
export const normalizeRenewAmount = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 7) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};
