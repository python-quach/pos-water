import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const LastName = ({ name, placeholder, form, initialValue, values }) => {
    return (
        <Field
            name='lastName'
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
                        // form.reset({
                        //     phone: '',
                        //     account: '',
                        //     // firstName,
                        //     // lastName,

                        //     // lastName,
                        //     // phone: '',
                        //     // account: '',
                        // });
                    }}
                />
            )}
        />
    );
};

export default LastName;
