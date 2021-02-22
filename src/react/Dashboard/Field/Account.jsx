import { useEffect } from 'react';
import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeAccount = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    // if (onlyNums.length <= 10) return onlyNums;
    if (onlyNums.length <= 9) return onlyNums;

    return onlyNums.slice(0, 9);
};

const Account = ({ form, setErrorMessage, values }) => {
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
            name='account'
            parse={normalizeAccount}
            render={({ input, meta }) => (
                <Form.Input
                    {...input}
                    className='blueIcon'
                    id='account'
                    type='text'
                    placeholder='account #'
                    size='massive'
                    focus
                    fluid
                    icon='credit card'
                    iconPosition='left'
                    transparent
                    spellCheck='false'
                    inverted
                    onFocus={() => {
                        const { account } = values;
                        form.reset({
                            phone: '',
                            account,
                            firstName: '',
                            lastName: '',
                        });
                    }}
                />
            )}
        />
    );
};

export default Account;
