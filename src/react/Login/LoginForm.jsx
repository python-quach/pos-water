import { Form, Divider, Message } from 'semantic-ui-react';
import Username from '../Field/Username';
import Password from '../Field/Password';
import LoginButton from './LoginButton';
import FormDebug from '../Debug/FormDebug';

const LoginForm = (props) => {
    const {
        iconColor,
        errorMessage,
        values: { username, password },
        handleSubmit,
        form,
    } = props;

    return (
        <>
            <Form
                onSubmit={(event) => {
                    handleSubmit(event).then(form.reset);
                }}>
                <Username iconColor={iconColor} />
                <Password iconColor={iconColor} />
                <Divider hidden />
                <LoginButton
                    errorMessage={errorMessage}
                    username={username}
                    password={password}
                />
            </Form>
            <Divider hidden />
            <FormDebug data={{ username, password }} />
        </>
    );
};

export default LoginForm;
