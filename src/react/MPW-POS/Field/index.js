import { Field as FinalField } from 'react-final-form';
import { Form } from 'semantic-ui-react';

export const Field = ({ name, normalize, onFocus, onChange }) => {
    return (
        <FinalField
            name={name.id}
            parse={normalize ? normalize : (value) => value}
            render={({ input }) => (
                <Form.Input
                    {...input}
                    {...name}
                    onFocus={(event) => {
                        if (onFocus) onFocus();
                        input.onFocus(event);
                    }}
                    onChange={(_, { value }) => {
                        if (onChange) onChange(input.onChange, value);
                        input.onChange(value);
                    }}
                />
            )}
        />
    );
};

export default Field;
