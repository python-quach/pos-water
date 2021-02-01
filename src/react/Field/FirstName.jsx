import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const FirstName = ({ name, placeholder, form, initialValue, values }) => {
    return (
        <Field
            name='firstName'
            render={({ input, meta }) => (
                <Form.Input
                    {...input}
                    className='blueIcon'
                    placeholder={placeholder}
                    focus
                    size='massive'
                    fluid
                    icon='user circle'
                    iconPosition='left'
                    transparent
                    inverted
                    spellCheck='false'
                    onFocus={() => {
                        const { firstName, lastName, phone, account } = values;
                        console.log(values);
                        if (phone || account) {
                            form.reset({ phone: '', account: '' });
                        }
                    }}
                />
            )}
        />
    );
};

export default FirstName;
