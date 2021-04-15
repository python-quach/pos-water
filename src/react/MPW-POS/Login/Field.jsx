import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

// FIELD
export const UsernameField = ({ onChange }) => (
    <Field
        name='username'
        type='text'
        render={({ input }) => (
            <Form.Input
                {...input}
                id='username'
                placeholder='username'
                className='blueIcon'
                size='massive'
                focus
                icon='user circle'
                iconPosition='left'
                autoComplete='off'
                spellCheck='false'
                inverted
                transparent
                fluid
                onChange={(_, { value }) => {
                    onChange(value, input);
                }}
            />
        )}
    />
);
export const PasswordField = ({ onChange }) => (
    <Field
        name='password'
        type='password'
        render={({ input }) => (
            <Form.Input
                {...input}
                id='password'
                placeholder='password'
                className='blueIcon'
                size='massive'
                icon='lock'
                iconPosition='left'
                autoComplete='off'
                spellCheck='false'
                focus
                inverted
                transparent
                fluid
                onChange={(_, { value }) => {
                    onChange(value, input);
                }}
            />
        )}
    />
);

const LoginScreenField = {
    Username: UsernameField,
    Password: PasswordField,
};

export default LoginScreenField;
