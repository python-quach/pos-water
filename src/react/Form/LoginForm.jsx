import React, { useState, useEffect } from 'react';
import { Form, Divider } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import Username from '../Field/Login/Username';
import Password from '../Field/Login/Password';
import LoginButton from '../Button/LoginButton';

// const LoginForm = ({ setErrorMessage, iconColor, errorMessage, login }) => {
const LoginForm = ({ api, history }) => {
    const [errorMessage, setErrorMessage] = useState(false);
    const [iconColor, setIconColor] = useState('blueIcon');

    const handleLogin = async ({ username, password }) => {
        api.login({ username, password }, (auth) => {
            if (!auth) {
                setErrorMessage(true);
            } else {
                history.push({
                    pathname: '/dashboard',
                    state: { user_id: auth.user_id },
                });
            }
        });
    };

    useEffect(() => {
        errorMessage ? setIconColor('whiteIcon') : setIconColor('blueIcon');
    }, [errorMessage]);
    return (
        <FinalForm
            onSubmit={handleLogin}
            initialValues={{ username: '', password: '' }}
            render={({
                handleSubmit,
                form,
                values: { username, password },
            }) => (
                <Form
                    onSubmit={(event) => {
                        handleSubmit(event).then(form.reset);
                    }}>
                    <Username iconColor={iconColor} clear={setErrorMessage} />
                    <Password iconColor={iconColor} clear={setErrorMessage} />
                    <Divider hidden />
                    <LoginButton
                        errorMessage={errorMessage}
                        username={username}
                        password={password}
                        form={form}
                        clear={setErrorMessage}
                    />
                </Form>
            )}
        />
    );
};

export default LoginForm;
