import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeRenew = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 5) {
        return parseInt(onlyNums);
    } else {
        return onlyNums.substring(0, onlyNums.length - 1);
    }
};

const Renew = ({ width }) => {
    return (
        <Field
            name='renew'
            parse={normalizeRenew}
            render={({ input }) => (
                <Form.Input
                    {...input}
                    label='Gallon'
                    className='AreaCode'
                    inverted={true}
                    width={1}
                />
            )}
        />
    );
};

export default Renew;
