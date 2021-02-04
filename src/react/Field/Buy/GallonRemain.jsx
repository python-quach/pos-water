import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const GallonRemain = ({ edited }) => (
    <Field
        name='remain'
        render={({ input }) => (
            <Form.Input
                {...input}
                className='AreaCode'
                label='Remain'
                readOnly
                width={1}
                // className={
                //     props.gallonBuy >= props.currentGallon
                //         ? 'Remain'
                //         : 'AreaCode'
                // }
                inverted
                disabled={edited}
                // value={props.gallonAfterBuy || 0}
            />
        )}
    />
);

export default GallonRemain;
