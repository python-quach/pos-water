import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeGallon = (value) => {
    if (!value) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    return parseInt(onlyNums);
};

const BuyGallon = ({ disable, setDisable }) => {
    return (
        <Field
            name='gallonBuy'
            parse={normalizeGallon}
            render={({ input }) => (
                <Form.Input
                    {...input}
                    id='buy'
                    label='Buy'
                    className='AreaCode'
                    inverted
                    width={1}
                    onFocus={() => {
                        console.log('buy');
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
