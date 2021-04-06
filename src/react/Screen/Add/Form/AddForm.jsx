import { Form } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';

const AddForm = ({ onSubmit, initialValues, field, button }) => (
    <FinalForm
        initialValuesEqual={() => true}
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, values }) => (
            <Form size='huge' onSubmit={handleSubmit}>
                <Form.Group>
                    {field.date}
                    {field.time}
                    {field.account}
                    {field.areaCode}
                    {field.phone}
                    {field.firstName}
                    {field.lastName}
                    {field.fee}
                    {field.renew}
                    {button.done(values)}
                    {button.cancel}
                </Form.Group>
            </Form>
        )}
    />
);
export default AddForm;
