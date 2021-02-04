import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const AreaCode = ({ edited }) => {
    return (
        <Field
            name='areaCode'
            render={({ input }) => (
                <Form.Input
                    {...input}
                    id='areaCode'
                    className='AreaCode'
                    label='Area Code'
                    inverted
                    placeholder='xxx'
                    width={1}
                    error={!edited ? false : true}
                    readOnly={!edited}
                />
            )}
        />
    );
};

export default AreaCode;
