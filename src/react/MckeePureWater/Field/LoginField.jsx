import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

export const Username = () => (
    <Field
        name='username'
        render={({ input }) => (
            <Form.Input
                id='username'
                label='Username'
                placeholder='Enter Username'
                {...input}
            />
        )}
    />
);

export const Password = () => (
    <Field
        name='password'
        type='password'
        render={({ input }) => (
            <Form.Input
                id='password'
                label='Password'
                placeholder='Enter Password'
                {...input}
            />
        )}
    />
);
