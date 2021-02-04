import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeFee = (value) => {
    if (!value) return 0;

    const onlyNums = value.replace(/[^\d]/g, '');

    if (onlyNums.length < 7) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};

const Fee = ({ disable, setDisable }) => {
    return (
        <Field
            name='renewalFee'
            parse={normalizeFee}
            render={({ input }) => (
                <Form.Input
                    {...input}
                    id='renew'
                    label='Renew Fee'
                    className='AreaCode'
                    inverted
                    width={1}
                    onFocus={() => {
                        console.log('renew');
                        setDisable(true);
                    }}
                />
            )}
        />
    );
};

export default Fee;
