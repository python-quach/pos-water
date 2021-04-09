import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const GallonRemain = ({ disabled, error }) => (
    <Field
        name='remain'
        render={({ input }) => (
            <Form.Input
                {...input}
                className='AreaCode'
                label='Remain'
                error={error}
                disabled={disabled}
                width={1}
                inverted
                readOnly
            />
        )}
    />
);

export default GallonRemain;
