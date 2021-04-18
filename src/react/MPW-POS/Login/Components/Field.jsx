import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from '../../store';

// FIELD
export const UsernameField = () => {
    const { setError } = useContext(StoreContext);

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
                    onChange={(_, { value }) => {
                        setError(false);
                        return input.onChange(value);
                    }}
                />
            )}
        />
    );
};
export const PasswordField = () => {
    const { setError } = useContext(StoreContext);

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
                    focus
                    inverted
                    transparent
                    fluid
                    onChange={(_, { value }) => {
                        setError(false);
                        return input.onChange(value);
                    }}
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
