import { useEffect } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import { OnChange } from 'react-final-form-listeners';
import { Field as FinalField, FormSpy } from 'react-final-form';

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
                    handleSubmit(event)
                        .then((data) => {
                            form.reset();
                        })
                        .catch((err) => {});
                }}>
                {field.phone(form)}
                {field.account(form)}
                {field.firstName(form)}
                {field.lastName(form)}
                <Divider hidden />
                {button.find(values)}
                {button.add}
                {button.report}
                {button.logout}
            </Form>
        )}
    />
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
                        {/* <WhenBuyFieldChanges
                            field='gallon'
                            becomes={values.gallon > 0}
                            set='remain'
                            to={parseInt(values.gallon)}
                            reset={0}
                        /> */}
                        {field.changeField(values)}
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

export const DeleteForm = ({ onSubmit, field, button }) => (
    <Form onSubmit={onSubmit}>
        <Form.Group>
            {field}
            <Form.Input type='hidden' width={7} />
            {button.admin}
            {button.cancel}
        </Form.Group>
    </Form>
);

// BUY FORM
export const BuyForm = ({
    handlePurchase,
    record,
    onKeyDown,
    setOpenReceipt,
    changeField,
    field,
    button,
    modal,
    edit,
}) => (
    <FinalForm
        onSubmit={handlePurchase}
        initialValuesEqual={() => true}
        initialValues={{
            ...record,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            buy: 0,
            fee: 0,
            type: 'BUY',
            gallon: 0,
            previous: record.remain,
        }}
        render={({ handleSubmit, form, values }) => (
            <Form
                onKeyDown={onKeyDown}
                onSubmit={(event) => {
                    handleSubmit(event).then((data) => {
                        form.reset({
                            ...data,
                            previous: data.remain,
                            buy: 0,
                            fee: 0,
                            gallon: 0,
                            date: new Date().toLocaleDateString(),
                            time: new Date().toLocaleTimeString(),
                        });
                        setOpenReceipt(true);
                    });
                }}>
                {changeField(values)}
                <Form.Group>
                    {field.account}
                    {field.since}
                    {field.phone}
                    {field.first}
                    {field.last}
                    {button.edit(values)}
                    {edit && button.cancel(form, values)}
                    {field.date}
                    {field.time}
                </Form.Group>
                <Form.Group>
                    <Form.Input type='hidden' width={14} />
                    {field.buy}
                    {field.remain(values)}
                    {button.buy(values)}
                </Form.Group>
                <Form.Group>
                    <Form.Input type='hidden' width={14} />
                    {field.fee}
                    {field.renew}
                    {button.renew(values)}
                </Form.Group>
                <Divider hidden />
                <Divider />
                <Form.Group>
                    <Form.Input type='hidden' width={14} />
                    {button.history}
                    {button.delete}
                    {button.done}
                </Form.Group>
                {modal.admin}
                {modal.confirm}
            </Form>
        )}
    />
);

const SenterForm = {
    Login: LoginForm,
    Find: FindForm,
    Add: AddForm,
    Delete: DeleteForm,
    Buy: BuyForm,
};

export default SenterForm;
