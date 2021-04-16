import { useEffect, useContext } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import { StoreContext } from '../store';

// FORM
export const LoginForm = ({ button, field }) => {
    const { setError, history, api, sleep } = useContext(StoreContext);

    const handleLogin = async (values) => {
        try {
            await sleep(500);
            history.push({
                pathname: '/dashboard',
                state: await api.login(values),
            });
        } catch (err) {
            setError(err);
            document.getElementById('username').focus();
            throw err;
        }
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

export default LoginForm;
