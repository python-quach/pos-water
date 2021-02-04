import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const CurrentGallon = ({ edited }) => {
    return (
        <Field
            name='currentGallon'
            render={({ input }) => (
                <Form.Input
                    {...input}
                    floated='right'
                    label='Current'
                    className='AreaCode'
                    readOnly
                    inverted
                    disabled={edited}
                    // disabled={props.disableBuyInput || props.edited}
                    // value={props.currentGallon < 0 ? 0 : props.currentGallon}
                    width={1}
                />
            )}
        />
    );
};

export default CurrentGallon;
