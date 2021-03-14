import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { normalize } from '../Normalize';

export const Date = () => (
    <Field
        name='date'
        render={({ input }) => (
            <Form.Input
                className='TodayDate'
                id='data'
                label='Date'
                placeholder='mm/dd/yyyy'
                {...input}
                size='huge'
                icon='calendar'
                iconPosition='left'
                inverted
                readOnly
                width={2}
            />
        )}
    />
);

export const Time = () => (
    <Field
        name='time'
        render={({ input }) => (
            <Form.Input
                id='time'
                label='Time'
                className='TodayDate'
                placeholder='xx:xx:xx'
                {...input}
                size='huge'
                icon='calendar'
                iconPosition='left'
                inverted
                readOnly
                width={2}
            />
        )}
    />
);

export const Account = ({ error }) => (
    <Field
        name='account'
        parse={normalize.account}
        render={({ input }) => (
            <Form.Input
                error={error ? error : false}
                id='account'
                className='TodayDate'
                label='Account'
                placeholder='xxxxxxx'
                {...input}
                size='huge'
                icon='hashtag'
                iconPosition='left'
                inverted
                width={2}
            />
        )}
    />
);

export const Phone = () => (
    <Field
        name='phone'
        parse={normalize.phone}
        render={({ input }) => (
            <Form.Input
                id='phone'
                label='Phone Number'
                className='TodayDate'
                placeholder='xxx-xxx-xxxx'
                {...input}
                size='huge'
                icon='phone'
                iconPosition='left'
                inverted
                width={2}
            />
        )}
    />
);
export const FirstName = () => (
    <Field
        name='first'
        parse={normalize.name}
        render={({ input }) => (
            <Form.Input
                id='firstName'
                label='First Name'
                className='TodayDate'
                placeholder='First Name'
                {...input}
                size='huge'
                icon='user'
                iconPosition='left'
                inverted
                width={2}
            />
        )}
    />
);
export const LastName = () => (
    <Field
        name='last'
        parse={normalize.name}
        render={({ input }) => (
            <Form.Input
                id='lastName'
                label='Last Name'
                className='TodayDate'
                placeholder='Enter Last Name'
                {...input}
                size='huge'
                icon='user'
                iconPosition='left'
                inverted
                width={2}
            />
        )}
    />
);
export const Fee = () => (
    <Field
        name='fee'
        parse={normalize.fee}
        render={({ input }) => (
            <Form.Input
                id='fee'
                className='TodayDate'
                label='Fee'
                {...input}
                size='huge'
                inverted
                width={1}
            />
        )}
    />
);

export const Gallon = () => (
    <Field
        name='gallon'
        parse={normalize.gallon}
        render={({ input }) => (
            <Form.Input
                id='gallon'
                label='Gallon'
                className='TodayDate'
                {...input}
                size='huge'
                inverted
                width={1}
            />
        )}
    />
);

const AddField = {
    Date,
    Time,
    Account,
    Phone,
    FirstName,
    LastName,
    Fee,
    Gallon,
};

export default AddField;
