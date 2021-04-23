import { Field as FinalField } from 'react-final-form';
import { Form as SemanticForm } from 'semantic-ui-react';

export const Field = ({ name, reset, onFocus, normalize }) => (
    <FinalField
        name={name.id}
        parse={normalize ? normalize[name.id] : (value) => value}
        render={({ input }) => (
            <SemanticForm.Input
                {...input}
                {...name}
                onFocus={onFocus}
                onChange={(_, { value }) => {
                    if (reset) reset();
                    input.onChange(value);
                }}
            />
        )}
    />
);

export default Field;
