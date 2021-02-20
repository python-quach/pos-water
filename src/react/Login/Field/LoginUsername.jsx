import { useContext } from 'react';
import { LoginContext } from '../Screen/LoginScreen';
import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Username = () => {
    const { state } = useContext(LoginContext);
    return (
        <Field
            name='username'
            render={({ input }) => (
                <Form.Input
                    {...input}
                    id='username'
                    placeholder='username'
                    className={state.iconColor}
                    type='text'
                    size='massive'
                    icon='user circle'
                    iconPosition='left'
                    focus
                    fluid
                    transparent
                    inverted
                    autoComplete='off'
                    spellCheck='false'
                />
            )}
        />
    );
};

export default Username;
