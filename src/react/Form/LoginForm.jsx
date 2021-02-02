import React from 'react';
import { Form, Divider } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import Username from '../Field/Username';
import Password from '../Field/Password';
import LoginButton from '../Button/LoginButton';

const LoginForm = ({
    api,
    history,
    setErrorMessage,
    iconColor,
    errorMessage,
}) => {
    const onSubmit = async ({ username, password }) => {
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

    return (
        <>
            <FinalForm
                onSubmit={onSubmit}
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
                        <Username
                            iconColor={iconColor}
                            clear={setErrorMessage}
                        />
                        <Password
                            iconColor={iconColor}
                            clear={setErrorMessage}
                        />
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
        </>
    );
};

export default LoginForm;
