import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizePhone = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 6) return onlyNums;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}`;
};

const Phone = ({ error, readOnly }) => {
    return (
        <Field
            name='phone'
            parse={normalizePhone}
            render={({ input }) => (
                <Form.Input
                    {...input}
                    id='phone'
                    className='PhoneNumber'
                    label='Phone Number'
                    placeholder='xxx-xxxx'
                    error={error}
                    readOnly={readOnly}
                    inverted
                    width={2}
                />
            )}
        />
    );
};

export default Phone;
