import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

export const Username = ({ className }) => (
    <Field
        name='username'
        render={({ input }) => (
            <Form.Input
                id='username'
                placeholder='username'
                className={className}
                type='text'
                size='massive'
                icon='user circle'
                iconPosition='left'
                autoComplete='off'
                spellCheck='false'
                focus
                fluid
                transparent
                inverted
                name={input.name}
                value={input.value}
                onChange={input.onChange}
            />
        )}
    />
);

export default Username;
