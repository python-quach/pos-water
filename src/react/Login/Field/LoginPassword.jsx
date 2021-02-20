import { useContext } from 'react';
import { LoginContext } from '../Screen/LoginScreen';
import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Password = () => {
    const { state } = useContext(LoginContext);
    return (
        <Field
            name='password'
            render={({ input, meta }) => (
                <Form.Input
                    {...input}
                    id='password'
                    placeholder='password'
                    className={state.iconColor}
                    type='password'
                    size='massive'
                    icon='lock'
                    iconPosition='left'
                    focus
                    fluid
                    transparent
                    inverted
                />
            )}
        />
    );
};

export default Password;
