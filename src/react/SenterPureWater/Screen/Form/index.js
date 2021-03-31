import { useEffect } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import { OnChange } from 'react-final-form-listeners';
import { Field as FinalField, FormSpy } from 'react-final-form';

export const LoginForm = ({ onSubmit, field, button }) => (
    <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
            <Form
                size='large'
                onSubmit={(event) => {
                    handleSubmit(event).then(form.reset);
                }}>
                {field.username}
                {field.password}
                <Divider hidden />
                {button.login}
                <Form.Group widths={2}>
                    {button.close}
                    {button.backup}
                </Form.Group>
            </Form>
        )}
    />
);

export const FindForm = ({ onSubmit, field, button }) => (
    <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit, form, values }) => (
            <Form
                size='large'
                onSubmit={(event) => {
                    handleSubmit(event).then(form.reset);
                }}>
                {field.phone}
                {field.account}
                {field.firstName}
                {field.lastName}
                <Divider hidden />
                {button.find(values)}
                {button.add}
                {button.report}
                {button.logout}
            </Form>
        )}
    />
);

export const WhenBuyFieldChanges = ({ field, becomes, set, to, reset }) => (
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

export const AddForm = ({ onSubmit, field, button }) => {
    const date = new Date();

    useEffect(() => {
        document.getElementById('account').focus();
    }, []);

    return (
        <FinalForm
            initialValuesEqual={() => true}
            onSubmit={onSubmit}
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
                        {field.date}
                        {field.time}
                        {field.account}
                        {field.phone}
                        {field.firstName}
                        {field.lastName}
                        {field.fee}
                        {field.gallon}
                        {button.add(values, submitting)}
                        {button.cancel}
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export const DeleteForm = ({ field, button, onSubmit }) => (
    <Form onSubmit={onSubmit}>
        <Form.Group>
            {field}
            <Form.Input type='hidden' width={7} />
            {button.admin}
            {button.cancel}
        </Form.Group>
    </Form>
);

const SenterForm = {
    Login: LoginForm,
    Find: FindForm,
    Add: AddForm,
    Delete: DeleteForm,
};

export default SenterForm;
