import { useEffect } from 'react';
import {
    Form as FinalForm,
    Field as FinalField,
    FormSpy,
} from 'react-final-form';
import { Form } from 'semantic-ui-react';
import Field from '../Field/AddField';
import { OnChange } from 'react-final-form-listeners';

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

const WhenBuyFieldChanges = ({ field, becomes, set, to, reset }) => (
    <FinalField name={set} subscription={{}}>
        {({ input: { onChange } }) => (
            <FormSpy subscription={{}}>
                {() => (
                    <OnChange name={field}>
                        {() => {
                            if (becomes) {
                                onChange(to);
                            } else {
                                onChange(reset);
                            }
                        }}
                    </OnChange>
                )}
            </FormSpy>
        )}
    </FinalField>
);

const AddForm = (props) => {
    const { onSubmit, close, error, date } = props;

    useEffect(() => {
        document.getElementById('account').focus();
    }, []);

    return (
        <FinalForm
            onSubmit={onSubmit}
            // initialValues={initialValues}
            initialValues={{
                account: null,
                phone: null,
                first: null,
                last: null,
                since: date.toLocaleDateString(),
                fee: 0,
                gallon: 0,
                buy: 0,
                remain: 0,
                previous: 0,
                type: 'NEW',
                date: date.toLocaleDateString(),
                time: date.toLocaleTimeString(),
            }}
            render={({ handleSubmit, submitting, values }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <WhenBuyFieldChanges
                            field='gallon'
                            becomes={values.gallon > 0}
                            set='remain'
                            to={parseInt(values.gallon)}
                            reset={0}
                        />
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
