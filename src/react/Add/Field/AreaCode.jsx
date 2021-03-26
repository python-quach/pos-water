import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeAreaCode = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 4) return onlyNums;
    return onlyNums.slice(0, 3);
};

const AreaCode = ({ width }) => {
    return (
        <Field
            name='areaCode'
            parse={normalizeAreaCode}
            render={({ input, meta }) => (
                <Form.Input
                    {...input}
                    id='areaCode'
                    className='AreaCode'
                    label='Code'
                    inverted
                    placeholder='xxx'
                    width={width}
                />
            )}
        />
    );
};

export default AreaCode;
