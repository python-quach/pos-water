import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

export const Phone = () => (
    <Field
        name='phone'
        render={({ input }) => (
            <Form.Input
                {...input}
                id='phone'
                label='Phone'
                placeholder='xxx-xxxx'
            />
        )}
    />
);

export const Account = () => (
    <Field
        name='account'
        render={({ input }) => (
            <Form.Input
                {...input}
                id='phone'
                label='Account'
                placeholder='xxxxxxx'
            />
        )}
    />
);

export const FirstName = () => (
    <Field
        name='firstName'
        render={({ input }) => (
            <Form.Input
                {...input}
                id='firstName'
                label='First Name'
                placeholder='First Name'
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
                label='Last Name'
                placeholder='Last Name'
            />
        )}
    />
);
