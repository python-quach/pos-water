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

export const Phone = () => (
    <Field
        name='phone'
        parse={normalizePhone}
        render={({ input }) => (
            <Form.Input
                id='phone'
                className='blueIcon'
                transparent
                fluid
                focus
                placeholder='xxx-xxx-xxxx'
                icon='whatsapp'
                size='massive'
                iconPosition='left'
                {...input}
            />
        )}
    />
);

export const Account = () => (
    <Field
        name='account'
        render={({ input }) => (
            <Form.Input
                id='phone'
                className='blueIcon'
                size='massive'
                icon='credit card'
                iconPosition='left'
                placeholder='account #'
                transparent
                fluid
                focus
                {...input}
            />
        )}
    />
);

export const FirstName = () => (
    <Field
        name='firstName'
        render={({ input }) => (
            <Form.Input
                id='firstName'
                className='blueIcon'
                size='massive'
                icon='user'
                iconPosition='left'
                transparent
                fluid
                focus
                placeholder='first name'
                {...input}
            />
        )}
    />
);

export const LastName = () => (
    <Field
        name='lastName'
        render={({ input }) => (
            <Form.Input
                {...input}
                id='lastName'
                className='blueIcon'
                size='massive'
                icon='user'
                iconPosition='left'
                transparent
                fluid
                focus
                placeholder='last name'
            />
        )}
    />
);
