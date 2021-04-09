import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeName = (value) => {
    if (!value) return value;
    const onlyWords = value.replace(/[^A-Za-z]/g, '');
    return onlyWords.toUpperCase();
};

export const FirstName = ({ readOnly, error }) => (
    <Field
        name='firstName'
        parse={normalizeName}
        render={({ input }) => (
            <Form.Input
                {...input}
                id='firstName'
                label='First Name'
                className='Name'
                readOnly={readOnly}
                error={error}
                inverted
                width={3}
            />
        )}
    />
);

export default FirstName;
