import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { normalize } from '../Normalize';

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

const normalizeArea = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 2) return onlyNums;
    return `(${onlyNums.slice(0, 3)}) `;
};

const normalizeAccount = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 11) return onlyNums;
    return onlyNums.slice(0, -1);
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

export const TodayDate = ({ edit }) => (
    <Field
        name='date'
        render={({ input }) => (
            <Form.Input
                disabled={edit}
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

export const CurrentTime = ({ edit }) => (
    <Field
        name='time'
        render={({ input }) => (
            <Form.Input
                disabled={edit}
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

export const MemberSince = ({ edit }) => (
    <Field
        name='since'
        render={({ input }) => (
            <Form.Input
                disabled={edit}
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

export const Account = ({ edit }) => (
    <Field
        name='account'
        parse={normalizeAccount}
        render={({ input }) => (
            <Form.Input
                disabled={edit}
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

export const AreaCode = (props) => (
    <Field
        name='area'
        parse={normalizeArea}
        // format={normalizePhone}
        render={({ input }) => (
            <Form.Input
                id='area'
                className='TodayDate'
                label='Area'
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
                width={3}
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
        parse={normalize.name}
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
        parse={normalize.name}
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

export const Buy = ({ edit }) => (
    <Field
        name='buy'
        parse={normalizeGallon}
        render={({ input }) => (
            <Form.Input
                disabled={edit}
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

export const Remain = ({ edit, remain }) => (
    <Field
        name='remain'
        render={({ input }) => (
            <Form.Input
                error={remain <= 0 ? true : false}
                disabled={edit}
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

export const Fee = ({ edit }) => (
    <Field
        name='fee'
        parse={normalizeFee}
        render={({ input }) => (
            <Form.Input
                disabled={edit}
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

export const Renew = ({ edit }) => (
    <Field
        name='gallon'
        parse={normalizeGallon}
        render={({ input }) => (
            <Form.Input
                id='renew'
                disabled={edit}
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
    PhoneNumber,
    FullName,
    Buy,
    Remain,
    Fee,
    Renew,
    AreaCode,
};

export default BuyField;
