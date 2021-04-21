import { useContext } from 'react';
import { StoreContext } from '../store';
import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

export const FinalFormField = ({ name, form }) => {
    const { field, helpers } = useContext(StoreContext);
    return (
        <Field
            name={name}
            parse={
                helpers.normalize[name]
                    ? helpers.normalize[name]
                    : (value) => value
            }
            render={({ input }) => <Form.Input {...field[name](input, form)} />}
        />
    );
};

export default FinalFormField;
