import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Name = ({ name, placeholder, form, reset }) => (
    <Field
        name={name}
        render={({ input }) => (
            <Form.Input
                placeholder={placeholder}
                className='blueIcon'
                icon='user circle'
                iconPosition='left'
                size='massive'
                spellCheck='false'
                fluid
                focus
                transparent
                inverted
                value={input.value}
                name={input.name}
                onChange={(e, { value }) => {
                    reset();
                    return input.onChange(value);
                }}
                onFocus={() => {
                    form.batch(() => {
                        form.change('phone', undefined);
                        form.change('account', undefined);
                    });
                }}
            />
        )}
    />
);

export default Name;
