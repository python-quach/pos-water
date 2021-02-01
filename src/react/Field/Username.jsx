import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Username = ({ iconColor }) => (
    <Field
        name='username'
        render={({ input, meta }) => (
            <Form.Input
                {...input}
                id='username'
                placeholder='username'
                className={iconColor}
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

export default Username;
