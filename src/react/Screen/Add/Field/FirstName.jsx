import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeName = (value) => {
    if (!value) return value;
    const onlyWords = value.replace(/[^A-Za-z]/g, '');
    return onlyWords.toUpperCase();
};

const FirstName = ({ width }) => {
    return (
        <Field
            name='firstName'
            parse={normalizeName}
            render={({ input }) => (
                <Form.Input
                    {...input}
                    id='firstName'
                    label='First Name'
                    placeholder='First Name'
                    className='Name'
                    inverted
                    width={width}
                />
            )}
        />
    );
};
export default FirstName;
