import { useEffect, useContext } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import { sleep } from '../Helpers';
import { withRouter } from 'react-router-dom';
import { StoreContext } from './store';
import api from '../Api';

// FORM
export const LoginForm = ({ history, button, field }) => {
    const { setError } = useContext(StoreContext);

    const handleLogin = async (values, form) => {
        try {
            await sleep(500);
            history.push({
                pathname: '/dashboard',
                state: await api.login(values),
            });
        } catch (err) {
            showLoginError(err);
            throw err;
        }
    };

    const showLoginError = (err) => {
        setError(err);
        document.getElementById('username').focus();
    };

    useEffect(() => {
        document.getElementById('username').focus();
    }, []);

    return (
        <FinalForm
            onSubmit={handleLogin}
            render={({ handleSubmit, form }) => (
                <Form
                    onSubmit={(event) => {
                        handleSubmit(event)
                            .then()
                            .catch((err) => {
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

export default withRouter(LoginForm);
