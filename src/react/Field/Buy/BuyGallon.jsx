import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeGallon = (value) => {
    if (!value) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    return parseInt(onlyNums);
};

const BuyGallon = ({ disable, setDisable, edit }) => {
    return (
        <Field
            name='buy'
            parse={normalizeGallon}
            render={({ input }) => (
                <Form.Input
                    {...input}
                    id='buy'
                    label='Buy'
                    className='AreaCode'
                    inverted
                    width={1}
                    disabled={edit}
                    onFocus={() => {
                        if (disable) {
                            setDisable(false);
                        }
                    }}
                />
            )}
        />
    );
};

export default BuyGallon;
