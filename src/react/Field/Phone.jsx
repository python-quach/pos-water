import { useEffect } from 'react';
import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizePhone = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6) return onlyNums;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}`;
};

const Phone = ({ form, setErrorMessage, values }) => {
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
            name='phone'
            parse={normalizePhone}
            render={({ input, meta }) => (
                <Form.Input
                    className='blueIcon'
                    id='phone'
                    {...input}
                    placeholder='xxx-xxxx'
                    focus
                    type='text'
                    size='massive'
                    icon='whatsapp'
                    fluid
                    iconPosition='left'
                    transparent
                    onFocus={() => {
                        const { phone } = values;
                        form.reset({
                            phone,
                            account: '',
                            firstName: '',
                            lastName: '',
                        });
                    }}
                />
            )}
        />
    );
};
export default Phone;
