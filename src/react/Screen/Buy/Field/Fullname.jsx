import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

export const Fullname = ({ error }) => (
    <Field
        name='fullname'
        render={({ input }) => (
            <Form.Input
                {...input}
                type='hidden'
                className='Name'
                readOnly
                // error={edit}
                // error={error}
                inverted
            />
        )}
    />
);

export default Fullname;
