import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeName = (value) => {
    if (!value) return value;
    const onlyWords = value.replace(/[^A-Za-z]/g, '');
    return onlyWords.toUpperCase();
};
const normalizeGallon = (value) => {
    if (!value) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 6) return parseInt(onlyNums);
    return parseInt(onlyNums.slice(0, 5));
};
const normalizeAreaCode = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 4) return onlyNums;
    return onlyNums.slice(0, 3);
};
const required = (value) => (value ? undefined : 'Required');
const mustBeNumber = (value) => (isNaN(value) ? 'Must be a number' : undefined);
const minValue = (min) => (value) =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
const composeValidators = (...validators) => (value) =>
    validators.reduce(
        (error, validator) => error || validator(value),
        undefined
    );
const normalizeFee = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 7) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};
const normalizePhone = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 6) return onlyNums;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}`;
};
const normalizeRenewAmount = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 7) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};

// EDIT: Membership Account Info
export const Account = ({ edit }) => (
    <Field
        name='account'
        render={({ input }) => (
            <Form.Input
                {...input}
                id='account'
                label='Account'
                className='BuyAccount'
                placeholder='xxxxxx'
                icon='hashtag'
                iconPosition='left'
                readOnly
                inverted
                disabled={edit}
                width={2}
            />
        )}
    />
);
export const MemberSince = ({ disabled }) => (
    <Field
        name='memberSince'
        render={({ input }) => (
            <Form.Input
                {...input}
                label='Member Since'
                className='TodayDate'
                placeholder='mm/dd/yyy'
                iconPosition='left'
                icon='calendar'
                disabled={disabled}
                width={2}
                readOnly
                inverted
            />
        )}
    />
);
export const AreaCode = ({ error, readOnly }) => (
    <Field
        name='areaCode'
        parse={normalizeAreaCode}
        validate={composeValidators(required, mustBeNumber, minValue(3))}
        render={({ input }) => (
            <Form.Input
                {...input}
                id='areaCode'
                className='AreaCode'
                label='Code'
                inverted
                placeholder='xxx'
                width={1}
                error={error}
                readOnly={readOnly}
            />
        )}
    />
);
export const Phone = ({ error, readOnly }) => {
    return (
        <Field
            name='phone'
            parse={normalizePhone}
            render={({ input }) => (
                <Form.Input
                    {...input}
                    id='phone'
                    className='PhoneNumber'
                    label='Phone Number'
                    placeholder='xxx-xxxx'
                    error={error}
                    readOnly={readOnly}
                    inverted
                    width={2}
                />
            )}
        />
    );
};
export const FirstName = ({ readOnly, error }) => (
    <Field
        name='firstName'
        parse={normalizeName}
        render={({ input }) => (
            <Form.Input
                {...input}
                id='firstName'
                label='First Name'
                className='Name'
                readOnly={readOnly}
                error={error}
                inverted
                width={3}
            />
        )}
    />
);
export const LastName = ({ readOnly, error }) => (
    <Field
        name='lastName'
        parse={normalizeName}
        render={({ input }) => (
            <Form.Input
                {...input}
                label='Last Name'
                className='Name'
                readOnly={readOnly}
                error={error}
                inverted
                width={3}
            />
        )}
    />
);
export const Fullname = () => (
    <Field
        name='fullname'
        render={({ input }) => (
            <Form.Input
                {...input}
                type='hidden'
                className='Name'
                readOnly
                inverted
            />
        )}
    />
);
export const Date = ({ disabled }) => (
    <Field
        name='invoiceDate'
        render={({ input }) => (
            <Form.Input
                {...input}
                id='todayDate'
                label='Today Date'
                className='TodayDate'
                placeholder='mm/dd/yyyy'
                icon='calendar'
                iconPosition='left'
                disabled={disabled}
                width={2}
                inverted
                readOnly
            />
        )}
    />
);
export const Time = ({ disabled }) => (
    <Field
        name='invoiceTime'
        render={({ input }) => (
            <Form.Input
                {...input}
                label='Current Time'
                className='TodayDate'
                inverted={true}
                placeholder='00:00:00 PM'
                icon='time'
                iconPosition='left'
                readOnly
                disabled={disabled}
                width={2}
            />
        )}
    />
);
// BUY:
export const BuyGallon = ({ disabled, onFocus }) => (
    <Field
        name='buy'
        parse={normalizeGallon}
        render={({ input }) => (
            <Form.Input
                {...input}
                id='buy'
                label='Buy'
                className='AreaCode'
                inverted
                width={1}
                disabled={disabled}
                onFocus={onFocus}
            />
        )}
    />
);
export const GallonRemain = ({ disabled, error }) => (
    <Field
        name='remain'
        render={({ input }) => (
            <Form.Input
                {...input}
                className='AreaCode'
                label='Remain'
                error={error}
                disabled={disabled}
                width={1}
                inverted
                readOnly
            />
        )}
    />
);
// RENEW:
export const Fee = ({ onKeyDown, onFocus, disabled }) => (
    <Field
        name='fee'
        parse={normalizeFee}
        render={({ input }) => (
            <Form.Input
                {...input}
                disabled={disabled}
                id='renew'
                label='Fee'
                className='AreaCode'
                inverted
                width={1}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
            />
        )}
    />
);
export const RenewAmount = ({ onKeyPress, onFocus, disabled }) => (
    <Field
        name='renew'
        parse={normalizeRenewAmount}
        render={({ input }) => (
            <Form.Input
                {...input}
                label='Gallon'
                className='AreaCode'
                inverted
                disabled={disabled}
                onKeyPress={onKeyPress}
                onFocus={onFocus}
                width={1}
            />
        )}
    />
);
// MISC: Used Fields
export const PreviousGallon = ({ disabled }) => {
    return (
        <Field
            name='previousGallon'
            render={({ input }) => (
                <Form.Input
                    type='hidden'
                    {...input}
                    floated='right'
                    className='AreaCode'
                    readOnly
                    inverted
                    disabled={disabled}
                    width={1}
                />
            )}
        />
    );
};
export const Record = ({ disabled }) => (
    <Field
        name='record_id'
        render={({ input }) => (
            <Form.Input
                {...input}
                label='Invoice'
                className='TodayDate'
                placeholder='xxxxxxx'
                icon='hashtag'
                iconPosition='left'
                disabled={disabled}
                readOnly
                inverted
                width={2}
            />
        )}
    />
);

export const BuyScreenField = {
    Account,
    FirstName,
    LastName,
    AreaCode,
    Buy: BuyGallon,
    Date,
    Fee,
    Remain: GallonRemain,
    Since: MemberSince,
    Phone,
    Previous: PreviousGallon,
    Record,
    Renew: RenewAmount,
    Time,
    Fullname,
};

export default BuyScreenField;
