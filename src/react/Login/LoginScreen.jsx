import { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { channels } from '../../shared/constants';
import { Form } from 'react-final-form';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';

const LoginScreen = ({ history, ipcRenderer }) => {
    const [errorMessage, setErrorMessage] = useState(false);
    const [iconColor, setIconColor] = useState('blueIcon');

    const renderLoginForm = ({ handleSubmit, form, values }) => (
        <LoginForm
            form={form}
            handleSubmit={handleSubmit}
            values={values}
            onSubmit={onSubmit}
            iconColor={iconColor}
            errorMessage={errorMessage}
            clear={setErrorMessage}
        />
    );

    const onSubmit = async ({ password, username }) => {
        ipcRenderer.send(channels.LOGIN, { username, password });
        ipcRenderer.on(channels.LOGIN, (event, { login }) => {
            ipcRenderer.removeAllListeners(channels.LOGIN);
            if (!login) {
                setErrorMessage(true);
            } else {
                history.push({
                    pathname: '/dashboard',
                    state: { user_id: login.user_id },
                });
            }
        });
    };

    useEffect(() => {
        errorMessage ? setIconColor('whiteIcon') : setIconColor('blueIcon');
    }, [errorMessage]);

    return (
        <Grid
            textAlign='center'
            style={{ height: '100vh' }}
            verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <LoginHeader title='Mckee Pure Water' />
                <Form
                    onSubmit={onSubmit}
                    initialValues={{ username: '', password: '' }}
                    render={renderLoginForm}
                />
            </Grid.Column>
        </Grid>
    );
};

export default LoginScreen;
