import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from '../../store';

export const FinalFormField = ({ name }) => {
    const { field } = useContext(StoreContext);
    return (
        <Field
            name={name}
            render={({ input }) => <Form.Input {...field[name](input)} />}
        />
    );
};

export default FinalFormField;