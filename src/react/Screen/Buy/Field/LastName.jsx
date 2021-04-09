import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeName = (value) => {
    if (!value) return value;
    const onlyWords = value.replace(/[^A-Za-z]/g, '');
    return onlyWords.toUpperCase();
};

export const LastName = ({ readOnly, error }) => (
    <Field
        name='lastName'
        parse={normalizeName}
        render={({ input }) => (
            <Form.Input
                {...input}
                label='Last Name'
                className='Name'
                readOnly={readOnly}
                error={error}
                inverted
                width={3}
            />
        )}
    />
);

export default LastName;
