import { useEffect } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import Field from '../Field/AddField';

const initialValues = {
    account: null,
    phone: null,
    first: null,
    last: null,
    since: new Date().toLocaleDateString(),
    fee: 0,
    gallon: 0,
    buy: 0,
    remain: 0,
    previous: 0,
    type: 'NEW',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
};

const AddForm = (props) => {
    const { onSubmit, close, error } = props;

    useEffect(() => {
        document.getElementById('account').focus();
    }, []);

    return (
        <FinalForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit, submitting, values }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Field.Date />
                        <Field.Time />
                        <Field.Account error={error} />
                        <Field.Phone />
                        <Field.FirstName />
                        <Field.LastName />
                        <Field.Fee />
                        <Field.Gallon />
                        <Form.Button
                            disabled={
                                !values.phone ||
                                values.phone.length < 14 ||
                                !values.account ||
                                !values.first ||
                                !values.last ||
                                !values.fee ||
                                !values.gallon ||
                                submitting
                            }
                            type='submit'
                            loading={submitting}
                            primary
                            fluid
                            style={{ marginTop: '30px' }}
                            size='huge'
                            content='Add'
                        />
                        <Form.Button
                            content='Cancel'
                            style={{ marginTop: '30px' }}
                            size='huge'
                            fluid
                            negative
                            onClick={close}
                        />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default AddForm;
