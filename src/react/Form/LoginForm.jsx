import React, { useState, useEffect } from 'react';
import { Form, Divider, Button } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import Username from '../Field/Login/Username';
import Password from '../Field/Login/Password';
import LoginButton from '../Button/LoginButton';

// const LoginForm = ({ setErrorMessage, iconColor, errorMessage, login }) => {
const LoginForm = ({ api, history }) => {
    const [errorMessage, setErrorMessage] = useState(false);
    const [iconColor, setIconColor] = useState('blueIcon');
    const [save, setSave] = useState(false);

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
                    size='large'
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
                    <Form.Group>
                        <Button
                            className='LoginButton'
                            circular
                            fluid={true}
                            size='huge'
                            // size='massive'
                            color='black'
                            icon='close'
                            labelPosition='right'
                            content='Close'
                            onClick={(e) => {
                                e.preventDefault();
                                api.closeApp();
                            }}
                        />
                        <Button
                            className='LoginButton'
                            circular
                            fluid={true}
                            size='huge'
                            // size='massive'
                            color='pink'
                            icon='save'
                            labelPosition='right'
                            content='Backup'
                            loading={save}
                            onClick={(e) => {
                                e.preventDefault();
                                setSave(true);
                                api.backup((response) => {
                                    setSave(false);
                                });
                            }}
                        />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default LoginForm;
