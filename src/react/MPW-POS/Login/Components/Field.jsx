import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from '../../store';

// FIELD
export const UsernameField = () => {
    const { helpers } = useContext(StoreContext);
    return (
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
                    icon='user circle'
                    iconPosition='left'
                    autoComplete='off'
                    spellCheck='false'
                    inverted
                    transparent
                    fluid
                    focus
                    onChange={(_, { value }) =>
                        helpers.field.resetError(input, value)
                    }
                />
            )}
        />
    );
};

export const PasswordField = () => {
    const { helpers } = useContext(StoreContext);
    return (
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
                    inverted
                    transparent
                    fluid
                    focus
                    onChange={(_, { value }) =>
                        helpers.field.resetError(input, value)
                    }
                />
            )}
        />
    );
};

const LoginScreenField = {
    Username: UsernameField,
    Password: PasswordField,
};

export default LoginScreenField;
