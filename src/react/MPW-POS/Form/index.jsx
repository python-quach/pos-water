import { Form as FinalForm } from 'react-final-form';
import { Form } from 'semantic-ui-react';

export const CustomForm = ({ render, onSubmit }) => (
    <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit, form, values }) => (
            <Form onSubmit={handleSubmit}>{render({ form, values })}</Form>
        )}
    />
);

export default CustomForm;
