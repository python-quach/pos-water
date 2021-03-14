import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizePhone = (value) => {
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

// const normalizePhone = (value) => {
//     if (!value) return value;
//     const onlyNums = value.replace(/[^\d]/g, '');
//     if (onlyNums.length <= 3) return onlyNums;
//     if (onlyNums.length <= 7)
//         return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 7)}`;
//     return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(
//         6,
//         10
//     )}`;
// };

const normalizeAccount = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 11) return onlyNums;
    return onlyNums.slice(0, -1);
};

const normalizeName = (value) => {
    if (!value) return value;
    const onlyLetters = value.replace(/[^A-Za-z]/g, '');
    return onlyLetters.charAt(0).toUpperCase() + onlyLetters.slice(1);
};

const normalizeFee = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 5) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};

const normalizeGallon = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 5) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};

export const TodayDate = () => (
    <Field
        name='date'
        render={({ input }) => (
            <Form.Input
                className='TodayDate'
                id='date'
                label='Today Date'
                size='huge'
                inverted
                iconPosition='left'
                icon='calendar'
                readOnly
                {...input}
                width={2}
            />
        )}
    />
);

export const CurrentTime = () => (
    <Field
        name='time'
        render={({ input }) => (
            <Form.Input
                className='TodayDate'
                width={2}
                id='time'
                label='Current Time'
                size='huge'
                icon='calendar'
                iconPosition='left'
                inverted
                readOnly
                {...input}
            />
        )}
    />
);

export const MemberSince = () => (
    <Field
        name='since'
        render={({ input }) => (
            <Form.Input
                className='TodayDate'
                id='memberSince'
                label='Member Since'
                size='huge'
                icon='calendar'
                iconPosition='left'
                inverted
                readOnly
                width={2}
                {...input}
            />
        )}
    />
);

export const Account = () => (
    <Field
        name='account'
        parse={normalizeAccount}
        render={({ input }) => (
            <Form.Input
                id='account'
                size='huge'
                className='TodayDate'
                label='Account'
                {...input}
                icon='hashtag'
                iconPosition='left'
                inverted
                readOnly
                width={2}
            />
        )}
    />
);

export const PhoneNumber = (props) => (
    <Field
        name='phone'
        parse={normalizePhone}
        format={normalizePhone}
        render={({ input }) => (
            <Form.Input
                id='phone'
                className='TodayDate'
                label='Phone Number'
                size='huge'
                width={2}
                icon='phone'
                iconPosition='left'
                inverted
                error={props.edit}
                readOnly={props.edit ? false : true}
                {...input}
            />
        )}
    />
);

export const FullName = (props) => (
    <Field
        name='fullname'
        render={({ input }) => (
            <Form.Input
                id='fullname'
                className='TodayDate'
                label='Customer Name'
                size='huge'
                icon='user'
                iconPosition='left'
                inverted
                // readOnly
                error={props.edit}
                readOnly={props.edit ? false : true}
                {...input}
            />
        )}
    />
);

export const FirstName = (props) => (
    <Field
        name='first'
        parse={normalizeName}
        render={({ input }) => (
            <Form.Input
                id='first'
                className='TodayDate'
                label='First Name'
                size='huge'
                icon='user'
                iconPosition='left'
                inverted
                error={props.edit}
                readOnly={props.edit ? false : true}
                {...input}
                width={2}
            />
        )}
    />
);

export const LastName = (props) => (
    <Field
        name='last'
        parse={normalizeName}
        render={({ input }) => (
            <Form.Input
                id='last'
                className='TodayDate'
                label='Last Name'
                size='huge'
                {...input}
                icon='user'
                iconPosition='left'
                inverted
                error={props.edit}
                readOnly={props.edit ? false : true}
                width={2}
            />
        )}
    />
);

export const Buy = () => (
    <Field
        name='buy'
        parse={normalizeGallon}
        render={({ input }) => (
            <Form.Input
                className='TodayDate'
                id='buy'
                label='Buy'
                {...input}
                inverted
                size='huge'
                width={1}
            />
        )}
    />
);

export const Remain = () => (
    <Field
        name='remain'
        render={({ input }) => (
            <Form.Input
                className='TodayDate'
                inverted
                id='remain'
                label='Remain'
                readOnly
                {...input}
                size='huge'
                width={1}
            />
        )}
    />
);

export const Fee = () => (
    <Field
        name='fee'
        parse={normalizeFee}
        render={({ input }) => (
            <Form.Input
                className='TodayDate'
                id='fee'
                label='Fee'
                {...input}
                size='huge'
                inverted
                width={1}
            />
        )}
    />
);

export const Renew = () => (
    <Field
        name='gallon'
        parse={normalizeGallon}
        render={({ input }) => (
            <Form.Input
                id='renew'
                className='TodayDate'
                label='Renew'
                {...input}
                size='huge'
                inverted
                width={1}
            />
        )}
    />
);

const BuyField = {
    TodayDate,
    CurrentTime,
    MemberSince,
    // AreaCode,
    PhoneNumber,
    FullName,
    Buy,
    Remain,
    Fee,
    Renew,
};

export default BuyField;
