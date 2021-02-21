import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const GallonRemain = ({ edited, name, remain }) => (
    <Field
        name={name}
        render={({ input }) => (
            <Form.Input
                {...input}
                className='AreaCode'
                label='Remain'
                error={remain < 0 ? true : false}
                disabled={edited}
                width={1}
                inverted
                readOnly
            />
        )}
    />
);

export default GallonRemain;
