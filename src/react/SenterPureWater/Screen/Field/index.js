import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { normalize } from '../../Normalize';

export const Username = ({ clearError }) => (
    <Field
        name='username'
        render={({ input }) => (
            <Form.Input
                id='username'
                className='blueIcon'
                size='massive'
                icon='user'
                transparent
                iconPosition='left'
                fluid
                focus
                placeholder='username'
                name={input.name}
                value={input.value}
                onChange={(e) => clearError(e, input)}
            />
        )}
    />
);

export const AdminPassword = ({ setAdminPassword }) => (
    <Form.Input
        size='massive'
        name='password'
        type='password'
        placeholder='enter password'
        onChange={(event, data) => {
            event.preventDefault();
            setAdminPassword(data.value);
        }}
    />
);

export const Password = ({ clearError }) => (
    <Field
        name='password'
        render={({ input }) => (
            <Form.Input
                id='password'
                className='blueIcon'
                placeholder='password'
                type='password'
                icon='user'
                transparent
                iconPosition='left'
                fluid
                focus
                size='massive'
                name={input.name}
                value={input.value}
                onChange={(e) => clearError(e, input)}
            />
        )}
    />
);

export const Phone = () => (
    <Field
        name='phone'
        parse={normalize.phone}
        render={({ input: { name, value, onChange } }) => (
            <Form.Input
                id='phone'
                className='blueIcon'
                placeholder='xxx-xxx-xxxx'
                size='massive'
                icon='whatsapp'
                iconPosition='left'
                transparent
                focus
                fluid
                name={name}
                value={value}
                onChange={onChange}
            />
        )}
    />
);

export const Account = () => (
    <Field
        name='account'
        parse={normalize.account}
        render={({ input: { name, value, onChange } }) => (
            <Form.Input
                id='account'
                className='blueIcon'
                placeholder='account #'
                size='massive'
                icon='credit card'
                iconPosition='left'
                transparent
                fluid
                focus
                name={name}
                value={value}
                onChange={onChange}
            />
        )}
    />
);

export const FirstName = () => (
    <Field
        name='first'
        parse={normalize.name}
        render={({ input: { name, value, onChange } }) => (
            <Form.Input
                id='firstName'
                className='blueIcon'
                size='massive'
                icon='user'
                iconPosition='left'
                transparent
                fluid
                focus
                spellCheck='false'
                placeholder='first name'
                name={name}
                value={value}
                onChange={onChange}
            />
        )}
    />
);

export const LastName = () => (
    <Field
        name='last'
        parse={normalize.name}
        render={({ input: { name, value, onChange } }) => (
            <Form.Input
                id='lastName'
                className='blueIcon'
                size='massive'
                icon='user'
                iconPosition='left'
                transparent
                fluid
                focus
                spellCheck='false'
                placeholder='last name'
                name={name}
                value={value}
                onChange={onChange}
            />
        )}
    />
);

/** ADD FORM FIELDS */
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

export const AddAccount = ({ error }) => (
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

export const AddPhone = () => (
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
export const AddFirstName = () => (
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
export const AddLastName = () => (
    <Field
        name='last'
        parse={normalize.name}
        render={({ input }) => (
            <Form.Input
                id='lastName'
                label='Last Name'
                className='TodayDate'
                placeholder='Last Name'
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

const SenterField = {
    Username,
    Password,
    Phone,
    Account,
    FirstName,
    LastName,
    Date,
    Time,
    AddAccount,
    AddPhone,
    AddFirstName,
    AddLastName,
    Fee,
    Gallon,
    AdminPassword,
};

export default SenterField;
