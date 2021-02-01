import React from 'react';
import { Form, Divider } from 'semantic-ui-react';
import Username from '../Field/Username';
import Password from '../Field/Password';
import LoginButton from './LoginButton';
import FormDebug from '../Debug/FormDebug';

const LoginForm = (props) => {
    const {
        iconColor,
        clear,
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
                <Username iconColor={iconColor} clear={clear} />
                <Password iconColor={iconColor} clear={clear} />
                <Divider hidden />
                <LoginButton
                    errorMessage={errorMessage}
                    username={username}
                    password={password}
                    form={form}
                    clear={clear}
                />
            </Form>
            <Divider hidden />
            <FormDebug data={{ username, password }} />
        </>
    );
};

export default LoginForm;
