import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

export const Username = () => (
    <Field
        name='username'
        render={({ input }) => (
            <Form.Input
                id='username'
                // label='Username'
                placeholder='Enter Username'
                {...input}
            />
        )}
    />
);

export const Password = () => (
    <Field
        name='password'
        render={({ input }) => (
            <Form.Input
                type='password'
                id='password'
                // size='massive'
                // label='Password'
                placeholder='Enter Password'
                // icon='lock'
                // iconPosition='left'
                // focus
                // fluid
                // transparent
                {...input}
            />
        )}
    />
);
