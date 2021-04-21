import { Form as FinalForm } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from '../store';
import { useEffect } from 'react';

// FORM
export const LoginForm = ({ button, field }) => {
    const { onSubmit } = useContext(StoreContext);

    useEffect(() => document.getElementById('username').focus(), []);

    return (
        <FinalForm
            onSubmit={onSubmit.login}
            render={({ handleSubmit, form }) => (
                <Form
                    onSubmit={(event) => {
                        handleSubmit(event)
                            .then()
                            .catch(() => {
                                document.getElementById('username').focus();
                                form.reset({});
                            });
                    }}>
                    {field.username}
                    {field.password}
                    <Divider hidden />
                    {button.login}
                    {button.admin}
                    <Form.Group widths={2}>
                        {button.close}
                        {button.backup}
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export const FindForm = ({ button, field }) => {
    const { onSubmit } = useContext(StoreContext);

    useEffect(() => {
        document.getElementById('phone').focus();
    }, []);

    return (
        <FinalForm
            onSubmit={onSubmit.find}
            render={({ handleSubmit, form, values }) => (
                <Form onSubmit={handleSubmit}>
                    {field.phone(form)}
                    {field.account(form)}
                    {field.firstName(form)}
                    {field.lastName(form)}
                    {button.find(values, form)}
                    {button.add}
                    {button.report}
                    {button.logout}
                </Form>
            )}
        />
    );
};

const MPW_POS_FORM = {
    Login: LoginForm,
    Find: FindForm,
};

export default MPW_POS_FORM;
