import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Phone = ({ edited }) => {
    return (
        <Field
            name='phone'
            render={({ input }) => (
                <Form.Input
                    {...input}
                    id='phone'
                    className='PhoneNumber'
                    label='Phone Number'
                    placeholder='xxx-xxxx'
                    error={!edited ? false : true}
                    readOnly={!edited}
                    inverted
                    width={2}
                />
            )}
        />
    );
};

export default Phone;
