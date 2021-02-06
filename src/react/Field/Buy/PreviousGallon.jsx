import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const PreviousGallon = ({ edited, name }) => {
    return (
        <Field
            // name='currentGallon'
            // name='previousGallon'
            name={name}
            render={({ input }) => (
                <Form.Input
                    {...input}
                    floated='right'
                    // label='Current'
                    label='Previous'
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

export default PreviousGallon;
