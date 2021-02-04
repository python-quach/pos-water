import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeRenewAmount = (value) => {
    if (!value) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');

    if (onlyNums.length < 7) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};

const RenewAmount = () => {
    return (
        <Field
            name='renewalAmount'
            parse={normalizeRenewAmount}
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
export default RenewAmount;
