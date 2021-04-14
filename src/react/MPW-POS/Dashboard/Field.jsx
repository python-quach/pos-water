import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

// HELPERS
export const normalizePhone = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6) return onlyNums;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}`;
};
export const normalizeAccount = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 9) return onlyNums;
    return onlyNums.slice(0, 9);
};

// FIELD
export const PhoneField = ({ reset, onFocus }) => (
    <Field
        name='phone'
        parse={normalizePhone}
        render={({ input }) => (
            <Form.Input
                className='blueIcon'
                id='phone'
                placeholder='xxx-xxxx'
                focus
                type='text'
                size='massive'
                icon='whatsapp'
                fluid
                iconPosition='left'
                transparent
                value={input.value}
                name={input.name}
                onFocus={onFocus}
                onChange={(e, { value }) => {
                    reset();
                    return input.onChange(value);
                }}
            />
        )}
    />
);
export const AccountField = ({ onFocus, reset }) => (
    <Field
        name='account'
        parse={normalizeAccount}
        render={({ input }) => (
            <Form.Input
                className='blueIcon'
                id='account'
                type='text'
                placeholder='account #'
                size='massive'
                focus
                fluid
                icon='credit card'
                iconPosition='left'
                transparent
                spellCheck='false'
                inverted
                value={input.value}
                name={input.name}
                onFocus={onFocus}
                onChange={(e, { value }) => {
                    reset();
                    return input.onChange(value);
                }}
            />
        )}
    />
);
export const FirstNameField = ({ onFocus, reset }) => (
    <Field
        name='firstName'
        render={({ input }) => (
            <Form.Input
                placeholder='first name'
                className='blueIcon'
                icon='user circle'
                iconPosition='left'
                size='massive'
                spellCheck='false'
                fluid
                focus
                transparent
                inverted
                value={input.value}
                name={input.name}
                onFocus={onFocus}
                onChange={(e, { value }) => {
                    reset();
                    return input.onChange(value);
                }}
            />
        )}
    />
);
export const LastNameField = ({ onFocus, reset }) => (
    <Field
        name='lastName'
        render={({ input }) => (
            <Form.Input
                placeholder='last name'
                className='blueIcon'
                icon='user circle'
                iconPosition='left'
                size='massive'
                spellCheck='false'
                fluid
                focus
                transparent
                inverted
                value={input.value}
                name={input.name}
                onFocus={onFocus}
                onChange={(e, { value }) => {
                    reset();
                    return input.onChange(value);
                }}
            />
        )}
    />
);

const DashboardField = {
    Phone: PhoneField,
    Account: AccountField,
    FirstName: FirstNameField,
    LastName: LastNameField,
};

export default DashboardField;
