import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const AreaCode = ({ edit }) => {
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
                    error={!edit ? false : true}
                    readOnly={!edit}
                />
            )}
        />
    );
};

export default AreaCode;
