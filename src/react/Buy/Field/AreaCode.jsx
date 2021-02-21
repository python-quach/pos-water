import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeAreaCode = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 4) return onlyNums;
    return onlyNums.slice(0, 3);
};

const AreaCode = ({ edit, name }) => {
    const required = (value) => (value ? undefined : 'Required');
    const mustBeNumber = (value) =>
        isNaN(value) ? 'Must be a number' : undefined;
    const minValue = (min) => (value) =>
        isNaN(value) || value >= min
            ? undefined
            : `Should be greater than ${min}`;
    const composeValidators = (...validators) => (value) =>
        validators.reduce(
            (error, validator) => error || validator(value),
            undefined
        );

    return (
        <Field
            name={name}
            parse={normalizeAreaCode}
            validate={composeValidators(required, mustBeNumber, minValue(3))}
            render={({ input, meta }) => (
                <Form.Input
                    {...input}
                    id='areaCode'
                    className='AreaCode'
                    label='Area Code'
                    inverted
                    placeholder='xxx'
                    width={1}
                    error={!edit ? false : true}
                    readOnly={!edit}
                />
            )}
        />
    );
};

export default AreaCode;
