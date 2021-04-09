import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeFee = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 7) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};

const Fee = ({ onKeyDown, onFocus, disabled }) => (
    <Field
        name='fee'
        parse={normalizeFee}
        render={({ input }) => (
            <Form.Input
                {...input}
                disabled={disabled}
                id='renew'
                label='Fee'
                className='AreaCode'
                inverted
                width={1}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
            />
        )}
    />
);

export default Fee;
