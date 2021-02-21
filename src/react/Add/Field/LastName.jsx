import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeName = (value) => {
    if (!value) return value;
    const onlyWords = value.replace(/[^A-Za-z]/g, '');
    return onlyWords.toUpperCase();
};

const LastName = ({ width }) => {
    return (
        <Field
            name='lastName'
            parse={normalizeName}
            render={({ input }) => (
                <Form.Input
                    {...input}
                    id='lastName'
                    label='Last Name'
                    placeholder='Last Name'
                    className='Name'
                    inverted
                    width={width}
                />
            )}
        />
    );
};

export default LastName;
