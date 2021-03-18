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

export const Phone = ({ form }) => (
    <Field
        name='phone'
        parse={normalize.phone}
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
                onFocus={() => {
                    form.reset({
                        account: '',
                        first: '',
                        last: '',
                    });
                }}
            />
        )}
    />
);

export const Account = ({ form }) => (
    <Field
        name='account'
        parse={normalize.account}
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
                onFocus={() => {
                    form.reset({
                        phone: '',
                        first: '',
                        last: '',
                    });
                }}
            />
        )}
    />
);

export const FirstName = ({ form, values }) => (
    <Field
        name='first'
        parse={normalize.name}
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
                spellCheck='false'
                placeholder='first name'
                {...input}
                onFocus={() => {
                    form.reset({
                        phone: '',
                        account: '',
                        first: values.first,
                        last: values.last,
                    });
                }}
            />
        )}
    />
);

export const LastName = ({ form, values }) => (
    <Field
        name='last'
        parse={normalize.name}
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
                spellCheck='false'
                placeholder='last name'
                onFocus={() => {
                    form.reset({
                        phone: '',
                        account: '',
                        first: values.first,
                        last: values.last,
                    });
                }}
            />
        )}
    />
);
