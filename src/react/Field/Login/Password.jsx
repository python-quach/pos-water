import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Password = ({ iconColor }) => (
    <Field
        name='password'
        render={({ input, meta }) => (
            <Form.Input
                {...input}
                id='password'
                placeholder='password'
                className={iconColor}
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

export default Password;
