import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeGallon = (value) => {
    if (!value) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 6) return parseInt(onlyNums);
    return parseInt(onlyNums.slice(0, 5));
};

const BuyGallon = ({ disabled, onFocus }) => (
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
                disabled={disabled}
                onFocus={onFocus}
            />
        )}
    />
);

export default BuyGallon;
