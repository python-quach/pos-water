import { useContext } from 'react';
import { Form, Divider } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import Username from '../Field/LoginUsername';
import Password from '../Field/LoginPassword';
import LoginButton from '../Button/LoginButton';
import CloseButton from '../Button/CloseButton';
import BackButton from '../Button/BackupButton';
import { LoginContext } from '../Screen/LoginScreen';

const LoginForm = ({ size }) => {
    const { handle, initialValues } = useContext(LoginContext);

    return (
        <FinalForm
            onSubmit={handle.login}
            initialValues={initialValues}
            render={({
                handleSubmit,
                form,
                values: { username, password },
            }) => (
                <Form
                    size={size}
                    onSubmit={(event) => {
                        handleSubmit(event).then(form.reset);
                    }}>
                    <Username />
                    <Password />
                    <Divider hidden />
                    <LoginButton username={username} password={password} />
                    <Form.Group>
                        <CloseButton />
                        <BackButton />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default LoginForm;
