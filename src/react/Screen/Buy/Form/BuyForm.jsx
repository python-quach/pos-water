import { Form } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';

const BuyForm = ({
    onSubmit,
    initialValues,
    updateForm,
    edit,
    change,
    field,
    button,
}) => {
    return (
        <FinalForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            initialValuesEqual={() => true}
            render={({ handleSubmit, form, values }) => (
                <Form
                    size='huge'
                    onSubmit={(event) => {
                        handleSubmit(event).then(() => {
                            updateForm(form, values);
                            document.getElementById('buy').focus();
                        });
                    }}>
                    <Form.Group>
                        {change.buy(values)}
                        {field.account}
                        {field.since}
                        {field.areaCode}
                        {field.phone}
                        {field.fullname}
                        {field.first}
                        {field.last}
                        {!edit && button.edit}
                        {edit && button.cancel(form, values)}
                        {edit && button.save(form, values)}
                        {field.date}
                        {field.time}
                    </Form.Group>
                    <Form.Group>
                        <Form.Input type='hidden' width={13} />
                        {field.buy(form)}
                        {field.remain(values.remain)}
                        {button.buy(values)}
                    </Form.Group>
                    <Form.Group>
                        <Form.Input type='hidden' width={13} />
                        {field.fee(form, values)}
                        {field.gallon(form, values)}
                        {button.renew(values)}
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default BuyForm;
