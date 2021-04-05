import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

export const Password = ({ className, reset }) => (
    <Field
        name='password'
        render={({ input }) => (
            <Form.Input
                id='password'
                placeholder='password'
                className={className}
                type='password'
                size='massive'
                icon='lock'
                iconPosition='left'
                focus
                fluid
                transparent
                inverted
                name={input.name}
                value={input.value}
                onChange={(e, { value }) => {
                    reset();
                    return input.onChange(value);
                }}
            />
        )}
    />
);

export default Password;
