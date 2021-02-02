import { useEffect } from 'react';
import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const LastName = ({ placeholder, setErrorMessage, values, form }) => {
    useEffect(() => {
        const { phone, account, firstName, lastName } = values;
        if (phone || account || firstName || lastName) {
            setErrorMessage((error) => {
                if (error) return false;
            });
        }
    });
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
                        const { phone, account } = values;
                        if (phone || account) {
                            form.reset({ phone: '', account: '' });
                        }
                    }}
                    // onFocus={() => {
                    //     const { firstName, lastName, phone, account } = values;
                    //     console.log(values);
                    //     // form.reset({
                    //     //     phone: '',
                    //     //     account: '',
                    //     //     // firstName,
                    //     //     // lastName,

                    //     //     // lastName,
                    //     //     // phone: '',
                    //     //     // account: '',
                    //     // });
                    // }}
                />
            )}
        />
    );
};

export default LastName;
